import { nativeRaf } from './dom';
export var FakeDebouncer = (function () {
    function FakeDebouncer() {
    }
    FakeDebouncer.prototype.debounce = function (callback) {
        callback();
    };
    FakeDebouncer.prototype.cancel = function () { };
    return FakeDebouncer;
}());
export var TimeoutDebouncer = (function () {
    function TimeoutDebouncer(wait) {
        this.wait = wait;
        this.timer = null;
    }
    TimeoutDebouncer.prototype.debounce = function (callback) {
        this.callback = callback;
        this.schedule();
    };
    TimeoutDebouncer.prototype.schedule = function () {
        this.cancel();
        if (this.wait <= 0) {
            this.callback();
        }
        else {
            this.timer = setTimeout(this.callback, this.wait);
        }
    };
    TimeoutDebouncer.prototype.cancel = function () {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    };
    return TimeoutDebouncer;
}());
export var NativeRafDebouncer = (function () {
    function NativeRafDebouncer() {
        this.callback = null;
        this.ptr = null;
        this.fireFunc = this.fire.bind(this);
    }
    NativeRafDebouncer.prototype.debounce = function (callback) {
        if (this.callback === null) {
            this.callback = callback;
            this.ptr = nativeRaf(this.fireFunc);
        }
    };
    NativeRafDebouncer.prototype.fire = function () {
        this.callback();
        this.callback = null;
        this.ptr = null;
    };
    NativeRafDebouncer.prototype.cancel = function () {
        if (this.ptr !== null) {
            cancelAnimationFrame(this.ptr);
            this.ptr = null;
            this.callback = null;
        }
    };
    return NativeRafDebouncer;
}());
//# sourceMappingURL=debouncer.js.map