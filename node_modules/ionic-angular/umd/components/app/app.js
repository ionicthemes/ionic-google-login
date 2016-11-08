(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/platform-browser', '../../config/config', '../../navigation/nav-util', '../../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var platform_browser_1 = require('@angular/platform-browser');
    var config_1 = require('../../config/config');
    var nav_util_1 = require('../../navigation/nav-util');
    var platform_1 = require('../../platform/platform');
    var App = (function () {
        function App(_config, _platform) {
            this._config = _config;
            this._platform = _platform;
            this._disTime = 0;
            this._scrollTime = 0;
            this._title = '';
            this._titleSrv = new platform_browser_1.Title();
            this._rootNav = null;
            this.viewDidLoad = new core_1.EventEmitter();
            this.viewWillEnter = new core_1.EventEmitter();
            this.viewDidEnter = new core_1.EventEmitter();
            this.viewWillLeave = new core_1.EventEmitter();
            this.viewDidLeave = new core_1.EventEmitter();
            this.viewWillUnload = new core_1.EventEmitter();
            _platform.registerBackButtonAction(this.navPop.bind(this));
            this._canDisableScroll = _config.get('canDisableScroll', false);
        }
        App.prototype.setTitle = function (val) {
            if (val !== this._title) {
                this._title = val;
                this._titleSrv.setTitle(val);
            }
        };
        App.prototype.setElementClass = function (className, isAdd) {
            this._appRoot.setElementClass(className, isAdd);
        };
        App.prototype.setEnabled = function (isEnabled, duration) {
            if (duration === void 0) { duration = 700; }
            this._disTime = (isEnabled ? 0 : Date.now() + duration);
            if (this._clickBlock) {
                if (isEnabled || duration <= 32) {
                    this._clickBlock.activate(false, 0);
                }
                else {
                    this._clickBlock.activate(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS);
                }
            }
        };
        App.prototype.setScrollDisabled = function (disableScroll) {
            if (this._canDisableScroll) {
                this._appRoot._disableScroll(disableScroll);
            }
        };
        App.prototype.isEnabled = function () {
            return (this._disTime < Date.now());
        };
        App.prototype.setScrolling = function () {
            this._scrollTime = Date.now();
        };
        App.prototype.isScrolling = function () {
            return ((this._scrollTime + ACTIVE_SCROLLING_TIME) > Date.now());
        };
        App.prototype.getActiveNav = function () {
            var nav = this._rootNav || null;
            var activeChildNav;
            while (nav) {
                activeChildNav = nav.getActiveChildNav();
                if (!activeChildNav) {
                    break;
                }
                nav = activeChildNav;
            }
            return nav;
        };
        App.prototype.getRootNav = function () {
            return this._rootNav;
        };
        App.prototype._setRootNav = function (nav) {
            this._rootNav = nav;
        };
        App.prototype.present = function (enteringView, opts, appPortal) {
            var portal = this._appRoot._getPortal(appPortal);
            enteringView._setNav(portal);
            opts.keyboardClose = false;
            opts.direction = nav_util_1.DIRECTION_FORWARD;
            if (!opts.animation) {
                opts.animation = enteringView.getTransitionName(nav_util_1.DIRECTION_FORWARD);
            }
            enteringView.setLeavingOpts({
                keyboardClose: false,
                direction: nav_util_1.DIRECTION_BACK,
                animation: enteringView.getTransitionName(nav_util_1.DIRECTION_BACK),
                ev: opts.ev
            });
            return portal.insertPages(-1, [enteringView], opts);
        };
        App.prototype.navPop = function () {
            function navPop(nav) {
                if (nav) {
                    if (nav_util_1.isTabs(nav)) {
                        var prevTab = nav.previousTab(true);
                        if (prevTab) {
                            (void 0);
                            nav.select(prevTab);
                            return Promise.resolve();
                        }
                    }
                    else if (nav_util_1.isNav(nav) && nav.length() > 1) {
                        (void 0);
                        return nav.pop();
                    }
                    return navPop(nav.parent);
                }
                return null;
            }
            if (this._rootNav && this.isEnabled()) {
                var portal = this._appRoot._getPortal();
                if (portal.length() > 0) {
                    (void 0);
                    return portal.pop();
                }
                var navPromise = navPop(this.getActiveNav());
                if (navPromise === null) {
                    if (this._config.getBoolean('navExitApp', true)) {
                        (void 0);
                        this._platform.exitApp();
                    }
                }
                return navPromise;
            }
            return Promise.resolve();
        };
        App.decorators = [
            { type: core_1.Injectable },
        ];
        App.ctorParameters = [
            { type: config_1.Config, },
            { type: platform_1.Platform, },
        ];
        return App;
    }());
    exports.App = App;
    var ACTIVE_SCROLLING_TIME = 100;
    var CLICK_BLOCK_BUFFER_IN_MILLIS = 64;
});
//# sourceMappingURL=app.js.map