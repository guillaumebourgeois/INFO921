import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';
import { API } from '../../providers/api';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(public appCtrl: App, public api: API, public navCtrl: NavController, public navParams: NavParams, public events: Events, public storage: Storage) {
  }

  ionViewDidLoad() {
  }

  public logout() {
    // this.events.publish('user:logout');
    
    this.events.publish('user:logout');
  }

  public activitiesRequest() {
    this.api.getActivities().then(data => {
      console.log(data);

      this.api.postActivity({"idActivity":null,"type":1,"startDate":"2018-02-01","endDate":"2018-02-01","gpsCoord":"1,0;0,1;"}).then(data => {
        console.log(data);
      })
    })
  }
}
