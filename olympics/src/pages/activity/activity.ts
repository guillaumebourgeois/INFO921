import { Component } from '@angular/core';
import { NavController, NavParams, Events, AlertController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { Pedometer } from '@ionic-native/pedometer';
import { StatusBar } from '@ionic-native/status-bar';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, MarkerOptions, LatLng, CameraPosition } from '@ionic-native/google-maps';
import 'rxjs/add/operator/filter';
import { Timer } from '../../providers/timer';
import { Sports } from '../../providers/sports';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  private sport: any;

  private locationUpdater: any;
  private map: GoogleMap;
  private mapOrigin: CameraPosition<any>;
  public selfPosition: LatLng;
  private selfMarker: Marker;

  private isPaused: boolean = false;
  private isStopped: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController, private geolocation: Geolocation, public events: Events, private pedometer: Pedometer, private timer: Timer, public sports: Sports, private statusBar: StatusBar) {
  	this.sport = this.sports.sports.find((element) => {
      return element.name == this.navParams.get('sport');
    }); // this.navParams.get('sport');
    this.selfPosition = new LatLng(0,0); // Debug purpose

  }

  ionViewDidLoad() {
    this.statusBar.styleLightContent();
    this.timer.startTimer();
    this.loadMap();
    this.loadPedometer();

    console.log('ionViewDidLoad ActivityPage');
  }

  ionViewWillLeave() {
    this.statusBar.styleDefault();
    this.timer.resetTimer();
    this.unloadMap();
  }

  loadPedometer() {
    this.pedometer.isDistanceAvailable()
      .then((available: boolean) => {
        if (available) {
          this.pedometer.startPedometerUpdates()
           .subscribe((data) => {
             console.log(data);
           });
        }
        else console.log('Pedometer is not available');
      })
      .catch((error: any) => console.log('Pedometer error : ' + error));
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
    this.locationUpdater.unsubscribe();
  }

  pauseActivity() {
    this.isPaused = true;
    this.timer.pauseTimer();
  }

  resumeActivity() {
    this.isPaused = false;
    this.timer.startTimer();
  }

  stopActivity() {
    this.isStopped = true;
    this.timer.pauseTimer();
    this.sendData();
  }

  showStopActivityConfirm() {
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
            this.stopActivity();
          }
        }
      ]
    });

    confirm.present();
  }

  sendData() {}
}
