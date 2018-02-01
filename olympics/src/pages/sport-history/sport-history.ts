import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { Sports } from '../../providers/sports';

@Component({
  selector: 'page-sport-history',
  templateUrl: 'sport-history.html',
})
export class SportHistoryPage {

  private sport: any;
  private userId: number;
  private activityIdList: Array<number>;
  private activitiesList: Array<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sports: Sports, public storage: Storage) {
    this.sport = this.navParams.get('sport');
    this.activityIdList = [];
    this.activitiesList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SportHistoryPage');

    this.sport = this.navParams.get('sport');

    this.storage.get('userId').then((userId) => {
      this.userId = userId;

      this.storage.get('activities' + this.userId + this.sport.name + 'Id').then((activityIdList) => {
        if(activityIdList) this.activityIdList = activityIdList;

        if(this.activityIdList.length) this.loadActivitiesHistory();
      })
    })
  }

  loadActivitiesHistory() {
    for(let i = 0; i < this.activityIdList.length; i++) {
      this.storage.get('activity' + this.userId + this.sport.name + this.activityIdList[i]).then((activityData) => {
        this.activitiesList.push(activityData);
      })
    }
  }

}
