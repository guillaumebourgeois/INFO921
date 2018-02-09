import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

@Injectable() export class NoopService {
  constructor(private http: HttpClient) { }

  hello() : Observable<string> {
      return this.http.get<string>('/hello');
  }
}