import { ChangeDetectionStrategy, Component, ContentChild, ContentChildren, Directive, ElementRef, Input, Renderer, ViewChild, ViewEncapsulation } from '@angular/core';
import { Button } from '../button/button';
import { Config } from '../../config/config';
import { Form } from '../../util/form';
import { Icon } from '../icon/icon';
import { Ion } from '../ion';
import { Label } from '../label/label';
export class Item extends Ion {
    constructor(form, config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this._ids = -1;
        this._inputs = [];
        this._viewLabel = true;
        this.labelId = null;
        this.mode = config.get('mode');
        this.id = form.nextId().toString();
    }
    set color(val) {
        this._updateColor(val);
    }
    set mode(val) {
        this._setMode('item', val);
    }
    registerInput(type) {
        this._inputs.push(type);
        return this.id + '-' + (++this._ids);
    }
    ngAfterContentInit() {
        if (this._viewLabel && this._inputs.length) {
            let labelText = this.getLabelText().trim();
            this._viewLabel = (labelText.length > 0);
        }
        if (this._inputs.length > 1) {
            this.setElementClass('item-multiple-inputs', true);
        }
    }
    _updateColor(newColor, colorClass) {
        colorClass = colorClass || 'item';
        this._setColor(colorClass, newColor);
    }
    getLabelText() {
        return this._label ? this._label.text : '';
    }
    set contentLabel(label) {
        if (label) {
            this._label = label;
            this.labelId = label.id = ('lbl-' + this.id);
            if (label.type) {
                this.setElementClass('item-label-' + label.type, true);
            }
            this._viewLabel = false;
        }
    }
    set viewLabel(label) {
        if (!this._label) {
            this._label = label;
        }
    }
    set _buttons(buttons) {
        buttons.forEach(button => {
            if (!button._size) {
                button.setElementClass('item-button', true);
            }
        });
    }
    set _icons(icons) {
        icons.forEach(icon => {
            icon.setElementClass('item-icon', true);
        });
    }
}
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
export class ItemContent {
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
export class ItemGroup {
}
ItemGroup.decorators = [
    { type: Directive, args: [{
                selector: 'ion-item-group'
            },] },
];
ItemGroup.ctorParameters = [];
//# sourceMappingURL=item.js.map