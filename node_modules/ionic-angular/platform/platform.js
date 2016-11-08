import { EventEmitter, OpaqueToken } from '@angular/core';
import { ready, windowDimensions, flushDimensionCache } from '../util/dom';
export var Platform = (function () {
    function Platform() {
        var _this = this;
        this._versions = {};
        this._onResizes = [];
        this._bbActions = [];
        this._platforms = [];
        this.backButton = new EventEmitter();
        this.pause = new EventEmitter();
        this.resume = new EventEmitter();
        this._readyPromise = new Promise(function (res) { _this._readyResolve = res; });
        this.backButton.subscribe(function () {
            (void 0);
            _this.runBackButtonAction();
        });
    }
    Platform.prototype.setZone = function (zone) {
        this.zone = zone;
    };
    Platform.prototype.is = function (platformName) {
        return (this._platforms.indexOf(platformName) > -1);
    };
    Platform.prototype.platforms = function () {
        return this._platforms;
    };
    Platform.prototype.versions = function () {
        return this._versions;
    };
    Platform.prototype.version = function () {
        for (var platformName in this._versions) {
            if (this._versions[platformName]) {
                return this._versions[platformName];
            }
        }
        return {};
    };
    Platform.prototype.ready = function () {
        return this._readyPromise;
    };
    Platform.prototype.triggerReady = function (readySource) {
        var _this = this;
        this.zone.run(function () {
            _this._readyResolve(readySource);
        });
    };
    Platform.prototype.prepareReady = function () {
        var _this = this;
        ready(function () {
            _this.triggerReady('dom');
        });
    };
    Platform.prototype.setDir = function (dir, updateDocument) {
        this._dir = (dir || '').toLowerCase();
        if (updateDocument !== false) {
            document.documentElement.setAttribute('dir', dir);
        }
    };
    Platform.prototype.dir = function () {
        return this._dir;
    };
    Platform.prototype.isRTL = function () {
        return (this._dir === 'rtl');
    };
    Platform.prototype.setLang = function (language, updateDocument) {
        this._lang = language;
        if (updateDocument !== false) {
            document.documentElement.setAttribute('lang', language);
        }
    };
    Platform.prototype.lang = function () {
        return this._lang;
    };
    Platform.prototype.exitApp = function () { };
    Platform.prototype.registerBackButtonAction = function (fn, priority) {
        var _this = this;
        if (priority === void 0) { priority = 0; }
        var action = { fn: fn, priority: priority };
        this._bbActions.push(action);
        return function () {
            var index = _this._bbActions.indexOf(action);
            if (index > -1) {
                _this._bbActions.splice(index, 1);
            }
        };
    };
    Platform.prototype.runBackButtonAction = function () {
        var winner = null;
        this._bbActions.forEach(function (action) {
            if (!winner || action.priority >= winner.priority) {
                winner = action;
            }
        });
        winner && winner.fn && winner.fn();
    };
    Platform.prototype.setUserAgent = function (userAgent) {
        this._ua = userAgent;
    };
    Platform.prototype.setQueryParams = function (queryParams) {
        this._qp = queryParams;
    };
    Platform.prototype.userAgent = function () {
        return this._ua || '';
    };
    Platform.prototype.setNavigatorPlatform = function (navigatorPlatform) {
        this._bPlt = navigatorPlatform;
    };
    Platform.prototype.navigatorPlatform = function () {
        return this._bPlt || '';
    };
    Platform.prototype.width = function () {
        return windowDimensions().width;
    };
    Platform.prototype.height = function () {
        return windowDimensions().height;
    };
    Platform.prototype.isPortrait = function () {
        return this.width() < this.height();
    };
    Platform.prototype.isLandscape = function () {
        return !this.isPortrait();
    };
    Platform.prototype.windowResize = function () {
        var self = this;
        clearTimeout(self._resizeTm);
        self._resizeTm = setTimeout(function () {
            flushDimensionCache();
            for (var i = 0; i < self._onResizes.length; i++) {
                try {
                    self._onResizes[i]();
                }
                catch (e) {
                    console.error(e);
                }
            }
        }, 200);
    };
    Platform.prototype.onResize = function (cb) {
        var self = this;
        self._onResizes.push(cb);
        return function () {
            var index = self._onResizes.indexOf(cb);
            if (index > -1) {
                self._onResizes.splice(index, 1);
            }
        };
    };
    Platform.prototype.setPlatformConfigs = function (platformConfigs) {
        this._registry = platformConfigs || {};
    };
    Platform.prototype.getPlatformConfig = function (platformName) {
        return this._registry[platformName] || {};
    };
    Platform.prototype.registry = function () {
        return this._registry;
    };
    Platform.prototype.setDefault = function (platformName) {
        this._default = platformName;
    };
    Platform.prototype.testQuery = function (queryValue, queryTestValue) {
        var valueSplit = queryValue.toLowerCase().split(';');
        return valueSplit.indexOf(queryTestValue) > -1;
    };
    Platform.prototype.testNavigatorPlatform = function (navigatorPlatformExpression) {
        var rgx = new RegExp(navigatorPlatformExpression, 'i');
        return rgx.test(this._bPlt);
    };
    Platform.prototype.matchUserAgentVersion = function (userAgentExpression) {
        if (this._ua && userAgentExpression) {
            var val = this._ua.match(userAgentExpression);
            if (val) {
                return {
                    major: val[1],
                    minor: val[2]
                };
            }
        }
    };
    Platform.prototype.isPlatformMatch = function (queryStringName, userAgentAtLeastHas, userAgentMustNotHave) {
        if (userAgentMustNotHave === void 0) { userAgentMustNotHave = []; }
        var queryValue = this._qp.get('ionicplatform');
        if (queryValue) {
            return this.testQuery(queryValue, queryStringName);
        }
        userAgentAtLeastHas = userAgentAtLeastHas || [queryStringName];
        var userAgent = this._ua.toLowerCase();
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
    };
    Platform.prototype.init = function () {
        var rootPlatformNode;
        var enginePlatformNode;
        var tmpPlatform;
        for (var platformName in this._registry) {
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
            var platformNode = rootPlatformNode;
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
    };
    Platform.prototype.matchPlatform = function (platformName) {
        var platformNode = new PlatformNode(this._registry, platformName);
        var rootNode = platformNode.getRoot(this);
        if (rootNode) {
            rootNode.depth = 0;
            var childPlatform = rootNode.child;
            while (childPlatform) {
                rootNode.depth++;
                childPlatform = childPlatform.child;
            }
        }
        return rootNode;
    };
    return Platform;
}());
function insertSuperset(registry, platformNode) {
    var supersetPlaformName = platformNode.superset();
    if (supersetPlaformName) {
        var supersetPlatform = new PlatformNode(registry, supersetPlaformName);
        supersetPlatform.parent = platformNode.parent;
        supersetPlatform.child = platformNode;
        if (supersetPlatform.parent) {
            supersetPlatform.parent.child = supersetPlatform;
        }
        platformNode.parent = supersetPlatform;
    }
}
var PlatformNode = (function () {
    function PlatformNode(registry, platformName) {
        this.registry = registry;
        this.c = registry[platformName];
        this.name = platformName;
        this.isEngine = this.c.isEngine;
    }
    PlatformNode.prototype.settings = function () {
        return this.c.settings || {};
    };
    PlatformNode.prototype.superset = function () {
        return this.c.superset;
    };
    PlatformNode.prototype.isMatch = function (p) {
        return this.c.isMatch && this.c.isMatch(p) || false;
    };
    PlatformNode.prototype.initialize = function (platform) {
        this.c.initialize && this.c.initialize(platform);
    };
    PlatformNode.prototype.version = function (p) {
        if (this.c.versionParser) {
            var v = this.c.versionParser(p);
            if (v) {
                var str = v.major + '.' + v.minor;
                return {
                    str: str,
                    num: parseFloat(str),
                    major: parseInt(v.major, 10),
                    minor: parseInt(v.minor, 10)
                };
            }
        }
    };
    PlatformNode.prototype.getRoot = function (p) {
        if (this.isMatch(p)) {
            var parents = this.getSubsetParents(this.name);
            if (!parents.length) {
                return this;
            }
            var platformNode = null;
            var rootPlatformNode = null;
            for (var i = 0; i < parents.length; i++) {
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
    };
    PlatformNode.prototype.getSubsetParents = function (subsetPlatformName) {
        var parentPlatformNames = [];
        var platform = null;
        for (var platformName in this.registry) {
            platform = this.registry[platformName];
            if (platform.subsets && platform.subsets.indexOf(subsetPlatformName) > -1) {
                parentPlatformNames.push(platformName);
            }
        }
        return parentPlatformNames;
    };
    return PlatformNode;
}());
export function setupPlatform(platformConfigs, queryParams, userAgent, navigatorPlatform, docDirection, docLanguage, zone) {
    var p = new Platform();
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
export var UserAgentToken = new OpaqueToken('USERAGENT');
export var NavigatorPlatformToken = new OpaqueToken('NAVPLT');
export var DocumentDirToken = new OpaqueToken('DOCDIR');
export var DocLangToken = new OpaqueToken('DOCLANG');
//# sourceMappingURL=platform.js.map