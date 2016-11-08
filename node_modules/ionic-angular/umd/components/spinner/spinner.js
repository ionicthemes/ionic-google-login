var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../config/config', '../ion', '../../util/dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var config_1 = require('../../config/config');
    var ion_1 = require('../ion');
    var dom_1 = require('../../util/dom');
    var Spinner = (function (_super) {
        __extends(Spinner, _super);
        function Spinner(config, elementRef, renderer) {
            _super.call(this, config, elementRef, renderer);
            this._dur = null;
            this.paused = false;
            this.mode = config.get('mode');
        }
        Object.defineProperty(Spinner.prototype, "color", {
            get: function () {
                return this._color;
            },
            set: function (value) {
                this._setColor('spinner', value);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Spinner.prototype, "mode", {
            set: function (val) {
                this._setMode('spinner', val);
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Spinner.prototype, "name", {
            get: function () {
                return this._name;
            },
            set: function (val) {
                this._name = val;
                this.load();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Spinner.prototype, "duration", {
            get: function () {
                return this._dur;
            },
            set: function (val) {
                this._dur = val;
                this.load();
            },
            enumerable: true,
            configurable: true
        });
        Spinner.prototype.ngOnInit = function () {
            this._init = true;
            this.load();
        };
        Spinner.prototype.load = function () {
            if (this._init) {
                this._l = [];
                this._c = [];
                var name = this._name || this._config.get('spinner', 'ios');
                var spinner = SPINNERS[name];
                if (spinner) {
                    this._applied = 'spinner-' + name;
                    if (spinner.lines) {
                        for (var i = 0, l = spinner.lines; i < l; i++) {
                            this._l.push(this._loadEle(spinner, i, l));
                        }
                    }
                    else if (spinner.circles) {
                        for (var i = 0, l = spinner.circles; i < l; i++) {
                            this._c.push(this._loadEle(spinner, i, l));
                        }
                    }
                    this.setElementClass(this._applied, true);
                }
            }
        };
        Spinner.prototype._loadEle = function (spinner, index, total) {
            var duration = this._dur || spinner.dur;
            var data = spinner.fn(duration, index, total);
            data.style.animationDuration = duration + 'ms';
            return data;
        };
        Spinner.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-spinner',
                        template: '<svg viewBox="0 0 64 64" *ngFor="let i of _c" [ngStyle]="i.style">' +
                            '<circle [attr.r]="i.r" transform="translate(32,32)"></circle>' +
                            '</svg>' +
                            '<svg viewBox="0 0 64 64" *ngFor="let i of _l" [ngStyle]="i.style">' +
                            '<line [attr.y1]="i.y1" [attr.y2]="i.y2" transform="translate(32,32)"></line>' +
                            '</svg>',
                        host: {
                            '[class.spinner-paused]': 'paused'
                        },
                        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        Spinner.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: core_1.Renderer, },
        ];
        Spinner.propDecorators = {
            'color': [{ type: core_1.Input },],
            'mode': [{ type: core_1.Input },],
            'name': [{ type: core_1.Input },],
            'duration': [{ type: core_1.Input },],
            'paused': [{ type: core_1.Input },],
        };
        return Spinner;
    }(ion_1.Ion));
    exports.Spinner = Spinner;
    var SPINNERS = {
        ios: {
            dur: 1000,
            lines: 12,
            fn: function (dur, index, total) {
                return {
                    y1: 17,
                    y2: 29,
                    style: (_a = {},
                        _a[dom_1.CSS.transform] = 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)',
                        _a[dom_1.CSS.animationDelay] = -(dur - ((dur / total) * index)) + 'ms',
                        _a
                    )
                };
                var _a;
            }
        },
        'ios-small': {
            dur: 1000,
            lines: 12,
            fn: function (dur, index, total) {
                return {
                    y1: 12,
                    y2: 20,
                    style: (_a = {},
                        _a[dom_1.CSS.transform] = 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)',
                        _a[dom_1.CSS.animationDelay] = -(dur - ((dur / total) * index)) + 'ms',
                        _a
                    )
                };
                var _a;
            }
        },
        bubbles: {
            dur: 1000,
            circles: 9,
            fn: function (dur, index, total) {
                return {
                    r: 5,
                    style: (_a = {
                            top: (9 * Math.sin(2 * Math.PI * index / total)) + 'px',
                            left: (9 * Math.cos(2 * Math.PI * index / total)) + 'px'
                        },
                        _a[dom_1.CSS.animationDelay] = -(dur - ((dur / total) * index)) + 'ms',
                        _a
                    )
                };
                var _a;
            }
        },
        circles: {
            dur: 1000,
            circles: 8,
            fn: function (dur, index, total) {
                return {
                    r: 5,
                    style: (_a = {
                            top: (9 * Math.sin(2 * Math.PI * index / total)) + 'px',
                            left: (9 * Math.cos(2 * Math.PI * index / total)) + 'px'
                        },
                        _a[dom_1.CSS.animationDelay] = -(dur - ((dur / total) * index)) + 'ms',
                        _a
                    )
                };
                var _a;
            }
        },
        crescent: {
            dur: 750,
            circles: 1,
            fn: function (dur) {
                return {
                    r: 26,
                    style: {}
                };
            }
        },
        dots: {
            dur: 750,
            circles: 3,
            fn: function (dur, index, total) {
                return {
                    r: 6,
                    style: (_a = {
                            left: (9 - (9 * index)) + 'px'
                        },
                        _a[dom_1.CSS.animationDelay] = -(110 * index) + 'ms',
                        _a
                    )
                };
                var _a;
            }
        }
    };
});
//# sourceMappingURL=spinner.js.map