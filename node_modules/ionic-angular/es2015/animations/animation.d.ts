export declare class Animation {
    private _c;
    private _cL;
    private _e;
    private _eL;
    private _fx;
    private _dur;
    private _es;
    private _bfSty;
    private _bfAdd;
    private _bfRm;
    private _afSty;
    private _afAdd;
    private _afRm;
    private _rdFn;
    private _wrFn;
    private _fFn;
    private _fOneFn;
    private _rv;
    private _unrgTrns;
    private _tm;
    private _upd;
    private _hasDur;
    private _isAsync;
    private _twn;
    private _raf;
    parent: Animation;
    opts: AnimationOptions;
    hasChildren: boolean;
    isPlaying: boolean;
    hasCompleted: boolean;
    constructor(ele?: any, opts?: AnimationOptions, raf?: Function);
    element(ele: any): Animation;
    private _addEle(ele);
    add(childAnimation: Animation): Animation;
    getDuration(opts?: PlayOptions): number;
    duration(milliseconds: number): Animation;
    getEasing(): string;
    easing(name: string): Animation;
    from(prop: string, val: any): Animation;
    to(prop: string, val: any, clearProperyAfterTransition?: boolean): Animation;
    fromTo(prop: string, fromVal: any, toVal: any, clearProperyAfterTransition?: boolean): Animation;
    private _addProp(state, prop, val);
    beforeAddClass(className: string): Animation;
    beforeRemoveClass(className: string): Animation;
    beforeStyles(styles: {
        [property: string]: any;
    }): Animation;
    beforeClearStyles(propertyNames: string[]): Animation;
    beforeAddRead(domReadFn: Function): Animation;
    beforeAddWrite(domWriteFn: Function): Animation;
    afterAddClass(className: string): Animation;
    afterRemoveClass(className: string): Animation;
    afterStyles(styles: {
        [property: string]: any;
    }): Animation;
    afterClearStyles(propertyNames: string[]): Animation;
    play(opts?: PlayOptions): void;
    _playInit(opts: PlayOptions): void;
    _playDomInspect(opts: PlayOptions): void;
    _playProgress(opts: PlayOptions): void;
    _playToStep(stepValue: number): void;
    _asyncEnd(dur: number, shouldComplete: boolean): void;
    _playEnd(stepValue?: number): void;
    _hasDuration(opts: PlayOptions): boolean;
    _hasDomReads(): boolean;
    stop(stepValue?: number): void;
    _clearAsync(): void;
    _progress(stepValue: number): void;
    _setTrans(dur: number, forcedLinearEasing: boolean): void;
    _before(): void;
    _beforeReadFn(): void;
    _beforeWriteFn(): void;
    _after(): void;
    _willChg(addWillChange: boolean): void;
    progressStart(): void;
    _progressStart(): void;
    progressStep(stepValue: number): void;
    progressEnd(shouldComplete: boolean, currentStepValue: number, maxDelta?: number): void;
    _progressEnd(shouldComplete: boolean, stepValue: number, dur: number, isAsync: boolean): void;
    onFinish(callback: Function, onceTimeCallback?: boolean, clearOnFinishCallacks?: boolean): Animation;
    _didFinishAll(hasCompleted: boolean, finishAsyncAnimations: boolean, finishNoDurationAnimations: boolean): void;
    _didFinish(hasCompleted: boolean): void;
    reverse(shouldReverse?: boolean): Animation;
    destroy(): void;
    _transEl(): HTMLElement;
}
export interface AnimationOptions {
    animation?: string;
    duration?: number;
    easing?: string;
    direction?: string;
    isRTL?: boolean;
    ev?: any;
}
export interface PlayOptions {
    duration?: number;
}
export interface EffectProperty {
    trans: boolean;
    wc?: string;
    to?: EffectState;
    from?: EffectState;
}
export interface EffectState {
    val: any;
    num: number;
    unit: string;
}
