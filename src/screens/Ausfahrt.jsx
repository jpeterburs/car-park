import { useState } from "react";
import { Link } from "react-router-dom";
import BackendConnector from "../api/BackendConnector";
import ParkerType from "../api/ParkerType";

const Ausfahrt = () => {
    const [sessionID, setSessionID] = useState(null);
    const [readyToExit, setReadyToExit] = useState(false);
    const [parkerType, setParkerType] = useState(ParkerType.None);
    const [session, setSession] = useState(null);
    const [parkdauer, setParkdauer] = useState(null);
    const [fetchSessionError, setFetchSessionError] = useState(false);
    const [paymentError, setPaymentError] = useState(false);
    const [paymentDone, setPaymentDoner] = useState(false);

    const handleAusfahrt = () => {
        setFetchSessionError(false);
        setPaymentError(false);

        BackendConnector.getSession(sessionID)
            .then((session) => {
                setSession(session);

                if (session.permanent_parker) {
                    setParkerType(ParkerType.Dauer);
                } else {
                    setParkerType(ParkerType.Kurz);
                }

                let dauerInMS = new Date() - new Date(session.entered_at);
                setParkdauer(Math.ceil(dauerInMS / 1000 / 60 / 60));

                setReadyToExit(true);
            })
            .catch((error) => {
                setFetchSessionError(true);
            });
    };

    const handlePay = () => {
        BackendConnector.updateSession(session.id)
            .then((session) => {
                setPaymentDoner(true);
            })
            .catch((error) => {
                setPaymentError(true);
            });
    };

    const handleKeypress = (e) => {
        //it triggers by pressing the enter key
        if (e.keyCode === 13) {
            handleAusfahrt();
        }
    };

    return (
        <div className="container">
            <h1>Bezahlen / Ausfahrt</h1>

            {/* Hide this on default, if error then show this */}
            {/* insert fitting class name here for color of alert */}
            {fetchSessionError ? (
                <div className="alert alert-danger">
                    {/* Fill text here */}
                    Es gab ein Problem beim Abrufen der Session!
                </div>
            ) : null}

            {paymentError ? (
                <div className="alert alert-danger">
                    {/* Fill text here */}
                    Es gab ein Problem bei der Bezahlung!
                </div>
            ) : null}

            {paymentDone ? (
                <div className="alert alert-info">
                    {/* Fill text here */}
                    Sie k??nnen jetzt rausfahren.
                </div>
            ) : null}

            <hr style={{ border: "1px solid #f1f1f1", marginBottom: "25px" }} />

            <label htmlFor="SessionId">
                <b>Session ID:</b>
            </label>
            <input
                type="text"
                placeholder="Befindet sich auf ihrem Schein"
                name="SessionId"
                onChange={(e) => setSessionID(e.target.value)}
                onKeyPress={handleKeypress}
            />
            <br />

            <div className="clearfix">
                <button
                    className="btn btn-success keep-left"
                    type="button"
                    style={{ width: "100%", margin: "0" }}
                    onClick={handleAusfahrt}
                >
                    Best??tigen
                </button>
            </div>

            {/* hide before session id is entered and confirmed */}
            {readyToExit ? (
                <div>
                    <hr style={{ border: "1px solid #f1f1f1", "margin-bottom": "25px" }} />

                    <label htmlFor="Price">
                        <b>Total:&nbsp;</b>
                    </label>
                    <label name="Price">{parkdauer} ???</label>

                    <br />
                    <br />

                    {/* give info tag to primary button, default to disabled */}
                    <div className="clearfix">
                        <button
                            className={`btn ${
                                readyToExit && parkerType === ParkerType.Kurz ? "btn-info" : "btn-default btn-disabled"
                            } keep-left`}
                            type="button"
                            style={{ width: "50%", margin: "0" }}
                            onClick={handlePay}
                            disabled={!(readyToExit || parkerType === ParkerType.Kurz)}
                        >
                            Bezahlen
                        </button>
                        <button
                            className={`btn ${
                                readyToExit && parkerType === ParkerType.Dauer ? "btn-info" : "btn-default btn-disabled"
                            } keep-left`}
                            type="button"
                            style={{ width: "50%", margin: "0" }}
                            onClick={handlePay}
                            disabled={!(readyToExit || parkerType === ParkerType.Dauer)}
                        >
                            Fortfahren
                        </button>
                    </div>
                </div>
            ) : null}

            <br />
            <Link className="link" to="/">
                zur??ck...
            </Link>
        </div>
    );
};

export default Ausfahrt;
