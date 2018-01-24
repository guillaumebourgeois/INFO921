import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Navbar, Events, AlertController } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { Geolocation } from '@ionic-native/geolocation';
import { Pedometer } from '@ionic-native/pedometer';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, MarkerOptions, LatLng, CameraPosition } from '@ionic-native/google-maps';
import 'rxjs/add/operator/filter';
import { Timer } from '../../providers/timer';
import { Sports } from '../../providers/sports';
import { IActivityData } from './iactivitydata';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  @ViewChild('navbar') navBar: Navbar;

  private sport: any;
  // private activityId: number;
  private activityData: IActivityData;

  private locationUpdater: any;
  private pedometerUpdater: any;
  private map: GoogleMap;
  private mapOrigin: CameraPosition<any>;
  public selfPosition: LatLng;
  private selfMarker: Marker;

  private isPaused: boolean = false;
  private isStopped: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private geolocation: Geolocation, public events: Events, private pedometer: Pedometer, private timer: Timer, public sports: Sports, private statusBar: StatusBar, private storage: Storage) {
    // this.selfPosition = new LatLng(0,0); // Debug purpose
  }

  ionViewDidLoad() {
    // activityData initialization
    this.activityData = {
      userId: 0,
      activityId: 0,
      sportCode: '',
      gpsCoordinates: {},
      distanceInMeter: 0,
      timeInSeconds: 0
    };
    // Back button handler
    this.navBar.backButtonClick = () => {
      this.showStopActivityConfirm('navbar');
    };

    this.sport = this.sports.sports.find((element) => {
      return element.name == this.navParams.get('sport');
    });

    this.activityData.sportCode = this.sport.code;

    this.storage.get('lastActivityId').then((value) => {
      this.activityData.activityId = (value !== undefined) ? ++value : 0;

      // this.activityData.activityId = this.activityId;

      this.storage.set('lastActivityId', this.activityData.activityId);

      this.storage.get('activities' + this.sport.name + 'Id').then((array) => {
        if (array) array.push(this.activityData.activityId);
        else array = [ this.activityData.activityId ];

        this.storage.set('activities' + this.sport.name + 'Id', array);

        console.log('List of actities ID for ' + this.sport.name + ' : ' + array);
      })
      console.log('Activity ID : ' + this.activityData.activityId);
    });

    this.statusBar.styleLightContent();
    this.timer.startTimer();
    this.loadMap();
    this.loadPedometer();

    console.log('ionViewDidLoad ActivityPage');
  }

  ionViewWillLeave() {
    // TODO When we leave the activity, we want to upload data
    this.sendData();

    this.statusBar.styleDefault();
    this.timer.resetTimer();
    this.unloadMap();
    this.unloadPedometer();
  }

  loadPedometer() {
    this.pedometer.isDistanceAvailable()
      .then((available: boolean) => {
        if (available) {
          this.pedometerUpdater = this.pedometer.startPedometerUpdates()
           .subscribe((data) => {
             console.log(data);
           });
        }
        else console.log('Pedometer is not available');
      })
      .catch((error: any) => console.log('Pedometer error : ' + error));
  }

  unloadPedometer() {
    if(this.pedometerUpdater) this.pedometer.stopPedometerUpdates()
  }

  loadMap() {
    let mapElement: HTMLElement = document.getElementById('map_canvas');

    // Set map origin
    this.geolocation.getCurrentPosition().then((position) => { // CALLBACK HELL
      this.mapOrigin = {
          target: new LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 15,
          tilt: 0
      };

      let mapOptions: GoogleMapOptions = {
        camera: this.mapOrigin
      };

      this.map = GoogleMaps.create(mapElement, mapOptions);

      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('Map is ready!');

        this.locationUpdater = this.geolocation.watchPosition()
          .filter((p) => p.coords !== undefined) //Filter Out Errors
          .subscribe((position) => {
            this.selfPosition = new LatLng(position.coords.latitude, position.coords.longitude);
            this.updateMap();
        });
      });
    });
  }

  updateMap() {
    console.log(this.selfPosition.lng + ' ' + this.selfPosition.lat);

    let selfMarkerOptions: MarkerOptions = {
      title: 'My position',
      position: this.selfPosition,
      icon: 'blue',
      draggable: false
    };

    if (this.selfMarker != null) {
      this.map.clear(); // Remove previous marker
      this.selfMarker.setPosition(this.selfPosition); // Set new position
      this.map.addMarker(selfMarkerOptions); // Add new marker
    }
    else {
      this.map.addMarker(selfMarkerOptions).then((marker) => { this.selfMarker = marker; });
    }
  
    this.map.setCameraTarget(this.selfPosition);
  }

  unloadMap() {
    if(this.locationUpdater) this.locationUpdater.unsubscribe();
  }

  pauseActivity() {
    this.isPaused = true;
    this.timer.pauseTimer();
  }

  resumeActivity() {
    this.isPaused = false;
    this.timer.startTimer();
  }

  stopActivity(source) {
    this.isStopped = true;
    this.timer.pauseTimer();
    // this.sendData();

    // Reset back button handler
    this.navBar.backButtonClick = () => {
      this.navCtrl.pop();
    };

    // If we're coming here from back button, we want to go back NOW
    if (source == 'navbar') this.navCtrl.pop();
  }

  // Source is the origin of the stop request (navbar or something else)
  showStopActivityConfirm(source) {
    let confirm = this.alertCtrl.create({
      title: 'End of activity',
      message : 'Do you want to stop this activity?',
      buttons: [
        {
          text: 'No',
          handler: () => {}
        },
        {
          text: 'Yes',
          handler: () => {
            this.stopActivity(source);
          }
        }
      ]
    });

    confirm.present();
  }

  sendData() {
    // this.storage.set('activity' + this.sport.name + this.activityId, this.activityData);
  }
}
