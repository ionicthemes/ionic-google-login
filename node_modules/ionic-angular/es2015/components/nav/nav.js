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
export class Nav extends NavControllerBase {
    constructor(viewCtrl, parent, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker) {
        super(parent, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker);
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
    set _vp(val) {
        this.setViewport(val);
    }
    ngAfterViewInit() {
        this._hasInit = true;
        let navSegment = this._linker.initNav(this);
        if (navSegment && navSegment.component) {
            this.setPages(this._linker.initViews(navSegment), null, null);
        }
        else if (this._root) {
            this.push(this._root, this.rootParams, {
                isNavRoot: (this._app.getRootNav() === this)
            }, null);
        }
    }
    goToRoot(opts) {
        this.setRoot(this._root, this.rootParams, opts, null);
    }
    get root() {
        return this._root;
    }
    set root(page) {
        this._root = page;
        if (this._hasInit) {
            this.setRoot(page);
        }
    }
    get swipeBackEnabled() {
        return this._sbEnabled;
    }
    set swipeBackEnabled(val) {
        this._sbEnabled = isTrueProperty(val);
    }
    destroy() {
        this.destroy();
    }
}
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
//# sourceMappingURL=nav.js.map