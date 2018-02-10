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
import { Activity } from '../../providers/api/models/activity';
import { ActivitiesService } from '../../providers/api/services/activities.service';
import { GpsCoordinates } from '../../providers/api/models/gps-coordinates';

const GPS_COORDINATES_REFRESH_INTERVAL = 5000; // How often are the gps coordinates sent

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  @ViewChild('navbar') navBar: Navbar;

  private sport: any;
  // private activityId: number;
  // private activityData: IActivityData;
  private data: Activity = {
    idActivity: null,
    user: null,
    sport: '',
    startDate: 0,
    endDate: 0,
    gpsCoordinates: []
  };

  private locationUpdater: any;
  private pedometerUpdater: any;
  map: GoogleMap;
  private mapOrigin: CameraPosition<any>;
  // public selfPosition: LatLng;
  private selfMarker: Marker;

  private lastPosition: GpsCoordinates;
  private currentPosition: GpsCoordinates;
  private positionSender: any;

  private isPaused: boolean = false;
  private isStopped: boolean = false;

  constructor(public activitiesService: ActivitiesService, public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private geolocation: Geolocation, public events: Events, private pedometer: Pedometer, private timer: Timer, public sports: Sports, private statusBar: StatusBar, private storage: Storage) {
    // this.selfPosition = new LatLng(0,0); // Debug purpose
    // this.navParams.get('sport');

    // this.activityData = {
    //   userId: 0,
    //   activityId: 0,
    //   startDate: null, // Return actual time
    //   endDate: null,
    //   sportCode: '',
    //   gpsCoordinates: [],
    //   distanceInMeter: 0,
    //   timeInSeconds: 0
    // };
  }

  ionViewDidLoad() {
    this.sport = this.navParams.get('sport');

    // activityData initialization
    this.storage.get('user').then((user) => {
      this.data.user = user;
      this.data.sport = this.sport.code;
      this.data.startDate = Date.now();

      this.activitiesService.startActivity(this.data).subscribe(data => {
        this.data.idActivity = data.idActivity; // Retrieved activity's ID from server
        console.log(data);

        this.positionSender = window.setInterval(() => {
          this.data.gpsCoordinates.push(this.currentPosition);

          if(this.data.gpsCoordinates.length > 1) this.lastPosition = this.data.gpsCoordinates[this.data.gpsCoordinates.length - 2];

          if(this.lastPosition && this.lastPosition.lat != this.currentPosition.lat && this.lastPosition.lng != this.currentPosition.lng) {
            this.activitiesService.updateActivity(this.data, this.currentPosition).subscribe(
              data => console.log(data.lat),
              error => console.log(error)
            )
          }
        }, GPS_COORDINATES_REFRESH_INTERVAL)
      }, err => {
        console.log('Error creating activity');
      })
    });
    // this.activityData.startDate = new Date();
    // this.activityData.sportCode = this.sport.code;
    
    // this.storage.get('lastActivityId').then((value) => {
    //   this.activityData.activityId = (value !== undefined) ? ++value : 0;

    //   // this.activityData.activityId = this.activityId;

    //   this.storage.set('lastActivityId', this.activityData.activityId);

    //   this.storage.get('activities' + this.activityData.userId + this.sport.name + 'Id').then((array) => {
    //     if (array) array.push(this.activityData.activityId);
    //     else array = [ this.activityData.activityId ];

    //     this.storage.set('activities' + this.activityData.userId + this.sport.name + 'Id', array);

    //     console.log('List of actities ID for ' + this.activityData.userId + this.sport.name + ' : ' + array);
    //   })
    //   console.log('Activity ID : ' + this.activityData.activityId);
    // });

    // Back button handler
    this.navBar.backButtonClick = () => {
      this.showStopActivityConfirm('navbar');
    };
    this.statusBar.styleLightContent();
    this.timer.startTimer();
    this.loadMap();
    // this.loadPedometer();

    console.log('ionViewDidLoad ActivityPage');
  }

  ionViewDidLeave() {
    // TODO When we leave the activity, we want to upload data
    // this.sendData();

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
    // Set map origin
    this.geolocation.getCurrentPosition().then((position) => { // CALLBACK HELL
      console.log(`${position.coords.latitude}, ${position.coords.longitude}`);

      this.map = GoogleMaps.create('map_canvas', {
        camera: {
          target: {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          },
          zoom: 15,
          tilt: 0
        }
      });

      // Wait the MAP_READY before using any methods.
      this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
        console.log('Map is ready!');

        // Location service
        this.locationUpdater = this.geolocation.watchPosition()
          .filter((p) => p.coords !== undefined) //Filter Out Errors
          .subscribe((position) => {
            // this.selfPosition = new LatLng(position.coords.latitude, position.coords.longitude);
            this.currentPosition = {
              id: null,
              lat: position.coords.latitude,
              lng: position.coords.longitude,
              timestamp: Date.now()
            };

            // this.data.gpsCoordinates.push(this.currentPosition);
            // this.activitiesService.updateActivity(this.data, this.currentPosition).subscribe(
            //   data => console.log(data),
            //   error => console.log(error)
            // )
            // console.log(this.activityData.gpsCoordinates);

            this.updateMap(position.coords);
        });
      });
    });
  }

  updateMap(position) {
    // console.log(this.selfPosition.lng + ' ' + this.selfPosition.lat);

    let selfMarkerOptions: MarkerOptions = {
      title: 'My position',
      position: new LatLng(position.latitude, position.longitude),
      icon: 'blue',
      draggable: false
    };

    if (this.selfMarker != null) {
      this.map.clear(); // Remove previous marker
      this.selfMarker.setPosition(new LatLng(position.latitude, position.longitude)); // Set new position
      this.map.addMarker(selfMarkerOptions); // Add new marker
    }
    else {
      this.map.addMarker(selfMarkerOptions).then((marker) => { this.selfMarker = marker; });
    }
  
    this.map.setCameraTarget(new LatLng(position.latitude, position.longitude));
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
    window.clearInterval(this.positionSender);
    this.timer.pauseTimer();

    // this.activityData.endDate = new Date();

    this.data.endDate = Date.now();

    // this.storeActivityData();
    
    this.activitiesService.endActivity(this.data).subscribe(() => {
      this.navBar.backButtonClick = () => {
        this.navCtrl.pop();
      };

      if (source == 'navbar') this.navCtrl.pop();
    }, err => console.log(err));

    // // Reset back button handler
    // this.navBar.backButtonClick = () => {
    //   this.navCtrl.pop();
    // };

    // // If we're coming here from back button, we want to go back NOW
    // if (source == 'navbar') this.navCtrl.pop();
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

  /* Store the activity data into Ionic storage */
  storeActivityData() {
    // this.storage.set('activity' + this.activityData.userId + this.sport.name + this.activityData.activityId, this.activityData);
  }

  /* Send activity data to server */
  sendData() {
    
  }
}
