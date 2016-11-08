(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '../../util/dom'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var dom_1 = require('../../util/dom');
    var TabHighlight = (function () {
        function TabHighlight(_elementRef) {
            this._elementRef = _elementRef;
        }
        TabHighlight.prototype.select = function (tab) {
            var _this = this;
            dom_1.rafFrames(3, function () {
                var d = tab.btn.getDimensions();
                var ele = _this._elementRef.nativeElement;
                ele.style.transform = 'translate3d(' + d.left + 'px,0,0) scaleX(' + d.width + ')';
                if (!_this._init) {
                    _this._init = true;
                    dom_1.rafFrames(6, function () {
                        ele.classList.add('animate');
                    });
                }
            });
        };
        TabHighlight.decorators = [
            { type: core_1.Directive, args: [{
                        selector: '.tab-highlight'
                    },] },
        ];
        TabHighlight.ctorParameters = [
            { type: core_1.ElementRef, },
        ];
        return TabHighlight;
    }());
    exports.TabHighlight = TabHighlight;
});
//# sourceMappingURL=tab-highlight.js.map