import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import BackendConnector from "../api/BackendConnector";

const Einfahrt = () => {
    const [userID, setUserID] = useState(null);
    const [kennzeichen, setkennzeichen] = useState(null);
    const [freiKurz, setFreiKurz] = useState();
    const [freiDauer, setFreiDauer] = useState();
    const [session, setSession] = useState(null);
    const [dataFetchError, setDataFetchError] = useState(false);
    const [einfahrtSaveError, setEinfahrtSaveError] = useState(false);
    const [keinPlatzError, setKeinPlatzError] = useState(false);
    

    useEffect(() => {
        BackendConnector.getParkerAmount().then((resp) => {
            setFreiDauer(resp.max_capacity - resp.normal_sessions - resp.permanent_parker_sessions);

            let diffDauerparkerCapacity = resp.permanent_parker_sessions - resp.reserved;
            let excessDauerParker = diffDauerparkerCapacity < 0 ? 0 : diffDauerparkerCapacity;
            let freiPlaetze = resp.max_capacity - resp.reserved - excessDauerParker - resp.normal_sessions;
            setFreiKurz(freiPlaetze);
        }).catch((error) => {
            setDataFetchError(true);
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
            BackendConnector.createSession(userID, kennzeichen).then((resp) => {
                setSession(resp);
            }).catch((error) => {
                setEinfahrtSaveError(true);
            });
        } else {
            setKeinPlatzError(true);
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
            { dataFetchError ? (
                <div className="alert alert-warn">
                    { /* Fill text here */ }
                    Verbindung zum Server konnte nicht hergestellt werden!
                </div>
            ) : null }
            
            { session != null ? (
                <div className="alert alert-into">
                    { /* Fill text here */ }
                    Einfahrt um {session.entered_at.toLocaleString('de-DE')}. <br/>
                    Ihre Session ID ist {session.id}. Bitte beim Ausfahren eingeben.
                </div>
            ) : null }

            { einfahrtSaveError ? (
                <div className="alert alert-danger">
                    { /* Fill text here */ }
                    Ein Fehler beim Verarbeiten der Einfahrt ist passiert!
                </div>
            ) : null }

            { keinPlatzError ? (
                <div className="alert alert-danger">
                    { /* Fill text here */ }
                    Eine Einfahrt ist nicht möglich, da kein Platz mehr frei ist!
                </div>
            ) : null }

            <label htmlFor="CntFreePlaces">
                <b>Freie Parkplätze:&nbsp;</b>
            </label>
            <label id="CntFreePlaces">
                {freiKurz > 4 ? freiKurz : "Belegt"}
            </label>

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
