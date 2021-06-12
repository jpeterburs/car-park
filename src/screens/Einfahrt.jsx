import { useState } from "react";
import BackendConnector from "../api/BackendConnector";
import Constants from "../constants/Constants";

const Einfahrt = () => {
    const [userID, setUserID] = useState(null);
    const [kennzeichen, setkennzeichen] = useState(null);

    const handleEinfahrt = () => {
        const {dauer, kurz} = BackendConnector.getParkerAmount();
        let einfahrtSuccess = false;

        if (userID) {
            if (dauer + kurz < Constants.MaxCapacity ) {
                einfahrtSuccess = true;
            }
        } else {
            let diffDauerparkerCapacity = dauer - Constants.DauerParkerReserve;
            let excessDauerParker = diffDauerparkerCapacity < 0 ? 0 : diffDauerparkerCapacity;
            if (Constants.MaxCapacity - Constants.DauerParkerReserve - excessDauerParker > 4) {
                einfahrtSuccess = true;
            }
        }

        if (einfahrtSuccess) {
            BackendConnector.createSession(userID, kennzeichen)
        }

        console.log(einfahrtSuccess)
    }

    return (
      <div className="container">
        <form>
          <h1>Einfahrt</h1>

          <label htmlFor="CntFreePlaces"><b>Freie Parkplätze:</b></label>
          <output name="x" for=" "></output>

          <hr style={{"border": "1px solid #f1f1f1", "margin-bottom": "25px"}} />

          <label htmlFor="LicencePlate"><b>Kennzeichen:</b></label>
          <input type="text" placeholder="Kennzeichen ihres Autos" name="LicencePlate" id="LicencePlate" onChange={e => setkennzeichen(e.target.value)} required />

          <label htmlFor="CustomerNo" ><b>Kunden ID:</b></label>
          <input type="text" placeholder="Falls vorhanden (optional)" name="CustomerNo" id="CustomerNo" onChange={e => setUserID(e.target.value)} />

          <div className="clearfix">
            <button className="btn success keep-left" type="button" style={{"width": "100%", "margin": "0"}} onClick={handleEinfahrt}>Einparken</button>
          </div>
        </form>
      </div>
    )
}

export default Einfahrt;
