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
        define(["require", "exports", '@angular/core', '../../config/config', '../ion'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var Card = (function (_super) {
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
            { type: core_1.Directive, args: [{
                        selector: 'ion-card'
                    },] },
        ];
        Card.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Card.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
        };
        return Card;
    }(ion_1.Ion));
    exports.Card = Card;
    var CardContent = (function () {
        function CardContent() {
        }
        CardContent.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-card-content'
                    },] },
        ];
        CardContent.ctorParameters = [];
        return CardContent;
    }());
    exports.CardContent = CardContent;
    var CardHeader = (function () {
        function CardHeader() {
        }
        CardHeader.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-card-header'
                    },] },
        ];
        CardHeader.ctorParameters = [];
        return CardHeader;
    }());
    exports.CardHeader = CardHeader;
    var CardTitle = (function () {
        function CardTitle() {
        }
        CardTitle.decorators = [
            { type: core_1.Directive, args: [{
                        selector: 'ion-card-title'
                    },] },
        ];
        CardTitle.ctorParameters = [];
        return CardTitle;
    }());
    exports.CardTitle = CardTitle;
});
//# sourceMappingURL=card.js.map