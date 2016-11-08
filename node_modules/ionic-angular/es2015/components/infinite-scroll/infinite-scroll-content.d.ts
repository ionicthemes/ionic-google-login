import { Config } from '../../config/config';
import { InfiniteScroll } from './infinite-scroll';
export declare class InfiniteScrollContent {
    inf: InfiniteScroll;
    private _config;
    loadingSpinner: string;
    loadingText: string;
    constructor(inf: InfiniteScroll, _config: Config);
    ngOnInit(): void;
}
