import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage/dist/storage';
import { OAuthToken } from './oauth-token';

/**
 * Implements constants representing the HTTP methods in a request.
 */
class HttpRequestKind {
  static GET: string = "GET";
  static POST: string = "POST";
}

@Injectable() export class API
{
  public static apiUrl : string = "http://olympics.hidora.com";
  
  private clientId: string = "olympics-client";
  private clientSecret: string = "olympics-secret";

  private userCredentials: OAuthToken; // Here we store the OAuth token fetched

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello RestServiceProvider Provider');

    this.storage.get('userCredentials').then(credentials => {
      if(credentials) {
        this.userCredentials = new OAuthToken(credentials);
        console.log('User credentials found in database !');
      } else {
        console.log('No user credentials found in database.');
      }
    })
    .catch(error => {
      console.log(`No credentials fetched. Reason : ${error}`);
    })
  }

  public createUser(data: {
    email: string;
    password: string;
    username: string;
    userId: number | null;
    age?: number;
  }) : Promise<any> {
    return this.request('/signup', HttpRequestKind.POST, data);
  }

  public getActivities() : Promise<any> {
    return this.authedRequest('/activities', HttpRequestKind.GET, this.userCredentials);
  }

  public postActivity(data) : Promise<any> {
    return this.authedRequest('/activities', HttpRequestKind.POST, this.userCredentials, data);
  }

  //region API basic handling

  /**
   * Fetch an OAuth2 token for the specified user.
   * @param credentials An object containing the user credentials
   */
  public getToken(credentials: {
    username: string;
    password: string;
  }) : Promise<any> {
    let url = '/oauth/token';
    let body = `username=${credentials.username}&password=${credentials.password}&grant_type=password`;
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    };

    let promise = this.request(url, HttpRequestKind.POST, body, headers);
    
    promise.then(data => {
      this.userCredentials = new OAuthToken(data);

      let now = new Date();
      let expires_at = new Date();
      expires_at.setTime(now.getTime() + (this.userCredentials.expires_in * 1000));
      this.userCredentials.expires_at = expires_at;

      this.storage.set('userCredentials', this.userCredentials).then(() => {
        console.log(`${credentials.username} credentials stored in database !`);
      });
    })
    .catch(reason => {
      console.log(`Error fetching token. Reason : ${reason.error.error} - ${reason.error.error_description}`);
    });

    return promise;
  }

  /**
   * Check if an OAuth2 token is still valid. If not, this method send a request to refresh the token using the refresh_token.
   * @param token The token to check the validity of
   */
  private checkTokenValidity(token: OAuthToken) : Promise<any> {
    if(token.isExpired()) {
      let url = '/oauth/token'
      let body = `grant_type=refresh_token&refresh_token=${token.refresh_token}`
      let headers = {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret),
        //'Access-Control-Allow-Origin': '*'
      };

      return this.request(url, HttpRequestKind.POST, body, headers);
    }
    else {
      return Promise.resolve();
    }
  }

  /**
   * Handle an authed request to the API. You need to provide a OAuth2 token to use this method.
   * @param url - The url to send the request. API's URL is already included. (i.e. '/oauth')
   * @param kind - An HttpRequestKing constant representing the type of the request (GET, POST)
   * @param token - The OAuth token to authentify the request
   * @param body - Object to send in requests body.
   * @param headers - Headers to send with request. Need to be an object with string-formatted headers.
   */
  private authedRequest(url: string, kind: HttpRequestKind, token: OAuthToken, body?: any, headers?: { [header: string]: string }) : Promise<any> {
    headers = headers ? headers : {};

    headers['Authorization'] = `Bearer ${token.access_token}`;
    
    return this.checkTokenValidity(token).then(result => {
      return this.request(url, kind, body ? body : null, headers ? headers : null);
    })
    .catch(reason => {
      console.log(`Error refreshing OAuth access token. Reason :`);
      console.log(reason);
      return Promise.resolve(reason);
    })
  }

  /**
   * Handle a request to the API. You do not need to provide an access token using this method. For this case, use authedRequest() instead.
   * @param url - The url to send the request. API's URL is already included. (i.e. '/oauth')
   * @param kind - An HttpRequestKing constant representing the type of the request (GET, POST)
   * @param body - Object to send in requests body.
   * @param headers - Headers to send with request. Need to be an object with string-formatted headers.
   * @param token - The OAuth token to authentify the request
   */
  private request(url: String, kind: HttpRequestKind, body?: String | Object, headers?: { [header: string]: string }) : Promise<any> {
    headers = headers ? headers : {};

    headers['Access-Control-Allow-Origin'] = '*';
    switch(kind) {
      case HttpRequestKind.GET: {
        return new Promise ((resolve, reject) => {
          this.http.get(API.apiUrl + url,
            { headers: headers ? headers : {} })
            .subscribe(
              res => { resolve(res); },
              err => { reject(err); }
            )
        });
      }
      case HttpRequestKind.POST: {
        return new Promise ((resolve, reject) => {
          this.http.post(API.apiUrl + url,
            // body ? ((token && typeof(body == String)) ? (`?access_token=${token.access_token}` + body) : body) : {},
            body ? body : {},
            { headers: headers ? headers : {} })
            .subscribe(
              res => { resolve(res); },
              err => { reject(err); }
            )
        });
      }
      default: {
        return Promise.resolve();
      }
    }
  }

  //endregion
}
