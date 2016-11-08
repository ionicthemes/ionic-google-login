import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from '../../config/config';
import { isNav, isTabs, DIRECTION_FORWARD, DIRECTION_BACK } from '../../navigation/nav-util';
import { Platform } from '../../platform/platform';
export var App = (function () {
    function App(_config, _platform) {
        this._config = _config;
        this._platform = _platform;
        this._disTime = 0;
        this._scrollTime = 0;
        this._title = '';
        this._titleSrv = new Title();
        this._rootNav = null;
        this.viewDidLoad = new EventEmitter();
        this.viewWillEnter = new EventEmitter();
        this.viewDidEnter = new EventEmitter();
        this.viewWillLeave = new EventEmitter();
        this.viewDidLeave = new EventEmitter();
        this.viewWillUnload = new EventEmitter();
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
        opts.direction = DIRECTION_FORWARD;
        if (!opts.animation) {
            opts.animation = enteringView.getTransitionName(DIRECTION_FORWARD);
        }
        enteringView.setLeavingOpts({
            keyboardClose: false,
            direction: DIRECTION_BACK,
            animation: enteringView.getTransitionName(DIRECTION_BACK),
            ev: opts.ev
        });
        return portal.insertPages(-1, [enteringView], opts);
    };
    App.prototype.navPop = function () {
        function navPop(nav) {
            if (nav) {
                if (isTabs(nav)) {
                    var prevTab = nav.previousTab(true);
                    if (prevTab) {
                        (void 0);
                        nav.select(prevTab);
                        return Promise.resolve();
                    }
                }
                else if (isNav(nav) && nav.length() > 1) {
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
        { type: Injectable },
    ];
    App.ctorParameters = [
        { type: Config, },
        { type: Platform, },
    ];
    return App;
}());
var ACTIVE_SCROLLING_TIME = 100;
var CLICK_BLOCK_BUFFER_IN_MILLIS = 64;
//# sourceMappingURL=app.js.map