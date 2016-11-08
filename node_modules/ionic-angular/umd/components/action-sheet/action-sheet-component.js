(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../config/config', '../../util/form', '../../util/key', '../../navigation/nav-params', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var form_1 = require('../../util/form');
    var key_1 = require('../../util/key');
    var nav_params_1 = require('../../navigation/nav-params');
    var view_controller_1 = require('../../navigation/view-controller');
    var ActionSheetCmp = (function () {
        function ActionSheetCmp(_viewCtrl, _config, _elementRef, _form, params, renderer) {
            this._viewCtrl = _viewCtrl;
            this._config = _config;
            this._elementRef = _elementRef;
            this._form = _form;
            this.d = params.data;
            this.mode = _config.get('mode');
            renderer.setElementClass(_elementRef.nativeElement, "action-sheet-" + this.mode, true);
            if (this.d.cssClass) {
                this.d.cssClass.split(' ').forEach(function (cssClass) {
                    if (cssClass.trim() !== '')
                        renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
                });
            }
            this.id = (++actionSheetIds);
            if (this.d.title) {
                this.hdrId = 'acst-hdr-' + this.id;
            }
            if (this.d.subTitle) {
                this.descId = 'acst-subhdr-' + this.id;
            }
        }
        ActionSheetCmp.prototype.ionViewDidLoad = function () {
            var _this = this;
            var buttons = [];
            this.d.buttons.forEach(function (button) {
                if (typeof button === 'string') {
                    button = { text: button };
                }
                if (!button.cssClass) {
                    button.cssClass = '';
                }
                if (button.role === 'cancel') {
                    _this.d.cancelButton = button;
                }
                else {
                    if (button.role === 'destructive') {
                        button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-destructive';
                    }
                    else if (button.role === 'selected') {
                        button.cssClass = (button.cssClass + ' ' || '') + 'action-sheet-selected';
                    }
                    buttons.push(button);
                }
            });
            this.d.buttons = buttons;
        };
        ActionSheetCmp.prototype.ionViewDidEnter = function () {
            this._form.focusOut();
            var focusableEle = this._elementRef.nativeElement.querySelector('button');
            if (focusableEle) {
                focusableEle.focus();
            }
            this.enabled = true;
        };
        ActionSheetCmp.prototype.keyUp = function (ev) {
            if (this.enabled && this._viewCtrl.isLast()) {
                if (ev.keyCode === key_1.Key.ESCAPE) {
                    (void 0);
                    this.bdClick();
                }
            }
        };
        ActionSheetCmp.prototype.click = function (button, dismissDelay) {
            var _this = this;
            if (!this.enabled) {
                return;
            }
            var shouldDismiss = true;
            if (button.handler) {
                if (button.handler() === false) {
                    shouldDismiss = false;
                }
            }
            if (shouldDismiss) {
                setTimeout(function () {
                    _this.dismiss(button.role);
                }, dismissDelay || this._config.get('pageTransitionDelay'));
            }
        };
        ActionSheetCmp.prototype.bdClick = function () {
            if (this.enabled && this.d.enableBackdropDismiss) {
                if (this.d.cancelButton) {
                    this.click(this.d.cancelButton, 1);
                }
                else {
                    this.dismiss('backdrop');
                }
            }
        };
        ActionSheetCmp.prototype.dismiss = function (role) {
            return this._viewCtrl.dismiss(null, role);
        };
        ActionSheetCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-action-sheet',
                        template: '<ion-backdrop (click)="bdClick()"></ion-backdrop>' +
                            '<div class="action-sheet-wrapper">' +
                            '<div class="action-sheet-container">' +
                            '<div class="action-sheet-group">' +
                            '<div class="action-sheet-title" id="{{hdrId}}" *ngIf="d.title">{{d.title}}</div>' +
                            '<div class="action-sheet-sub-title" id="{{descId}}" *ngIf="d.subTitle">{{d.subTitle}}</div>' +
                            '<button ion-button="action-sheet-button" (click)="click(b)" *ngFor="let b of d.buttons" class="disable-hover" [attr.icon-left]="b.icon ? \'\' : null" [ngClass]="b.cssClass">' +
                            '<ion-icon [name]="b.icon" *ngIf="b.icon" class="action-sheet-icon"></ion-icon>' +
                            '{{b.text}}' +
                            '</button>' +
                            '</div>' +
                            '<div class="action-sheet-group" *ngIf="d.cancelButton">' +
                            '<button ion-button="action-sheet-button" (click)="click(d.cancelButton)" class="action-sheet-cancel disable-hover" [attr.icon-left]="d.cancelButton.icon ? \'\' : null" [ngClass]="d.cancelButton.cssClass">' +
                            '<ion-icon [name]="d.cancelButton.icon" *ngIf="d.cancelButton.icon" class="action-sheet-icon"></ion-icon>' +
                            '{{d.cancelButton.text}}' +
                            '</button>' +
                            '</div>' +
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
        ActionSheetCmp.ctorParameters = [
            { type: view_controller_1.ViewController, },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: form_1.Form, },
            { type: nav_params_1.NavParams, },
            { type: core_1.Renderer, },
        ];
        ActionSheetCmp.propDecorators = {
            'keyUp': [{ type: core_1.HostListener, args: ['body:keyup', ['$event'],] },],
        };
        return ActionSheetCmp;
    }());
    exports.ActionSheetCmp = ActionSheetCmp;
    var actionSheetIds = -1;
});
//# sourceMappingURL=action-sheet-component.js.map