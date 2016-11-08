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
        define(["require", "exports", '../../animations/animation', '../../transitions/page-transition', '../../util/dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var animation_1 = require('../../animations/animation');
    var page_transition_1 = require('../../transitions/page-transition');
    var dom_1 = require('../../util/dom');
    var ModalSlideIn = (function (_super) {
        __extends(ModalSlideIn, _super);
        function ModalSlideIn() {
            _super.apply(this, arguments);
        }
        ModalSlideIn.prototype.init = function () {
            _super.prototype.init.call(this);
            var ele = this.enteringView.pageRef().nativeElement;
            var backdropEle = ele.querySelector('ion-backdrop');
            var backdrop = new animation_1.Animation(backdropEle);
            var wrapper = new animation_1.Animation(ele.querySelector('.modal-wrapper'));
            backdrop.fromTo('opacity', 0.01, 0.4);
            wrapper.fromTo('translateY', '100%', '0%');
            this
                .element(this.enteringView.pageRef())
                .easing('cubic-bezier(0.36,0.66,0.04,1)')
                .duration(400)
                .add(backdrop)
                .add(wrapper);
        };
        return ModalSlideIn;
    }(page_transition_1.PageTransition));
    exports.ModalSlideIn = ModalSlideIn;
    var ModalSlideOut = (function (_super) {
        __extends(ModalSlideOut, _super);
        function ModalSlideOut() {
            _super.apply(this, arguments);
        }
        ModalSlideOut.prototype.init = function () {
            _super.prototype.init.call(this);
            var ele = this.leavingView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapperEle = ele.querySelector('.modal-wrapper');
            var wrapperEleRect = wrapperEle.getBoundingClientRect();
            var wrapper = new animation_1.Animation(wrapperEle);
            var screenDimensions = dom_1.windowDimensions();
            wrapper.fromTo('translateY', '0px', (screenDimensions.height - wrapperEleRect.top) + "px");
            backdrop.fromTo('opacity', 0.4, 0.0);
            this
                .element(this.leavingView.pageRef())
                .easing('ease-out')
                .duration(250)
                .add(backdrop)
                .add(wrapper);
        };
        return ModalSlideOut;
    }(page_transition_1.PageTransition));
    exports.ModalSlideOut = ModalSlideOut;
    var ModalMDSlideIn = (function (_super) {
        __extends(ModalMDSlideIn, _super);
        function ModalMDSlideIn() {
            _super.apply(this, arguments);
        }
        ModalMDSlideIn.prototype.init = function () {
            _super.prototype.init.call(this);
            var ele = this.enteringView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.modal-wrapper'));
            backdrop.fromTo('opacity', 0.01, 0.4);
            wrapper.fromTo('translateY', '40px', '0px');
            wrapper.fromTo('opacity', 0.01, 1);
            var DURATION = 280;
            var EASING = 'cubic-bezier(0.36,0.66,0.04,1)';
            this.element(this.enteringView.pageRef()).easing(EASING).duration(DURATION)
                .add(backdrop)
                .add(wrapper);
        };
        return ModalMDSlideIn;
    }(page_transition_1.PageTransition));
    exports.ModalMDSlideIn = ModalMDSlideIn;
    var ModalMDSlideOut = (function (_super) {
        __extends(ModalMDSlideOut, _super);
        function ModalMDSlideOut() {
            _super.apply(this, arguments);
        }
        ModalMDSlideOut.prototype.init = function () {
            _super.prototype.init.call(this);
            var ele = this.leavingView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.modal-wrapper'));
            backdrop.fromTo('opacity', 0.4, 0.0);
            wrapper.fromTo('translateY', '0px', '40px');
            wrapper.fromTo('opacity', 0.99, 0);
            this
                .element(this.leavingView.pageRef())
                .duration(200)
                .easing('cubic-bezier(0.47,0,0.745,0.715)')
                .add(wrapper)
                .add(backdrop);
        };
        return ModalMDSlideOut;
    }(page_transition_1.PageTransition));
    exports.ModalMDSlideOut = ModalMDSlideOut;
});
//# sourceMappingURL=modal-transitions.js.map