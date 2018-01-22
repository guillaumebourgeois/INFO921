import { Component } from '@angular/core';
import { NavController, NavParams, Events } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';
import { GoogleMaps, GoogleMap, GoogleMapsEvent, GoogleMapOptions, Marker, MarkerOptions, LatLng, CameraPosition } from '@ionic-native/google-maps';
import 'rxjs/add/operator/filter';

@Component({
  selector: 'page-activity',
  templateUrl: 'activity.html',
})
export class ActivityPage {

  private sport: any;

  private map: GoogleMap;
  private mapOrigin: CameraPosition<any>;
  public selfPosition: LatLng;
  private selfMarker: Marker;

  constructor(public navCtrl: NavController, public navParams: NavParams, private geolocation: Geolocation, public events: Events) {
  	this.sport = this.navParams.get('sport');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityPage');

    this.loadMap();
  }

  loadMap() {
    // Set map origin
    this.geolocation.getCurrentPosition().then((position) => {
      this.mapOrigin = {
          target: new LatLng(position.coords.latitude, position.coords.longitude),
          zoom: 18,
          tilt: 0
      };
    });

    let mapElement: HTMLElement = document.getElementById('map_canvas');
    let mapOptions: GoogleMapOptions = {
      camera: this.mapOrigin
    };

    this.map = GoogleMaps.create(mapElement, mapOptions);

    // Wait the MAP_READY before using any methods.
    this.map.one(GoogleMapsEvent.MAP_READY).then(() => {
      console.log('Map is ready!');

      this.geolocation.watchPosition()
        .filter((p) => p.coords !== undefined) //Filter Out Errors
        .subscribe((position) => {
          console.log(position.coords.longitude);
          this.selfPosition = new LatLng(position.coords.latitude, position.coords.longitude);
          this.updateMap();
      });
    });
  }

  updateMap() {
    // console.log(this.selfPosition.lng + ' ' + this.selfPosition.lat);

    if (this.selfMarker != null) {
      this.map.clear().then( () => {
        this.selfMarker.setPosition(this.selfPosition);
        this.map.addMarker(this.selfMarker);
      });
    }
    else {
      let selfMarkerOptions: MarkerOptions = {
        title: 'My position',
        position: this.selfPosition,
        icon: 'blue',
        draggable: false
      };

      this.map.addMarker(selfMarkerOptions).then((marker) => { this.selfMarker = marker; });
    }
  
    this.map.setCameraTarget(this.selfPosition);
  }


}
