import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

import { ActivitiesService } from '../../providers/api/services/activities.service';
import { Sports } from '../../providers/sports';
import { ActivityHistoryPage } from '../activity-history/activity-history';

@Component({
  selector: 'page-sport-history',
  templateUrl: 'sport-history.html',
})
export class SportHistoryPage {

  private sport: any;
  private userId: number;
  private activityIdList: Array<number>;
  private activitiesList: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public sports: Sports, public storage: Storage, public activities: ActivitiesService) {
    this.sport = this.navParams.get('sport');
    this.activityIdList = [];
    this.activitiesList = [];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SportHistoryPage');

    this.sport = this.navParams.get('sport');

    this.activities.getActivities(this.sport.code).subscribe(activities => {
      var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

      this.activitiesList = Object.assign([], activities.content);

      for (let i = 0; i < this.activitiesList.length; ++i) {
        let date = new Date(this.activitiesList[i].startDate);
        let day = date.getDate();
        let month = months[date.getMonth()];
        let year = date.getFullYear();
        let hour = date.getHours();
        let min = date.getMinutes();
        let seconds = date.getSeconds();
        this.activitiesList[i].formatedStartDate = (day < 10 ? "0" + day : day) + " " + month + " " + year + " " + (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (seconds < 10 ? "0" + seconds : seconds);
      }
      console.log(this.activitiesList);
    })

    /*this.storage.get('userId').then((userId) => {
      this.userId = userId;

      this.storage.get('activities' + this.userId + this.sport.name + 'Id').then((activityIdList) => {
        if(activityIdList) this.activityIdList = activityIdList;

        if(this.activityIdList.length) this.loadActivitiesHistory();
      })
    })*/
  }

  loadActivitiesHistory() {
    /*for(let i = 0; i < this.activityIdList.length; i++) {
      this.storage.get('activity' + this.userId + this.sport.name + this.activityIdList[i]).then((activityData) => {
        this.activitiesList.push(activityData);
      })
    }*/
  }

  public loadActivityHistory (activity) {
    this.navCtrl.push(ActivityHistoryPage, { 'activity': activity });
  }
}
