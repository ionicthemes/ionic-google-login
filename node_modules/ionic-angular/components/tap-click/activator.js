import { nativeTimeout, rafFrames } from '../../util/dom';
export var Activator = (function () {
    function Activator(app, config) {
        this.app = app;
        this._queue = [];
        this._active = [];
        this._css = config.get('activatedClass') || 'activated';
    }
    Activator.prototype.downAction = function (ev, activatableEle, startCoord) {
        var _this = this;
        if (this.disableActivated(ev)) {
            return;
        }
        this._queue.push(activatableEle);
        rafFrames(6, function () {
            var activatableEle;
            for (var i = 0; i < _this._queue.length; i++) {
                activatableEle = _this._queue[i];
                if (activatableEle && activatableEle.parentNode) {
                    _this._active.push(activatableEle);
                    activatableEle.classList.add(_this._css);
                }
            }
            _this._queue.length = 0;
        });
    };
    Activator.prototype.upAction = function (ev, activatableEle, startCoord) {
        var _this = this;
        rafFrames(CLEAR_STATE_DEFERS, function () {
            _this.clearState();
        });
    };
    Activator.prototype.clearState = function () {
        var _this = this;
        if (!this.app.isEnabled()) {
            nativeTimeout(function () {
                _this.clearState();
            }, 600);
        }
        else {
            this.deactivate();
        }
    };
    Activator.prototype.deactivate = function () {
        var _this = this;
        this._queue.length = 0;
        rafFrames(2, function () {
            for (var i = 0; i < _this._active.length; i++) {
                _this._active[i].classList.remove(_this._css);
            }
            _this._active = [];
        });
    };
    Activator.prototype.disableActivated = function (ev) {
        if (ev.defaultPrevented) {
            return true;
        }
        var targetEle = ev.target;
        for (var i = 0; i < 4; i++) {
            if (!targetEle) {
                break;
            }
            if (targetEle.hasAttribute('disable-activated')) {
                return true;
            }
            targetEle = targetEle.parentElement;
        }
        return false;
    };
    return Activator;
}());
var CLEAR_STATE_DEFERS = 5;
//# sourceMappingURL=activator.js.map