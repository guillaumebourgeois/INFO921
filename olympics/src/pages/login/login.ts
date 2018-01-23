import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { CreateAccountPage } from '../create-account/create-account';

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
    if (this.credentials.email.toLowerCase() == "root" && this.credentials.password.toLowerCase() == "root") {
      this.events.publish('user:login');
    }
  }
}
