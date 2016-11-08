import { EventEmitter, Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Config } from '../../config/config';
import { isNav, isTabs, DIRECTION_FORWARD, DIRECTION_BACK } from '../../navigation/nav-util';
import { Platform } from '../../platform/platform';
export class App {
    constructor(_config, _platform) {
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
    setTitle(val) {
        if (val !== this._title) {
            this._title = val;
            this._titleSrv.setTitle(val);
        }
    }
    setElementClass(className, isAdd) {
        this._appRoot.setElementClass(className, isAdd);
    }
    setEnabled(isEnabled, duration = 700) {
        this._disTime = (isEnabled ? 0 : Date.now() + duration);
        if (this._clickBlock) {
            if (isEnabled || duration <= 32) {
                this._clickBlock.activate(false, 0);
            }
            else {
                this._clickBlock.activate(true, duration + CLICK_BLOCK_BUFFER_IN_MILLIS);
            }
        }
    }
    setScrollDisabled(disableScroll) {
        if (this._canDisableScroll) {
            this._appRoot._disableScroll(disableScroll);
        }
    }
    isEnabled() {
        return (this._disTime < Date.now());
    }
    setScrolling() {
        this._scrollTime = Date.now();
    }
    isScrolling() {
        return ((this._scrollTime + ACTIVE_SCROLLING_TIME) > Date.now());
    }
    getActiveNav() {
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
    }
    getRootNav() {
        return this._rootNav;
    }
    _setRootNav(nav) {
        this._rootNav = nav;
    }
    present(enteringView, opts, appPortal) {
        const portal = this._appRoot._getPortal(appPortal);
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
    }
    navPop() {
        function navPop(nav) {
            if (nav) {
                if (isTabs(nav)) {
                    let prevTab = nav.previousTab(true);
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
            const portal = this._appRoot._getPortal();
            if (portal.length() > 0) {
                (void 0);
                return portal.pop();
            }
            let navPromise = navPop(this.getActiveNav());
            if (navPromise === null) {
                if (this._config.getBoolean('navExitApp', true)) {
                    (void 0);
                    this._platform.exitApp();
                }
            }
            return navPromise;
        }
        return Promise.resolve();
    }
}
App.decorators = [
    { type: Injectable },
];
App.ctorParameters = [
    { type: Config, },
    { type: Platform, },
];
const ACTIVE_SCROLLING_TIME = 100;
const CLICK_BLOCK_BUFFER_IN_MILLIS = 64;
//# sourceMappingURL=app.js.map