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

    </div>)
}

export default Ausfahrt;