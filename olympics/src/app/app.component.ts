import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { LoginPage } from '../pages/login/login';
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
              private p_LocalData: LocalData, private p_Sports: Sports, public events: Events) {
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
        this.rootPage = LoginPage;
      else
        this.rootPage = TabsPage;

      // Login/logout event handling
      this.events.subscribe('user:isLoggedIn', (isLoggedIn) => {
        if(!isLoggedIn) {
          this.rootPage = LoginPage; // Root page is set as application-level
          window["LocalData"].Set("Connected", "false");
          this.nav.popToRoot(); // Return to login page, no tabs remaining
        }
        else {
          this.rootPage = TabsPage; // Tabs is our way to display this app
          window["LocalData"].Set("Connected", "true");
          this.nav.push(this.rootPage); // Specify this.rootPage to be able to change page whenever we want
        }
      });

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
