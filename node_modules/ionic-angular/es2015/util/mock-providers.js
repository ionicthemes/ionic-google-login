import { NgZone } from '@angular/core';
import { App } from '../components/app/app';
import { IonicApp } from '../components/app/app-root';
import { Config } from '../config/config';
import { DeepLinker } from '../navigation/deep-linker';
import { Form } from './form';
import { GestureController } from '../gestures/gesture-controller';
import { Keyboard } from './keyboard';
import { Menu } from '../components/menu/menu';
import { ViewState } from '../navigation/nav-util';
import { OverlayPortal } from '../components/nav/overlay-portal';
import { PageTransition } from '../transitions/page-transition';
import { Platform } from '../platform/platform';
import { QueryParams } from '../platform/query-params';
import { Tab } from '../components/tabs/tab';
import { Tabs } from '../components/tabs/tabs';
import { TransitionController } from '../transitions/transition-controller';
import { UrlSerializer } from '../navigation/url-serializer';
import { ViewController } from '../navigation/view-controller';
import { NavControllerBase } from '../navigation/nav-controller-base';
import { Haptic } from './haptic';
export const mockConfig = function (config, url = '/', platform) {
    const c = new Config();
    const q = mockQueryParams();
    const p = platform || mockPlatform();
    c.init(config, q, p);
    return c;
};
export const mockQueryParams = function (url = '/') {
    return new QueryParams(url);
};
export const mockPlatform = function () {
    return new Platform();
};
export const mockApp = function (config, platform) {
    platform = platform || mockPlatform();
    config = config || mockConfig(null, '/', platform);
    let app = new App(config, platform);
    mockIonicApp(app, config, platform);
    return app;
};
export const mockIonicApp = function (app, config, platform) {
    let appRoot = new IonicApp(null, null, mockElementRef(), mockRenderer(), config, platform, app);
    appRoot._loadingPortal = mockOverlayPortal(app, config, platform);
    appRoot._toastPortal = mockOverlayPortal(app, config, platform);
    appRoot._overlayPortal = mockOverlayPortal(app, config, platform);
    return appRoot;
};
export const mockTrasitionController = function (config) {
    let trnsCtrl = new TransitionController(config);
    trnsCtrl.get = (trnsId, enteringView, leavingView, opts) => {
        let trns = new PageTransition(enteringView, leavingView, opts, (callback) => {
            callback();
        });
        trns.trnsId = trnsId;
        return trns;
    };
    return trnsCtrl;
};
export const mockZone = function () {
    return new NgZone(false);
};
export const mockChangeDetectorRef = function () {
    let cd = {
        reattach: () => { },
        detach: () => { },
        detectChanges: () => { }
    };
    return cd;
};
export class MockElementRef {
    constructor() {
        this.nativeElement = new MockElement();
    }
}
export class MockElement {
    constructor() {
        this.children = [];
        this.classList = new ClassList();
        this.attributes = {};
        this.style = {};
        this.clientWidth = 0;
        this.clientHeight = 0;
        this.clientTop = 0;
        this.clientLeft = 0;
        this.offsetWidth = 0;
        this.offsetHeight = 0;
        this.offsetTop = 0;
        this.offsetLeft = 0;
        this.scrollTop = 0;
        this.scrollHeight = 0;
    }
    get className() {
        return this.classList.classes.join(' ');
    }
    set className(val) {
        this.classList.classes = val.split(' ');
    }
    hasAttribute(name) {
        return !!this.attributes[name];
    }
    getAttribute(name) {
        return this.attributes[name];
    }
    setAttribute(name, val) {
        this.attributes[name] = val;
    }
    removeAttribute(name) {
        delete this.attributes[name];
    }
}
export class ClassList {
    constructor() {
        this.classes = [];
    }
    add(className) {
        if (!this.contains(className)) {
            this.classes.push(className);
        }
    }
    remove(className) {
        const index = this.classes.indexOf(className);
        if (index > -1) {
            this.classes.splice(index, 1);
        }
    }
    toggle(className) {
        if (this.contains(className)) {
            this.remove(className);
        }
        else {
            this.add(className);
        }
    }
    contains(className) {
        return this.classes.indexOf(className) > -1;
    }
}
export const mockElementRef = function () {
    return new MockElementRef();
};
export class MockRenderer {
    setElementAttribute(renderElement, name, val) {
        if (name === null) {
            renderElement.removeAttribute(name);
        }
        else {
            renderElement.setAttribute(name, val);
        }
    }
    setElementClass(renderElement, className, isAdd) {
        if (isAdd) {
            renderElement.classList.add(className);
        }
        else {
            renderElement.classList.remove(className);
        }
    }
    setElementStyle(renderElement, styleName, styleValue) {
        renderElement.style[styleName] = styleValue;
    }
}
export const mockRenderer = function () {
    const renderer = new MockRenderer();
    return renderer;
};
export const mockLocation = function () {
    let location = {
        path: () => { return ''; },
        subscribe: () => { },
        go: () => { },
        back: () => { }
    };
    return location;
};
export const mockView = function (component, data) {
    if (!component) {
        component = MockView;
    }
    let view = new ViewController(component, data);
    view.init(mockComponentRef());
    return view;
};
export const mockViews = function (nav, views) {
    nav._views = views;
    views.forEach(v => v._setNav(nav));
};
export const mockComponentRef = function () {
    let componentRef = {
        location: mockElementRef(),
        changeDetectorRef: mockChangeDetectorRef(),
        destroy: () => { }
    };
    return componentRef;
};
export const mockDeepLinker = function (linkConfig = null, app) {
    let serializer = new UrlSerializer(linkConfig);
    let location = mockLocation();
    return new DeepLinker(app || mockApp(), serializer, location);
};
export const mockNavController = function () {
    let platform = mockPlatform();
    let config = mockConfig(null, '/', platform);
    let app = mockApp(config, platform);
    let form = new Form();
    let zone = mockZone();
    let keyboard = new Keyboard(config, form, zone);
    let elementRef = mockElementRef();
    let renderer = mockRenderer();
    let componentFactoryResolver = null;
    let gestureCtrl = new GestureController(app);
    let linker = mockDeepLinker(null, app);
    let trnsCtrl = mockTrasitionController(config);
    let nav = new NavControllerBase(null, app, config, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, trnsCtrl, linker);
    nav._viewInit = function (enteringView) {
        enteringView.init(mockComponentRef());
        enteringView._state = ViewState.INITIALIZED;
    };
    nav._orgViewInsert = nav._viewAttachToDOM;
    nav._viewAttachToDOM = function (view, componentRef, viewport) {
        let mockedViewport = {
            insert: () => { }
        };
        nav._orgViewInsert(view, componentRef, mockedViewport);
    };
    return nav;
};
export const mockOverlayPortal = function (app, config, platform) {
    let form = new Form();
    let zone = mockZone();
    let keyboard = new Keyboard(config, form, zone);
    let elementRef = mockElementRef();
    let renderer = mockRenderer();
    let componentFactoryResolver = null;
    let gestureCtrl = new GestureController(app);
    let serializer = new UrlSerializer(null);
    let location = mockLocation();
    let deepLinker = new DeepLinker(app, serializer, location);
    return new OverlayPortal(app, config, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, null, deepLinker, null);
};
export const mockTab = function (parentTabs) {
    let platform = mockPlatform();
    let config = mockConfig(null, '/', platform);
    let app = parentTabs._app || mockApp(config, platform);
    let form = new Form();
    let zone = mockZone();
    let keyboard = new Keyboard(config, form, zone);
    let elementRef = mockElementRef();
    let renderer = mockRenderer();
    let changeDetectorRef = mockChangeDetectorRef();
    let compiler = null;
    let gestureCtrl = new GestureController(app);
    let linker = mockDeepLinker(null, app);
    let tab = new Tab(parentTabs, app, config, keyboard, elementRef, zone, renderer, compiler, changeDetectorRef, gestureCtrl, null, linker);
    tab.load = (opts, cb) => {
        cb();
    };
    return tab;
};
export const mockTabs = function (app) {
    let platform = mockPlatform();
    let config = mockConfig(null, '/', platform);
    app = app || mockApp(config, platform);
    let elementRef = mockElementRef();
    let renderer = mockRenderer();
    let linker = mockDeepLinker();
    return new Tabs(null, null, app, config, elementRef, platform, renderer, linker);
};
export const mockMenu = function () {
    return new Menu(null, null, null, null, null, null, null, null);
};
export const mockDeepLinkConfig = function (links) {
    return {
        links: links || [
            { component: MockView1, name: 'viewone' },
            { component: MockView2, name: 'viewtwo' },
            { component: MockView3, name: 'viewthree' },
            { component: MockView4, name: 'viewfour' },
            { component: MockView5, name: 'viewfive' }
        ]
    };
};
export const mockHaptic = function () {
    return new Haptic(null);
};
export class MockView {
}
export class MockView1 {
}
export class MockView2 {
}
export class MockView3 {
}
export class MockView4 {
}
export class MockView5 {
}
export function noop() { return 'noop'; }
;
//# sourceMappingURL=mock-providers.js.map