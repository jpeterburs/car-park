import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
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

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleEinfahrt();
        }
    };

    return (
        <div className="container">
            <h1>Einfahrt</h1>

            { /* Hide this on default, if error then show this */ }
            { /* insert fitting class name here for color of alert */ }
            { true ? (
                <div className="alert alert-info">
                    { /* Fill text here */ }
                    Hello, World!
                </div>
            ) : null }

            <label htmlFor="CntFreePlaces">
                <b>Freie Parkplätze:</b>
            </label>
            <output name="x" for=" ">
                {freiKurz > 4 ? freiKurz : "Belegt"}
            </output>

            <hr style={{ border: "1px solid #f1f1f1", "marginBottom": "25px" }} />

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
                onKeyPress={handleKeypress}
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
                onKeyPress={handleKeypress}
            />

            <div className="clearfix">
                <button
                    className="btn btn-success keep-left"
                    type="button"
                    style={{ width: "100%", margin: "0" }}
                    onClick={handleEinfahrt}
                >
                    Einparken
                </button>
            </div>

            <br />
            <Link className="link" to="/">zurück...</Link>
        </div>
    );
};

export default Einfahrt;
