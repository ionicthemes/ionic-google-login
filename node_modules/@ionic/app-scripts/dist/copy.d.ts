import { BuildContext } from './util/interfaces';
export declare function copy(context?: BuildContext, configFile?: string): Promise<void>;
export declare function copyUpdate(event: string, filePath: string, context: BuildContext): Promise<void>;
export declare function copyWorker(context: BuildContext, configFile: string): Promise<void>;
export declare function findFileCopyOptions(context: BuildContext, copyConfig: CopyConfig, filePath: string): CopyOptions[];
export interface CopyConfig {
    include: CopyOptions[];
}
export interface CopyOptions {
    src: string;
    dest: string;
    filter?: any;
}
