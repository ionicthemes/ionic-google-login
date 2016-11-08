import { Component, ElementRef, EventEmitter, Input, Output, Optional, Renderer, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { App } from '../app/app';
import { Config } from '../../config/config';
import { DeepLinker } from '../../navigation/deep-linker';
import { Ion } from '../ion';
import { isBlank } from '../../util/util';
import { NavController } from '../../navigation/nav-controller';
import { DIRECTION_SWITCH } from '../../navigation/nav-util';
import { Platform } from '../../platform/platform';
import { TabHighlight } from './tab-highlight';
import { ViewController } from '../../navigation/view-controller';
export class Tabs extends Ion {
    constructor(parent, viewCtrl, _app, config, elementRef, _platform, renderer, _linker) {
        super(config, elementRef, renderer);
        this.viewCtrl = viewCtrl;
        this._app = _app;
        this._platform = _platform;
        this._linker = _linker;
        this._ids = -1;
        this._tabs = [];
        this._selectHistory = [];
        this.ionChange = new EventEmitter();
        this.mode = config.get('mode');
        this.parent = parent;
        this.id = 't' + (++tabIds);
        this._sbPadding = config.getBoolean('statusbarPadding');
        this.tabsHighlight = config.getBoolean('tabsHighlight');
        if (this.parent) {
            this.parent.registerChildNav(this);
        }
        else if (viewCtrl && viewCtrl.getNav()) {
            this.parent = viewCtrl.getNav();
            this.parent.registerChildNav(this);
        }
        else if (this._app) {
            this._app._setRootNav(this);
        }
        if (viewCtrl) {
            viewCtrl._setContent(this);
            viewCtrl._setContentRef(elementRef);
        }
    }
    set color(value) {
        this._setColor('tabs', value);
    }
    set mode(val) {
        this._setMode('tabs', val);
    }
    ngOnDestroy() {
        this.parent.unregisterChildNav(this);
    }
    ngAfterViewInit() {
        this._setConfig('tabsPlacement', 'bottom');
        this._setConfig('tabsLayout', 'icon-top');
        this._setConfig('tabsHighlight', this.tabsHighlight);
        if (this.tabsHighlight) {
            this._platform.onResize(() => {
                this._highlight.select(this.getSelected());
            });
        }
        this.initTabs();
    }
    initTabs() {
        let selectedIndex = (isBlank(this.selectedIndex) ? 0 : parseInt(this.selectedIndex, 10));
        const tabsSegment = this._linker.initNav(this);
        if (tabsSegment && isBlank(tabsSegment.component)) {
            selectedIndex = this._linker.getSelectedTabIndex(this, tabsSegment.name, selectedIndex);
        }
        let selectedTab = this._tabs.find((t, i) => i === selectedIndex && t.enabled && t.show);
        if (!selectedTab) {
            selectedTab = this._tabs.find(t => t.enabled && t.show);
        }
        if (selectedTab) {
            let pageId = null;
            if (tabsSegment) {
                let selectedTabSegment = this._linker.initNav(selectedTab);
                if (selectedTabSegment && selectedTabSegment.component) {
                    selectedTab.root = selectedTabSegment.component;
                    selectedTab.rootParams = selectedTabSegment.data;
                    pageId = selectedTabSegment.id;
                }
            }
            this.select(selectedTab, {
                id: pageId
            });
        }
        this._tabs.forEach(t => {
            t.updateHref(t.root, t.rootParams);
        });
    }
    _setConfig(attrKey, fallback) {
        let val = this[attrKey];
        if (isBlank(val)) {
            val = this._config.get(attrKey, fallback);
        }
        this.setElementAttribute(attrKey, val);
    }
    add(tab) {
        this._tabs.push(tab);
        return this.id + '-' + (++this._ids);
    }
    select(tabOrIndex, opts = {}) {
        const selectedTab = (typeof tabOrIndex === 'number' ? this.getByIndex(tabOrIndex) : tabOrIndex);
        if (isBlank(selectedTab)) {
            return;
        }
        const deselectedTab = this.getSelected();
        if (selectedTab === deselectedTab) {
            return this._touchActive(selectedTab);
        }
        let deselectedPage;
        if (deselectedTab) {
            deselectedPage = deselectedTab.getActive();
            deselectedPage && deselectedPage._willLeave();
        }
        opts.animate = false;
        const selectedPage = selectedTab.getActive();
        selectedPage && selectedPage._willEnter();
        selectedTab.load(opts, (alreadyLoaded) => {
            selectedTab.ionSelect.emit(selectedTab);
            this.ionChange.emit(selectedTab);
            if (selectedTab.root) {
                this._tabs.forEach(tab => {
                    tab.setSelected(tab === selectedTab);
                });
                if (this.tabsHighlight) {
                    this._highlight.select(selectedTab);
                }
                if (opts.updateUrl !== false) {
                    this._linker.navChange(DIRECTION_SWITCH);
                }
            }
            selectedPage && selectedPage._didEnter();
            deselectedPage && deselectedPage._didLeave();
            if (this._selectHistory[this._selectHistory.length - 1] !== selectedTab.id) {
                this._selectHistory.push(selectedTab.id);
            }
            if (alreadyLoaded && selectedPage) {
                let content = selectedPage.getIONContent();
                if (content) {
                    content.resize();
                }
            }
        });
    }
    previousTab(trimHistory = true) {
        (void 0);
        for (var i = this._selectHistory.length - 2; i >= 0; i--) {
            var tab = this._tabs.find(t => t.id === this._selectHistory[i]);
            if (tab && tab.enabled && tab.show) {
                if (trimHistory) {
                    this._selectHistory.splice(i + 1);
                }
                return tab;
            }
        }
        return null;
    }
    getByIndex(index) {
        return this._tabs[index];
    }
    getSelected() {
        for (var i = 0; i < this._tabs.length; i++) {
            if (this._tabs[i].isSelected) {
                return this._tabs[i];
            }
        }
        return null;
    }
    getActiveChildNav() {
        return this.getSelected();
    }
    getIndex(tab) {
        return this._tabs.indexOf(tab);
    }
    length() {
        return this._tabs.length;
    }
    _touchActive(tab) {
        const active = tab.getActive();
        if (active) {
            if (active._cmp && active._cmp.instance.ionSelected) {
                active._cmp.instance.ionSelected();
            }
            else if (tab.length() > 1) {
                tab.popToRoot(null, null);
            }
            else if (tab.root !== active.component) {
                tab.setRoot(tab.root);
            }
        }
    }
    setTabbarPosition(top, bottom) {
        if (this._top !== top || this._bottom !== bottom) {
            const tabbarEle = this._tabbar.nativeElement;
            tabbarEle.style.top = (top > -1 ? top + 'px' : '');
            tabbarEle.style.bottom = (bottom > -1 ? bottom + 'px' : '');
            tabbarEle.classList.add('show-tabbar');
            this._top = top;
            this._bottom = bottom;
        }
    }
}
Tabs.decorators = [
    { type: Component, args: [{
                selector: 'ion-tabs',
                template: '<div class="tabbar" role="tablist" #tabbar>' +
                    '<a *ngFor="let t of _tabs" [tab]="t" class="tab-button" [class.tab-disabled]="!t.enabled" [class.tab-hidden]="!t.show" role="tab" href="#" (ionSelect)="select($event)">' +
                    '<ion-icon *ngIf="t.tabIcon" [name]="t.tabIcon" [isActive]="t.isSelected" class="tab-button-icon"></ion-icon>' +
                    '<span *ngIf="t.tabTitle" class="tab-button-text">{{t.tabTitle}}</span>' +
                    '<ion-badge *ngIf="t.tabBadge" class="tab-badge" [color]="t.tabBadgeStyle">{{t.tabBadge}}</ion-badge>' +
                    '<div class="button-effect"></div>' +
                    '</a>' +
                    '<div class="tab-highlight"></div>' +
                    '</div>' +
                    '<ng-content></ng-content>' +
                    '<div #portal tab-portal></div>',
                encapsulation: ViewEncapsulation.None,
            },] },
];
Tabs.ctorParameters = [
    { type: NavController, decorators: [{ type: Optional },] },
    { type: ViewController, decorators: [{ type: Optional },] },
    { type: App, },
    { type: Config, },
    { type: ElementRef, },
    { type: Platform, },
    { type: Renderer, },
    { type: DeepLinker, },
];
Tabs.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'selectedIndex': [{ type: Input },],
    'tabsLayout': [{ type: Input },],
    'tabsPlacement': [{ type: Input },],
    'tabsHighlight': [{ type: Input },],
    'ionChange': [{ type: Output },],
    '_highlight': [{ type: ViewChild, args: [TabHighlight,] },],
    '_tabbar': [{ type: ViewChild, args: ['tabbar',] },],
    'portal': [{ type: ViewChild, args: ['portal', { read: ViewContainerRef },] },],
};
let tabIds = -1;
//# sourceMappingURL=tabs.js.map