import { Component, ElementRef, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { isDefined, isUndefined } from '../../util/util';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
export class LoadingCmp {
    constructor(_viewCtrl, _config, _elementRef, params, renderer) {
        this._viewCtrl = _viewCtrl;
        this._config = _config;
        this._elementRef = _elementRef;
        this.d = params.data;
        renderer.setElementClass(_elementRef.nativeElement, `loading-${_config.get('mode')}`, true);
        if (this.d.cssClass) {
            this.d.cssClass.split(' ').forEach(cssClass => {
                if (cssClass.trim() !== '')
                    renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
            });
        }
        this.id = (++loadingIds);
    }
    ngOnInit() {
        if (isUndefined(this.d.spinner)) {
            this.d.spinner = this._config.get('loadingSpinner', this._config.get('spinner', 'ios'));
        }
        this.showSpinner = isDefined(this.d.spinner) && this.d.spinner !== 'hide';
    }
    ionViewDidEnter() {
        let activeElement = document.activeElement;
        if (document.activeElement) {
            activeElement.blur();
        }
        if (this.d && this.d.duration) {
            this.durationTimeout = setTimeout(() => {
                this.dismiss('backdrop');
            }, this.d.duration);
        }
    }
    dismiss(role) {
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        return this._viewCtrl.dismiss(null, role);
    }
}
LoadingCmp.decorators = [
    { type: Component, args: [{
                selector: 'ion-loading',
                template: '<ion-backdrop [class.hide-backdrop]="!d.showBackdrop"></ion-backdrop>' +
                    '<div class="loading-wrapper">' +
                    '<div *ngIf="showSpinner" class="loading-spinner">' +
                    '<ion-spinner [name]="d.spinner"></ion-spinner>' +
                    '</div>' +
                    '<div *ngIf="d.content" [innerHTML]="d.content" class="loading-content"></div>' +
                    '</div>',
                host: {
                    'role': 'dialog'
                },
                encapsulation: ViewEncapsulation.None,
            },] },
];
LoadingCmp.ctorParameters = [
    { type: ViewController, },
    { type: Config, },
    { type: ElementRef, },
    { type: NavParams, },
    { type: Renderer, },
];
let loadingIds = -1;
//# sourceMappingURL=loading-component.js.map