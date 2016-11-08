var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { assign, swipeShouldReset } from '../util/util';
import { SlideEdgeGesture } from '../gestures/slide-edge-gesture';
import { NativeRafDebouncer } from '../util/debouncer';
export var SwipeBackGesture = (function (_super) {
    __extends(SwipeBackGesture, _super);
    function SwipeBackGesture(_nav, element, gestureCtlr, options) {
        _super.call(this, element, assign({
            direction: 'x',
            maxEdgeStart: 75,
            zone: false,
            threshold: 0,
            maxAngle: 40,
            debouncer: new NativeRafDebouncer(),
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
        var shouldComplete = !swipeShouldReset(isResetDirecction, isMovingFast, isInResetZone);
        this._nav.swipeBackEnd(shouldComplete, currentStepValue);
    };
    return SwipeBackGesture;
}(SlideEdgeGesture));
//# sourceMappingURL=swipe-back.js.map