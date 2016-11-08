import { Component, ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Optional, Renderer, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isPresent, isTrueProperty } from '../../util/util';
export class SegmentButton {
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._disabled = false;
        this.ionSelect = new EventEmitter();
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        this._setElementClass('segment-button-disabled', this._disabled);
    }
    _setElementClass(cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    }
    onClick() {
        (void 0);
        this.ionSelect.emit(this);
    }
    ngOnInit() {
        if (!isPresent(this.value)) {
            console.warn('<ion-segment-button> requires a "value" attribute');
        }
    }
    set isActive(isActive) {
        this._renderer.setElementClass(this._elementRef.nativeElement, 'segment-activated', isActive);
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-pressed', isActive);
    }
}
SegmentButton.decorators = [
    { type: Component, args: [{
                selector: 'ion-segment-button',
                template: '<ng-content></ng-content>' +
                    '<div class="button-effect"></div>',
                host: {
                    'tappable': '',
                    'class': 'segment-button',
                    'role': 'button'
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
SegmentButton.ctorParameters = [
    { type: Renderer, },
    { type: ElementRef, },
];
SegmentButton.propDecorators = {
    'value': [{ type: Input },],
    'ionSelect': [{ type: Output },],
    'disabled': [{ type: Input },],
    'onClick': [{ type: HostListener, args: ['click',] },],
};
export class Segment extends Ion {
    constructor(config, elementRef, renderer, ngControl) {
        super(config, elementRef, renderer);
        this._disabled = false;
        this.ionChange = new EventEmitter();
        this.onChange = (_) => { };
        this.onTouched = (_) => { };
        this.mode = config.get('mode');
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    set color(val) {
        this._setColor('segment', val);
    }
    set mode(val) {
        this._setMode('segment', val);
    }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        if (this._buttons) {
            this._buttons.forEach(button => {
                button._setElementClass('segment-button-disabled', this._disabled);
            });
        }
    }
    writeValue(value) {
        this.value = isPresent(value) ? value : '';
        if (this._buttons) {
            let buttons = this._buttons.toArray();
            for (let button of buttons) {
                button.isActive = (button.value === this.value);
            }
        }
    }
    ngAfterViewInit() {
        this._buttons.forEach(button => {
            button.ionSelect.subscribe((selectedButton) => {
                this.writeValue(selectedButton.value);
                this.onChange(selectedButton.value);
                this.ionChange.emit(selectedButton);
            });
            if (isPresent(this.value)) {
                button.isActive = (button.value === this.value);
            }
            if (isTrueProperty(this._disabled)) {
                button._setElementClass('segment-button-disabled', this._disabled);
            }
        });
    }
    registerOnChange(fn) { this.onChange = fn; }
    registerOnTouched(fn) { this.onTouched = fn; }
}
Segment.decorators = [
    { type: Directive, args: [{
                selector: 'ion-segment'
            },] },
];
Segment.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
    { type: NgControl, decorators: [{ type: Optional },] },
];
Segment.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'ionChange': [{ type: Output },],
    '_buttons': [{ type: ContentChildren, args: [SegmentButton,] },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=segment.js.map