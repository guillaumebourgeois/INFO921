import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { API } from '../../providers/api';
import * as bcrypt from 'bcryptjs';

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
      // Encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.credentials.password, salt, (err, hash) => {
          this.credentials.password = hash;
          
          // Send data with encrypted password
          this.api.createUser(this.credentials).then(data => {
            console.log("OK");
          })
        });
      });
    }
      //this.navCtrl.pop();
  }

}
