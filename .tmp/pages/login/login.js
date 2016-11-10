var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component } from '@angular/core';
import { NavController, LoadingController } from 'ionic-angular';
import { UserPage } from '../user/user';
import { GooglePlus } from 'ionic-native';
export var LoginPage = (function () {
    function LoginPage(navCtrl, loadingCtrl) {
        this.navCtrl = navCtrl;
        this.loadingCtrl = loadingCtrl;
    }
    LoginPage.prototype.doGoogleLogin = function () {
        var nav = this.navCtrl;
        var loading = this.loadingCtrl.create({
            content: 'Please wait...'
        });
        loading.present();
        GooglePlus.login({
            'scopes': '',
            'webClientId': '1091419544653-nhncrb7n0sk43t3unhqk3q8h6smnbt22.apps.googleusercontent.com',
            'offline': true, })
            .then(function (user) {
            loading.dismiss();
            nav.push(UserPage, {
                userName: user.displayName,
                userEmail: user.email,
                userPicture: user.imageUrl
            });
        }, function (error) {
            loading.dismiss();
            console.log(error);
        });
    };
    LoginPage = __decorate([
        Component({
            selector: 'page-login',template:/*ion-inline-start:"/Users/startapplabs/IonicThemes/Ionic2GoogleLogin/src/pages/login/login.html"*/'<ion-content class="login-content" padding>\n  <ion-row class="top-row">\n    <ion-col>\n      <h1 class="label-logo">LOGO</h1>\n      <p class="label-description">This app helps you discover and buy amazing things all in one place</p>\n    </ion-col>\n  </ion-row>\n  <ion-row class="bottom-row">\n    <ion-col class="login-button">\n      <button ion-button block color="danger" (click)="doGoogleLogin()">Google Login</button>\n    </ion-col>\n  </ion-row>\n</ion-content>\n'/*ion-inline-end:"/Users/startapplabs/IonicThemes/Ionic2GoogleLogin/src/pages/login/login.html"*/,
        }), 
        __metadata('design:paramtypes', [NavController, LoadingController])
    ], LoginPage);
    return LoginPage;
}());
//# sourceMappingURL=login.js.map