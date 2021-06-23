import { SessionSend, SessionGet, Session } from "./Session";
import { ParkerStatistic } from "./ParkerSatistic";

class BackendConnector {
    static apiUrl: string = `${window.location.protocol}//${window.location.hostname}:3000`;

    static createSession(userID: number | null, kennzeichen: string) {
        let newSession: SessionSend = {
            session: {
                license_plate: kennzeichen,
                permanent_parker_id: userID,
            },
        };

        fetch(`${this.apiUrl}/api/sessions`, {
            method: "POST",
            body: JSON.stringify(newSession),
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        });
    }

    static async getSession(sessionID: number): Promise<Session | null> {
        let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions/${sessionID}`, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json());
        let sessionOut: Session = session.session;
        return sessionOut;
    }

    static async updateSession(sessionID: number): Promise<Session> {
        let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions/${sessionID}`, {
            method: "PUT",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json());

        let sessionOut: Session = session.session;
        return sessionOut;
    }

    static async getParkerAmount(): Promise<ParkerStatistic> {
        let stats: ParkerStatistic = await fetch(this.apiUrl, {
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((resp) => resp.json());

        return stats;
    }
}

export default BackendConnector;
