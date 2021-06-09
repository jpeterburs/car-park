import { useState } from "react";
import BackendConnector from "../api/BackendConnector";
import ParkerType from "../api/ParkerType";


const Ausfahrt = () => {
    const [sessionID, setSessionID] = useState(null);
    const [readyToExit, setReadyToExit] = useState(false);
    const [parkerType, setParkerType] = useState(ParkerType.None);
    const [session, setSession] = useState(null);
    const [parkdauer, setParkdauer] = useState(null);

    const handleAusfahrt = () => {
        let session = BackendConnector.getSession(sessionID);
        setSession(session);

        if (session.Dauerparker_ID){
            setParkerType(ParkerType.Dauer);
        } else {
            setParkerType(ParkerType.Kurz);
        }

        setReadyToExit(true);
    }

    const handlePay = () => {
        const currentDate = new Date();

        setSession((prevState) => {
            var newState = {...prevState, Ausfahrt: currentDate};
            return newState
        });

        let dauerInMS = session.Ausfahrt - session.Einfahrt;
        setParkdauer(Math.ceil(dauerInMS/1000/60/60));

        BackendConnector.updateSession(session);
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