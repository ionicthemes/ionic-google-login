var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Directive, ElementRef, Input, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import { Button } from '../button/button';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Icon } from '../icon/icon';
import { Ion } from '../ion';
import { Label } from '../label/label';
export var Item = (function (_super) {
    __extends(Item, _super);
    function Item(form, config, elementRef, renderer) {
        _super.call(this, config, elementRef, renderer);
        this._ids = -1;
        this._inputs = [];
        this._viewLabel = true;
        this.labelId = null;
        this.mode = config.get('mode');
        this.id = form.nextId().toString();
    }
    Object.defineProperty(Item.prototype, "color", {
        set: function (val) {
            this._updateColor(val);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "mode", {
        set: function (val) {
            this._setMode('item', val);
        },
        enumerable: true,
        configurable: true
    });
    Item.prototype.registerInput = function (type) {
        this._inputs.push(type);
        return this.id + '-' + (++this._ids);
    };
    Item.prototype.ngAfterContentInit = function () {
        if (this._viewLabel && this._inputs.length) {
            var labelText = this.getLabelText().trim();
            this._viewLabel = (labelText.length > 0);
        }
        if (this._inputs.length > 1) {
            this.setElementClass('item-multiple-inputs', true);
        }
    };
    Item.prototype._updateColor = function (newColor, colorClass) {
        colorClass = colorClass || 'item';
        this._setColor(colorClass, newColor);
    };
    Item.prototype.getLabelText = function () {
        return this._label ? this._label.text : '';
    };
    Object.defineProperty(Item.prototype, "contentLabel", {
        set: function (label) {
            if (label) {
                this._label = label;
                this.labelId = label.id = ('lbl-' + this.id);
                if (label.type) {
                    this.setElementClass('item-label-' + label.type, true);
                }
                this._viewLabel = false;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "viewLabel", {
        set: function (label) {
            if (!this._label) {
                this._label = label;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "_buttons", {
        set: function (buttons) {
            buttons.forEach(function (button) {
                if (!button._size) {
                    button.setElementClass('item-button', true);
                }
            });
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Item.prototype, "_icons", {
        set: function (icons) {
            icons.forEach(function (icon) {
                icon.setElementClass('item-icon', true);
            });
        },
        enumerable: true,
        configurable: true
    });
    Item.decorators = [
        { type: Component, args: [{
                    selector: 'ion-list-header,ion-item,[ion-item],ion-item-divider',
                    template: '<ng-content select="[item-left],ion-checkbox:not([item-right])"></ng-content>' +
                        '<div class="item-inner">' +
                        '<div class="input-wrapper">' +
                        '<ng-content select="ion-label"></ng-content>' +
                        '<ion-label *ngIf="_viewLabel">' +
                        '<ng-content></ng-content>' +
                        '</ion-label>' +
                        '<ng-content select="ion-select,ion-input,ion-textarea,ion-datetime,ion-range,[item-content]"></ng-content>' +
                        '</div>' +
                        '<ng-content select="[item-right],ion-radio,ion-toggle"></ng-content>' +
                        '<ion-reorder></ion-reorder>' +
                        '</div>' +
                        '<div class="button-effect"></div>',
                    host: {
                        'class': 'item'
                    },
                    changeDetection: ChangeDetectionStrategy.OnPush,
                    encapsulation: ViewEncapsulation.None,
                },] },
    ];
    Item.ctorParameters = [
        { type: Form, },
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    Item.propDecorators = {
        'color': [{ type: Input },],
        'mode': [{ type: Input },],
        'contentLabel': [{ type: ContentChild, args: [Label,] },],
        'viewLabel': [{ type: ViewChild, args: [Label,] },],
        '_buttons': [{ type: ContentChildren, args: [Button,] },],
        '_icons': [{ type: ContentChildren, args: [Icon,] },],
    };
    return Item;
}(Ion));
export var ItemContent = (function () {
    function ItemContent() {
    }
    ItemContent.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-item,[ion-item]',
                    host: {
                        'class': 'item-block'
                    }
                },] },
    ];
    ItemContent.ctorParameters = [];
    return ItemContent;
}());
export var ItemGroup = (function () {
    function ItemGroup() {
    }
    ItemGroup.decorators = [
        { type: Directive, args: [{
                    selector: 'ion-item-group'
                },] },
    ];
    ItemGroup.ctorParameters = [];
    return ItemGroup;
}());
//# sourceMappingURL=item.js.map