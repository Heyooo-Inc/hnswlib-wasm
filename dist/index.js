let IDBFS_STORE_NAME, addItemsWithPtrsHelper, lib, defaultParams, hnswParamsForAda;
let __tla = (async () => {
  let library;
  const loadHnswlib = async () => {
    try {
      if (typeof hnswlib !== "undefined" && hnswlib !== null) {
        const lib2 = hnswlib();
        if (lib2 != null)
          return lib2;
      }
      if (!library) {
        const temp = await import("./hnswlib-wasm.js");
        const factory = temp.default;
        library = await factory();
        return library;
      }
      return library;
    } catch (err) {
      console.error("----------------------------------------");
      console.error("Error initializing the library:", err);
      throw err;
    }
  };
  defaultParams = {
    initIndex: [
      16,
      200,
      100,
      false
    ],
    addPoint: [
      false
    ]
  };
  hnswParamsForAda = {
    m: 48,
    efSearch: 24,
    efConstruction: 32,
    numNeighbors: 8,
    dimensions: 1538
  };
  IDBFS_STORE_NAME = "FILE_DATA";
  lib = await loadHnswlib();
  addItemsWithPtrsHelper = async (Module, index, items, labels, replaceDeleted) => {
    const itemCount = items.length;
    const dim = items[0].length;
    const flatItems = new Float32Array(itemCount * dim);
    items.forEach((vec, i) => {
      flatItems.set(vec, i * dim);
    });
    const labelsArray = new Uint32Array(labels);
    const vecDataPtr = Module.asm.malloc(flatItems.length * Float32Array.BYTES_PER_ELEMENT);
    const labelVecDataPtr = Module.asm.malloc(labelsArray.length * Uint32Array.BYTES_PER_ELEMENT);
    if (vecDataPtr === 0) {
      throw new Error("Failed to allocate memory for vecDataPtr.");
    }
    if (labelVecDataPtr === 0) {
      throw new Error("Failed to allocate memory for labelVecDataPtr.");
    }
    Module.HEAPF32.set(flatItems, vecDataPtr / Float32Array.BYTES_PER_ELEMENT);
    Module.HEAPU32.set(labelsArray, labelVecDataPtr / Uint32Array.BYTES_PER_ELEMENT);
    await index.addItemsWithPtr(Module.HEAPF32.subarray(Math.floor(vecDataPtr / Float32Array.BYTES_PER_ELEMENT), Math.floor(vecDataPtr / Float32Array.BYTES_PER_ELEMENT) + itemCount * dim), itemCount * dim, Module.HEAPU32.subarray(Math.floor(labelVecDataPtr / Uint32Array.BYTES_PER_ELEMENT), Math.floor(labelVecDataPtr / Uint32Array.BYTES_PER_ELEMENT) + itemCount), itemCount, replaceDeleted);
    Module.asm.free(vecDataPtr);
    Module.asm.free(labelVecDataPtr);
  };
})();
export {
  IDBFS_STORE_NAME,
  __tla,
  addItemsWithPtrsHelper,
  lib as default,
  defaultParams,
  hnswParamsForAda
};
