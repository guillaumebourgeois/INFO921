import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, MarkerOptions, LatLng, CameraPosition } from '@ionic-native/google-maps';

import { Timer } from '../../providers/timer';
import { Activity } from '../../providers/api/models/activity';

@Component({
  selector: 'page-activity-history',
  templateUrl: 'activity-history.html',
})
export class ActivityHistoryPage {

  private activity: Activity;
  private map: GoogleMap;
  private duration: string;

  constructor(public navCtrl: NavController, public navParams: NavParams, public timer: Timer) {
    this.activity = this.navParams.get('activity');
  }

  ionViewDidLoad() {
    this.activity = this.navParams.get('activity');

    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let date = new Date(this.activity.endDate.toString());
    let day = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let hour = date.getHours();
    let min = date.getMinutes();
    let seconds = date.getSeconds();

    // let formatedEndDate = (day < 10 ? "0" + day : day) + " " + month + " " + year + " " + (hour < 10 ? "0" + hour : hour) + ":" + (min < 10 ? "0" + min : min) + ":" + (seconds < 10 ? "0" + seconds : seconds);

    //this.activity.duration = (this.activity.endDate - this.activity.startDate) / 1000;

    this.duration = this.timer.getSecondsAsDigitalClock((<number>this.activity.endDate - <number>this.activity.startDate) / 1000);

    console.log(this.activity);

    this.map = GoogleMaps.create('map', {
      camera: {
        target: {
          lat: this.activity.gpsCoordinates[0] ? this.activity.gpsCoordinates[0].lat : 0,
          lng: this.activity.gpsCoordinates[0] ? this.activity.gpsCoordinates[0].lng : 0
        },
        zoom: 15,
        tilt: 0
      }
    });

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      this.map.setCameraTarget({
          lat: this.activity.gpsCoordinates[0] ? this.activity.gpsCoordinates[0].lat : 0,
          lng: this.activity.gpsCoordinates[0] ? this.activity.gpsCoordinates[0].lng : 0
      })

      this.map.addPolyline({
        points: this.activity.gpsCoordinates
      })
    })
  }
}
