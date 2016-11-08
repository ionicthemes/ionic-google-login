import { BuildContext } from '../util/interfaces';
export declare function ionCompiler(context: BuildContext): {
    name: string;
    transform(sourceText: string, sourcePath: string): any;
    resolveId(importee: string, importer: string): any;
    load(sourcePath: string): string;
};
export declare function resolveId(importee: string, importer: string, context: BuildContext): string;
