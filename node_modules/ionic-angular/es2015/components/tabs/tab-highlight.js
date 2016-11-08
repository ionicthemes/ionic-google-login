import { Directive, ElementRef } from '@angular/core';
import { rafFrames } from '../../util/dom';
export class TabHighlight {
    constructor(_elementRef) {
        this._elementRef = _elementRef;
    }
    select(tab) {
        rafFrames(3, () => {
            let d = tab.btn.getDimensions();
            let ele = this._elementRef.nativeElement;
            ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
            if (!this._init) {
                this._init = true;
                rafFrames(6, () => {
                    ele.classList.add('animate');
                });
            }
        });
    }
}
TabHighlight.decorators = [
    { type: Directive, args: [{
                selector: '.tab-highlight'
            },] },
];
TabHighlight.ctorParameters = [
    { type: ElementRef, },
];
//# sourceMappingURL=tab-highlight.js.map