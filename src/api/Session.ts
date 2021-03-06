export interface SessionSend {
    session: {
        license_plate: string;
        permanent_parker_id: number | null;
    };
}

export interface SessionGet {
    session: Session
}

export interface Session {
    id: number;
    license_plate: string;
    permanent_parker: {
        id: number;
        first_name: string;
        last_name: string;
    } | null;
    entered_at: string;
    exited_at: string;
}
