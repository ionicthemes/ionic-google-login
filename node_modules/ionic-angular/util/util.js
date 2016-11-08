export function clamp(min, n, max) {
    return Math.max(min, Math.min(n, max));
}
export function assign() {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i - 0] = arguments[_i];
    }
    if (typeof Object.assign !== 'function') {
        return _baseExtend(args[0], [].slice.call(args, 1), false);
    }
    return Object.assign.apply(null, args);
}
export function merge(dst) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    return _baseExtend(dst, [].slice.call(arguments, 1), true);
}
function _baseExtend(dst, objs, deep) {
    for (var i = 0, ii = objs.length; i < ii; ++i) {
        var obj = objs[i];
        if (!obj || !isObject(obj) && !isFunction(obj))
            continue;
        var keys = Object.keys(obj);
        for (var j = 0, jj = keys.length; j < jj; j++) {
            var key = keys[j];
            var src = obj[key];
            if (deep && isObject(src)) {
                if (!isObject(dst[key]))
                    dst[key] = isArray(src) ? [] : {};
                _baseExtend(dst[key], [src], true);
            }
            else {
                dst[key] = src;
            }
        }
    }
    return dst;
}
export function debounce(fn, wait, immediate) {
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
export function defaults(dest) {
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
export var isBoolean = function (val) { return typeof val === 'boolean'; };
export var isString = function (val) { return typeof val === 'string'; };
export var isNumber = function (val) { return typeof val === 'number'; };
export var isFunction = function (val) { return typeof val === 'function'; };
export var isDefined = function (val) { return typeof val !== 'undefined'; };
export var isUndefined = function (val) { return typeof val === 'undefined'; };
export var isPresent = function (val) { return val !== undefined && val !== null; };
export var isBlank = function (val) { return val === undefined || val === null; };
export var isObject = function (val) { return typeof val === 'object'; };
export var isArray = Array.isArray;
export var isPrimitive = function (val) {
    return isString(val) || isBoolean(val) || (isNumber(val) && !isNaN(val));
};
export var isTrueProperty = function (val) {
    if (typeof val === 'string') {
        val = val.toLowerCase().trim();
        return (val === 'true' || val === 'on' || val === '');
    }
    return !!val;
};
export var isCheckedProperty = function (a, b) {
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
export function reorderArray(array, indexes) {
    var element = array[indexes.from];
    array.splice(indexes.from, 1);
    array.splice(indexes.to, 0, element);
    return array;
}
export function swipeShouldReset(isResetDirection, isMovingFast, isOnResetZone) {
    var shouldClose = (!isMovingFast && isOnResetZone) || (isResetDirection && isMovingFast);
    return shouldClose;
}
var ASSERT_ENABLED = true;
function _assert(actual, reason) {
    if (!actual && ASSERT_ENABLED === true) {
        var message = 'IONIC ASSERT: ' + reason;
        console.error(message);
        debugger;
        throw new Error(message);
    }
}
export { _assert as assert };
//# sourceMappingURL=util.js.map