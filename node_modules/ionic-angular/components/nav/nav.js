var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ComponentFactoryResolver, ElementRef, Input, Optional, NgZone, Renderer, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
import { Keyboard } from '../../util/keyboard';
import { NavControllerBase } from '../../navigation/nav-controller-base';
import { TransitionController } from '../../transitions/transition-controller';
import { ViewController } from '../../navigation/view-controller';
export var Nav = (function (_super) {
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
            this._sbEnabled = isTrueProperty(val);
        },
        enumerable: true,
        configurable: true
    });
    Nav.prototype.destroy = function () {
        this.destroy();
    };
    Nav.decorators = [
        { type: Component, args: [{
                    selector: 'ion-nav',
                    template: '<div #viewport nav-viewport></div>' +
                        '<div class="nav-decor"></div>',
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    Nav.ctorParameters = [
        { type: ViewController, decorators: [{ type: Optional },] },
        { type: NavControllerBase, decorators: [{ type: Optional },] },
        { type: App, },
        { type: Config, },
        { type: Keyboard, },
        { type: ElementRef, },
        { type: NgZone, },
        { type: Renderer, },
        { type: ComponentFactoryResolver, },
        { type: GestureController, },
        { type: TransitionController, },
        { type: DeepLinker, decorators: [{ type: Optional },] },
    ];
    Nav.propDecorators = {
        '_vp': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
        'root': [{ type: Input },],
        'rootParams': [{ type: Input },],
        'swipeBackEnabled': [{ type: Input },],
    };
    return Nav;
}(NavControllerBase));
//# sourceMappingURL=nav.js.map