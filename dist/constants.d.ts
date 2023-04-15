/***************** GENERATED FILE ********************/
export declare const defaultParams: {
    /**
     * Default parameters for the HNSW index.
     * @param {number} m The maximum number of outgoing connections on the graph (default: 16).
     * @param {number} efConstruction The parameter that controls speed/accuracy trade-off during the index construction (default: 200).
     * @param {number} randomSeed The seed value of random number generator (default: 100).
     * @param {boolean} allowReplaceDeleted The flag to replace deleted element when adding new element
     *
     */
    readonly initIndex: readonly [16, 200, 100, false];
    /**
     * @param {boolean} replaceDeleted — The flag to replace a deleted element (default: false)
     */
    readonly addPoint: readonly [false];
};
export type defaultParamtersTypes = keyof typeof defaultParams;
export declare const hnswParamsForAda: {
    readonly m: 48;
    readonly efSearch: 24;
    readonly efConstruction: 32;
    readonly numNeighbors: 8;
    readonly dimensions: 1538;
};
/***************** GENERATED FILE ********************/
