var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Directive, ElementRef, Input, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
export var Card = (function (_super) {
    __extends(Card, _super);
    function Card(config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer);
        this.mode = config.get('mode');
    }
    Object.defineProperty(Card.prototype, "color", {
        set: function (val) {
            this._setColor('card', val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Card.prototype, "mode", {
        set: function (val) {
            this._setMode('card', val);
        },
        enumerable: true,
        configurable: true
    });
    Card.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card'
                },] },
    ];
    Card.ctorParameters = [
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    Card.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
    };
    return Card;
}(Ion));
export var CardContent = (function () {
    function CardContent() {
    }
    CardContent.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card-content'
                },] },
    ];
    CardContent.ctorParameters = [];
    return CardContent;
}());
export var CardHeader = (function () {
    function CardHeader() {
    }
    CardHeader.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card-header'
                },] },
    ];
    CardHeader.ctorParameters = [];
    return CardHeader;
}());
export var CardTitle = (function () {
    function CardTitle() {
    }
    CardTitle.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-card-title'
                },] },
    ];
    CardTitle.ctorParameters = [];
    return CardTitle;
}());
//# sourceMappingURL=card.js.map