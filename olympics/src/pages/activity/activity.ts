import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  private sports: any;

  // This is for the first idea (2 sports per row)
  // public temp = Array;
  // public math = Math;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  	this.sports = window["Sports"].GetSports();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');
  }

}
