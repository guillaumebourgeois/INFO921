import { Injectable } from '@angular/core';
import { HTTP } from '@ionic-native/http';

@Injectable() export class API
{

  //private apiUrl : string = ""; // TIL We need to use a proxy in order to bypass CORS
  // Proxy is defined in ionic.config.json
  private apiUrl : string = "http://olympics.hidora.com";

  constructor(public http: HTTP) {
    console.log('Hello RestServiceProvider Provider');
  }

  public auth(credidentials) {
    credidentials.grant_type = 'password';

    console.log(btoa('olympics-client:olympics-secret'));

    let headers = {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': 'Basic ' + btoa('olympics-client:olympics-secret')
    };

    return new Promise ((resolve, reject) => {
      this.http.post(this.apiUrl + '/oauth/token', credidentials, headers)
      .then(res => {
        resolve(res);
      }, (err) => {
        console.log(err);
      })
    })
  }

  public getUsers() {
    return new Promise(resolve => {
      this.http.get(this.apiUrl+'/users', {}, {}).then(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
  }

  public addUser(data) {
    return new Promise((resolve, reject) => {
      this.http.post(this.apiUrl+'/users', data, {})
        .then(res => {
          resolve(res);
        }, (err) => {
          reject(err);
        });
    });
  }

  public createUser(data) {
    return new Promise(resolve => {
      this.http.post(this.apiUrl + '/user/create', data, {})
        .then(res => {
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
