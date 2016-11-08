var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ChangeDetectorRef, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Input, NgZone, Optional, Output, Renderer, ViewChild, ViewEncapsulation, ViewContainerRef } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
import { Keyboard } from '../../util/keyboard';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { Tabs } from './tabs';
import { TransitionController } from '../../transitions/transition-controller';
export var Tab = (function (_super) {
    __extends(Tab, _super);
    function Tab(parent, app, config, keyboard, elementRef, zone, renderer, cfr, _cd, gestureCtrl, transCtrl, linker) {
        _super.call(this, parent, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker);
        this._cd = _cd;
        this.linker = linker;
        this._isEnabled = true;
        this._isShown = true;
        this.ionSelect = new EventEmitter();
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
            this._isEnabled = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "show", {
        get: function () {
            return this._isShown;
        },
        set: function (val) {
            this._isShown = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "swipeBackEnabled", {
        get: function () {
            return this._sbEnabled;
        },
        set: function (val) {
            this._sbEnabled = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Tab.prototype, "tabsHideOnSubPages", {
        get: function () {
            return this._tabsHideOnSubPages;
        },
        set: function (val) {
            this._tabsHideOnSubPages = isTrueProperty(val);
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
        { type: Component, args: [{
                    selector: 'ion-tab',
                    template: '<div #viewport></div><div class="nav-decor"></div>',
                    host: {
                        '[attr.id]': '_tabId',
                        '[attr.aria-labelledby]': '_btnId',
                        'role': 'tabpanel'
                    },
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    Tab.ctorParameters = [
        { type: Tabs, },
        { type: App, },
        { type: Config, },
        { type: Keyboard, },
        { type: ElementRef, },
        { type: NgZone, },
        { type: Renderer, },
        { type: ComponentFactoryResolver, },
        { type: ChangeDetectorRef, },
        { type: GestureController, },
        { type: TransitionController, },
        { type: DeepLinker, decorators: [{ type: Optional },] },
    ];
    Tab.propDecorators = {
        'root': [{ type: Input },],
        'rootParams': [{ type: Input },],
        'tabUrlPath': [{ type: Input },],
        'tabTitle': [{ type: Input },],
        'tabIcon': [{ type: Input },],
        'tabBadge': [{ type: Input },],
        'tabBadgeStyle': [{ type: Input },],
        'enabled': [{ type: Input },],
        'show': [{ type: Input },],
        'swipeBackEnabled': [{ type: Input },],
        'tabsHideOnSubPages': [{ type: Input },],
        'ionSelect': [{ type: Output },],
        '_vp': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
    };
    return Tab;
}(NavControllerBase));
//# sourceMappingURL=tab.js.map