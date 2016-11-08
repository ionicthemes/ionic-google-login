import { TemplateRef, ViewContainerRef } from '@angular/core';
export declare class VirtualHeader {
    templateRef: TemplateRef<Object>;
    constructor(templateRef: TemplateRef<Object>);
}
export declare class VirtualFooter {
    templateRef: TemplateRef<Object>;
    constructor(templateRef: TemplateRef<Object>);
}
export declare class VirtualItem {
    templateRef: TemplateRef<Object>;
    viewContainer: ViewContainerRef;
    constructor(templateRef: TemplateRef<Object>, viewContainer: ViewContainerRef);
}
