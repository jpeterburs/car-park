import { useState, useEffect } from "react";
import BackendConnector from "../api/BackendConnector";

const Einfahrt = () => {
    const [userID, setUserID] = useState(null);
    const [kennzeichen, setkennzeichen] = useState(null);
    const [freiKurz, setFreiKurz] = useState();
    const [freiDauer, setFreiDauer] = useState();

    useEffect(() => {
        BackendConnector.getParkerAmount().then((resp) => {
            setFreiDauer(resp.max_capacity - resp.normal_sessions - resp.permanent_parker_sessions);

            let diffDauerparkerCapacity = resp.permanent_parker_sessions - resp.reserved;
            let excessDauerParker = diffDauerparkerCapacity < 0 ? 0 : diffDauerparkerCapacity;
            let freiPlaetze = resp.max_capacity - resp.reserved - excessDauerParker - resp.normal_sessions;
            setFreiKurz(freiPlaetze);
        });
    }, []);

    const handleEinfahrt = () => {
        let einfahrtSuccess = false;

        if (userID) {
            if (freiDauer > 0) {
                einfahrtSuccess = true;
            }
        } else {
            if (freiKurz > 4) {
                einfahrtSuccess = true;
            }
        }

        if (einfahrtSuccess) {
            BackendConnector.createSession(userID, kennzeichen);
        }
    };

    return (
        <div className="container">
            <h1>Einfahrt</h1>

            <label htmlFor="CntFreePlaces">
                <b>Freie Parkplätze:</b>
            </label>
            <output name="x" for=" ">
                {freiKurz > 4 ? freiKurz : "Belegt"}
            </output>

            <hr style={{ border: "1px solid #f1f1f1", "margin-bottom": "25px" }} />

            <label htmlFor="LicencePlate">
                <b>Kennzeichen:</b>
            </label>
            <input
                type="text"
                placeholder="Kennzeichen ihres Autos"
                name="LicencePlate"
                id="LicencePlate"
                onChange={(e) => setkennzeichen(e.target.value)}
                required
            />

            <label htmlFor="CustomerNo">
                <b>Kunden ID:</b>
            </label>
            <input
                type="text"
                placeholder="Falls vorhanden (optional)"
                name="CustomerNo"
                id="CustomerNo"
                onChange={(e) => setUserID(e.target.value)}
            />

            <div className="clearfix">
                <button
                    className="btn success keep-left"
                    type="button"
                    style={{ width: "100%", margin: "0" }}
                    onClick={handleEinfahrt}
                >
                    Einparken
                </button>
            </div>
        </div>
    );
};

export default Einfahrt;
