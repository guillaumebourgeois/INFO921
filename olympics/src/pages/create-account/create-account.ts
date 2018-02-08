import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../providers/api/services/user.service';
import { User } from '../../providers/api/models/user';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html',
})
export class CreateAccountPage {

  private credentials: User = {
    email: "",
    password: "",
    username: "",
    userId: null,
    age: null
  };
  private confirmPassword: string = "";

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService) {
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
          this.userService.createUser(this.credentials).subscribe(
            data => console.log(data),
            err => console.log(err)
          )
        });
      });
    }
      //this.navCtrl.pop();
  }

}
