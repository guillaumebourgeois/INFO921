import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, Events, Tabs } from 'ionic-angular';

import { CreateAccountPage } from '../create-account/create-account';

// import * as bcrypt from 'bcryptjs';
import { Storage } from '@ionic/storage/dist/storage';
import { HttpErrorResponse } from '@angular/common/http';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/api/services/auth.service';
import { OAuthToken } from '../../providers/api/models/oauth-token';
import { UserCredentials } from '../../providers/api/models/user-credentials';
import { UserService } from '../../providers/api/services/user.service';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private credentials: UserCredentials = {
    username: "",
    password: ""
  };

  private loader: any;

  constructor(public auth: AuthService, public userService: UserService, public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public events: Events, public storage: Storage) {
  }

  ionViewDidLoad() {
    this.events.subscribe('user:error', (error) => {
      this.loader.dismiss();

      this.handleError(error);
    })
  }

  public createAccount() {
    this.navCtrl.push(CreateAccountPage);
  }

  private login() {
    this.presentLoginLoading();

    this.auth.getToken(this.credentials).subscribe(token => {
      this.auth.setToken(token);
      this.storage.set('token', token);
      
      this.userService.getCurrentUser().subscribe(user => {
        this.storage.set('authed', true);
        this.storage.set('user', user);
        this.storage.set('userId', 1);
        this.loader.dismiss();
        this.navCtrl.push(TabsPage);
      }, error => {
        this.loader.dismiss();
        this.events.publish('error', 'Error during user fetching', 'Something bad happened, please try again later. :(');
      })
    }, error => {
      // this.events.publish('user:error', error);
      this.loader.dismiss();

      this.showAlert('Bad credentials', 'Your username nor password is wrong.');
    })
  }

  private presentLoginLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Connecting..."
    });
    this.loader.present();
  }

  private showAlert(title: string, content: string, buttons?: Array<string>) {
    let alert = this.alertCtrl.create({
      title: title,
      subTitle: content,
      buttons: buttons ? buttons : ['Close']
    });
    alert.present();
  }

  private handleError(error) {
    if (error instanceof HttpErrorResponse) {
      if (error.status == 400) {
        this.showAlert('Bad credentials', 'Your username nor password is wrong.');
      }
      else if (error.error.error == 'unauthorized') {
        this.showAlert('Unauthorized', error.error.error_description);
      }
      else {
        console.log(`${error.error.error} : ${error.error.error_description}`);

        this.showAlert(error.error.error, error.error.error_description);
      }
    }
    else {
      if(error == 'invalid_refresh_token') {
        this.showAlert('Expired token', 'Please login again.');
      }
      else {
        this.showAlert('Oh no !', 'Something terrible happened... Please login again.')
      }
    }
  }
}
