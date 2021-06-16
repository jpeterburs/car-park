import { SessionSend, SessionGet } from "./Session";
import { ParkerStatistic } from "./ParkerSatistic";

class BackendConnector {
    static apiUrl: string = `${window.location.protocol}//${window.location.hostname}:3000`

    static createSession(userID: number | null, kennzeichen: string) {
        let newSession: SessionSend = {
            session: {
                license_plate: kennzeichen,
                permanent_parker_id: userID
            }
        }

        fetch(`${this.apiUrl}/api/sessions`, 
            {
                method: "POST",
                body: JSON.stringify(newSession),
                mode: "cors"
            }
        )
        //console.log("backendconnector", userID, kennzeichen)
    }

    static async getSession(sessionID: number) : Promise<SessionGet | null> {
        let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions/${sessionID}`, {mode: "cors"}).then(resp => resp.json())
        return session;
    }

    static async updateSession(sessionID: number): Promise<SessionGet> {
        let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions/${sessionID}`, {method: 'PUT', mode: "cors"}).then(resp => resp.json())
        return session;
    }

    static async getParkerAmount (): Promise<ParkerStatistic> {
        let stats: ParkerStatistic = await fetch(this.apiUrl, {mode:"cors"}).then(resp => resp.json())

        return stats; 
    }
}

export default BackendConnector;

