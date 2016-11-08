(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../config/config', '../../util/util', '../../navigation/nav-params', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var util_1 = require('../../util/util');
    var nav_params_1 = require('../../navigation/nav-params');
    var view_controller_1 = require('../../navigation/view-controller');
    var LoadingCmp = (function () {
        function LoadingCmp(_viewCtrl, _config, _elementRef, params, renderer) {
            this._viewCtrl = _viewCtrl;
            this._config = _config;
            this._elementRef = _elementRef;
            this.d = params.data;
            renderer.setElementClass(_elementRef.nativeElement, "loading-" + _config.get('mode'), true);
            if (this.d.cssClass) {
                this.d.cssClass.split(' ').forEach(function (cssClass) {
                    if (cssClass.trim() !== '')
                        renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
                });
            }
            this.id = (++loadingIds);
        }
        LoadingCmp.prototype.ngOnInit = function () {
            if (util_1.isUndefined(this.d.spinner)) {
                this.d.spinner = this._config.get('loadingSpinner', this._config.get('spinner', 'ios'));
            }
            this.showSpinner = util_1.isDefined(this.d.spinner) && this.d.spinner !== 'hide';
        };
        LoadingCmp.prototype.ionViewDidEnter = function () {
            var _this = this;
            var activeElement = document.activeElement;
            if (document.activeElement) {
                activeElement.blur();
            }
            if (this.d && this.d.duration) {
                this.durationTimeout = setTimeout(function () {
                    _this.dismiss('backdrop');
                }, this.d.duration);
            }
        };
        LoadingCmp.prototype.dismiss = function (role) {
            if (this.durationTimeout) {
                clearTimeout(this.durationTimeout);
            }
            return this._viewCtrl.dismiss(null, role);
        };
        LoadingCmp.decorators = [
            { type: core_1.Component, args: [{
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
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        LoadingCmp.ctorParameters = [
            { type: view_controller_1.ViewController, },
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: nav_params_1.NavParams, },
            { type: core_1.Renderer, },
        ];
        return LoadingCmp;
    }());
    exports.LoadingCmp = LoadingCmp;
    var loadingIds = -1;
});
//# sourceMappingURL=loading-component.js.map