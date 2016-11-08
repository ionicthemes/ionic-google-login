import { Component, ElementRef, EventEmitter, HostBinding, Input, Optional, Output, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isPresent, isTrueProperty } from '../../util/util';
import { TimeoutDebouncer } from '../../util/debouncer';
export class Searchbar extends Ion {
    constructor(config, elementRef, renderer, ngControl) {
        super(config, elementRef, renderer);
        this._value = '';
        this._shouldBlur = true;
        this._shouldAlignLeft = true;
        this._isCancelVisible = false;
        this._spellcheck = false;
        this._autocomplete = 'off';
        this._autocorrect = 'off';
        this._isActive = false;
        this._debouncer = new TimeoutDebouncer(250);
        this.cancelButtonText = 'Cancel';
        this.showCancelButton = false;
        this.placeholder = 'Search';
        this.type = 'search';
        this.animated = false;
        this.ionInput = new EventEmitter();
        this.ionBlur = new EventEmitter();
        this.ionFocus = new EventEmitter();
        this.ionCancel = new EventEmitter();
        this.ionClear = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = () => { };
        this.mode = config.get('mode');
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    set color(val) {
        this._setColor('searchbar', val);
    }
    set mode(val) {
        this._setMode('searchbar', val);
    }
    get debounce() {
        return this._debouncer.wait;
    }
    set debounce(val) {
        this._debouncer.wait = val;
    }
    set autocomplete(val) {
        this._autocomplete = (val === '' || val === 'on') ? 'on' : this._config.get('autocomplete', 'off');
    }
    set autocorrect(val) {
        this._autocorrect = (val === '' || val === 'on') ? 'on' : this._config.get('autocorrect', 'off');
    }
    set spellcheck(val) {
        this._spellcheck = (val === '' || val === 'true' || val === true) ? true : this._config.getBoolean('spellcheck', false);
    }
    get value() {
        return this._value;
    }
    set value(val) {
        this._value = val;
        if (this._searchbarInput) {
            let ele = this._searchbarInput.nativeElement;
            if (ele) {
                ele.value = val;
            }
        }
    }
    ngOnInit() {
        let showCancelButton = this.showCancelButton;
        if (typeof showCancelButton === 'string') {
            this.showCancelButton = (showCancelButton === '' || showCancelButton === 'true');
        }
    }
    ngAfterContentInit() {
        this.positionElements();
    }
    positionElements() {
        let isAnimated = isTrueProperty(this.animated);
        let prevAlignLeft = this._shouldAlignLeft;
        let shouldAlignLeft = (!isAnimated || (this._value && this._value.toString().trim() !== '') || this._sbHasFocus === true);
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
    }
    positionPlaceholder() {
        if (!this._searchbarInput || !this._searchbarIcon) {
            return;
        }
        let inputEle = this._searchbarInput.nativeElement;
        let iconEle = this._searchbarIcon.nativeElement;
        if (this._shouldAlignLeft) {
            inputEle.removeAttribute('style');
            iconEle.removeAttribute('style');
        }
        else {
            let tempSpan = document.createElement('span');
            tempSpan.innerHTML = this.placeholder;
            document.body.appendChild(tempSpan);
            let textWidth = tempSpan.offsetWidth;
            tempSpan.remove();
            let inputLeft = 'calc(50% - ' + (textWidth / 2) + 'px)';
            inputEle.style.paddingLeft = inputLeft;
            let iconLeft = 'calc(50% - ' + ((textWidth / 2) + 30) + 'px)';
            iconEle.style.marginLeft = iconLeft;
        }
    }
    positionCancelButton() {
        if (!this._cancelButton || !this._cancelButton.nativeElement) {
            return;
        }
        let showShowCancel = this._sbHasFocus;
        if (showShowCancel !== this._isCancelVisible) {
            let cancelStyleEle = this._cancelButton.nativeElement;
            let cancelStyle = cancelStyleEle.style;
            this._isCancelVisible = showShowCancel;
            if (showShowCancel) {
                cancelStyle.marginRight = '0';
            }
            else {
                let offset = cancelStyleEle.offsetWidth;
                if (offset > 0) {
                    cancelStyle.marginRight = -offset + 'px';
                }
            }
        }
    }
    inputChanged(ev) {
        this._value = ev.target.value;
        this._debouncer.debounce(() => {
            this.onChange(this._value);
            this.ionInput.emit(ev);
        });
    }
    inputFocused(ev) {
        this.ionFocus.emit(ev);
        this._sbHasFocus = true;
        this._isActive = true;
        this.positionElements();
    }
    inputBlurred(ev) {
        if (this._shouldBlur === false) {
            this._searchbarInput.nativeElement.focus();
            this._shouldBlur = true;
            return;
        }
        this.ionBlur.emit(ev);
        this._sbHasFocus = false;
        this.positionElements();
    }
    clearInput(ev) {
        this.ionClear.emit(ev);
        setTimeout(() => {
            let value = this._value;
            if (isPresent(value) && value !== '') {
                this.value = '';
                this.onChange(this._value);
                this.ionInput.emit(ev);
            }
        }, 16 * 4);
        this._shouldBlur = false;
    }
    cancelSearchbar(ev) {
        this.ionCancel.emit(ev);
        this.clearInput(ev);
        this._shouldBlur = true;
        this._isActive = false;
    }
    writeValue(val) {
        this.value = val;
        this.positionElements();
    }
    registerOnChange(fn) {
        this.onChange = fn;
    }
    registerOnTouched(fn) {
        this.onTouched = fn;
    }
    setFocus() {
        this._renderer.invokeElementMethod(this._searchbarInput.nativeElement, 'focus');
    }
}
Searchbar.decorators = [
    { type: Component, args: [{
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
                encapsulation: ViewEncapsulation.None
            },] },
];
Searchbar.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgControl, decorators: [{ type: Optional },] },
];
Searchbar.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'cancelButtonText': [{ type: Input },],
    'showCancelButton': [{ type: Input },],
    'debounce': [{ type: Input },],
    'placeholder': [{ type: Input },],
    'autocomplete': [{ type: Input },],
    'autocorrect': [{ type: Input },],
    'spellcheck': [{ type: Input },],
    'type': [{ type: Input },],
    'animated': [{ type: Input },],
    'ionInput': [{ type: Output },],
    'ionBlur': [{ type: Output },],
    'ionFocus': [{ type: Output },],
    'ionCancel': [{ type: Output },],
    'ionClear': [{ type: Output },],
    '_sbHasFocus': [{ type: HostBinding, args: ['class.searchbar-has-focus',] },],
    '_searchbarInput': [{ type: ViewChild, args: ['searchbarInput',] },],
    '_searchbarIcon': [{ type: ViewChild, args: ['searchbarIcon',] },],
    '_cancelButton': [{ type: ViewChild, args: ['cancelButton', { read: ElementRef },] },],
    'value': [{ type: Input },],
};
//# sourceMappingURL=searchbar.js.map