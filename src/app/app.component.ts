import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, GooglePlus } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let env = this;
        // user is previously logged and we have his data
        // we will let him access the app
      GooglePlus.trySilentLogin({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })
      .then(function(data) {
        env.nav.push(UserPage);
        Splashscreen.hide();
      }, function (error){
        env.nav.push(LoginPage);
        Splashscreen.hide();
      });

      StatusBar.styleDefault();
    });
  }
}
