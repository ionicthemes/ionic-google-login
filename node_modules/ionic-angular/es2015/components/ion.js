import { getDimensions, clearDimensions } from '../util/dom';
export class Ion {
    constructor(config, elementRef, renderer) {
        this._config = config;
        this._elementRef = elementRef;
        this._renderer = renderer;
    }
    setElementClass(className, isAdd) {
        this._renderer.setElementClass(this._elementRef.nativeElement, className, isAdd);
    }
    setElementAttribute(attributeName, attributeValue) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, attributeName, attributeValue);
    }
    setElementStyle(property, value) {
        this._renderer.setElementStyle(this._elementRef.nativeElement, property, value);
    }
    _setColor(componentName, newColor) {
        if (this._color) {
            this.setElementClass(`${componentName}-${this._mode}-${this._color}`, false);
        }
        if (newColor) {
            this.setElementClass(`${componentName}-${this._mode}-${newColor}`, true);
            this._color = newColor;
        }
    }
    _setMode(componentName, newMode) {
        if (this._mode) {
            this.setElementClass(`${componentName}-${this._mode}`, false);
        }
        if (newMode) {
            this.setElementClass(`${componentName}-${newMode}`, true);
            this._setColor(componentName, null);
            this._mode = newMode;
            this._setColor(componentName, this._color);
        }
    }
    getElementRef() {
        return this._elementRef;
    }
    getNativeElement() {
        return this._elementRef.nativeElement;
    }
    getDimensions() {
        return getDimensions(this.getNativeElement(), this._getId());
    }
    width() {
        return getDimensions(this.getNativeElement(), this._getId()).width;
    }
    height() {
        return getDimensions(this.getNativeElement(), this._getId()).height;
    }
    destroy() {
        clearDimensions(this._ionId);
    }
    _getId() {
        if (!this._ionId) {
            this._ionId = 'i' + ids++;
        }
        return this._ionId;
    }
}
let ids = 0;
//# sourceMappingURL=ion.js.map