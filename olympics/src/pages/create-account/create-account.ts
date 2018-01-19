import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  credentials:any = {
                      email:"",
                      password:"",
                      confirmPassword:"",
                      firstname:"",
                      lastname:""
                    };

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
  }

  public signup() {
    if (this.credentials.password == this.credentials.confirmPassword)
      this.navCtrl.pop();
  }

}
