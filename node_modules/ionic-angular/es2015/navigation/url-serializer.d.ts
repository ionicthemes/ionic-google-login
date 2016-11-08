import { OpaqueToken } from '@angular/core';
import { DeepLinkConfig, NavLink, NavSegment } from './nav-util';
export declare class UrlSerializer {
    links: NavLink[];
    constructor(config: DeepLinkConfig);
    parse(browserUrl: string): NavSegment[];
    createSegmentFromName(nameOrComponent: any): NavSegment;
    serialize(path: NavSegment[]): string;
    serializeComponent(component: any, data: any): NavSegment;
    createSegment(configLink: NavLink, data: any): NavSegment;
    formatUrlPart(name: string): string;
}
export declare const parseUrlParts: (urlParts: string[], configLinks: NavLink[]) => NavSegment[];
export declare const fillMatchedUrlParts: (segments: NavSegment[], urlParts: string[], configLink: NavLink) => void;
export declare const isPartMatch: (urlPart: string, configLinkPart: string) => boolean;
export declare const createMatchedData: (matchedUrlParts: string[], link: NavLink) => any;
export declare const findLinkByComponentData: (links: NavLink[], component: any, instanceData: any) => NavLink;
export declare const normalizeLinks: (links: NavLink[]) => NavLink[];
export declare const DeepLinkConfigToken: OpaqueToken;
export declare function setupUrlSerializer(userDeepLinkConfig: any): UrlSerializer;
