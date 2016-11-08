import { defaults, assign } from '../util/util';
import { Hammer, DIRECTION_HORIZONTAL, DIRECTION_VERTICAL } from './hammer';
export var Gesture = (function () {
    function Gesture(element, opts) {
        if (opts === void 0) { opts = {}; }
        this._callbacks = {};
        this.isListening = false;
        defaults(opts, {
            domEvents: true
        });
        this.element = element;
        this.direction = opts.direction || 'x';
        opts.direction = this.direction === 'x' ?
            DIRECTION_HORIZONTAL :
            DIRECTION_VERTICAL;
        this._options = opts;
    }
    Gesture.prototype.options = function (opts) {
        assign(this._options, opts);
    };
    Gesture.prototype.on = function (type, cb) {
        if (type === 'pinch' || type === 'rotate') {
            this._hammer.get('pinch').set({ enable: true });
        }
        this._hammer.on(type, cb);
        (this._callbacks[type] || (this._callbacks[type] = [])).push(cb);
    };
    Gesture.prototype.off = function (type, cb) {
        this._hammer.off(type, this._callbacks[type] ? cb : null);
    };
    Gesture.prototype.listen = function () {
        if (!this.isListening) {
            this._hammer = Hammer(this.element, this._options);
        }
        this.isListening = true;
    };
    Gesture.prototype.unlisten = function () {
        var eventType;
        var i;
        if (this._hammer && this.isListening) {
            for (eventType in this._callbacks) {
                for (i = 0; i < this._callbacks[eventType].length; i++) {
                    this._hammer.off(eventType, this._callbacks[eventType]);
                }
            }
            this._hammer.destroy();
        }
        this._callbacks = {};
        this._hammer = null;
        this.isListening = false;
    };
    Gesture.prototype.destroy = function () {
        this.unlisten();
        this.element = this._options = null;
    };
    return Gesture;
}());
//# sourceMappingURL=gesture.js.map