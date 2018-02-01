import { Coordinates } from "@ionic-native/geolocation";

export interface IActivityData {
	userId: number;
	activityId: number;
	sportCode: string;
	gpsCoordinates: Array<any>;
	distanceInMeter: number;
	timeInSeconds: number;
}