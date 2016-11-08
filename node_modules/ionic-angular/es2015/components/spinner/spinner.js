import { ChangeDetectionStrategy, Component, ElementRef, Input, Renderer, ViewEncapsulation } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { CSS } from '../../util/dom';
export class Spinner extends Ion {
    constructor(config, elementRef, renderer) {
        super(config, elementRef, renderer);
        this._dur = null;
        this.paused = false;
        this.mode = config.get('mode');
    }
    get color() {
        return this._color;
    }
    set color(value) {
        this._setColor('spinner', value);
    }
    set mode(val) {
        this._setMode('spinner', val);
    }
    get name() {
        return this._name;
    }
    set name(val) {
        this._name = val;
        this.load();
    }
    get duration() {
        return this._dur;
    }
    set duration(val) {
        this._dur = val;
        this.load();
    }
    ngOnInit() {
        this._init = true;
        this.load();
    }
    load() {
        if (this._init) {
            this._l = [];
            this._c = [];
            var name = this._name || this._config.get('spinner', 'ios');
            const spinner = SPINNERS[name];
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
    }
    _loadEle(spinner, index, total) {
        let duration = this._dur || spinner.dur;
        let data = spinner.fn(duration, index, total);
        data.style.animationDuration = duration + 'ms';
        return data;
    }
}
Spinner.decorators = [
    { type: Component, args: [{
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
                changeDetection: ChangeDetectionStrategy.OnPush,
                encapsulation: ViewEncapsulation.None,
            },] },
];
Spinner.ctorParameters = [
    { type: Config, },
    { type: ElementRef, },
    { type: Renderer, },
];
Spinner.propDecorators = {
    'color': [{ type: Input },],
    'mode': [{ type: Input },],
    'name': [{ type: Input },],
    'duration': [{ type: Input },],
    'paused': [{ type: Input },],
};
const SPINNERS = {
    ios: {
        dur: 1000,
        lines: 12,
        fn: function (dur, index, total) {
            return {
                y1: 17,
                y2: 29,
                style: {
                    [CSS.transform]: 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)',
                    [CSS.animationDelay]: -(dur - ((dur / total) * index)) + 'ms'
                }
            };
        }
    },
    'ios-small': {
        dur: 1000,
        lines: 12,
        fn: function (dur, index, total) {
            return {
                y1: 12,
                y2: 20,
                style: {
                    [CSS.transform]: 'rotate(' + (30 * index + (index < 6 ? 180 : -180)) + 'deg)',
                    [CSS.animationDelay]: -(dur - ((dur / total) * index)) + 'ms'
                }
            };
        }
    },
    bubbles: {
        dur: 1000,
        circles: 9,
        fn: function (dur, index, total) {
            return {
                r: 5,
                style: {
                    top: (9 * Math.sin(2 * Math.PI * index / total)) + 'px',
                    left: (9 * Math.cos(2 * Math.PI * index / total)) + 'px',
                    [CSS.animationDelay]: -(dur - ((dur / total) * index)) + 'ms'
                }
            };
        }
    },
    circles: {
        dur: 1000,
        circles: 8,
        fn: function (dur, index, total) {
            return {
                r: 5,
                style: {
                    top: (9 * Math.sin(2 * Math.PI * index / total)) + 'px',
                    left: (9 * Math.cos(2 * Math.PI * index / total)) + 'px',
                    [CSS.animationDelay]: -(dur - ((dur / total) * index)) + 'ms'
                }
            };
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
                style: {
                    left: (9 - (9 * index)) + 'px',
                    [CSS.animationDelay]: -(110 * index) + 'ms'
                }
            };
        }
    }
};
//# sourceMappingURL=spinner.js.map