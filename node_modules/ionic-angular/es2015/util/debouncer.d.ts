export interface Debouncer {
    debounce(Function: any): any;
    cancel(): any;
}
export declare class FakeDebouncer implements Debouncer {
    debounce(callback: Function): void;
    cancel(): void;
}
export declare class TimeoutDebouncer implements Debouncer {
    wait: number;
    private timer;
    callback: Function;
    constructor(wait: number);
    debounce(callback: Function): void;
    schedule(): void;
    cancel(): void;
}
export declare class NativeRafDebouncer implements Debouncer {
    callback: Function;
    fireFunc: Function;
    ptr: number;
    constructor();
    debounce(callback: Function): void;
    fire(): void;
    cancel(): void;
}
