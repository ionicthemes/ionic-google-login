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
        define(["require", "exports", '../../util/dom', '../ion', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var dom_1 = require('../../util/dom');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var InputBase = (function (_super) {
        __extends(InputBase, _super);
        function InputBase(config, _form, _item, _app, _platform, elementRef, renderer, _scrollView, nav, ngControl) {
            _super.call(this, config, elementRef, renderer);
            this._form = _form;
            this._item = _item;
            this._app = _app;
            this._platform = _platform;
            this._scrollView = _scrollView;
            this._disabled = false;
            this._type = 'text';
            this._value = '';
            this._nav = nav;
            this._useAssist = config.getBoolean('scrollAssist', false);
            this._usePadding = config.getBoolean('scrollPadding', this._useAssist);
            this._keyboardHeight = config.getNumber('keyboardHeight');
            this._autoFocusAssist = config.get('autoFocusAssist', 'delay');
            this._autoComplete = config.get('autocomplete', 'off');
            this._autoCorrect = config.get('autocorrect', 'off');
            if (ngControl) {
                ngControl.valueAccessor = this;
                this.inputControl = ngControl;
            }
            _form.register(this);
        }
        InputBase.prototype.scrollMove = function (ev) {
            var _this = this;
            if (!(this._nav && this._nav.isTransitioning())) {
                this.deregScrollMove();
                if (this.hasFocus()) {
                    this._native.hideFocus(true);
                    this._scrollView.onScrollEnd(function () {
                        _this._native.hideFocus(false);
                        if (_this.hasFocus()) {
                            _this.regScrollMove();
                        }
                    });
                }
            }
        };
        ;
        InputBase.prototype.setItemInputControlCss = function () {
            var item = this._item;
            var nativeInput = this._native;
            var inputControl = this.inputControl;
            if (item && inputControl) {
                this.setControlCss(item, inputControl);
            }
            if (nativeInput && inputControl) {
                this.setControlCss(nativeInput, inputControl);
            }
        };
        InputBase.prototype.setControlCss = function (element, control) {
            element.setElementClass('ng-untouched', control.untouched);
            element.setElementClass('ng-touched', control.touched);
            element.setElementClass('ng-pristine', control.pristine);
            element.setElementClass('ng-dirty', control.dirty);
            element.setElementClass('ng-valid', control.valid);
            element.setElementClass('ng-invalid', !control.valid);
        };
        InputBase.prototype.setValue = function (val) {
            this._value = val;
            this.checkHasValue(val);
        };
        InputBase.prototype.setType = function (val) {
            this._type = 'text';
            if (val) {
                val = val.toLowerCase();
                if (/password|email|number|search|tel|url|date|month|time|week/.test(val)) {
                    this._type = val;
                }
            }
        };
        InputBase.prototype.setDisabled = function (val) {
            this._disabled = util_1.isTrueProperty(val);
            this._item && this._item.setElementClass('item-input-disabled', this._disabled);
            this._native && this._native.isDisabled(this._disabled);
        };
        InputBase.prototype.setNativeInput = function (nativeInput) {
            var _this = this;
            this._native = nativeInput;
            if (this._item && this._item.labelId !== null) {
                nativeInput.labelledBy(this._item.labelId);
            }
            nativeInput.valueChange.subscribe(function (inputValue) {
                _this.onChange(inputValue);
            });
            this.focusChange(this.hasFocus());
            nativeInput.focusChange.subscribe(function (textInputHasFocus) {
                _this.focusChange(textInputHasFocus);
                _this.checkHasValue(nativeInput.getValue());
                if (!textInputHasFocus) {
                    _this.onTouched(textInputHasFocus);
                }
            });
            this.checkHasValue(nativeInput.getValue());
            this.setDisabled(this._disabled);
            var ionInputEle = this._elementRef.nativeElement;
            var nativeInputEle = nativeInput.element();
            dom_1.copyInputAttributes(ionInputEle, nativeInputEle);
            if (ionInputEle.hasAttribute('autofocus')) {
                ionInputEle.removeAttribute('autofocus');
                if (this._autoFocusAssist === 'immediate') {
                    nativeInputEle.focus();
                }
                else if (this._autoFocusAssist === 'delay') {
                    setTimeout(function () {
                        nativeInputEle.focus();
                    }, 650);
                }
            }
            if (ionInputEle.hasAttribute('autocomplete')) {
                this._autoComplete = ionInputEle.getAttribute('autocomplete');
            }
            nativeInputEle.setAttribute('autocomplete', this._autoComplete);
            if (ionInputEle.hasAttribute('autocorrect')) {
                this._autoCorrect = ionInputEle.getAttribute('autocorrect');
            }
            nativeInputEle.setAttribute('autocorrect', this._autoCorrect);
        };
        InputBase.prototype.setNextInput = function (nextInput) {
            var _this = this;
            if (nextInput) {
                nextInput.focused.subscribe(function () {
                    _this._form.tabFocus(_this);
                });
            }
        };
        InputBase.prototype.writeValue = function (val) {
            this._value = val;
            this.checkHasValue(val);
        };
        InputBase.prototype.onChange = function (val) {
            this.checkHasValue(val);
        };
        InputBase.prototype.onTouched = function (val) { };
        InputBase.prototype.hasFocus = function () {
            return this._native.hasFocus();
        };
        InputBase.prototype.checkHasValue = function (inputValue) {
            if (this._item) {
                var hasValue = (inputValue !== null && inputValue !== undefined && inputValue !== '');
                this._item.setElementClass('input-has-value', hasValue);
            }
        };
        InputBase.prototype.focusChange = function (inputHasFocus) {
            if (this._item) {
                this._item.setElementClass('input-has-focus', inputHasFocus);
            }
            if (!inputHasFocus) {
                this.deregScrollMove();
            }
        };
        InputBase.prototype.pointerStart = function (ev) {
            (void 0);
            if (ev.type === 'touchstart') {
                this._isTouch = true;
            }
            if ((this._isTouch || (!this._isTouch && ev.type === 'mousedown')) && this._app.isEnabled()) {
                this._coord = dom_1.pointerCoord(ev);
            }
        };
        InputBase.prototype.pointerEnd = function (ev) {
            (void 0);
            if ((this._isTouch && ev.type === 'mouseup') || !this._app.isEnabled()) {
                ev.preventDefault();
                ev.stopPropagation();
            }
            else if (this._coord) {
                var endCoord = dom_1.pointerCoord(ev);
                if (!dom_1.hasPointerMoved(8, this._coord, endCoord) && !this.hasFocus()) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    (void 0);
                    this.initFocus();
                }
            }
            this._coord = null;
        };
        InputBase.prototype.initFocus = function () {
            var _this = this;
            var scrollView = this._scrollView;
            if (scrollView) {
                var ele = this._elementRef.nativeElement;
                ele = ele.closest('ion-item,[ion-item]') || ele;
                var scrollData = InputBase.getScrollData(ele.offsetTop, ele.offsetHeight, scrollView.getContentDimensions(), this._keyboardHeight, this._platform.height());
                if (scrollData.scrollAmount > -3 && scrollData.scrollAmount < 3) {
                    this.setFocus();
                    this.regScrollMove();
                    return;
                }
                if (this._usePadding) {
                    scrollView.addScrollPadding(scrollData.scrollPadding);
                }
                var scrollDuration = getScrollAssistDuration(scrollData.scrollAmount);
                this._app.setEnabled(false, scrollDuration);
                this._nav && this._nav.setTransitioning(true, scrollDuration);
                this._native.beginFocus(true, scrollData.inputSafeY);
                scrollView.scrollTo(0, scrollData.scrollTo, scrollDuration).then(function () {
                    _this._native.beginFocus(false, 0);
                    _this.setFocus();
                    _this._app.setEnabled(true);
                    _this._nav && _this._nav.setTransitioning(false);
                    _this.regScrollMove();
                    if (_this._usePadding) {
                        _this._scrollView.clearScrollPaddingFocusOut();
                    }
                });
            }
            else {
                this.setFocus();
                this.regScrollMove();
            }
        };
        InputBase.prototype.setFocus = function () {
            this._form.setAsFocused(this);
            (void 0);
            this._native.setFocus();
            document.body.scrollTop = 0;
        };
        InputBase.prototype.registerOnChange = function (fn) { this.onChange = fn; };
        InputBase.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        InputBase.prototype.regScrollMove = function () {
            var _this = this;
            if (this._useAssist && this._scrollView) {
                setTimeout(function () {
                    _this.deregScrollMove();
                    _this._deregScroll = _this._scrollView.addScrollListener(_this.scrollMove.bind(_this));
                }, 80);
            }
        };
        InputBase.prototype.deregScrollMove = function () {
            this._deregScroll && this._deregScroll();
        };
        InputBase.prototype.focusNext = function () {
            this._form.tabFocus(this);
        };
        InputBase.getScrollData = function (inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
            var inputTop = (inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop);
            var inputBottom = (inputTop + inputOffsetHeight);
            var safeAreaTop = scrollViewDimensions.contentTop;
            var safeAreaHeight = plaformHeight - keyboardHeight - safeAreaTop;
            safeAreaHeight /= 2;
            var safeAreaBottom = safeAreaTop + safeAreaHeight;
            var inputTopWithinSafeArea = (inputTop >= safeAreaTop && inputTop <= safeAreaBottom);
            var inputTopAboveSafeArea = (inputTop < safeAreaTop);
            var inputTopBelowSafeArea = (inputTop > safeAreaBottom);
            var inputBottomWithinSafeArea = (inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom);
            var inputBottomBelowSafeArea = (inputBottom > safeAreaBottom);
            var scrollData = {
                scrollAmount: 0,
                scrollTo: 0,
                scrollPadding: 0,
                inputSafeY: 0
            };
            if (inputTopWithinSafeArea && inputBottomWithinSafeArea) {
                return scrollData;
            }
            if (inputTopBelowSafeArea || inputBottomBelowSafeArea) {
                if (safeAreaHeight > inputOffsetHeight) {
                    scrollData.scrollAmount = Math.round(safeAreaBottom - inputBottom);
                }
                else {
                    scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
                }
                scrollData.inputSafeY = -(inputTop - safeAreaTop) + 4;
            }
            else if (inputTopAboveSafeArea) {
                scrollData.scrollAmount = Math.round(safeAreaTop - inputTop);
                scrollData.inputSafeY = (safeAreaTop - inputTop) + 4;
            }
            scrollData.scrollTo = (scrollViewDimensions.scrollTop - scrollData.scrollAmount);
            if (scrollData.scrollAmount < 0) {
                var availablePadding = (scrollViewDimensions.scrollHeight - scrollViewDimensions.scrollTop) - scrollViewDimensions.contentHeight;
                var paddingSpace = availablePadding + scrollData.scrollAmount;
                if (paddingSpace < 0) {
                    scrollData.scrollPadding = (scrollViewDimensions.contentHeight - safeAreaHeight);
                }
            }
            return scrollData;
        };
        return InputBase;
    }(ion_1.Ion));
    exports.InputBase = InputBase;
    var SCROLL_ASSIST_SPEED = 0.3;
    function getScrollAssistDuration(distanceToScroll) {
        distanceToScroll = Math.abs(distanceToScroll);
        var duration = distanceToScroll / SCROLL_ASSIST_SPEED;
        return Math.min(400, Math.max(150, duration));
    }
});
//# sourceMappingURL=input-base.js.map