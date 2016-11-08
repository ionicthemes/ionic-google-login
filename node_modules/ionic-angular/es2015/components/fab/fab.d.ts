import { QueryList, ElementRef, Renderer } from '@angular/core';
import { Config } from '../../config/config';
import { Ion } from '../ion';
import { UIEventManager } from '../../util/ui-event-manager';
export declare class FabButton extends Ion {
    color: string;
    mode: string;
    constructor(config: Config, elementRef: ElementRef, renderer: Renderer);
    setActiveClose(closeVisible: boolean): void;
}
export declare class FabList {
    private _elementRef;
    private _renderer;
    _visible: boolean;
    _fabs: FabButton[];
    constructor(_elementRef: ElementRef, _renderer: Renderer);
    _setbuttons: QueryList<FabButton>;
    setVisible(val: boolean): void;
    setElementClass(className: string, add: boolean): void;
}
export declare class FabContainer {
    private _elementRef;
    _events: UIEventManager;
    _listsActive: boolean;
    _mainButton: FabButton;
    _fabLists: QueryList<FabList>;
    constructor(_elementRef: ElementRef);
    ngAfterContentInit(): void;
    pointerUp(ev: any): void;
    canActivateList(ev: any): boolean;
    toggleList(): void;
    setActiveLists(isActive: boolean): void;
    close(): void;
    ngOnDestroy(): void;
}
