(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../config/config', '../../util/util', '../../util/key', '../../navigation/nav-params', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var util_1 = require('../../util/util');
    var key_1 = require('../../util/key');
    var nav_params_1 = require('../../navigation/nav-params');
    var view_controller_1 = require('../../navigation/view-controller');
    var AlertCmp = (function () {
        function AlertCmp(_viewCtrl, _elementRef, _config, params, renderer) {
            this._viewCtrl = _viewCtrl;
            this._elementRef = _elementRef;
            this._config = _config;
            this.d = params.data;
            this.mode = _config.get('mode');
            renderer.setElementClass(_elementRef.nativeElement, "alert-" + this.mode, true);
            if (this.d.cssClass) {
                this.d.cssClass.split(' ').forEach(function (cssClass) {
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
        AlertCmp.prototype.ionViewDidLoad = function () {
            var _this = this;
            var data = this.d;
            data.buttons = data.buttons.map(function (button) {
                if (typeof button === 'string') {
                    return { text: button };
                }
                return button;
            });
            data.inputs = data.inputs.map(function (input, index) {
                return {
                    type: input.type || 'text',
                    name: util_1.isPresent(input.name) ? input.name : index,
                    placeholder: util_1.isPresent(input.placeholder) ? input.placeholder : '',
                    value: util_1.isPresent(input.value) ? input.value : '',
                    label: input.label,
                    checked: !!input.checked,
                    disabled: !!input.disabled,
                    id: 'alert-input-' + _this.id + '-' + index,
                    handler: util_1.isPresent(input.handler) ? input.handler : null,
                };
            });
            var inputTypes = [];
            data.inputs.forEach(function (input) {
                if (inputTypes.indexOf(input.type) < 0) {
                    inputTypes.push(input.type);
                }
            });
            if (inputTypes.length > 1 && (inputTypes.indexOf('checkbox') > -1 || inputTypes.indexOf('radio') > -1)) {
                console.warn('Alert cannot mix input types: ' + (inputTypes.join('/')) + '. Please see alert docs for more info.');
            }
            this.inputType = inputTypes.length ? inputTypes[0] : null;
            var checkedInput = this.d.inputs.find(function (input) { return input.checked; });
            if (checkedInput) {
                this.activeId = checkedInput.id;
            }
        };
        AlertCmp.prototype.keyUp = function (ev) {
            if (this.enabled && this._viewCtrl.isLast()) {
                if (ev.keyCode === key_1.Key.ENTER) {
                    if (this.lastClick + 1000 < Date.now()) {
                        (void 0);
                        var button = this.d.buttons[this.d.buttons.length - 1];
                        this.btnClick(button);
                    }
                }
                else if (ev.keyCode === key_1.Key.ESCAPE) {
                    (void 0);
                    this.bdClick();
                }
            }
        };
        AlertCmp.prototype.ionViewDidEnter = function () {
            var activeElement = document.activeElement;
            if (document.activeElement) {
                activeElement.blur();
            }
            var focusableEle = this._elementRef.nativeElement.querySelector('input,button');
            if (focusableEle) {
                focusableEle.focus();
            }
            this.enabled = true;
        };
        AlertCmp.prototype.btnClick = function (button, dismissDelay) {
            var _this = this;
            if (!this.enabled) {
                return;
            }
            this.lastClick = Date.now();
            var shouldDismiss = true;
            if (button.handler) {
                if (button.handler(this.getValues()) === false) {
                    shouldDismiss = false;
                }
            }
            if (shouldDismiss) {
                setTimeout(function () {
                    _this.dismiss(button.role);
                }, dismissDelay || this._config.get('pageTransitionDelay'));
            }
        };
        AlertCmp.prototype.rbClick = function (checkedInput) {
            if (this.enabled) {
                this.d.inputs.forEach(function (input) {
                    input.checked = (checkedInput === input);
                });
                this.activeId = checkedInput.id;
                if (checkedInput.handler) {
                    checkedInput.handler(checkedInput);
                }
            }
        };
        AlertCmp.prototype.cbClick = function (checkedInput) {
            if (this.enabled) {
                checkedInput.checked = !checkedInput.checked;
                if (checkedInput.handler) {
                    checkedInput.handler(checkedInput);
                }
            }
        };
        AlertCmp.prototype.bdClick = function () {
            if (this.enabled && this.d.enableBackdropDismiss) {
                var cancelBtn = this.d.buttons.find(function (b) { return b.role === 'cancel'; });
                if (cancelBtn) {
                    this.btnClick(cancelBtn, 1);
                }
                else {
                    this.dismiss('backdrop');
                }
            }
        };
        AlertCmp.prototype.dismiss = function (role) {
            return this._viewCtrl.dismiss(this.getValues(), role);
        };
        AlertCmp.prototype.getValues = function () {
            if (this.inputType === 'radio') {
                var checkedInput = this.d.inputs.find(function (i) { return i.checked; });
                return checkedInput ? checkedInput.value : undefined;
            }
            if (this.inputType === 'checkbox') {
                return this.d.inputs.filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
            }
            var values = {};
            this.d.inputs.forEach(function (i) {
                values[i.name] = i.value;
            });
            return values;
        };
        AlertCmp.decorators = [
            { type: core_1.Component, args: [{
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
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        AlertCmp.ctorParameters = [
            { type: view_controller_1.ViewController, },
            { type: core_1.ElementRef, },
            { type: config_1.Config, },
            { type: nav_params_1.NavParams, },
            { type: core_1.Renderer, },
        ];
        AlertCmp.propDecorators = {
            'keyUp': [{ type: core_1.HostListener, args: ['body:keyup', ['$event'],] },],
        };
        return AlertCmp;
    }());
    exports.AlertCmp = AlertCmp;
    var alertIds = -1;
});
//# sourceMappingURL=alert-component.js.map