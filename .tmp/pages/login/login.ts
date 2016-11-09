import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { UserPage } from '../user/user';
import { GooglePlus } from 'ionic-native';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  doGoogleLogin(){

    GooglePlus.login()
    .then(function (response) {
      console.log(response);
    }, function (error) {
      console.log(error);
    });
  }
}
