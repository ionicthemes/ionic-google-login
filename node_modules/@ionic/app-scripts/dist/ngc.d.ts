import { BuildContext } from './util/interfaces';
export declare function ngc(context?: BuildContext, configFile?: string): Promise<void>;
export declare function ngcWorker(context: BuildContext, configFile: string): Promise<{}>;
export declare function getTmpTsConfigPath(context: BuildContext): string;
export interface NgcConfig {
    include: string[];
}
