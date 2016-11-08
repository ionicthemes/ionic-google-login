import { Animation } from '../animations/animation';
export class Transition extends Animation {
    constructor(enteringView, leavingView, opts, raf) {
        super(null, opts, raf);
        this.enteringView = enteringView;
        this.leavingView = leavingView;
    }
    init() { }
    registerStart(trnsStart) {
        this._trnsStart = trnsStart;
    }
    isRoot() {
        return !this.parent;
    }
    start() {
        this._trnsStart && this._trnsStart();
        this._trnsStart = null;
    }
    destroy() {
        super.destroy();
        this.enteringView = this.leavingView = this._trnsStart = null;
    }
}
//# sourceMappingURL=transition.js.map