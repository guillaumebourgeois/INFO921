import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Sports } from '../../providers/sports';
import { SportHistoryPage } from '../sport-history/sport-history';

@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {

  // This is for the first idea (2 sports per row)
  public temp = Array;
  public math = Math;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sports: Sports) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  loadSportHistoryPage(sport) {
    this.navCtrl.push(SportHistoryPage, { 'sport': sport });
  }

}
