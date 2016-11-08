import { OpaqueToken } from '@angular/core';
export declare class QueryParams {
    data: {
        [key: string]: any;
    };
    constructor(url: string);
    get(key: string): any;
}
export declare const UrlToken: OpaqueToken;
export declare function setupQueryParams(url: string): QueryParams;
