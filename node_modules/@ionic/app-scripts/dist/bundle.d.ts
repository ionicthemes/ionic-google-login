import { BuildContext } from './util/interfaces';
export declare function bundle(context?: BuildContext, configFile?: string): Promise<void>;
export declare function bundleUpdate(event: string, filePath: string, context: BuildContext): Promise<void>;
export declare function buildJsSourceMaps(context: BuildContext): boolean;
export declare function getJsOutputDest(context: BuildContext): string;
