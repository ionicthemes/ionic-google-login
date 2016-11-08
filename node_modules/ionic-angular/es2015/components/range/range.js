import { Component, ElementRef, EventEmitter, forwardRef, Input, Inject, Optional, Output, Renderer, ViewChild, ViewChildren, ViewEncapsulation } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { clamp, isNumber, isPresent, isString, isTrueProperty } from '../../util/util';
import { Config } from '../../config/config';
import { TimeoutDebouncer } from '../../util/debouncer';
import { Form } from '../../util/form';
import { Ion } from '../ion';
import { Item } from '../item/item';
import { pointerCoord, raf } from '../../util/dom';
import { Haptic } from '../../util/haptic';
import { UIEventManager } from '../../util/ui-event-manager';
export const RANGE_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => Range),
    multi: true
};
export class RangeKnob {
    constructor(range) {
        this.range = range;
    }
    get ratio() {
        return this._ratio;
    }
    set ratio(ratio) {
        this._ratio = clamp(0, ratio, 1);
        this._val = this.range.ratioToValue(this._ratio);
        if (this.range.snaps) {
            this._ratio = this.range.valueToRatio(this._val);
        }
    }
    get value() {
        return this._val;
    }
    set value(val) {
        if (isString(val)) {
            val = Math.round(val);
        }
        if (isNumber(val) && !isNaN(val)) {
            this._ratio = this.range.valueToRatio(val);
            this._val = this.range.ratioToValue(this._ratio);
        }
    }
    position() {
        this._x = `${this._ratio * 100}%`;
    }
    ngOnInit() {
        if (isPresent(this.range.value)) {
            if (this.range.dualKnobs) {
                if (this.upper) {
                    this.value = this.range.value.upper;
                }
                else {
                    this.value = this.range.value.lower;
                }
            }
            else {
                this.value = this.range.value;
            }
        }
        else {
            this.ratio = ((this.range.dualKnobs && this.upper) ? 1 : 0);
        }
        this.position();
    }
}
RangeKnob.decorators = [
    { type: Component, args: [{
                selector: '.range-knob-handle',
                template: '<div class="range-pin" *ngIf="range.pin">{{_val}}</div>' +
                    '<div class="range-knob"></div>',
                host: {
                    '[class.range-knob-pressed]': 'pressed',
                    '[class.range-knob-min]': '_val===range.min',
                    '[class.range-knob-max]': '_val===range.max',
                    '[style.left]': '_x',
                    '[attr.aria-valuenow]': '_val',
                    '[attr.aria-valuemin]': 'range.min',
                    '[attr.aria-valuemax]': 'range.max',
                    'role': 'slider',
                    'tabindex': '0'
                }
            },] },
];
RangeKnob.ctorParameters = [
    { type: Range, decorators: [{ type: Inject, args: [forwardRef(() => Range),] },] },
];
RangeKnob.propDecorators = {
    'upper': [{ type: Input },],
};
export class Range extends Ion {
    constructor(_form, _haptic, _item, config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this._form = _form;
        this._haptic = _haptic;
        this._item = _item;
        this._dual = false;
        this._disabled = false;
        this._start = null;
        this._min = 0;
        this._max = 100;
        this._step = 1;
        this._snaps = false;
        this._debouncer = new TimeoutDebouncer(0);
        this._events = new UIEventManager();
        this.ionChange = new EventEmitter();
        this.mode = config.get('mode');
        _form.register(this);
        if (_item) {
            this.id = 'rng-' + _item.registerInput('range');
            this._labelId = 'lbl-' + _item.id;
            _item.setElementClass('item-range', true);
        }
    }
    set color(val) {
        this._setColor('range', val);
    }
    set mode(val) {
        this._setMode('range', val);
    }
    get min() {
        return this._min;
    }
    set min(val) {
        val = Math.round(val);
        if (!isNaN(val)) {
            this._min = val;
        }
    }
    get max() {
        return this._max;
    }
    set max(val) {
        val = Math.round(val);
        if (!isNaN(val)) {
            this._max = val;
        }
    }
    get step() {
        return this._step;
    }
    set step(val) {
        val = Math.round(val);
        if (!isNaN(val) && val > 0) {
            this._step = val;
        }
    }
    get snaps() {
        return this._snaps;
    }
    set snaps(val) {
        this._snaps = isTrueProperty(val);
    }
    get pin() {
        return this._pin;
    }
    set pin(val) {
        this._pin = isTrueProperty(val);
    }
    get debounce() {
        return this._debouncer.wait;
    }
    set debounce(val) {
        this._debouncer.wait = val;
    }
    get dualKnobs() {
        return this._dual;
    }
    set dualKnobs(val) {
        this._dual = isTrueProperty(val);
    }
    ngAfterViewInit() {
        let barL = '';
        let barR = '';
        let firstRatio = this._knobs.first.ratio;
        if (this._dual) {
            let lastRatio = this._knobs.last.ratio;
            barL = `${(Math.min(firstRatio, lastRatio) * 100)}%`;
            barR = `${100 - (Math.max(firstRatio, lastRatio) * 100)}%`;
        }
        else {
            barR = `${100 - (firstRatio * 100)}%`;
        }
        this._renderer.setElementStyle(this._bar.nativeElement, 'left', barL);
        this._renderer.setElementStyle(this._bar.nativeElement, 'right', barR);
        this._events.pointerEvents({
            elementRef: this._slider,
            pointerDown: this.pointerDown.bind(this),
            pointerMove: this.pointerMove.bind(this),
            pointerUp: this.pointerUp.bind(this)
        });
        this.createTicks();
    }
    pointerDown(ev) {
        if (this._disabled) {
            return false;
        }
        (void 0);
        ev.preventDefault();
        ev.stopPropagation();
        this._start = pointerCoord(ev);
        let rect = this._rect = this._slider.nativeElement.getBoundingClientRect();
        if (this._start.x < rect.left) {
            rect.xOffset = (this._start.x - rect.left);
        }
        else if (this._start.x > rect.right) {
            rect.xOffset = (this._start.x - rect.right);
        }
        else {
            rect.xOffset = 0;
        }
        this.setActiveKnob(this._start, rect);
        this.updateKnob(this._start, rect);
        this._active.position();
        this._pressed = this._active.pressed = true;
        this._haptic.gestureSelectionStart();
        return true;
    }
    pointerMove(ev) {
        (void 0);
        ev.preventDefault();
        ev.stopPropagation();
        this.updateKnob(pointerCoord(ev), this._rect);
        this._active.position();
        this._pressed = this._active.pressed = true;
    }
    pointerUp(ev) {
        (void 0);
        ev.preventDefault();
        ev.stopPropagation();
        this.updateKnob(pointerCoord(ev), this._rect);
        this._active.position();
        this._haptic.gestureSelectionEnd();
        this._start = this._active = null;
        this._pressed = this._knobs.first.pressed = this._knobs.last.pressed = false;
    }
    setActiveKnob(current, rect) {
        let ratio = (current.x - rect.left) / (rect.width);
        if (this._dual && Math.abs(ratio - this._knobs.first.ratio) > Math.abs(ratio - this._knobs.last.ratio)) {
            this._active = this._knobs.last;
        }
        else {
            this._active = this._knobs.first;
        }
    }
    updateKnob(current, rect) {
        if (this._active) {
            let oldVal = this._active.value;
            this._active.ratio = (current.x - rect.left) / (rect.width);
            let newVal = this._active.value;
            if (oldVal !== newVal) {
                if (this.snaps) {
                    this._haptic.gestureSelectionChanged();
                }
                if (this._dual) {
                    this.value = {
                        lower: Math.min(this._knobs.first.value, this._knobs.last.value),
                        upper: Math.max(this._knobs.first.value, this._knobs.last.value),
                    };
                }
                else {
                    this.value = newVal;
                }
                this._debouncer.debounce(() => {
                    this.onChange(this.value);
                    this.ionChange.emit(this);
                });
            }
            this.updateBar();
        }
    }
    updateBar() {
        let firstRatio = this._knobs.first.ratio;
        if (this._dual) {
            let lastRatio = this._knobs.last.ratio;
            this._barL = `${(Math.min(firstRatio, lastRatio) * 100)}%`;
            this._barR = `${100 - (Math.max(firstRatio, lastRatio) * 100)}%`;
        }
        else {
            this._barL = '';
            this._barR = `${100 - (firstRatio * 100)}%`;
        }
        this.updateTicks();
    }
    createTicks() {
        if (this._snaps) {
            raf(() => {
                this._ticks = [];
                for (var value = this._min; value <= this._max; value += this._step) {
                    var ratio = this.valueToRatio(value);
                    this._ticks.push({
                        ratio: ratio,
                        left: `${ratio * 100}%`,
                    });
                }
                this.updateTicks();
            });
        }
    }
    updateTicks() {
        if (this._snaps && this._ticks) {
            let ratio = this.ratio;
            if (this._dual) {
                let upperRatio = this.ratioUpper;
                this._ticks.forEach(t => {
                    t.active = (t.ratio >= ratio && t.ratio <= upperRatio);
                });
            }
            else {
                this._ticks.forEach(t => {
                    t.active = (t.ratio <= ratio);
                });
            }
        }
    }
    ratioToValue(ratio) {
        ratio = Math.round(((this._max - this._min) * ratio));
        ratio = Math.round(ratio / this._step) * this._step + this._min;
        return clamp(this._min, ratio, this._max);
    }
    valueToRatio(value) {
        value = Math.round((value - this._min) / this._step) * this._step;
        value = value / (this._max - this._min);
        return clamp(0, value, 1);
    }
    writeValue(val) {
        if (isPresent(val)) {
            let knobs = this._knobs;
            this.value = val;
            if (this._knobs) {
                if (this._dual) {
                    knobs.first.value = val.lower;
                    knobs.last.value = val.upper;
                    knobs.last.position();
                }
                else {
                    knobs.first.value = val;
                }
                knobs.first.position();
                this.updateBar();
            }
        }
    }
    registerOnChange(fn) {
        this._fn = fn;
        this.onChange = (val) => {
            fn(val);
            this.onTouched();
        };
    }
    registerOnTouched(fn) { this.onTouched = fn; }
    get disabled() {
        return this._disabled;
    }
    set disabled(val) {
        this._disabled = isTrueProperty(val);
        this._item && this._item.setElementClass('item-range-disabled', this._disabled);
    }
    get ratio() {
        if (this._dual) {
            return Math.min(this._knobs.first.ratio, this._knobs.last.ratio);
        }
        return this._knobs.first.ratio;
    }
    get ratioUpper() {
        if (this._dual) {
            return Math.max(this._knobs.first.ratio, this._knobs.last.ratio);
        }
        return null;
    }
    onChange(val) {
        this.onTouched();
    }
    onTouched() { }
    ngOnDestroy() {
        this._form.deregister(this);
        this._events.unlistenAll();
    }
}
Range.decorators = [
    { type: Component, args: [{
                selector: 'ion-range',
                template: '<ng-content select="[range-left]"></ng-content>' +
                    '<div class="range-slider" #slider>' +
                    '<div class="range-tick" *ngFor="let t of _ticks" [style.left]="t.left" [class.range-tick-active]="t.active"></div>' +
                    '<div class="range-bar"></div>' +
                    '<div class="range-bar range-bar-active" [style.left]="_barL" [style.right]="_barR" #bar></div>' +
                    '<div class="range-knob-handle"></div>' +
                    '<div class="range-knob-handle" [upper]="true" *ngIf="_dual"></div>' +
                    '</div>' +
                    '<ng-content select="[range-right]"></ng-content>',
                host: {
                    '[class.range-disabled]': '_disabled',
                    '[class.range-pressed]': '_pressed',
                    '[class.range-has-pin]': '_pin'
                },
                providers: [RANGE_VALUE_ACCESSOR],
                encapsulation: ViewEncapsulation.None,
            },] },
];
Range.ctorParameters = [
    { type: Form, },
    { type: Haptic, },
    { type: Item, decorators: [{ type: Optional },] },
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Range.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    '_bar': [{ type: ViewChild, args: ['bar',] },],
    '_slider': [{ type: ViewChild, args: ['slider',] },],
    '_knobs': [{ type: ViewChildren, args: [RangeKnob,] },],
    'min': [{ type: Input },],
    'max': [{ type: Input },],
    'step': [{ type: Input },],
    'snaps': [{ type: Input },],
    'pin': [{ type: Input },],
    'debounce': [{ type: Input },],
    'dualKnobs': [{ type: Input },],
    'ionChange': [{ type: Output },],
    'disabled': [{ type: Input },],
};
//# sourceMappingURL=range.js.map