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
                body: JSON.stringify(newSession)
            }
        )
        //console.log("backendconnector", userID, kennzeichen)
    }

    static async getSession(sessionID: number) : Promise<SessionGet | null> {
        let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions/${sessionID}`).then(resp => resp.json())
        return session;
    }

    static async updateSession(sessionID: number): Promise<SessionGet> {
        let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions/${sessionID}`, {method: 'PUT'}).then(resp => resp.json())
        return session;
    }

    static async getParkerAmount (): Promise<{kurz: number, dauer: number}> {
        let stats: ParkerStatistic = await fetch(this.apiUrl).then(resp => resp.json())

        return {kurz: stats.normal_sessions, dauer: stats.permanent_parker_sessions}; 
    }
}

export default BackendConnector;

