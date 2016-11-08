(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/util', './view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require('../util/util');
    var view_controller_1 = require('./view-controller');
    function convertToView(linker, nameOrPageOrView, params) {
        if (nameOrPageOrView) {
            if (view_controller_1.isViewController(nameOrPageOrView)) {
                return nameOrPageOrView;
            }
            if (typeof nameOrPageOrView === 'function') {
                return new view_controller_1.ViewController(nameOrPageOrView, params);
            }
            if (typeof nameOrPageOrView === 'string') {
                var component = linker.getComponentFromName(nameOrPageOrView);
                if (component) {
                    return new view_controller_1.ViewController(component, params);
                }
            }
        }
        console.error("invalid page component: " + nameOrPageOrView);
        return null;
    }
    exports.convertToView = convertToView;
    function convertToViews(linker, pages) {
        var views = [];
        if (util_1.isArray(pages)) {
            for (var i = 0; i < pages.length; i++) {
                var page = pages[i];
                if (page) {
                    if (view_controller_1.isViewController(page)) {
                        views.push(page);
                    }
                    else if (page.page) {
                        views.push(convertToView(linker, page.page, page.params));
                    }
                    else {
                        views.push(convertToView(linker, page, null));
                    }
                }
            }
        }
        return views;
    }
    exports.convertToViews = convertToViews;
    function setZIndex(nav, enteringView, leavingView, direction, renderer) {
        if (enteringView) {
            leavingView = leavingView || nav.getPrevious(enteringView);
            if (leavingView && util_1.isPresent(leavingView._zIndex)) {
                if (direction === exports.DIRECTION_BACK) {
                    enteringView._setZIndex(leavingView._zIndex - 1, renderer);
                }
                else {
                    enteringView._setZIndex(leavingView._zIndex + 1, renderer);
                }
            }
            else {
                enteringView._setZIndex(nav._isPortal ? exports.PORTAL_ZINDEX : exports.INIT_ZINDEX, renderer);
            }
        }
    }
    exports.setZIndex = setZIndex;
    function isTabs(nav) {
        return !!nav && !!nav.getSelected;
    }
    exports.isTabs = isTabs;
    function isTab(nav) {
        return !!nav && util_1.isPresent(nav._tabId);
    }
    exports.isTab = isTab;
    function isNav(nav) {
        return !!nav && !!nav.push;
    }
    exports.isNav = isNav;
    var DeepLinkMetadata = (function () {
        function DeepLinkMetadata() {
        }
        return DeepLinkMetadata;
    }());
    exports.DeepLinkMetadata = DeepLinkMetadata;
    (function (ViewState) {
        ViewState[ViewState["INITIALIZED"] = 0] = "INITIALIZED";
        ViewState[ViewState["PRE_RENDERED"] = 1] = "PRE_RENDERED";
        ViewState[ViewState["LOADED"] = 2] = "LOADED";
    })(exports.ViewState || (exports.ViewState = {}));
    var ViewState = exports.ViewState;
    exports.INIT_ZINDEX = 100;
    exports.PORTAL_ZINDEX = 9999;
    exports.DIRECTION_BACK = 'back';
    exports.DIRECTION_FORWARD = 'forward';
    exports.DIRECTION_SWITCH = 'switch';
});
//# sourceMappingURL=nav-util.js.map