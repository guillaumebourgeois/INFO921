import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

// Pages
import { LoginPage } from '../pages/login/login';
import { TabsPage  } from '../pages/tabs/tabs';


// Providers
import { Sports } from '../providers/sports';
import { API    } from '../providers/api';
import { Timer  } from '../providers/timer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events,
              private p_Sports: Sports, private p_Api: API, private p_Timer : Timer) {

    if (window["Sports"] == undefined)
        window["Sports"] = p_Sports;
    if (window["API"] == undefined)
        window["API"] = p_Api;
    if (window["Timer"] == undefined)
        window["Timer"] = p_Timer;

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      this.storage.get('authed').then((authed) => {
          this.rootPage = authed ? TabsPage : LoginPage;
      });

      // Login/logout event handling
      this.events.subscribe('user:login', () => {
        this.storage.set('authed', true);
        this.storage.set('userId', 1);
        this.rootPage = TabsPage;
        this.nav.push(this.rootPage);
      });

      this.events.subscribe('user:logout', () => {
        this.storage.set('authed', false);
        this.rootPage = LoginPage; // Root page is set as application-level
        this.nav.popToRoot(); // Return to login page, no tabs remaining
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
