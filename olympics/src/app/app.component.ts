import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, LoadingController } from 'ionic-angular';
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

  rootPage: any = LoginPage;

  constructor(private loadingCtrl: LoadingController, private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events,
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

      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      this.storage.get('authed').then((authed) => {
        loader.dismiss();

        if (authed) {
          this.nav.push(TabsPage);
        }
      });

      // Login/logout event handling
      this.events.subscribe('user:login', (credentials) => {
        this.p_Api.getToken(credentials)
        .then(data => {
          this.events.publish('user:logged');

          this.nav.push(TabsPage);
        })
        .catch(e => {
          this.events.publish('user:error', e.error);
        })
      });

      this.events.subscribe('user:logout', () => {
        this.storage.set('authed', false);
        this.storage.remove('userCredentials');
        this.storage.remove('userId');
        
        this.nav.popTo(LoginPage);
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
