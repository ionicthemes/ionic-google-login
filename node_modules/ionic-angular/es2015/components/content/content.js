import { ChangeDetectionStrategy, Component, ElementRef, Input, NgZone, Optional, Renderer, ViewEncapsulation } from '@angular/core';
import { App } from '../app/app';
import { Ion } from '../ion';
import { Config } from '../../config/config';
import { Keyboard } from '../../util/keyboard';
import { nativeRaf, nativeTimeout, transitionEnd } from '../../util/dom';
import { ScrollView } from '../../util/scroll-view';
import { Tabs } from '../tabs/tabs';
import { ViewController } from '../../navigation/view-controller';
import { isTrueProperty } from '../../util/util';
export class Content extends Ion {
    constructor(config, elementRef, renderer, _app, _keyboard, _zone, viewCtrl, _tabs) {
        super(config, elementRef, renderer);
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
    ngOnInit() {
        let children = this._elementRef.nativeElement.children;
        (void 0);
        this._fixedEle = children[0];
        this._scrollEle = children[1];
        this._zone.runOutsideAngular(() => {
            this._scroll = new ScrollView(this._scrollEle);
            this._scLsn = this.addScrollListener(this._app.setScrolling.bind(this._app));
        });
    }
    ngOnDestroy() {
        this._scLsn && this._scLsn();
        this._scroll && this._scroll.destroy();
        this._scrollEle = this._footerEle = this._scLsn = this._scroll = null;
    }
    addScrollListener(handler) {
        return this._addListener('scroll', handler);
    }
    addTouchStartListener(handler) {
        return this._addListener('touchstart', handler);
    }
    addTouchMoveListener(handler) {
        return this._addListener('touchmove', handler);
    }
    addTouchEndListener(handler) {
        return this._addListener('touchend', handler);
    }
    addMouseDownListener(handler) {
        return this._addListener('mousedown', handler);
    }
    addMouseUpListener(handler) {
        return this._addListener('mouseup', handler);
    }
    addMouseMoveListener(handler) {
        return this._addListener('mousemove', handler);
    }
    _addListener(type, handler) {
        (void 0);
        (void 0);
        this._scrollEle.removeEventListener(type, handler);
        this._scrollEle.addEventListener(type, handler);
        return () => {
            if (this._scrollEle) {
                this._scrollEle.removeEventListener(type, handler);
            }
        };
    }
    getScrollElement() {
        return this._scrollEle;
    }
    onScrollEnd(callback) {
        let lastScrollTop = null;
        let framesUnchanged = 0;
        let _scrollEle = this._scrollEle;
        function next() {
            let currentScrollTop = _scrollEle.scrollTop;
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
            nativeRaf(() => {
                nativeRaf(next);
            });
        }
        nativeTimeout(next, 100);
    }
    onScrollElementTransitionEnd(callback) {
        transitionEnd(this._scrollEle, callback);
    }
    scrollTo(x, y, duration = 300) {
        return this._scroll.scrollTo(x, y, duration);
    }
    scrollToTop(duration = 300) {
        return this._scroll.scrollToTop(duration);
    }
    getScrollTop() {
        return this._scroll.getTop();
    }
    setScrollTop(top) {
        this._scroll.setTop(top);
    }
    scrollToBottom(duration = 300) {
        return this._scroll.scrollToBottom(duration);
    }
    jsScroll(onScrollCallback) {
        return this._scroll.jsScroll(onScrollCallback);
    }
    get fullscreen() {
        return !!this._fullscreen;
    }
    set fullscreen(val) {
        this._fullscreen = isTrueProperty(val);
    }
    setScrollElementStyle(prop, val) {
        this._scrollEle.style[prop] = val;
    }
    getContentDimensions() {
        let _scrollEle = this._scrollEle;
        let parentElement = _scrollEle.parentElement;
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
    }
    addScrollPadding(newPadding) {
        (void 0);
        if (newPadding > this._scrollPadding) {
            (void 0);
            this._scrollPadding = newPadding;
            this._scrollEle.style.paddingBottom = (newPadding > 0) ? newPadding + 'px' : '';
        }
    }
    clearScrollPaddingFocusOut() {
        if (!this._inputPolling) {
            this._inputPolling = true;
            this._keyboard.onClose(() => {
                this._inputPolling = false;
                this._scrollPadding = -1;
                this.addScrollPadding(0);
            }, 200, Infinity);
        }
    }
    resize() {
        nativeRaf(() => {
            this.readDimensions();
            this.writeDimensions();
        });
    }
    readDimensions() {
        this._paddingTop = 0;
        this._paddingRight = 0;
        this._paddingBottom = 0;
        this._paddingLeft = 0;
        this._headerHeight = 0;
        this._footerHeight = 0;
        this._tabsPlacement = null;
        let ele = this._elementRef.nativeElement;
        if (!ele) {
            (void 0);
            return;
        }
        let computedStyle;
        let tagName;
        let parentEle = ele.parentElement;
        let children = parentEle.children;
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
        let tabbarEle;
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
    }
    writeDimensions() {
        let scrollEle = this._scrollEle;
        if (!scrollEle) {
            (void 0);
            return;
        }
        let fixedEle = this._fixedEle;
        if (!fixedEle) {
            (void 0);
            return;
        }
        let contentTop = this._headerHeight;
        let contentBottom = this._footerHeight;
        if (this._tabsPlacement === 'top') {
            (void 0);
            contentTop += this._tabbarHeight;
        }
        else if (this._tabsPlacement === 'bottom') {
            (void 0);
            contentBottom += this._tabbarHeight;
            if (contentBottom > 0 && this._footerEle) {
                let footerPos = contentBottom - this._footerHeight;
                (void 0);
                this._footerEle.style.bottom = cssFormat(footerPos);
            }
        }
        let topProperty = 'marginTop';
        let bottomProperty = 'marginBottom';
        let fixedTop = contentTop;
        let fixedBottom = contentBottom;
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
    }
}
Content.decorators = [
    { type: Component, args: [{
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
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None
            },] },
];
Content.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: App, },
    { type: Keyboard, },
    { type: NgZone, },
    { type: ViewController, decorators: [{ type: Optional },] },
    { type: Tabs, decorators: [{ type: Optional },] },
];
Content.propDecorators = {
    'fullscreen': [{ type: Input },],
};
function parsePxUnit(val) {
    return (val.indexOf('px') > 0) ? parseInt(val, 10) : 0;
}
function cssFormat(val) {
    return (val > 0 ? val + 'px' : '');
}
//# sourceMappingURL=content.js.map