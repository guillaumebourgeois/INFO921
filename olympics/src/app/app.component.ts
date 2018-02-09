import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Events, LoadingController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

// Pages
import { LoginPage } from '../pages/login/login';
import { TabsPage  } from '../pages/tabs/tabs';


// Providers
import { Sports } from '../providers/sports';
import { Timer  } from '../providers/timer';
import { AuthService } from '../providers/api/services/auth.service';
import { OAuthToken } from '../providers/api/models/oauth-token';
import { NoopService } from '../providers/api/services/noop.service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  constructor(private alertCtrl: AlertController,private loadingCtrl: LoadingController, private storage: Storage, public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public events: Events,
              private p_Sports: Sports, private p_Timer : Timer, private auth: AuthService, public noop: NoopService) {

    if (window["Sports"] == undefined)
        window["Sports"] = p_Sports;
    if (window["Timer"] == undefined)
        window["Timer"] = p_Timer;

    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.

      let loader = this.loadingCtrl.create({
        content: "Please wait..."
      });
      loader.present();

      this.storage.get('token').then((token) => {
        if(token.access_token) { // If there is a token, we may try to log in again
          this.auth.setToken(token); // Set the token again by safety
          this.noop.hello().subscribe(response => { // middleware will intercept this request and, if the token is no longer valid, will refresh it
            if(response === "Hello !") {
              loader.dismiss();
              this.nav.push(TabsPage);
            }
            else {
              loader.dismiss();
              this.events.publish('error', 'Session expired', 'Please login again.');
            }
          }, err => {
            console.log(err);
            loader.dismiss();
            this.events.publish('error', 'Session expired', 'Please login again.');
          })
        } else loader.dismiss();
      });

      // Logout event handling
      this.events.subscribe('user:logout', () => {
        this.storage.set('authed', false);
        this.storage.remove('userCredentials');
        this.storage.remove('userId');
        
        this.nav.popTo(LoginPage);
      });

      // Handling errors properly
      this.events.subscribe('error', (title, message) => this.showAlert(title, message))

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  private showAlert(title: string, content: string, buttons?: Array<string>) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: buttons ? buttons : ['Close']
    });
    alert.present();
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
