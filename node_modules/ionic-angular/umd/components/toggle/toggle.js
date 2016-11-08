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
        define(["require", "exports", '@angular/core', '@angular/forms', '../../config/config', '../../util/form', '../../util/util', '../ion', '../item/item', '../../util/dom', '../../util/haptic', '../../util/ui-event-manager'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var forms_1 = require('@angular/forms');
    var config_1 = require('../../config/config');
    var form_1 = require('../../util/form');
    var util_1 = require('../../util/util');
    var ion_1 = require('../ion');
    var item_1 = require('../item/item');
    var dom_1 = require('../../util/dom');
    var haptic_1 = require('../../util/haptic');
    var ui_event_manager_1 = require('../../util/ui-event-manager');
    exports.TOGGLE_VALUE_ACCESSOR = {
        provide: forms_1.NG_VALUE_ACCESSOR,
        useExisting: core_1.forwardRef(function () { return Toggle; }),
        multi: true
    };
    var Toggle = (function (_super) {
        __extends(Toggle, _super);
        function Toggle(_form, config, elementRef, renderer, _haptic, _item) {
            _super.call(this, config, elementRef, renderer);
            this._form = _form;
            this._haptic = _haptic;
            this._item = _item;
            this._checked = false;
            this._init = false;
            this._disabled = false;
            this._activated = false;
            this._msPrv = 0;
            this._fn = null;
            this._events = new ui_event_manager_1.UIEventManager();
            this.ionChange = new core_1.EventEmitter();
            this.mode = config.get('mode');
            _form.register(this);
            if (_item) {
                this.id = 'tgl-' + _item.registerInput('toggle');
                this._labelId = 'lbl-' + _item.id;
                this._item.setElementClass('item-toggle', true);
            }
        }
        Object.defineProperty(Toggle.prototype, "color", {
            set: function (val) {
                this._setColor('toggle', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Toggle.prototype, "mode", {
            set: function (val) {
                this._setMode('toggle', val);
            },
            enumerable: true,
            configurable: true
        });
        Toggle.prototype.pointerDown = function (ev) {
            this._startX = dom_1.pointerCoord(ev).x;
            this._activated = true;
            return true;
        };
        Toggle.prototype.pointerMove = function (ev) {
            if (this._startX) {
                var currentX = dom_1.pointerCoord(ev).x;
                (void 0);
                if (this._checked) {
                    if (currentX + 15 < this._startX) {
                        this.onChange(false);
                        this._haptic.selection();
                        this._startX = currentX;
                        this._activated = true;
                    }
                }
                else if (currentX - 15 > this._startX) {
                    this.onChange(true);
                    this._haptic.selection();
                    this._startX = currentX;
                    this._activated = (currentX < this._startX + 5);
                }
            }
        };
        Toggle.prototype.pointerUp = function (ev) {
            if (this._startX) {
                var endX = dom_1.pointerCoord(ev).x;
                if (this.checked) {
                    if (this._startX + 4 > endX) {
                        this.onChange(false);
                        this._haptic.selection();
                    }
                }
                else if (this._startX - 4 < endX) {
                    this.onChange(true);
                    this._haptic.selection();
                }
                this._activated = false;
                this._startX = null;
            }
        };
        Object.defineProperty(Toggle.prototype, "checked", {
            get: function () {
                return this._checked;
            },
            set: function (val) {
                this._setChecked(util_1.isTrueProperty(val));
                this.onChange(this._checked);
            },
            enumerable: true,
            configurable: true
        });
        Toggle.prototype._setChecked = function (isChecked) {
            if (!this._disabled && isChecked !== this._checked) {
                this._checked = isChecked;
                if (this._init) {
                    this.ionChange.emit(this);
                }
                this._item && this._item.setElementClass('item-toggle-checked', isChecked);
            }
        };
        Toggle.prototype.writeValue = function (val) {
            this._setChecked(util_1.isTrueProperty(val));
        };
        Toggle.prototype.registerOnChange = function (fn) {
            this._fn = fn;
        };
        Toggle.prototype.registerOnTouched = function (fn) {
            this.onTouched = fn;
        };
        Object.defineProperty(Toggle.prototype, "disabled", {
            get: function () {
                return this._disabled;
            },
            set: function (val) {
                this._disabled = util_1.isTrueProperty(val);
                this._item && this._item.setElementClass('item-toggle-disabled', this._disabled);
            },
            enumerable: true,
            configurable: true
        });
        Toggle.prototype.onChange = function (isChecked) {
            (void 0);
            this._fn && this._fn(isChecked);
            this._setChecked(isChecked);
            this.onTouched();
        };
        Toggle.prototype.onTouched = function () { };
        Toggle.prototype.ngAfterContentInit = function () {
            this._init = true;
            this._events.pointerEvents({
                elementRef: this._elementRef,
                pointerDown: this.pointerDown.bind(this),
                pointerMove: this.pointerMove.bind(this),
                pointerUp: this.pointerUp.bind(this)
            });
        };
        Toggle.prototype.ngOnDestroy = function () {
            this._form.deregister(this);
            this._events.unlistenAll();
            this._fn = null;
        };
        Toggle.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-toggle',
                        template: '<div class="toggle-icon" [class.toggle-checked]="_checked" [class.toggle-activated]="_activated">' +
                            '<div class="toggle-inner"></div>' +
                            '</div>' +
                            '<button role="checkbox" ' +
                            'type="button" ' +
                            'ion-button="item-cover" ' +
                            '[id]="id" ' +
                            '[attr.aria-checked]="_checked" ' +
                            '[attr.aria-labelledby]="_labelId" ' +
                            '[attr.aria-disabled]="_disabled" ' +
                            'class="item-cover">' +
                            '</button>',
                        host: {
                            '[class.toggle-disabled]': '_disabled'
                        },
                        providers: [exports.TOGGLE_VALUE_ACCESSOR],
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Toggle.ctorParameters = [
            { type: form_1.Form, },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
            { type: haptic_1.Haptic, },
            { type: item_1.Item, decorators: [{ type: core_1.Optional },] },
        ];
        Toggle.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'ionChange': [{ type: core_1.Output },],
            'checked': [{ type: core_1.Input },],
            'disabled': [{ type: core_1.Input },],
        };
        return Toggle;
    }(ion_1.Ion));
    exports.Toggle = Toggle;
});
//# sourceMappingURL=toggle.js.map