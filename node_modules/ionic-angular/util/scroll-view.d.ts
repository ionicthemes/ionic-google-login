export declare class ScrollView {
    private _el;
    private _js;
    private _top;
    private _pos;
    private _velocity;
    private _max;
    private _rafId;
    private _cb;
    isPlaying: boolean;
    constructor(ele: HTMLElement);
    getTop(): number;
    setTop(top: number): void;
    scrollTo(x: number, y: number, duration: number): Promise<any>;
    scrollToTop(duration: number): Promise<any>;
    scrollToBottom(duration: number): Promise<any>;
    stop(): void;
    jsScroll(onScrollCallback: Function): Function;
    private _start(ev);
    private _move(ev);
    private _setMax();
    private _end(ev);
    private _decelerate();
    destroy(): void;
}
