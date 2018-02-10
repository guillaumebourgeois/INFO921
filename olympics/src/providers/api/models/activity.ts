import { GpsCoordinates } from "./gps-coordinates";
import { User } from "./user";

export interface Activity {
    idActivity?: number;
    sport: string;
    startDate: number;
    endDate: number;
    gpsCoordinates?: Array<GpsCoordinates>;
    user: User;
}