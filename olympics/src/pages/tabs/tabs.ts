import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { HomePage       } from '../home/home';
import { HistoryPage   } from '../history/history';
import { StatisticsPage } from '../statistics/statistics';
import { SettingsPage   } from '../settings/settings';

@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = HistoryPage;
  tab3Root = StatisticsPage;
  tab4Root = SettingsPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

}
