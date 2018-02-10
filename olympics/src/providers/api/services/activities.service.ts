import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../models/activity';
import { ActivitiesPage } from '../models/activies-page'
import { GpsCoordinates } from '../models/gps-coordinates';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable() export class ActivitiesService {
  constructor(private http: HttpClient) { }

  getActivities(sportCode: string, page?: number) : Observable<ActivitiesPage> {
    return this.http.get<ActivitiesPage>(`/activities?sport=${sportCode}` + (page ? page.toString() : ``));
  }

  getActivity(id: number): Observable<Activity> {
    return this.http.get<Activity>(`/activity/${id.toString()}`);
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
