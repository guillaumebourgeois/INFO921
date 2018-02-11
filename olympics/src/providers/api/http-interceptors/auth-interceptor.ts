import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/finally';
import 'rxjs/add/observable/throw';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { Events } from 'ionic-angular/util/events';
import { OAuthToken } from '../models/oauth-token';
import { Storage } from '@ionic/storage/dist/storage';
import { LoginPage } from '../../../pages/login/login';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  isRefreshingToken: boolean = false;

  constructor(public storage: Storage, public auth: AuthService, private http: HttpClient, public events: Events) {

  }
  
  addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
      return req.clone({ setHeaders: { Authorization: `Bearer ${token}`}})
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(req.url.startsWith('http') || req.url.startsWith('/oauth/token') || req.url.startsWith('/signup')) {
      return next.handle(req);
    }

    const authReq = req.clone({
      headers: req.headers.set('Authorization', 'Bearer ' + this.auth.getAccessToken())
    })

    return next.handle(authReq).catch(response => {
      if (response instanceof HttpErrorResponse) {
        switch (response.status) {
          case 400:
            return this.handle400Error(response);
          case 401:
            return this.handle401Error(req, next);
        }
        return Observable.throw(response);
      } else {
        return Observable.throw(response);
      }
    });
  }

  handle401Error(req: HttpRequest<any>, next: HttpHandler) : Observable<HttpEvent<any>> {

    // Reset here so that the following requests wait until the token
    // comes back from the refreshToken call.
    // let token = localStorage.getItem('token');

    return this.auth.refreshToken()
      .switchMap((data) => {

        if (data.access_token) {
          // this.tokenSubject.next(data["token"]);
          this.auth.setToken(data);

          const authReq = req.clone({
            headers: req.headers.set('Authorization', 'Bearer ' + this.auth.getAccessToken())
          })

          // console.log(data);
          return next.handle(authReq);
        }

        // If we don't get a new token, we are in trouble so logout.
        // return Observable.throw('Error in the refhreshing token response');
        return this.logoutUser(data);
      })
      .catch(error => {
          // If there is an exception calling 'refreshToken', bad news so logout.
          // return Observable.throw(error);
          return this.logoutUser(error);
      })
      .finally(() => {
          this.isRefreshingToken = false;
      });
  }

  logoutUser(error) {
    // Route to the login page (implementation up to you)
    this.events.publish('user:logout');

    if(error.status == 400)
      this.events.publish('error', 'Session expired', 'Please login again.');

    return Observable.throw(error);
  }

  handle400Error(error) : Observable<HttpEvent<any>> {
    if (error && error.status === 400 && error.error && error.error.error === 'invalid_grant') {
      // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
      return this.logoutUser(error);
    }

    return Observable.throw(error);
  }
}