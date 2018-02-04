import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable() export class API
{

  private apiUrl : string = ""; // TIL We need to use a proxy in order to bypass CORS
  // Proxy is defined in ionic.config.json
  // private apiUrl : string = "http://olympics.hidora.com";

  constructor(public http: HttpClient) {
    console.log('Hello RestServiceProvider Provider');
  }

  public auth(credidentials) {
    credidentials.grant_type = 'password';

    console.log(btoa('olympics-client:olympics-secret'));

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('olympics-client:olympics-secret')
    };

    return new Promise (resolve => {
      this.http.post(this.apiUrl + '/oauth', credidentials, { headers: headers })
      .subscribe(res => {
        resolve(res);
      })
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
      this.http.post(this.apiUrl + '/user/create', data)
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
