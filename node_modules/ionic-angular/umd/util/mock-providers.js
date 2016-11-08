(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../components/app/app', '../components/app/app-root', '../config/config', '../navigation/deep-linker', './form', '../gestures/gesture-controller', './keyboard', '../components/menu/menu', '../navigation/nav-util', '../components/nav/overlay-portal', '../transitions/page-transition', '../platform/platform', '../platform/query-params', '../components/tabs/tab', '../components/tabs/tabs', '../transitions/transition-controller', '../navigation/url-serializer', '../navigation/view-controller', '../navigation/nav-controller-base', './haptic'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../components/app/app');
    var app_root_1 = require('../components/app/app-root');
    var config_1 = require('../config/config');
    var deep_linker_1 = require('../navigation/deep-linker');
    var form_1 = require('./form');
    var gesture_controller_1 = require('../gestures/gesture-controller');
    var keyboard_1 = require('./keyboard');
    var menu_1 = require('../components/menu/menu');
    var nav_util_1 = require('../navigation/nav-util');
    var overlay_portal_1 = require('../components/nav/overlay-portal');
    var page_transition_1 = require('../transitions/page-transition');
    var platform_1 = require('../platform/platform');
    var query_params_1 = require('../platform/query-params');
    var tab_1 = require('../components/tabs/tab');
    var tabs_1 = require('../components/tabs/tabs');
    var transition_controller_1 = require('../transitions/transition-controller');
    var url_serializer_1 = require('../navigation/url-serializer');
    var view_controller_1 = require('../navigation/view-controller');
    var nav_controller_base_1 = require('../navigation/nav-controller-base');
    var haptic_1 = require('./haptic');
    exports.mockConfig = function (config, url, platform) {
        if (url === void 0) { url = '/'; }
        var c = new config_1.Config();
        var q = exports.mockQueryParams();
        var p = platform || exports.mockPlatform();
        c.init(config, q, p);
        return c;
    };
    exports.mockQueryParams = function (url) {
        if (url === void 0) { url = '/'; }
        return new query_params_1.QueryParams(url);
    };
    exports.mockPlatform = function () {
        return new platform_1.Platform();
    };
    exports.mockApp = function (config, platform) {
        platform = platform || exports.mockPlatform();
        config = config || exports.mockConfig(null, '/', platform);
        var app = new app_1.App(config, platform);
        exports.mockIonicApp(app, config, platform);
        return app;
    };
    exports.mockIonicApp = function (app, config, platform) {
        var appRoot = new app_root_1.IonicApp(null, null, exports.mockElementRef(), exports.mockRenderer(), config, platform, app);
        appRoot._loadingPortal = exports.mockOverlayPortal(app, config, platform);
        appRoot._toastPortal = exports.mockOverlayPortal(app, config, platform);
        appRoot._overlayPortal = exports.mockOverlayPortal(app, config, platform);
        return appRoot;
    };
    exports.mockTrasitionController = function (config) {
        var trnsCtrl = new transition_controller_1.TransitionController(config);
        trnsCtrl.get = function (trnsId, enteringView, leavingView, opts) {
            var trns = new page_transition_1.PageTransition(enteringView, leavingView, opts, function (callback) {
                callback();
            });
            trns.trnsId = trnsId;
            return trns;
        };
        return trnsCtrl;
    };
    exports.mockZone = function () {
        return new core_1.NgZone(false);
    };
    exports.mockChangeDetectorRef = function () {
        var cd = {
            reattach: function () { },
            detach: function () { },
            detectChanges: function () { }
        };
        return cd;
    };
    var MockElementRef = (function () {
        function MockElementRef() {
            this.nativeElement = new MockElement();
        }
        return MockElementRef;
    }());
    exports.MockElementRef = MockElementRef;
    var MockElement = (function () {
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
    exports.MockElement = MockElement;
    var ClassList = (function () {
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
    exports.ClassList = ClassList;
    exports.mockElementRef = function () {
        return new MockElementRef();
    };
    var MockRenderer = (function () {
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
    exports.MockRenderer = MockRenderer;
    exports.mockRenderer = function () {
        var renderer = new MockRenderer();
        return renderer;
    };
    exports.mockLocation = function () {
        var location = {
            path: function () { return ''; },
            subscribe: function () { },
            go: function () { },
            back: function () { }
        };
        return location;
    };
    exports.mockView = function (component, data) {
        if (!component) {
            component = MockView;
        }
        var view = new view_controller_1.ViewController(component, data);
        view.init(exports.mockComponentRef());
        return view;
    };
    exports.mockViews = function (nav, views) {
        nav._views = views;
        views.forEach(function (v) { return v._setNav(nav); });
    };
    exports.mockComponentRef = function () {
        var componentRef = {
            location: exports.mockElementRef(),
            changeDetectorRef: exports.mockChangeDetectorRef(),
            destroy: function () { }
        };
        return componentRef;
    };
    exports.mockDeepLinker = function (linkConfig, app) {
        if (linkConfig === void 0) { linkConfig = null; }
        var serializer = new url_serializer_1.UrlSerializer(linkConfig);
        var location = exports.mockLocation();
        return new deep_linker_1.DeepLinker(app || exports.mockApp(), serializer, location);
    };
    exports.mockNavController = function () {
        var platform = exports.mockPlatform();
        var config = exports.mockConfig(null, '/', platform);
        var app = exports.mockApp(config, platform);
        var form = new form_1.Form();
        var zone = exports.mockZone();
        var keyboard = new keyboard_1.Keyboard(config, form, zone);
        var elementRef = exports.mockElementRef();
        var renderer = exports.mockRenderer();
        var componentFactoryResolver = null;
        var gestureCtrl = new gesture_controller_1.GestureController(app);
        var linker = exports.mockDeepLinker(null, app);
        var trnsCtrl = exports.mockTrasitionController(config);
        var nav = new nav_controller_base_1.NavControllerBase(null, app, config, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, trnsCtrl, linker);
        nav._viewInit = function (enteringView) {
            enteringView.init(exports.mockComponentRef());
            enteringView._state = nav_util_1.ViewState.INITIALIZED;
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
    exports.mockOverlayPortal = function (app, config, platform) {
        var form = new form_1.Form();
        var zone = exports.mockZone();
        var keyboard = new keyboard_1.Keyboard(config, form, zone);
        var elementRef = exports.mockElementRef();
        var renderer = exports.mockRenderer();
        var componentFactoryResolver = null;
        var gestureCtrl = new gesture_controller_1.GestureController(app);
        var serializer = new url_serializer_1.UrlSerializer(null);
        var location = exports.mockLocation();
        var deepLinker = new deep_linker_1.DeepLinker(app, serializer, location);
        return new overlay_portal_1.OverlayPortal(app, config, keyboard, elementRef, zone, renderer, componentFactoryResolver, gestureCtrl, null, deepLinker, null);
    };
    exports.mockTab = function (parentTabs) {
        var platform = exports.mockPlatform();
        var config = exports.mockConfig(null, '/', platform);
        var app = parentTabs._app || exports.mockApp(config, platform);
        var form = new form_1.Form();
        var zone = exports.mockZone();
        var keyboard = new keyboard_1.Keyboard(config, form, zone);
        var elementRef = exports.mockElementRef();
        var renderer = exports.mockRenderer();
        var changeDetectorRef = exports.mockChangeDetectorRef();
        var compiler = null;
        var gestureCtrl = new gesture_controller_1.GestureController(app);
        var linker = exports.mockDeepLinker(null, app);
        var tab = new tab_1.Tab(parentTabs, app, config, keyboard, elementRef, zone, renderer, compiler, changeDetectorRef, gestureCtrl, null, linker);
        tab.load = function (opts, cb) {
            cb();
        };
        return tab;
    };
    exports.mockTabs = function (app) {
        var platform = exports.mockPlatform();
        var config = exports.mockConfig(null, '/', platform);
        app = app || exports.mockApp(config, platform);
        var elementRef = exports.mockElementRef();
        var renderer = exports.mockRenderer();
        var linker = exports.mockDeepLinker();
        return new tabs_1.Tabs(null, null, app, config, elementRef, platform, renderer, linker);
    };
    exports.mockMenu = function () {
        return new menu_1.Menu(null, null, null, null, null, null, null, null);
    };
    exports.mockDeepLinkConfig = function (links) {
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
    exports.mockHaptic = function () {
        return new haptic_1.Haptic(null);
    };
    var MockView = (function () {
        function MockView() {
        }
        return MockView;
    }());
    exports.MockView = MockView;
    var MockView1 = (function () {
        function MockView1() {
        }
        return MockView1;
    }());
    exports.MockView1 = MockView1;
    var MockView2 = (function () {
        function MockView2() {
        }
        return MockView2;
    }());
    exports.MockView2 = MockView2;
    var MockView3 = (function () {
        function MockView3() {
        }
        return MockView3;
    }());
    exports.MockView3 = MockView3;
    var MockView4 = (function () {
        function MockView4() {
        }
        return MockView4;
    }());
    exports.MockView4 = MockView4;
    var MockView5 = (function () {
        function MockView5() {
        }
        return MockView5;
    }());
    exports.MockView5 = MockView5;
    function noop() { return 'noop'; }
    exports.noop = noop;
    ;
});
//# sourceMappingURL=mock-providers.js.map