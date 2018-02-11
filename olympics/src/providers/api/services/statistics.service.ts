import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Statistics } from '../models/statistics';

@Injectable() export class StatisticsService {
  constructor(private http: HttpClient) { }

  getStatistics(userId: number, from: number, to: number) : Observable<Statistics> {
    return this.http.get<Statistics>(`/user/${userId.toString()}/stats?from=${from}&to=${to}`);
  }
}