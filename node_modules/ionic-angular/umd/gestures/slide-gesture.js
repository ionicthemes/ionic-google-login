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
        define(["require", "exports", './drag-gesture', '../util/util', '../util/dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var drag_gesture_1 = require('./drag-gesture');
    var util_1 = require('../util/util');
    var dom_1 = require('../util/dom');
    var SlideGesture = (function (_super) {
        __extends(SlideGesture, _super);
        function SlideGesture(element, opts) {
            if (opts === void 0) { opts = {}; }
            _super.call(this, element, opts);
            this.slide = null;
        }
        SlideGesture.prototype.getSlideBoundaries = function (slide, ev) {
            return {
                min: 0,
                max: this.getNativeElement().offsetWidth
            };
        };
        SlideGesture.prototype.getElementStartPos = function (slide, ev) {
            return 0;
        };
        SlideGesture.prototype.onDragStart = function (ev) {
            this.onSlideBeforeStart(ev);
            var coord = dom_1.pointerCoord(ev);
            var pos = coord[this.direction];
            this.slide = {
                min: 0,
                max: 0,
                pointerStartPos: pos,
                pos: pos,
                timestamp: Date.now(),
                elementStartPos: 0,
                started: true,
                delta: 0,
                distance: 0,
                velocity: 0,
            };
            var _a = this.getSlideBoundaries(this.slide, ev), min = _a.min, max = _a.max;
            this.slide.min = min;
            this.slide.max = max;
            this.slide.elementStartPos = this.getElementStartPos(this.slide, ev);
            this.onSlideStart(this.slide, ev);
        };
        SlideGesture.prototype.onDragMove = function (ev) {
            var slide = this.slide;
            var coord = dom_1.pointerCoord(ev);
            var newPos = coord[this.direction];
            var newTimestamp = Date.now();
            var velocity = (newPos - slide.pos) / (newTimestamp - slide.timestamp);
            slide.pos = newPos;
            slide.timestamp = newTimestamp;
            slide.distance = util_1.clamp(slide.min, newPos - slide.pointerStartPos + slide.elementStartPos, slide.max);
            slide.velocity = velocity;
            slide.delta = newPos - slide.pointerStartPos;
            this.onSlide(slide, ev);
            return true;
        };
        SlideGesture.prototype.onDragEnd = function (ev) {
            this.onSlideEnd(this.slide, ev);
            this.slide = null;
        };
        SlideGesture.prototype.onSlideBeforeStart = function (ev) { };
        SlideGesture.prototype.onSlideStart = function (slide, ev) { };
        SlideGesture.prototype.onSlide = function (slide, ev) { };
        SlideGesture.prototype.onSlideEnd = function (slide, ev) { };
        return SlideGesture;
    }(drag_gesture_1.PanGesture));
    exports.SlideGesture = SlideGesture;
});
//# sourceMappingURL=slide-gesture.js.map