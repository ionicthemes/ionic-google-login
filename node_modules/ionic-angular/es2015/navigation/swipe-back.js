import { assign, swipeShouldReset } from '../util/util';
import { SlideEdgeGesture } from '../gestures/slide-edge-gesture';
import { NativeRafDebouncer } from '../util/debouncer';
export class SwipeBackGesture extends SlideEdgeGesture {
    constructor(_nav, element, gestureCtlr, options) {
        super(element, assign({
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
    canStart(ev) {
        return (this._nav.canSwipeBack() &&
            super.canStart(ev));
    }
    onSlideBeforeStart(ev) {
        this._nav.swipeBackStart();
    }
    onSlide(slide, ev) {
        ev.preventDefault();
        ev.stopPropagation();
        let stepValue = (slide.distance / slide.max);
        this._nav.swipeBackProgress(stepValue);
    }
    onSlideEnd(slide, ev) {
        const currentStepValue = (slide.distance / slide.max);
        const isResetDirecction = slide.velocity < 0;
        const isMovingFast = Math.abs(slide.velocity) > 0.4;
        const isInResetZone = Math.abs(slide.delta) < Math.abs(slide.max) * 0.5;
        const shouldComplete = !swipeShouldReset(isResetDirecction, isMovingFast, isInResetZone);
        this._nav.swipeBackEnd(shouldComplete, currentStepValue);
    }
}
//# sourceMappingURL=swipe-back.js.map