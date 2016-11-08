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
        define(["require", "exports", '../animations/animation', './transition'], factory);
    }
})(function (require, exports) {
    "use strict";
    var animation_1 = require('../animations/animation');
    var transition_1 = require('./transition');
    var PageTransition = (function (_super) {
        __extends(PageTransition, _super);
        function PageTransition() {
            _super.apply(this, arguments);
        }
        PageTransition.prototype.init = function () {
            if (this.enteringView) {
                this.enteringPage = new animation_1.Animation(this.enteringView.pageRef());
                this.add(this.enteringPage.beforeAddClass('show-page'));
                this.beforeAddRead(this.readDimensions.bind(this));
                this.beforeAddWrite(this.writeDimensions.bind(this));
            }
        };
        PageTransition.prototype.readDimensions = function () {
            var content = this.enteringView.getIONContent();
            if (content) {
                content.readDimensions();
            }
        };
        PageTransition.prototype.writeDimensions = function () {
            var content = this.enteringView.getIONContent();
            if (content) {
                content.writeDimensions();
            }
        };
        PageTransition.prototype.destroy = function () {
            _super.prototype.destroy.call(this);
            this.enteringPage = null;
        };
        return PageTransition;
    }(transition_1.Transition));
    exports.PageTransition = PageTransition;
});
//# sourceMappingURL=page-transition.js.map