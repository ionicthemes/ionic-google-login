import { Platform } from '../platform/platform';
export declare class Events {
    private _channels;
    subscribe(topic: string, ...handlers: Function[]): void;
    unsubscribe(topic: string, handler?: Function): boolean;
    publish(topic: string, ...args: any[]): any[];
}
export declare function setupEvents(platform: Platform): Events;
export declare function setupProvideEvents(platform: Platform): () => Events;
