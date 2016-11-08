var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ElementRef, Input, Optional, Renderer, ViewChild } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { isTrueProperty } from '../../util/util';
import { NavController } from '../../navigation/nav-controller';
import { ToolbarBase } from '../toolbar/toolbar';
import { ViewController } from '../../navigation/view-controller';
export var Navbar = (function (_super) {
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
            this._hideBb = isTrueProperty(val);
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
        { type: Component, args: [{
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
        { type: App, },
        { type: ViewController, decorators: [{ type: Optional },] },
        { type: NavController, decorators: [{ type: Optional },] },
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    Navbar.propDecorators = {
        '_bbTxt': [{ type: ViewChild, args: ['bbTxt',] },],
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
        'hideBackButton': [{ type: Input },],
    };
    return Navbar;
}(ToolbarBase));
//# sourceMappingURL=navbar.js.map