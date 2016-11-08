(function () {
    var rafLastTime = 0;
    const win = window;
    if (!win.requestAnimationFrame) {
        win.requestAnimationFrame = function (callback) {
            var currTime = Date.now();
            var timeToCall = Math.max(0, 16 - (currTime - rafLastTime));
            var id = window.setTimeout(function () {
                callback(currTime + timeToCall);
            }, timeToCall);
            rafLastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!win.cancelAnimationFrame) {
        win.cancelAnimationFrame = function (id) { clearTimeout(id); };
    }
})();
let originalRaf = (window[window['Zone']['__symbol__']('requestAnimationFrame')] || window[window['Zone']['__symbol__']('webkitRequestAnimationFrame')]);
export const nativeRaf = originalRaf !== undefined ? originalRaf['bind'](window) : window.requestAnimationFrame.bind(window);
export const raf = window.requestAnimationFrame.bind(window);
export const cancelRaf = window.cancelAnimationFrame.bind(window);
export const nativeTimeout = window[window['Zone']['__symbol__']('setTimeout')]['bind'](window);
export const clearNativeTimeout = window[window['Zone']['__symbol__']('clearTimeout')]['bind'](window);
export function rafFrames(framesToWait, callback) {
    framesToWait = Math.ceil(framesToWait);
    if (framesToWait < 2) {
        nativeRaf(callback);
    }
    else {
        nativeTimeout(() => {
            nativeRaf(callback);
        }, (framesToWait - 1) * 16.6667);
    }
}
export function zoneRafFrames(framesToWait, callback) {
    framesToWait = Math.ceil(framesToWait);
    if (framesToWait < 2) {
        raf(callback);
    }
    else {
        setTimeout(() => {
            raf(callback);
        }, (framesToWait - 1) * 16.6667);
    }
}
export let CSS = {};
(function () {
    var i;
    var keys = ['webkitTransform', 'transform', '-webkit-transform', 'webkit-transform',
        '-moz-transform', 'moz-transform', 'MozTransform', 'mozTransform', 'msTransform'];
    for (i = 0; i < keys.length; i++) {
        if (document.documentElement.style[keys[i]] !== undefined) {
            CSS.transform = keys[i];
            break;
        }
    }
    keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
    for (i = 0; i < keys.length; i++) {
        if (document.documentElement.style[keys[i]] !== undefined) {
            CSS.transition = keys[i];
            break;
        }
    }
    var isWebkit = CSS.transition.indexOf('webkit') > -1;
    CSS.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';
    CSS.transitionTimingFn = (isWebkit ? '-webkit-' : '') + 'transition-timing-function';
    CSS.transitionDelay = (isWebkit ? '-webkit-' : '') + 'transition-delay';
    CSS.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';
    CSS.transformOrigin = (isWebkit ? '-webkit-' : '') + 'transform-origin';
    CSS.animationDelay = (isWebkit ? 'webkitAnimationDelay' : 'animationDelay');
})();
export function transitionEnd(el, callback) {
    if (el) {
        CSS.transitionEnd.split(' ').forEach(eventName => {
            el.addEventListener(eventName, onEvent);
        });
        return unregister;
    }
    function unregister() {
        CSS.transitionEnd.split(' ').forEach(eventName => {
            el.removeEventListener(eventName, onEvent);
        });
    }
    function onEvent(ev) {
        if (el === ev.target) {
            unregister();
            callback(ev);
        }
    }
}
export function ready(callback) {
    let promise = null;
    if (!callback) {
        promise = new Promise(resolve => { callback = resolve; });
    }
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
        callback();
    }
    else {
        document.addEventListener('DOMContentLoaded', completed, false);
        window.addEventListener('load', completed, false);
    }
    return promise;
    function completed() {
        document.removeEventListener('DOMContentLoaded', completed, false);
        window.removeEventListener('load', completed, false);
        callback();
    }
}
export function windowLoad(callback) {
    let promise = null;
    if (!callback) {
        promise = new Promise(resolve => { callback = resolve; });
    }
    if (document.readyState === 'complete') {
        callback();
    }
    else {
        window.addEventListener('load', completed, false);
    }
    return promise;
    function completed() {
        window.removeEventListener('load', completed, false);
        callback();
    }
}
export function pointerCoord(ev) {
    let c = { x: 0, y: 0 };
    if (ev) {
        const touches = ev.touches && ev.touches.length ? ev.touches : [ev];
        const e = (ev.changedTouches && ev.changedTouches[0]) || touches[0];
        if (e) {
            c.x = e.clientX || e.pageX || 0;
            c.y = e.clientY || e.pageY || 0;
        }
    }
    return c;
}
export function hasPointerMoved(threshold, startCoord, endCoord) {
    let deltaX = (startCoord.x - endCoord.x);
    let deltaY = (startCoord.y - endCoord.y);
    let distance = deltaX * deltaX + deltaY * deltaY;
    return distance > (threshold * threshold);
}
export function isActive(ele) {
    return !!(ele && (document.activeElement === ele));
}
export function hasFocus(ele) {
    return isActive(ele) && (ele.parentElement.querySelector(':focus') === ele);
}
export function isTextInput(ele) {
    return !!ele &&
        (ele.tagName === 'TEXTAREA' ||
            ele.contentEditable === 'true' ||
            (ele.tagName === 'INPUT' && !(/^(radio|checkbox|range|file|submit|reset|color|image|button)$/i).test(ele.type)));
}
export function hasFocusedTextInput() {
    let ele = document.activeElement;
    if (isTextInput(ele)) {
        return (ele.parentElement.querySelector(':focus') === ele);
    }
    return false;
}
const skipInputAttrsReg = /^(value|checked|disabled|type|class|style|id|autofocus|autocomplete|autocorrect)$/i;
export function copyInputAttributes(srcElement, destElement) {
    var attrs = srcElement.attributes;
    for (var i = 0; i < attrs.length; i++) {
        var attr = attrs[i];
        if (!skipInputAttrsReg.test(attr.name)) {
            destElement.setAttribute(attr.name, attr.value);
        }
    }
}
export function getDimensions(ele, id) {
    let dimensions = dimensionCache[id];
    if (!dimensions) {
        if (ele.offsetWidth && ele.offsetHeight) {
            dimensions = dimensionCache[id] = {
                width: ele.offsetWidth,
                height: ele.offsetHeight,
                left: ele.offsetLeft,
                top: ele.offsetTop
            };
        }
        else {
            return { width: 0, height: 0, left: 0, top: 0 };
        }
    }
    return dimensions;
}
export function clearDimensions(id) {
    delete dimensionCache[id];
}
export function windowDimensions() {
    if (!dimensionCache.win) {
        if (window.innerWidth && window.innerHeight) {
            dimensionCache.win = {
                width: window.innerWidth,
                height: window.innerHeight
            };
        }
        else {
            return { width: 0, height: 0 };
        }
    }
    return dimensionCache.win;
}
export function flushDimensionCache() {
    dimensionCache = {};
}
let dimensionCache = {};
//# sourceMappingURL=dom.js.map