import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Statistics } from '../models/statistics';

@Injectable() export class StatisticsService {
  constructor(private http: HttpClient) { }

  getStatistics(userId: number, from: string, to: string) : Observable<any> {
    return this.http.get(`/user/${userId.toString()}/stats?from=${from}&to=${to}`);
  }
}