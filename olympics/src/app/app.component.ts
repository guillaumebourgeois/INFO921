import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

// Pages
import { LoginPage } from '../pages/login/login';
import { TabsPage       } from '../pages/tabs/tabs';

// Providers

import { Storage } from '@ionic/storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any;

  constructor(private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events) {

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
