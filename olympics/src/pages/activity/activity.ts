import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  private sport: any;
  private latitude: any;
  private longitude: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation) {
  	this.sport = this.navParams.get('sport');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');

    this.geolocation.watchPosition()
      .subscribe(position => {
        this.longitude = position.coords.longitude;
        this.latitude = position.coords.latitude;
    });
  }


}
