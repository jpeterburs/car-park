import { SessionSend, SessionGet, Session } from "./Session";
import { ParkerStatistic } from "./ParkerSatistic";

class BackendConnector {
    static apiUrl: string = `${window.location.protocol}//${window.location.hostname}:3000`;

    static async createSession(userID: number | null, kennzeichen: string): Promise<Session> {
        let newSession: SessionSend = {
            session: {
                license_plate: kennzeichen,
                permanent_parker_id: userID,
            },
        };

        try {
            let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions`, {
                method: "POST",
                body: JSON.stringify(newSession),
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((resp) =>{ 
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(`API didn't respond with success. Status Code: ${resp.status}`);
                }
            });

            return session.session;
        } catch (error) {
            throw new Error(`Network Error: ${error}`);
        }
    }

    static async getSession(sessionID: number): Promise<Session> {
        try {
            let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions/${sessionID}`, {
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((resp) => { 
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(`API didn't respond with success. Status Code: ${resp.status}`);
                }
            });
    
            return session.session;
        } catch (error) {
            throw new Error(`Network Error: ${error}`);
        }
        
    }

    static async updateSession(sessionID: number): Promise<Session> {
        try {
            let session: SessionGet = await fetch(`${this.apiUrl}/api/sessions/${sessionID}`, {
                method: "PUT",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((resp) => { 
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(`API didn't respond with success. Status Code: ${resp.status}`);
                }
            });

            return session.session;
        } catch (error) {
            throw new Error(`Network Error: ${error}`);
        }
    }

    static async getParkerAmount(): Promise<ParkerStatistic> {
        try {
            let stats: ParkerStatistic = await fetch(this.apiUrl, {
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
            }).then((resp) => { 
                if (resp.ok) {
                    return resp.json();
                }
                else {
                    throw new Error(`API didn't respond with success. Status Code: ${resp.status}`);
                }
            });

            return stats;
        } catch (error) {
            throw new Error(`Network Error: ${error}`);
        }
    }
}

export default BackendConnector;
