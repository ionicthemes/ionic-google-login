import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { ItemSlidingGesture } from '../item/item-sliding-gesture';
import { GestureController } from '../../gestures/gesture-controller';
export class List extends Ion {
    constructor(config, elementRef, renderer, _gestureCtrl) {
        super(config, elementRef, renderer);
        this._gestureCtrl = _gestureCtrl;
        this._enableSliding = true;
        this._containsSlidingItems = false;
        this.mode = config.get('mode');
    }
    set mode(val) {
        this._setMode('list', val);
    }
    get sliding() {
        return this._enableSliding;
    }
    set sliding(val) {
        this._enableSliding = isTrueProperty(val);
        this._updateSlidingState();
    }
    containsSlidingItem(contains) {
        this._containsSlidingItems = contains;
        this._updateSlidingState();
    }
    _updateSlidingState() {
        let shouldSlide = this._enableSliding && this._containsSlidingItems;
        if (!shouldSlide) {
            this._slidingGesture && this._slidingGesture.destroy();
            this._slidingGesture = null;
        }
        else if (!this._slidingGesture) {
            (void 0);
            this._slidingGesture = new ItemSlidingGesture(this);
            this._slidingGesture.listen();
        }
    }
    closeSlidingItems() {
        this._slidingGesture && this._slidingGesture.closeOpened();
    }
    destroy() {
        this._slidingGesture && this._slidingGesture.destroy();
    }
}
List.decorators = [
    { type: Directive, args: [{
                selector: 'ion-list',
            },] },
];
List.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: GestureController, },
];
List.propDecorators = {
    'mode': [{ type: Input },],
    'sliding': [{ type: Input },],
};
//# sourceMappingURL=list.js.map