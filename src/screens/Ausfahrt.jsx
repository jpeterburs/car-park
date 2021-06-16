import { useState } from "react";
import BackendConnector from "../api/BackendConnector";
import ParkerType from "../api/ParkerType";
import { SessionGet } from "../api/Session";

const Ausfahrt = () => {
    const [sessionID, setSessionID] = useState(null);
    const [readyToExit, setReadyToExit] = useState(false);
    const [parkerType, setParkerType] = useState(ParkerType.None);
    const [session, setSession] = useState<SessionGet | null>(null);
    const [parkdauer, setParkdauer] = useState(null);

    const handleAusfahrt = () => {
        BackendConnector.getSession(sessionID).then(session => {
          setSession(session);
          
          if (session.permanent_parker){
            setParkerType(ParkerType.Dauer);
          } else {
            setParkerType(ParkerType.Kurz);
          }
          
          setReadyToExit(true);
        });
    }

    const handlePay = () => {
      BackendConnector.updateSession(session).then(session => {
        let dauerInMS = session.exited_at - session.entered_at;
        setParkdauer(Math.ceil(dauerInMS/1000/60/60));
      });

    }


    return (
        <div>
            <h1 style={{textAlign: "center"}}>Parkautomat</h1>
            <div className="container">            

                <h2>Ausfahrtsansicht</h2>

                <form>
                    <label htmlFor="SessionId">Session ID:</label><br/>
                    <input type="text" name="SessionId" id="SessionId" onChange={e => setSessionID(e.target.value)} /><br/>
                    {/* <label htmlFor="CustomerNo">Kunden ID:</label><br/>
                    <input type="text" name="CustomerNo" id="CustomerNo"/><br/> */}
                </form>

                <p>Ausfahrt: <button type="button" style={{height: "50px", width: "50px"}} onClick={handleAusfahrt}></button></p>

                <form>
                    <label htmlFor="Price">Preis:</label><br/>
                    <output name="Price" htmlFor=" " value={parkdauer}></output><br/>
                </form>

                <p>Bezahlung (Kurzparker): <button type="button" style={{height: "50px", width: "50px"}} onClick={() => handlePay()} disabled={!(readyToExit || (parkerType === ParkerType.Kurz))} ></button></p>

                <p>Rausfahren (Dauerparker): <button type="button" style={{height: "50px", width: "50px"}} onClick={() => handlePay()} disabled={!(readyToExit || (parkerType === ParkerType.Dauer))}></button></p>
            </div>
    </div>)
}

export default Ausfahrt;