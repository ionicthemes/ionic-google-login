import { EventEmitter, OpaqueToken } from '@angular/core';
import { ready, windowDimensions, flushDimensionCache } from '../util/dom';
export class Platform {
    constructor() {
        this._versions = {};
        this._onResizes = [];
        this._bbActions = [];
        this._platforms = [];
        this.backButton = new EventEmitter();
        this.pause = new EventEmitter();
        this.resume = new EventEmitter();
        this._readyPromise = new Promise(res => { this._readyResolve = res; });
        this.backButton.subscribe(() => {
            (void 0);
            this.runBackButtonAction();
        });
    }
    setZone(zone) {
        this.zone = zone;
    }
    is(platformName) {
        return (this._platforms.indexOf(platformName) > -1);
    }
    platforms() {
        return this._platforms;
    }
    versions() {
        return this._versions;
    }
    version() {
        for (var platformName in this._versions) {
            if (this._versions[platformName]) {
                return this._versions[platformName];
            }
        }
        return {};
    }
    ready() {
        return this._readyPromise;
    }
    triggerReady(readySource) {
        this.zone.run(() => {
            this._readyResolve(readySource);
        });
    }
    prepareReady() {
        ready(() => {
            this.triggerReady('dom');
        });
    }
    setDir(dir, updateDocument) {
        this._dir = (dir || '').toLowerCase();
        if (updateDocument !== false) {
            document.documentElement.setAttribute('dir', dir);
        }
    }
    dir() {
        return this._dir;
    }
    isRTL() {
        return (this._dir === 'rtl');
    }
    setLang(language, updateDocument) {
        this._lang = language;
        if (updateDocument !== false) {
            document.documentElement.setAttribute('lang', language);
        }
    }
    lang() {
        return this._lang;
    }
    exitApp() { }
    registerBackButtonAction(fn, priority = 0) {
        const action = { fn, priority };
        this._bbActions.push(action);
        return () => {
            let index = this._bbActions.indexOf(action);
            if (index > -1) {
                this._bbActions.splice(index, 1);
            }
        };
    }
    runBackButtonAction() {
        let winner = null;
        this._bbActions.forEach((action) => {
            if (!winner || action.priority >= winner.priority) {
                winner = action;
            }
        });
        winner && winner.fn && winner.fn();
    }
    setUserAgent(userAgent) {
        this._ua = userAgent;
    }
    setQueryParams(queryParams) {
        this._qp = queryParams;
    }
    userAgent() {
        return this._ua || '';
    }
    setNavigatorPlatform(navigatorPlatform) {
        this._bPlt = navigatorPlatform;
    }
    navigatorPlatform() {
        return this._bPlt || '';
    }
    width() {
        return windowDimensions().width;
    }
    height() {
        return windowDimensions().height;
    }
    isPortrait() {
        return this.width() < this.height();
    }
    isLandscape() {
        return !this.isPortrait();
    }
    windowResize() {
        const self = this;
        clearTimeout(self._resizeTm);
        self._resizeTm = setTimeout(() => {
            flushDimensionCache();
            for (let i = 0; i < self._onResizes.length; i++) {
                try {
                    self._onResizes[i]();
                }
                catch (e) {
                    console.error(e);
                }
            }
        }, 200);
    }
    onResize(cb) {
        let self = this;
        self._onResizes.push(cb);
        return function () {
            const index = self._onResizes.indexOf(cb);
            if (index > -1) {
                self._onResizes.splice(index, 1);
            }
        };
    }
    setPlatformConfigs(platformConfigs) {
        this._registry = platformConfigs || {};
    }
    getPlatformConfig(platformName) {
        return this._registry[platformName] || {};
    }
    registry() {
        return this._registry;
    }
    setDefault(platformName) {
        this._default = platformName;
    }
    testQuery(queryValue, queryTestValue) {
        const valueSplit = queryValue.toLowerCase().split(';');
        return valueSplit.indexOf(queryTestValue) > -1;
    }
    testNavigatorPlatform(navigatorPlatformExpression) {
        const rgx = new RegExp(navigatorPlatformExpression, 'i');
        return rgx.test(this._bPlt);
    }
    matchUserAgentVersion(userAgentExpression) {
        if (this._ua && userAgentExpression) {
            const val = this._ua.match(userAgentExpression);
            if (val) {
                return {
                    major: val[1],
                    minor: val[2]
                };
            }
        }
    }
    isPlatformMatch(queryStringName, userAgentAtLeastHas, userAgentMustNotHave = []) {
        const queryValue = this._qp.get('ionicplatform');
        if (queryValue) {
            return this.testQuery(queryValue, queryStringName);
        }
        userAgentAtLeastHas = userAgentAtLeastHas || [queryStringName];
        const userAgent = this._ua.toLowerCase();
        for (var i = 0; i < userAgentAtLeastHas.length; i++) {
            if (userAgent.indexOf(userAgentAtLeastHas[i]) > -1) {
                for (var j = 0; j < userAgentMustNotHave.length; j++) {
                    if (userAgent.indexOf(userAgentMustNotHave[j]) > -1) {
                        return false;
                    }
                }
                return true;
            }
        }
        return false;
    }
    init() {
        let rootPlatformNode;
        let enginePlatformNode;
        let tmpPlatform;
        for (let platformName in this._registry) {
            tmpPlatform = this.matchPlatform(platformName);
            if (tmpPlatform) {
                if (tmpPlatform.isEngine) {
                    enginePlatformNode = tmpPlatform;
                }
                else if (!rootPlatformNode || tmpPlatform.depth > rootPlatformNode.depth) {
                    rootPlatformNode = tmpPlatform;
                }
            }
        }
        if (!rootPlatformNode) {
            rootPlatformNode = new PlatformNode(this._registry, this._default);
        }
        if (rootPlatformNode) {
            if (enginePlatformNode) {
                enginePlatformNode.child = rootPlatformNode;
                rootPlatformNode.parent = enginePlatformNode;
                rootPlatformNode = enginePlatformNode;
            }
            let platformNode = rootPlatformNode;
            while (platformNode) {
                insertSuperset(this._registry, platformNode);
                platformNode = platformNode.child;
            }
            platformNode = rootPlatformNode.parent;
            while (platformNode) {
                rootPlatformNode = platformNode;
                platformNode = platformNode.parent;
            }
            platformNode = rootPlatformNode;
            while (platformNode) {
                platformNode.initialize(this);
                this._platforms.push(platformNode.name);
                this._versions[platformNode.name] = platformNode.version(this);
                platformNode = platformNode.child;
            }
        }
        if (this._platforms.indexOf('mobile') > -1 && this._platforms.indexOf('cordova') === -1) {
            this._platforms.push('mobileweb');
        }
    }
    matchPlatform(platformName) {
        let platformNode = new PlatformNode(this._registry, platformName);
        let rootNode = platformNode.getRoot(this);
        if (rootNode) {
            rootNode.depth = 0;
            let childPlatform = rootNode.child;
            while (childPlatform) {
                rootNode.depth++;
                childPlatform = childPlatform.child;
            }
        }
        return rootNode;
    }
}
function insertSuperset(registry, platformNode) {
    let supersetPlaformName = platformNode.superset();
    if (supersetPlaformName) {
        let supersetPlatform = new PlatformNode(registry, supersetPlaformName);
        supersetPlatform.parent = platformNode.parent;
        supersetPlatform.child = platformNode;
        if (supersetPlatform.parent) {
            supersetPlatform.parent.child = supersetPlatform;
        }
        platformNode.parent = supersetPlatform;
    }
}
class PlatformNode {
    constructor(registry, platformName) {
        this.registry = registry;
        this.c = registry[platformName];
        this.name = platformName;
        this.isEngine = this.c.isEngine;
    }
    settings() {
        return this.c.settings || {};
    }
    superset() {
        return this.c.superset;
    }
    isMatch(p) {
        return this.c.isMatch && this.c.isMatch(p) || false;
    }
    initialize(platform) {
        this.c.initialize && this.c.initialize(platform);
    }
    version(p) {
        if (this.c.versionParser) {
            const v = this.c.versionParser(p);
            if (v) {
                const str = v.major + '.' + v.minor;
                return {
                    str: str,
                    num: parseFloat(str),
                    major: parseInt(v.major, 10),
                    minor: parseInt(v.minor, 10)
                };
            }
        }
    }
    getRoot(p) {
        if (this.isMatch(p)) {
            let parents = this.getSubsetParents(this.name);
            if (!parents.length) {
                return this;
            }
            let platformNode = null;
            let rootPlatformNode = null;
            for (let i = 0; i < parents.length; i++) {
                platformNode = new PlatformNode(this.registry, parents[i]);
                platformNode.child = this;
                rootPlatformNode = platformNode.getRoot(p);
                if (rootPlatformNode) {
                    this.parent = platformNode;
                    return rootPlatformNode;
                }
            }
        }
        return null;
    }
    getSubsetParents(subsetPlatformName) {
        const parentPlatformNames = [];
        let platform = null;
        for (let platformName in this.registry) {
            platform = this.registry[platformName];
            if (platform.subsets && platform.subsets.indexOf(subsetPlatformName) > -1) {
                parentPlatformNames.push(platformName);
            }
        }
        return parentPlatformNames;
    }
}
export function setupPlatform(platformConfigs, queryParams, userAgent, navigatorPlatform, docDirection, docLanguage, zone) {
    const p = new Platform();
    p.setDefault('core');
    p.setPlatformConfigs(platformConfigs);
    p.setUserAgent(userAgent);
    p.setQueryParams(queryParams);
    p.setNavigatorPlatform(navigatorPlatform);
    p.setDir(docDirection, false);
    p.setLang(docLanguage, false);
    p.setZone(zone);
    p.init();
    return p;
}
export const UserAgentToken = new OpaqueToken('USERAGENT');
export const NavigatorPlatformToken = new OpaqueToken('NAVPLT');
export const DocumentDirToken = new OpaqueToken('DOCDIR');
export const DocLangToken = new OpaqueToken('DOCLANG');
//# sourceMappingURL=platform.js.map