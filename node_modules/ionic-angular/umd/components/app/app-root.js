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
        define(["require", "exports", '@angular/core', './app', '../../config/config', '../ion', '../nav/overlay-portal', '../../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('./app');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var overlay_portal_1 = require('../nav/overlay-portal');
    var platform_1 = require('../../platform/platform');
    exports.AppRootToken = new core_1.OpaqueToken('USERROOT');
    var IonicApp = (function (_super) {
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
            { type: core_1.Component, args: [{
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
            { type: undefined, decorators: [{ type: core_1.Inject, args: [exports.AppRootToken,] },] },
            { type: core_1.ComponentFactoryResolver, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: config_1.Config, },
            { type: platform_1.Platform, },
            { type: app_1.App, },
        ];
        IonicApp.propDecorators = {
            '_viewport': [{ type: core_1.ViewChild, args: ['viewport', { read: core_1.ViewContainerRef },] },],
            '_modalPortal': [{ type: core_1.ViewChild, args: ['modalPortal', { read: overlay_portal_1.OverlayPortal },] },],
            '_overlayPortal': [{ type: core_1.ViewChild, args: ['overlayPortal', { read: overlay_portal_1.OverlayPortal },] },],
            '_loadingPortal': [{ type: core_1.ViewChild, args: ['loadingPortal', { read: overlay_portal_1.OverlayPortal },] },],
            '_toastPortal': [{ type: core_1.ViewChild, args: ['toastPortal', { read: overlay_portal_1.OverlayPortal },] },],
        };
        return IonicApp;
    }(ion_1.Ion));
    exports.IonicApp = IonicApp;
    (function (AppPortal) {
        AppPortal[AppPortal["DEFAULT"] = 0] = "DEFAULT";
        AppPortal[AppPortal["MODAL"] = 1] = "MODAL";
        AppPortal[AppPortal["LOADING"] = 2] = "LOADING";
        AppPortal[AppPortal["TOAST"] = 3] = "TOAST";
    })(exports.AppPortal || (exports.AppPortal = {}));
    var AppPortal = exports.AppPortal;
    ;
});
//# sourceMappingURL=app-root.js.map