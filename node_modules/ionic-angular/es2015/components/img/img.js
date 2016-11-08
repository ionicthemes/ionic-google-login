import { Component, Input, HostBinding, ElementRef, ChangeDetectionStrategy, ViewEncapsulation, NgZone } from '@angular/core';
import { nativeRaf } from '../../util/dom';
import { isPresent } from '../../util/util';
import { Platform } from '../../platform/platform';
export class Img {
    constructor(_elementRef, _platform, _zone) {
        this._elementRef = _elementRef;
        this._platform = _platform;
        this._zone = _zone;
        this._src = '';
        this._normalizeSrc = '';
        this._imgs = [];
        this._enabled = true;
    }
    set src(val) {
        let tmpImg = new Image();
        tmpImg.src = isPresent(val) ? val : '';
        this._src = isPresent(val) ? val : '';
        this._normalizeSrc = tmpImg.src;
        if (this._init) {
            this._update();
        }
    }
    ngOnInit() {
        this._init = true;
        this._update();
    }
    _update() {
        if (this._enabled && this._src !== '') {
            for (var i = this._imgs.length - 1; i >= 0; i--) {
                if (this._imgs[i].src === this._normalizeSrc) {
                    if (this._imgs[i].complete) {
                        this._loaded(true);
                    }
                }
                else {
                    if (this._imgs[i].parentElement) {
                        this._imgs[i].parentElement.removeChild(this._imgs[i]);
                    }
                    this._imgs.splice(i, 1);
                }
            }
            if (!this._imgs.length) {
                this._zone.runOutsideAngular(() => {
                    let img = new Image();
                    img.style.width = this._width;
                    img.style.height = this._height;
                    if (isPresent(this.alt)) {
                        img.alt = this.alt;
                    }
                    if (isPresent(this.title)) {
                        img.title = this.title;
                    }
                    img.addEventListener('load', () => {
                        if (img.src === this._normalizeSrc) {
                            this._elementRef.nativeElement.appendChild(img);
                            nativeRaf(() => {
                                this._update();
                            });
                        }
                    });
                    img.src = this._src;
                    this._imgs.push(img);
                    this._loaded(false);
                });
            }
        }
        else {
            if (!this._imgs.some(img => img.src === this._normalizeSrc)) {
                this._loaded(false);
            }
        }
    }
    _loaded(isLoaded) {
        this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
    }
    enable(shouldEnable) {
        this._enabled = shouldEnable;
        this._update();
    }
    set width(val) {
        this._w = getUnitValue(val);
    }
    set height(val) {
        this._h = getUnitValue(val);
    }
    get _width() {
        return isPresent(this._w) ? this._w : '';
    }
    get _height() {
        return isPresent(this._h) ? this._h : '';
    }
}
Img.decorators = [
    { type: Component, args: [{
                selector: 'ion-img',
                template: '<div class="img-placeholder" [style.height]="_h" [style.width]="_w"></div>',
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
Img.ctorParameters = [
    { type: ElementRef, },
    { type: Platform, },
    { type: NgZone, },
];
Img.propDecorators = {
    'src': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'alt': [{ type: Input },],
    'title': [{ type: Input },],
    '_width': [{ type: HostBinding, args: ['style.width',] },],
    '_height': [{ type: HostBinding, args: ['style.height',] },],
};
function getUnitValue(val) {
    if (isPresent(val)) {
        if (typeof val === 'string') {
            if (val.indexOf('%') > -1 || val.indexOf('px') > -1) {
                return val;
            }
            if (val.length) {
                return val + 'px';
            }
        }
        else if (typeof val === 'number') {
            return val + 'px';
        }
    }
    return '';
}
//# sourceMappingURL=img.js.map