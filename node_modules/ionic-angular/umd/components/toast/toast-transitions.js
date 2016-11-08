var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../../animations/animation', '../../transitions/transition'], factory);
    }
})(function (require, exports) {
    "use strict";
    var animation_1 = require('../../animations/animation');
    var transition_1 = require('../../transitions/transition');
    var ToastSlideIn = (function (_super) {
        __extends(ToastSlideIn, _super);
        function ToastSlideIn() {
            _super.apply(this, arguments);
        }
        ToastSlideIn.prototype.init = function () {
            var ele = this.enteringView.pageRef().nativeElement;
            var wrapperEle = ele.querySelector('.toast-wrapper');
            var wrapper = new animation_1.Animation(wrapperEle);
            if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_TOP) {
                wrapper.fromTo('translateY', '-100%', 10 + "px");
            }
            else if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_MIDDLE) {
                var topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
                wrapperEle.style.top = topPosition + "px";
                wrapper.fromTo('opacity', 0.01, 1);
            }
            else {
                wrapper.fromTo('translateY', '100%', (0 - 10) + "px");
            }
            this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(wrapper);
        };
        return ToastSlideIn;
    }(transition_1.Transition));
    exports.ToastSlideIn = ToastSlideIn;
    var ToastSlideOut = (function (_super) {
        __extends(ToastSlideOut, _super);
        function ToastSlideOut() {
            _super.apply(this, arguments);
        }
        ToastSlideOut.prototype.init = function () {
            var ele = this.leavingView.pageRef().nativeElement;
            var wrapperEle = ele.querySelector('.toast-wrapper');
            var wrapper = new animation_1.Animation(wrapperEle);
            if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_TOP) {
                wrapper.fromTo('translateY', 10 + "px", '-100%');
            }
            else if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_MIDDLE) {
                wrapper.fromTo('opacity', 0.99, 0);
            }
            else {
                wrapper.fromTo('translateY', (0 - 10) + "px", '100%');
            }
            this.easing('cubic-bezier(.36,.66,.04,1)').duration(300).add(wrapper);
        };
        return ToastSlideOut;
    }(transition_1.Transition));
    exports.ToastSlideOut = ToastSlideOut;
    var ToastMdSlideIn = (function (_super) {
        __extends(ToastMdSlideIn, _super);
        function ToastMdSlideIn() {
            _super.apply(this, arguments);
        }
        ToastMdSlideIn.prototype.init = function () {
            var ele = this.enteringView.pageRef().nativeElement;
            var wrapperEle = ele.querySelector('.toast-wrapper');
            var wrapper = new animation_1.Animation(wrapperEle);
            if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_TOP) {
                wrapper.fromTo('translateY', '-100%', "0%");
            }
            else if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_MIDDLE) {
                var topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
                wrapperEle.style.top = topPosition + "px";
                wrapper.fromTo('opacity', 0.01, 1);
            }
            else {
                wrapper.fromTo('translateY', '100%', "0%");
            }
            this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(wrapper);
        };
        return ToastMdSlideIn;
    }(transition_1.Transition));
    exports.ToastMdSlideIn = ToastMdSlideIn;
    var ToastMdSlideOut = (function (_super) {
        __extends(ToastMdSlideOut, _super);
        function ToastMdSlideOut() {
            _super.apply(this, arguments);
        }
        ToastMdSlideOut.prototype.init = function () {
            var ele = this.leavingView.pageRef().nativeElement;
            var wrapperEle = ele.querySelector('.toast-wrapper');
            var wrapper = new animation_1.Animation(wrapperEle);
            if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_TOP) {
                wrapper.fromTo('translateY', 0 + "%", '-100%');
            }
            else if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_MIDDLE) {
                wrapper.fromTo('opacity', 0.99, 0);
            }
            else {
                wrapper.fromTo('translateY', 0 + "%", '100%');
            }
            this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(wrapper);
        };
        return ToastMdSlideOut;
    }(transition_1.Transition));
    exports.ToastMdSlideOut = ToastMdSlideOut;
    var ToastWpPopIn = (function (_super) {
        __extends(ToastWpPopIn, _super);
        function ToastWpPopIn() {
            _super.apply(this, arguments);
        }
        ToastWpPopIn.prototype.init = function () {
            var ele = this.enteringView.pageRef().nativeElement;
            var wrapperEle = ele.querySelector('.toast-wrapper');
            var wrapper = new animation_1.Animation(wrapperEle);
            if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_TOP) {
                wrapper.fromTo('opacity', 0.01, 1);
                wrapper.fromTo('scale', 1.3, 1);
            }
            else if (this.enteringView.data && this.enteringView.data.position === TOAST_POSITION_MIDDLE) {
                var topPosition = Math.floor(ele.clientHeight / 2 - wrapperEle.clientHeight / 2);
                wrapperEle.style.top = topPosition + "px";
                wrapper.fromTo('opacity', 0.01, 1);
                wrapper.fromTo('scale', 1.3, 1);
            }
            else {
                wrapper.fromTo('opacity', 0.01, 1);
                wrapper.fromTo('scale', 1.3, 1);
            }
            this.easing('cubic-bezier(0,0,0.05,1)').duration(200).add(wrapper);
        };
        return ToastWpPopIn;
    }(transition_1.Transition));
    exports.ToastWpPopIn = ToastWpPopIn;
    var ToastWpPopOut = (function (_super) {
        __extends(ToastWpPopOut, _super);
        function ToastWpPopOut() {
            _super.apply(this, arguments);
        }
        ToastWpPopOut.prototype.init = function () {
            var ele = this.leavingView.pageRef().nativeElement;
            var wrapperEle = ele.querySelector('.toast-wrapper');
            var wrapper = new animation_1.Animation(wrapperEle);
            if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_TOP) {
                wrapper.fromTo('opacity', 0.99, 0);
                wrapper.fromTo('scale', 1, 1.3);
            }
            else if (this.leavingView.data && this.leavingView.data.position === TOAST_POSITION_MIDDLE) {
                wrapper.fromTo('opacity', 0.99, 0);
                wrapper.fromTo('scale', 1, 1.3);
            }
            else {
                wrapper.fromTo('opacity', 0.99, 0);
                wrapper.fromTo('scale', 1, 1.3);
            }
            var EASE = 'ease-out';
            var DURATION = 150;
            this.easing(EASE).duration(DURATION).add(wrapper);
        };
        return ToastWpPopOut;
    }(transition_1.Transition));
    exports.ToastWpPopOut = ToastWpPopOut;
    var TOAST_POSITION_TOP = 'top';
    var TOAST_POSITION_MIDDLE = 'middle';
});
//# sourceMappingURL=toast-transitions.js.map