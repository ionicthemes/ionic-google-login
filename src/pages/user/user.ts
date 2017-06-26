import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GooglePlus } from '@ionic-native/google-plus';
import { NativeStorage } from '@ionic-native/native-storage';
import { LoginPage } from '../login/login';
import { UserModel } from './user.model';

@Component({
  selector: 'page-user',
  templateUrl: 'user.html'
})

export class UserPage {
  user: UserModel = new UserModel();

  constructor(
    public navCtrl: NavController,
    public nativeStorage: NativeStorage,
    public googlePlus: GooglePlus) {}

  ionViewCanEnter(){
    let env = this;
    this.nativeStorage.getItem('user')
    .then(function (data){
      env.user = {
        name: data.name,
        email: data.email,
        picture: data.picture
      };
    }, function(error){
      console.log(error);
    });
  }

  doGoogleLogout(){
    let nav = this.navCtrl;
    let env = this;
    this.googlePlus.logout()
    .then(function (response) {
      env.nativeStorage.remove('user');
      nav.push(LoginPage);
    },function (error) {
      console.log(error);
    })
  }

}
