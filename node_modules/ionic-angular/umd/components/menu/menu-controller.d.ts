import { Menu } from './menu';
import { MenuType } from './menu-types';
import { Platform } from '../../platform/platform';
export declare class MenuController {
    private _menus;
    open(menuId?: string): Promise<boolean>;
    close(menuId?: string): Promise<boolean>;
    toggle(menuId?: string): Promise<boolean>;
    enable(shouldEnable: boolean, menuId?: string): Menu;
    swipeEnable(shouldEnable: boolean, menuId?: string): Menu;
    isOpen(menuId?: string): boolean;
    isEnabled(menuId?: string): boolean;
    get(menuId?: string): Menu;
    getOpen(): Menu;
    getMenus(): Array<Menu>;
    register(menu: Menu): void;
    unregister(menu: Menu): void;
    static registerType(name: string, cls: new (...args: any[]) => MenuType): void;
    static create(type: string, menuCmp: Menu, platform: Platform): MenuType;
}
