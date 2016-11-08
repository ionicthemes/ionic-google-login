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
    var PickerSlideIn = (function (_super) {
        __extends(PickerSlideIn, _super);
        function PickerSlideIn() {
            _super.apply(this, arguments);
        }
        PickerSlideIn.prototype.init = function () {
            var ele = this.enteringView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.picker-wrapper'));
            backdrop.fromTo('opacity', 0.01, 0.26);
            wrapper.fromTo('translateY', '100%', '0%');
            this.easing('cubic-bezier(.36,.66,.04,1)').duration(400).add(backdrop).add(wrapper);
        };
        return PickerSlideIn;
    }(transition_1.Transition));
    exports.PickerSlideIn = PickerSlideIn;
    var PickerSlideOut = (function (_super) {
        __extends(PickerSlideOut, _super);
        function PickerSlideOut() {
            _super.apply(this, arguments);
        }
        PickerSlideOut.prototype.init = function () {
            var ele = this.leavingView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.picker-wrapper'));
            backdrop.fromTo('opacity', 0.26, 0);
            wrapper.fromTo('translateY', '0%', '100%');
            this.easing('cubic-bezier(.36,.66,.04,1)').duration(450).add(backdrop).add(wrapper);
        };
        return PickerSlideOut;
    }(transition_1.Transition));
    exports.PickerSlideOut = PickerSlideOut;
});
//# sourceMappingURL=picker-transitions.js.map