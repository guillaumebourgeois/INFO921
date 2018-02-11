import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Timer } from '../../providers/timer';

@Component({
  selector: 'page-activity-history',
  templateUrl: 'activity-history.html',
})
export class ActivityHistoryPage {

  private activity: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public timer: Timer) {
    this.activity = this.navParams.get('activity');
  }

  ionViewDidLoad() {
    this.activity = this.navParams.get('activity');

    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date = new Date(this.activity.endDate);
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let seconds = date.getSeconds();

    this.activity.formatedEndDate = (day < 10 ? "0" + day : day) + " " + month + " " + year + " " + (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (seconds < 10 ? "0" + seconds : seconds);

    //this.activity.duration = (this.activity.endDate - this.activity.startDate) / 1000;

    this.activity.duration = this.timer.getSecondsAsDigitalClock ((this.activity.endDate - this.activity.startDate) / 1000);

    console.log(this.activity);
  }
}
