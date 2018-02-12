import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Storage } from '@ionic/storage/dist/storage';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';

import { ActivitiesService  } from '../../providers/api/services/activities.service';
//import { StatisticsService  } from '../../providers/api/services/statistics.service';
import { User } from '../../providers/api/models/user';
import * as bcrypt from 'bcryptjs';

import { LoginPage } from '../login/login';
import { AuthService } from '../../providers/api/services/auth.service';
import { UserService } from '../../providers/api/services/user.service';

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
    age: null
  };
  private confirmPassword: string = '';
  private cptActivity:number;

  constructor(public userService: UserService, public auth: AuthService, public alertCtrl: AlertController, /*public statistics: StatisticsService,*/ public activities: ActivitiesService, public navCtrl: NavController, public navParams: NavParams, public events: Events, public storage: Storage) {}

  ionViewDidLoad() {
    this.storage.get('user').then(user => {
      this.user = user;
    })

    this.cptActivity = 1;
  }

  public logout() {
    this.auth.revokeToken().subscribe(
      () => this.events.publish('user:logout'),
      err => this.events.publish('error', err.error.error, err.error.error_description)
    )
  }

  public activitiesRequest() {
    this.activities.getActivities("walk").subscribe(activities => {
      console.log(activities);
      let alert = this.alertCtrl.create({
        title: 'Sample of data',
        subTitle: JSON.stringify(activities[0]),
        buttons: ['Close']
      });
      alert.present();
    })
  }

  public activityRequest(){
    this.activities.getActivity(this.cptActivity).subscribe(activity => {
      console.log(activity);
      let alert = this.alertCtrl.create({
        title: 'Sample of data',
        subTitle: JSON.stringify(activity),
        buttons: ['Close']
      });
      alert.present();
    })
    this.cptActivity++;
  }

  updateProfile() {
    if (this.user.password != '') {
      if (this.user.password == this.confirmPassword) {
        bcrypt.genSalt(10, (err, salt) => {
          bcrypt.hash(this.user.password, salt, (err, hash) => {
            let body = {
              username: this.user.username,
              password: hash,
              email: this.user.email,
              idUser: this.user.idUser
            }
            this.userService.updateProfile(body).subscribe(
              data => this.events.publish('error', 'Your profile has been updated.'),
              err => this.events.publish('error', err.error, err.message || '')
            )
          })
        })
      } else {
        this.events.publish('error', 'Password does not match.')
      }
    } else {
      this.userService.updateProfile(this.user).subscribe(
        data => this.events.publish('error', 'Your profile has been updated.'),
        err => this.events.publish('error', err.error, err.message || '')
      )
    }
  }

  /*public statisticsRequest(){
    this.statistics.getStatistics(2).subscribe(statistics => {
      console.log(statistics);
      let alert = this.alertCtrl.create({
        title: 'Sample of data',
        subTitle: JSON.stringify(statistics),
        buttons: ['Close']
      });
      alert.present();
    })
  }*/
}
