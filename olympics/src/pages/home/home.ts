import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Sports } from '../../providers/sports';
import { ActivityPage } from '../activity/activity';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sport: string = '';

  public temp = Array;
  public math = Math;

  constructor(public navCtrl: NavController, public sports: Sports) {
  }

  ngAfterViewInit(){
  }

  public startActivity(sport) {
    this.navCtrl.push(ActivityPage, { 'sport': sport });
  }
}
