import { BuildContext } from './util/interfaces';
export declare function uglifyjs(context?: BuildContext, configFile?: string): Promise<void>;
export declare function uglifyjsWorker(context: BuildContext, configFile: string): Promise<any>;
export interface UglifyJsConfig {
    sourceFile: string;
    destFileName: string;
    inSourceMap: string;
    outSourceMap: string;
    mangle: boolean;
    compress: boolean;
    comments: boolean;
}
