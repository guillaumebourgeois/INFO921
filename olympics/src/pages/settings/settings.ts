import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public events: Events) {
  }

  ionViewDidLoad() {
  }

  public logout() {
  	this.events.publish('user:isLoggedIn', false);
  }
}
