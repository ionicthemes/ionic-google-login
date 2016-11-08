var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Animation } from '../animations/animation';
export var Transition = (function (_super) {
    __extends(Transition, _super);
    function Transition(enteringView, leavingView, opts, raf) {
        _super.call(this, null, opts, raf);
        this.enteringView = enteringView;
        this.leavingView = leavingView;
    }
    Transition.prototype.init = function () { };
    Transition.prototype.registerStart = function (trnsStart) {
        this._trnsStart = trnsStart;
    };
    Transition.prototype.isRoot = function () {
        return !this.parent;
    };
    Transition.prototype.start = function () {
        this._trnsStart && this._trnsStart();
        this._trnsStart = null;
    };
    Transition.prototype.destroy = function () {
        _super.prototype.destroy.call(this);
        this.enteringView = this.leavingView = this._trnsStart = null;
    };
    return Transition;
}(Animation));
//# sourceMappingURL=transition.js.map