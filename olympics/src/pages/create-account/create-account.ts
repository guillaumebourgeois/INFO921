import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { API } from '../../providers/api';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  credentials:any = {
    email: "",
    password: "",
    username: "",
    userId: null,
    age: null
  };
  private confirmPassword: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: API) {
  }

  ionViewDidLoad() {
  }

  public signup() {
    if (this.credentials.password == this.confirmPassword) {
      this.api.createUser(this.credentials).then(data => {
        console.log(data);
      })
    }
      //this.navCtrl.pop();
  }

}
