import { Component, ElementRef, HostListener, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { isPresent } from '../../util/util';
import { Key } from '../../util/key';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
export class AlertCmp {
    constructor(_viewCtrl, _elementRef, _config, params, renderer) {
        this._viewCtrl = _viewCtrl;
        this._elementRef = _elementRef;
        this._config = _config;
        this.d = params.data;
        this.mode = _config.get('mode');
        renderer.setElementClass(_elementRef.nativeElement, `alert-${this.mode}`, true);
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(cssClass => {
                if (cssClass.trim() !== '')
                    renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
        this.id = (++alertIds);
        this.descId = '';
        this.hdrId = 'alert-hdr-' + this.id;
        this.subHdrId = 'alert-subhdr-' + this.id;
        this.msgId = 'alert-msg-' + this.id;
        this.activeId = '';
        this.lastClick = 0;
        if (this.d.message) {
            this.descId = this.msgId;
        }
        else if (this.d.subTitle) {
            this.descId = this.subHdrId;
        }
        if (!this.d.message) {
            this.d.message = '';
        }
    }
    ionViewDidLoad() {
        let data = this.d;
        data.buttons = data.buttons.map(button => {
            if (typeof button === 'string') {
                return { text: button };
            }
            return button;
        });
        data.inputs = data.inputs.map((input, index) => {
            return {
                type: input.type || 'text',
                name: isPresent(input.name) ? input.name : index,
                placeholder: isPresent(input.placeholder) ? input.placeholder : '',
                value: isPresent(input.value) ? input.value : '',
                label: input.label,
                checked: !!input.checked,
                disabled: !!input.disabled,
                id: 'alert-input-' + this.id + '-' + index,
                handler: isPresent(input.handler) ? input.handler : null,
            };
        });
        let inputTypes = [];
        data.inputs.forEach(input => {
            if (inputTypes.indexOf(input.type) < 0) {
                inputTypes.push(input.type);
            }
        });
        if (inputTypes.length > 1 && (inputTypes.indexOf('checkbox') > -1 || inputTypes.indexOf('radio') > -1)) {
            console.warn('Alert cannot mix input types: ' + (inputTypes.join('/')) + '. Please see alert docs for more info.');
        }
        this.inputType = inputTypes.length ? inputTypes[0] : null;
        let checkedInput = this.d.inputs.find(input => input.checked);
        if (checkedInput) {
            this.activeId = checkedInput.id;
        }
    }
    keyUp(ev) {
        if (this.enabled && this._viewCtrl.isLast()) {
            if (ev.keyCode === Key.ENTER) {
                if (this.lastClick + 1000 < Date.now()) {
                    (void 0);
                    let button = this.d.buttons[this.d.buttons.length - 1];
                    this.btnClick(button);
                }
            }
            else if (ev.keyCode === Key.ESCAPE) {
                (void 0);
                this.bdClick();
            }
        }
    }
    ionViewDidEnter() {
        let activeElement = document.activeElement;
        if (document.activeElement) {
            activeElement.blur();
        }
        let focusableEle = this._elementRef.nativeElement.querySelector('input,button');
        if (focusableEle) {
            focusableEle.focus();
        }
        this.enabled = true;
    }
    btnClick(button, dismissDelay) {
        if (!this.enabled) {
            return;
        }
        this.lastClick = Date.now();
        let shouldDismiss = true;
        if (button.handler) {
            if (button.handler(this.getValues()) === false) {
                shouldDismiss = false;
            }
        }
        if (shouldDismiss) {
            setTimeout(() => {
                this.dismiss(button.role);
            }, dismissDelay || this._config.get('pageTransitionDelay'));
        }
    }
    rbClick(checkedInput) {
        if (this.enabled) {
            this.d.inputs.forEach(input => {
                input.checked = (checkedInput === input);
            });
            this.activeId = checkedInput.id;
            if (checkedInput.handler) {
                checkedInput.handler(checkedInput);
            }
        }
    }
    cbClick(checkedInput) {
        if (this.enabled) {
            checkedInput.checked = !checkedInput.checked;
            if (checkedInput.handler) {
                checkedInput.handler(checkedInput);
            }
        }
    }
    bdClick() {
        if (this.enabled && this.d.enableBackdropDismiss) {
            let cancelBtn = this.d.buttons.find(b => b.role === 'cancel');
            if (cancelBtn) {
                this.btnClick(cancelBtn, 1);
            }
            else {
                this.dismiss('backdrop');
            }
        }
    }
    dismiss(role) {
        return this._viewCtrl.dismiss(this.getValues(), role);
    }
    getValues() {
        if (this.inputType === 'radio') {
            let checkedInput = this.d.inputs.find(i => i.checked);
            return checkedInput ? checkedInput.value : undefined;
        }
        if (this.inputType === 'checkbox') {
            return this.d.inputs.filter(i => i.checked).map(i => i.value);
        }
        let values = {};
        this.d.inputs.forEach(i => {
            values[i.name] = i.value;
        });
        return values;
    }
}
AlertCmp.decorators = [
    { type: Component, args: [{
                selector: 'ion-alert',
                template: '<ion-backdrop (click)="bdClick()"></ion-backdrop>' +
                    '<div class="alert-wrapper">' +
                    '<div class="alert-head">' +
                    '<h2 id="{{hdrId}}" class="alert-title" *ngIf="d.title" [innerHTML]="d.title"></h2>' +
                    '<h3 id="{{subHdrId}}" class="alert-sub-title" *ngIf="d.subTitle" [innerHTML]="d.subTitle"></h3>' +
                    '</div>' +
                    '<div id="{{msgId}}" class="alert-message" [innerHTML]="d.message"></div>' +
                    '<div *ngIf="d.inputs.length" [ngSwitch]="inputType">' +
                    '<template ngSwitchCase="radio">' +
                    '<div class="alert-radio-group" role="radiogroup" [attr.aria-labelledby]="hdrId" [attr.aria-activedescendant]="activeId">' +
                    '<button ion-button="alert-radio-button" *ngFor="let i of d.inputs" (click)="rbClick(i)" [attr.aria-checked]="i.checked" [disabled]="i.disabled" [attr.id]="i.id" class="alert-tappable alert-radio" role="radio">' +
                    '<div class="alert-radio-icon"><div class="alert-radio-inner"></div></div>' +
                    '<div class="alert-radio-label">' +
                    '{{i.label}}' +
                    '</div>' +
                    '</button>' +
                    '</div>' +
                    '</template>' +
                    '<template ngSwitchCase="checkbox">' +
                    '<div class="alert-checkbox-group">' +
                    '<button ion-button="alert-checkbox-button" *ngFor="let i of d.inputs" (click)="cbClick(i)" [attr.aria-checked]="i.checked" [disabled]="i.disabled" class="alert-tappable alert-checkbox" role="checkbox">' +
                    '<div class="alert-checkbox-icon"><div class="alert-checkbox-inner"></div></div>' +
                    '<div class="alert-checkbox-label">' +
                    '{{i.label}}' +
                    '</div>' +
                    '</button>' +
                    '</div>' +
                    '</template>' +
                    '<template ngSwitchDefault>' +
                    '<div class="alert-input-group">' +
                    '<div *ngFor="let i of d.inputs" class="alert-input-wrapper">' +
                    '<input [placeholder]="i.placeholder" [(ngModel)]="i.value" [type]="i.type" class="alert-input">' +
                    '</div>' +
                    '</div>' +
                    '</template>' +
                    '</div>' +
                    '<div class="alert-button-group" [ngClass]="{\'alert-button-group-vertical\':d.buttons.length>2}">' +
                    '<button ion-button="alert-button" *ngFor="let b of d.buttons" (click)="btnClick(b)" [ngClass]="b.cssClass">' +
                    '{{b.text}}' +
                    '</button>' +
                    '</div>' +
                    '</div>',
                host: {
                    'role': 'dialog',
                    '[attr.aria-labelledby]': 'hdrId',
                    '[attr.aria-describedby]': 'descId'
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
AlertCmp.ctorParameters = [
    { type: ViewController, },
    { type: ElementRef, },
    { type: Config, },
    { type: NavParams, },
    { type: Renderer, },
];
AlertCmp.propDecorators = {
    'keyUp': [{ type: HostListener, args: ['body:keyup', ['$event'],] },],
};
let alertIds = -1;
//# sourceMappingURL=alert-component.js.map