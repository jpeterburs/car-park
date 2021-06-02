export default interface Session {
    ID: number;
    Kennzeichen: string;
    Einfahrt: Date;
    Ausfahrt: Date | null;
    Dauerparker_ID: number | null;
}