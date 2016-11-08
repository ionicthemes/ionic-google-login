(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/dom', '../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var dom_1 = require('../util/dom');
    var util_1 = require('../util/util');
    var Animation = (function () {
        function Animation(ele, opts, raf) {
            this._dur = null;
            this._es = null;
            this._upd = 0;
            this.hasChildren = false;
            this.isPlaying = false;
            this.hasCompleted = false;
            this.element(ele).opts = opts;
            this._raf = raf || dom_1.nativeRaf;
        }
        Animation.prototype.element = function (ele) {
            if (ele) {
                if (typeof ele === 'string') {
                    ele = document.querySelectorAll(ele);
                    for (var i = 0; i < ele.length; i++) {
                        this._addEle(ele[i]);
                    }
                }
                else if (ele.length) {
                    for (var i = 0; i < ele.length; i++) {
                        this._addEle(ele[i]);
                    }
                }
                else {
                    this._addEle(ele);
                }
            }
            return this;
        };
        Animation.prototype._addEle = function (ele) {
            if (ele.nativeElement) {
                ele = ele.nativeElement;
            }
            if (ele.nodeType === 1) {
                this._eL = (this._e = this._e || []).push(ele);
            }
        };
        Animation.prototype.add = function (childAnimation) {
            childAnimation.parent = this;
            this.hasChildren = true;
            this._cL = (this._c = this._c || []).push(childAnimation);
            return this;
        };
        Animation.prototype.getDuration = function (opts) {
            if (opts && util_1.isDefined(opts.duration)) {
                return opts.duration;
            }
            else if (this._dur !== null) {
                return this._dur;
            }
            else if (this.parent) {
                return this.parent.getDuration();
            }
            return 0;
        };
        Animation.prototype.duration = function (milliseconds) {
            this._dur = milliseconds;
            return this;
        };
        Animation.prototype.getEasing = function () {
            return this._es !== null ? this._es : (this.parent && this.parent.getEasing()) || null;
        };
        Animation.prototype.easing = function (name) {
            this._es = name;
            return this;
        };
        Animation.prototype.from = function (prop, val) {
            this._addProp('from', prop, val);
            return this;
        };
        Animation.prototype.to = function (prop, val, clearProperyAfterTransition) {
            var fx = this._addProp('to', prop, val);
            if (clearProperyAfterTransition) {
                this.afterClearStyles([fx.trans ? dom_1.CSS.transform : prop]);
            }
            return this;
        };
        Animation.prototype.fromTo = function (prop, fromVal, toVal, clearProperyAfterTransition) {
            return this.from(prop, fromVal).to(prop, toVal, clearProperyAfterTransition);
        };
        Animation.prototype._addProp = function (state, prop, val) {
            this._fx = this._fx || {};
            var fxProp = this._fx[prop];
            if (!fxProp) {
                fxProp = this._fx[prop] = {
                    trans: (TRANSFORMS[prop] === 1)
                };
                fxProp.wc = (fxProp.trans ? dom_1.CSS.transform : prop);
            }
            var fxState = fxProp[state] = {
                val: val,
                num: null,
                unit: '',
            };
            if (typeof val === 'string' && val.indexOf(' ') < 0) {
                var r = val.match(CSS_VALUE_REGEX);
                var num = parseFloat(r[1]);
                if (!isNaN(num)) {
                    fxState.num = num;
                }
                fxState.unit = (r[0] !== r[2] ? r[2] : '');
            }
            else if (typeof val === 'number') {
                fxState.num = val;
            }
            return fxProp;
        };
        Animation.prototype.beforeAddClass = function (className) {
            (this._bfAdd = this._bfAdd || []).push(className);
            return this;
        };
        Animation.prototype.beforeRemoveClass = function (className) {
            (this._bfRm = this._bfRm || []).push(className);
            return this;
        };
        Animation.prototype.beforeStyles = function (styles) {
            this._bfSty = styles;
            return this;
        };
        Animation.prototype.beforeClearStyles = function (propertyNames) {
            this._bfSty = this._bfSty || {};
            for (var i = 0; i < propertyNames.length; i++) {
                this._bfSty[propertyNames[i]] = '';
            }
            return this;
        };
        Animation.prototype.beforeAddRead = function (domReadFn) {
            (this._rdFn = this._rdFn || []).push(domReadFn);
            return this;
        };
        Animation.prototype.beforeAddWrite = function (domWriteFn) {
            (this._wrFn = this._wrFn || []).push(domWriteFn);
            return this;
        };
        Animation.prototype.afterAddClass = function (className) {
            (this._afAdd = this._afAdd || []).push(className);
            return this;
        };
        Animation.prototype.afterRemoveClass = function (className) {
            (this._afRm = this._afRm || []).push(className);
            return this;
        };
        Animation.prototype.afterStyles = function (styles) {
            this._afSty = styles;
            return this;
        };
        Animation.prototype.afterClearStyles = function (propertyNames) {
            this._afSty = this._afSty || {};
            for (var i = 0; i < propertyNames.length; i++) {
                this._afSty[propertyNames[i]] = '';
            }
            return this;
        };
        Animation.prototype.play = function (opts) {
            var _this = this;
            var dur = this.getDuration(opts);
            this._isAsync = this._hasDuration(opts);
            this._clearAsync();
            this._playInit(opts);
            if (this._isAsync) {
                this._asyncEnd(dur, true);
            }
            this._raf && this._raf(function () {
                _this._raf && _this._raf(_this._playDomInspect.bind(_this, opts));
            });
        };
        Animation.prototype._playInit = function (opts) {
            this._twn = false;
            this.isPlaying = true;
            this.hasCompleted = false;
            this._hasDur = (this.getDuration(opts) > ANIMATION_DURATION_MIN);
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._playInit(opts);
            }
            if (this._hasDur) {
                this._progress(0);
                this._willChg(true);
            }
        };
        Animation.prototype._playDomInspect = function (opts) {
            this._beforeReadFn();
            this._beforeWriteFn();
            this._playProgress(opts);
            if (this._isAsync) {
                this._raf && this._raf(this._playToStep.bind(this, 1));
            }
        };
        Animation.prototype._playProgress = function (opts) {
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._playProgress(opts);
            }
            this._before();
            if (this._hasDur) {
                this._setTrans(this.getDuration(opts), false);
            }
            else {
                this._progress(1);
                this._after();
                this._didFinish(true);
            }
        };
        Animation.prototype._playToStep = function (stepValue) {
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._playToStep(stepValue);
            }
            if (this._hasDur) {
                this._progress(stepValue);
            }
        };
        Animation.prototype._asyncEnd = function (dur, shouldComplete) {
            var self = this;
            function onTransitionEnd(ev) {
                self._clearAsync();
                self._playEnd();
                self._didFinishAll(shouldComplete, true, false);
            }
            function onTransitionFallback() {
                (void 0);
                self._tm = 0;
                self._clearAsync();
                self._playEnd(1);
                self._didFinishAll(shouldComplete, true, false);
            }
            self._unrgTrns = dom_1.transitionEnd(self._transEl(), onTransitionEnd);
            self._tm = dom_1.nativeTimeout(onTransitionFallback, (dur + TRANSITION_END_FALLBACK_PADDING_MS));
        };
        Animation.prototype._playEnd = function (stepValue) {
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._playEnd(stepValue);
            }
            if (this._hasDur) {
                if (util_1.isDefined(stepValue)) {
                    this._setTrans(0, true);
                    this._progress(stepValue);
                }
                this._after();
                this._willChg(false);
            }
        };
        Animation.prototype._hasDuration = function (opts) {
            if (this.getDuration(opts) > ANIMATION_DURATION_MIN) {
                return true;
            }
            for (var i = 0; i < this._cL; i++) {
                if (this._c[i]._hasDuration(opts)) {
                    return true;
                }
            }
            return false;
        };
        Animation.prototype._hasDomReads = function () {
            if (this._rdFn && this._rdFn.length) {
                return true;
            }
            for (var i = 0; i < this._cL; i++) {
                if (this._c[i]._hasDomReads()) {
                    return true;
                }
            }
            return false;
        };
        Animation.prototype.stop = function (stepValue) {
            if (stepValue === void 0) { stepValue = 1; }
            this._clearAsync();
            this._hasDur = true;
            this._playEnd(stepValue);
        };
        Animation.prototype._clearAsync = function () {
            this._unrgTrns && this._unrgTrns();
            this._tm && clearTimeout(this._tm);
            this._tm = this._unrgTrns = undefined;
        };
        Animation.prototype._progress = function (stepValue) {
            var val;
            if (this._fx && this._eL) {
                if (this._rv) {
                    stepValue = ((stepValue * -1) + 1);
                }
                var transforms = [];
                for (var prop in this._fx) {
                    var fx = this._fx[prop];
                    if (fx.from && fx.to) {
                        var tweenEffect = (fx.from.num !== fx.to.num);
                        if (tweenEffect) {
                            this._twn = true;
                        }
                        if (stepValue === 0) {
                            val = fx.from.val;
                        }
                        else if (stepValue === 1) {
                            val = fx.to.val;
                        }
                        else if (tweenEffect) {
                            val = (((fx.to.num - fx.from.num) * stepValue) + fx.from.num) + fx.to.unit;
                        }
                        else {
                            val = null;
                        }
                        if (val !== null) {
                            if (fx.trans) {
                                transforms.push(prop + '(' + val + ')');
                            }
                            else {
                                for (var i = 0; i < this._eL; i++) {
                                    this._e[i].style[prop] = val;
                                }
                            }
                        }
                    }
                }
                if (transforms.length) {
                    if (!this._rv && stepValue !== 1 || this._rv && stepValue !== 0) {
                        transforms.push('translateZ(0px)');
                    }
                    for (var i = 0; i < this._eL; i++) {
                        this._e[i].style[dom_1.CSS.transform] = transforms.join(' ');
                    }
                }
            }
        };
        Animation.prototype._setTrans = function (dur, forcedLinearEasing) {
            if (this._fx) {
                var easing = (forcedLinearEasing ? 'linear' : this.getEasing());
                for (var i = 0; i < this._eL; i++) {
                    if (dur > 0) {
                        this._e[i].style[dom_1.CSS.transition] = '';
                        this._e[i].style[dom_1.CSS.transitionDuration] = dur + 'ms';
                        if (easing) {
                            this._e[i].style[dom_1.CSS.transitionTimingFn] = easing;
                        }
                    }
                    else {
                        this._e[i].style[dom_1.CSS.transition] = 'none';
                    }
                }
            }
        };
        Animation.prototype._before = function () {
            if (!this._rv) {
                var ele = void 0;
                for (var i = 0; i < this._eL; i++) {
                    ele = this._e[i];
                    if (this._bfAdd) {
                        for (var j = 0; j < this._bfAdd.length; j++) {
                            ele.classList.add(this._bfAdd[j]);
                        }
                    }
                    if (this._bfRm) {
                        for (var j = 0; j < this._bfRm.length; j++) {
                            ele.classList.remove(this._bfRm[j]);
                        }
                    }
                    if (this._bfSty) {
                        for (var prop in this._bfSty) {
                            ele.style[prop] = this._bfSty[prop];
                        }
                    }
                }
            }
        };
        Animation.prototype._beforeReadFn = function () {
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._beforeReadFn();
            }
            if (this._rdFn) {
                for (var i = 0; i < this._rdFn.length; i++) {
                    this._rdFn[i]();
                }
            }
        };
        Animation.prototype._beforeWriteFn = function () {
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._beforeWriteFn();
            }
            if (this._wrFn) {
                for (var i = 0; i < this._wrFn.length; i++) {
                    this._wrFn[i]();
                }
            }
        };
        Animation.prototype._after = function () {
            var ele;
            for (var i = 0; i < this._eL; i++) {
                ele = this._e[i];
                ele.style[dom_1.CSS.transitionDuration] = ele.style[dom_1.CSS.transitionTimingFn] = '';
                if (this._rv) {
                    if (this._bfAdd) {
                        for (var j = 0; j < this._bfAdd.length; j++) {
                            ele.classList.remove(this._bfAdd[j]);
                        }
                    }
                    if (this._bfRm) {
                        for (var j = 0; j < this._bfRm.length; j++) {
                            ele.classList.add(this._bfRm[j]);
                        }
                    }
                    if (this._bfSty) {
                        for (var prop in this._bfSty) {
                            ele.style[prop] = '';
                        }
                    }
                }
                else {
                    if (this._afAdd) {
                        for (var j = 0; j < this._afAdd.length; j++) {
                            ele.classList.add(this._afAdd[j]);
                        }
                    }
                    if (this._afRm) {
                        for (var j = 0; j < this._afRm.length; j++) {
                            ele.classList.remove(this._afRm[j]);
                        }
                    }
                    if (this._afSty) {
                        for (var prop in this._afSty) {
                            ele.style[prop] = this._afSty[prop];
                        }
                    }
                }
            }
        };
        Animation.prototype._willChg = function (addWillChange) {
            var wc;
            if (addWillChange) {
                wc = [];
                for (var prop in this._fx) {
                    if (this._fx[prop].wc === 'webkitTransform') {
                        wc.push('transform', '-webkit-transform');
                    }
                    else {
                        wc.push(this._fx[prop].wc);
                    }
                }
            }
            for (var i = 0; i < this._eL; i++) {
                this._e[i].style.willChange = addWillChange ? wc.join(',') : '';
            }
        };
        Animation.prototype.progressStart = function () {
            this._clearAsync();
            this._beforeReadFn();
            this._beforeWriteFn();
            this._progressStart();
        };
        Animation.prototype._progressStart = function () {
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._progressStart();
            }
            this._before();
            this._setTrans(0, true);
            this._willChg(true);
        };
        Animation.prototype.progressStep = function (stepValue) {
            var now = Date.now();
            if (now - 15 > this._upd) {
                this._upd = now;
                stepValue = Math.min(1, Math.max(0, stepValue));
                for (var i = 0; i < this._cL; i++) {
                    this._c[i].progressStep(stepValue);
                }
                if (this._rv) {
                    stepValue = ((stepValue * -1) + 1);
                }
                this._progress(stepValue);
            }
        };
        Animation.prototype.progressEnd = function (shouldComplete, currentStepValue, maxDelta) {
            if (maxDelta === void 0) { maxDelta = 0; }
            (void 0);
            this._isAsync = (currentStepValue > 0.05 && currentStepValue < 0.95);
            var stepValue = shouldComplete ? 1 : 0;
            var factor = Math.max(Math.abs(currentStepValue - stepValue), 0.5) * 2;
            var dur = 64 + factor * maxDelta;
            this._progressEnd(shouldComplete, stepValue, dur, this._isAsync);
            if (this._isAsync) {
                this._asyncEnd(dur, shouldComplete);
                this._raf && this._raf(this._playToStep.bind(this, stepValue));
            }
        };
        Animation.prototype._progressEnd = function (shouldComplete, stepValue, dur, isAsync) {
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._progressEnd(shouldComplete, stepValue, dur, isAsync);
            }
            if (!isAsync) {
                this._progress(stepValue);
                this._willChg(false);
                this._after();
                this._didFinish(shouldComplete);
            }
            else {
                this.isPlaying = true;
                this.hasCompleted = false;
                this._hasDur = true;
                this._willChg(true);
                this._setTrans(dur, false);
            }
        };
        Animation.prototype.onFinish = function (callback, onceTimeCallback, clearOnFinishCallacks) {
            if (onceTimeCallback === void 0) { onceTimeCallback = false; }
            if (clearOnFinishCallacks === void 0) { clearOnFinishCallacks = false; }
            if (clearOnFinishCallacks) {
                this._fFn = this._fOneFn = undefined;
            }
            if (onceTimeCallback) {
                this._fOneFn = this._fOneFn || [];
                this._fOneFn.push(callback);
            }
            else {
                this._fFn = this._fFn || [];
                this._fFn.push(callback);
            }
            return this;
        };
        Animation.prototype._didFinishAll = function (hasCompleted, finishAsyncAnimations, finishNoDurationAnimations) {
            for (var i = 0; i < this._cL; i++) {
                this._c[i]._didFinishAll(hasCompleted, finishAsyncAnimations, finishNoDurationAnimations);
            }
            if (finishAsyncAnimations && this._isAsync || finishNoDurationAnimations && !this._isAsync) {
                this._didFinish(hasCompleted);
            }
        };
        Animation.prototype._didFinish = function (hasCompleted) {
            this.isPlaying = false;
            this.hasCompleted = hasCompleted;
            if (this._fFn) {
                for (var i = 0; i < this._fFn.length; i++) {
                    this._fFn[i](this);
                }
            }
            if (this._fOneFn) {
                for (var i = 0; i < this._fOneFn.length; i++) {
                    this._fOneFn[i](this);
                }
                this._fOneFn.length = 0;
            }
        };
        Animation.prototype.reverse = function (shouldReverse) {
            if (shouldReverse === void 0) { shouldReverse = true; }
            for (var i = 0; i < this._cL; i++) {
                this._c[i].reverse(shouldReverse);
            }
            this._rv = shouldReverse;
            return this;
        };
        Animation.prototype.destroy = function () {
            for (var i = 0; i < this._cL; i++) {
                this._c[i].destroy();
            }
            this._clearAsync();
            this.parent = this._e = this._rdFn = this._wrFn = this._raf = null;
            if (this._c) {
                this._c.length = this._cL = 0;
            }
            if (this._fFn) {
                this._fFn.length = 0;
            }
            if (this._fOneFn) {
                this._fOneFn.length = 0;
            }
        };
        Animation.prototype._transEl = function () {
            var targetEl;
            for (var i = 0; i < this._cL; i++) {
                targetEl = this._c[i]._transEl();
                if (targetEl) {
                    return targetEl;
                }
            }
            return (this._twn && this._hasDur && this._eL ? this._e[0] : null);
        };
        return Animation;
    }());
    exports.Animation = Animation;
    var TRANSFORMS = {
        'translateX': 1, 'translateY': 1, 'translateZ': 1, 'scale': 1, 'scaleX': 1, 'scaleY': 1, 'scaleZ': 1, 'rotate': 1, 'rotateX': 1, 'rotateY': 1, 'rotateZ': 1, 'skewX': 1, 'skewY': 1, 'perspective': 1
    };
    var CSS_VALUE_REGEX = /(^-?\d*\.?\d*)(.*)/;
    var ANIMATION_DURATION_MIN = 32;
    var TRANSITION_END_FALLBACK_PADDING_MS = 400;
});
//# sourceMappingURL=animation.js.map