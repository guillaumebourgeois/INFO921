import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../models/activity';

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
}