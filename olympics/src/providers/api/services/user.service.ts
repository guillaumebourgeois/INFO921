import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';

// const httpOptions = {
//   headers: new HttpHeaders({
//     'Authorization': 'Basic b2x5bXBpY3MtY2xpZW50Om9seW1waWNzLXNlY3JldA==',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   })
// };

@Injectable() export class UserService {
  constructor(private http: HttpClient) { }

  createUser(user: User) : Observable<User> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }
    return this.http.post<User>('/signup', JSON.stringify(user), httpOptions)
  }
}