var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../app/app', '../../config/config', '../../util/util', '../../navigation/nav-controller', '../toolbar/toolbar', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var util_1 = require('../../util/util');
    var nav_controller_1 = require('../../navigation/nav-controller');
    var toolbar_1 = require('../toolbar/toolbar');
    var view_controller_1 = require('../../navigation/view-controller');
    var Navbar = (function (_super) {
        __extends(Navbar, _super);
        function Navbar(_app, viewCtrl, navCtrl, config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this._app = _app;
            this.navCtrl = navCtrl;
            this._hidden = false;
            this._hideBb = false;
            this.mode = config.get('mode');
            viewCtrl && viewCtrl._setNavbar(this);
            this._bbIcon = config.get('backButtonIcon');
            this._sbPadding = config.getBoolean('statusbarPadding');
        }
        Object.defineProperty(Navbar.prototype, "color", {
            set: function (val) {
                this._setColor('toolbar', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Navbar.prototype, "mode", {
            set: function (val) {
                this._setMode('toolbar', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Navbar.prototype, "hideBackButton", {
            get: function () {
                return this._hideBb;
            },
            set: function (val) {
                this._hideBb = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Navbar.prototype.ngAfterViewInit = function () {
            this.setBackButtonText(this._config.get('backButtonText', 'Back'));
        };
        Navbar.prototype.backButtonClick = function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            this.navCtrl && this.navCtrl.pop(null, null);
        };
        Navbar.prototype.setBackButtonText = function (text) {
            this._renderer.setText(this._bbTxt.nativeElement, text);
        };
        Navbar.prototype.didEnter = function () {
            try {
                this._app.setTitle(this.getTitleText());
            }
            catch (e) {
                console.error(e);
            }
        };
        Navbar.prototype.setHidden = function (isHidden) {
            this._hidden = isHidden;
        };
        Navbar.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-navbar',
                        template: '<div class="toolbar-background" [ngClass]="\'toolbar-background-\' + _mode"></div>' +
                            '<button (click)="backButtonClick($event)" ion-button="bar-button" class="back-button" [ngClass]="\'back-button-\' + _mode" [hidden]="_hideBb">' +
                            '<span class="button-inner">' +
                            '<ion-icon class="back-button-icon" [ngClass]="\'back-button-icon-\' + _mode" [name]="_bbIcon"></ion-icon>' +
                            '<span class="back-button-text" [ngClass]="\'back-button-text-\' + _mode" #bbTxt></span>' +
                            '</span>' +
                            '</button>' +
                            '<ng-content select="[menuToggle],ion-buttons[left]"></ng-content>' +
                            '<ng-content select="ion-buttons[start]"></ng-content>' +
                            '<ng-content select="ion-buttons[end],ion-buttons[right]"></ng-content>' +
                            '<div class="toolbar-content" [ngClass]="\'toolbar-content-\' + _mode">' +
                            '<ng-content></ng-content>' +
                            '</div>',
                        host: {
                            '[hidden]': '_hidden',
                            'class': 'toolbar',
                            '[class.statusbar-padding]': '_sbPadding'
                        }
                    },] },
        ];
        Navbar.ctorParameters = [
            { type: app_1.App, },
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
            { type: nav_controller_1.NavController, decorators: [{ type: core_1.Optional },] },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Navbar.propDecorators = {
            '_bbTxt': [{ type: core_1.ViewChild, args: ['bbTxt',] },],
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'hideBackButton': [{ type: core_1.Input },],
        };
        return Navbar;
    }(toolbar_1.ToolbarBase));
    exports.Navbar = Navbar;
});
//# sourceMappingURL=navbar.js.map