var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Attribute, Directive, ElementRef, Renderer, Input } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var Label = (function (_super) {
    __extends(Label, _super);
    function Label(config, elementRef, renderer, isFloating, isStacked, isFixed, isInset) {
        _super.call(this, config, elementRef, renderer);
        this.mode = config.get('mode');
        this.type = (isFloating === '' ? 'floating' : (isStacked === '' ? 'stacked' : (isFixed === '' ? 'fixed' : (isInset === '' ? 'inset' : null))));
    }
    Object.defineProperty(Label.prototype, "color", {
        set: function (val) {
            this._setColor('label', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "mode", {
        set: function (val) {
            this._setMode('label', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            if (val) {
                this.setElementAttribute('id', val);
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Label.prototype, "text", {
        get: function () {
            return this.getNativeElement().textContent || '';
        },
        enumerable: true,
        configurable: true
    });
    Label.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-label'
                },] },
    ];
    Label.ctorParameters = [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
        { type: undefined, decorators: [{ type: Attribute, args: ['floating',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['stacked',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['fixed',] },] },
        { type: undefined, decorators: [{ type: Attribute, args: ['inset',] },] },
    ];
    Label.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
        'id': [{ type: Input },],
    };
    return Label;
}(Ion));
//# sourceMappingURL=label.js.map