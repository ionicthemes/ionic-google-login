import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';
import { GooglePlus } from 'ionic-native';

import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {

  user: any;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
    this.user = {name : navParams.get('userName'),
                 email : navParams.get('userEmail'),
                 picture : navParams.get('userPicture')
               }
  }

  doGoogleLogout(){
    let nav = this.navCtrl;
    GooglePlus.logout()
    .then(function (response) {
        nav.push(LoginPage);
    },function (error) {
        console.log(error);
    })
  }

}
