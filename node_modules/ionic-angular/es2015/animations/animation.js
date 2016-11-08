import { CSS, nativeRaf, transitionEnd, nativeTimeout } from '../util/dom';
import { isDefined } from '../util/util';
export class Animation {
    constructor(ele, opts, raf) {
        this._dur = null;
        this._es = null;
        this._upd = 0;
        this.hasChildren = false;
        this.isPlaying = false;
        this.hasCompleted = false;
        this.element(ele).opts = opts;
        this._raf = raf || nativeRaf;
    }
    element(ele) {
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
    }
    _addEle(ele) {
        if (ele.nativeElement) {
            ele = ele.nativeElement;
        }
        if (ele.nodeType === 1) {
            this._eL = (this._e = this._e || []).push(ele);
        }
    }
    add(childAnimation) {
        childAnimation.parent = this;
        this.hasChildren = true;
        this._cL = (this._c = this._c || []).push(childAnimation);
        return this;
    }
    getDuration(opts) {
        if (opts && isDefined(opts.duration)) {
            return opts.duration;
        }
        else if (this._dur !== null) {
            return this._dur;
        }
        else if (this.parent) {
            return this.parent.getDuration();
        }
        return 0;
    }
    duration(milliseconds) {
        this._dur = milliseconds;
        return this;
    }
    getEasing() {
        return this._es !== null ? this._es : (this.parent && this.parent.getEasing()) || null;
    }
    easing(name) {
        this._es = name;
        return this;
    }
    from(prop, val) {
        this._addProp('from', prop, val);
        return this;
    }
    to(prop, val, clearProperyAfterTransition) {
        const fx = this._addProp('to', prop, val);
        if (clearProperyAfterTransition) {
            this.afterClearStyles([fx.trans ? CSS.transform : prop]);
        }
        return this;
    }
    fromTo(prop, fromVal, toVal, clearProperyAfterTransition) {
        return this.from(prop, fromVal).to(prop, toVal, clearProperyAfterTransition);
    }
    _addProp(state, prop, val) {
        this._fx = this._fx || {};
        let fxProp = this._fx[prop];
        if (!fxProp) {
            fxProp = this._fx[prop] = {
                trans: (TRANSFORMS[prop] === 1)
            };
            fxProp.wc = (fxProp.trans ? CSS.transform : prop);
        }
        let fxState = fxProp[state] = {
            val: val,
            num: null,
            unit: '',
        };
        if (typeof val === 'string' && val.indexOf(' ') < 0) {
            let r = val.match(CSS_VALUE_REGEX);
            let num = parseFloat(r[1]);
            if (!isNaN(num)) {
                fxState.num = num;
            }
            fxState.unit = (r[0] !== r[2] ? r[2] : '');
        }
        else if (typeof val === 'number') {
            fxState.num = val;
        }
        return fxProp;
    }
    beforeAddClass(className) {
        (this._bfAdd = this._bfAdd || []).push(className);
        return this;
    }
    beforeRemoveClass(className) {
        (this._bfRm = this._bfRm || []).push(className);
        return this;
    }
    beforeStyles(styles) {
        this._bfSty = styles;
        return this;
    }
    beforeClearStyles(propertyNames) {
        this._bfSty = this._bfSty || {};
        for (var i = 0; i < propertyNames.length; i++) {
            this._bfSty[propertyNames[i]] = '';
        }
        return this;
    }
    beforeAddRead(domReadFn) {
        (this._rdFn = this._rdFn || []).push(domReadFn);
        return this;
    }
    beforeAddWrite(domWriteFn) {
        (this._wrFn = this._wrFn || []).push(domWriteFn);
        return this;
    }
    afterAddClass(className) {
        (this._afAdd = this._afAdd || []).push(className);
        return this;
    }
    afterRemoveClass(className) {
        (this._afRm = this._afRm || []).push(className);
        return this;
    }
    afterStyles(styles) {
        this._afSty = styles;
        return this;
    }
    afterClearStyles(propertyNames) {
        this._afSty = this._afSty || {};
        for (var i = 0; i < propertyNames.length; i++) {
            this._afSty[propertyNames[i]] = '';
        }
        return this;
    }
    play(opts) {
        const dur = this.getDuration(opts);
        this._isAsync = this._hasDuration(opts);
        this._clearAsync();
        this._playInit(opts);
        if (this._isAsync) {
            this._asyncEnd(dur, true);
        }
        this._raf && this._raf(() => {
            this._raf && this._raf(this._playDomInspect.bind(this, opts));
        });
    }
    _playInit(opts) {
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
    }
    _playDomInspect(opts) {
        this._beforeReadFn();
        this._beforeWriteFn();
        this._playProgress(opts);
        if (this._isAsync) {
            this._raf && this._raf(this._playToStep.bind(this, 1));
        }
    }
    _playProgress(opts) {
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
    }
    _playToStep(stepValue) {
        for (var i = 0; i < this._cL; i++) {
            this._c[i]._playToStep(stepValue);
        }
        if (this._hasDur) {
            this._progress(stepValue);
        }
    }
    _asyncEnd(dur, shouldComplete) {
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
        self._unrgTrns = transitionEnd(self._transEl(), onTransitionEnd);
        self._tm = nativeTimeout(onTransitionFallback, (dur + TRANSITION_END_FALLBACK_PADDING_MS));
    }
    _playEnd(stepValue) {
        for (var i = 0; i < this._cL; i++) {
            this._c[i]._playEnd(stepValue);
        }
        if (this._hasDur) {
            if (isDefined(stepValue)) {
                this._setTrans(0, true);
                this._progress(stepValue);
            }
            this._after();
            this._willChg(false);
        }
    }
    _hasDuration(opts) {
        if (this.getDuration(opts) > ANIMATION_DURATION_MIN) {
            return true;
        }
        for (var i = 0; i < this._cL; i++) {
            if (this._c[i]._hasDuration(opts)) {
                return true;
            }
        }
        return false;
    }
    _hasDomReads() {
        if (this._rdFn && this._rdFn.length) {
            return true;
        }
        for (var i = 0; i < this._cL; i++) {
            if (this._c[i]._hasDomReads()) {
                return true;
            }
        }
        return false;
    }
    stop(stepValue = 1) {
        this._clearAsync();
        this._hasDur = true;
        this._playEnd(stepValue);
    }
    _clearAsync() {
        this._unrgTrns && this._unrgTrns();
        this._tm && clearTimeout(this._tm);
        this._tm = this._unrgTrns = undefined;
    }
    _progress(stepValue) {
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
                    this._e[i].style[CSS.transform] = transforms.join(' ');
                }
            }
        }
    }
    _setTrans(dur, forcedLinearEasing) {
        if (this._fx) {
            const easing = (forcedLinearEasing ? 'linear' : this.getEasing());
            for (var i = 0; i < this._eL; i++) {
                if (dur > 0) {
                    this._e[i].style[CSS.transition] = '';
                    this._e[i].style[CSS.transitionDuration] = dur + 'ms';
                    if (easing) {
                        this._e[i].style[CSS.transitionTimingFn] = easing;
                    }
                }
                else {
                    this._e[i].style[CSS.transition] = 'none';
                }
            }
        }
    }
    _before() {
        if (!this._rv) {
            let ele;
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
    }
    _beforeReadFn() {
        for (var i = 0; i < this._cL; i++) {
            this._c[i]._beforeReadFn();
        }
        if (this._rdFn) {
            for (var i = 0; i < this._rdFn.length; i++) {
                this._rdFn[i]();
            }
        }
    }
    _beforeWriteFn() {
        for (var i = 0; i < this._cL; i++) {
            this._c[i]._beforeWriteFn();
        }
        if (this._wrFn) {
            for (var i = 0; i < this._wrFn.length; i++) {
                this._wrFn[i]();
            }
        }
    }
    _after() {
        let ele;
        for (var i = 0; i < this._eL; i++) {
            ele = this._e[i];
            ele.style[CSS.transitionDuration] = ele.style[CSS.transitionTimingFn] = '';
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
    }
    _willChg(addWillChange) {
        let wc;
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
    }
    progressStart() {
        this._clearAsync();
        this._beforeReadFn();
        this._beforeWriteFn();
        this._progressStart();
    }
    _progressStart() {
        for (var i = 0; i < this._cL; i++) {
            this._c[i]._progressStart();
        }
        this._before();
        this._setTrans(0, true);
        this._willChg(true);
    }
    progressStep(stepValue) {
        const now = Date.now();
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
    }
    progressEnd(shouldComplete, currentStepValue, maxDelta = 0) {
        (void 0);
        this._isAsync = (currentStepValue > 0.05 && currentStepValue < 0.95);
        const stepValue = shouldComplete ? 1 : 0;
        const factor = Math.max(Math.abs(currentStepValue - stepValue), 0.5) * 2;
        const dur = 64 + factor * maxDelta;
        this._progressEnd(shouldComplete, stepValue, dur, this._isAsync);
        if (this._isAsync) {
            this._asyncEnd(dur, shouldComplete);
            this._raf && this._raf(this._playToStep.bind(this, stepValue));
        }
    }
    _progressEnd(shouldComplete, stepValue, dur, isAsync) {
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
    }
    onFinish(callback, onceTimeCallback = false, clearOnFinishCallacks = false) {
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
    }
    _didFinishAll(hasCompleted, finishAsyncAnimations, finishNoDurationAnimations) {
        for (var i = 0; i < this._cL; i++) {
            this._c[i]._didFinishAll(hasCompleted, finishAsyncAnimations, finishNoDurationAnimations);
        }
        if (finishAsyncAnimations && this._isAsync || finishNoDurationAnimations && !this._isAsync) {
            this._didFinish(hasCompleted);
        }
    }
    _didFinish(hasCompleted) {
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
    }
    reverse(shouldReverse = true) {
        for (var i = 0; i < this._cL; i++) {
            this._c[i].reverse(shouldReverse);
        }
        this._rv = shouldReverse;
        return this;
    }
    destroy() {
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
    }
    _transEl() {
        var targetEl;
        for (var i = 0; i < this._cL; i++) {
            targetEl = this._c[i]._transEl();
            if (targetEl) {
                return targetEl;
            }
        }
        return (this._twn && this._hasDur && this._eL ? this._e[0] : null);
    }
}
const TRANSFORMS = {
    'translateX': 1, 'translateY': 1, 'translateZ': 1, 'scale': 1, 'scaleX': 1, 'scaleY': 1, 'scaleZ': 1, 'rotate': 1, 'rotateX': 1, 'rotateY': 1, 'rotateZ': 1, 'skewX': 1, 'skewY': 1, 'perspective': 1
};
const CSS_VALUE_REGEX = /(^-?\d*\.?\d*)(.*)/;
const ANIMATION_DURATION_MIN = 32;
const TRANSITION_END_FALLBACK_PADDING_MS = 400;
//# sourceMappingURL=animation.js.map