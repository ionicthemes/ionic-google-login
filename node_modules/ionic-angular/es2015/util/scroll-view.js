import { CSS, pointerCoord, nativeRaf, cancelRaf } from '../util/dom';
export class ScrollView {
    constructor(ele) {
        this._js = false;
        this._top = 0;
        this._el = ele;
    }
    getTop() {
        if (this._js) {
            return this._top;
        }
        return this._top = this._el.scrollTop;
    }
    setTop(top) {
        this._top = top;
        if (this._js) {
            this._el.style[CSS.transform] = `translate3d(0px,${top * -1}px,0px)`;
        }
        else {
            this._el.scrollTop = top;
        }
    }
    scrollTo(x, y, duration) {
        let self = this;
        if (!self._el) {
            return Promise.resolve();
        }
        x = x || 0;
        y = y || 0;
        let fromY = self._el.scrollTop;
        let fromX = self._el.scrollLeft;
        let maxAttempts = (duration / 16) + 100;
        return new Promise(resolve => {
            let startTime;
            let attempts = 0;
            function step() {
                attempts++;
                if (!self._el || !self.isPlaying || attempts > maxAttempts) {
                    self.isPlaying = false;
                    resolve();
                    return;
                }
                let time = Math.min(1, ((Date.now() - startTime) / duration));
                let easedT = (--time) * time * time + 1;
                if (fromY !== y) {
                    self.setTop((easedT * (y - fromY)) + fromY);
                }
                if (fromX !== x) {
                    self._el.scrollLeft = Math.floor((easedT * (x - fromX)) + fromX);
                }
                if (easedT < 1) {
                    nativeRaf(step);
                }
                else {
                    resolve();
                }
            }
            self.isPlaying = true;
            nativeRaf(() => {
                startTime = Date.now();
                nativeRaf(step);
            });
        });
    }
    scrollToTop(duration) {
        return this.scrollTo(0, 0, duration);
    }
    scrollToBottom(duration) {
        let y = 0;
        if (this._el) {
            y = this._el.scrollHeight - this._el.clientHeight;
        }
        return this.scrollTo(0, y, duration);
    }
    stop() {
        this.isPlaying = false;
    }
    jsScroll(onScrollCallback) {
        this._js = true;
        this._cb = onScrollCallback;
        this._pos = [];
        if (this._el) {
            this._el.addEventListener('touchstart', this._start.bind(this));
            this._el.addEventListener('touchmove', this._move.bind(this));
            this._el.addEventListener('touchend', this._end.bind(this));
            this._el.parentElement.classList.add('js-scroll');
        }
        return () => {
            if (this._el) {
                this._el.removeEventListener('touchstart', this._start.bind(this));
                this._el.removeEventListener('touchmove', this._move.bind(this));
                this._el.removeEventListener('touchend', this._end.bind(this));
                this._el.parentElement.classList.remove('js-scroll');
            }
        };
    }
    _start(ev) {
        this._velocity = 0;
        this._pos.length = 0;
        this._max = null;
        this._pos.push(pointerCoord(ev).y, Date.now());
    }
    _move(ev) {
        if (this._pos.length) {
            let y = pointerCoord(ev).y;
            this._setMax();
            this._top -= (y - this._pos[this._pos.length - 2]);
            this._top = Math.min(Math.max(this._top, 0), this._max);
            this._pos.push(y, Date.now());
            this._cb(this._top);
            this.setTop(this._top);
        }
    }
    _setMax() {
        if (!this._max) {
            this._max = (this._el.offsetHeight - this._el.parentElement.offsetHeight + this._el.parentElement.offsetTop);
        }
    }
    _end(ev) {
        let positions = this._pos;
        this._velocity = 0;
        cancelRaf(this._rafId);
        if (!positions.length)
            return;
        let y = pointerCoord(ev).y;
        positions.push(y, Date.now());
        let endPos = (positions.length - 1);
        let startPos = endPos;
        let timeRange = (Date.now() - 100);
        for (var i = endPos; i > 0 && positions[i] > timeRange; i -= 2) {
            startPos = i;
        }
        if (startPos !== endPos) {
            let timeOffset = (positions[endPos] - positions[startPos]);
            let movedTop = (positions[startPos - 1] - positions[endPos - 1]);
            this._velocity = ((movedTop / timeOffset) * FRAME_MS);
            if (Math.abs(this._velocity) > MIN_VELOCITY_START_DECELERATION) {
                this._setMax();
                this._rafId = nativeRaf(this._decelerate.bind(this));
            }
        }
        positions.length = 0;
    }
    _decelerate() {
        var self = this;
        if (self._velocity) {
            self._velocity *= DECELERATION_FRICTION;
            self._top = Math.min(Math.max(self._top + self._velocity, 0), self._max);
            self._cb(self._top);
            self.setTop(self._top);
            if (self._top > 0 && self._top < self._max && Math.abs(self._velocity) > MIN_VELOCITY_CONTINUE_DECELERATION) {
                self._rafId = nativeRaf(self._decelerate.bind(self));
            }
        }
    }
    destroy() {
        this._velocity = 0;
        this.stop();
        this._el = null;
    }
}
const MIN_VELOCITY_START_DECELERATION = 4;
const MIN_VELOCITY_CONTINUE_DECELERATION = 0.12;
const DECELERATION_FRICTION = 0.97;
const FRAME_MS = (1000 / 60);
//# sourceMappingURL=scroll-view.js.map