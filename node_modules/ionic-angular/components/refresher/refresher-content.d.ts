import { Config } from '../../config/config';
import { Refresher } from './refresher';
export declare class RefresherContent {
    r: Refresher;
    private _config;
    pullingIcon: string;
    pullingText: string;
    refreshingSpinner: string;
    refreshingText: string;
    constructor(r: Refresher, _config: Config);
    ngOnInit(): void;
}
