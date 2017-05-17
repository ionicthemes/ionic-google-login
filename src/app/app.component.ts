import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { SplashScreen} from "@ionic-native/splash-screen";
import { StatusBar} from "@ionic-native/status-bar";
import { GooglePlus } from '@ionic-native/google-plus';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';



@Component({
  template: `<ion-nav [root]="rootPage"></ion-nav>`
})
export class MyApp {

  @ViewChild(Nav) nav: Nav;
  rootPage: any;

  constructor(
    platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
    public googlePlus: GooglePlus) {

      platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      let env = this;
        // user is previously logged and we have his data
        // we will let him access the app
      this.googlePlus.trySilentLogin({
        'scopes': '', // optional, space-separated list of scopes, If not included or empty, defaults to `profile` and `email`.
        'webClientId': 'webClientId.apps.googleusercontent.com', // optional clientId of your Web application from Credentials settings of your project - On Android, this MUST be included to get an idToken. On iOS, it is not required.
        'offline': true
      })
      .then(function(data) {
        env.nav.push(UserPage);
        env.splashScreen.hide();
      }, function (error){
        env.nav.push(LoginPage);
        env.splashScreen.hide();
      });

      this.statusBar.styleDefault();
    });
  }
}
