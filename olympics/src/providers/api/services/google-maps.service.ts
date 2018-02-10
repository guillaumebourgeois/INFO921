import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Activity } from '../models/activity';

const apiKey = "AIzaSyByXzSlREbRbaGKNADvEH-AB-5WVVqxpV8";

@Injectable() export class GoogleMapsService {
  constructor(private http: HttpClient) { }

  getActivityImage(activity: Activity) : Observable<any> {
    let url = 'https://maps.googleapis.com/maps/api/staticmap?'
    url += 'center=' + activity.gpsCoordinates[0].lat + ',' + activity.gpsCoordinates[0].lng
    url += '&zoom=12'
    url += '&size=200x100&scale=2'
    url += '&path=color:0x0000ff|weight:5' 
    activity.gpsCoordinates.forEach(coord => {
      url += '|' + (coord.lat.toString()) + ',' + (coord.lng.toString());
    })
    url += '&key='
    return this.http.get(url + apiKey, { responseType: 'blob' });
  }
}