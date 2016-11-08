import { BuildContext } from './util/interfaces';
export declare function webpack(context: BuildContext, configFile: string): Promise<void>;
export declare function webpackUpdate(event: string, path: string, context: BuildContext, configFile: string): Promise<void>;
export declare function webpackWorker(context: BuildContext, configFile: string): Promise<any>;
export declare function getWebpackConfig(context: BuildContext, configFile: string): WebpackConfig;
export declare function getOutputDest(context: BuildContext, webpackConfig: WebpackConfig): string;
export interface WebpackConfig {
    devtool: string;
    entry: string;
    output: WebpackOutputObject;
}
export interface WebpackOutputObject {
    path: string;
    filename: string;
}
