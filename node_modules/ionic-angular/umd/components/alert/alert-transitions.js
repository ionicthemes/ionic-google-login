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
    var AlertPopIn = (function (_super) {
        __extends(AlertPopIn, _super);
        function AlertPopIn() {
            _super.apply(this, arguments);
        }
        AlertPopIn.prototype.init = function () {
            var ele = this.enteringView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
            wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
            backdrop.fromTo('opacity', 0.01, 0.3);
            this
                .easing('ease-in-out')
                .duration(200)
                .add(backdrop)
                .add(wrapper);
        };
        return AlertPopIn;
    }(transition_1.Transition));
    exports.AlertPopIn = AlertPopIn;
    var AlertPopOut = (function (_super) {
        __extends(AlertPopOut, _super);
        function AlertPopOut() {
            _super.apply(this, arguments);
        }
        AlertPopOut.prototype.init = function () {
            var ele = this.leavingView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
            wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
            backdrop.fromTo('opacity', 0.3, 0);
            this
                .easing('ease-in-out')
                .duration(200)
                .add(backdrop)
                .add(wrapper);
        };
        return AlertPopOut;
    }(transition_1.Transition));
    exports.AlertPopOut = AlertPopOut;
    var AlertMdPopIn = (function (_super) {
        __extends(AlertMdPopIn, _super);
        function AlertMdPopIn() {
            _super.apply(this, arguments);
        }
        AlertMdPopIn.prototype.init = function () {
            var ele = this.enteringView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
            wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.1, 1);
            backdrop.fromTo('opacity', 0.01, 0.5);
            this
                .easing('ease-in-out')
                .duration(200)
                .add(backdrop)
                .add(wrapper);
        };
        return AlertMdPopIn;
    }(transition_1.Transition));
    exports.AlertMdPopIn = AlertMdPopIn;
    var AlertMdPopOut = (function (_super) {
        __extends(AlertMdPopOut, _super);
        function AlertMdPopOut() {
            _super.apply(this, arguments);
        }
        AlertMdPopOut.prototype.init = function () {
            var ele = this.leavingView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
            wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 0.9);
            backdrop.fromTo('opacity', 0.5, 0);
            this
                .easing('ease-in-out')
                .duration(200)
                .add(backdrop)
                .add(wrapper);
        };
        return AlertMdPopOut;
    }(transition_1.Transition));
    exports.AlertMdPopOut = AlertMdPopOut;
    var AlertWpPopIn = (function (_super) {
        __extends(AlertWpPopIn, _super);
        function AlertWpPopIn() {
            _super.apply(this, arguments);
        }
        AlertWpPopIn.prototype.init = function () {
            var ele = this.enteringView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
            wrapper.fromTo('opacity', 0.01, 1).fromTo('scale', 1.3, 1);
            backdrop.fromTo('opacity', 0.01, 0.5);
            this
                .easing('cubic-bezier(0,0,0.05,1)')
                .duration(200)
                .add(backdrop)
                .add(wrapper);
        };
        return AlertWpPopIn;
    }(transition_1.Transition));
    exports.AlertWpPopIn = AlertWpPopIn;
    var AlertWpPopOut = (function (_super) {
        __extends(AlertWpPopOut, _super);
        function AlertWpPopOut() {
            _super.apply(this, arguments);
        }
        AlertWpPopOut.prototype.init = function () {
            var ele = this.leavingView.pageRef().nativeElement;
            var backdrop = new animation_1.Animation(ele.querySelector('ion-backdrop'));
            var wrapper = new animation_1.Animation(ele.querySelector('.alert-wrapper'));
            wrapper.fromTo('opacity', 0.99, 0).fromTo('scale', 1, 1.3);
            backdrop.fromTo('opacity', 0.5, 0);
            this
                .easing('ease-out')
                .duration(150)
                .add(backdrop)
                .add(wrapper);
        };
        return AlertWpPopOut;
    }(transition_1.Transition));
    exports.AlertWpPopOut = AlertWpPopOut;
});
//# sourceMappingURL=alert-transitions.js.map