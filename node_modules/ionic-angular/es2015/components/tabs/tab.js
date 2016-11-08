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
export class Tab extends NavControllerBase {
    constructor(parent, app, config, keyboard, elementRef, zone, renderer, cfr, _cd, gestureCtrl, transCtrl, linker) {
        super(parent, app, config, keyboard, elementRef, zone, renderer, cfr, gestureCtrl, transCtrl, linker);
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
    get enabled() {
        return this._isEnabled;
    }
    set enabled(val) {
        this._isEnabled = isTrueProperty(val);
    }
    get show() {
        return this._isShown;
    }
    set show(val) {
        this._isShown = isTrueProperty(val);
    }
    get swipeBackEnabled() {
        return this._sbEnabled;
    }
    set swipeBackEnabled(val) {
        this._sbEnabled = isTrueProperty(val);
    }
    get tabsHideOnSubPages() {
        return this._tabsHideOnSubPages;
    }
    set tabsHideOnSubPages(val) {
        this._tabsHideOnSubPages = isTrueProperty(val);
    }
    set _vp(val) {
        this.setViewport(val);
    }
    ngOnInit() {
        this.tabBadgeStyle = this.tabBadgeStyle ? this.tabBadgeStyle : 'default';
    }
    load(opts, done) {
        if (!this._loaded && this.root) {
            this.push(this.root, this.rootParams, opts, done);
            this._loaded = true;
        }
        else {
            done(true);
        }
    }
    _viewAttachToDOM(viewCtrl, componentRef, viewport) {
        const isTabSubPage = (this._tabsHideOnSubPages && viewCtrl.index > 0);
        if (isTabSubPage) {
            viewport = this.parent.portal;
        }
        super._viewAttachToDOM(viewCtrl, componentRef, viewport);
        if (isTabSubPage) {
            const pageEleRef = viewCtrl.pageRef();
            if (pageEleRef) {
                this._renderer.setElementClass(pageEleRef.nativeElement, 'tab-subpage', true);
            }
        }
    }
    setSelected(isSelected) {
        this.isSelected = isSelected;
        this.setElementClass('show-tab', isSelected);
        this.setElementAttribute('aria-hidden', (!isSelected).toString());
        if (isSelected) {
            this._cd.reattach();
        }
        else {
            this._cd.detach();
        }
    }
    get index() {
        return this.parent.getIndex(this);
    }
    updateHref(component, data) {
        if (this.btn && this.linker) {
            let href = this.linker.createUrl(this, component, data) || '#';
            this.btn.updateHref(href);
        }
    }
    destroy() {
        this.destroy();
    }
}
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
//# sourceMappingURL=tab.js.map