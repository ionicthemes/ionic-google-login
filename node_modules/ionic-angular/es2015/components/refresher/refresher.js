import { Directive, EventEmitter, Host, Input, Output, NgZone } from '@angular/core';
import { Content } from '../content/content';
import { CSS, pointerCoord } from '../../util/dom';
import { GestureController } from '../../gestures/gesture-controller';
import { isTrueProperty } from '../../util/util';
import { UIEventManager } from '../../util/ui-event-manager';
export class Refresher {
    constructor(_content, _zone, gestureCtrl) {
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
    get enabled() {
        return this._isEnabled;
    }
    set enabled(val) {
        this._isEnabled = isTrueProperty(val);
        this._setListeners(this._isEnabled);
    }
    _onStart(ev) {
        if (ev.touches && ev.touches.length > 1) {
            return false;
        }
        if (this.state !== STATE_INACTIVE) {
            return false;
        }
        let scrollHostScrollTop = this._content.getContentDimensions().scrollTop;
        if (scrollHostScrollTop > 0) {
            return false;
        }
        if (!this._gesture.canStart()) {
            return false;
        }
        let coord = pointerCoord(ev);
        (void 0);
        if (this._content.contentTop > 0) {
            let newTop = this._content.contentTop + 'px';
            if (this._top !== newTop) {
                this._top = newTop;
            }
        }
        this.startY = this.currentY = coord.y;
        this.progress = 0;
        this.state = STATE_INACTIVE;
        return true;
    }
    _onMove(ev) {
        if (ev.touches && ev.touches.length > 1) {
            return 1;
        }
        if (!this._gesture.canStart()) {
            return 0;
        }
        if (this.startY === null || this.state === STATE_REFRESHING || this.state === STATE_CANCELLING || this.state === STATE_COMPLETING) {
            return 2;
        }
        let now = Date.now();
        if (this._lastCheck + 16 > now) {
            return 3;
        }
        this._lastCheck = now;
        let coord = pointerCoord(ev);
        this.currentY = coord.y;
        this.deltaY = (coord.y - this.startY);
        if (this.deltaY <= 0) {
            this.progress = 0;
            if (this.state !== STATE_INACTIVE) {
                this._zone.run(() => {
                    this.state = STATE_INACTIVE;
                });
            }
            if (this._appliedStyles) {
                this._setCss(0, '', false, '');
                return 5;
            }
            return 6;
        }
        if (this.state === STATE_INACTIVE) {
            let scrollHostScrollTop = this._content.getContentDimensions().scrollTop;
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
        this._zone.run(() => {
            this._onMoveInZone();
        });
    }
    _onMoveInZone() {
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
    }
    _onEnd() {
        if (this.state === STATE_READY) {
            this._zone.run(() => {
                this._beginRefresh();
            });
        }
        else if (this.state === STATE_PULLING) {
            this._zone.run(() => {
                this.cancel();
            });
        }
        this.startY = null;
    }
    _beginRefresh() {
        this.state = STATE_REFRESHING;
        this._setCss(this.pullMin, (this.snapbackDuration + 'ms'), true, '');
        this.ionRefresh.emit(this);
    }
    complete() {
        this._close(STATE_COMPLETING, '120ms');
    }
    cancel() {
        this._close(STATE_CANCELLING, '');
    }
    _close(state, delay) {
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
    }
    _setCss(y, duration, overflowVisible, delay) {
        this._appliedStyles = (y > 0);
        var content = this._content;
        content.setScrollElementStyle(CSS.transform, ((y > 0) ? 'translateY(' + y + 'px) translateZ(0px)' : 'translateZ(0px)'));
        content.setScrollElementStyle(CSS.transitionDuration, duration);
        content.setScrollElementStyle(CSS.transitionDelay, delay);
        content.setScrollElementStyle('overflow', (overflowVisible ? 'hidden' : ''));
    }
    _setListeners(shouldListen) {
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
    }
    ngOnInit() {
        this._setListeners(this._isEnabled);
    }
    ngOnDestroy() {
        this._gesture.destroy();
        this._setListeners(false);
    }
}
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
const STATE_INACTIVE = 'inactive';
const STATE_PULLING = 'pulling';
const STATE_READY = 'ready';
const STATE_REFRESHING = 'refreshing';
const STATE_CANCELLING = 'cancelling';
const STATE_COMPLETING = 'completing';
//# sourceMappingURL=refresher.js.map