(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../content/content', '../../util/dom', '../../gestures/gesture-controller', '../../util/util', '../../util/ui-event-manager'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var content_1 = require('../content/content');
    var dom_1 = require('../../util/dom');
    var gesture_controller_1 = require('../../gestures/gesture-controller');
    var util_1 = require('../../util/util');
    var ui_event_manager_1 = require('../../util/ui-event-manager');
    var Refresher = (function () {
        function Refresher(_content, _zone, gestureCtrl) {
            this._content = _content;
            this._zone = _zone;
            this._appliedStyles = false;
            this._lastCheck = 0;
            this._isEnabled = true;
            this._events = new ui_event_manager_1.UIEventManager(false);
            this._top = '';
            this.state = STATE_INACTIVE;
            this.startY = null;
            this.currentY = null;
            this.deltaY = null;
            this.progress = 0;
            this.pullMin = 60;
            this.pullMax = this.pullMin + 60;
            this.closeDuration = 280;
            this.snapbackDuration = 280;
            this.ionRefresh = new core_1.EventEmitter();
            this.ionPull = new core_1.EventEmitter();
            this.ionStart = new core_1.EventEmitter();
            _content.setElementClass('has-refresher', true);
            this._gesture = gestureCtrl.create('refresher', {
                priority: 0,
            });
        }
        Object.defineProperty(Refresher.prototype, "enabled", {
            get: function () {
                return this._isEnabled;
            },
            set: function (val) {
                this._isEnabled = util_1.isTrueProperty(val);
                this._setListeners(this._isEnabled);
            },
            enumerable: true,
            configurable: true
        });
        Refresher.prototype._onStart = function (ev) {
            if (ev.touches && ev.touches.length > 1) {
                return false;
            }
            if (this.state !== STATE_INACTIVE) {
                return false;
            }
            var scrollHostScrollTop = this._content.getContentDimensions().scrollTop;
            if (scrollHostScrollTop > 0) {
                return false;
            }
            if (!this._gesture.canStart()) {
                return false;
            }
            var coord = dom_1.pointerCoord(ev);
            (void 0);
            if (this._content.contentTop > 0) {
                var newTop = this._content.contentTop + 'px';
                if (this._top !== newTop) {
                    this._top = newTop;
                }
            }
            this.startY = this.currentY = coord.y;
            this.progress = 0;
            this.state = STATE_INACTIVE;
            return true;
        };
        Refresher.prototype._onMove = function (ev) {
            var _this = this;
            if (ev.touches && ev.touches.length > 1) {
                return 1;
            }
            if (!this._gesture.canStart()) {
                return 0;
            }
            if (this.startY === null || this.state === STATE_REFRESHING || this.state === STATE_CANCELLING || this.state === STATE_COMPLETING) {
                return 2;
            }
            var now = Date.now();
            if (this._lastCheck + 16 > now) {
                return 3;
            }
            this._lastCheck = now;
            var coord = dom_1.pointerCoord(ev);
            this.currentY = coord.y;
            this.deltaY = (coord.y - this.startY);
            if (this.deltaY <= 0) {
                this.progress = 0;
                if (this.state !== STATE_INACTIVE) {
                    this._zone.run(function () {
                        _this.state = STATE_INACTIVE;
                    });
                }
                if (this._appliedStyles) {
                    this._setCss(0, '', false, '');
                    return 5;
                }
                return 6;
            }
            if (this.state === STATE_INACTIVE) {
                var scrollHostScrollTop = this._content.getContentDimensions().scrollTop;
                if (scrollHostScrollTop > 0) {
                    this.progress = 0;
                    this.startY = null;
                    return 7;
                }
                this.state = STATE_PULLING;
            }
            ev.preventDefault();
            this._setCss(this.deltaY, '0ms', true, '');
            if (!this.deltaY) {
                this.progress = 0;
                return 8;
            }
            this._zone.run(function () {
                _this._onMoveInZone();
            });
        };
        Refresher.prototype._onMoveInZone = function () {
            this.progress = (this.deltaY / this.pullMin);
            if (!this._didStart) {
                this._didStart = true;
                this.ionStart.emit(this);
            }
            this.ionPull.emit(this);
            if (this.deltaY < this.pullMin) {
                this.state = STATE_PULLING;
                return 2;
            }
            if (this.deltaY > this.pullMax) {
                this._beginRefresh();
                return 3;
            }
            this.state = STATE_READY;
            return 4;
        };
        Refresher.prototype._onEnd = function () {
            var _this = this;
            if (this.state === STATE_READY) {
                this._zone.run(function () {
                    _this._beginRefresh();
                });
            }
            else if (this.state === STATE_PULLING) {
                this._zone.run(function () {
                    _this.cancel();
                });
            }
            this.startY = null;
        };
        Refresher.prototype._beginRefresh = function () {
            this.state = STATE_REFRESHING;
            this._setCss(this.pullMin, (this.snapbackDuration + 'ms'), true, '');
            this.ionRefresh.emit(this);
        };
        Refresher.prototype.complete = function () {
            this._close(STATE_COMPLETING, '120ms');
        };
        Refresher.prototype.cancel = function () {
            this._close(STATE_CANCELLING, '');
        };
        Refresher.prototype._close = function (state, delay) {
            var timer;
            function close(ev) {
                if (ev) {
                    clearTimeout(timer);
                }
                this.state = STATE_INACTIVE;
                this.progress = 0;
                this._didStart = this.startY = this.currentY = this.deltaY = null;
                this._setCss(0, '0ms', false, '');
            }
            timer = setTimeout(close.bind(this), 600);
            this._content.onScrollElementTransitionEnd(close.bind(this));
            this.state = state;
            this._setCss(0, '', true, delay);
            if (this._pointerEvents) {
                this._pointerEvents.stop();
            }
        };
        Refresher.prototype._setCss = function (y, duration, overflowVisible, delay) {
            this._appliedStyles = (y > 0);
            var content = this._content;
            content.setScrollElementStyle(dom_1.CSS.transform, ((y > 0) ? 'translateY(' + y + 'px) translateZ(0px)' : 'translateZ(0px)'));
            content.setScrollElementStyle(dom_1.CSS.transitionDuration, duration);
            content.setScrollElementStyle(dom_1.CSS.transitionDelay, delay);
            content.setScrollElementStyle('overflow', (overflowVisible ? 'hidden' : ''));
        };
        Refresher.prototype._setListeners = function (shouldListen) {
            this._events.unlistenAll();
            this._pointerEvents = null;
            if (shouldListen) {
                this._pointerEvents = this._events.pointerEvents({
                    element: this._content.getScrollElement(),
                    pointerDown: this._onStart.bind(this),
                    pointerMove: this._onMove.bind(this),
                    pointerUp: this._onEnd.bind(this)
                });
            }
        };
        Refresher.prototype.ngOnInit = function () {
            this._setListeners(this._isEnabled);
        };
        Refresher.prototype.ngOnDestroy = function () {
            this._gesture.destroy();
            this._setListeners(false);
        };
        Refresher.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-refresher',
                        host: {
                            '[class.refresher-active]': 'state !== "inactive"',
                            '[style.top]': '_top'
                        }
                    },] },
        ];
        Refresher.ctorParameters = [
            { type: content_1.Content, decorators: [{ type: core_1.Host },] },
            { type: core_1.NgZone, },
            { type: gesture_controller_1.GestureController, },
        ];
        Refresher.propDecorators = {
            'pullMin': [{ type: core_1.Input },],
            'pullMax': [{ type: core_1.Input },],
            'closeDuration': [{ type: core_1.Input },],
            'snapbackDuration': [{ type: core_1.Input },],
            'enabled': [{ type: core_1.Input },],
            'ionRefresh': [{ type: core_1.Output },],
            'ionPull': [{ type: core_1.Output },],
            'ionStart': [{ type: core_1.Output },],
        };
        return Refresher;
    }());
    exports.Refresher = Refresher;
    var STATE_INACTIVE = 'inactive';
    var STATE_PULLING = 'pulling';
    var STATE_READY = 'ready';
    var STATE_REFRESHING = 'refreshing';
    var STATE_CANCELLING = 'cancelling';
    var STATE_COMPLETING = 'completing';
});
//# sourceMappingURL=refresher.js.map