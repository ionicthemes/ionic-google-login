var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ComponentFactoryResolver, ElementRef, Inject, OpaqueToken, Renderer, ViewChild, ViewContainerRef } from '@angular/core';
import { App } from './app';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { OverlayPortal } from '../nav/overlay-portal';
import { Platform } from '../../platform/platform';
export var AppRootToken = new OpaqueToken('USERROOT');
export var IonicApp = (function (_super) {
    __extends(IonicApp, _super);
    function IonicApp(_userCmp, _cfr, elementRef, renderer, config, _platform, app) {
        _super.call(this, config, elementRef, renderer);
        this._userCmp = _userCmp;
        this._cfr = _cfr;
        this._platform = _platform;
        app._appRoot = this;
    }
    IonicApp.prototype.ngOnInit = function () {
        var _this = this;
        var factory = this._cfr.resolveComponentFactory(this._userCmp);
        var componentRef = this._viewport.createComponent(factory);
        this._renderer.setElementClass(componentRef.location.nativeElement, 'app-root', true);
        componentRef.changeDetectorRef.detectChanges();
        this.setElementClass(this._config.get('mode'), true);
        var versions = this._platform.versions();
        this._platform.platforms().forEach(function (platformName) {
            var platformClass = 'platform-' + platformName;
            _this.setElementClass(platformClass, true);
            var platformVersion = versions[platformName];
            if (platformVersion) {
                platformClass += platformVersion.major;
                _this.setElementClass(platformClass, true);
                _this.setElementClass(platformClass + '_' + platformVersion.minor, true);
            }
        });
        if (this._config.getBoolean('hoverCSS', true)) {
            this.setElementClass('enable-hover', true);
        }
        this._platform.prepareReady();
    };
    IonicApp.prototype._getPortal = function (portal) {
        if (portal === AppPortal.LOADING) {
            return this._loadingPortal;
        }
        if (portal === AppPortal.TOAST) {
            return this._toastPortal;
        }
        if (portal === AppPortal.MODAL) {
            return this._modalPortal;
        }
        return this._overlayPortal;
    };
    IonicApp.prototype._disableScroll = function (shouldDisableScroll) {
        this.setElementClass('disable-scroll', shouldDisableScroll);
    };
    IonicApp.decorators = [
        { type: Component, args: [{
                    selector: 'ion-app',
                    template: '<div #viewport app-viewport></div>' +
                        '<div #modalPortal overlay-portal></div>' +
                        '<div #overlayPortal overlay-portal></div>' +
                        '<div #loadingPortal class="loading-portal" overlay-portal></div>' +
                        '<div #toastPortal class="toast-portal" overlay-portal></div>' +
                        '<div class="click-block"></div>'
                },] },
    ];
    IonicApp.ctorParameters = [
        { type: undefined, decorators: [{ type: Inject, args: [AppRootToken,] },] },
        { type: ComponentFactoryResolver, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: Config, },
        { type: Platform, },
        { type: App, },
    ];
    IonicApp.propDecorators = {
        '_viewport': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
        '_modalPortal': [{ type: ViewChild, args: ['modalPortal', { read: OverlayPortal },] },],
        '_overlayPortal': [{ type: ViewChild, args: ['overlayPortal', { read: OverlayPortal },] },],
        '_loadingPortal': [{ type: ViewChild, args: ['loadingPortal', { read: OverlayPortal },] },],
        '_toastPortal': [{ type: ViewChild, args: ['toastPortal', { read: OverlayPortal },] },],
    };
    return IonicApp;
}(Ion));
export var AppPortal;
(function (AppPortal) {
    AppPortal[AppPortal["DEFAULT"] = 0] = "DEFAULT";
    AppPortal[AppPortal["MODAL"] = 1] = "MODAL";
    AppPortal[AppPortal["LOADING"] = 2] = "LOADING";
    AppPortal[AppPortal["TOAST"] = 3] = "TOAST";
})(AppPortal || (AppPortal = {}));
;
//# sourceMappingURL=app-root.js.map