export declare class Gesture {
    private _hammer;
    private _options;
    private _callbacks;
    element: HTMLElement;
    direction: string;
    isListening: boolean;
    constructor(element: HTMLElement, opts?: any);
    options(opts: any): void;
    on(type: string, cb: Function): void;
    off(type: string, cb: Function): void;
    listen(): void;
    unlisten(): void;
    destroy(): void;
}
