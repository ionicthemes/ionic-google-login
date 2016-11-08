import { nativeTimeout, rafFrames } from '../../util/dom';
export class Activator {
    constructor(app, config) {
        this.app = app;
        this._queue = [];
        this._active = [];
        this._css = config.get('activatedClass') || 'activated';
    }
    downAction(ev, activatableEle, startCoord) {
        if (this.disableActivated(ev)) {
            return;
        }
        this._queue.push(activatableEle);
        rafFrames(6, () => {
            let activatableEle;
            for (let i = 0; i < this._queue.length; i++) {
                activatableEle = this._queue[i];
                if (activatableEle && activatableEle.parentNode) {
                    this._active.push(activatableEle);
                    activatableEle.classList.add(this._css);
                }
            }
            this._queue.length = 0;
        });
    }
    upAction(ev, activatableEle, startCoord) {
        rafFrames(CLEAR_STATE_DEFERS, () => {
            this.clearState();
        });
    }
    clearState() {
        if (!this.app.isEnabled()) {
            nativeTimeout(() => {
                this.clearState();
            }, 600);
        }
        else {
            this.deactivate();
        }
    }
    deactivate() {
        this._queue.length = 0;
        rafFrames(2, () => {
            for (var i = 0; i < this._active.length; i++) {
                this._active[i].classList.remove(this._css);
            }
            this._active = [];
        });
    }
    disableActivated(ev) {
        if (ev.defaultPrevented) {
            return true;
        }
        let targetEle = ev.target;
        for (let i = 0; i < 4; i++) {
            if (!targetEle) {
                break;
            }
            if (targetEle.hasAttribute('disable-activated')) {
                return true;
            }
            targetEle = targetEle.parentElement;
        }
        return false;
    }
}
const CLEAR_STATE_DEFERS = 5;
//# sourceMappingURL=activator.js.map