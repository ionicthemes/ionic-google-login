import { ElementRef, Renderer } from '@angular/core';
import { Config } from '../config/config';
export declare class Ion {
    private _ionId;
    _config: Config;
    _elementRef: ElementRef;
    _renderer: Renderer;
    _color: string;
    _mode: string;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
    setElementClass(className: string, isAdd: boolean): void;
    setElementAttribute(attributeName: string, attributeValue: any): void;
    setElementStyle(property: string, value: string): void;
    _setColor(componentName: string, newColor: string): void;
    _setMode(componentName: string, newMode: string): void;
    getElementRef(): ElementRef;
    getNativeElement(): any;
    getDimensions(): {
        width: number;
        height: number;
        left: number;
        top: number;
    };
    width(): number;
    height(): number;
    destroy(): void;
    _getId(): string;
}
