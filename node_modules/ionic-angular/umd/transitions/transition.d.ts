import { Animation, AnimationOptions } from '../animations/animation';
import { ViewController } from '../navigation/view-controller';
export declare class Transition extends Animation {
    enteringView: ViewController;
    leavingView: ViewController;
    _trnsStart: Function;
    parent: Transition;
    trnsId: number;
    constructor(enteringView: ViewController, leavingView: ViewController, opts: AnimationOptions, raf?: Function);
    init(): void;
    registerStart(trnsStart: Function): void;
    isRoot(): boolean;
    start(): void;
    destroy(): void;
}
