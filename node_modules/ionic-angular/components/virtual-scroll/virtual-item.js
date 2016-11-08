import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
export var VirtualHeader = (function () {
    function VirtualHeader(templateRef) {
        this.templateRef = templateRef;
    }
    VirtualHeader.decorators = [
        { type: Directive, args: [{ selector: '[virtualHeader]' },] },
    ];
    VirtualHeader.ctorParameters = [
        { type: TemplateRef, },
    ];
    return VirtualHeader;
}());
export var VirtualFooter = (function () {
    function VirtualFooter(templateRef) {
        this.templateRef = templateRef;
    }
    VirtualFooter.decorators = [
        { type: Directive, args: [{ selector: '[virtualFooter]' },] },
    ];
    VirtualFooter.ctorParameters = [
        { type: TemplateRef, },
    ];
    return VirtualFooter;
}());
export var VirtualItem = (function () {
    function VirtualItem(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    VirtualItem.decorators = [
        { type: Directive, args: [{ selector: '[virtualItem]' },] },
    ];
    VirtualItem.ctorParameters = [
        { type: TemplateRef, },
        { type: ViewContainerRef, },
    ];
    return VirtualItem;
}());
//# sourceMappingURL=virtual-item.js.map