import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, MarkerOptions, LatLng, CameraPosition } from '@ionic-native/google-maps';

import { ActivitiesService } from '../../providers/api/services/activities.service';
import { Sports } from '../../providers/sports';
import { ActivitiesPage } from '../../providers/api/models/activities-page';
import { Activity } from '../../providers/api/models/activity';
import { ActivityPage } from '../activity/activity';
import { GoogleMapsService } from '../../providers/api/services/google-maps.service';

import { ActivityHistoryPage } from '../activity-history/activity-history';

@Component({
  selector: 'page-sport-history',
  templateUrl: 'sport-history.html',
})
export class SportHistoryPage {
  private sport: any;
  private userId: number;
  private activitiesPage: ActivitiesPage;
  private activities: Array<Activity>;
  private map: GoogleMap;
  private page: number;
  private maxPage: number;

  constructor(/*public mapsService: GoogleMapsService,*/ public navCtrl: NavController, public navParams: NavParams, public sports: Sports, public storage: Storage, public activitiesService: ActivitiesService) {
    this.sport = this.navParams.get('sport');
    this.activitiesPage = new ActivitiesPage();
    this.activities = [];
    this.page = 0;
  }

  ionViewDidLoad() {
    this.sport = this.navParams.get('sport');

    this.activitiesService.getActivities(this.sport.code).subscribe(activities => {
      this.maxPage = activities.totalPages;
      this.processActivities(activities.content);

      //var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

      //this.activitiesList = Object.assign([], activities.content);

      /*
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
      console.log(this.activitiesList);*/

      this.activitiesPage = activities;
    })
    // console.log('ionViewDidLoad SportHistoryPage');

    /*this.storage.get('userId').then((userId) => {
      this.userId = userId;

      this.storage.get('activities' + this.userId + this.sport.name + 'Id').then((activityIdList) => {
        if(activityIdList) this.activityIdList = activityIdList;

        if(this.activityIdList.length) this.loadActivitiesHistory();
      })
    })*/
  }

  doInfinite(infiniteScroll) {
    this.page++;
    if(this.page <= this.maxPage) {
      this.activitiesService.getActivities(this.sport.code, this.page).subscribe(activities => {
        this.processActivities(activities.content);
        infiniteScroll.complete();
      })
    }
    else {
      infiniteScroll.complete();
    }
  }

  processActivities(activities: Array<Activity>) {
    activities.forEach(activity => {
      this.storage.set(`activity${activity.idActivity}`, activity);
      activity.startDate = new Date(<number>activity.startDate);
      activity.endDate = new Date(<number>activity.endDate);
      if(activity.gpsCoordinates.length > 0) {
        this.mapsService.getActivityImage(activity).subscribe(
          data => {
            activity.imageUrl = data;
          },
          err => console.log(err)
        )
      }
      console.log(activity);
      this.activities.push(activity);
    });
  }

  loadActivityHistory(activity: Activity) {
    // Check if we got the activity in cache then display it, if not download it
    this.storage.get(`activity${activity.idActivity}`).then(storedActivity => {
      if(storedActivity) {
        console.log('Got this !')
        this.navCtrl.push(ActivityHistoryPage, { 'activity': activity });
      }
      else {
        console.log('No activity here...')
        // TODO: Download and display
      }
    })
  }

  loadActivitiesHistory() {
    /*for(let i = 0; i < this.activityIdList.length; i++) {
      this.storage.get('activity' + this.userId + this.sport.name + this.activityIdList[i]).then((activityData) => {
        this.activitiesList.push(activityData);
      })
    }*/
  }
}
