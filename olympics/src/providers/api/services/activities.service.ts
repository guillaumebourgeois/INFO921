import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../models/activity';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Basic b2x5bXBpY3MtY2xpZW50Om9seW1waWNzLXNlY3JldA==',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   })
// };

@Injectable() export class ActivitiesService {
  constructor(private http: HttpClient) { }

  getActivities() : Observable<Activity[]> {
    return this.http.get<Activity[]>('/activities');
  }
}