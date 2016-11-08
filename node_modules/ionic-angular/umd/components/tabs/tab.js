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
        define(["require", "exports", '@angular/core', '../app/app', '../../config/config', '../../navigation/deep-linker', '../../gestures/gesture-controller', '../../util/util', '../../util/keyboard', '../../navigation/nav-controller-base', './tabs', '../../transitions/transition-controller'], factory);
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
    var tabs_1 = require('./tabs');
    var transition_controller_1 = require('../../transitions/transition-controller');
    var Tab = (function (_super) {
        __extends(Tab, _super);
        function Tab(parent, app, config, keyboard, elementRef, zone, renderer, cfr, _cd, gestureCtrl, transCtrl, linker) {
            _super.call(this, parent, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker);
            this._cd = _cd;
            this.linker = linker;
            this._isEnabled = true;
            this._isShown = true;
            this.ionSelect = new core_1.EventEmitter();
            this.id = parent.add(this);
            this._tabsHideOnSubPages = config.getBoolean('tabsHideOnSubPages');
            this._tabId = 'tabpanel-' + this.id;
            this._btnId = 'tab-' + this.id;
        }
        Object.defineProperty(Tab.prototype, "enabled", {
            get: function () {
                return this._isEnabled;
            },
            set: function (val) {
                this._isEnabled = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "show", {
            get: function () {
                return this._isShown;
            },
            set: function (val) {
                this._isShown = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "swipeBackEnabled", {
            get: function () {
                return this._sbEnabled;
            },
            set: function (val) {
                this._sbEnabled = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "tabsHideOnSubPages", {
            get: function () {
                return this._tabsHideOnSubPages;
            },
            set: function (val) {
                this._tabsHideOnSubPages = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Tab.prototype, "_vp", {
            set: function (val) {
                this.setViewport(val);
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.ngOnInit = function () {
            this.tabBadgeStyle = this.tabBadgeStyle ? this.tabBadgeStyle : 'default';
        };
        Tab.prototype.load = function (opts, done) {
            if (!this._loaded && this.root) {
                this.push(this.root, this.rootParams, opts, done);
                this._loaded = true;
            }
            else {
                done(true);
            }
        };
        Tab.prototype._viewAttachToDOM = function (viewCtrl, componentRef, viewport) {
            var isTabSubPage = (this._tabsHideOnSubPages && viewCtrl.index > 0);
            if (isTabSubPage) {
                viewport = this.parent.portal;
            }
            _super.prototype._viewAttachToDOM.call(this, viewCtrl, componentRef, viewport);
            if (isTabSubPage) {
                var pageEleRef = viewCtrl.pageRef();
                if (pageEleRef) {
                    this._renderer.setElementClass(pageEleRef.nativeElement, 'tab-subpage', true);
                }
            }
        };
        Tab.prototype.setSelected = function (isSelected) {
            this.isSelected = isSelected;
            this.setElementClass('show-tab', isSelected);
            this.setElementAttribute('aria-hidden', (!isSelected).toString());
            if (isSelected) {
                this._cd.reattach();
            }
            else {
                this._cd.detach();
            }
        };
        Object.defineProperty(Tab.prototype, "index", {
            get: function () {
                return this.parent.getIndex(this);
            },
            enumerable: true,
            configurable: true
        });
        Tab.prototype.updateHref = function (component, data) {
            if (this.btn && this.linker) {
                var href = this.linker.createUrl(this, component, data) || '#';
                this.btn.updateHref(href);
            }
        };
        Tab.prototype.destroy = function () {
            this.destroy();
        };
        Tab.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-tab',
                        template: '<div #viewport></div><div class="nav-decor"></div>',
                        host: {
                            '[attr.id]': '_tabId',
                            '[attr.aria-labelledby]': '_btnId',
                            'role': 'tabpanel'
                        },
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Tab.ctorParameters = [
            { type: tabs_1.Tabs, },
            { type: app_1.App, },
            { type: config_1.Config, },
            { type: keyboard_1.Keyboard, },
            { type: core_1.ElementRef, },
            { type: core_1.NgZone, },
            { type: core_1.Renderer, },
            { type: core_1.ComponentFactoryResolver, },
            { type: core_1.ChangeDetectorRef, },
            { type: gesture_controller_1.GestureController, },
            { type: transition_controller_1.TransitionController, },
            { type: deep_linker_1.DeepLinker, decorators: [{ type: core_1.Optional },] },
        ];
        Tab.propDecorators = {
            'root': [{ type: core_1.Input },],
            'rootParams': [{ type: core_1.Input },],
            'tabUrlPath': [{ type: core_1.Input },],
            'tabTitle': [{ type: core_1.Input },],
            'tabIcon': [{ type: core_1.Input },],
            'tabBadge': [{ type: core_1.Input },],
            'tabBadgeStyle': [{ type: core_1.Input },],
            'enabled': [{ type: core_1.Input },],
            'show': [{ type: core_1.Input },],
            'swipeBackEnabled': [{ type: core_1.Input },],
            'tabsHideOnSubPages': [{ type: core_1.Input },],
            'ionSelect': [{ type: core_1.Output },],
            '_vp': [{ type: core_1.ViewChild, args: ['viewport', { read: core_1.ViewContainerRef },] },],
        };
        return Tab;
    }(nav_controller_base_1.NavControllerBase));
    exports.Tab = Tab;
});
//# sourceMappingURL=tab.js.map