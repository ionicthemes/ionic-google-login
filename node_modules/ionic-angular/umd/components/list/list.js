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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion', '../../util/util', '../item/item-sliding-gesture', '../../gestures/gesture-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var item_sliding_gesture_1 = require('../item/item-sliding-gesture');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var List = (function (_super) {
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
                this._enableSliding = util_1.isTrueProperty(val);
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
                this._slidingGesture = new item_sliding_gesture_1.ItemSlidingGesture(this);
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
            { type: core_1.Directive, args: [{
                        selector: 'ion-list',
                    },] },
        ];
        List.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: gesture_controller_1.GestureController, },
        ];
        List.propDecorators = {
            'mode': [{ type: core_1.Input },],
            'sliding': [{ type: core_1.Input },],
        };
        return List;
    }(ion_1.Ion));
    exports.List = List;
});
//# sourceMappingURL=list.js.map