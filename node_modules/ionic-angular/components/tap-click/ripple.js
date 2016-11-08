var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Activator } from './activator';
import { CSS, hasPointerMoved, pointerCoord, rafFrames } from '../../util/dom';
export var RippleActivator = (function (_super) {
    __extends(RippleActivator, _super);
    function RippleActivator(app, config) {
        _super.call(this, app, config);
    }
    RippleActivator.prototype.downAction = function (ev, activatableEle, startCoord) {
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
    };
    RippleActivator.prototype.upAction = function (ev, activatableEle, startCoord) {
        if (!hasPointerMoved(6, startCoord, pointerCoord(ev))) {
            var i = activatableEle.childElementCount;
            while (i--) {
                var rippleEle = activatableEle.children[i];
                if (rippleEle.classList.contains('button-effect')) {
                    this.startRippleEffect(rippleEle, activatableEle, startCoord);
                    break;
                }
            }
        }
        _super.prototype.upAction.call(this, ev, activatableEle, startCoord);
    };
    RippleActivator.prototype.startRippleEffect = function (rippleEle, activatableEle, startCoord) {
        var clientPointerX = (startCoord.x - rippleEle.$left);
        var clientPointerY = (startCoord.y - rippleEle.$top);
        var x = Math.max(Math.abs(rippleEle.$width - clientPointerX), clientPointerX) * 2;
        var y = Math.max(Math.abs(rippleEle.$height - clientPointerY), clientPointerY) * 2;
        var diameter = Math.min(Math.max(Math.hypot(x, y), 64), 240);
        if (activatableEle.hasAttribute('ion-item')) {
            diameter = Math.min(diameter, 140);
        }
        clientPointerX -= diameter / 2;
        clientPointerY -= diameter / 2;
        clientPointerX = Math.round(clientPointerX);
        clientPointerY = Math.round(clientPointerY);
        diameter = Math.round(diameter);
        rippleEle.style.opacity = '';
        rippleEle.style[CSS.transform] = "translate3d(" + clientPointerX + "px, " + clientPointerY + "px, 0px) scale(0.001)";
        rippleEle.style[CSS.transition] = '';
        var radius = Math.sqrt(rippleEle.$width + rippleEle.$height);
        var scaleTransitionDuration = Math.max(1600 * Math.sqrt(radius / TOUCH_DOWN_ACCEL) + 0.5, 260);
        var opacityTransitionDuration = Math.round(scaleTransitionDuration * 0.7);
        var opacityTransitionDelay = Math.round(scaleTransitionDuration - opacityTransitionDuration);
        scaleTransitionDuration = Math.round(scaleTransitionDuration);
        var transform = "translate3d(" + clientPointerX + "px, " + clientPointerY + "px, 0px) scale(1)";
        var transition = "transform " + scaleTransitionDuration + "ms,opacity " + opacityTransitionDuration + "ms " + opacityTransitionDelay + "ms";
        rafFrames(2, function () {
            rippleEle.style.width = rippleEle.style.height = diameter + 'px';
            rippleEle.style.opacity = '0';
            rippleEle.style[CSS.transform] = transform;
            rippleEle.style[CSS.transition] = transition;
        });
    };
    RippleActivator.prototype.deactivate = function () {
        var _this = this;
        this._queue = [];
        rafFrames(2, function () {
            for (var i = 0; i < _this._active.length; i++) {
                _this._active[i].classList.remove(_this._css);
            }
            _this._active = [];
        });
    };
    return RippleActivator;
}(Activator));
var TOUCH_DOWN_ACCEL = 300;
//# sourceMappingURL=ripple.js.map