import { EventEmitter, Output } from '@angular/core';
import { isPresent, assign } from '../util/util';
import { NavParams } from './nav-params';
export class ViewController {
    constructor(component, data, rootCssClass = DEFAULT_CSS_CLASS) {
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
    init(componentRef) {
        this._cmp = componentRef;
        this.instance = this.instance || componentRef.instance;
        this._detached = false;
    }
    _setNav(navCtrl) {
        this._nav = navCtrl;
    }
    _setInstance(instance) {
        this.instance = instance;
    }
    subscribe(generatorOrNext) {
        return this._emitter.subscribe(generatorOrNext);
    }
    emit(data) {
        this._emitter.emit(data);
    }
    onDidDismiss(callback) {
        this._onDidDismiss = callback;
    }
    onWillDismiss(callback) {
        this._onWillDismiss = callback;
    }
    dismiss(data, role, navOptions = {}) {
        if (!this._nav) {
            return Promise.resolve(false);
        }
        let options = assign({}, this._leavingOpts, navOptions);
        this._onWillDismiss && this._onWillDismiss(data, role);
        return this._nav.remove(this._nav.indexOf(this), 1, options).then(() => {
            this._onDidDismiss && this._onDidDismiss(data, role);
            this._onDidDismiss = null;
            return data;
        });
    }
    getNav() {
        return this._nav;
    }
    getTransitionName(direction) {
        return this._nav && this._nav.config.get('pageTransition');
    }
    getNavParams() {
        return new NavParams(this.data);
    }
    setLeavingOpts(opts) {
        this._leavingOpts = opts;
    }
    enableBack() {
        if (this._nav) {
            let previousItem = this._nav.getPrevious(this);
            return !!(previousItem);
        }
        return false;
    }
    get name() {
        return this.component ? this.component.name : '';
    }
    get index() {
        return (this._nav ? this._nav.indexOf(this) : -1);
    }
    isFirst() {
        return (this._nav ? this._nav.first() === this : false);
    }
    isLast() {
        return (this._nav ? this._nav.last() === this : false);
    }
    _domShow(shouldShow, renderer) {
        if (this._cmp) {
            if (shouldShow === this._isHidden) {
                this._isHidden = !shouldShow;
                let value = (shouldShow ? null : '');
                renderer.setElementAttribute(this.pageRef().nativeElement, 'hidden', value);
            }
        }
    }
    _setZIndex(zIndex, renderer) {
        if (zIndex !== this._zIndex) {
            this._zIndex = zIndex;
            const pageRef = this.pageRef();
            if (pageRef) {
                renderer.setElementStyle(pageRef.nativeElement, 'z-index', zIndex);
            }
        }
    }
    pageRef() {
        return this._cmp && this._cmp.location;
    }
    _setContent(directive) {
        this._cntDir = directive;
    }
    getContent() {
        return this._cntDir;
    }
    _setContentRef(elementRef) {
        this._cntRef = elementRef;
    }
    contentRef() {
        return this._cntRef;
    }
    _setIONContent(content) {
        this._setContent(content);
        this._ionCntDir = content;
    }
    getIONContent() {
        return this._ionCntDir;
    }
    _setIONContentRef(elementRef) {
        this._setContentRef(elementRef);
        this._ionCntRef = elementRef;
    }
    getIONContentRef() {
        return this._ionCntRef;
    }
    _setHeader(directive) {
        this._hdrDir = directive;
    }
    getHeader() {
        return this._hdrDir;
    }
    _setFooter(directive) {
        this._ftrDir = directive;
    }
    getFooter() {
        return this._ftrDir;
    }
    _setNavbar(directive) {
        this._nb = directive;
    }
    getNavbar() {
        return this._nb;
    }
    hasNavbar() {
        return !!this._nb;
    }
    setBackButtonText(val) {
        this._nb && this._nb.setBackButtonText(val);
    }
    showBackButton(shouldShow) {
        if (this._nb) {
            this._nb.hideBackButton = !shouldShow;
        }
    }
    _preLoad() {
        this._lifecycle('PreLoad');
    }
    _willLoad() {
        this._lifecycle('WillLoad');
    }
    _didLoad() {
        this._lifecycle('DidLoad');
    }
    _willEnter() {
        if (this._detached && this._cmp) {
            this._cmp.changeDetectorRef.reattach();
            this._detached = false;
        }
        this.willEnter.emit(null);
        this._lifecycle('WillEnter');
    }
    _didEnter() {
        this._nb && this._nb.didEnter();
        this.didEnter.emit(null);
        this._lifecycle('DidEnter');
    }
    _willLeave() {
        this.willLeave.emit(null);
        this._lifecycle('WillLeave');
    }
    _didLeave() {
        this.didLeave.emit(null);
        this._lifecycle('DidLeave');
        if (!this._detached && this._cmp) {
            this._cmp.changeDetectorRef.detach();
            this._detached = true;
        }
    }
    _willUnload() {
        this.willUnload.emit(null);
        this._lifecycle('WillUnload');
    }
    _destroy(renderer) {
        if (this._cmp) {
            if (renderer) {
                const cmpEle = this._cmp.location.nativeElement;
                renderer.setElementAttribute(cmpEle, 'class', null);
                renderer.setElementAttribute(cmpEle, 'style', null);
            }
            this._cmp.destroy();
        }
        this._nav = this._cmp = this.instance = this._cntDir = this._cntRef = this._hdrDir = this._ftrDir = this._nb = this._onWillDismiss = null;
    }
    _lifecycleTest(lifecycle) {
        let instance = this.instance;
        let methodName = 'ionViewCan' + lifecycle;
        if (instance && instance[methodName]) {
            try {
                let result = instance[methodName]();
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
                console.error(`${this.name} ${methodName} error: ${e.message}`);
                return false;
            }
        }
        return true;
    }
    _lifecycle(lifecycle) {
        let instance = this.instance;
        let methodName = 'ionView' + lifecycle;
        if (instance && instance[methodName]) {
            try {
                instance[methodName]();
            }
            catch (e) {
                console.error(`${this.name} ${methodName} error: ${e.message}`);
            }
        }
    }
}
ViewController.propDecorators = {
    '_emitter': [{ type: Output },],
};
export function isViewController(viewCtrl) {
    return !!(viewCtrl && viewCtrl._didLoad && viewCtrl._willUnload);
}
const DEFAULT_CSS_CLASS = 'ion-page';
//# sourceMappingURL=view-controller.js.map