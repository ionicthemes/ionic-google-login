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
export var mockConfig = function (config, url, platform) {
    if (url === void 0) { url = '/'; }
    var c = new Config();
    var q = mockQueryParams();
    var p = platform || mockPlatform();
    c.init(config, q, p);
    return c;
};
export var mockQueryParams = function (url) {
    if (url === void 0) { url = '/'; }
    return new QueryParams(url);
};
export var mockPlatform = function () {
    return new Platform();
};
export var mockApp = function (config, platform) {
    platform = platform || mockPlatform();
    config = config || mockConfig(null, '/', platform);
    var app = new App(config, platform);
    mockIonicApp(app, config, platform);
    return app;
};
export var mockIonicApp = function (app, config, platform) {
    var appRoot = new IonicApp(null, null, mockElementRef(), mockRenderer(), config, platform, app);
    appRoot._loadingPortal = mockOverlayPortal(app, config, platform);
    appRoot._toastPortal = mockOverlayPortal(app, config, platform);
    appRoot._overlayPortal = mockOverlayPortal(app, config, platform);
    return appRoot;
};
export var mockTrasitionController = function (config) {
    var trnsCtrl = new TransitionController(config);
    trnsCtrl.get = function (trnsId, enteringView, leavingView, opts) {
        var trns = new PageTransition(enteringView, leavingView, opts, function (callback) {
            callback();
        });
        trns.trnsId = trnsId;
        return trns;
    };
    return trnsCtrl;
};
export var mockZone = function () {
    return new NgZone(false);
};
export var mockChangeDetectorRef = function () {
    var cd = {
        reattach: function () { },
        detach: function () { },
        detectChanges: function () { }
    };
    return cd;
};
export var MockElementRef = (function () {
    function MockElementRef() {
        this.nativeElement = new MockElement();
    }
    return MockElementRef;
}());
export var MockElement = (function () {
    function MockElement() {
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
    Object.defineProperty(MockElement.prototype, "className", {
        get: function () {
            return this.classList.classes.join(' ');
        },
        set: function (val) {
            this.classList.classes = val.split(' ');
        },
        enumerable: true,
        configurable: true
    });
    MockElement.prototype.hasAttribute = function (name) {
        return !!this.attributes[name];
    };
    MockElement.prototype.getAttribute = function (name) {
        return this.attributes[name];
    };
    MockElement.prototype.setAttribute = function (name, val) {
        this.attributes[name] = val;
    };
    MockElement.prototype.removeAttribute = function (name) {
        delete this.attributes[name];
    };
    return MockElement;
}());
export var ClassList = (function () {
    function ClassList() {
        this.classes = [];
    }
    ClassList.prototype.add = function (className) {
        if (!this.contains(className)) {
            this.classes.push(className);
        }
    };
    ClassList.prototype.remove = function (className) {
        var index = this.classes.indexOf(className);
        if (index > -1) {
            this.classes.splice(index, 1);
        }
    };
    ClassList.prototype.toggle = function (className) {
        if (this.contains(className)) {
            this.remove(className);
        }
        else {
            this.add(className);
        }
    };
    ClassList.prototype.contains = function (className) {
        return this.classes.indexOf(className) > -1;
    };
    return ClassList;
}());
export var mockElementRef = function () {
    return new MockElementRef();
};
export var MockRenderer = (function () {
    function MockRenderer() {
    }
    MockRenderer.prototype.setElementAttribute = function (renderElement, name, val) {
        if (name === null) {
            renderElement.removeAttribute(name);
        }
        else {
            renderElement.setAttribute(name, val);
        }
    };
    MockRenderer.prototype.setElementClass = function (renderElement, className, isAdd) {
        if (isAdd) {
            renderElement.classList.add(className);
        }
        else {
            renderElement.classList.remove(className);
        }
    };
    MockRenderer.prototype.setElementStyle = function (renderElement, styleName, styleValue) {
        renderElement.style[styleName] = styleValue;
    };
    return MockRenderer;
}());
export var mockRenderer = function () {
    var renderer = new MockRenderer();
    return renderer;
};
export var mockLocation = function () {
    var location = {
        path: function () { return ''; },
        subscribe: function () { },
        go: function () { },
        back: function () { }
    };
    return location;
};
export var mockView = function (component, data) {
    if (!component) {
        component = MockView;
    }
    var view = new ViewController(component, data);
    view.init(mockComponentRef());
    return view;
};
export var mockViews = function (nav, views) {
    nav._views = views;
    views.forEach(function (v) { return v._setNav(nav); });
};
export var mockComponentRef = function () {
    var componentRef = {
        location: mockElementRef(),
        changeDetectorRef: mockChangeDetectorRef(),
        destroy: function () { }
    };
    return componentRef;
};
export var mockDeepLinker = function (linkConfig, app) {
    if (linkConfig === void 0) { linkConfig = null; }
    var serializer = new UrlSerializer(linkConfig);
    var location = mockLocation();
    return new DeepLinker(app || mockApp(), serializer, location);
};
export var mockNavController = function () {
    var platform = mockPlatform();
    var config = mockConfig(null, '/', platform);
    var app = mockApp(config, platform);
    var form = new Form();
    var zone = mockZone();
    var keyboard = new Keyboard(config, form, zone);
    var elementRef = mockElementRef();
    var renderer = mockRenderer();
    var componentFactoryResolver = null;
    var gestureCtrl = new GestureController(app);
    var linker = mockDeepLinker(null, app);
    var trnsCtrl = mockTrasitionController(config);
    var nav = new NavControllerBase(null, app, config, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, trnsCtrl, linker);
    nav._viewInit = function (enteringView) {
        enteringView.init(mockComponentRef());
        enteringView._state = ViewState.INITIALIZED;
    };
    nav._orgViewInsert = nav._viewAttachToDOM;
    nav._viewAttachToDOM = function (view, componentRef, viewport) {
        var mockedViewport = {
            insert: function () { }
        };
        nav._orgViewInsert(view, componentRef, mockedViewport);
    };
    return nav;
};
export var mockOverlayPortal = function (app, config, platform) {
    var form = new Form();
    var zone = mockZone();
    var keyboard = new Keyboard(config, form, zone);
    var elementRef = mockElementRef();
    var renderer = mockRenderer();
    var componentFactoryResolver = null;
    var gestureCtrl = new GestureController(app);
    var serializer = new UrlSerializer(null);
    var location = mockLocation();
    var deepLinker = new DeepLinker(app, serializer, location);
    return new OverlayPortal(app, config, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, null, deepLinker, null);
};
export var mockTab = function (parentTabs) {
    var platform = mockPlatform();
    var config = mockConfig(null, '/', platform);
    var app = parentTabs._app || mockApp(config, platform);
    var form = new Form();
    var zone = mockZone();
    var keyboard = new Keyboard(config, form, zone);
    var elementRef = mockElementRef();
    var renderer = mockRenderer();
    var changeDetectorRef = mockChangeDetectorRef();
    var compiler = null;
    var gestureCtrl = new GestureController(app);
    var linker = mockDeepLinker(null, app);
    var tab = new Tab(parentTabs, app, config, keyboard, elementRef, zone, renderer, compiler, changeDetectorRef, gestureCtrl, null, linker);
    tab.load = function (opts, cb) {
        cb();
    };
    return tab;
};
export var mockTabs = function (app) {
    var platform = mockPlatform();
    var config = mockConfig(null, '/', platform);
    app = app || mockApp(config, platform);
    var elementRef = mockElementRef();
    var renderer = mockRenderer();
    var linker = mockDeepLinker();
    return new Tabs(null, null, app, config, elementRef, platform, renderer, linker);
};
export var mockMenu = function () {
    return new Menu(null, null, null, null, null, null, null, null);
};
export var mockDeepLinkConfig = function (links) {
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
export var mockHaptic = function () {
    return new Haptic(null);
};
export var MockView = (function () {
    function MockView() {
    }
    return MockView;
}());
export var MockView1 = (function () {
    function MockView1() {
    }
    return MockView1;
}());
export var MockView2 = (function () {
    function MockView2() {
    }
    return MockView2;
}());
export var MockView3 = (function () {
    function MockView3() {
    }
    return MockView3;
}());
export var MockView4 = (function () {
    function MockView4() {
    }
    return MockView4;
}());
export var MockView5 = (function () {
    function MockView5() {
    }
    return MockView5;
}());
export function noop() { return 'noop'; }
;
//# sourceMappingURL=mock-providers.js.map