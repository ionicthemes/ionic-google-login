import { ChangeDetectorRef, ComponentRef, ElementRef, NgZone, Renderer } from '@angular/core';
import { Location } from '@angular/common';
import { App } from '../components/app/app';
import { IonicApp } from '../components/app/app-root';
import { Config } from '../config/config';
import { DeepLinker } from '../navigation/deep-linker';
import { Menu } from '../components/menu/menu';
import { DeepLinkConfig } from '../navigation/nav-util';
import { OverlayPortal } from '../components/nav/overlay-portal';
import { Platform } from '../platform/platform';
import { QueryParams } from '../platform/query-params';
import { Tab } from '../components/tabs/tab';
import { Tabs } from '../components/tabs/tabs';
import { TransitionController } from '../transitions/transition-controller';
import { ViewController } from '../navigation/view-controller';
import { NavControllerBase } from '../navigation/nav-controller-base';
import { Haptic } from './haptic';
export declare const mockConfig: (config?: any, url?: string, platform?: Platform) => Config;
export declare const mockQueryParams: (url?: string) => QueryParams;
export declare const mockPlatform: () => Platform;
export declare const mockApp: (config?: Config, platform?: Platform) => App;
export declare const mockIonicApp: (app: App, config: Config, platform: Platform) => IonicApp;
export declare const mockTrasitionController: (config: Config) => TransitionController;
export declare const mockZone: () => NgZone;
export declare const mockChangeDetectorRef: () => ChangeDetectorRef;
export declare class MockElementRef implements ElementRef {
    nativeElement: any;
}
export declare class MockElement {
    children: any[];
    classList: ClassList;
    attributes: {
        [name: string]: any;
    };
    style: {
        [property: string]: any;
    };
    clientWidth: number;
    clientHeight: number;
    clientTop: number;
    clientLeft: number;
    offsetWidth: number;
    offsetHeight: number;
    offsetTop: number;
    offsetLeft: number;
    scrollTop: number;
    scrollHeight: number;
    className: string;
    hasAttribute(name: string): boolean;
    getAttribute(name: string): any;
    setAttribute(name: string, val: any): void;
    removeAttribute(name: string): void;
}
export declare class ClassList {
    classes: string[];
    add(className: string): void;
    remove(className: string): void;
    toggle(className: string): void;
    contains(className: string): boolean;
}
export declare const mockElementRef: () => ElementRef;
export declare class MockRenderer {
    setElementAttribute(renderElement: MockElement, name: string, val: any): void;
    setElementClass(renderElement: MockElement, className: string, isAdd: boolean): void;
    setElementStyle(renderElement: MockElement, styleName: string, styleValue: string): void;
}
export declare const mockRenderer: () => Renderer;
export declare const mockLocation: () => Location;
export declare const mockView: (component?: any, data?: any) => ViewController;
export declare const mockViews: (nav: NavControllerBase, views: ViewController[]) => void;
export declare const mockComponentRef: () => ComponentRef<any>;
export declare const mockDeepLinker: (linkConfig?: DeepLinkConfig, app?: App) => DeepLinker;
export declare const mockNavController: () => NavControllerBase;
export declare const mockOverlayPortal: (app: App, config: Config, platform: Platform) => OverlayPortal;
export declare const mockTab: (parentTabs: Tabs) => Tab;
export declare const mockTabs: (app?: App) => Tabs;
export declare const mockMenu: () => Menu;
export declare const mockDeepLinkConfig: (links?: any[]) => DeepLinkConfig;
export declare const mockHaptic: () => Haptic;
export declare class MockView {
}
export declare class MockView1 {
}
export declare class MockView2 {
}
export declare class MockView3 {
}
export declare class MockView4 {
}
export declare class MockView5 {
}
export declare function noop(): any;
