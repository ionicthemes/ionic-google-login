(function (factory) {
    if (typeof module === 'object' && typeof module.exports === 'object') {
        var v = factory(require, exports); if (v !== undefined) module.exports = v;
    }
    else if (typeof define === 'function' && define.amd) {
        define(["require", "exports", '@angular/core', '@angular/platform-browser', '../../util/dom', '../../util/util', '../../config/config', '../../util/key', '../../navigation/nav-params', '../../util/haptic', '../../util/ui-event-manager', '../../navigation/view-controller'], factory);
    }
})(function (require, exports) {
    "use strict";
    var core_1 = require('@angular/core');
    var platform_browser_1 = require('@angular/platform-browser');
    var dom_1 = require('../../util/dom');
    var util_1 = require('../../util/util');
    var config_1 = require('../../config/config');
    var key_1 = require('../../util/key');
    var nav_params_1 = require('../../navigation/nav-params');
    var haptic_1 = require('../../util/haptic');
    var ui_event_manager_1 = require('../../util/ui-event-manager');
    var view_controller_1 = require('../../navigation/view-controller');
    var PickerColumnCmp = (function () {
        function PickerColumnCmp(config, elementRef, _sanitizer, _haptic) {
            this.elementRef = elementRef;
            this._sanitizer = _sanitizer;
            this._haptic = _haptic;
            this.y = 0;
            this.pos = [];
            this.startY = null;
            this.receivingEvents = false;
            this.events = new ui_event_manager_1.UIEventManager();
            this.ionChange = new core_1.EventEmitter();
            this.rotateFactor = config.getNumber('pickerRotateFactor', 0);
        }
        PickerColumnCmp.prototype.ngAfterViewInit = function () {
            var colEle = this.colEle.nativeElement;
            this.colHeight = colEle.clientHeight;
            this.optHeight = (colEle.firstElementChild ? colEle.firstElementChild.clientHeight : 0);
            this.setSelected(this.col.selectedIndex, 0);
            this.events.pointerEvents({
                elementRef: this.elementRef,
                pointerDown: this.pointerStart.bind(this),
                pointerMove: this.pointerMove.bind(this),
                pointerUp: this.pointerEnd.bind(this)
            });
        };
        PickerColumnCmp.prototype.ngOnDestroy = function () {
            this.events.unlistenAll();
        };
        PickerColumnCmp.prototype.pointerStart = function (ev) {
            (void 0);
            dom_1.cancelRaf(this.rafId);
            this.startY = dom_1.pointerCoord(ev).y;
            this.receivingEvents = true;
            this.velocity = 0;
            this.pos.length = 0;
            this.pos.push(this.startY, Date.now());
            var minY = (this.col.options.length - 1);
            var maxY = 0;
            for (var i = 0; i < this.col.options.length; i++) {
                if (!this.col.options[i].disabled) {
                    minY = Math.min(minY, i);
                    maxY = Math.max(maxY, i);
                }
            }
            this.minY = (minY * this.optHeight * -1);
            this.maxY = (maxY * this.optHeight * -1);
            this._haptic.gestureSelectionStart();
            return true;
        };
        PickerColumnCmp.prototype.pointerMove = function (ev) {
            ev.preventDefault();
            ev.stopPropagation();
            if (this.startY === null) {
                return;
            }
            var currentY = dom_1.pointerCoord(ev).y;
            this.pos.push(currentY, Date.now());
            var y = this.y + (currentY - this.startY);
            if (y > this.minY) {
                y = Math.pow(y, 0.8);
                this.bounceFrom = y;
            }
            else if (y < this.maxY) {
                y += Math.pow(this.maxY - y, 0.9);
                this.bounceFrom = y;
            }
            else {
                this.bounceFrom = 0;
            }
            this.update(y, 0, false, false);
            var currentIndex = Math.max(Math.abs(Math.round(y / this.optHeight)), 0);
            if (currentIndex !== this.lastTempIndex) {
                this._haptic.gestureSelectionChanged();
            }
            this.lastTempIndex = currentIndex;
        };
        PickerColumnCmp.prototype.pointerEnd = function (ev) {
            if (!this.receivingEvents) {
                return;
            }
            this.receivingEvents = false;
            this.velocity = 0;
            if (this.bounceFrom > 0) {
                this.update(this.minY, 100, true, true);
            }
            else if (this.bounceFrom < 0) {
                this.update(this.maxY, 100, true, true);
            }
            else if (this.startY !== null) {
                var endY = dom_1.pointerCoord(ev).y;
                (void 0);
                this.pos.push(endY, Date.now());
                var endPos = (this.pos.length - 1);
                var startPos = endPos;
                var timeRange = (Date.now() - 100);
                for (var i = endPos; i > 0 && this.pos[i] > timeRange; i -= 2) {
                    startPos = i;
                }
                if (startPos !== endPos) {
                    var timeOffset = (this.pos[endPos] - this.pos[startPos]);
                    var movedTop = (this.pos[startPos - 1] - this.pos[endPos - 1]);
                    this.velocity = ((movedTop / timeOffset) * FRAME_MS);
                }
                if (Math.abs(endY - this.startY) > 3) {
                    ev.preventDefault();
                    ev.stopPropagation();
                    var y = this.y + (endY - this.startY);
                    this.update(y, 0, true, true);
                }
            }
            this.startY = null;
            this.decelerate();
        };
        PickerColumnCmp.prototype.decelerate = function () {
            var y = 0;
            dom_1.cancelRaf(this.rafId);
            if (isNaN(this.y) || !this.optHeight) {
                this.update(y, 0, true, true);
                this._haptic.gestureSelectionEnd();
            }
            else if (Math.abs(this.velocity) > 0) {
                this.velocity *= DECELERATION_FRICTION;
                this.velocity = (this.velocity > 0 ? Math.max(this.velocity, 1) : Math.min(this.velocity, -1));
                y = Math.round(this.y - this.velocity);
                if (y > this.minY) {
                    y = this.minY;
                    this.velocity = 0;
                }
                else if (y < this.maxY) {
                    y = this.maxY;
                    this.velocity = 0;
                }
                var notLockedIn = (y % this.optHeight !== 0 || Math.abs(this.velocity) > 1);
                this.update(y, 0, true, !notLockedIn);
                if (notLockedIn) {
                    this.rafId = dom_1.raf(this.decelerate.bind(this));
                }
            }
            else if (this.y % this.optHeight !== 0) {
                var currentPos = Math.abs(this.y % this.optHeight);
                this.velocity = (currentPos > (this.optHeight / 2) ? 1 : -1);
                this._haptic.gestureSelectionEnd();
                this.decelerate();
            }
            var currentIndex = Math.max(Math.abs(Math.round(y / this.optHeight)), 0);
            if (currentIndex !== this.lastTempIndex) {
                this._haptic.gestureSelectionChanged();
            }
            this.lastTempIndex = currentIndex;
        };
        PickerColumnCmp.prototype.optClick = function (ev, index) {
            if (!this.velocity) {
                ev.preventDefault();
                ev.stopPropagation();
                this.setSelected(index, 150);
            }
        };
        PickerColumnCmp.prototype.setSelected = function (selectedIndex, duration) {
            var y = (selectedIndex > -1) ? ((selectedIndex * this.optHeight) * -1) : 0;
            dom_1.cancelRaf(this.rafId);
            this.velocity = 0;
            this.update(y, duration, true, true);
        };
        PickerColumnCmp.prototype.update = function (y, duration, saveY, emitChange) {
            y = Math.round(y);
            this.col.selectedIndex = Math.max(Math.abs(Math.round(y / this.optHeight)), 0);
            for (var i = 0; i < this.col.options.length; i++) {
                var opt = this.col.options[i];
                var optTop = (i * this.optHeight);
                var optOffset = (optTop + y);
                var rotateX = (optOffset * this.rotateFactor);
                var translateX = 0;
                var translateY = 0;
                var translateZ = 0;
                if (this.rotateFactor !== 0) {
                    translateX = 0;
                    translateZ = 90;
                    if (rotateX > 90 || rotateX < -90) {
                        translateX = -9999;
                        rotateX = 0;
                    }
                }
                else {
                    translateY = optOffset;
                }
                opt._trans = this._sanitizer.bypassSecurityTrustStyle("rotateX(" + rotateX + "deg) translate3d(" + translateX + "px," + translateY + "px," + translateZ + "px)");
                opt._dur = (duration > 0 ? duration + 'ms' : '');
            }
            if (saveY) {
                this.y = y;
            }
            if (emitChange) {
                if (this.lastIndex === undefined) {
                    this.lastIndex = this.col.selectedIndex;
                }
                else if (this.lastIndex !== this.col.selectedIndex) {
                    this.lastIndex = this.col.selectedIndex;
                    this.ionChange.emit(this.col.options[this.col.selectedIndex]);
                }
            }
        };
        PickerColumnCmp.prototype.refresh = function () {
            var min = this.col.options.length - 1;
            var max = 0;
            for (var i = 0; i < this.col.options.length; i++) {
                if (!this.col.options[i].disabled) {
                    min = Math.min(min, i);
                    max = Math.max(max, i);
                }
            }
            var selectedIndex = util_1.clamp(min, this.col.selectedIndex, max);
            if (selectedIndex !== this.col.selectedIndex) {
                var y = (selectedIndex * this.optHeight) * -1;
                this.update(y, 150, true, true);
            }
        };
        PickerColumnCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: '.picker-col',
                        template: '<div *ngIf="col.prefix" class="picker-prefix" [style.width]="col.prefixWidth">{{col.prefix}}</div>' +
                            '<div class="picker-opts" #colEle [style.width]="col.optionsWidth">' +
                            '<button *ngFor="let o of col.options; let i=index" [style.transform]="o._trans" ' +
                            '[style.transitionDuration]="o._dur" ' +
                            '[style.webkitTransform]="o._trans" ' +
                            '[style.webkitTransitionDuration]="o._dur" ' +
                            '[class.picker-opt-selected]="col.selectedIndex === i" [class.picker-opt-disabled]="o.disabled" ' +
                            '(click)="optClick($event, i)" ' +
                            'type="button" ' +
                            'ion-button="picker-opt">' +
                            '{{o.text}}' +
                            '</button>' +
                            '</div>' +
                            '<div *ngIf="col.suffix" class="picker-suffix" [style.width]="col.suffixWidth">{{col.suffix}}</div>',
                        host: {
                            '[style.min-width]': 'col.columnWidth',
                            '[class.picker-opts-left]': 'col.align=="left"',
                            '[class.picker-opts-right]': 'col.align=="right"',
                        }
                    },] },
        ];
        PickerColumnCmp.ctorParameters = [
            { type: config_1.Config, },
            { type: core_1.ElementRef, },
            { type: platform_browser_1.DomSanitizer, },
            { type: haptic_1.Haptic, },
        ];
        PickerColumnCmp.propDecorators = {
            'colEle': [{ type: core_1.ViewChild, args: ['colEle',] },],
            'col': [{ type: core_1.Input },],
            'ionChange': [{ type: core_1.Output },],
        };
        return PickerColumnCmp;
    }());
    exports.PickerColumnCmp = PickerColumnCmp;
    var PickerCmp = (function () {
        function PickerCmp(_viewCtrl, _elementRef, _config, params, renderer) {
            this._viewCtrl = _viewCtrl;
            this._elementRef = _elementRef;
            this._config = _config;
            this.d = params.data;
            this.mode = _config.get('mode');
            renderer.setElementClass(_elementRef.nativeElement, "picker-" + this.mode, true);
            if (this.d.cssClass) {
                this.d.cssClass.split(' ').forEach(function (cssClass) {
                    renderer.setElementClass(_elementRef.nativeElement, cssClass, true);
                });
            }
            this.id = (++pickerIds);
            this.lastClick = 0;
        }
        PickerCmp.prototype.ionViewWillLoad = function () {
            var data = this.d;
            data.buttons = data.buttons.map(function (button) {
                if (util_1.isString(button)) {
                    return { text: button };
                }
                if (button.role) {
                    button.cssRole = "picker-toolbar-" + button.role;
                }
                return button;
            });
            data.columns = data.columns.map(function (column) {
                if (!util_1.isPresent(column.columnWidth)) {
                    column.columnWidth = (100 / data.columns.length) + '%';
                }
                if (!util_1.isPresent(column.options)) {
                    column.options = [];
                }
                column.options = column.options.map(function (inputOpt) {
                    var opt = {
                        text: '',
                        value: '',
                        disabled: inputOpt.disabled,
                    };
                    if (util_1.isPresent(inputOpt)) {
                        if (util_1.isString(inputOpt) || util_1.isNumber(inputOpt)) {
                            opt.text = inputOpt.toString();
                            opt.value = inputOpt;
                        }
                        else {
                            opt.text = util_1.isPresent(inputOpt.text) ? inputOpt.text : inputOpt.value;
                            opt.value = util_1.isPresent(inputOpt.value) ? inputOpt.value : inputOpt.text;
                        }
                    }
                    return opt;
                });
                return column;
            });
        };
        PickerCmp.prototype.refresh = function () {
            this._cols.forEach(function (column) {
                column.refresh();
            });
        };
        PickerCmp.prototype._colChange = function (selectedOption) {
            var picker = this._viewCtrl;
            picker.ionChange.emit(this.getSelected());
        };
        PickerCmp.prototype._keyUp = function (ev) {
            if (this.enabled && this._viewCtrl.isLast()) {
                if (ev.keyCode === key_1.Key.ENTER) {
                    if (this.lastClick + 1000 < Date.now()) {
                        (void 0);
                        var button = this.d.buttons[this.d.buttons.length - 1];
                        this.btnClick(button);
                    }
                }
                else if (ev.keyCode === key_1.Key.ESCAPE) {
                    (void 0);
                    this.bdClick();
                }
            }
        };
        PickerCmp.prototype.ionViewDidEnter = function () {
            var activeElement = document.activeElement;
            if (activeElement) {
                activeElement.blur();
            }
            var focusableEle = this._elementRef.nativeElement.querySelector('button');
            if (focusableEle) {
                focusableEle.focus();
            }
            this.enabled = true;
        };
        PickerCmp.prototype.btnClick = function (button, dismissDelay) {
            var _this = this;
            if (!this.enabled) {
                return;
            }
            this.lastClick = Date.now();
            var shouldDismiss = true;
            if (button.handler) {
                if (button.handler(this.getSelected()) === false) {
                    shouldDismiss = false;
                }
            }
            if (shouldDismiss) {
                setTimeout(function () {
                    _this.dismiss(button.role);
                }, dismissDelay || this._config.get('pageTransitionDelay'));
            }
        };
        PickerCmp.prototype.bdClick = function () {
            if (this.enabled && this.d.enableBackdropDismiss) {
                this.dismiss('backdrop');
            }
        };
        PickerCmp.prototype.dismiss = function (role) {
            return this._viewCtrl.dismiss(this.getSelected(), role);
        };
        PickerCmp.prototype.getSelected = function () {
            var selected = {};
            this.d.columns.forEach(function (col, index) {
                var selectedColumn = col.options[col.selectedIndex];
                selected[col.name] = {
                    text: selectedColumn ? selectedColumn.text : null,
                    value: selectedColumn ? selectedColumn.value : null,
                    columnIndex: index,
                };
            });
            return selected;
        };
        PickerCmp.decorators = [
            { type: core_1.Component, args: [{
                        selector: 'ion-picker-cmp',
                        template: "\n    <ion-backdrop (click)=\"bdClick()\"></ion-backdrop>\n    <div class=\"picker-wrapper\">\n      <div class=\"picker-toolbar\">\n        <div *ngFor=\"let b of d.buttons\" class=\"picker-toolbar-button\" [ngClass]=\"b.cssRole\">\n          <button ion-button (click)=\"btnClick(b)\" [ngClass]=\"b.cssClass\" class=\"picker-button\" clear>\n            {{b.text}}\n          </button>\n        </div>\n      </div>\n      <div class=\"picker-columns\">\n        <div class=\"picker-above-highlight\"></div>\n        <div *ngFor=\"let c of d.columns\" [col]=\"c\" class=\"picker-col\" (ionChange)=\"_colChange($event)\"></div>\n        <div class=\"picker-below-highlight\"></div>\n      </div>\n    </div>\n  ",
                        host: {
                            'role': 'dialog'
                        },
                        encapsulation: core_1.ViewEncapsulation.None,
                    },] },
        ];
        PickerCmp.ctorParameters = [
            { type: view_controller_1.ViewController, },
            { type: core_1.ElementRef, },
            { type: config_1.Config, },
            { type: nav_params_1.NavParams, },
            { type: core_1.Renderer, },
        ];
        PickerCmp.propDecorators = {
            '_cols': [{ type: core_1.ViewChildren, args: [PickerColumnCmp,] },],
            '_keyUp': [{ type: core_1.HostListener, args: ['body:keyup', ['$event'],] },],
        };
        return PickerCmp;
    }());
    exports.PickerCmp = PickerCmp;
    var pickerIds = -1;
    var DECELERATION_FRICTION = 0.97;
    var FRAME_MS = (1000 / 60);
});
//# sourceMappingURL=picker-component.js.map