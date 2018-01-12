import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TabsPage } from '../tabs/tabs';
import { CreateAccountPage } from '../create-account/create-account';

@Component({
  selector: 'page-connection',
  templateUrl: 'connection.html',
})
export class ConnectionPage {

  credentials:any = {
                      email: "",
                      password: ""
                    };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  public createAccount() {
    this.navCtrl.push(CreateAccountPage);
  }

  public login() {
    if (this.credentials.email == "root" && this.credentials.password == "root") {
        this.navCtrl.setRoot(TabsPage);
        window["LocalData"].Set("Connected", "true");
    }
  }
}
