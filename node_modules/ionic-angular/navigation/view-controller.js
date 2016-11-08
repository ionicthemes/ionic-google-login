import { EventEmitter, Output } from '@angular/core';
import { isPresent, assign } from '../util/util';
import { NavParams } from './nav-params';
export var ViewController = (function () {
    function ViewController(component, data, rootCssClass) {
        if (rootCssClass === void 0) { rootCssClass = DEFAULT_CSS_CLASS; }
        this.component = component;
        this._isHidden = false;
        this.isOverlay = false;
        this._emitter = new EventEmitter();
        this.data = (data instanceof NavParams ? data.data : (isPresent(data) ? data : {}));
        this._cssClass = rootCssClass;
        this.willEnter = new EventEmitter();
        this.didEnter = new EventEmitter();
        this.willLeave = new EventEmitter();
        this.didLeave = new EventEmitter();
        this.willUnload = new EventEmitter();
    }
    ViewController.prototype.init = function (componentRef) {
        this._cmp = componentRef;
        this.instance = this.instance || componentRef.instance;
        this._detached = false;
    };
    ViewController.prototype._setNav = function (navCtrl) {
        this._nav = navCtrl;
    };
    ViewController.prototype._setInstance = function (instance) {
        this.instance = instance;
    };
    ViewController.prototype.subscribe = function (generatorOrNext) {
        return this._emitter.subscribe(generatorOrNext);
    };
    ViewController.prototype.emit = function (data) {
        this._emitter.emit(data);
    };
    ViewController.prototype.onDidDismiss = function (callback) {
        this._onDidDismiss = callback;
    };
    ViewController.prototype.onWillDismiss = function (callback) {
        this._onWillDismiss = callback;
    };
    ViewController.prototype.dismiss = function (data, role, navOptions) {
        var _this = this;
        if (navOptions === void 0) { navOptions = {}; }
        if (!this._nav) {
            return Promise.resolve(false);
        }
        var options = assign({}, this._leavingOpts, navOptions);
        this._onWillDismiss && this._onWillDismiss(data, role);
        return this._nav.remove(this._nav.indexOf(this), 1, options).then(function () {
            _this._onDidDismiss && _this._onDidDismiss(data, role);
            _this._onDidDismiss = null;
            return data;
        });
    };
    ViewController.prototype.getNav = function () {
        return this._nav;
    };
    ViewController.prototype.getTransitionName = function (direction) {
        return this._nav && this._nav.config.get('pageTransition');
    };
    ViewController.prototype.getNavParams = function () {
        return new NavParams(this.data);
    };
    ViewController.prototype.setLeavingOpts = function (opts) {
        this._leavingOpts = opts;
    };
    ViewController.prototype.enableBack = function () {
        if (this._nav) {
            var previousItem = this._nav.getPrevious(this);
            return !!(previousItem);
        }
        return false;
    };
    Object.defineProperty(ViewController.prototype, "name", {
        get: function () {
            return this.component ? this.component.name : '';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ViewController.prototype, "index", {
        get: function () {
            return (this._nav ? this._nav.indexOf(this) : -1);
        },
        enumerable: true,
        configurable: true
    });
    ViewController.prototype.isFirst = function () {
        return (this._nav ? this._nav.first() === this : false);
    };
    ViewController.prototype.isLast = function () {
        return (this._nav ? this._nav.last() === this : false);
    };
    ViewController.prototype._domShow = function (shouldShow, renderer) {
        if (this._cmp) {
            if (shouldShow === this._isHidden) {
                this._isHidden = !shouldShow;
                var value = (shouldShow ? null : '');
                renderer.setElementAttribute(this.pageRef().nativeElement, 'hidden', value);
            }
        }
    };
    ViewController.prototype._setZIndex = function (zIndex, renderer) {
        if (zIndex !== this._zIndex) {
            this._zIndex = zIndex;
            var pageRef = this.pageRef();
            if (pageRef) {
                renderer.setElementStyle(pageRef.nativeElement, 'z-index', zIndex);
            }
        }
    };
    ViewController.prototype.pageRef = function () {
        return this._cmp && this._cmp.location;
    };
    ViewController.prototype._setContent = function (directive) {
        this._cntDir = directive;
    };
    ViewController.prototype.getContent = function () {
        return this._cntDir;
    };
    ViewController.prototype._setContentRef = function (elementRef) {
        this._cntRef = elementRef;
    };
    ViewController.prototype.contentRef = function () {
        return this._cntRef;
    };
    ViewController.prototype._setIONContent = function (content) {
        this._setContent(content);
        this._ionCntDir = content;
    };
    ViewController.prototype.getIONContent = function () {
        return this._ionCntDir;
    };
    ViewController.prototype._setIONContentRef = function (elementRef) {
        this._setContentRef(elementRef);
        this._ionCntRef = elementRef;
    };
    ViewController.prototype.getIONContentRef = function () {
        return this._ionCntRef;
    };
    ViewController.prototype._setHeader = function (directive) {
        this._hdrDir = directive;
    };
    ViewController.prototype.getHeader = function () {
        return this._hdrDir;
    };
    ViewController.prototype._setFooter = function (directive) {
        this._ftrDir = directive;
    };
    ViewController.prototype.getFooter = function () {
        return this._ftrDir;
    };
    ViewController.prototype._setNavbar = function (directive) {
        this._nb = directive;
    };
    ViewController.prototype.getNavbar = function () {
        return this._nb;
    };
    ViewController.prototype.hasNavbar = function () {
        return !!this._nb;
    };
    ViewController.prototype.setBackButtonText = function (val) {
        this._nb && this._nb.setBackButtonText(val);
    };
    ViewController.prototype.showBackButton = function (shouldShow) {
        if (this._nb) {
            this._nb.hideBackButton = !shouldShow;
        }
    };
    ViewController.prototype._preLoad = function () {
        this._lifecycle('PreLoad');
    };
    ViewController.prototype._willLoad = function () {
        this._lifecycle('WillLoad');
    };
    ViewController.prototype._didLoad = function () {
        this._lifecycle('DidLoad');
    };
    ViewController.prototype._willEnter = function () {
        if (this._detached && this._cmp) {
            this._cmp.changeDetectorRef.reattach();
            this._detached = false;
        }
        this.willEnter.emit(null);
        this._lifecycle('WillEnter');
    };
    ViewController.prototype._didEnter = function () {
        this._nb && this._nb.didEnter();
        this.didEnter.emit(null);
        this._lifecycle('DidEnter');
    };
    ViewController.prototype._willLeave = function () {
        this.willLeave.emit(null);
        this._lifecycle('WillLeave');
    };
    ViewController.prototype._didLeave = function () {
        this.didLeave.emit(null);
        this._lifecycle('DidLeave');
        if (!this._detached && this._cmp) {
            this._cmp.changeDetectorRef.detach();
            this._detached = true;
        }
    };
    ViewController.prototype._willUnload = function () {
        this.willUnload.emit(null);
        this._lifecycle('WillUnload');
    };
    ViewController.prototype._destroy = function (renderer) {
        if (this._cmp) {
            if (renderer) {
                var cmpEle = this._cmp.location.nativeElement;
                renderer.setElementAttribute(cmpEle, 'class', null);
                renderer.setElementAttribute(cmpEle, 'style', null);
            }
            this._cmp.destroy();
        }
        this._nav = this._cmp = this.instance = this._cntDir = this._cntRef = this._hdrDir = this._ftrDir = this._nb = this._onWillDismiss = null;
    };
    ViewController.prototype._lifecycleTest = function (lifecycle) {
        var instance = this.instance;
        var methodName = 'ionViewCan' + lifecycle;
        if (instance && instance[methodName]) {
            try {
                var result = instance[methodName]();
                if (result === false) {
                    return false;
                }
                else if (result instanceof Promise) {
                    return result;
                }
                else {
                    return true;
                }
            }
            catch (e) {
                console.error(this.name + " " + methodName + " error: " + e.message);
                return false;
            }
        }
        return true;
    };
    ViewController.prototype._lifecycle = function (lifecycle) {
        var instance = this.instance;
        var methodName = 'ionView' + lifecycle;
        if (instance && instance[methodName]) {
            try {
                instance[methodName]();
            }
            catch (e) {
                console.error(this.name + " " + methodName + " error: " + e.message);
            }
        }
    };
    ViewController.propDecorators = {
        '_emitter': [{ type: Output },],
    };
    return ViewController;
}());
export function isViewController(viewCtrl) {
    return !!(viewCtrl && viewCtrl._didLoad && viewCtrl._willUnload);
}
var DEFAULT_CSS_CLASS = 'ion-page';
//# sourceMappingURL=view-controller.js.map