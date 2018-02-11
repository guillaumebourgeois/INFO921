import { GpsCoordinates } from "./gps-coordinates";
import { User } from "./user";
import { Sport } from "../../sports";

export interface Activity {
  idActivity?: number;
  sport: string | Sport;
  startDate: number | Date;
  endDate: number | Date;
  gpsCoordinates?: Array<GpsCoordinates>;
  user: User;
  distance: number;
  imageUrl?: string;
}

export class Activity implements Activity {
  constructor () {
    this.idActivity = 0
    this.sport = ""
    this.startDate = 0
    this.endDate = 0
    this.gpsCoordinates = []
    this.user = null
    this.distance = 0
    this.imageUrl = ""
  }
}
