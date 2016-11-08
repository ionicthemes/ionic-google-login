(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", './nav-util', '../util/util', './view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var nav_util_1 = require('./nav-util');
    var util_1 = require('../util/util');
    var view_controller_1 = require('./view-controller');
    var DeepLinker = (function () {
        function DeepLinker(_app, _serializer, _location) {
            this._app = _app;
            this._serializer = _serializer;
            this._location = _location;
            this.segments = [];
            this.history = [];
        }
        DeepLinker.prototype.init = function () {
            var _this = this;
            var browserUrl = normalizeUrl(this._location.path());
            (void 0);
            this.segments = this._serializer.parse(browserUrl);
            this.historyPush(browserUrl);
            this._location.subscribe(function (locationChg) {
                _this.urlChange(normalizeUrl(locationChg.url));
            });
        };
        DeepLinker.prototype.urlChange = function (browserUrl) {
            if (!this.isCurrentUrl(browserUrl)) {
                if (this.isBackUrl(browserUrl)) {
                    (void 0);
                    this.historyPop();
                }
                else {
                    (void 0);
                    this.historyPush(browserUrl);
                }
                var appRootNav = this._app.getRootNav();
                if (appRootNav) {
                    if (browserUrl === '/') {
                        if (util_1.isPresent(this.indexAliasUrl)) {
                            browserUrl = this.indexAliasUrl;
                        }
                        else {
                            appRootNav.goToRoot({
                                updateUrl: false,
                                isNavRoot: true
                            });
                            return;
                        }
                    }
                    this.segments = this._serializer.parse(browserUrl);
                    this.loadNavFromPath(appRootNav);
                }
            }
        };
        DeepLinker.prototype.navChange = function (direction) {
            if (direction) {
                var activeNav = this._app.getActiveNav();
                if (activeNav) {
                    this.segments = this.pathFromNavs(activeNav);
                    var browserUrl = this._serializer.serialize(this.segments);
                    this.updateLocation(browserUrl, direction);
                }
            }
        };
        DeepLinker.prototype.updateLocation = function (browserUrl, direction) {
            if (this.indexAliasUrl === browserUrl) {
                browserUrl = '/';
            }
            if (direction === nav_util_1.DIRECTION_BACK && this.isBackUrl(browserUrl)) {
                (void 0);
                this.historyPop();
                this._location.back();
            }
            else if (!this.isCurrentUrl(browserUrl)) {
                (void 0);
                this.historyPush(browserUrl);
                this._location.go(browserUrl);
            }
        };
        DeepLinker.prototype.getComponentFromName = function (componentName) {
            var segment = this._serializer.createSegmentFromName(componentName);
            if (segment && segment.component) {
                return segment.component;
            }
            return null;
        };
        DeepLinker.prototype.createUrl = function (nav, nameOrComponent, data, prepareExternalUrl) {
            if (prepareExternalUrl === void 0) { prepareExternalUrl = true; }
            var segment = this._serializer.createSegmentFromName(nameOrComponent);
            if (segment) {
                var path = this.pathFromNavs(nav, segment.component, data);
                var url = this._serializer.serialize(path);
                return prepareExternalUrl ? this._location.prepareExternalUrl(url) : url;
            }
            return '';
        };
        DeepLinker.prototype.pathFromNavs = function (nav, component, data) {
            var segments = [];
            var view;
            var segment;
            var tabSelector;
            while (nav) {
                if (!component && nav_util_1.isNav(nav)) {
                    view = nav.getActive(true);
                    if (view) {
                        component = view.component;
                        data = view.data;
                    }
                }
                segment = this._serializer.serializeComponent(component, data);
                component = data = null;
                if (!segment) {
                    break;
                }
                segments.push(segment);
                if (nav_util_1.isTab(nav)) {
                    tabSelector = this.getTabSelector(nav);
                    segments.push({
                        id: tabSelector,
                        name: tabSelector,
                        component: null,
                        data: null
                    });
                    nav = nav.parent && nav.parent.parent;
                }
                else {
                    nav = nav.parent;
                }
            }
            return segments.reverse();
        };
        DeepLinker.prototype.getTabSelector = function (tab) {
            if (util_1.isPresent(tab.tabUrlPath)) {
                return tab.tabUrlPath;
            }
            if (util_1.isPresent(tab.tabTitle)) {
                return this._serializer.formatUrlPart(tab.tabTitle);
            }
            return "tab-" + tab.index;
        };
        DeepLinker.prototype.getSelectedTabIndex = function (tabsNav, pathName, fallbackIndex) {
            var _this = this;
            if (fallbackIndex === void 0) { fallbackIndex = 0; }
            var indexMatch = pathName.match(/tab-(\d+)/);
            if (indexMatch) {
                return parseInt(indexMatch[1], 10);
            }
            var tab = tabsNav._tabs.find(function (t) {
                return (util_1.isPresent(t.tabUrlPath) && t.tabUrlPath === pathName) ||
                    (util_1.isPresent(t.tabTitle) && _this._serializer.formatUrlPart(t.tabTitle) === pathName);
            });
            return util_1.isPresent(tab) ? tab.index : fallbackIndex;
        };
        DeepLinker.prototype.initNav = function (nav) {
            var path = this.segments;
            if (nav && path.length) {
                if (!nav.parent) {
                    path[0].navId = nav.id;
                    return path[0];
                }
                for (var i = 1; i < path.length; i++) {
                    if (path[i - 1].navId === nav.parent.id) {
                        path[i].navId = nav.id;
                        return path[i];
                    }
                }
            }
            return null;
        };
        DeepLinker.prototype.initViews = function (segment) {
            var views;
            if (util_1.isArray(segment.defaultHistory)) {
                views = nav_util_1.convertToViews(this, segment.defaultHistory);
            }
            else {
                views = [];
            }
            var view = new view_controller_1.ViewController(segment.component, segment.data);
            view.id = segment.id;
            views.push(view);
            return views;
        };
        DeepLinker.prototype.loadNavFromPath = function (nav, done) {
            var _this = this;
            if (!nav) {
                done && done();
            }
            else {
                this.loadViewFromSegment(nav, function () {
                    _this.loadNavFromPath(nav.getActiveChildNav(), done);
                });
            }
        };
        DeepLinker.prototype.loadViewFromSegment = function (navInstance, done) {
            var segment = this.initNav(navInstance);
            if (!segment) {
                done();
                return;
            }
            if (nav_util_1.isTabs(navInstance)) {
                navInstance.select(this.getSelectedTabIndex(navInstance, segment.name), {
                    updateUrl: false,
                    animate: false
                });
                done();
                return;
            }
            var nav = navInstance;
            var view;
            var count = nav.length() - 1;
            for (var i = count; i >= 0; i--) {
                view = nav.getByIndex(i);
                if (view && view.id === segment.id) {
                    if (i === count) {
                        done();
                    }
                    else {
                        nav.popTo(view, {
                            animate: false,
                            updateUrl: false,
                        }, done);
                    }
                    return;
                }
            }
            nav.push(segment.component, segment.data, {
                id: segment.id, animate: false, updateUrl: false
            }, done);
        };
        DeepLinker.prototype.isBackUrl = function (browserUrl) {
            return (browserUrl === this.history[this.history.length - 2]);
        };
        DeepLinker.prototype.isCurrentUrl = function (browserUrl) {
            return (browserUrl === this.history[this.history.length - 1]);
        };
        DeepLinker.prototype.historyPush = function (browserUrl) {
            if (!this.isCurrentUrl(browserUrl)) {
                this.history.push(browserUrl);
                if (this.history.length > 30) {
                    this.history.shift();
                }
            }
        };
        DeepLinker.prototype.historyPop = function () {
            this.history.pop();
            if (!this.history.length) {
                this.historyPush(this._location.path());
            }
        };
        return DeepLinker;
    }());
    exports.DeepLinker = DeepLinker;
    function setupDeepLinker(app, serializer, location) {
        var deepLinker = new DeepLinker(app, serializer, location);
        deepLinker.init();
        return deepLinker;
    }
    exports.setupDeepLinker = setupDeepLinker;
    function normalizeUrl(browserUrl) {
        browserUrl = browserUrl.trim();
        if (browserUrl.charAt(0) !== '/') {
            browserUrl = '/' + browserUrl;
        }
        if (browserUrl.length > 1 && browserUrl.charAt(browserUrl.length - 1) === '/') {
            browserUrl = browserUrl.substr(0, browserUrl.length - 1);
        }
        return browserUrl;
    }
    exports.normalizeUrl = normalizeUrl;
});
//# sourceMappingURL=deep-linker.js.map