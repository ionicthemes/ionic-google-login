var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, ViewChild } from '@angular/core';
import { Platform, Nav } from 'ionic-angular';
import { StatusBar, Splashscreen, GooglePlus } from 'ionic-native';
import { LoginPage } from '../pages/login/login';
import { UserPage } from '../pages/user/user';
export var MyApp = (function () {
    function MyApp(platform) {
        var _this = this;
        platform.ready().then(function () {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            var env = _this;
            // user is previously logged and we have his data
            // we will let him access the app
            GooglePlus.trySilentLogin({
                'scopes': '',
                'webClientId': '1091419544653-nhncrb7n0sk43t3unhqk3q8h6smnbt22.apps.googleusercontent.com',
                'offline': true
            })
                .then(function (data) {
                env.nav.push(UserPage);
                Splashscreen.hide();
            }, function (error) {
                env.nav.push(LoginPage);
                Splashscreen.hide();
            });
            StatusBar.styleDefault();
        });
    }
    __decorate([
        ViewChild(Nav), 
        __metadata('design:type', Nav)
    ], MyApp.prototype, "nav", void 0);
    MyApp = __decorate([
        Component({
            template: "<ion-nav [root]=\"rootPage\"></ion-nav>"
        }), 
        __metadata('design:paramtypes', [Platform])
    ], MyApp);
    return MyApp;
}());
//# sourceMappingURL=app.component.js.map