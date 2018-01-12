import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { ConnectionPage } from '../pages/connection/connection';
import { TabsPage       } from '../pages/tabs/tabs';

// Providers
import { LocalData  } from '../providers/local-data';
import { Sports     } from '../providers/sports';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  //pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
              private p_LocalData: LocalData, private p_Sports: Sports) {
    this.initializeApp();

    if (window["LocalData"] == undefined)
      window["LocalData"] = p_LocalData;
    if (window["Sports"] == undefined)
      window["Sports"] = p_Sports;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      if (window["LocalData"].Get("Connected") == undefined || window["LocalData"].Get("Connected") == "false")
        this.rootPage = ConnectionPage;
        //this.rootPage = TabsPage;
      else
        this.rootPage = TabsPage;

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
