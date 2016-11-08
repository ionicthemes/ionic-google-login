var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
import { ItemSlidingGesture } from '../item/item-sliding-gesture';
import { GestureController } from '../../gestures/gesture-controller';
export var List = (function (_super) {
    __extends(List, _super);
    function List(config, elementRef, renderer, _gestureCtrl) {
        _super.call(this, config, elementRef, renderer);
        this._gestureCtrl = _gestureCtrl;
        this._enableSliding = true;
        this._containsSlidingItems = false;
        this.mode = config.get('mode');
    }
    Object.defineProperty(List.prototype, "mode", {
        set: function (val) {
            this._setMode('list', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(List.prototype, "sliding", {
        get: function () {
            return this._enableSliding;
        },
        set: function (val) {
            this._enableSliding = isTrueProperty(val);
            this._updateSlidingState();
        },
        enumerable: true,
        configurable: true
    });
    List.prototype.containsSlidingItem = function (contains) {
        this._containsSlidingItems = contains;
        this._updateSlidingState();
    };
    List.prototype._updateSlidingState = function () {
        var shouldSlide = this._enableSliding && this._containsSlidingItems;
        if (!shouldSlide) {
            this._slidingGesture && this._slidingGesture.destroy();
            this._slidingGesture = null;
        }
        else if (!this._slidingGesture) {
            (void 0);
            this._slidingGesture = new ItemSlidingGesture(this);
            this._slidingGesture.listen();
        }
    };
    List.prototype.closeSlidingItems = function () {
        this._slidingGesture && this._slidingGesture.closeOpened();
    };
    List.prototype.destroy = function () {
        this._slidingGesture && this._slidingGesture.destroy();
    };
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
    return List;
}(Ion));
//# sourceMappingURL=list.js.map