import { isArray, isPresent } from '../util/util';
import { isViewController, ViewController } from './view-controller';
export function convertToView(linker, nameOrPageOrView, params) {
    if (nameOrPageOrView) {
        if (isViewController(nameOrPageOrView)) {
            return nameOrPageOrView;
        }
        if (typeof nameOrPageOrView === 'function') {
            return new ViewController(nameOrPageOrView, params);
        }
        if (typeof nameOrPageOrView === 'string') {
            var component = linker.getComponentFromName(nameOrPageOrView);
            if (component) {
                return new ViewController(component, params);
            }
        }
    }
    console.error("invalid page component: " + nameOrPageOrView);
    return null;
}
export function convertToViews(linker, pages) {
    var views = [];
    if (isArray(pages)) {
        for (var i = 0; i < pages.length; i++) {
            var page = pages[i];
            if (page) {
                if (isViewController(page)) {
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
export function setZIndex(nav, enteringView, leavingView, direction, renderer) {
    if (enteringView) {
        leavingView = leavingView || nav.getPrevious(enteringView);
        if (leavingView && isPresent(leavingView._zIndex)) {
            if (direction === DIRECTION_BACK) {
                enteringView._setZIndex(leavingView._zIndex - 1, renderer);
            }
            else {
                enteringView._setZIndex(leavingView._zIndex + 1, renderer);
            }
        }
        else {
            enteringView._setZIndex(nav._isPortal ? PORTAL_ZINDEX : INIT_ZINDEX, renderer);
        }
    }
}
export function isTabs(nav) {
    return !!nav && !!nav.getSelected;
}
export function isTab(nav) {
    return !!nav && isPresent(nav._tabId);
}
export function isNav(nav) {
    return !!nav && !!nav.push;
}
export var DeepLinkMetadata = (function () {
    function DeepLinkMetadata() {
    }
    return DeepLinkMetadata;
}());
export var DeepLink;
export var ViewState;
(function (ViewState) {
    ViewState[ViewState["INITIALIZED"] = 0] = "INITIALIZED";
    ViewState[ViewState["PRE_RENDERED"] = 1] = "PRE_RENDERED";
    ViewState[ViewState["LOADED"] = 2] = "LOADED";
})(ViewState || (ViewState = {}));
export var INIT_ZINDEX = 100;
export var PORTAL_ZINDEX = 9999;
export var DIRECTION_BACK = 'back';
export var DIRECTION_FORWARD = 'forward';
export var DIRECTION_SWITCH = 'switch';
//# sourceMappingURL=nav-util.js.map