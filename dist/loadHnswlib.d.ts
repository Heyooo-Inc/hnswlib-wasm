import { HnswlibModule } from './';
type InputFsType = 'NODEFS' | 'IDBFS' | undefined;
export declare const initializeFileSystemAsync: (inputFsType?: InputFsType) => Promise<void>;
/**
 * Load the HNSW library in node or browser
 */
export declare const loadHnswlib: () => Promise<HnswlibModule>;
export {};
/***************** GENERATED FILE ********************/
