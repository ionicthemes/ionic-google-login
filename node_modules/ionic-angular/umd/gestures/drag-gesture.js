(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '../util/util', './recognizers', '../util/ui-event-manager', '../util/dom', '../util/debouncer'], factory);
    }
})(function (require, exports) {
    "use strict";
    var util_1 = require('../util/util');
    var recognizers_1 = require('./recognizers');
    var ui_event_manager_1 = require('../util/ui-event-manager');
    var dom_1 = require('../util/dom');
    var debouncer_1 = require('../util/debouncer');
    var PanGesture = (function () {
        function PanGesture(element, opts) {
            if (opts === void 0) { opts = {}; }
            this.element = element;
            this.events = new ui_event_manager_1.UIEventManager(false);
            this.started = false;
            this.captured = false;
            this.isListening = false;
            util_1.defaults(opts, {
                threshold: 20,
                maxAngle: 40,
                direction: 'x',
                zone: true,
                capture: false,
            });
            this.debouncer = (opts.debouncer)
                ? opts.debouncer
                : new debouncer_1.FakeDebouncer();
            this.gestute = opts.gesture;
            this.direction = opts.direction;
            this.eventsConfig = {
                element: this.element,
                pointerDown: this.pointerDown.bind(this),
                pointerMove: this.pointerMove.bind(this),
                pointerUp: this.pointerUp.bind(this),
                zone: opts.zone,
                capture: opts.capture
            };
            this.detector = new recognizers_1.PanRecognizer(opts.direction, opts.threshold, opts.maxAngle);
        }
        PanGesture.prototype.listen = function () {
            if (this.isListening) {
                return;
            }
            this.pointerEvents = this.events.pointerEvents(this.eventsConfig);
            this.isListening = true;
        };
        PanGesture.prototype.unlisten = function () {
            if (!this.isListening) {
                return;
            }
            this.gestute && this.gestute.release();
            this.events.unlistenAll();
            this.isListening = false;
        };
        PanGesture.prototype.destroy = function () {
            this.gestute && this.gestute.destroy();
            this.gestute = null;
            this.unlisten();
            this.element = null;
        };
        PanGesture.prototype.pointerDown = function (ev) {
            if (this.started) {
                return;
            }
            if (!this.canStart(ev)) {
                return false;
            }
            if (this.gestute) {
                this.gestute.release();
                if (!this.gestute.start()) {
                    return false;
                }
            }
            var coord = dom_1.pointerCoord(ev);
            this.detector.start(coord);
            this.started = true;
            this.captured = false;
            return true;
        };
        PanGesture.prototype.pointerMove = function (ev) {
            var _this = this;
            this.debouncer.debounce(function () {
                if (!_this.started) {
                    return;
                }
                if (_this.captured) {
                    _this.onDragMove(ev);
                    return;
                }
                var coord = dom_1.pointerCoord(ev);
                if (_this.detector.detect(coord)) {
                    if (_this.detector.pan() !== 0 && _this.canCapture(ev) &&
                        (!_this.gestute || _this.gestute.capture())) {
                        _this.onDragStart(ev);
                        _this.captured = true;
                        return;
                    }
                    _this.started = false;
                    _this.captured = false;
                    _this.pointerEvents.stop();
                    _this.notCaptured(ev);
                }
            });
        };
        PanGesture.prototype.pointerUp = function (ev) {
            this.debouncer.cancel();
            if (!this.started) {
                return;
            }
            this.gestute && this.gestute.release();
            if (this.captured) {
                this.onDragEnd(ev);
            }
            else {
                this.notCaptured(ev);
            }
            this.captured = false;
            this.started = false;
        };
        PanGesture.prototype.getNativeElement = function () {
            return this.element;
        };
        PanGesture.prototype.canStart = function (ev) { return true; };
        PanGesture.prototype.canCapture = function (ev) { return true; };
        PanGesture.prototype.onDragStart = function (ev) { };
        PanGesture.prototype.onDragMove = function (ev) { };
        PanGesture.prototype.onDragEnd = function (ev) { };
        PanGesture.prototype.notCaptured = function (ev) { };
        return PanGesture;
    }());
    exports.PanGesture = PanGesture;
});
//# sourceMappingURL=drag-gesture.js.map