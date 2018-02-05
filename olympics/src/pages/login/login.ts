import { Component } from '@angular/core';
import { AlertController, LoadingController, NavController, NavParams, Events } from 'ionic-angular';

import { CreateAccountPage } from '../create-account/create-account';

import { API } from '../../providers/api';
import * as bcrypt from 'bcryptjs';
import { Storage } from '@ionic/storage/dist/storage';
import { TabsPage } from '../tabs/tabs';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  private credentials: any = {
    username: "",
    password: ""
  };

  private loader: any;

  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public navCtrl: NavController, public navParams: NavParams, public events: Events, private api: API, public storage: Storage) {
  }

  ionViewDidLoad() {
  }

  public createAccount() {
    this.navCtrl.push(CreateAccountPage);
  }

  private login() {
    this.presentLoginLoading();
    
    // bcrypt.genSalt(10, (err, salt) => {
      // bcrypt.hash(this.credentials.password, salt, (err, hash) => {
        // // Password encrypted, now send data to server
        // let payload = {
        //   'username': this.credentials.username,
        //   // 'password': hash
        //   'password': this.credentials.password // Password is now encrypted server-side
        // };

    this.api.getToken(this.credentials).then(data => {
      this.loader.dismiss();
      
      this.storage.set('authed', true);
      this.storage.set('userId', 1);
      
      this.events.publish('user:login');
    }).catch(e => {
      let error = e.error;

      this.loader.dismiss();

      if (error.error == 'invalid_grant') {
        console.log("Erreur d'authentification : identifiant/mot de passe incorrect");

        this.showAlert('Bad credentials', 'Your username nor password is wrong.');
      }
      else if (error.error == 'unauthorized') {
        console.log(error.error_description);

        this.showAlert('Unauthorized', error.error_description);
      }
      else {
        console.log(`${error.error} : ${error.error_description}`);

        this.showAlert(error.error, error.error_description);
      }
    })
      // });
  //  });
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
}
