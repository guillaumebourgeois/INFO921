import { GpsCoordinates } from "./gps-coordinates";

export interface Activity {
    id?: number;
    sport: string;
    startDate: number;
    endDate: number;
    gpsCoordinates?: Array<GpsCoordinates>;
    userId: number;
}