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
        define(["require", "exports", '@angular/core', '../app/app', '../ion', '../../config/config', '../../util/keyboard', '../../util/dom', '../../util/scroll-view', '../tabs/tabs', '../../navigation/view-controller', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var app_1 = require('../app/app');
    var ion_1 = require('../ion');
    var config_1 = require('../../config/config');
    var keyboard_1 = require('../../util/keyboard');
    var dom_1 = require('../../util/dom');
    var scroll_view_1 = require('../../util/scroll-view');
    var tabs_1 = require('../tabs/tabs');
    var view_controller_1 = require('../../navigation/view-controller');
    var util_1 = require('../../util/util');
    var Content = (function (_super) {
        __extends(Content, _super);
        function Content(config, elementRef, renderer, _app, _keyboard, _zone, viewCtrl, _tabs) {
            _super.call(this, config, elementRef, renderer);
            this._app = _app;
            this._keyboard = _keyboard;
            this._zone = _zone;
            this._tabs = _tabs;
            this._scrollPadding = 0;
            this._inputPolling = false;
            this._setMode('content', config.get('mode'));
            this._sbPadding = config.getBoolean('statusbarPadding', false);
            if (viewCtrl) {
                viewCtrl._setIONContent(this);
                viewCtrl._setIONContentRef(elementRef);
            }
        }
        Content.prototype.ngOnInit = function () {
            var _this = this;
            var children = this._elementRef.nativeElement.children;
            (void 0);
            this._fixedEle = children[0];
            this._scrollEle = children[1];
            this._zone.runOutsideAngular(function () {
                _this._scroll = new scroll_view_1.ScrollView(_this._scrollEle);
                _this._scLsn = _this.addScrollListener(_this._app.setScrolling.bind(_this._app));
            });
        };
        Content.prototype.ngOnDestroy = function () {
            this._scLsn && this._scLsn();
            this._scroll && this._scroll.destroy();
            this._scrollEle = this._footerEle = this._scLsn = this._scroll = null;
        };
        Content.prototype.addScrollListener = function (handler) {
            return this._addListener('scroll', handler);
        };
        Content.prototype.addTouchStartListener = function (handler) {
            return this._addListener('touchstart', handler);
        };
        Content.prototype.addTouchMoveListener = function (handler) {
            return this._addListener('touchmove', handler);
        };
        Content.prototype.addTouchEndListener = function (handler) {
            return this._addListener('touchend', handler);
        };
        Content.prototype.addMouseDownListener = function (handler) {
            return this._addListener('mousedown', handler);
        };
        Content.prototype.addMouseUpListener = function (handler) {
            return this._addListener('mouseup', handler);
        };
        Content.prototype.addMouseMoveListener = function (handler) {
            return this._addListener('mousemove', handler);
        };
        Content.prototype._addListener = function (type, handler) {
            var _this = this;
            (void 0);
            (void 0);
            this._scrollEle.removeEventListener(type, handler);
            this._scrollEle.addEventListener(type, handler);
            return function () {
                if (_this._scrollEle) {
                    _this._scrollEle.removeEventListener(type, handler);
                }
            };
        };
        Content.prototype.getScrollElement = function () {
            return this._scrollEle;
        };
        Content.prototype.onScrollEnd = function (callback) {
            var lastScrollTop = null;
            var framesUnchanged = 0;
            var _scrollEle = this._scrollEle;
            function next() {
                var currentScrollTop = _scrollEle.scrollTop;
                if (lastScrollTop !== null) {
                    if (Math.round(lastScrollTop) === Math.round(currentScrollTop)) {
                        framesUnchanged++;
                    }
                    else {
                        framesUnchanged = 0;
                    }
                    if (framesUnchanged > 9) {
                        return callback();
                    }
                }
                lastScrollTop = currentScrollTop;
                dom_1.nativeRaf(function () {
                    dom_1.nativeRaf(next);
                });
            }
            dom_1.nativeTimeout(next, 100);
        };
        Content.prototype.onScrollElementTransitionEnd = function (callback) {
            dom_1.transitionEnd(this._scrollEle, callback);
        };
        Content.prototype.scrollTo = function (x, y, duration) {
            if (duration === void 0) { duration = 300; }
            return this._scroll.scrollTo(x, y, duration);
        };
        Content.prototype.scrollToTop = function (duration) {
            if (duration === void 0) { duration = 300; }
            return this._scroll.scrollToTop(duration);
        };
        Content.prototype.getScrollTop = function () {
            return this._scroll.getTop();
        };
        Content.prototype.setScrollTop = function (top) {
            this._scroll.setTop(top);
        };
        Content.prototype.scrollToBottom = function (duration) {
            if (duration === void 0) { duration = 300; }
            return this._scroll.scrollToBottom(duration);
        };
        Content.prototype.jsScroll = function (onScrollCallback) {
            return this._scroll.jsScroll(onScrollCallback);
        };
        Object.defineProperty(Content.prototype, "fullscreen", {
            get: function () {
                return !!this._fullscreen;
            },
            set: function (val) {
                this._fullscreen = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Content.prototype.setScrollElementStyle = function (prop, val) {
            this._scrollEle.style[prop] = val;
        };
        Content.prototype.getContentDimensions = function () {
            var _scrollEle = this._scrollEle;
            var parentElement = _scrollEle.parentElement;
            return {
                contentHeight: parentElement.offsetHeight,
                contentTop: parentElement.offsetTop,
                contentBottom: parentElement.offsetTop + parentElement.offsetHeight,
                contentWidth: parentElement.offsetWidth,
                contentLeft: parentElement.offsetLeft,
                contentRight: parentElement.offsetLeft + parentElement.offsetWidth,
                scrollHeight: _scrollEle.scrollHeight,
                scrollTop: _scrollEle.scrollTop,
                scrollBottom: _scrollEle.scrollTop + _scrollEle.scrollHeight,
                scrollWidth: _scrollEle.scrollWidth,
                scrollLeft: _scrollEle.scrollLeft,
                scrollRight: _scrollEle.scrollLeft + _scrollEle.scrollWidth,
            };
        };
        Content.prototype.addScrollPadding = function (newPadding) {
            (void 0);
            if (newPadding > this._scrollPadding) {
                (void 0);
                this._scrollPadding = newPadding;
                this._scrollEle.style.paddingBottom = (newPadding > 0) ? newPadding + 'px' : '';
            }
        };
        Content.prototype.clearScrollPaddingFocusOut = function () {
            var _this = this;
            if (!this._inputPolling) {
                this._inputPolling = true;
                this._keyboard.onClose(function () {
                    _this._inputPolling = false;
                    _this._scrollPadding = -1;
                    _this.addScrollPadding(0);
                }, 200, Infinity);
            }
        };
        Content.prototype.resize = function () {
            var _this = this;
            dom_1.nativeRaf(function () {
                _this.readDimensions();
                _this.writeDimensions();
            });
        };
        Content.prototype.readDimensions = function () {
            this._paddingTop = 0;
            this._paddingRight = 0;
            this._paddingBottom = 0;
            this._paddingLeft = 0;
            this._headerHeight = 0;
            this._footerHeight = 0;
            this._tabsPlacement = null;
            var ele = this._elementRef.nativeElement;
            if (!ele) {
                (void 0);
                return;
            }
            var computedStyle;
            var tagName;
            var parentEle = ele.parentElement;
            var children = parentEle.children;
            for (var i = children.length - 1; i >= 0; i--) {
                ele = children[i];
                tagName = ele.tagName;
                if (tagName === 'ION-CONTENT') {
                    if (this._fullscreen) {
                        computedStyle = getComputedStyle(ele);
                        this._paddingTop = parsePxUnit(computedStyle.paddingTop);
                        this._paddingBottom = parsePxUnit(computedStyle.paddingBottom);
                        this._paddingRight = parsePxUnit(computedStyle.paddingRight);
                        this._paddingLeft = parsePxUnit(computedStyle.paddingLeft);
                    }
                }
                else if (tagName === 'ION-HEADER') {
                    this._headerHeight = ele.clientHeight;
                }
                else if (tagName === 'ION-FOOTER') {
                    this._footerHeight = ele.clientHeight;
                    this._footerEle = ele;
                }
            }
            ele = parentEle;
            var tabbarEle;
            while (ele && ele.tagName !== 'ION-MODAL' && !ele.classList.contains('tab-subpage')) {
                if (ele.tagName === 'ION-TABS') {
                    tabbarEle = ele.firstElementChild;
                    this._tabbarHeight = tabbarEle.clientHeight;
                    if (this._tabsPlacement === null) {
                        this._tabsPlacement = ele.getAttribute('tabsplacement');
                    }
                }
                ele = ele.parentElement;
            }
        };
        Content.prototype.writeDimensions = function () {
            var scrollEle = this._scrollEle;
            if (!scrollEle) {
                (void 0);
                return;
            }
            var fixedEle = this._fixedEle;
            if (!fixedEle) {
                (void 0);
                return;
            }
            var contentTop = this._headerHeight;
            var contentBottom = this._footerHeight;
            if (this._tabsPlacement === 'top') {
                (void 0);
                contentTop += this._tabbarHeight;
            }
            else if (this._tabsPlacement === 'bottom') {
                (void 0);
                contentBottom += this._tabbarHeight;
                if (contentBottom > 0 && this._footerEle) {
                    var footerPos = contentBottom - this._footerHeight;
                    (void 0);
                    this._footerEle.style.bottom = cssFormat(footerPos);
                }
            }
            var topProperty = 'marginTop';
            var bottomProperty = 'marginBottom';
            var fixedTop = contentTop;
            var fixedBottom = contentBottom;
            if (this._fullscreen) {
                (void 0);
                (void 0);
                contentTop += this._paddingTop;
                contentBottom += this._paddingBottom;
                topProperty = 'paddingTop';
                bottomProperty = 'paddingBottom';
            }
            if (contentTop !== this.contentTop) {
                (void 0);
                (void 0);
                scrollEle.style[topProperty] = cssFormat(contentTop);
                fixedEle.style.marginTop = cssFormat(fixedTop);
                this.contentTop = contentTop;
            }
            if (contentBottom !== this.contentBottom) {
                (void 0);
                (void 0);
                scrollEle.style[bottomProperty] = cssFormat(contentBottom);
                fixedEle.style.marginBottom = cssFormat(fixedBottom);
                this.contentBottom = contentBottom;
            }
            if (this._tabsPlacement !== null && this._tabs) {
                if (this._tabsPlacement === 'top') {
                    this._tabs.setTabbarPosition(this._headerHeight, -1);
                }
                else {
                    (void 0);
                    this._tabs.setTabbarPosition(-1, 0);
                }
            }
        };
        Content.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-content',
                        template: '<div class="fixed-content">' +
                            '<ng-content select="[ion-fixed],ion-fab"></ng-content>' +
                            '</div>' +
                            '<div class="scroll-content">' +
                            '<ng-content></ng-content>' +
                            '</div>' +
                            '<ng-content select="ion-refresher"></ng-content>',
                        host: {
                            '[class.statusbar-padding]': '_sbPadding'
                        },
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.None
                    },] },
        ];
        Content.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: app_1.App, },
            { type: keyboard_1.Keyboard, },
            { type: core_1.NgZone, },
            { type: view_controller_1.ViewController, decorators: [{ type: core_1.Optional },] },
            { type: tabs_1.Tabs, decorators: [{ type: core_1.Optional },] },
        ];
        Content.propDecorators = {
            'fullscreen': [{ type: core_1.Input },],
        };
        return Content;
    }(ion_1.Ion));
    exports.Content = Content;
    function parsePxUnit(val) {
        return (val.indexOf('px') > 0) ? parseInt(val, 10) : 0;
    }
    function cssFormat(val) {
        return (val > 0 ? val + 'px' : '');
    }
});
//# sourceMappingURL=content.js.map