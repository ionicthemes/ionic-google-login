import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { GooglePlus } from 'ionic-native';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  constructor(public navCtrl: NavController) {

  }

  doGoogleLogin(){
    let nav = this.navCtrl;
    GooglePlus.login({
      'scopes': 'email', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
      'webClientId': '1091419544653-nhncrb7n0sk43t3unhqk3q8h6smnbt22.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
      'offline': true,})
    .then(function (user) {
      nav.push(UserPage,{
           userName: user.displayName,
           userEmail: user.email,
           userPicture: user.imageUrl
         });
    }, function (error) {
      console.log(error);
    });
  }
}
