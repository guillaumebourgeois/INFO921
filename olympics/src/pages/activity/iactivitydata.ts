export interface IActivityData {
	userId: number;
	activityId: number;
	startDate: Date;
	endDate: Date;
	sportCode: string;
	gpsCoordinates: Array<any>;
	distanceInMeter: number;
	timeInSeconds: number;
}