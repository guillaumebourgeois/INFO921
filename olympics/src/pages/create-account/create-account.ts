import { Component } from '@angular/core';
import { NavController, NavParams, LoadingController, Events } from 'ionic-angular';
import * as bcrypt from 'bcryptjs';
import { UserService } from '../../providers/api/services/user.service';
import { User } from '../../providers/api/models/user';
import { TabsPage } from '../tabs/tabs';
import { AuthService } from '../../providers/api/services/auth.service';
import { Storage } from '@ionic/storage';

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

  private loader: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public userService: UserService, public loadingCtrl: LoadingController, public storage: Storage, public auth: AuthService, public events: Events) {}

  ionViewDidLoad() {}

  public signup() {
    if (this.credentials.password == this.confirmPassword) {
      this.presentLoginLoading();

      // Encrypt password
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(this.credentials.password, salt, (err, hash) => {
          // Send data with encrypted password
          // We must create a new object, because the let keyword returns a pointer when assigning a variable by rvalue.
          // If we don't, the credentials object is modified and we can't login after the signup request
          this.userService.createUser({
            username: this.credentials.username,
            password: hash,
            userId: null,
            age: null,
            email: this.credentials.email
          }).subscribe(
            data => {
              this.auth.getToken({ username: this.credentials.username, password: this.credentials.password }).subscribe(token => {
                this.auth.setToken(token);
                this.storage.set('token', token);
                this.storage.set('authed', true);
                this.storage.set('userId', 1);
                this.navCtrl.pop(); // Pop signup page not to see it when we log out
                this.loader.dismiss();
                this.navCtrl.push(TabsPage);
              }, err => {
                this.navCtrl.pop();
                this.loader.dismiss();
                this.events.publish('error', 'Error during authentication', err.error.error_description);
              })
            },
            err => {
              this.navCtrl.pop();
              this.loader.dismiss();
              this.events.publish('error', 'Error creating account', err.error.error_description);
            }
          )
        });
      });
    }
  }

  private presentLoginLoading() {
    this.loader = this.loadingCtrl.create({
      content: "Connecting..."
    });
    this.loader.present();
  }
}
