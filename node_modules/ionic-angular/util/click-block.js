import { Directive, ElementRef, forwardRef, Inject, Renderer } from '@angular/core';
import { App } from '../components/app/app';
import { clearNativeTimeout, nativeTimeout } from './dom';
import { Config } from '../config/config';
var DEFAULT_EXPIRE = 330;
export var ClickBlock = (function () {
    function ClickBlock(app, config, elementRef, renderer) {
        this.elementRef = elementRef;
        this.renderer = renderer;
        this._showing = false;
        app._clickBlock = this;
        this.isEnabled = config.getBoolean('clickBlock', true);
    }
    ClickBlock.prototype.activate = function (shouldShow, expire) {
        if (this.isEnabled) {
            clearNativeTimeout(this._tmrId);
            if (shouldShow) {
                this._tmrId = nativeTimeout(this.activate.bind(this, false), expire || DEFAULT_EXPIRE);
            }
            if (this._showing !== shouldShow) {
                this.renderer.setElementClass(this.elementRef.nativeElement, 'click-block-active', shouldShow);
                this._showing = shouldShow;
            }
        }
    };
    ClickBlock.decorators = [
        { type: Directive, args: [{
                    selector: '.click-block'
                },] },
    ];
    ClickBlock.ctorParameters = [
        { type: App, decorators: [{ type: Inject, args: [forwardRef(function () { return App; }),] },] },
        { type: Config, },
        { type: ElementRef, },
        { type: Renderer, },
    ];
    return ClickBlock;
}());
//# sourceMappingURL=click-block.js.map