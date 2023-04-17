// import { EsbuildPhoenix } from '@xn-sakina/phoenix'

import 'fake-indexeddb/auto';
import { HnswlibModule } from './dist/hnswlib';
import { loadHnswlib } from './lib/loadHnswlib';

export async function teardown() {
  //process.stdout.write("");
}

const lib = await loadHnswlib();

vi.stubGlobal('testHnswlibModule', lib);

declare global {
  export const testHnswlibModule: HnswlibModule;
}
