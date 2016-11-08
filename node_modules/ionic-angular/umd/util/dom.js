(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    (function () {
        var rafLastTime = 0;
        var win = window;
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
    var originalRaf = (window[window['Zone']['__symbol__']('requestAnimationFrame')] || window[window['Zone']['__symbol__']('webkitRequestAnimationFrame')]);
    exports.nativeRaf = originalRaf !== undefined ? originalRaf['bind'](window) : window.requestAnimationFrame.bind(window);
    exports.raf = window.requestAnimationFrame.bind(window);
    exports.cancelRaf = window.cancelAnimationFrame.bind(window);
    exports.nativeTimeout = window[window['Zone']['__symbol__']('setTimeout')]['bind'](window);
    exports.clearNativeTimeout = window[window['Zone']['__symbol__']('clearTimeout')]['bind'](window);
    function rafFrames(framesToWait, callback) {
        framesToWait = Math.ceil(framesToWait);
        if (framesToWait < 2) {
            exports.nativeRaf(callback);
        }
        else {
            exports.nativeTimeout(function () {
                exports.nativeRaf(callback);
            }, (framesToWait - 1) * 16.6667);
        }
    }
    exports.rafFrames = rafFrames;
    function zoneRafFrames(framesToWait, callback) {
        framesToWait = Math.ceil(framesToWait);
        if (framesToWait < 2) {
            exports.raf(callback);
        }
        else {
            setTimeout(function () {
                exports.raf(callback);
            }, (framesToWait - 1) * 16.6667);
        }
    }
    exports.zoneRafFrames = zoneRafFrames;
    exports.CSS = {};
    (function () {
        var i;
        var keys = ['webkitTransform', 'transform', '-webkit-transform', 'webkit-transform',
            '-moz-transform', 'moz-transform', 'MozTransform', 'mozTransform', 'msTransform'];
        for (i = 0; i < keys.length; i++) {
            if (document.documentElement.style[keys[i]] !== undefined) {
                exports.CSS.transform = keys[i];
                break;
            }
        }
        keys = ['webkitTransition', 'mozTransition', 'msTransition', 'transition'];
        for (i = 0; i < keys.length; i++) {
            if (document.documentElement.style[keys[i]] !== undefined) {
                exports.CSS.transition = keys[i];
                break;
            }
        }
        var isWebkit = exports.CSS.transition.indexOf('webkit') > -1;
        exports.CSS.transitionDuration = (isWebkit ? '-webkit-' : '') + 'transition-duration';
        exports.CSS.transitionTimingFn = (isWebkit ? '-webkit-' : '') + 'transition-timing-function';
        exports.CSS.transitionDelay = (isWebkit ? '-webkit-' : '') + 'transition-delay';
        exports.CSS.transitionEnd = (isWebkit ? 'webkitTransitionEnd ' : '') + 'transitionend';
        exports.CSS.transformOrigin = (isWebkit ? '-webkit-' : '') + 'transform-origin';
        exports.CSS.animationDelay = (isWebkit ? 'webkitAnimationDelay' : 'animationDelay');
    })();
    function transitionEnd(el, callback) {
        if (el) {
            exports.CSS.transitionEnd.split(' ').forEach(function (eventName) {
                el.addEventListener(eventName, onEvent);
            });
            return unregister;
        }
        function unregister() {
            exports.CSS.transitionEnd.split(' ').forEach(function (eventName) {
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
    exports.transitionEnd = transitionEnd;
    function ready(callback) {
        var promise = null;
        if (!callback) {
            promise = new Promise(function (resolve) { callback = resolve; });
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
    exports.ready = ready;
    function windowLoad(callback) {
        var promise = null;
        if (!callback) {
            promise = new Promise(function (resolve) { callback = resolve; });
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
    exports.windowLoad = windowLoad;
    function pointerCoord(ev) {
        var c = { x: 0, y: 0 };
        if (ev) {
            var touches = ev.touches && ev.touches.length ? ev.touches : [ev];
            var e = (ev.changedTouches && ev.changedTouches[0]) || touches[0];
            if (e) {
                c.x = e.clientX || e.pageX || 0;
                c.y = e.clientY || e.pageY || 0;
            }
        }
        return c;
    }
    exports.pointerCoord = pointerCoord;
    function hasPointerMoved(threshold, startCoord, endCoord) {
        var deltaX = (startCoord.x - endCoord.x);
        var deltaY = (startCoord.y - endCoord.y);
        var distance = deltaX * deltaX + deltaY * deltaY;
        return distance > (threshold * threshold);
    }
    exports.hasPointerMoved = hasPointerMoved;
    function isActive(ele) {
        return !!(ele && (document.activeElement === ele));
    }
    exports.isActive = isActive;
    function hasFocus(ele) {
        return isActive(ele) && (ele.parentElement.querySelector(':focus') === ele);
    }
    exports.hasFocus = hasFocus;
    function isTextInput(ele) {
        return !!ele &&
            (ele.tagName === 'TEXTAREA' ||
                ele.contentEditable === 'true' ||
                (ele.tagName === 'INPUT' && !(/^(radio|checkbox|range|file|submit|reset|color|image|button)$/i).test(ele.type)));
    }
    exports.isTextInput = isTextInput;
    function hasFocusedTextInput() {
        var ele = document.activeElement;
        if (isTextInput(ele)) {
            return (ele.parentElement.querySelector(':focus') === ele);
        }
        return false;
    }
    exports.hasFocusedTextInput = hasFocusedTextInput;
    var skipInputAttrsReg = /^(value|checked|disabled|type|class|style|id|autofocus|autocomplete|autocorrect)$/i;
    function copyInputAttributes(srcElement, destElement) {
        var attrs = srcElement.attributes;
        for (var i = 0; i < attrs.length; i++) {
            var attr = attrs[i];
            if (!skipInputAttrsReg.test(attr.name)) {
                destElement.setAttribute(attr.name, attr.value);
            }
        }
    }
    exports.copyInputAttributes = copyInputAttributes;
    function getDimensions(ele, id) {
        var dimensions = dimensionCache[id];
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
    exports.getDimensions = getDimensions;
    function clearDimensions(id) {
        delete dimensionCache[id];
    }
    exports.clearDimensions = clearDimensions;
    function windowDimensions() {
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
    exports.windowDimensions = windowDimensions;
    function flushDimensionCache() {
        dimensionCache = {};
    }
    exports.flushDimensionCache = flushDimensionCache;
    var dimensionCache = {};
});
//# sourceMappingURL=dom.js.map