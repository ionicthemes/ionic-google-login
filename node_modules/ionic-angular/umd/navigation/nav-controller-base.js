var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', './nav-util', './nav-util', '../util/util', './view-controller', '../components/ion', './nav-controller', './nav-params', './swipe-back'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var nav_util_1 = require('./nav-util');
    var nav_util_2 = require('./nav-util');
    var util_1 = require('../util/util');
    var view_controller_1 = require('./view-controller');
    var ion_1 = require('../components/ion');
    var nav_controller_1 = require('./nav-controller');
    var nav_params_1 = require('./nav-params');
    var swipe_back_1 = require('./swipe-back');
    var NavControllerBase = (function (_super) {
        __extends(NavControllerBase, _super);
        function NavControllerBase(parent, _app, config, _keyboard, elementRef, _zone, renderer, _cfr, _gestureCtrl, _trnsCtrl, _linker) {
            _super.call(this, config, elementRef, renderer);
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
            this.viewDidLoad = new core_1.EventEmitter();
            this.viewWillEnter = new core_1.EventEmitter();
            this.viewDidEnter = new core_1.EventEmitter();
            this.viewWillLeave = new core_1.EventEmitter();
            this.viewDidLeave = new core_1.EventEmitter();
            this.viewWillUnload = new core_1.EventEmitter();
            this._sbEnabled = config.getBoolean('swipeBackEnabled');
            this._sbThreshold = config.getNumber('swipeBackThreshold', 40);
            this.id = 'n' + (++ctrlIds);
        }
        NavControllerBase.prototype.push = function (page, params, opts, done) {
            return this._queueTrns({
                insertStart: -1,
                insertViews: [nav_util_1.convertToView(this._linker, page, params)],
                opts: opts,
            }, done);
        };
        NavControllerBase.prototype.insert = function (insertIndex, page, params, opts, done) {
            return this._queueTrns({
                insertStart: insertIndex,
                insertViews: [nav_util_1.convertToView(this._linker, page, params)],
                opts: opts,
            }, done);
        };
        NavControllerBase.prototype.insertPages = function (insertIndex, insertPages, opts, done) {
            return this._queueTrns({
                insertStart: insertIndex,
                insertViews: nav_util_1.convertToViews(this._linker, insertPages),
                opts: opts,
            }, done);
        };
        NavControllerBase.prototype.pop = function (opts, done) {
            return this._queueTrns({
                removeStart: -1,
                removeCount: 1,
                opts: opts,
            }, done);
        };
        NavControllerBase.prototype.popTo = function (indexOrViewCtrl, opts, done) {
            var startIndex = view_controller_1.isViewController(indexOrViewCtrl) ? this.indexOf(indexOrViewCtrl) : util_1.isNumber(indexOrViewCtrl) ? indexOrViewCtrl : -1;
            return this._queueTrns({
                removeStart: startIndex + 1,
                removeCount: -1,
                opts: opts,
            }, done);
        };
        NavControllerBase.prototype.popToRoot = function (opts, done) {
            return this._queueTrns({
                removeStart: 1,
                removeCount: -1,
                opts: opts,
            }, done);
        };
        NavControllerBase.prototype.popAll = function () {
            var promises = [];
            for (var i = this._views.length - 1; i >= 0; i--) {
                promises.push(this.pop(null));
            }
            return Promise.all(promises);
        };
        NavControllerBase.prototype.remove = function (startIndex, removeCount, opts, done) {
            if (removeCount === void 0) { removeCount = 1; }
            return this._queueTrns({
                removeStart: startIndex,
                removeCount: removeCount,
                opts: opts,
            }, done);
        };
        NavControllerBase.prototype.setRoot = function (pageOrViewCtrl, params, opts, done) {
            var viewControllers = [nav_util_1.convertToView(this._linker, pageOrViewCtrl, params)];
            return this._setPages(viewControllers, opts, done);
        };
        NavControllerBase.prototype.setPages = function (pages, opts, done) {
            var viewControllers = nav_util_1.convertToViews(this._linker, pages);
            return this._setPages(viewControllers, opts, done);
        };
        NavControllerBase.prototype._setPages = function (viewControllers, opts, done) {
            if (util_1.isBlank(opts)) {
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
        };
        NavControllerBase.prototype._queueTrns = function (ti, done) {
            var _this = this;
            var promise;
            var resolve = done;
            var reject = done;
            if (done === undefined) {
                promise = new Promise(function (res, rej) {
                    resolve = res;
                    reject = rej;
                });
            }
            ti.resolve = function (hasCompleted, isAsync, enteringName, leavingName, direction) {
                _this._trnsId = null;
                resolve && resolve(hasCompleted, isAsync, enteringName, leavingName, direction);
                _this.setTransitioning(false);
                _this._sbCheck();
                _this._nextTrns();
            };
            ti.reject = function (rejectReason, trns) {
                _this._trnsId = null;
                _this._queue.length = 0;
                while (trns) {
                    if (trns.enteringView && (trns.enteringView._state !== nav_util_1.ViewState.LOADED)) {
                        _this._destroyView(trns.enteringView);
                    }
                    if (!trns.parent) {
                        break;
                    }
                }
                if (trns) {
                    _this._trnsCtrl.destroy(trns.trnsId);
                }
                reject && reject(false, false, rejectReason);
                _this.setTransitioning(false);
                _this._sbCheck();
                _this._nextTrns();
            };
            if (ti.insertViews) {
                ti.insertViews = ti.insertViews.filter(function (v) { return v !== null; });
                if (ti.insertViews.length === 0) {
                    ti.reject('invalid views to insert');
                    return;
                }
            }
            else if (util_1.isPresent(ti.removeStart) && !this._views.length && !this._isPortal) {
                ti.reject('no views in the stack to be removed');
                return;
            }
            this._queue.push(ti);
            this._nextTrns();
            return promise;
        };
        NavControllerBase.prototype._nextTrns = function () {
            if (this.isTransitioning()) {
                return false;
            }
            var ti = this._nextTI();
            if (!ti) {
                return false;
            }
            this.setTransitioning(true);
            var leavingView = this.getActive();
            var enteringView = this._getEnteringView(ti, leavingView);
            (void 0);
            if (enteringView && util_1.isBlank(enteringView._state)) {
                this._viewInit(enteringView);
            }
            var requiresTransition = (ti.enteringRequiresTransition || ti.leavingRequiresTransition) && enteringView !== leavingView;
            if (requiresTransition) {
                return this._viewTest(enteringView, leavingView, ti);
            }
            else {
                this._postViewInit(enteringView, leavingView, ti, ti.resolve);
                return true;
            }
        };
        NavControllerBase.prototype._nextTI = function () {
            var ti = this._queue.shift();
            if (!ti) {
                return null;
            }
            var viewsLength = this._views.length;
            if (util_1.isPresent(ti.removeStart)) {
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
        };
        NavControllerBase.prototype._getEnteringView = function (ti, leavingView) {
            var insertViews = ti.insertViews;
            if (insertViews) {
                return insertViews[insertViews.length - 1];
            }
            var removeStart = ti.removeStart;
            if (util_1.isPresent(removeStart)) {
                var views = this._views;
                var removeEnd = removeStart + ti.removeCount;
                for (var i = views.length - 1; i >= 0; i--) {
                    var view = views[i];
                    if ((i < removeStart || i >= removeEnd) && view !== leavingView) {
                        return view;
                    }
                }
            }
            return null;
        };
        NavControllerBase.prototype._postViewInit = function (enteringView, leavingView, ti, resolve) {
            var _this = this;
            var opts = ti.opts || {};
            var insertViews = ti.insertViews;
            var removeStart = ti.removeStart;
            var view;
            var destroyQueue = [];
            if (util_1.isPresent(removeStart)) {
                (void 0);
                (void 0);
                for (var i = 0; i < ti.removeCount; i++) {
                    view = this._views[i + removeStart];
                    if (view && view !== enteringView && view !== leavingView) {
                        destroyQueue.push(view);
                    }
                }
                opts.direction = opts.direction || nav_util_1.DIRECTION_BACK;
            }
            if (insertViews) {
                if (util_1.isPresent(opts.id)) {
                    enteringView.id = opts.id;
                }
                for (var i = 0; i < insertViews.length; i++) {
                    view = insertViews[i];
                    this._insertViewAt(view, ti.insertStart + i);
                }
                if (ti.enteringRequiresTransition) {
                    opts.direction = opts.direction || nav_util_1.DIRECTION_FORWARD;
                }
            }
            this._zone.run(function () {
                for (var _i = 0, destroyQueue_1 = destroyQueue; _i < destroyQueue_1.length; _i++) {
                    view = destroyQueue_1[_i];
                    _this._willLeave(view);
                    _this._didLeave(view);
                    _this._willUnload(view);
                }
            });
            for (var _i = 0, destroyQueue_2 = destroyQueue; _i < destroyQueue_2.length; _i++) {
                view = destroyQueue_2[_i];
                this._destroyView(view);
            }
            if (ti.enteringRequiresTransition || ti.leavingRequiresTransition && enteringView !== leavingView) {
                if (!opts.animation) {
                    if (util_1.isPresent(ti.removeStart)) {
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
        };
        NavControllerBase.prototype._viewInit = function (enteringView) {
            var componentProviders = core_1.ReflectiveInjector.resolve([
                { provide: nav_controller_1.NavController, useValue: this },
                { provide: view_controller_1.ViewController, useValue: enteringView },
                { provide: nav_params_1.NavParams, useValue: enteringView.getNavParams() }
            ]);
            var componentFactory = this._cfr.resolveComponentFactory(enteringView.component);
            var childInjector = core_1.ReflectiveInjector.fromResolvedProviders(componentProviders, this._viewport.parentInjector);
            enteringView.init(componentFactory.create(childInjector, []));
            enteringView._state = nav_util_1.ViewState.INITIALIZED;
            this._preLoad(enteringView);
        };
        NavControllerBase.prototype._viewAttachToDOM = function (view, componentRef, viewport) {
            (void 0);
            this._willLoad(view);
            viewport.insert(componentRef.hostView, viewport.length);
            view._state = nav_util_1.ViewState.PRE_RENDERED;
            if (view._cssClass) {
                var pageElement = componentRef.location.nativeElement;
                this._renderer.setElementClass(pageElement, view._cssClass, true);
            }
            componentRef.changeDetectorRef.detectChanges();
            this._zone.run(this._didLoad.bind(this, view));
        };
        NavControllerBase.prototype._viewTest = function (enteringView, leavingView, ti) {
            var _this = this;
            var promises = [];
            var reject = ti.reject;
            var resolve = ti.resolve;
            if (leavingView) {
                var leavingTestResult = leavingView._lifecycleTest('Leave');
                if (leavingTestResult === false) {
                    reject((leavingTestResult !== false ? leavingTestResult : "ionViewCanLeave rejected"));
                    return false;
                }
                else if (leavingTestResult instanceof Promise) {
                    promises.push(leavingTestResult);
                }
            }
            if (enteringView) {
                var enteringTestResult = enteringView._lifecycleTest('Enter');
                if (enteringTestResult === false) {
                    reject((enteringTestResult !== false ? enteringTestResult : "ionViewCanEnter rejected"));
                    return false;
                }
                else if (enteringTestResult instanceof Promise) {
                    promises.push(enteringTestResult);
                }
            }
            if (promises.length) {
                Promise.all(promises)
                    .then(function () { return _this._postViewInit(enteringView, leavingView, ti, resolve); })
                    .catch(reject);
            }
            else {
                this._postViewInit(enteringView, leavingView, ti, resolve);
            }
            return true;
        };
        NavControllerBase.prototype._transition = function (enteringView, leavingView, opts, resolve) {
            var _this = this;
            this._trnsId = this._trnsCtrl.getRootTrnsId(this);
            if (this._trnsId === null) {
                this._trnsId = this._trnsCtrl.nextId();
            }
            var animationOpts = {
                animation: opts.animation,
                direction: opts.direction,
                duration: (opts.animate === false ? 0 : opts.duration),
                easing: opts.easing,
                isRTL: this.config.platform.isRTL(),
                ev: opts.ev,
            };
            var transition = this._trnsCtrl.get(this._trnsId, enteringView, leavingView, animationOpts);
            this._sbTrns && this._sbTrns.destroy();
            this._sbTrns = null;
            if (transition.isRoot() && opts.progressAnimation) {
                this._sbTrns = transition;
            }
            transition.registerStart(function () {
                _this._trnsStart(transition, enteringView, leavingView, opts, resolve);
                if (transition.parent) {
                    transition.parent.start();
                }
            });
            if (enteringView && enteringView._state === nav_util_1.ViewState.INITIALIZED) {
                this._viewAttachToDOM(enteringView, enteringView._cmp, this._viewport);
            }
            else {
                (void 0);
            }
            if (!transition.hasChildren) {
                transition.start();
            }
        };
        NavControllerBase.prototype._trnsStart = function (transition, enteringView, leavingView, opts, resolve) {
            var _this = this;
            this._trnsId = null;
            nav_util_2.setZIndex(this, enteringView, leavingView, opts.direction, this._renderer);
            enteringView && enteringView._domShow(true, this._renderer);
            leavingView && leavingView._domShow(true, this._renderer);
            transition.init();
            var isFirstPage = !this._init && this._views.length === 1;
            var shouldNotAnimate = isFirstPage && !this._isPortal;
            var canNotAnimate = this.config.get('animate') === false;
            if (shouldNotAnimate || canNotAnimate) {
                opts.animate = false;
            }
            if (opts.animate === false) {
                transition.duration(0);
            }
            transition.beforeAddRead(this._viewsWillLifecycles.bind(this, enteringView, leavingView));
            transition.onFinish(function () {
                _this._zone.run(_this._trnsFinish.bind(_this, transition, opts, resolve));
            });
            var duration = transition.getDuration();
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
        };
        NavControllerBase.prototype._viewsWillLifecycles = function (enteringView, leavingView) {
            var _this = this;
            if (enteringView || leavingView) {
                this._zone.run(function () {
                    enteringView && _this._willEnter(enteringView);
                    leavingView && _this._willLeave(leavingView);
                });
            }
        };
        NavControllerBase.prototype._trnsFinish = function (transition, opts, resolve) {
            var enteringName;
            var leavingName;
            var hasCompleted = transition.hasCompleted;
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
        };
        NavControllerBase.prototype._insertViewAt = function (view, index) {
            var existingIndex = this._views.indexOf(view);
            if (existingIndex > -1) {
                this._views.splice(index, 0, this._views.splice(existingIndex, 1)[0]);
            }
            else {
                view._setNav(this);
                this._ids++;
                if (!view.id) {
                    view.id = this.id + "-" + this._ids;
                }
                this._views.splice(index, 0, view);
            }
        };
        NavControllerBase.prototype._removeView = function (view) {
            var views = this._views;
            var index = views.indexOf(view);
            (void 0);
            if (index > -1) {
                views.splice(index, 1);
            }
        };
        NavControllerBase.prototype._destroyView = function (view) {
            view._destroy(this._renderer);
            this._removeView(view);
        };
        NavControllerBase.prototype._cleanup = function (activeView) {
            var _this = this;
            var activeViewIndex = this.indexOf(activeView);
            var reorderZIndexes = false;
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
                    this._views.forEach(function (view) {
                        view._setZIndex(view._zIndex + nav_util_1.INIT_ZINDEX + 1, _this._renderer);
                    });
                }
            }
        };
        NavControllerBase.prototype._preLoad = function (view) {
            (void 0);
            view._preLoad();
        };
        NavControllerBase.prototype._willLoad = function (view) {
            (void 0);
            view._willLoad();
        };
        NavControllerBase.prototype._didLoad = function (view) {
            (void 0);
            (void 0);
            view._didLoad();
            this.viewDidLoad.emit(view);
            this._app.viewDidLoad.emit(view);
        };
        NavControllerBase.prototype._willEnter = function (view) {
            (void 0);
            (void 0);
            view._willEnter();
            this.viewWillEnter.emit(view);
            this._app.viewWillEnter.emit(view);
        };
        NavControllerBase.prototype._didEnter = function (view) {
            (void 0);
            (void 0);
            view._didEnter();
            this.viewDidEnter.emit(view);
            this._app.viewDidEnter.emit(view);
        };
        NavControllerBase.prototype._willLeave = function (view) {
            (void 0);
            (void 0);
            view._willLeave();
            this.viewWillLeave.emit(view);
            this._app.viewWillLeave.emit(view);
        };
        NavControllerBase.prototype._didLeave = function (view) {
            (void 0);
            (void 0);
            view._didLeave();
            this.viewDidLeave.emit(view);
            this._app.viewDidLeave.emit(view);
        };
        NavControllerBase.prototype._willUnload = function (view) {
            (void 0);
            (void 0);
            view._willUnload();
            this.viewWillUnload.emit(view);
            this._app.viewWillUnload.emit(view);
        };
        NavControllerBase.prototype.getActiveChildNav = function () {
            return this._children[this._children.length - 1];
        };
        NavControllerBase.prototype.registerChildNav = function (nav) {
            this._children.push(nav);
        };
        NavControllerBase.prototype.unregisterChildNav = function (nav) {
            var index = this._children.indexOf(nav);
            if (index > -1) {
                this._children.splice(index, 1);
            }
        };
        NavControllerBase.prototype.destroy = function () {
            for (var _i = 0, _a = this._views; _i < _a.length; _i++) {
                var view = _a[_i];
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
        };
        NavControllerBase.prototype.swipeBackStart = function () {
            if (this.isTransitioning() || this._queue.length > 0) {
                return;
            }
            var opts = {
                direction: nav_util_1.DIRECTION_BACK,
                progressAnimation: true
            };
            this._queueTrns({
                removeStart: -1,
                removeCount: 1,
                opts: opts,
            }, null);
        };
        NavControllerBase.prototype.swipeBackProgress = function (stepValue) {
            if (this._sbTrns && this._sbGesture) {
                this._app.setEnabled(false, ACTIVE_TRANSITION_DEFAULT);
                this.setTransitioning(true, ACTIVE_TRANSITION_DEFAULT);
                this._sbTrns.progressStep(stepValue);
            }
        };
        NavControllerBase.prototype.swipeBackEnd = function (shouldComplete, currentStepValue) {
            if (this._sbTrns && this._sbGesture) {
                this._sbTrns.progressEnd(shouldComplete, currentStepValue, 300);
            }
        };
        NavControllerBase.prototype._sbCheck = function () {
            if (!this._sbEnabled && this._isPortal) {
                return;
            }
            if (!this._sbGesture) {
                var opts = {
                    edge: 'left',
                    threshold: this._sbThreshold
                };
                this._sbGesture = new swipe_back_1.SwipeBackGesture(this, document.body, this._gestureCtrl, opts);
            }
            if (this.canSwipeBack()) {
                this._sbGesture.listen();
            }
            else {
                this._sbGesture.unlisten();
            }
        };
        NavControllerBase.prototype.canSwipeBack = function () {
            return (this._sbEnabled &&
                !this._children.length &&
                !this.isTransitioning() &&
                this._app.isEnabled() &&
                this.canGoBack());
        };
        NavControllerBase.prototype.canGoBack = function () {
            var activeView = this.getActive();
            return !!(activeView && activeView.enableBack()) || false;
        };
        NavControllerBase.prototype.isTransitioning = function () {
            if (this._trnsTm === 0) {
                return false;
            }
            return (this._trnsTm > Date.now());
        };
        NavControllerBase.prototype.setTransitioning = function (isTransitioning, durationPadding) {
            if (durationPadding === void 0) { durationPadding = ACTIVE_TRANSITION_DEFAULT; }
            this._trnsTm = (isTransitioning ? (Date.now() + durationPadding + ACTIVE_TRANSITION_OFFSET) : 0);
        };
        NavControllerBase.prototype.getActive = function () {
            return this._views[this._views.length - 1];
        };
        NavControllerBase.prototype.isActive = function (view) {
            return (view === this.getActive());
        };
        NavControllerBase.prototype.getByIndex = function (index) {
            return this._views[index];
        };
        NavControllerBase.prototype.getPrevious = function (view) {
            if (!view) {
                view = this.getActive();
            }
            return this._views[this.indexOf(view) - 1];
        };
        NavControllerBase.prototype.first = function () {
            return this._views[0];
        };
        NavControllerBase.prototype.last = function () {
            return this._views[this._views.length - 1];
        };
        NavControllerBase.prototype.indexOf = function (view) {
            return this._views.indexOf(view);
        };
        NavControllerBase.prototype.length = function () {
            return this._views.length;
        };
        NavControllerBase.prototype.getViews = function () {
            return this._views;
        };
        NavControllerBase.prototype.isSwipeBackEnabled = function () {
            return this._sbEnabled;
        };
        NavControllerBase.prototype.dismissPageChangeViews = function () {
            for (var _i = 0, _a = this._views; _i < _a.length; _i++) {
                var view = _a[_i];
                if (view.data && view.data.dismissOnPageChange) {
                    view.dismiss();
                }
            }
        };
        NavControllerBase.prototype.setViewport = function (val) {
            this._viewport = val;
        };
        return NavControllerBase;
    }(ion_1.Ion));
    exports.NavControllerBase = NavControllerBase;
    var ctrlIds = -1;
    var DISABLE_APP_MINIMUM_DURATION = 64;
    var ACTIVE_TRANSITION_DEFAULT = 5000;
    var ACTIVE_TRANSITION_OFFSET = 2000;
});
//# sourceMappingURL=nav-controller-base.js.map