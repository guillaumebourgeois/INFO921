import { Component } from '@angular/core';
import { AlertController, NavController, NavParams, Events } from 'ionic-angular';

import { CreateAccountPage } from '../create-account/create-account';

import { API } from '../../providers/api';
import * as bcrypt from 'bcryptjs';
import { Storage } from '@ionic/storage/dist/storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials: any = {
    username: "",
    password: ""
  };

  constructor(public alertCtrl: AlertController, public navCtrl: NavController, public navParams: NavParams, public events: Events, private api: API, public storage: Storage) {
  }

  ionViewDidLoad() {
  }

  public createAccount() {
    this.navCtrl.push(CreateAccountPage);
  }

  public login() {
    // If we enter the right credidentials, we are able to log in
    // TODO A real auth system :^)

    bcrypt.genSalt(10, (err, salt) => {
       bcrypt.hash(this.credentials.password, salt, (err, hash) => {
         //TODO
       });
     });

     /*bcrypt.compare(this.credentials.password, hash,  (err, res) => {
       //TODO
     });*/
    if (this.credentials.username.toLowerCase() == "root" && this.credentials.password.toLowerCase() == "root") {
      // Debug purpose
      // this.events.publish('user:login');
    } else {
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.credentials.password, salt, (err, hash) => {
          // Password encrypted, now send data to server
          let payload = {
            'username': this.credentials.username,
            // 'password': hash
            'password': this.credentials.password // Password is now encrypted server-side
          };

          this.api.getToken(payload).then(data => {
            console.log(data);
            
            this.storage.set('oauth-credentials', data).then(() => {
              this.events.publish('user:login');
            });
          }).catch(error => {
            // console.log('Error: ');
            // console.log(error);

            if(error.error.error == 'invalid_grant') {
              console.log("Erreur d'authentification : identifiant/mot de passe incorrect");

              this.showBadCredentialsAlert();
            }
          })
        });
      });
    }
  }

  showBadCredentialsAlert() {
    let alert = this.alertCtrl.create({
      title: 'Bad credentials',
      subTitle: 'Your username nor password is wrong.',
      buttons: ['Close']
    });
    alert.present();
  }
}
