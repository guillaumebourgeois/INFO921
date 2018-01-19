import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage       } from '../home/home';
import { ActivitiesPage   } from '../activities/activities';
import { StatisticsPage } from '../statistics/statistics';
import { SettingsPage   } from '../settings/settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = ActivitiesPage;
  tab3Root = StatisticsPage;
  tab4Root = SettingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
