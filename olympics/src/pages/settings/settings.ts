import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public appCtrl: App, public navCtrl: NavController, public navParams: NavParams, public events: Events, public storage: Storage) {
  }

  ionViewDidLoad() {
  }

  public logout() {
    // this.events.publish('user:logout');
    this.storage.set('authed', false);
    this.storage.remove('userCredentials');
    this.storage.remove('userId');
    
    this.events.publish('user:logout');
  }
}
