import { convertToViews, isNav, isTab, isTabs, DIRECTION_BACK } from './nav-util';
import { isArray, isPresent } from '../util/util';
import { ViewController } from './view-controller';
export class DeepLinker {
    constructor(_app, _serializer, _location) {
        this._app = _app;
        this._serializer = _serializer;
        this._location = _location;
        this.segments = [];
        this.history = [];
    }
    init() {
        const browserUrl = normalizeUrl(this._location.path());
        (void 0);
        this.segments = this._serializer.parse(browserUrl);
        this.historyPush(browserUrl);
        this._location.subscribe((locationChg) => {
            this.urlChange(normalizeUrl(locationChg.url));
        });
    }
    urlChange(browserUrl) {
        if (!this.isCurrentUrl(browserUrl)) {
            if (this.isBackUrl(browserUrl)) {
                (void 0);
                this.historyPop();
            }
            else {
                (void 0);
                this.historyPush(browserUrl);
            }
            const appRootNav = this._app.getRootNav();
            if (appRootNav) {
                if (browserUrl === '/') {
                    if (isPresent(this.indexAliasUrl)) {
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
    }
    navChange(direction) {
        if (direction) {
            const activeNav = this._app.getActiveNav();
            if (activeNav) {
                this.segments = this.pathFromNavs(activeNav);
                const browserUrl = this._serializer.serialize(this.segments);
                this.updateLocation(browserUrl, direction);
            }
        }
    }
    updateLocation(browserUrl, direction) {
        if (this.indexAliasUrl === browserUrl) {
            browserUrl = '/';
        }
        if (direction === DIRECTION_BACK && this.isBackUrl(browserUrl)) {
            (void 0);
            this.historyPop();
            this._location.back();
        }
        else if (!this.isCurrentUrl(browserUrl)) {
            (void 0);
            this.historyPush(browserUrl);
            this._location.go(browserUrl);
        }
    }
    getComponentFromName(componentName) {
        const segment = this._serializer.createSegmentFromName(componentName);
        if (segment && segment.component) {
            return segment.component;
        }
        return null;
    }
    createUrl(nav, nameOrComponent, data, prepareExternalUrl = true) {
        const segment = this._serializer.createSegmentFromName(nameOrComponent);
        if (segment) {
            const path = this.pathFromNavs(nav, segment.component, data);
            const url = this._serializer.serialize(path);
            return prepareExternalUrl ? this._location.prepareExternalUrl(url) : url;
        }
        return '';
    }
    pathFromNavs(nav, component, data) {
        const segments = [];
        let view;
        let segment;
        let tabSelector;
        while (nav) {
            if (!component && isNav(nav)) {
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
            if (isTab(nav)) {
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
    }
    getTabSelector(tab) {
        if (isPresent(tab.tabUrlPath)) {
            return tab.tabUrlPath;
        }
        if (isPresent(tab.tabTitle)) {
            return this._serializer.formatUrlPart(tab.tabTitle);
        }
        return `tab-${tab.index}`;
    }
    getSelectedTabIndex(tabsNav, pathName, fallbackIndex = 0) {
        const indexMatch = pathName.match(/tab-(\d+)/);
        if (indexMatch) {
            return parseInt(indexMatch[1], 10);
        }
        const tab = tabsNav._tabs.find(t => {
            return (isPresent(t.tabUrlPath) && t.tabUrlPath === pathName) ||
                (isPresent(t.tabTitle) && this._serializer.formatUrlPart(t.tabTitle) === pathName);
        });
        return isPresent(tab) ? tab.index : fallbackIndex;
    }
    initNav(nav) {
        const path = this.segments;
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
    }
    initViews(segment) {
        let views;
        if (isArray(segment.defaultHistory)) {
            views = convertToViews(this, segment.defaultHistory);
        }
        else {
            views = [];
        }
        const view = new ViewController(segment.component, segment.data);
        view.id = segment.id;
        views.push(view);
        return views;
    }
    loadNavFromPath(nav, done) {
        if (!nav) {
            done && done();
        }
        else {
            this.loadViewFromSegment(nav, () => {
                this.loadNavFromPath(nav.getActiveChildNav(), done);
            });
        }
    }
    loadViewFromSegment(navInstance, done) {
        let segment = this.initNav(navInstance);
        if (!segment) {
            done();
            return;
        }
        if (isTabs(navInstance)) {
            navInstance.select(this.getSelectedTabIndex(navInstance, segment.name), {
                updateUrl: false,
                animate: false
            });
            done();
            return;
        }
        let nav = navInstance;
        let view;
        const count = nav.length() - 1;
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
    }
    isBackUrl(browserUrl) {
        return (browserUrl === this.history[this.history.length - 2]);
    }
    isCurrentUrl(browserUrl) {
        return (browserUrl === this.history[this.history.length - 1]);
    }
    historyPush(browserUrl) {
        if (!this.isCurrentUrl(browserUrl)) {
            this.history.push(browserUrl);
            if (this.history.length > 30) {
                this.history.shift();
            }
        }
    }
    historyPop() {
        this.history.pop();
        if (!this.history.length) {
            this.historyPush(this._location.path());
        }
    }
}
export function setupDeepLinker(app, serializer, location) {
    const deepLinker = new DeepLinker(app, serializer, location);
    deepLinker.init();
    return deepLinker;
}
export function normalizeUrl(browserUrl) {
    browserUrl = browserUrl.trim();
    if (browserUrl.charAt(0) !== '/') {
        browserUrl = '/' + browserUrl;
    }
    if (browserUrl.length > 1 && browserUrl.charAt(browserUrl.length - 1) === '/') {
        browserUrl = browserUrl.substr(0, browserUrl.length - 1);
    }
    return browserUrl;
}
//# sourceMappingURL=deep-linker.js.map