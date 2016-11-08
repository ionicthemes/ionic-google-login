import { Directive, ElementRef, EventEmitter, Host, Input, NgZone, Output } from '@angular/core';
import { Content } from '../content/content';
export class InfiniteScroll {
    constructor(_content, _zone, _elementRef) {
        this._content = _content;
        this._zone = _zone;
        this._elementRef = _elementRef;
        this._lastCheck = 0;
        this._highestY = 0;
        this._thr = '15%';
        this._thrPx = 0;
        this._thrPc = 0.15;
        this._init = false;
        this.state = STATE_ENABLED;
        this.ionInfinite = new EventEmitter();
        _content.setElementClass('has-infinite-scroll', true);
    }
    get threshold() {
        return this._thr;
    }
    set threshold(val) {
        this._thr = val;
        if (val.indexOf('%') > -1) {
            this._thrPx = 0;
            this._thrPc = (parseFloat(val) / 100);
        }
        else {
            this._thrPx = parseFloat(val);
            this._thrPc = 0;
        }
    }
    set enabled(shouldEnable) {
        this.enable(shouldEnable);
    }
    _onScroll() {
        if (this.state === STATE_LOADING || this.state === STATE_DISABLED) {
            return 1;
        }
        let now = Date.now();
        if (this._lastCheck + 32 > now) {
            return 2;
        }
        this._lastCheck = now;
        let infiniteHeight = this._elementRef.nativeElement.scrollHeight;
        if (!infiniteHeight) {
            return 3;
        }
        let d = this._content.getContentDimensions();
        let reloadY = d.contentHeight;
        if (this._thrPc) {
            reloadY += (reloadY * this._thrPc);
        }
        else {
            reloadY += this._thrPx;
        }
        let distanceFromInfinite = ((d.scrollHeight - infiniteHeight) - d.scrollTop) - reloadY;
        if (distanceFromInfinite < 0) {
            this._zone.run(() => {
                if (this.state !== STATE_LOADING && this.state !== STATE_DISABLED) {
                    this.state = STATE_LOADING;
                    this.ionInfinite.emit(this);
                }
            });
            return 5;
        }
        return 6;
    }
    complete() {
        this.state = STATE_ENABLED;
    }
    enable(shouldEnable) {
        this.state = (shouldEnable ? STATE_ENABLED : STATE_DISABLED);
        this._setListeners(shouldEnable);
    }
    _setListeners(shouldListen) {
        if (this._init) {
            if (shouldListen) {
                if (!this._scLsn) {
                    this._zone.runOutsideAngular(() => {
                        this._scLsn = this._content.addScrollListener(this._onScroll.bind(this));
                    });
                }
            }
            else {
                this._scLsn && this._scLsn();
                this._scLsn = null;
            }
        }
    }
    ngAfterContentInit() {
        this._init = true;
        this._setListeners(this.state !== STATE_DISABLED);
    }
    ngOnDestroy() {
        this._setListeners(false);
    }
}
InfiniteScroll.decorators = [
    { type: Directive, args: [{
                selector: 'ion-infinite-scroll'
            },] },
];
InfiniteScroll.ctorParameters = [
    { type: Content, decorators: [{ type: Host },] },
    { type: NgZone, },
    { type: ElementRef, },
];
InfiniteScroll.propDecorators = {
    'threshold': [{ type: Input },],
    'enabled': [{ type: Input },],
    'ionInfinite': [{ type: Output },],
};
const STATE_ENABLED = 'enabled';
const STATE_DISABLED = 'disabled';
const STATE_LOADING = 'loading';
//# sourceMappingURL=infinite-scroll.js.map