/* export default interface Session {
    ID: number;
    Kennzeichen: string;
    Einfahrt: Date;
    Ausfahrt: Date | null;
    Dauerparker_ID: number | null;
} */

export interface SessionSend {
    session: {
        license_plate: string,
        permanent_parker_id: number | null
    }
}

export interface SessionGet {
    session: {
        id: number,
        license_plate: string,
        permanent_parker: {
            id: number,
            first_name: string,
            last_name: string,
        } | null,
        entered_at: Date,
        exited_at: Date | null
    }
}