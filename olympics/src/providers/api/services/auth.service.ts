import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpRequest } from '@angular/common/http';
import { UserCredentials } from '../models/user-credentials';
import { Storage } from '@ionic/storage/dist/storage';
import { OAuthToken } from '../models/oauth-token';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { catchError } from 'rxjs/operators';
import { Observable } from 'rxjs/Observable';

const httpOptions = {
  headers: new HttpHeaders({
    'Authorization': 'Basic b2x5bXBpY3MtY2xpZW50Om9seW1waWNzLXNlY3JldA==',
    'Content-Type': 'application/x-www-form-urlencoded'
  })
};

@Injectable() export class AuthService {
  private token: OAuthToken;
  userCredentials: UserCredentials;
  cachedRequests: Array<HttpRequest<any>> = [];

  // public collectFailedRequest(request): void {
  //   this.cachedRequests.push(request);
  // }

  // public retryFailedRequests(): void {
  //   // retry the requests. this method can
  //   // be called after the token is refreshed
  // }

  constructor(private http: HttpClient, private storage: Storage) {
    this.storage.get('token').then(token => this.token = token);
  }

  getAccessToken() : string {
    return this.token.access_token;
  }

  setToken(_token: OAuthToken) {
    this.token = _token;

    this.token.expires_at = new Date(Date.now() + _token.expires_in * 1000);
  }

  isAuthenticated(): boolean {
    return Date.now() < this.token.expires_at.getTime();
  }

  getToken(userCredentials: UserCredentials) {
    return this.http.post('/oauth/token', `username=${userCredentials.username}&password=${userCredentials.password}&grant_type=password`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  refreshToken() {
    return this.http.post<OAuthToken>('/oauth/token', `refresh_token=${this.token.refresh_token}&grant_type=refresh_token`, httpOptions)
      .pipe(
        catchError(this.handleError)
      )
  }

  revokeToken() {
    return this.http.post(`/signout?access_token=${this.token.access_token}`, null, httpOptions)
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error.error}`);
    }
    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(error);
  };
}