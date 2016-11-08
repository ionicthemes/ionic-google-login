import { copyInputAttributes, hasPointerMoved, pointerCoord } from '../../util/dom';
import { Ion } from '../ion';
import { isTrueProperty } from '../../util/util';
export class InputBase extends Ion {
    constructor(config, _form, _item, _app, _platform, elementRef, renderer, _scrollView, nav, ngControl) {
        super(config, elementRef, renderer);
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
    scrollMove(ev) {
        if (!(this._nav && this._nav.isTransitioning())) {
            this.deregScrollMove();
            if (this.hasFocus()) {
                this._native.hideFocus(true);
                this._scrollView.onScrollEnd(() => {
                    this._native.hideFocus(false);
                    if (this.hasFocus()) {
                        this.regScrollMove();
                    }
                });
            }
        }
    }
    ;
    setItemInputControlCss() {
        let item = this._item;
        let nativeInput = this._native;
        let inputControl = this.inputControl;
        if (item && inputControl) {
            this.setControlCss(item, inputControl);
        }
        if (nativeInput && inputControl) {
            this.setControlCss(nativeInput, inputControl);
        }
    }
    setControlCss(element, control) {
        element.setElementClass('ng-untouched', control.untouched);
        element.setElementClass('ng-touched', control.touched);
        element.setElementClass('ng-pristine', control.pristine);
        element.setElementClass('ng-dirty', control.dirty);
        element.setElementClass('ng-valid', control.valid);
        element.setElementClass('ng-invalid', !control.valid);
    }
    setValue(val) {
        this._value = val;
        this.checkHasValue(val);
    }
    setType(val) {
        this._type = 'text';
        if (val) {
            val = val.toLowerCase();
            if (/password|email|number|search|tel|url|date|month|time|week/.test(val)) {
                this._type = val;
            }
        }
    }
    setDisabled(val) {
        this._disabled = isTrueProperty(val);
        this._item && this._item.setElementClass('item-input-disabled', this._disabled);
        this._native && this._native.isDisabled(this._disabled);
    }
    setNativeInput(nativeInput) {
        this._native = nativeInput;
        if (this._item && this._item.labelId !== null) {
            nativeInput.labelledBy(this._item.labelId);
        }
        nativeInput.valueChange.subscribe((inputValue) => {
            this.onChange(inputValue);
        });
        this.focusChange(this.hasFocus());
        nativeInput.focusChange.subscribe((textInputHasFocus) => {
            this.focusChange(textInputHasFocus);
            this.checkHasValue(nativeInput.getValue());
            if (!textInputHasFocus) {
                this.onTouched(textInputHasFocus);
            }
        });
        this.checkHasValue(nativeInput.getValue());
        this.setDisabled(this._disabled);
        var ionInputEle = this._elementRef.nativeElement;
        let nativeInputEle = nativeInput.element();
        copyInputAttributes(ionInputEle, nativeInputEle);
        if (ionInputEle.hasAttribute('autofocus')) {
            ionInputEle.removeAttribute('autofocus');
            if (this._autoFocusAssist === 'immediate') {
                nativeInputEle.focus();
            }
            else if (this._autoFocusAssist === 'delay') {
                setTimeout(() => {
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
    }
    setNextInput(nextInput) {
        if (nextInput) {
            nextInput.focused.subscribe(() => {
                this._form.tabFocus(this);
            });
        }
    }
    writeValue(val) {
        this._value = val;
        this.checkHasValue(val);
    }
    onChange(val) {
        this.checkHasValue(val);
    }
    onTouched(val) { }
    hasFocus() {
        return this._native.hasFocus();
    }
    checkHasValue(inputValue) {
        if (this._item) {
            let hasValue = (inputValue !== null && inputValue !== undefined && inputValue !== '');
            this._item.setElementClass('input-has-value', hasValue);
        }
    }
    focusChange(inputHasFocus) {
        if (this._item) {
            this._item.setElementClass('input-has-focus', inputHasFocus);
        }
        if (!inputHasFocus) {
            this.deregScrollMove();
        }
    }
    pointerStart(ev) {
        (void 0);
        if (ev.type === 'touchstart') {
            this._isTouch = true;
        }
        if ((this._isTouch || (!this._isTouch && ev.type === 'mousedown')) && this._app.isEnabled()) {
            this._coord = pointerCoord(ev);
        }
    }
    pointerEnd(ev) {
        (void 0);
        if ((this._isTouch && ev.type === 'mouseup') || !this._app.isEnabled()) {
            ev.preventDefault();
            ev.stopPropagation();
        }
        else if (this._coord) {
            let endCoord = pointerCoord(ev);
            if (!hasPointerMoved(8, this._coord, endCoord) && !this.hasFocus()) {
                ev.preventDefault();
                ev.stopPropagation();
                (void 0);
                this.initFocus();
            }
        }
        this._coord = null;
    }
    initFocus() {
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
            scrollView.scrollTo(0, scrollData.scrollTo, scrollDuration).then(() => {
                this._native.beginFocus(false, 0);
                this.setFocus();
                this._app.setEnabled(true);
                this._nav && this._nav.setTransitioning(false);
                this.regScrollMove();
                if (this._usePadding) {
                    this._scrollView.clearScrollPaddingFocusOut();
                }
            });
        }
        else {
            this.setFocus();
            this.regScrollMove();
        }
    }
    setFocus() {
        this._form.setAsFocused(this);
        (void 0);
        this._native.setFocus();
        document.body.scrollTop = 0;
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
    regScrollMove() {
        if (this._useAssist && this._scrollView) {
            setTimeout(() => {
                this.deregScrollMove();
                this._deregScroll = this._scrollView.addScrollListener(this.scrollMove.bind(this));
            }, 80);
        }
    }
    deregScrollMove() {
        this._deregScroll && this._deregScroll();
    }
    focusNext() {
        this._form.tabFocus(this);
    }
    static getScrollData(inputOffsetTop, inputOffsetHeight, scrollViewDimensions, keyboardHeight, plaformHeight) {
        let inputTop = (inputOffsetTop + scrollViewDimensions.contentTop - scrollViewDimensions.scrollTop);
        let inputBottom = (inputTop + inputOffsetHeight);
        let safeAreaTop = scrollViewDimensions.contentTop;
        let safeAreaHeight = plaformHeight - keyboardHeight - safeAreaTop;
        safeAreaHeight /= 2;
        let safeAreaBottom = safeAreaTop + safeAreaHeight;
        let inputTopWithinSafeArea = (inputTop >= safeAreaTop && inputTop <= safeAreaBottom);
        let inputTopAboveSafeArea = (inputTop < safeAreaTop);
        let inputTopBelowSafeArea = (inputTop > safeAreaBottom);
        let inputBottomWithinSafeArea = (inputBottom >= safeAreaTop && inputBottom <= safeAreaBottom);
        let inputBottomBelowSafeArea = (inputBottom > safeAreaBottom);
        let scrollData = {
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
            let availablePadding = (scrollViewDimensions.scrollHeight - scrollViewDimensions.scrollTop) - scrollViewDimensions.contentHeight;
            let paddingSpace = availablePadding + scrollData.scrollAmount;
            if (paddingSpace < 0) {
                scrollData.scrollPadding = (scrollViewDimensions.contentHeight - safeAreaHeight);
            }
        }
        return scrollData;
    }
}
const SCROLL_ASSIST_SPEED = 0.3;
function getScrollAssistDuration(distanceToScroll) {
    distanceToScroll = Math.abs(distanceToScroll);
    let duration = distanceToScroll / SCROLL_ASSIST_SPEED;
    return Math.min(400, Math.max(150, duration));
}
//# sourceMappingURL=input-base.js.map