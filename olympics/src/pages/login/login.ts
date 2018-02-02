import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { CreateAccountPage } from '../create-account/create-account';

import { API } from '../../providers/api';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  credentials:any = {
    email: "",
    password: ""
  };

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
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
    if (this.credentials.email.toLowerCase() == "root" && this.credentials.password.toLowerCase() == "root") {
      this.events.publish('user:login');
    }
  }
}
