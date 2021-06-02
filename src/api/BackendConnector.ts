import { Session } from "inspector";

class BackendConnector {
    static createSession(userID: number, kennzeichen: string) {
        const currentDate = new Date();
        //TODO
    }

    static getSession(sessionID: number) : Session {
        //TODO
        return null;
    }

    static updateSession(session: Session) {
        //TODO
    }

    static getParkerAmount (): {kurz: number, dauer: number} {
        //TODO
        return {kurz: 50, dauer: 10}; //dummy data
    }
}

export default BackendConnector;

