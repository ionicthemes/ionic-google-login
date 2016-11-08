(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var VirtualHeader = (function () {
        function VirtualHeader(templateRef) {
            this.templateRef = templateRef;
        }
        VirtualHeader.decorators = [
            { type: core_1.Directive, args: [{ selector: '[virtualHeader]' },] },
        ];
        VirtualHeader.ctorParameters = [
            { type: core_1.TemplateRef, },
        ];
        return VirtualHeader;
    }());
    exports.VirtualHeader = VirtualHeader;
    var VirtualFooter = (function () {
        function VirtualFooter(templateRef) {
            this.templateRef = templateRef;
        }
        VirtualFooter.decorators = [
            { type: core_1.Directive, args: [{ selector: '[virtualFooter]' },] },
        ];
        VirtualFooter.ctorParameters = [
            { type: core_1.TemplateRef, },
        ];
        return VirtualFooter;
    }());
    exports.VirtualFooter = VirtualFooter;
    var VirtualItem = (function () {
        function VirtualItem(templateRef, viewContainer) {
            this.templateRef = templateRef;
            this.viewContainer = viewContainer;
        }
        VirtualItem.decorators = [
            { type: core_1.Directive, args: [{ selector: '[virtualItem]' },] },
        ];
        VirtualItem.ctorParameters = [
            { type: core_1.TemplateRef, },
            { type: core_1.ViewContainerRef, },
        ];
        return VirtualItem;
    }());
    exports.VirtualItem = VirtualItem;
});
//# sourceMappingURL=virtual-item.js.map