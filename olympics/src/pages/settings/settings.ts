import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';
import { LoginPage } from '../login/login';
import { App } from 'ionic-angular/components/app/app';
import { ActivitiesService } from '../../providers/api/services/activities.service';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { User } from '../../providers/api/models/user';

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {
  private user: User = {
    idUser: 0,
    username: '',
    password: '',
    email: '',
    age: 0
  };

  constructor(public appCtrl: App, public alertCtrl: AlertController, public activities: ActivitiesService, public navCtrl: NavController, public navParams: NavParams, public events: Events, public storage: Storage) {}

  ionViewDidLoad() {
    this.storage.get('user').then(user => {
      this.user = user;
    })
  }

  public logout() {
    this.events.publish('user:logout');
  }

  public activitiesRequest() {
    this.activities.getActivities().subscribe(activities => {
      console.log(activities);
      let alert = this.alertCtrl.create({
        title: 'Sample of data',
        subTitle: JSON.stringify(activities[0]),
        buttons: ['Close']
      });
      alert.present();
    })
  }
}
