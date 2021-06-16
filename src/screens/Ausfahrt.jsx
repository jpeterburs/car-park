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
        BackendConnector.getSession(sessionID).then(session => {
          console.log("----------------------------------");
          console.log("Session ID:", sessionID);
          console.log("Session:", session)
          console.log("----------------------------------");
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
      BackendConnector.updateSession(session.id).then(session => {
        let dauerInMS = session.exited_at - session.entered_at;
        setParkdauer(Math.ceil(dauerInMS/1000/60/60));
      });

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
          {readyToExit ? 
            <div>
              <hr style={{"border": "1px solid #f1f1f1", "margin-bottom": "25px"}} />

              <label htmlFor="Price"><b>Total:</b></label>
              <output name="Price" htmlFor=" " value={parkdauer}></output>

              <br />
              <br />

              {/* give info tag to primary button, default to disabled */}
              <div className="clearfix">
                <button className={`btn ${(readyToExit && (parkerType === ParkerType.Kurz)) ? "info" : "default"} keep-left`} type="button" style={{"width": "50%", "margin": "0"}} onClick={handlePay} disabled={!(readyToExit || (parkerType === ParkerType.Kurz))} >Bezahlen</button>
                <button className={`btn ${(readyToExit && (parkerType === ParkerType.Dauer)) ? "info" : "default"} keep-left`} type="button" style={{"width": "50%", "margin": "0"}} onClick={handlePay} disabled={!(readyToExit || (parkerType === ParkerType.Dauer))}>Fortfahren</button>
              </div>
            </div>
          : null}
        </form>
      </div>
    )
}

export default Ausfahrt;
