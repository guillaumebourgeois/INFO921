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
      this.userCredentials = credentials;
      console.log('User credentials found in database !');
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
        'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
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
   * @param headers - Headers to send with request. Need to be an object with string-formatted headers or an HttpHeaders object.
   */
  private authedRequest(url: string, kind: HttpRequestKind, token: OAuthToken, body?: any, headers?: any) : Promise<any> {
    return this.checkTokenValidity(token).then(result => {
      return this.request(url, kind, token, body ? body : null, headers ? headers : null);
    })
    .catch(reason => {
      console.log(`Error refreshing OAuth access token. Reason : ${reason}`);
      return Promise.resolve(reason);
    })
  }

  /**
   * Handle a request to the API. You do not need to provide an access token using this method. For this case, use authedRequest() instead.
   * @param url - The url to send the request. API's URL is already included. (i.e. '/oauth')
   * @param kind - An HttpRequestKing constant representing the type of the request (GET, POST)
   * @param body - Object to send in requests body.
   * @param headers - Headers to send with request. Need to be an object with string-formatted headers or an HttpHeaders object.
   * @param token - The OAuth token to authentify the request
   */
  private request(url: String, kind: HttpRequestKind, body?: String | Object, headers?: HttpHeaders | { [header: string]: string }, token?: OAuthToken) : Promise<any> {
    switch(kind) {
      case HttpRequestKind.GET: {
        return new Promise ((resolve, reject) => {
          this.http.get(API.apiUrl + url + (token ? `access_token=${token.access_token}` : ''),
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
            body ? ((token && typeof(body == String)) ? (`access_token=${token.access_token}` + body) : body) : {},
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
