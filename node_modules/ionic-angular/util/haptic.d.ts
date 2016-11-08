import { Platform } from '../platform/platform';
export declare class Haptic {
    plugin: any;
    constructor(platform: Platform);
    available(): boolean;
    selection(): void;
    gestureSelectionStart(): void;
    gestureSelectionChanged(): void;
    gestureSelectionEnd(): void;
    notification(options: {
        type: string;
    }): void;
    impact(options: {
        style: string;
    }): void;
}
