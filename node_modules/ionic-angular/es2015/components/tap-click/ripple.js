import { Activator } from './activator';
import { CSS, hasPointerMoved, pointerCoord, rafFrames } from '../../util/dom';
export class RippleActivator extends Activator {
    constructor(app, config) {
        super(app, config);
    }
    downAction(ev, activatableEle, startCoord) {
        if (this.disableActivated(ev)) {
            return;
        }
        this._queue.push(activatableEle);
        for (var i = 0; i < this._queue.length; i++) {
            var queuedEle = this._queue[i];
            if (queuedEle && queuedEle.parentNode) {
                this._active.push(queuedEle);
                queuedEle.classList.add(this._css);
                var j = queuedEle.childElementCount;
                while (j--) {
                    var rippleEle = queuedEle.children[j];
                    if (rippleEle.classList.contains('button-effect')) {
                        var clientRect = activatableEle.getBoundingClientRect();
                        rippleEle.$top = clientRect.top;
                        rippleEle.$left = clientRect.left;
                        rippleEle.$width = clientRect.width;
                        rippleEle.$height = clientRect.height;
                        break;
                    }
                }
            }
        }
        this._queue = [];
    }
    upAction(ev, activatableEle, startCoord) {
        if (!hasPointerMoved(6, startCoord, pointerCoord(ev))) {
            let i = activatableEle.childElementCount;
            while (i--) {
                var rippleEle = activatableEle.children[i];
                if (rippleEle.classList.contains('button-effect')) {
                    this.startRippleEffect(rippleEle, activatableEle, startCoord);
                    break;
                }
            }
        }
        super.upAction(ev, activatableEle, startCoord);
    }
    startRippleEffect(rippleEle, activatableEle, startCoord) {
        let clientPointerX = (startCoord.x - rippleEle.$left);
        let clientPointerY = (startCoord.y - rippleEle.$top);
        let x = Math.max(Math.abs(rippleEle.$width - clientPointerX), clientPointerX) * 2;
        let y = Math.max(Math.abs(rippleEle.$height - clientPointerY), clientPointerY) * 2;
        let diameter = Math.min(Math.max(Math.hypot(x, y), 64), 240);
        if (activatableEle.hasAttribute('ion-item')) {
            diameter = Math.min(diameter, 140);
        }
        clientPointerX -= diameter / 2;
        clientPointerY -= diameter / 2;
        clientPointerX = Math.round(clientPointerX);
        clientPointerY = Math.round(clientPointerY);
        diameter = Math.round(diameter);
        rippleEle.style.opacity = '';
        rippleEle.style[CSS.transform] = `translate3d(${clientPointerX}px, ${clientPointerY}px, 0px) scale(0.001)`;
        rippleEle.style[CSS.transition] = '';
        let radius = Math.sqrt(rippleEle.$width + rippleEle.$height);
        let scaleTransitionDuration = Math.max(1600 * Math.sqrt(radius / TOUCH_DOWN_ACCEL) + 0.5, 260);
        let opacityTransitionDuration = Math.round(scaleTransitionDuration * 0.7);
        let opacityTransitionDelay = Math.round(scaleTransitionDuration - opacityTransitionDuration);
        scaleTransitionDuration = Math.round(scaleTransitionDuration);
        let transform = `translate3d(${clientPointerX}px, ${clientPointerY}px, 0px) scale(1)`;
        let transition = `transform ${scaleTransitionDuration}ms,opacity ${opacityTransitionDuration}ms ${opacityTransitionDelay}ms`;
        rafFrames(2, () => {
            rippleEle.style.width = rippleEle.style.height = diameter + 'px';
            rippleEle.style.opacity = '0';
            rippleEle.style[CSS.transform] = transform;
            rippleEle.style[CSS.transition] = transition;
        });
    }
    deactivate() {
        this._queue = [];
        rafFrames(2, () => {
            for (var i = 0; i < this._active.length; i++) {
                this._active[i].classList.remove(this._css);
            }
            this._active = [];
        });
    }
}
const TOUCH_DOWN_ACCEL = 300;
//# sourceMappingURL=ripple.js.map