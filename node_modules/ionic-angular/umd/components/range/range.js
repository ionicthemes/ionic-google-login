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
        define(["require", "exports", '@angular/core', '@angular/forms', '../../util/util', '../../config/config', '../../util/debouncer', '../../util/form', '../ion', '../item/item', '../../util/dom', '../../util/haptic', '../../util/ui-event-manager'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var util_1 = require('../../util/util');
    var config_1 = require('../../config/config');
    var debouncer_1 = require('../../util/debouncer');
    var form_1 = require('../../util/form');
    var ion_1 = require('../ion');
    var item_1 = require('../item/item');
    var dom_1 = require('../../util/dom');
    var haptic_1 = require('../../util/haptic');
    var ui_event_manager_1 = require('../../util/ui-event-manager');
    exports.RANGE_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return Range; }),
        multi: true
    };
    var RangeKnob = (function () {
        function RangeKnob(range) {
            this.range = range;
        }
        Object.defineProperty(RangeKnob.prototype, "ratio", {
            get: function () {
                return this._ratio;
            },
            set: function (ratio) {
                this._ratio = util_1.clamp(0, ratio, 1);
                this._val = this.range.ratioToValue(this._ratio);
                if (this.range.snaps) {
                    this._ratio = this.range.valueToRatio(this._val);
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(RangeKnob.prototype, "value", {
            get: function () {
                return this._val;
            },
            set: function (val) {
                if (util_1.isString(val)) {
                    val = Math.round(val);
                }
                if (util_1.isNumber(val) && !isNaN(val)) {
                    this._ratio = this.range.valueToRatio(val);
                    this._val = this.range.ratioToValue(this._ratio);
                }
            },
            enumerable: true,
            configurable: true
        });
        RangeKnob.prototype.position = function () {
            this._x = this._ratio * 100 + "%";
        };
        RangeKnob.prototype.ngOnInit = function () {
            if (util_1.isPresent(this.range.value)) {
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
        };
        RangeKnob.decorators = [
            { type: core_1.Component, args: [{
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
            { type: Range, decorators: [{ type: core_1.Inject, args: [core_1.forwardRef(function () { return Range; }),] },] },
        ];
        RangeKnob.propDecorators = {
            'upper': [{ type: core_1.Input },],
        };
        return RangeKnob;
    }());
    exports.RangeKnob = RangeKnob;
    var Range = (function (_super) {
        __extends(Range, _super);
        function Range(_form, _haptic, _item, config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
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
            this._debouncer = new debouncer_1.TimeoutDebouncer(0);
            this._events = new ui_event_manager_1.UIEventManager();
            this.ionChange = new core_1.EventEmitter();
            this.mode = config.get('mode');
            _form.register(this);
            if (_item) {
                this.id = 'rng-' + _item.registerInput('range');
                this._labelId = 'lbl-' + _item.id;
                _item.setElementClass('item-range', true);
            }
        }
        Object.defineProperty(Range.prototype, "color", {
            set: function (val) {
                this._setColor('range', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "mode", {
            set: function (val) {
                this._setMode('range', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "min", {
            get: function () {
                return this._min;
            },
            set: function (val) {
                val = Math.round(val);
                if (!isNaN(val)) {
                    this._min = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "max", {
            get: function () {
                return this._max;
            },
            set: function (val) {
                val = Math.round(val);
                if (!isNaN(val)) {
                    this._max = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "step", {
            get: function () {
                return this._step;
            },
            set: function (val) {
                val = Math.round(val);
                if (!isNaN(val) && val > 0) {
                    this._step = val;
                }
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "snaps", {
            get: function () {
                return this._snaps;
            },
            set: function (val) {
                this._snaps = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "pin", {
            get: function () {
                return this._pin;
            },
            set: function (val) {
                this._pin = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "debounce", {
            get: function () {
                return this._debouncer.wait;
            },
            set: function (val) {
                this._debouncer.wait = val;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "dualKnobs", {
            get: function () {
                return this._dual;
            },
            set: function (val) {
                this._dual = util_1.isTrueProperty(val);
            },
            enumerable: true,
            configurable: true
        });
        Range.prototype.ngAfterViewInit = function () {
            var barL = '';
            var barR = '';
            var firstRatio = this._knobs.first.ratio;
            if (this._dual) {
                var lastRatio = this._knobs.last.ratio;
                barL = (Math.min(firstRatio, lastRatio) * 100) + "%";
                barR = (100 - (Math.max(firstRatio, lastRatio) * 100)) + "%";
            }
            else {
                barR = (100 - (firstRatio * 100)) + "%";
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
        };
        Range.prototype.pointerDown = function (ev) {
            if (this._disabled) {
                return false;
            }
            (void 0);
            ev.preventDefault();
            ev.stopPropagation();
            this._start = dom_1.pointerCoord(ev);
            var rect = this._rect = this._slider.nativeElement.getBoundingClientRect();
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
        };
        Range.prototype.pointerMove = function (ev) {
            (void 0);
            ev.preventDefault();
            ev.stopPropagation();
            this.updateKnob(dom_1.pointerCoord(ev), this._rect);
            this._active.position();
            this._pressed = this._active.pressed = true;
        };
        Range.prototype.pointerUp = function (ev) {
            (void 0);
            ev.preventDefault();
            ev.stopPropagation();
            this.updateKnob(dom_1.pointerCoord(ev), this._rect);
            this._active.position();
            this._haptic.gestureSelectionEnd();
            this._start = this._active = null;
            this._pressed = this._knobs.first.pressed = this._knobs.last.pressed = false;
        };
        Range.prototype.setActiveKnob = function (current, rect) {
            var ratio = (current.x - rect.left) / (rect.width);
            if (this._dual && Math.abs(ratio - this._knobs.first.ratio) > Math.abs(ratio - this._knobs.last.ratio)) {
                this._active = this._knobs.last;
            }
            else {
                this._active = this._knobs.first;
            }
        };
        Range.prototype.updateKnob = function (current, rect) {
            var _this = this;
            if (this._active) {
                var oldVal = this._active.value;
                this._active.ratio = (current.x - rect.left) / (rect.width);
                var newVal = this._active.value;
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
                    this._debouncer.debounce(function () {
                        _this.onChange(_this.value);
                        _this.ionChange.emit(_this);
                    });
                }
                this.updateBar();
            }
        };
        Range.prototype.updateBar = function () {
            var firstRatio = this._knobs.first.ratio;
            if (this._dual) {
                var lastRatio = this._knobs.last.ratio;
                this._barL = (Math.min(firstRatio, lastRatio) * 100) + "%";
                this._barR = (100 - (Math.max(firstRatio, lastRatio) * 100)) + "%";
            }
            else {
                this._barL = '';
                this._barR = (100 - (firstRatio * 100)) + "%";
            }
            this.updateTicks();
        };
        Range.prototype.createTicks = function () {
            var _this = this;
            if (this._snaps) {
                dom_1.raf(function () {
                    _this._ticks = [];
                    for (var value = _this._min; value <= _this._max; value += _this._step) {
                        var ratio = _this.valueToRatio(value);
                        _this._ticks.push({
                            ratio: ratio,
                            left: ratio * 100 + "%",
                        });
                    }
                    _this.updateTicks();
                });
            }
        };
        Range.prototype.updateTicks = function () {
            if (this._snaps && this._ticks) {
                var ratio_1 = this.ratio;
                if (this._dual) {
                    var upperRatio_1 = this.ratioUpper;
                    this._ticks.forEach(function (t) {
                        t.active = (t.ratio >= ratio_1 && t.ratio <= upperRatio_1);
                    });
                }
                else {
                    this._ticks.forEach(function (t) {
                        t.active = (t.ratio <= ratio_1);
                    });
                }
            }
        };
        Range.prototype.ratioToValue = function (ratio) {
            ratio = Math.round(((this._max - this._min) * ratio));
            ratio = Math.round(ratio / this._step) * this._step + this._min;
            return util_1.clamp(this._min, ratio, this._max);
        };
        Range.prototype.valueToRatio = function (value) {
            value = Math.round((value - this._min) / this._step) * this._step;
            value = value / (this._max - this._min);
            return util_1.clamp(0, value, 1);
        };
        Range.prototype.writeValue = function (val) {
            if (util_1.isPresent(val)) {
                var knobs = this._knobs;
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
        };
        Range.prototype.registerOnChange = function (fn) {
            var _this = this;
            this._fn = fn;
            this.onChange = function (val) {
                fn(val);
                _this.onTouched();
            };
        };
        Range.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        Object.defineProperty(Range.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = util_1.isTrueProperty(val);
                this._item && this._item.setElementClass('item-range-disabled', this._disabled);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "ratio", {
            get: function () {
                if (this._dual) {
                    return Math.min(this._knobs.first.ratio, this._knobs.last.ratio);
                }
                return this._knobs.first.ratio;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Range.prototype, "ratioUpper", {
            get: function () {
                if (this._dual) {
                    return Math.max(this._knobs.first.ratio, this._knobs.last.ratio);
                }
                return null;
            },
            enumerable: true,
            configurable: true
        });
        Range.prototype.onChange = function (val) {
            this.onTouched();
        };
        Range.prototype.onTouched = function () { };
        Range.prototype.ngOnDestroy = function () {
            this._form.deregister(this);
            this._events.unlistenAll();
        };
        Range.decorators = [
            { type: core_1.Component, args: [{
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
                        providers: [exports.RANGE_VALUE_ACCESSOR],
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Range.ctorParameters = [
            { type: form_1.Form, },
            { type: haptic_1.Haptic, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Range.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            '_bar': [{ type: core_1.ViewChild, args: ['bar',] },],
            '_slider': [{ type: core_1.ViewChild, args: ['slider',] },],
            '_knobs': [{ type: core_1.ViewChildren, args: [RangeKnob,] },],
            'min': [{ type: core_1.Input },],
            'max': [{ type: core_1.Input },],
            'step': [{ type: core_1.Input },],
            'snaps': [{ type: core_1.Input },],
            'pin': [{ type: core_1.Input },],
            'debounce': [{ type: core_1.Input },],
            'dualKnobs': [{ type: core_1.Input },],
            'ionChange': [{ type: core_1.Output },],
            'disabled': [{ type: core_1.Input },],
        };
        return Range;
    }(ion_1.Ion));
    exports.Range = Range;
});
//# sourceMappingURL=range.js.map