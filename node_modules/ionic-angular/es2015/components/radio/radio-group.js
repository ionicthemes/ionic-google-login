import { ContentChild, Directive, ElementRef, EventEmitter, forwardRef, Output, Renderer } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';
import { ListHeader } from '../list/list-header';
import { isCheckedProperty } from '../../util/util';
export const RADIO_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => RadioGroup),
    multi: true
};
export class RadioGroup {
    constructor(_renderer, _elementRef) {
        this._renderer = _renderer;
        this._elementRef = _elementRef;
        this._btns = [];
        this._ids = -1;
        this._init = false;
        this.ionChange = new EventEmitter();
        this.id = ++radioGroupIds;
    }
    ngAfterContentInit() {
        let activeButton = this._btns.find(b => b.checked);
        if (activeButton) {
            this._setActive(activeButton);
        }
    }
    writeValue(val) {
        (void 0);
        this.value = val;
        if (this._init) {
            this._update();
            this.onTouched();
            this.ionChange.emit(val);
        }
        this._init = true;
    }
    registerOnChange(fn) {
        this._fn = fn;
        this.onChange = (val) => {
            (void 0);
            fn(val);
            this.value = val;
            this._update();
            this.onTouched();
            this.ionChange.emit(val);
        };
    }
    registerOnTouched(fn) { this.onTouched = fn; }
    _update() {
        let hasChecked = false;
        this._btns.forEach(radioButton => {
            radioButton.checked = isCheckedProperty(this.value, radioButton.value) && !hasChecked;
            if (radioButton.checked) {
                this._setActive(radioButton);
                hasChecked = true;
            }
        });
    }
    _setActive(radioButton) {
        this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-activedescendant', radioButton.id);
    }
    add(button) {
        this._btns.push(button);
        button.ionSelect.subscribe((val) => {
            this.onChange(val);
        });
        return this.id + '-' + (++this._ids);
    }
    remove(button) {
        let index = this._btns.indexOf(button);
        if (index > -1) {
            if (button.value === this.value) {
                this.value = null;
            }
            this._btns.splice(index, 1);
        }
    }
    set _header(header) {
        if (header) {
            if (!header.id) {
                header.id = 'rg-hdr-' + this.id;
            }
            this._renderer.setElementAttribute(this._elementRef.nativeElement, 'aria-describedby', header.id);
        }
    }
    onChange(val) {
        (void 0);
        this.value = val;
        this._update();
        this.onTouched();
        this.ionChange.emit(val);
    }
    onTouched() { }
}
RadioGroup.decorators = [
    { type: Directive, args: [{
                selector: '[radio-group]',
                host: {
                    'role': 'radiogroup'
                },
                providers: [RADIO_VALUE_ACCESSOR]
            },] },
];
RadioGroup.ctorParameters = [
    { type: Renderer, },
    { type: ElementRef, },
];
RadioGroup.propDecorators = {
    'ionChange': [{ type: Output },],
    '_header': [{ type: ContentChild, args: [ListHeader,] },],
};
let radioGroupIds = -1;
//# sourceMappingURL=radio-group.js.map