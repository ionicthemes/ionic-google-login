import { Component, ComponentFactoryResolver, HostListener, Renderer, ViewChild, ViewContainerRef } from '@angular/core';
import { Key } from '../../util/key';
import { NavParams } from '../../navigation/nav-params';
import { ViewController } from '../../navigation/view-controller';
export var ModalCmp = (function () {
    function ModalCmp(_cfr, _renderer, _navParams, _viewCtrl) {
        this._cfr = _cfr;
        this._renderer = _renderer;
        this._navParams = _navParams;
        this._viewCtrl = _viewCtrl;
        this._bdDismiss = _navParams.data.opts.enableBackdropDismiss;
    }
    ModalCmp.prototype.ionViewPreLoad = function () {
        this._load(this._navParams.data.component);
    };
    ModalCmp.prototype._load = function (component) {
        if (component) {
            var componentFactory = this._cfr.resolveComponentFactory(component);
            var componentRef = this._viewport.createComponent(componentFactory, this._viewport.length, this._viewport.parentInjector, []);
            this._viewCtrl._setInstance(componentRef.instance);
            this._setCssClass(componentRef, 'ion-page');
            this._setCssClass(componentRef, 'show-page');
            this._enabled = true;
        }
    };
    ModalCmp.prototype._setCssClass = function (componentRef, className) {
        this._renderer.setElementClass(componentRef.location.nativeElement, className, true);
    };
    ModalCmp.prototype._bdClick = function () {
        if (this._enabled && this._bdDismiss) {
            return this._viewCtrl.dismiss(null, 'backdrop');
        }
    };
    ModalCmp.prototype._keyUp = function (ev) {
        if (this._enabled && this._viewCtrl.isLast() && ev.keyCode === Key.ESCAPE) {
            this._bdClick();
        }
    };
    ModalCmp.decorators = [
        { type: Component, args: [{
                    selector: 'ion-modal',
                    template: '<ion-backdrop disableScroll="false" (click)="_bdClick()"></ion-backdrop>' +
                        '<div class="modal-wrapper">' +
                        '<div #viewport nav-viewport></div>' +
                        '</div>'
                },] },
    ];
    ModalCmp.ctorParameters = [
        { type: ComponentFactoryResolver, },
        { type: Renderer, },
        { type: NavParams, },
        { type: ViewController, },
    ];
    ModalCmp.propDecorators = {
        '_viewport': [{ type: ViewChild, args: ['viewport', { read: ViewContainerRef },] },],
        '_keyUp': [{ type: HostListener, args: ['body:keyup', ['$event'],] },],
    };
    return ModalCmp;
}());
//# sourceMappingURL=modal-component.js.map