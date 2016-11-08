var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Attribute, Directive, ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var ListHeader = (function (_super) {
    __extends(ListHeader, _super);
    function ListHeader(config, renderer, elementRef, _id) {
        _super.call(this, config, elementRef, renderer);
        this._id = _id;
        this._setMode('list-header', config.get('mode'));
    }
    Object.defineProperty(ListHeader.prototype, "id", {
        get: function () {
            return this._id;
        },
        set: function (val) {
            this._id = val;
            this.setElementAttribute('id', val);
        },
        enumerable: true,
        configurable: true
    });
    ListHeader.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-list-header'
                },] },
    ];
    ListHeader.ctorParameters = [
        { type: Config, },
        { type: Renderer, },
        { type: ElementRef, },
        { type: undefined, decorators: [{ type: Attribute, args: ['id',] },] },
    ];
    return ListHeader;
}(Ion));
//# sourceMappingURL=list-header.js.map