(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../util/dom', '../../util/util', '../../platform/platform'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var dom_1 = require('../../util/dom');
    var util_1 = require('../../util/util');
    var platform_1 = require('../../platform/platform');
    var Img = (function () {
        function Img(_elementRef, _platform, _zone) {
            this._elementRef = _elementRef;
            this._platform = _platform;
            this._zone = _zone;
            this._src = '';
            this._normalizeSrc = '';
            this._imgs = [];
            this._enabled = true;
        }
        Object.defineProperty(Img.prototype, "src", {
            set: function (val) {
                var tmpImg = new Image();
                tmpImg.src = util_1.isPresent(val) ? val : '';
                this._src = util_1.isPresent(val) ? val : '';
                this._normalizeSrc = tmpImg.src;
                if (this._init) {
                    this._update();
                }
            },
            enumerable: true,
            configurable: true
        });
        Img.prototype.ngOnInit = function () {
            this._init = true;
            this._update();
        };
        Img.prototype._update = function () {
            var _this = this;
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
                    this._zone.runOutsideAngular(function () {
                        var img = new Image();
                        img.style.width = _this._width;
                        img.style.height = _this._height;
                        if (util_1.isPresent(_this.alt)) {
                            img.alt = _this.alt;
                        }
                        if (util_1.isPresent(_this.title)) {
                            img.title = _this.title;
                        }
                        img.addEventListener('load', function () {
                            if (img.src === _this._normalizeSrc) {
                                _this._elementRef.nativeElement.appendChild(img);
                                dom_1.nativeRaf(function () {
                                    _this._update();
                                });
                            }
                        });
                        img.src = _this._src;
                        _this._imgs.push(img);
                        _this._loaded(false);
                    });
                }
            }
            else {
                if (!this._imgs.some(function (img) { return img.src === _this._normalizeSrc; })) {
                    this._loaded(false);
                }
            }
        };
        Img.prototype._loaded = function (isLoaded) {
            this._elementRef.nativeElement.classList[isLoaded ? 'add' : 'remove']('img-loaded');
        };
        Img.prototype.enable = function (shouldEnable) {
            this._enabled = shouldEnable;
            this._update();
        };
        Object.defineProperty(Img.prototype, "width", {
            set: function (val) {
                this._w = getUnitValue(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "height", {
            set: function (val) {
                this._h = getUnitValue(val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "_width", {
            get: function () {
                return util_1.isPresent(this._w) ? this._w : '';
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Img.prototype, "_height", {
            get: function () {
                return util_1.isPresent(this._h) ? this._h : '';
            },
            enumerable: true,
            configurable: true
        });
        Img.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-img',
                        template: '<div class="img-placeholder" [style.height]="_h" [style.width]="_w"></div>',
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Img.ctorParameters = [
            { type: core_1.ElementRef, },
            { type: platform_1.Platform, },
            { type: core_1.NgZone, },
        ];
        Img.propDecorators = {
            'src': [{ type: core_1.Input },],
            'width': [{ type: core_1.Input },],
            'height': [{ type: core_1.Input },],
            'alt': [{ type: core_1.Input },],
            'title': [{ type: core_1.Input },],
            '_width': [{ type: core_1.HostBinding, args: ['style.width',] },],
            '_height': [{ type: core_1.HostBinding, args: ['style.height',] },],
        };
        return Img;
    }());
    exports.Img = Img;
    function getUnitValue(val) {
        if (util_1.isPresent(val)) {
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
});
//# sourceMappingURL=img.js.map