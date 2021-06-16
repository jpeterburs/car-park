import { useState } from "react";
import BackendConnector from "../api/BackendConnector";
import Constants from "../constants/Constants";

const Einfahrt = () => {
    const [userID, setUserID] = useState(null);
    const [kennzeichen, setkennzeichen] = useState(null);

    const handleEinfahrt = () => {
        BackendConnector.getParkerAmount().then(resp => 
            {
                let einfahrtSuccess = false;
                
                if (userID) {
                    if (resp.dauer + resp.kurz < Constants.MaxCapacity ) {
                        einfahrtSuccess = true;
                    }
                } else {
                    let diffDauerparkerCapacity = resp.dauer - Constants.DauerParkerReserve;
                    let excessDauerParker = diffDauerparkerCapacity < 0 ? 0 : diffDauerparkerCapacity;
                    if (Constants.MaxCapacity - Constants.DauerParkerReserve - excessDauerParker > 4) {
                        einfahrtSuccess = true;
                    }
                }
                
                if (einfahrtSuccess) {
                    BackendConnector.createSession(userID, kennzeichen)
                }
            });
    }

    return (
        <div>
            <h1 style={{textAlign: "center"}}>Parkautomat</h1>
            <div className="container">            

                <h2>Einfahrtsansicht</h2>

                <form>
                    <label htmlFor="CntFreePlaces">Anzahl freier Parkplätze:</label><br/>
                    <output name="x" for=" "></output>
                    <label htmlFor="LicencePlate">Kennzeichen:</label><br/>
                    <input type="text" name="LicencePlate" id="LicencePlate" onChange={e => setkennzeichen(e.target.value)} /><br/>
                    <label htmlFor="CustomerNo" >Kunden ID:</label><br/>
                    <input type="text" name="CustomerNo" id="CustomerNo" onChange={e => setUserID(e.target.value)} /><br/>
                </form>

                <p>Einfahrt: <button type="button" style={{height: "50px", width: "50px"}} onClick={handleEinfahrt}></button></p>
            </div>
        </div>)
}

export default Einfahrt;