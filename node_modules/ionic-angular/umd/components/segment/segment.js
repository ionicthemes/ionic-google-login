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
        define(["require", "exports", '@angular/core', '@angular/forms', '../../config/config', '../ion', '../../util/util'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var util_1 = require('../../util/util');
    var SegmentButton = (function () {
        function SegmentButton(_renderer, _elementRef) {
            this._renderer = _renderer;
            this._elementRef = _elementRef;
            this._disabled = false;
            this.ionSelect = new core_1.EventEmitter();
        }
        Object.defineProperty(SegmentButton.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = util_1.isTrueProperty(val);
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
            if (!util_1.isPresent(this.value)) {
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
            { type: core_1.Component, args: [{
                        selector: 'ion-segment-button',
                        template: '<ng-content></ng-content>' +
                            '<div class="button-effect"></div>',
                        host: {
                            'tappable': '',
                            'class': 'segment-button',
                            'role': 'button'
                        },
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        SegmentButton.ctorParameters = [
            { type: core_1.Renderer, },
            { type: core_1.ElementRef, },
        ];
        SegmentButton.propDecorators = {
            'value': [{ type: core_1.Input },],
            'ionSelect': [{ type: core_1.Output },],
            'disabled': [{ type: core_1.Input },],
            'onClick': [{ type: core_1.HostListener, args: ['click',] },],
        };
        return SegmentButton;
    }());
    exports.SegmentButton = SegmentButton;
    var Segment = (function (_super) {
        __extends(Segment, _super);
        function Segment(config, elementRef, renderer, ngControl) {
            _super.call(this, config, elementRef, renderer);
            this._disabled = false;
            this.ionChange = new core_1.EventEmitter();
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
                this._disabled = util_1.isTrueProperty(val);
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
            this.value = util_1.isPresent(value) ? value : '';
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
                if (util_1.isPresent(_this.value)) {
                    button.isActive = (button.value === _this.value);
                }
                if (util_1.isTrueProperty(_this._disabled)) {
                    button._setElementClass('segment-button-disabled', _this._disabled);
                }
            });
        };
        Segment.prototype.registerOnChange = function (fn) { this.onChange = fn; };
        Segment.prototype.registerOnTouched = function (fn) { this.onTouched = fn; };
        Segment.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-segment'
                    },] },
        ];
        Segment.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: forms_1.NgControl, decorators: [{ type: core_1.Optional },] },
        ];
        Segment.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'ionChange': [{ type: core_1.Output },],
            '_buttons': [{ type: core_1.ContentChildren, args: [SegmentButton,] },],
            'disabled': [{ type: core_1.Input },],
        };
        return Segment;
    }(ion_1.Ion));
    exports.Segment = Segment;
});
//# sourceMappingURL=segment.js.map