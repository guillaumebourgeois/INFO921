import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

@Injectable() export class NoopService {
  constructor(private http: HttpClient) { }

  hello() : Observable<any> {
    return this.http.get('/hello', { responseType: 'text' });
  }
}