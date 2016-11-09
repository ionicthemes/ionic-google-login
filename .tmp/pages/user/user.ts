import { Component } from '@angular/core';

import { NavController, NavParams } from 'ionic-angular';

// import { LoginPage } from '../login/login';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {

  user: any;

  constructor(public navCtrl: NavController, private navParams: NavParams) {
  }

  doGoogleLogout(){
  }

}
