var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ContentChildren, Directive, ElementRef, EventEmitter, HostListener, Input, Output, Optional, Renderer, ViewEncapsulation } from '@angular/core';
import { NgControl } from '@angular/forms';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { isPresent, isTrueProperty } from '../../util/util';
export var SegmentButton = (function () {
    function SegmentButton(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._disabled = false;
        this.ionSelect = new EventEmitter();
    }
    Object.defineProperty(SegmentButton.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            this._disabled = isTrueProperty(val);
            this._setElementClass('segment-button-disabled', this._disabled);
        },
        enumerable: true,
        configurable: true
    });
    SegmentButton.prototype._setElementClass = function (cssClass, shouldAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, cssClass, shouldAdd);
    };
    SegmentButton.prototype.onClick = function () {
        (void 0);
        this.ionSelect.emit(this);
    };
    SegmentButton.prototype.ngOnInit = function () {
        if (!isPresent(this.value)) {
            console.warn('<ion-segment-button> requires a "value" attribute');
        }
    };
    Object.defineProperty(SegmentButton.prototype, "isActive", {
        set: function (isActive) {
            this._renderer.setElementClass(this._elementRef.nativeElement, 'segment-activated', isActive);
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-pressed', isActive);
        },
        enumerable: true,
        configurable: true
    });
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
    return SegmentButton;
}());
export var Segment = (function (_super) {
    __extends(Segment, _super);
    function Segment(config, elementRef, renderer, ngControl) {
        _super.call(this, config, elementRef, renderer);
        this._disabled = false;
        this.ionChange = new EventEmitter();
        this.onChange = function (_) { };
        this.onTouched = function (_) { };
        this.mode = config.get('mode');
        if (ngControl) {
            ngControl.valueAccessor = this;
        }
    }
    Object.defineProperty(Segment.prototype, "color", {
        set: function (val) {
            this._setColor('segment', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "mode", {
        set: function (val) {
            this._setMode('segment', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Segment.prototype, "disabled", {
        get: function () {
            return this._disabled;
        },
        set: function (val) {
            var _this = this;
            this._disabled = isTrueProperty(val);
            if (this._buttons) {
                this._buttons.forEach(function (button) {
                    button._setElementClass('segment-button-disabled', _this._disabled);
                });
            }
        },
        enumerable: true,
        configurable: true
    });
    Segment.prototype.writeValue = function (value) {
        this.value = isPresent(value) ? value : '';
        if (this._buttons) {
            var buttons = this._buttons.toArray();
            for (var _i = 0, buttons_1 = buttons; _i < buttons_1.length; _i++) {
                var button = buttons_1[_i];
                button.isActive = (button.value === this.value);
            }
        }
    };
    Segment.prototype.ngAfterViewInit = function () {
        var _this = this;
        this._buttons.forEach(function (button) {
            button.ionSelect.subscribe(function (selectedButton) {
                _this.writeValue(selectedButton.value);
                _this.onChange(selectedButton.value);
                _this.ionChange.emit(selectedButton);
            });
            if (isPresent(_this.value)) {
                button.isActive = (button.value === _this.value);
            }
            if (isTrueProperty(_this._disabled)) {
                button._setElementClass('segment-button-disabled', _this._disabled);
            }
        });
    };
    Segment.prototype.registerOnChange = function (fn) { this.onChange = fn; };
    Segment.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
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
    return Segment;
}(Ion));
//# sourceMappingURL=segment.js.map