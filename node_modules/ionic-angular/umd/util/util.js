(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    function clamp(min, n, max) {
        return Math.max(min, Math.min(n, max));
    }
    exports.clamp = clamp;
    function assign() {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i - 0] = arguments[_i];
        }
        if (typeof Object.assign !== 'function') {
            return _baseExtend(args[0], [].slice.call(args, 1), false);
        }
        return Object.assign.apply(null, args);
    }
    exports.assign = assign;
    function merge(dst) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        return _baseExtend(dst, [].slice.call(arguments, 1), true);
    }
    exports.merge = merge;
    function _baseExtend(dst, objs, deep) {
        for (var i = 0, ii = objs.length; i < ii; ++i) {
            var obj = objs[i];
            if (!obj || !exports.isObject(obj) && !exports.isFunction(obj))
                continue;
            var keys = Object.keys(obj);
            for (var j = 0, jj = keys.length; j < jj; j++) {
                var key = keys[j];
                var src = obj[key];
                if (deep && exports.isObject(src)) {
                    if (!exports.isObject(dst[key]))
                        dst[key] = exports.isArray(src) ? [] : {};
                    _baseExtend(dst[key], [src], true);
                }
                else {
                    dst[key] = src;
                }
            }
        }
        return dst;
    }
    function debounce(fn, wait, immediate) {
        if (immediate === void 0) { immediate = false; }
        var timeout, args, context, timestamp, result;
        return function () {
            context = this;
            args = arguments;
            timestamp = Date.now();
            var later = function () {
                var last = Date.now() - timestamp;
                if (last < wait) {
                    timeout = setTimeout(later, wait - last);
                }
                else {
                    timeout = null;
                    if (!immediate)
                        result = fn.apply(context, args);
                }
            };
            var callNow = immediate && !timeout;
            if (!timeout) {
                timeout = setTimeout(later, wait);
            }
            if (callNow)
                result = fn.apply(context, args);
            return result;
        };
    }
    exports.debounce = debounce;
    function defaults(dest) {
        var args = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            args[_i - 1] = arguments[_i];
        }
        for (var i = arguments.length - 1; i >= 1; i--) {
            var source = arguments[i];
            if (source) {
                for (var key in source) {
                    if (source.hasOwnProperty(key) && !dest.hasOwnProperty(key)) {
                        dest[key] = source[key];
                    }
                }
            }
        }
        return dest;
    }
    exports.defaults = defaults;
    exports.isBoolean = function (val) { return typeof val === 'boolean'; };
    exports.isString = function (val) { return typeof val === 'string'; };
    exports.isNumber = function (val) { return typeof val === 'number'; };
    exports.isFunction = function (val) { return typeof val === 'function'; };
    exports.isDefined = function (val) { return typeof val !== 'undefined'; };
    exports.isUndefined = function (val) { return typeof val === 'undefined'; };
    exports.isPresent = function (val) { return val !== undefined && val !== null; };
    exports.isBlank = function (val) { return val === undefined || val === null; };
    exports.isObject = function (val) { return typeof val === 'object'; };
    exports.isArray = Array.isArray;
    exports.isPrimitive = function (val) {
        return exports.isString(val) || exports.isBoolean(val) || (exports.isNumber(val) && !isNaN(val));
    };
    exports.isTrueProperty = function (val) {
        if (typeof val === 'string') {
            val = val.toLowerCase().trim();
            return (val === 'true' || val === 'on' || val === '');
        }
        return !!val;
    };
    exports.isCheckedProperty = function (a, b) {
        if (a === undefined || a === null || a === '') {
            return (b === undefined || b === null || b === '');
        }
        else if (a === true || a === 'true') {
            return (b === true || b === 'true');
        }
        else if (a === false || a === 'false') {
            return (b === false || b === 'false');
        }
        else if (a === 0 || a === '0') {
            return (b === 0 || b === '0');
        }
        return (a == b);
    };
    function reorderArray(array, indexes) {
        var element = array[indexes.from];
        array.splice(indexes.from, 1);
        array.splice(indexes.to, 0, element);
        return array;
    }
    exports.reorderArray = reorderArray;
    function swipeShouldReset(isResetDirection, isMovingFast, isOnResetZone) {
        var shouldClose = (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast);
        return shouldClose;
    }
    exports.swipeShouldReset = swipeShouldReset;
    var ASSERT_ENABLED = true;
    function _assert(actual, reason) {
        if (!actual && ASSERT_ENABLED === true) {
            var message = 'IONIC ASSERT: ' + reason;
            console.error(message);
            debugger;
            throw new Error(message);
        }
    }
    exports.assert = _assert;
});
//# sourceMappingURL=util.js.map