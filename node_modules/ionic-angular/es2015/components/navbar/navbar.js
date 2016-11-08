import { Component, ElementRef, Input, Optional, Renderer, ViewChild } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { isTrueProperty } from '../../util/util';
import { NavController } from '../../navigation/nav-controller';
import { ToolbarBase } from '../toolbar/toolbar';
import { ViewController } from '../../navigation/view-controller';
export class Navbar extends ToolbarBase {
    constructor(_app, viewCtrl, navCtrl, config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this._app = _app;
        this.navCtrl = navCtrl;
        this._hidden = false;
        this._hideBb = false;
        this.mode = config.get('mode');
        viewCtrl && viewCtrl._setNavbar(this);
        this._bbIcon = config.get('backButtonIcon');
        this._sbPadding = config.getBoolean('statusbarPadding');
    }
    set color(val) {
        this._setColor('toolbar', val);
    }
    set mode(val) {
        this._setMode('toolbar', val);
    }
    get hideBackButton() {
        return this._hideBb;
    }
    set hideBackButton(val) {
        this._hideBb = isTrueProperty(val);
    }
    ngAfterViewInit() {
        this.setBackButtonText(this._config.get('backButtonText', 'Back'));
    }
    backButtonClick(ev) {
        ev.preventDefault();
        ev.stopPropagation();
        this.navCtrl && this.navCtrl.pop(null, null);
    }
    setBackButtonText(text) {
        this._renderer.setText(this._bbTxt.nativeElement, text);
    }
    didEnter() {
        try {
            this._app.setTitle(this.getTitleText());
        }
        catch (e) {
            console.error(e);
        }
    }
    setHidden(isHidden) {
        this._hidden = isHidden;
    }
}
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
//# sourceMappingURL=navbar.js.map