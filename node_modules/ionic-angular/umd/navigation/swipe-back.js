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
        define(["require", "exports", '../util/util', '../gestures/slide-edge-gesture', '../util/debouncer'], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require('../util/util');
    var slide_edge_gesture_1 = require('../gestures/slide-edge-gesture');
    var debouncer_1 = require('../util/debouncer');
    var SwipeBackGesture = (function (_super) {
        __extends(SwipeBackGesture, _super);
        function SwipeBackGesture(_nav, element, gestureCtlr, options) {
            _super.call(this, element, util_1.assign({
                direction: 'x',
                maxEdgeStart: 75,
                zone: false,
                threshold: 0,
                maxAngle: 40,
                debouncer: new debouncer_1.NativeRafDebouncer(),
                gesture: gestureCtlr.create('goback-swipe', {
                    priority: 20,
                    disableScroll: 1
                })
            }, options));
            this._nav = _nav;
        }
        SwipeBackGesture.prototype.canStart = function (ev) {
            return (this._nav.canSwipeBack() &&
                _super.prototype.canStart.call(this, ev));
        };
        SwipeBackGesture.prototype.onSlideBeforeStart = function (ev) {
            this._nav.swipeBackStart();
        };
        SwipeBackGesture.prototype.onSlide = function (slide, ev) {
            ev.preventDefault();
            ev.stopPropagation();
            var stepValue = (slide.distance / slide.max);
            this._nav.swipeBackProgress(stepValue);
        };
        SwipeBackGesture.prototype.onSlideEnd = function (slide, ev) {
            var currentStepValue = (slide.distance / slide.max);
            var isResetDirecction = slide.velocity < 0;
            var isMovingFast = Math.abs(slide.velocity) > 0.4;
            var isInResetZone = Math.abs(slide.delta) < Math.abs(slide.max) * 0.5;
            var shouldComplete = !util_1.swipeShouldReset(isResetDirecction, isMovingFast, isInResetZone);
            this._nav.swipeBackEnd(shouldComplete, currentStepValue);
        };
        return SwipeBackGesture;
    }(slide_edge_gesture_1.SlideEdgeGesture));
    exports.SwipeBackGesture = SwipeBackGesture;
});
//# sourceMappingURL=swipe-back.js.map