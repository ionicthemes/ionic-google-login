import { Directive, EventEmitter, Host, Input, Output, NgZone } from '@angular/core';
import { Content } from '../content/content';
import { CSS, pointerCoord } from '../../util/dom';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
import { UIEventManager } from '../../util/ui-event-manager';
export var Refresher = (function () {
    function Refresher(_content, _zone, gestureCtrl) {
        this._content = _content;
        this._zone = _zone;
        this._appliedStyles = false;
        this._lastCheck = 0;
        this._isEnabled = true;
        this._events = new UIEventManager(false);
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
        this.ionRefresh = new EventEmitter();
        this.ionPull = new EventEmitter();
        this.ionStart = new EventEmitter();
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
            this._isEnabled = isTrueProperty(val);
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
        var coord = pointerCoord(ev);
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
        var coord = pointerCoord(ev);
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
        content.setScrollElementStyle(CSS.transform, ((y > 0) ? 'translateY(' + y + 'px) translateZ(0px)' : 'translateZ(0px)'));
        content.setScrollElementStyle(CSS.transitionDuration, duration);
        content.setScrollElementStyle(CSS.transitionDelay, delay);
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
        { type: Directive, args: [{
                    selector: 'ion-refresher',
                    host: {
                        '[class.refresher-active]': 'state !== "inactive"',
                        '[style.top]': '_top'
                    }
                },] },
    ];
    Refresher.ctorParameters = [
        { type: Content, decorators: [{ type: Host },] },
        { type: NgZone, },
        { type: GestureController, },
    ];
    Refresher.propDecorators = {
        'pullMin': [{ type: Input },],
        'pullMax': [{ type: Input },],
        'closeDuration': [{ type: Input },],
        'snapbackDuration': [{ type: Input },],
        'enabled': [{ type: Input },],
        'ionRefresh': [{ type: Output },],
        'ionPull': [{ type: Output },],
        'ionStart': [{ type: Output },],
    };
    return Refresher;
}());
var STATE_INACTIVE = 'inactive';
var STATE_PULLING = 'pulling';
var STATE_READY = 'ready';
var STATE_REFRESHING = 'refreshing';
var STATE_CANCELLING = 'cancelling';
var STATE_COMPLETING = 'completing';
//# sourceMappingURL=refresher.js.map