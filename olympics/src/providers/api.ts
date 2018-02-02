import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable() export class API
{

  private apiUrl : string = "http://10.129.15.160:8080";

  constructor(public http: HttpClient) {
    console.log('Hello RestServiceProvider Provider');
  }

  public auth() {
    return new Promise (resolve => {
    })
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
      this.http.post(this.apiUrl+'/users', JSON.stringify(data), {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
      })
        .subscribe(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public createUser(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/user/create', JSON.stringify(data))
        .subscribe(res => {
          resolve(res);
        });
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
