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
    }

    return (
        <div>

        </div>)
}

export default Einfahrt;