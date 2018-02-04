import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Storage } from '@ionic/storage/dist/storage';

@Injectable() export class API
{

  // private apiUrl : string = ""; // TIL We need to use a proxy in order to bypass CORS
  // Proxy is defined in ionic.config.json
  private apiUrl : string = "http://olympics.hidora.com";
  // private apiUrl: string = "http://localhost:8080";
  private clientId: string = "olympics-client";
  private clientSecret: string = "olympics-secret";

  constructor(public http: HttpClient, private storage: Storage) {
    console.log('Hello RestServiceProvider Provider');
  }

  public getToken(credentials) {
    // console.log(btoa(this.clientId + ':' + this.clientSecret));

    let url = `/oauth/token`;
    let body = `username=${credentials.username}&password=${credentials.password}&grant_type=password`;
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(this.clientId + ':' + this.clientSecret)
    };
    
    return this.handleRequest(url, body, headers);
  }

  public refreshToken(refresh_token: string) {
    let url = `/oauth/token`;
    let body = `refresh_token=${refresh_token}&grant_type=password`;
    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`)
    };

    return this.handleRequest(url, body, headers);
  }

  public getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users').subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', data)
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public createUser(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/signup', data)
        .subscribe(res => {
          resolve(res);
        });
    })
  }

  private handleRequest(url?: string, body?: any, headers?: any) : Promise<any> {
    return new Promise ((resolve, reject) => {
      this.http.post(this.apiUrl + url, body ? body : {}, { headers: headers ? headers : {} })
      .subscribe(res => {
        resolve(res);
      }, err => {
        reject(err);
      })
    })
  }

  /*this.http.post(this.apiUrl'/users', JSON.stringify(data), {
    headers: new HttpHeaders().set('Authorization', 'my-auth-token'),
    params: new HttpParams().set('id', '3'),
  })
  .subscribe(res => {
    resolve(res);
  }, (err) => {
    reject(err);
  });*/

}
