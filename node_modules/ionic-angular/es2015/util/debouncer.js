import { nativeRaf } from './dom';
export class FakeDebouncer {
    debounce(callback) {
        callback();
    }
    cancel() { }
}
export class TimeoutDebouncer {
    constructor(wait) {
        this.wait = wait;
        this.timer = null;
    }
    debounce(callback) {
        this.callback = callback;
        this.schedule();
    }
    schedule() {
        this.cancel();
        if (this.wait <= 0) {
            this.callback();
        }
        else {
            this.timer = setTimeout(this.callback, this.wait);
        }
    }
    cancel() {
        if (this.timer) {
            clearTimeout(this.timer);
            this.timer = null;
        }
    }
}
export class NativeRafDebouncer {
    constructor() {
        this.callback = null;
        this.ptr = null;
        this.fireFunc = this.fire.bind(this);
    }
    debounce(callback) {
        if (this.callback === null) {
            this.callback = callback;
            this.ptr = nativeRaf(this.fireFunc);
        }
    }
    fire() {
        this.callback();
        this.callback = null;
        this.ptr = null;
    }
    cancel() {
        if (this.ptr !== null) {
            cancelAnimationFrame(this.ptr);
            this.ptr = null;
            this.callback = null;
        }
    }
}
//# sourceMappingURL=debouncer.js.map