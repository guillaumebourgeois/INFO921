import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { User } from '../models/user';
import { AuthService } from './auth.service';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
}

@Injectable() export class UserService {
  constructor(private http: HttpClient, private auth: AuthService) { }

  createUser(user: User) : Observable<User> {
    return this.http.post<User>('/signup', JSON.stringify(user), httpOptions)
  }

  /** 
   * Get user's profile, identified by his access token
   * @returns An observable with the User
   */
  getCurrentUser() : Observable<User> {
    return this.http.get<User>('/profile', httpOptions);
  }

  updateProfile(body: any) : Observable<any> {
    return this.http.post(`/user/${body.idUser}/update`, body, httpOptions);
  }
}