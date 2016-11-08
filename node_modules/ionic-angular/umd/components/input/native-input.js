(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/forms', '../../config/config', '../../util/dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var config_1 = require('../../config/config');
    var dom_1 = require('../../util/dom');
    var NativeInput = (function () {
        function NativeInput(_elementRef, _renderer, config, ngControl) {
            this._elementRef = _elementRef;
            this._renderer = _renderer;
            this.ngControl = ngControl;
            this.focusChange = new core_1.EventEmitter();
            this.valueChange = new core_1.EventEmitter();
            this._clone = config.getBoolean('inputCloning', false);
            this._blurring = config.getBoolean('inputBlurring', false);
        }
        NativeInput.prototype._change = function (ev) {
            this.valueChange.emit(ev.target.value);
        };
        NativeInput.prototype._focus = function () {
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
        };
        NativeInput.prototype._blur = function () {
            this.focusChange.emit(false);
            this.hideFocus(false);
            this._unrefBlur && this._unrefBlur();
            this._unrefBlur = null;
        };
        NativeInput.prototype.labelledBy = function (val) {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-labelledby', val);
        };
        NativeInput.prototype.isDisabled = function (val) {
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'disabled', val ? '' : null);
        };
        NativeInput.prototype.setFocus = function () {
            if (document.activeElement !== this.element()) {
                this.element().focus();
            }
        };
        NativeInput.prototype.beginFocus = function (shouldFocus, inputRelativeY) {
            if (this._relocated !== shouldFocus) {
                var focusedInputEle = this.element();
                if (shouldFocus) {
                    if (this._clone) {
                        var clonedInputEle = cloneInput(focusedInputEle, 'cloned-focus');
                        focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
                        focusedInputEle.style[dom_1.CSS.transform] = "translate3d(-9999px," + inputRelativeY + "px,0)";
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
                        focusedInputEle.style[dom_1.CSS.transform] = '';
                        focusedInputEle.style.opacity = '';
                        removeClone(focusedInputEle, 'cloned-focus');
                    }
                }
                this._relocated = shouldFocus;
            }
        };
        NativeInput.prototype.hideFocus = function (shouldHideFocus) {
            var focusedInputEle = this.element();
            (void 0);
            if (shouldHideFocus) {
                var clonedInputEle = cloneInput(focusedInputEle, 'cloned-move');
                focusedInputEle.classList.add('cloned-active');
                focusedInputEle.parentNode.insertBefore(clonedInputEle, focusedInputEle);
            }
            else {
                focusedInputEle.classList.remove('cloned-active');
                removeClone(focusedInputEle, 'cloned-move');
            }
        };
        NativeInput.prototype.hasFocus = function () {
            return dom_1.hasFocus(this.element());
        };
        NativeInput.prototype.getValue = function () {
            return this.element().value;
        };
        NativeInput.prototype.setElementClass = function (cssClass, shouldAdd) {
            this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
        };
        NativeInput.prototype.element = function () {
            return this._elementRef.nativeElement;
        };
        NativeInput.prototype.ngOnDestroy = function () {
            this._unrefBlur && this._unrefBlur();
        };
        NativeInput.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '.text-input'
                    },] },
        ];
        NativeInput.ctorParameters = [
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: config_1.Config, },
            { type: forms_1.NgControl, },
        ];
        NativeInput.propDecorators = {
            'focusChange': [{ type: core_1.Output },],
            'valueChange': [{ type: core_1.Output },],
            '_change': [{ type: core_1.HostListener, args: ['input', ['$event'],] },],
            '_focus': [{ type: core_1.HostListener, args: ['focus',] },],
            '_blur': [{ type: core_1.HostListener, args: ['blur',] },],
        };
        return NativeInput;
    }());
    exports.NativeInput = NativeInput;
    function cloneInput(focusedInputEle, addCssClass) {
        var clonedInputEle = focusedInputEle.cloneNode(true);
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
        var clonedInputEle = focusedInputEle.parentElement.querySelector('.' + queryCssClass);
        if (clonedInputEle) {
            clonedInputEle.parentNode.removeChild(clonedInputEle);
        }
    }
    var NextInput = (function () {
        function NextInput() {
            this.focused = new core_1.EventEmitter();
        }
        NextInput.prototype.receivedFocus = function () {
            (void 0);
            this.focused.emit(true);
        };
        NextInput.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '[next-input]'
                    },] },
        ];
        NextInput.ctorParameters = [];
        NextInput.propDecorators = {
            'focused': [{ type: core_1.Output },],
            'receivedFocus': [{ type: core_1.HostListener, args: ['focus',] },],
        };
        return NextInput;
    }());
    exports.NextInput = NextInput;
});
//# sourceMappingURL=native-input.js.map