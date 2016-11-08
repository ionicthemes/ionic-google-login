import { Directive, TemplateRef, ViewContainerRef } from '@angular/core';
export class VirtualHeader {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
VirtualHeader.decorators = [
    { type: Directive, args: [{ selector: '[virtualHeader]' },] },
];
VirtualHeader.ctorParameters = [
    { type: TemplateRef, },
];
export class VirtualFooter {
    constructor(templateRef) {
        this.templateRef = templateRef;
    }
}
VirtualFooter.decorators = [
    { type: Directive, args: [{ selector: '[virtualFooter]' },] },
];
VirtualFooter.ctorParameters = [
    { type: TemplateRef, },
];
export class VirtualItem {
    constructor(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
}
VirtualItem.decorators = [
    { type: Directive, args: [{ selector: '[virtualItem]' },] },
];
VirtualItem.ctorParameters = [
    { type: TemplateRef, },
    { type: ViewContainerRef, },
];
//# sourceMappingURL=virtual-item.js.map