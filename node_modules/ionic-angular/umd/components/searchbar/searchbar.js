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
        define(["require", "exports", '@angular/core', '@angular/forms', '../../config/config', '../ion', '../../util/util', '../../util/debouncer'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var debouncer_1 = require('../../util/debouncer');
    var Searchbar = (function (_super) {
        __extends(Searchbar, _super);
        function Searchbar(config, elementRef, renderer, ngControl) {
            _super.call(this, config, elementRef, renderer);
            this._value = '';
            this._shouldBlur = true;
            this._shouldAlignLeft = true;
            this._isCancelVisible = false;
            this._spellcheck = false;
            this._autocomplete = 'off';
            this._autocorrect = 'off';
            this._isActive = false;
            this._debouncer = new debouncer_1.TimeoutDebouncer(250);
            this.cancelButtonText = 'Cancel';
            this.showCancelButton = false;
            this.placeholder = 'Search';
            this.type = 'search';
            this.animated = false;
            this.ionInput = new core_1.EventEmitter();
            this.ionBlur = new core_1.EventEmitter();
            this.ionFocus = new core_1.EventEmitter();
            this.ionCancel = new core_1.EventEmitter();
            this.ionClear = new core_1.EventEmitter();
            this.onChange = function (_) { };
            this.onTouched = function () { };
            this.mode = config.get('mode');
            if (ngControl) {
                ngControl.valueAccessor = this;
            }
        }
        Object.defineProperty(Searchbar.prototype, "color", {
            set: function (val) {
                this._setColor('searchbar', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Searchbar.prototype, "mode", {
            set: function (val) {
                this._setMode('searchbar', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Searchbar.prototype, "debounce", {
            get: function () {
                return this._debouncer.wait;
            },
            set: function (val) {
                this._debouncer.wait = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Searchbar.prototype, "autocomplete", {
            set: function (val) {
                this._autocomplete = (val === '' || val === 'on') ? 'on' : this._config.get('autocomplete', 'off');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Searchbar.prototype, "autocorrect", {
            set: function (val) {
                this._autocorrect = (val === '' || val === 'on') ? 'on' : this._config.get('autocorrect', 'off');
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Searchbar.prototype, "spellcheck", {
            set: function (val) {
                this._spellcheck = (val === '' || val === 'true' || val === true) ? true : this._config.getBoolean('spellcheck', false);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Searchbar.prototype, "value", {
            get: function () {
                return this._value;
            },
            set: function (val) {
                this._value = val;
                if (this._searchbarInput) {
                    var ele = this._searchbarInput.nativeElement;
                    if (ele) {
                        ele.value = val;
                    }
                }
            },
            enumerable: true,
            configurable: true
        });
        Searchbar.prototype.ngOnInit = function () {
            var showCancelButton = this.showCancelButton;
            if (typeof showCancelButton === 'string') {
                this.showCancelButton = (showCancelButton === '' || showCancelButton === 'true');
            }
        };
        Searchbar.prototype.ngAfterContentInit = function () {
            this.positionElements();
        };
        Searchbar.prototype.positionElements = function () {
            var isAnimated = util_1.isTrueProperty(this.animated);
            var prevAlignLeft = this._shouldAlignLeft;
            var shouldAlignLeft = (!isAnimated || (this._value && this._value.toString().trim() !== '') || this._sbHasFocus === true);
            this._shouldAlignLeft = shouldAlignLeft;
            if (this._mode !== 'ios') {
                return;
            }
            if (prevAlignLeft !== shouldAlignLeft) {
                this.positionPlaceholder();
            }
            if (isAnimated) {
                this.positionCancelButton();
            }
        };
        Searchbar.prototype.positionPlaceholder = function () {
            if (!this._searchbarInput || !this._searchbarIcon) {
                return;
            }
            var inputEle = this._searchbarInput.nativeElement;
            var iconEle = this._searchbarIcon.nativeElement;
            if (this._shouldAlignLeft) {
                inputEle.removeAttribute('style');
                iconEle.removeAttribute('style');
            }
            else {
                var tempSpan = document.createElement('span');
                tempSpan.innerHTML = this.placeholder;
                document.body.appendChild(tempSpan);
                var textWidth = tempSpan.offsetWidth;
                tempSpan.remove();
                var inputLeft = 'calc(50% - ' + (textWidth / 2) + 'px)';
                inputEle.style.paddingLeft = inputLeft;
                var iconLeft = 'calc(50% - ' + ((textWidth / 2) + 30) + 'px)';
                iconEle.style.marginLeft = iconLeft;
            }
        };
        Searchbar.prototype.positionCancelButton = function () {
            if (!this._cancelButton || !this._cancelButton.nativeElement) {
                return;
            }
            var showShowCancel = this._sbHasFocus;
            if (showShowCancel !== this._isCancelVisible) {
                var cancelStyleEle = this._cancelButton.nativeElement;
                var cancelStyle = cancelStyleEle.style;
                this._isCancelVisible = showShowCancel;
                if (showShowCancel) {
                    cancelStyle.marginRight = '0';
                }
                else {
                    var offset = cancelStyleEle.offsetWidth;
                    if (offset > 0) {
                        cancelStyle.marginRight = -offset + 'px';
                    }
                }
            }
        };
        Searchbar.prototype.inputChanged = function (ev) {
            var _this = this;
            this._value = ev.target.value;
            this._debouncer.debounce(function () {
                _this.onChange(_this._value);
                _this.ionInput.emit(ev);
            });
        };
        Searchbar.prototype.inputFocused = function (ev) {
            this.ionFocus.emit(ev);
            this._sbHasFocus = true;
            this._isActive = true;
            this.positionElements();
        };
        Searchbar.prototype.inputBlurred = function (ev) {
            if (this._shouldBlur === false) {
                this._searchbarInput.nativeElement.focus();
                this._shouldBlur = true;
                return;
            }
            this.ionBlur.emit(ev);
            this._sbHasFocus = false;
            this.positionElements();
        };
        Searchbar.prototype.clearInput = function (ev) {
            var _this = this;
            this.ionClear.emit(ev);
            setTimeout(function () {
                var value = _this._value;
                if (util_1.isPresent(value) && value !== '') {
                    _this.value = '';
                    _this.onChange(_this._value);
                    _this.ionInput.emit(ev);
                }
            }, 16 * 4);
            this._shouldBlur = false;
        };
        Searchbar.prototype.cancelSearchbar = function (ev) {
            this.ionCancel.emit(ev);
            this.clearInput(ev);
            this._shouldBlur = true;
            this._isActive = false;
        };
        Searchbar.prototype.writeValue = function (val) {
            this.value = val;
            this.positionElements();
        };
        Searchbar.prototype.registerOnChange = function (fn) {
            this.onChange = fn;
        };
        Searchbar.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        Searchbar.prototype.setFocus = function () {
            this._renderer.invokeElementMethod(this._searchbarInput.nativeElement, 'focus');
        };
        Searchbar.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-searchbar',
                        template: '<div class="searchbar-input-container">' +
                            '<button ion-button mode="md" (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" clear color="dark" class="searchbar-md-cancel" type="button">' +
                            '<ion-icon name="md-arrow-back"></ion-icon>' +
                            '</button>' +
                            '<div #searchbarIcon class="searchbar-search-icon"></div>' +
                            '<input #searchbarInput class="searchbar-input" (input)="inputChanged($event)" (blur)="inputBlurred($event)" (focus)="inputFocused($event)" ' +
                            '[attr.placeholder]="placeholder" ' +
                            '[attr.type]="type" ' +
                            '[attr.autocomplete]="_autocomplete" ' +
                            '[attr.autocorrect]="_autocorrect" ' +
                            '[attr.spellcheck]="_spellcheck">' +
                            '<button ion-button clear class="searchbar-clear-icon" [mode]="_mode" (click)="clearInput($event)" (mousedown)="clearInput($event)" type="button"></button>' +
                            '</div>' +
                            '<button ion-button #cancelButton mode="ios" [tabindex]="_isActive ? 1 : -1" clear (click)="cancelSearchbar($event)" (mousedown)="cancelSearchbar($event)" class="searchbar-ios-cancel" type="button">{{cancelButtonText}}</button>',
                        host: {
                            '[class.searchbar-animated]': 'animated',
                            '[class.searchbar-has-value]': '_value',
                            '[class.searchbar-active]': '_isActive',
                            '[class.searchbar-show-cancel]': 'showCancelButton',
                            '[class.searchbar-left-aligned]': '_shouldAlignLeft'
                        },
                        encapsulation: core_1.ViewEncapsulation.None
                    },] },
        ];
        Searchbar.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: forms_1.NgControl, decorators: [{ type: core_1.Optional },] },
        ];
        Searchbar.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'cancelButtonText': [{ type: core_1.Input },],
            'showCancelButton': [{ type: core_1.Input },],
            'debounce': [{ type: core_1.Input },],
            'placeholder': [{ type: core_1.Input },],
            'autocomplete': [{ type: core_1.Input },],
            'autocorrect': [{ type: core_1.Input },],
            'spellcheck': [{ type: core_1.Input },],
            'type': [{ type: core_1.Input },],
            'animated': [{ type: core_1.Input },],
            'ionInput': [{ type: core_1.Output },],
            'ionBlur': [{ type: core_1.Output },],
            'ionFocus': [{ type: core_1.Output },],
            'ionCancel': [{ type: core_1.Output },],
            'ionClear': [{ type: core_1.Output },],
            '_sbHasFocus': [{ type: core_1.HostBinding, args: ['class.searchbar-has-focus',] },],
            '_searchbarInput': [{ type: core_1.ViewChild, args: ['searchbarInput',] },],
            '_searchbarIcon': [{ type: core_1.ViewChild, args: ['searchbarIcon',] },],
            '_cancelButton': [{ type: core_1.ViewChild, args: ['cancelButton', { read: core_1.ElementRef },] },],
            'value': [{ type: core_1.Input },],
        };
        return Searchbar;
    }(ion_1.Ion));
    exports.Searchbar = Searchbar;
});
//# sourceMappingURL=searchbar.js.map