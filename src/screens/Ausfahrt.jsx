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
      <div className="container">
        <form>
          <h1>Bezahlen / Ausfahrt</h1>

          <hr style={{"border": "1px solid #f1f1f1", "margin-bottom": "25px"}} />

          <label htmlFor="SessionId"><b>Session ID:</b></label>
          <input type="text" placeholder="Befindet sich auf ihrem Schein" name="SessionId" onChange={e => setSessionID(e.target.value)} /><br/>

          <div className="clearfix">
            <button className="btn success keep-left" type="button" style={{"width": "100%", "margin": "0"}} onClick={handleAusfahrt}>Bestätigen</button>
          </div>

          {/* hide before session id is entered and confirmed */}
          <hr style={{"border": "1px solid #f1f1f1", "margin-bottom": "25px"}} />

          <label htmlFor="Price"><b>Total:</b></label>
          <output name="Price" htmlFor=" " value={parkdauer}></output>

          <br />
          <br />

          {/* give info tag to primary button, default to disabled */}
          <div className="clearfix">
            <button className="btn default keep-left" type="button" style={{"width": "50%", "margin": "0"}} onClick={handlePay} disabled={!(readyToExit || (parkerType === ParkerType.Kurz))} >Bezahlen</button>
            <button className="btn info keep-left" type="button" style={{"width": "50%", "margin": "0"}} onClick={handlePay} disabled={!(readyToExit || (parkerType === ParkerType.Dauer))}>Fortfahren</button>
          </div>
        </form>
      </div>
    )
}

export default Ausfahrt;
