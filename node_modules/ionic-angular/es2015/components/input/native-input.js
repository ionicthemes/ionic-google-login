import { Directive, ElementRef, EventEmitter, HostListener, Output, Renderer } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { CSS, hasFocus } from '../../util/dom';
export class NativeInput {
    constructor(_elementRef, _renderer, config, ngControl) {
        this._elementRef = _elementRef;
        this._renderer = _renderer;
        this.ngControl = ngControl;
        this.focusChange = new EventEmitter();
        this.valueChange = new EventEmitter();
        this._clone = config.getBoolean('inputCloning', false);
        this._blurring = config.getBoolean('inputBlurring', false);
    }
    _change(ev) {
        this.valueChange.emit(ev.target.value);
    }
    _focus() {
        var self = this;
        self.focusChange.emit(true);
        function docTouchEnd(ev) {
            var tapped = ev.target;
            if (tapped && self.element()) {
                if (tapped.tagName !== 'INPUT' && tapped.tagName !== 'TEXTAREA' && !tapped.classList.contains('input-cover')) {
                    self.element().blur();
                }
            }
        }
        if (self._blurring) {
            (void 0);
            document.addEventListener('touchend', docTouchEnd, true);
            self._unrefBlur = function () {
                (void 0);
                document.removeEventListener('touchend', docTouchEnd, true);
            };
        }
    }
    _blur() {
        this.focusChange.emit(false);
        this.hideFocus(false);
        this._unrefBlur && this._unrefBlur();
        this._unrefBlur = null;
    }
    labelledBy(val) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-labelledby', val);
    }
    isDisabled(val) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', val ? '' : null);
    }
    setFocus() {
        if (document.activeElement !== this.element()) {
            this.element().focus();
        }
    }
    beginFocus(shouldFocus, inputRelativeY) {
        if (this._relocated !== shouldFocus) {
            var focusedInputEle = this.element();
            if (shouldFocus) {
                if (this._clone) {
                    var clonedInputEle = cloneInput(focusedInputEle, 'cloned-focus');
                    focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
                    focusedInputEle.style[CSS.transform] = `translate3d(-9999px,${inputRelativeY}px,0)`;
                    focusedInputEle.style.opacity = '0';
                }
                this.setFocus();
                if (this._clone) {
                    focusedInputEle.classList.add('cloned-active');
                }
            }
            else {
                if (this._clone) {
                    focusedInputEle.classList.remove('cloned-active');
                    focusedInputEle.style[CSS.transform] = '';
                    focusedInputEle.style.opacity = '';
                    removeClone(focusedInputEle, 'cloned-focus');
                }
            }
            this._relocated = shouldFocus;
        }
    }
    hideFocus(shouldHideFocus) {
        let focusedInputEle = this.element();
        (void 0);
        if (shouldHideFocus) {
            let clonedInputEle = cloneInput(focusedInputEle, 'cloned-move');
            focusedInputEle.classList.add('cloned-active');
            focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
        }
        else {
            focusedInputEle.classList.remove('cloned-active');
            removeClone(focusedInputEle, 'cloned-move');
        }
    }
    hasFocus() {
        return hasFocus(this.element());
    }
    getValue() {
        return this.element().value;
    }
    setElementClass(cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    }
    element() {
        return this._elementRef.nativeElement;
    }
    ngOnDestroy() {
        this._unrefBlur && this._unrefBlur();
    }
}
NativeInput.decorators = [
    { type: Directive, args: [{
                selector: '.text-input'
            },] },
];
NativeInput.ctorParameters = [
    { type: ElementRef, },
    { type: Renderer, },
    { type: Config, },
    { type: NgControl, },
];
NativeInput.propDecorators = {
    'focusChange': [{ type: Output },],
    'valueChange': [{ type: Output },],
    '_change': [{ type: HostListener, args: ['input', ['$event'],] },],
    '_focus': [{ type: HostListener, args: ['focus',] },],
    '_blur': [{ type: HostListener, args: ['blur',] },],
};
function cloneInput(focusedInputEle, addCssClass) {
    let clonedInputEle = focusedInputEle.cloneNode(true);
    clonedInputEle.classList.add('cloned-input');
    clonedInputEle.classList.add(addCssClass);
    clonedInputEle.setAttribute('aria-hidden', true);
    clonedInputEle.removeAttribute('aria-labelledby');
    clonedInputEle.tabIndex = -1;
    clonedInputEle.style.width = (focusedInputEle.offsetWidth + 10) + 'px';
    clonedInputEle.style.height = focusedInputEle.offsetHeight + 'px';
    clonedInputEle.value = focusedInputEle.value;
    return clonedInputEle;
}
function removeClone(focusedInputEle, queryCssClass) {
    let clonedInputEle = focusedInputEle.parentElement.querySelector('.' + queryCssClass);
    if (clonedInputEle) {
        clonedInputEle.parentNode.removeChild(clonedInputEle);
    }
}
export class NextInput {
    constructor() {
        this.focused = new EventEmitter();
    }
    receivedFocus() {
        (void 0);
        this.focused.emit(true);
    }
}
NextInput.decorators = [
    { type: Directive, args: [{
                selector: '[next-input]'
            },] },
];
NextInput.ctorParameters = [];
NextInput.propDecorators = {
    'focused': [{ type: Output },],
    'receivedFocus': [{ type: HostListener, args: ['focus',] },],
};
//# sourceMappingURL=native-input.js.map