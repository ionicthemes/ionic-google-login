import { EventEmitter, ReflectiveInjector } from '@angular/core';
import { convertToView, convertToViews, DIRECTION_BACK, DIRECTION_FORWARD, INIT_ZINDEX, ViewState } from './nav-util';
import { setZIndex } from './nav-util';
import { isBlank, isNumber, isPresent } from '../util/util';
import { isViewController, ViewController } from './view-controller';
import { Ion } from '../components/ion';
import { NavController } from './nav-controller';
import { NavParams } from './nav-params';
import { SwipeBackGesture } from './swipe-back';
export class NavControllerBase extends Ion {
    constructor(parent, _app, config, _keyboard, elementRef, _zone, renderer, _cfr, _gestureCtrl, _trnsCtrl, _linker) {
        super(config, elementRef, renderer);
        this.parent = parent;
        this._app = _app;
        this.config = config;
        this._keyboard = _keyboard;
        this._zone = _zone;
        this._cfr = _cfr;
        this._gestureCtrl = _gestureCtrl;
        this._trnsCtrl = _trnsCtrl;
        this._linker = _linker;
        this._children = [];
        this._ids = -1;
        this._init = false;
        this._queue = [];
        this._trnsId = null;
        this._trnsTm = 0;
        this._views = [];
        this.viewDidLoad = new EventEmitter();
        this.viewWillEnter = new EventEmitter();
        this.viewDidEnter = new EventEmitter();
        this.viewWillLeave = new EventEmitter();
        this.viewDidLeave = new EventEmitter();
        this.viewWillUnload = new EventEmitter();
        this._sbEnabled = config.getBoolean('swipeBackEnabled');
        this._sbThreshold = config.getNumber('swipeBackThreshold', 40);
        this.id = 'n' + (++ctrlIds);
    }
    push(page, params, opts, done) {
        return this._queueTrns({
            insertStart: -1,
            insertViews: [convertToView(this._linker, page, params)],
            opts: opts,
        }, done);
    }
    insert(insertIndex, page, params, opts, done) {
        return this._queueTrns({
            insertStart: insertIndex,
            insertViews: [convertToView(this._linker, page, params)],
            opts: opts,
        }, done);
    }
    insertPages(insertIndex, insertPages, opts, done) {
        return this._queueTrns({
            insertStart: insertIndex,
            insertViews: convertToViews(this._linker, insertPages),
            opts: opts,
        }, done);
    }
    pop(opts, done) {
        return this._queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts,
        }, done);
    }
    popTo(indexOrViewCtrl, opts, done) {
        const startIndex = isViewController(indexOrViewCtrl) ? this.indexOf(indexOrViewCtrl) : isNumber(indexOrViewCtrl) ? indexOrViewCtrl : -1;
        return this._queueTrns({
            removeStart: startIndex + 1,
            removeCount: -1,
            opts: opts,
        }, done);
    }
    popToRoot(opts, done) {
        return this._queueTrns({
            removeStart: 1,
            removeCount: -1,
            opts: opts,
        }, done);
    }
    popAll() {
        let promises = [];
        for (var i = this._views.length - 1; i >= 0; i--) {
            promises.push(this.pop(null));
        }
        return Promise.all(promises);
    }
    remove(startIndex, removeCount = 1, opts, done) {
        return this._queueTrns({
            removeStart: startIndex,
            removeCount: removeCount,
            opts: opts,
        }, done);
    }
    setRoot(pageOrViewCtrl, params, opts, done) {
        let viewControllers = [convertToView(this._linker, pageOrViewCtrl, params)];
        return this._setPages(viewControllers, opts, done);
    }
    setPages(pages, opts, done) {
        let viewControllers = convertToViews(this._linker, pages);
        return this._setPages(viewControllers, opts, done);
    }
    _setPages(viewControllers, opts, done) {
        if (isBlank(opts)) {
            opts = {};
        }
        if (opts.animate !== true) {
            opts.animate = false;
        }
        return this._queueTrns({
            insertStart: 0,
            insertViews: viewControllers,
            removeStart: 0,
            removeCount: -1,
            opts: opts
        }, done);
    }
    _queueTrns(ti, done) {
        let promise;
        let resolve = done;
        let reject = done;
        if (done === undefined) {
            promise = new Promise((res, rej) => {
                resolve = res;
                reject = rej;
            });
        }
        ti.resolve = (hasCompleted, isAsync, enteringName, leavingName, direction) => {
            this._trnsId = null;
            resolve && resolve(hasCompleted, isAsync, enteringName, leavingName, direction);
            this.setTransitioning(false);
            this._sbCheck();
            this._nextTrns();
        };
        ti.reject = (rejectReason, trns) => {
            this._trnsId = null;
            this._queue.length = 0;
            while (trns) {
                if (trns.enteringView && (trns.enteringView._state !== ViewState.LOADED)) {
                    this._destroyView(trns.enteringView);
                }
                if (!trns.parent) {
                    break;
                }
            }
            if (trns) {
                this._trnsCtrl.destroy(trns.trnsId);
            }
            reject && reject(false, false, rejectReason);
            this.setTransitioning(false);
            this._sbCheck();
            this._nextTrns();
        };
        if (ti.insertViews) {
            ti.insertViews = ti.insertViews.filter(v => v !== null);
            if (ti.insertViews.length === 0) {
                ti.reject('invalid views to insert');
                return;
            }
        }
        else if (isPresent(ti.removeStart) && !this._views.length && !this._isPortal) {
            ti.reject('no views in the stack to be removed');
            return;
        }
        this._queue.push(ti);
        this._nextTrns();
        return promise;
    }
    _nextTrns() {
        if (this.isTransitioning()) {
            return false;
        }
        const ti = this._nextTI();
        if (!ti) {
            return false;
        }
        this.setTransitioning(true);
        const leavingView = this.getActive();
        const enteringView = this._getEnteringView(ti, leavingView);
        (void 0);
        if (enteringView && isBlank(enteringView._state)) {
            this._viewInit(enteringView);
        }
        let requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) && enteringView !== leavingView;
        if (requiresTransition) {
            return this._viewTest(enteringView, leavingView, ti);
        }
        else {
            this._postViewInit(enteringView, leavingView, ti, ti.resolve);
            return true;
        }
    }
    _nextTI() {
        const ti = this._queue.shift();
        if (!ti) {
            return null;
        }
        const viewsLength = this._views.length;
        if (isPresent(ti.removeStart)) {
            if (ti.removeStart < 0) {
                ti.removeStart = (viewsLength - 1);
            }
            if (ti.removeCount < 0) {
                ti.removeCount = (viewsLength - ti.removeStart);
            }
            ti.leavingRequiresTransition = ((ti.removeStart + ti.removeCount) === viewsLength);
        }
        if (ti.insertViews) {
            if (ti.insertStart < 0 || ti.insertStart > viewsLength) {
                ti.insertStart = viewsLength;
            }
            ti.enteringRequiresTransition = (ti.insertStart === viewsLength);
        }
        return ti;
    }
    _getEnteringView(ti, leavingView) {
        const insertViews = ti.insertViews;
        if (insertViews) {
            return insertViews[insertViews.length - 1];
        }
        const removeStart = ti.removeStart;
        if (isPresent(removeStart)) {
            let views = this._views;
            const removeEnd = removeStart + ti.removeCount;
            for (var i = views.length - 1; i >= 0; i--) {
                var view = views[i];
                if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
                    return view;
                }
            }
        }
        return null;
    }
    _postViewInit(enteringView, leavingView, ti, resolve) {
        const opts = ti.opts || {};
        const insertViews = ti.insertViews;
        const removeStart = ti.removeStart;
        let view;
        let destroyQueue = [];
        if (isPresent(removeStart)) {
            (void 0);
            (void 0);
            for (var i = 0; i < ti.removeCount; i++) {
                view = this._views[i + removeStart];
                if (view && view !== enteringView && view !== leavingView) {
                    destroyQueue.push(view);
                }
            }
            opts.direction = opts.direction || DIRECTION_BACK;
        }
        if (insertViews) {
            if (isPresent(opts.id)) {
                enteringView.id = opts.id;
            }
            for (var i = 0; i < insertViews.length; i++) {
                view = insertViews[i];
                this._insertViewAt(view, ti.insertStart + i);
            }
            if (ti.enteringRequiresTransition) {
                opts.direction = opts.direction || DIRECTION_FORWARD;
            }
        }
        this._zone.run(() => {
            for (view of destroyQueue) {
                this._willLeave(view);
                this._didLeave(view);
                this._willUnload(view);
            }
        });
        for (view of destroyQueue) {
            this._destroyView(view);
        }
        if (ti.enteringRequiresTransition || ti.leavingRequiresTransition && enteringView !== leavingView) {
            if (!opts.animation) {
                if (isPresent(ti.removeStart)) {
                    opts.animation = (leavingView || enteringView).getTransitionName(opts.direction);
                }
                else {
                    opts.animation = (enteringView || leavingView).getTransitionName(opts.direction);
                }
            }
            this._transition(enteringView, leavingView, opts, resolve);
        }
        else {
            resolve(true, false);
        }
    }
    _viewInit(enteringView) {
        const componentProviders = ReflectiveInjector.resolve([
            { provide: NavController, useValue: this },
            { provide: ViewController, useValue: enteringView },
            { provide: NavParams, useValue: enteringView.getNavParams() }
        ]);
        const componentFactory = this._cfr.resolveComponentFactory(enteringView.component);
        const childInjector = ReflectiveInjector.fromResolvedProviders(componentProviders, this._viewport.parentInjector);
        enteringView.init(componentFactory.create(childInjector, []));
        enteringView._state = ViewState.INITIALIZED;
        this._preLoad(enteringView);
    }
    _viewAttachToDOM(view, componentRef, viewport) {
        (void 0);
        this._willLoad(view);
        viewport.insert(componentRef.hostView, viewport.length);
        view._state = ViewState.PRE_RENDERED;
        if (view._cssClass) {
            var pageElement = componentRef.location.nativeElement;
            this._renderer.setElementClass(pageElement, view._cssClass, true);
        }
        componentRef.changeDetectorRef.detectChanges();
        this._zone.run(this._didLoad.bind(this, view));
    }
    _viewTest(enteringView, leavingView, ti) {
        const promises = [];
        const reject = ti.reject;
        const resolve = ti.resolve;
        if (leavingView) {
            const leavingTestResult = leavingView._lifecycleTest('Leave');
            if (leavingTestResult === false) {
                reject((leavingTestResult !== false ? leavingTestResult : `ionViewCanLeave rejected`));
                return false;
            }
            else if (leavingTestResult instanceof Promise) {
                promises.push(leavingTestResult);
            }
        }
        if (enteringView) {
            const enteringTestResult = enteringView._lifecycleTest('Enter');
            if (enteringTestResult === false) {
                reject((enteringTestResult !== false ? enteringTestResult : `ionViewCanEnter rejected`));
                return false;
            }
            else if (enteringTestResult instanceof Promise) {
                promises.push(enteringTestResult);
            }
        }
        if (promises.length) {
            Promise.all(promises)
                .then(() => this._postViewInit(enteringView, leavingView, ti, resolve))
                .catch(reject);
        }
        else {
            this._postViewInit(enteringView, leavingView, ti, resolve);
        }
        return true;
    }
    _transition(enteringView, leavingView, opts, resolve) {
        this._trnsId = this._trnsCtrl.getRootTrnsId(this);
        if (this._trnsId === null) {
            this._trnsId = this._trnsCtrl.nextId();
        }
        const animationOpts = {
            animation: opts.animation,
            direction: opts.direction,
            duration: (opts.animate === false ? 0 : opts.duration),
            easing: opts.easing,
            isRTL: this.config.platform.isRTL(),
            ev: opts.ev,
        };
        const transition = this._trnsCtrl.get(this._trnsId, enteringView, leavingView, animationOpts);
        this._sbTrns && this._sbTrns.destroy();
        this._sbTrns = null;
        if (transition.isRoot() && opts.progressAnimation) {
            this._sbTrns = transition;
        }
        transition.registerStart(() => {
            this._trnsStart(transition, enteringView, leavingView, opts, resolve);
            if (transition.parent) {
                transition.parent.start();
            }
        });
        if (enteringView && enteringView._state === ViewState.INITIALIZED) {
            this._viewAttachToDOM(enteringView, enteringView._cmp, this._viewport);
        }
        else {
            (void 0);
        }
        if (!transition.hasChildren) {
            transition.start();
        }
    }
    _trnsStart(transition, enteringView, leavingView, opts, resolve) {
        this._trnsId = null;
        setZIndex(this, enteringView, leavingView, opts.direction, this._renderer);
        enteringView && enteringView._domShow(true, this._renderer);
        leavingView && leavingView._domShow(true, this._renderer);
        transition.init();
        let isFirstPage = !this._init && this._views.length === 1;
        let shouldNotAnimate = isFirstPage && !this._isPortal;
        let canNotAnimate = this.config.get('animate') === false;
        if (shouldNotAnimate || canNotAnimate) {
            opts.animate = false;
        }
        if (opts.animate === false) {
            transition.duration(0);
        }
        transition.beforeAddRead(this._viewsWillLifecycles.bind(this, enteringView, leavingView));
        transition.onFinish(() => {
            this._zone.run(this._trnsFinish.bind(this, transition, opts, resolve));
        });
        const duration = transition.getDuration();
        this.setTransitioning(true, duration);
        if (transition.isRoot()) {
            if (duration > DISABLE_APP_MINIMUM_DURATION) {
                this._app.setEnabled(false, duration + ACTIVE_TRANSITION_OFFSET);
            }
            else {
                (void 0);
            }
            if (opts.progressAnimation) {
                transition.progressStart();
            }
            else {
                transition.play();
            }
        }
    }
    _viewsWillLifecycles(enteringView, leavingView) {
        if (enteringView || leavingView) {
            this._zone.run(() => {
                enteringView && this._willEnter(enteringView);
                leavingView && this._willLeave(leavingView);
            });
        }
    }
    _trnsFinish(transition, opts, resolve) {
        let enteringName;
        let leavingName;
        let hasCompleted = transition.hasCompleted;
        if (hasCompleted) {
            if (transition.enteringView) {
                enteringName = transition.enteringView.name;
                this._didEnter(transition.enteringView);
            }
            if (transition.leavingView) {
                leavingName = transition.leavingView.name;
                this._didLeave(transition.leavingView);
            }
            this._cleanup(transition.enteringView);
        }
        else {
            this._cleanup(transition.leavingView);
        }
        if (transition.isRoot()) {
            this._trnsCtrl.destroy(transition.trnsId);
            this._app.setEnabled(true);
            if (opts.updateUrl !== false) {
                this._linker.navChange(opts.direction);
            }
            if (opts.keyboardClose !== false) {
                this._keyboard.close();
            }
        }
        resolve(hasCompleted, true, enteringName, leavingName, opts.direction);
    }
    _insertViewAt(view, index) {
        var existingIndex = this._views.indexOf(view);
        if (existingIndex > -1) {
            this._views.splice(index, 0, this._views.splice(existingIndex, 1)[0]);
        }
        else {
            view._setNav(this);
            this._ids++;
            if (!view.id) {
                view.id = `${this.id}-${this._ids}`;
            }
            this._views.splice(index, 0, view);
        }
    }
    _removeView(view) {
        const views = this._views;
        const index = views.indexOf(view);
        (void 0);
        if (index > -1) {
            views.splice(index, 1);
        }
    }
    _destroyView(view) {
        view._destroy(this._renderer);
        this._removeView(view);
    }
    _cleanup(activeView) {
        const activeViewIndex = this.indexOf(activeView);
        let reorderZIndexes = false;
        for (var i = this._views.length - 1; i >= 0; i--) {
            var view = this._views[i];
            if (i > activeViewIndex) {
                this._willUnload(view);
                this._destroyView(view);
            }
            else if (i < activeViewIndex && !this._isPortal) {
                view._domShow(false, this._renderer);
            }
            if (view._zIndex <= 0) {
                reorderZIndexes = true;
            }
        }
        if (!this._isPortal) {
            if (reorderZIndexes) {
                this._views.forEach(view => {
                    view._setZIndex(view._zIndex + INIT_ZINDEX + 1, this._renderer);
                });
            }
        }
    }
    _preLoad(view) {
        (void 0);
        view._preLoad();
    }
    _willLoad(view) {
        (void 0);
        view._willLoad();
    }
    _didLoad(view) {
        (void 0);
        (void 0);
        view._didLoad();
        this.viewDidLoad.emit(view);
        this._app.viewDidLoad.emit(view);
    }
    _willEnter(view) {
        (void 0);
        (void 0);
        view._willEnter();
        this.viewWillEnter.emit(view);
        this._app.viewWillEnter.emit(view);
    }
    _didEnter(view) {
        (void 0);
        (void 0);
        view._didEnter();
        this.viewDidEnter.emit(view);
        this._app.viewDidEnter.emit(view);
    }
    _willLeave(view) {
        (void 0);
        (void 0);
        view._willLeave();
        this.viewWillLeave.emit(view);
        this._app.viewWillLeave.emit(view);
    }
    _didLeave(view) {
        (void 0);
        (void 0);
        view._didLeave();
        this.viewDidLeave.emit(view);
        this._app.viewDidLeave.emit(view);
    }
    _willUnload(view) {
        (void 0);
        (void 0);
        view._willUnload();
        this.viewWillUnload.emit(view);
        this._app.viewWillUnload.emit(view);
    }
    getActiveChildNav() {
        return this._children[this._children.length - 1];
    }
    registerChildNav(nav) {
        this._children.push(nav);
    }
    unregisterChildNav(nav) {
        const index = this._children.indexOf(nav);
        if (index > -1) {
            this._children.splice(index, 1);
        }
    }
    destroy() {
        for (var view of this._views) {
            view._willUnload();
            view._destroy(this._renderer);
        }
        this._views.length = 0;
        this._sbGesture && this._sbGesture.destroy();
        this._sbTrns && this._sbTrns.destroy();
        this._sbGesture = this._sbTrns = null;
        if (this.parent && this.parent.unregisterChildNav) {
            this.parent.unregisterChildNav(this);
        }
    }
    swipeBackStart() {
        if (this.isTransitioning() || this._queue.length > 0) {
            return;
        }
        const opts = {
            direction: DIRECTION_BACK,
            progressAnimation: true
        };
        this._queueTrns({
            removeStart: -1,
            removeCount: 1,
            opts: opts,
        }, null);
    }
    swipeBackProgress(stepValue) {
        if (this._sbTrns && this._sbGesture) {
            this._app.setEnabled(false, ACTIVE_TRANSITION_DEFAULT);
            this.setTransitioning(true, ACTIVE_TRANSITION_DEFAULT);
            this._sbTrns.progressStep(stepValue);
        }
    }
    swipeBackEnd(shouldComplete, currentStepValue) {
        if (this._sbTrns && this._sbGesture) {
            this._sbTrns.progressEnd(shouldComplete, currentStepValue, 300);
        }
    }
    _sbCheck() {
        if (!this._sbEnabled && this._isPortal) {
            return;
        }
        if (!this._sbGesture) {
            const opts = {
                edge: 'left',
                threshold: this._sbThreshold
            };
            this._sbGesture = new SwipeBackGesture(this, document.body, this._gestureCtrl, opts);
        }
        if (this.canSwipeBack()) {
            this._sbGesture.listen();
        }
        else {
            this._sbGesture.unlisten();
        }
    }
    canSwipeBack() {
        return (this._sbEnabled &&
            !this._children.length &&
            !this.isTransitioning() &&
            this._app.isEnabled() &&
            this.canGoBack());
    }
    canGoBack() {
        const activeView = this.getActive();
        return !!(activeView && activeView.enableBack()) || false;
    }
    isTransitioning() {
        if (this._trnsTm === 0) {
            return false;
        }
        return (this._trnsTm > Date.now());
    }
    setTransitioning(isTransitioning, durationPadding = ACTIVE_TRANSITION_DEFAULT) {
        this._trnsTm = (isTransitioning ? (Date.now() + durationPadding + ACTIVE_TRANSITION_OFFSET) : 0);
    }
    getActive() {
        return this._views[this._views.length - 1];
    }
    isActive(view) {
        return (view === this.getActive());
    }
    getByIndex(index) {
        return this._views[index];
    }
    getPrevious(view) {
        if (!view) {
            view = this.getActive();
        }
        return this._views[this.indexOf(view) - 1];
    }
    first() {
        return this._views[0];
    }
    last() {
        return this._views[this._views.length - 1];
    }
    indexOf(view) {
        return this._views.indexOf(view);
    }
    length() {
        return this._views.length;
    }
    getViews() {
        return this._views;
    }
    isSwipeBackEnabled() {
        return this._sbEnabled;
    }
    dismissPageChangeViews() {
        for (let view of this._views) {
            if (view.data && view.data.dismissOnPageChange) {
                view.dismiss();
            }
        }
    }
    setViewport(val) {
        this._viewport = val;
    }
}
let ctrlIds = -1;
const DISABLE_APP_MINIMUM_DURATION = 64;
const ACTIVE_TRANSITION_DEFAULT = 5000;
const ACTIVE_TRANSITION_OFFSET = 2000;
//# sourceMappingURL=nav-controller-base.js.map