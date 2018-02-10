import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../models/activity';
import { GpsCoordinates } from '../models/gps-coordinates';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable() export class ActivitiesService {
  constructor(private http: HttpClient) { }

  getActivities() : Observable<Activity[]> {
    return this.http.get<Activity[]>('/activities');
  }

  startActivity(activity: Activity) : Observable<Activity> {
    return this.http.put<Activity>('/activity', JSON.stringify(activity), httpOptions);
  }

  updateActivity(activity: Activity, gpsCoordinates: GpsCoordinates) : Observable<GpsCoordinates> {
    return this.http.put<GpsCoordinates>(`/activity/${activity.idActivity}/gps`, JSON.stringify(gpsCoordinates), httpOptions);
  }

  endActivity(activity: Activity) : Observable<Activity> {
    return this.http.put<Activity>(`/activity/${activity.idActivity}`, JSON.stringify(activity), httpOptions);
  }
}