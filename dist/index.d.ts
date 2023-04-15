/***************** GENERATED FILE ********************/
import type * as module from './hnswlib-wasm';
import type factory from './hnswlib-wasm';
export type HierarchicalNSW = module.HierarchicalNSW;
export type BruteforceSearch = module.BruteforceSearch;
export type EmscriptenFileSystemManager = module.EmscriptenFileSystemManager;
export type L2Space = module.L2Space;
export type InnerProductSpace = module.InnerProductSpace;
export type HnswModuleFactory = typeof factory;
export type syncFs = HnswlibModule['syncFs'];
export type normalizePoint = HnswlibModule['normalizePoint'];
export declare const IDBFS_STORE_NAME = "FILE_DATA";
export * from './constants';
declare const lib: HnswlibModule;
export default lib;
export interface HnswlibModule extends Omit<EmscriptenModule, '_malloc' | '_free'> {
    normalizePoint(vec: number[]): number[];
    /**
     * Syncs the Emscripten file system with the persistent storage IDBFS.
     * @param read read (bool) – true to initialize Emscripten’s file system data with the data from the file system’s persistent source, and false to save Emscripten`s file system data to the file system’s persistent source.
     * @returns
     */
    syncFs: (read: boolean) => Promise<boolean>;
    L2Space: typeof module.L2Space;
    InnerProductSpace: typeof module.InnerProductSpace;
    BruteforceSearch: typeof module.BruteforceSearch;
    HierarchicalNSW: typeof module.HierarchicalNSW;
    EmscriptenFileSystemManager: typeof module.EmscriptenFileSystemManager;
    asm: {
        malloc(size: number): number;
        free(ptr: number): void;
    };
}
/**
 * Adds items and their corresponding labels to the HierarchicalNSW index using memory pointers.
 * This function handles the memory allocation for the Emscripten Module, and properly frees the memory after use.  its a wrapper around {@link HierarchicalNSW#addItemsWithPtrs}
 *
 * ⛔️ This function is only 1.02x faster than vectors for 10k points version which are easier to use.  The sole advantage is memory savings
 *
 * @async
 * @param {HnswlibModule} Module - The Emscripten HNSWLIB Module object.
 * @param {HierarchicalNSW} index - The HierarchicalNSW index object.
 * @param {Float32Array[] | number[][]} items - An array of item vectors to be added to the search index. Each item should be a Float32Array or an array of numbers.
 * @param {number[]} labels - An array of numeric labels corresponding to the items. The length of the labels array should match the length of the items array.
 * @param {boolean} replaceDeleted - A flag to determine if deleted elements should be replaced (default: false).
 * @returns {Promise<void>} A promise that resolves once the items and labels have been added to the index.
 */
export declare const addItemsWithPtrsHelper: (Module: HnswlibModule, index: HierarchicalNSW, items: Float32Array[] | number[][], labels: number[], replaceDeleted: boolean) => Promise<void>;
/***************** GENERATED FILE ********************/
