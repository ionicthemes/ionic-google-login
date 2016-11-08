import { Activator } from './activator';
import { App } from '../app/app';
import { PointerCoordinates } from '../../util/dom';
import { Config } from '../../config/config';
export declare class RippleActivator extends Activator {
    constructor(app: App, config: Config);
    downAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    upAction(ev: UIEvent, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    startRippleEffect(rippleEle: any, activatableEle: HTMLElement, startCoord: PointerCoordinates): void;
    deactivate(): void;
}
