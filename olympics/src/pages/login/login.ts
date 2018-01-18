import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
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
    if (this.credentials.email == "root" && this.credentials.password == "root") {
      this.events.publish('user:isLoggedIn', true);
    }
  }
}
