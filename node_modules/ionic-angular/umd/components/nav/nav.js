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
        define(["require", "exports", '@angular/core', '../app/app', '../../config/config', '../../navigation/deep-linker', '../../gestures/gesture-controller', '../../util/util', '../../util/keyboard', '../../navigation/nav-controller-base', '../../transitions/transition-controller', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var config_1 = require('../../config/config');
    var deep_linker_1 = require('../../navigation/deep-linker');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var util_1 = require('../../util/util');
    var keyboard_1 = require('../../util/keyboard');
    var nav_controller_base_1 = require('../../navigation/nav-controller-base');
    var transition_controller_1 = require('../../transitions/transition-controller');
    var view_controller_1 = require('../../navigation/view-controller');
    var Nav = (function (_super) {
        __extends(Nav, _super);
        function Nav(viewCtrl, parent, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker) {
            _super.call(this, parent, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker);
            this._hasInit = false;
            if (viewCtrl) {
                viewCtrl._setContent(this);
            }
            if (parent) {
                parent.registerChildNav(this);
            }
            else if (viewCtrl && viewCtrl.getNav()) {
                this.parent = viewCtrl.getNav();
                this.parent.registerChildNav(this);
            }
            else if (app && !app.getRootNav()) {
                app._setRootNav(this);
            }
        }
        Object.defineProperty(Nav.prototype, "_vp", {
            set: function (val) {
                this.setViewport(val);
            },
            enumerable: true,
            configurable: true
        });
        Nav.prototype.ngAfterViewInit = function () {
            this._hasInit = true;
            var navSegment = this._linker.initNav(this);
            if (navSegment && navSegment.component) {
                this.setPages(this._linker.initViews(navSegment), null, null);
            }
            else if (this._root) {
                this.push(this._root, this.rootParams, {
                    isNavRoot: (this._app.getRootNav() === this)
                }, null);
            }
        };
        Nav.prototype.goToRoot = function (opts) {
            this.setRoot(this._root, this.rootParams, opts, null);
        };
        Object.defineProperty(Nav.prototype, "root", {
            get: function () {
                return this._root;
            },
            set: function (page) {
                this._root = page;
                if (this._hasInit) {
                    this.setRoot(page);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Nav.prototype, "swipeBackEnabled", {
            get: function () {
                return this._sbEnabled;
            },
            set: function (val) {
                this._sbEnabled = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Nav.prototype.destroy = function () {
            this.destroy();
        };
        Nav.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-nav',
                        template: '<div #viewport nav-viewport></div>' +
                            '<div class="nav-decor"></div>',
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Nav.ctorParameters = [
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
            { type: nav_controller_base_1.NavControllerBase, decorators: [{ type: core_1.Optional },] },
            { type: app_1.App, },
            { type: config_1.Config, },
            { type: keyboard_1.Keyboard, },
            { type: core_1.ElementRef, },
            { type: core_1.NgZone, },
            { type: core_1.Renderer, },
            { type: core_1.ComponentFactoryResolver, },
            { type: gesture_controller_1.GestureController, },
            { type: transition_controller_1.TransitionController, },
            { type: deep_linker_1.DeepLinker, decorators: [{ type: core_1.Optional },] },
        ];
        Nav.propDecorators = {
            '_vp': [{ type: core_1.ViewChild, args: ['viewport', { read: core_1.ViewContainerRef },] },],
            'root': [{ type: core_1.Input },],
            'rootParams': [{ type: core_1.Input },],
            'swipeBackEnabled': [{ type: core_1.Input },],
        };
        return Nav;
    }(nav_controller_base_1.NavControllerBase));
    exports.Nav = Nav;
});
//# sourceMappingURL=nav.js.map