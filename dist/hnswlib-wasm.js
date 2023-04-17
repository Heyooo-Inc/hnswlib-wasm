var hnswlib = (() => {
  var _scriptDir = import.meta.url;
  
  return (
function(hnswlib = {})  {

// include: shell.js
// The Module object: Our interface to the outside world. We import
// and export values on it. There are various ways Module can be used:
// 1. Not defined. We create it here
// 2. A function parameter, function(Module) { ..generated code.. }
// 3. pre-run appended it, var Module = {}; ..generated code..
// 4. External script tag defines var Module.
// We need to check if Module already exists (e.g. case 3 above).
// Substitution will be replaced with actual code on later stage of the build,
// this way Closure Compiler will not mangle it (e.g. case 4. above).
// Note that if you want to run closure, and also to use Module
// after the generated code, you will need to define   var Module = {};
// before the code. Then that object will be used in the code, and you
// can continue to use Module afterwards as well.
var Module = typeof hnswlib != 'undefined' ? hnswlib : {};

// Set up the promise that indicates the Module is initialized
var readyPromiseResolve, readyPromiseReject;
Module['ready'] = new Promise(function(resolve, reject) {
  readyPromiseResolve = resolve;
  readyPromiseReject = reject;
});
["_main","getExceptionMessage","___get_exception_message","_free","___cpp_exception","___cxa_increment_exception_refcount","___cxa_decrement_exception_refcount","___thrown_object_from_unwind_exception","___getTypeName","__embind_initialize_bindings","_fflush","onRuntimeInitialized"].forEach((prop) => {
  if (!Object.getOwnPropertyDescriptor(Module['ready'], prop)) {
    Object.defineProperty(Module['ready'], prop, {
      get: () => abort('You are getting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
      set: () => abort('You are setting ' + prop + ' on the Promise object, instead of the instance. Use .then() to get called back with the instance, see the MODULARIZE docs in src/settings.js'),
    });
  }
});

// --pre-jses are emitted after the Module integration code, so that they can
// refer to Module (if they choose; they can also define Module)


// Sometimes an existing Module object exists with properties
// meant to overwrite the default module functionality. Here
// we collect those properties and reapply _after_ we configure
// the current environment's defaults to avoid having to be so
// defensive during initialization.
var moduleOverrides = Object.assign({}, Module);
var thisProgram = './this.program';

// Determine the runtime environment we are in. You can customize this by
// setting the ENVIRONMENT setting at compile time (see settings.js).

var ENVIRONMENT_IS_WEB = true;
var ENVIRONMENT_IS_WORKER = false;
var ENVIRONMENT_IS_NODE = false;
var ENVIRONMENT_IS_SHELL = false;

if (Module['ENVIRONMENT']) {
  throw new Error('Module.ENVIRONMENT has been deprecated. To force the environment, use the ENVIRONMENT compile-time option (for example, -sENVIRONMENT=web or -sENVIRONMENT=node)');
}

// `/` should be present at the end if `scriptDirectory` is not empty
var scriptDirectory = '';
function locateFile(path) {
  if (Module['locateFile']) {
    return Module['locateFile'](path, scriptDirectory);
  }
  return scriptDirectory + path;
}

// Hooks that are implemented differently in different runtime environments.
var read_,
    readAsync,
    readBinary;

{
  if (typeof document != 'undefined' && document.currentScript) { // web
    scriptDirectory = document.currentScript.src;
  }
  // When MODULARIZE, this JS may be executed later, after document.currentScript
  // is gone, so we saved it, and we use it here instead of any other info.
  if (_scriptDir) {
    scriptDirectory = _scriptDir;
  }
  // blob urls look like blob:http://site.com/etc/etc and we cannot infer anything from them.
  // otherwise, slice off the final part of the url to find the script directory.
  // if scriptDirectory does not contain a slash, lastIndexOf will return -1,
  // and scriptDirectory will correctly be replaced with an empty string.
  // If scriptDirectory contains a query (starting with ?) or a fragment (starting with #),
  // they are removed because they could contain a slash.
  if (scriptDirectory.indexOf('blob:') !== 0) {
    scriptDirectory = scriptDirectory.substr(0, scriptDirectory.replace(/[?#].*/, "").lastIndexOf('/')+1);
  } else {
    scriptDirectory = '';
  }

  if (!(typeof window == 'object' || typeof importScripts == 'function')) throw new Error('not compiled for this environment (did you build to HTML and try to run it not on the web, or set ENVIRONMENT to something - like node - and run it someplace else - like on the web?)');

  // Differentiate the Web Worker from the Node Worker case, as reading must
  // be done differently.
  {
// include: web_or_worker_shell_read.js
read_ = (url) => {
    try {
      var xhr = new XMLHttpRequest();
      xhr.open('GET', url, false);
      xhr.send(null);
      return xhr.responseText;
    } catch (err) {
      var data = tryParseAsDataURI(url);
      if (data) {
        return intArrayToString(data);
      }
      throw err;
    }
  };

  readAsync = (url, onload, onerror) => {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'arraybuffer';
    xhr.onload = () => {
      if (xhr.status == 200 || (xhr.status == 0 && xhr.response)) { // file URLs can return 0
        onload(xhr.response);
        return;
      }
      var data = tryParseAsDataURI(url);
      if (data) {
        onload(data.buffer);
        return;
      }
      onerror();
    };
    xhr.onerror = onerror;
    xhr.send(null);
  };

// end include: web_or_worker_shell_read.js
  }
}

var out = Module['print'] || console.log.bind(console);
var err = Module['printErr'] || console.warn.bind(console);

// Merge back in the overrides
Object.assign(Module, moduleOverrides);
// Free the object hierarchy contained in the overrides, this lets the GC
// reclaim data used e.g. in memoryInitializerRequest, which is a large typed array.
moduleOverrides = null;
checkIncomingModuleAPI();

// Emit code to handle expected values on the Module object. This applies Module.x
// to the proper local x. This has two benefits: first, we only emit it if it is
// expected to arrive, and second, by using a local everywhere else that can be
// minified.

if (Module['arguments']) Module['arguments'];legacyModuleProp('arguments', 'arguments_');

if (Module['thisProgram']) thisProgram = Module['thisProgram'];legacyModuleProp('thisProgram', 'thisProgram');

if (Module['quit']) Module['quit'];legacyModuleProp('quit', 'quit_');

// perform assertions in shell.js after we set up out() and err(), as otherwise if an assertion fails it cannot print the message
// Assertions on removed incoming Module JS APIs.
assert(typeof Module['memoryInitializerPrefixURL'] == 'undefined', 'Module.memoryInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['pthreadMainPrefixURL'] == 'undefined', 'Module.pthreadMainPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['cdInitializerPrefixURL'] == 'undefined', 'Module.cdInitializerPrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['filePackagePrefixURL'] == 'undefined', 'Module.filePackagePrefixURL option was removed, use Module.locateFile instead');
assert(typeof Module['read'] == 'undefined', 'Module.read option was removed (modify read_ in JS)');
assert(typeof Module['readAsync'] == 'undefined', 'Module.readAsync option was removed (modify readAsync in JS)');
assert(typeof Module['readBinary'] == 'undefined', 'Module.readBinary option was removed (modify readBinary in JS)');
assert(typeof Module['setWindowTitle'] == 'undefined', 'Module.setWindowTitle option was removed (modify setWindowTitle in JS)');
assert(typeof Module['TOTAL_MEMORY'] == 'undefined', 'Module.TOTAL_MEMORY has been renamed Module.INITIAL_MEMORY');
legacyModuleProp('read', 'read_');
legacyModuleProp('readAsync', 'readAsync');
legacyModuleProp('readBinary', 'readBinary');
legacyModuleProp('setWindowTitle', 'setWindowTitle');


assert(!ENVIRONMENT_IS_WORKER, "worker environment detected but not enabled at build time.  Add 'worker' to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_NODE, "node environment detected but not enabled at build time.  Add 'node' to `-sENVIRONMENT` to enable.");

assert(!ENVIRONMENT_IS_SHELL, "shell environment detected but not enabled at build time.  Add 'shell' to `-sENVIRONMENT` to enable.");


// end include: shell.js
// include: preamble.js
// === Preamble library stuff ===

// Documentation for the public APIs defined in this file must be updated in:
//    site/source/docs/api_reference/preamble.js.rst
// A prebuilt local version of the documentation is available at:
//    site/build/text/docs/api_reference/preamble.js.txt
// You can also build docs locally as HTML or other formats in site/
// An online HTML version (which may be of a different version of Emscripten)
//    is up at http://kripken.github.io/emscripten-site/docs/api_reference/preamble.js.html

var wasmBinary;
if (Module['wasmBinary']) wasmBinary = Module['wasmBinary'];legacyModuleProp('wasmBinary', 'wasmBinary');
Module['noExitRuntime'] || true;legacyModuleProp('noExitRuntime', 'noExitRuntime');

if (typeof WebAssembly != 'object') {
  abort('no native wasm support detected');
}

// Wasm globals

var wasmMemory;

//========================================
// Runtime essentials
//========================================

// whether we are quitting the application. no code should run after this.
// set in exit() and abort()
var ABORT = false;

/** @type {function(*, string=)} */
function assert(condition, text) {
  if (!condition) {
    abort('Assertion failed' + (text ? ': ' + text : ''));
  }
}

// We used to include malloc/free by default in the past. Show a helpful error in
// builds with assertions.

// Memory management

var /** @type {!Int8Array} */
  HEAP8,
/** @type {!Uint8Array} */
  HEAPU8,
/** @type {!Int16Array} */
  HEAP16,
/** @type {!Uint16Array} */
  HEAPU16,
/** @type {!Int32Array} */
  HEAP32,
/** @type {!Uint32Array} */
  HEAPU32,
/** @type {!Float32Array} */
  HEAPF32,
/** @type {!Float64Array} */
  HEAPF64;

function updateMemoryViews() {
  var b = wasmMemory.buffer;
  Module['HEAP8'] = HEAP8 = new Int8Array(b);
  Module['HEAP16'] = HEAP16 = new Int16Array(b);
  Module['HEAP32'] = HEAP32 = new Int32Array(b);
  Module['HEAPU8'] = HEAPU8 = new Uint8Array(b);
  Module['HEAPU16'] = HEAPU16 = new Uint16Array(b);
  Module['HEAPU32'] = HEAPU32 = new Uint32Array(b);
  Module['HEAPF32'] = HEAPF32 = new Float32Array(b);
  Module['HEAPF64'] = HEAPF64 = new Float64Array(b);
}

assert(!Module['STACK_SIZE'], 'STACK_SIZE can no longer be set at runtime.  Use -sSTACK_SIZE at link time');

assert(typeof Int32Array != 'undefined' && typeof Float64Array !== 'undefined' && Int32Array.prototype.subarray != undefined && Int32Array.prototype.set != undefined,
       'JS engine does not provide full typed array support');

// If memory is defined in wasm, the user can't provide it, or set INITIAL_MEMORY
assert(!Module['wasmMemory'], 'Use of `wasmMemory` detected.  Use -sIMPORTED_MEMORY to define wasmMemory externally');
assert(!Module['INITIAL_MEMORY'], 'Detected runtime INITIAL_MEMORY setting.  Use -sIMPORTED_MEMORY to define wasmMemory dynamically');

// include: runtime_init_table.js
// In regular non-RELOCATABLE mode the table is exported
// from the wasm module and this will be assigned once
// the exports are available.
var wasmTable;

// end include: runtime_init_table.js
// include: runtime_stack_check.js
// Initializes the stack cookie. Called at the startup of main and at the startup of each thread in pthreads mode.
function writeStackCookie() {
  var max = _emscripten_stack_get_end();
  assert((max & 3) == 0);
  // If the stack ends at address zero we write our cookies 4 bytes into the
  // stack.  This prevents interference with the (separate) address-zero check
  // below.
  if (max == 0) {
    max += 4;
  }
  // The stack grow downwards towards _emscripten_stack_get_end.
  // We write cookies to the final two words in the stack and detect if they are
  // ever overwritten.
  HEAPU32[((max)>>2)] = 0x02135467;
  HEAPU32[(((max)+(4))>>2)] = 0x89BACDFE;
  // Also test the global address 0 for integrity.
  HEAPU32[0] = 0x63736d65; /* 'emsc' */
}

function checkStackCookie() {
  if (ABORT) return;
  var max = _emscripten_stack_get_end();
  // See writeStackCookie().
  if (max == 0) {
    max += 4;
  }
  var cookie1 = HEAPU32[((max)>>2)];
  var cookie2 = HEAPU32[(((max)+(4))>>2)];
  if (cookie1 != 0x02135467 || cookie2 != 0x89BACDFE) {
    abort('Stack overflow! Stack cookie has been overwritten at ' + ptrToString(max) + ', expected hex dwords 0x89BACDFE and 0x2135467, but received ' + ptrToString(cookie2) + ' ' + ptrToString(cookie1));
  }
  // Also test the global address 0 for integrity.
  if (HEAPU32[0] !== 0x63736d65 /* 'emsc' */) {
    abort('Runtime error: The application has corrupted its heap memory area (address zero)!');
  }
}

// end include: runtime_stack_check.js
// include: runtime_assertions.js
// Endianness check
(function() {
  var h16 = new Int16Array(1);
  var h8 = new Int8Array(h16.buffer);
  h16[0] = 0x6373;
  if (h8[0] !== 0x73 || h8[1] !== 0x63) throw 'Runtime error: expected the system to be little-endian! (Run with -sSUPPORT_BIG_ENDIAN to bypass)';
})();

// end include: runtime_assertions.js
var __ATPRERUN__  = []; // functions called before the runtime is initialized
var __ATINIT__    = []; // functions called during startup
var __ATPOSTRUN__ = []; // functions called after the main() is called

var runtimeInitialized = false;

function preRun() {
  if (Module['preRun']) {
    if (typeof Module['preRun'] == 'function') Module['preRun'] = [Module['preRun']];
    while (Module['preRun'].length) {
      addOnPreRun(Module['preRun'].shift());
    }
  }
  callRuntimeCallbacks(__ATPRERUN__);
}

function initRuntime() {
  assert(!runtimeInitialized);
  runtimeInitialized = true;

  checkStackCookie();

  
if (!Module["noFSInit"] && !FS.init.initialized)
  FS.init();
FS.ignorePermissions = false;
  callRuntimeCallbacks(__ATINIT__);
}

function postRun() {
  checkStackCookie();

  if (Module['postRun']) {
    if (typeof Module['postRun'] == 'function') Module['postRun'] = [Module['postRun']];
    while (Module['postRun'].length) {
      addOnPostRun(Module['postRun'].shift());
    }
  }

  callRuntimeCallbacks(__ATPOSTRUN__);
}

function addOnPreRun(cb) {
  __ATPRERUN__.unshift(cb);
}

function addOnInit(cb) {
  __ATINIT__.unshift(cb);
}

function addOnPostRun(cb) {
  __ATPOSTRUN__.unshift(cb);
}

// include: runtime_math.js
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/fround

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/clz32

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc

assert(Math.imul, 'This browser does not support Math.imul(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.fround, 'This browser does not support Math.fround(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.clz32, 'This browser does not support Math.clz32(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');
assert(Math.trunc, 'This browser does not support Math.trunc(), build with LEGACY_VM_SUPPORT or POLYFILL_OLD_MATH_FUNCTIONS to add in a polyfill');

// end include: runtime_math.js
// A counter of dependencies for calling run(). If we need to
// do asynchronous work before running, increment this and
// decrement it. Incrementing must happen in a place like
// Module.preRun (used by emcc to add file preloading).
// Note that you can add dependencies in preRun, even though
// it happens right before run - run will be postponed until
// the dependencies are met.
var runDependencies = 0;
var runDependencyWatcher = null;
var dependenciesFulfilled = null; // overridden to take different actions when all run dependencies are fulfilled
var runDependencyTracking = {};

function getUniqueRunDependency(id) {
  var orig = id;
  while (1) {
    if (!runDependencyTracking[id]) return id;
    id = orig + Math.random();
  }
}

function addRunDependency(id) {
  runDependencies++;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(!runDependencyTracking[id]);
    runDependencyTracking[id] = 1;
    if (runDependencyWatcher === null && typeof setInterval != 'undefined') {
      // Check for missing dependencies every few seconds
      runDependencyWatcher = setInterval(function() {
        if (ABORT) {
          clearInterval(runDependencyWatcher);
          runDependencyWatcher = null;
          return;
        }
        var shown = false;
        for (var dep in runDependencyTracking) {
          if (!shown) {
            shown = true;
            err('still waiting on run dependencies:');
          }
          err('dependency: ' + dep);
        }
        if (shown) {
          err('(end of list)');
        }
      }, 10000);
    }
  } else {
    err('warning: run dependency added without ID');
  }
}

function removeRunDependency(id) {
  runDependencies--;

  if (Module['monitorRunDependencies']) {
    Module['monitorRunDependencies'](runDependencies);
  }

  if (id) {
    assert(runDependencyTracking[id]);
    delete runDependencyTracking[id];
  } else {
    err('warning: run dependency removed without ID');
  }
  if (runDependencies == 0) {
    if (runDependencyWatcher !== null) {
      clearInterval(runDependencyWatcher);
      runDependencyWatcher = null;
    }
    if (dependenciesFulfilled) {
      var callback = dependenciesFulfilled;
      dependenciesFulfilled = null;
      callback(); // can add another dependenciesFulfilled
    }
  }
}

/** @param {string|number=} what */
function abort(what) {
  if (Module['onAbort']) {
    Module['onAbort'](what);
  }

  what = 'Aborted(' + what + ')';
  // TODO(sbc): Should we remove printing and leave it up to whoever
  // catches the exception?
  err(what);

  ABORT = true;

  // Use a wasm runtime error, because a JS error might be seen as a foreign
  // exception, which means we'd run destructors on it. We need the error to
  // simply make the program stop.
  // FIXME This approach does not work in Wasm EH because it currently does not assume
  // all RuntimeErrors are from traps; it decides whether a RuntimeError is from
  // a trap or not based on a hidden field within the object. So at the moment
  // we don't have a way of throwing a wasm trap from JS. TODO Make a JS API that
  // allows this in the wasm spec.

  // Suppress closure compiler warning here. Closure compiler's builtin extern
  // defintion for WebAssembly.RuntimeError claims it takes no arguments even
  // though it can.
  // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure gets fixed.
  // See above, in the meantime, we resort to wasm code for trapping.
  //
  // In case abort() is called before the module is initialized, Module['asm']
  // and its exported '__trap' function is not available, in which case we throw
  // a RuntimeError.
  //
  // We trap instead of throwing RuntimeError to prevent infinite-looping in
  // Wasm EH code (because RuntimeError is considered as a foreign exception and
  // caught by 'catch_all'), but in case throwing RuntimeError is fine because
  // the module has not even been instantiated, even less running.
  if (runtimeInitialized) {
    ___trap();
  }
  /** @suppress {checkTypes} */
  var e = new WebAssembly.RuntimeError(what);

  readyPromiseReject(e);
  // Throw the error whether or not MODULARIZE is set because abort is used
  // in code paths apart from instantiation where an exception is expected
  // to be thrown when abort is called.
  throw e;
}

// include: memoryprofiler.js
// end include: memoryprofiler.js
// include: URIUtils.js
// Prefix of data URIs emitted by SINGLE_FILE and related options.
var dataURIPrefix = 'data:application/octet-stream;base64,';

// Indicates whether filename is a base64 data URI.
function isDataURI(filename) {
  // Prefix of data URIs emitted by SINGLE_FILE and related options.
  return filename.startsWith(dataURIPrefix);
}

// Indicates whether filename is delivered via file protocol (as opposed to http/https)
function isFileURI(filename) {
  return filename.startsWith('file://');
}

// end include: URIUtils.js
/** @param {boolean=} fixedasm */
function createExportWrapper(name, fixedasm) {
  return function() {
    var displayName = name;
    var asm = fixedasm;
    if (!fixedasm) {
      asm = Module['asm'];
    }
    assert(runtimeInitialized, 'native function `' + displayName + '` called before runtime initialization');
    if (!asm[name]) {
      assert(asm[name], 'exported native function `' + displayName + '` not found');
    }
    return asm[name].apply(null, arguments);
  };
}

// include: runtime_exceptions.js
// end include: runtime_exceptions.js
var wasmBinaryFile;
  wasmBinaryFile = 'data:application/octet-stream;base64,AGFzbQEAAAAB9QM8YAJ/fwBgAX8Bf2ABfwBgAn9/AX9gA39/fwF/YAN/f38AYAR/f39/AX9gBH9/f38AYAZ/f39/f38Bf2AFf39/f38Bf2AFf39/f38AYAN/f38BfWAAAGAGf39/f39/AGAIf39/f39/f38Bf2AAAX9gB39/f39/f38Bf2AHf39/f39/fwBgBX9+fn5+AGADf35/AX5gBX9/fn9/AGAFf39/f34Bf2AEf39/fwF+YAh/f39/f39/fwBgBH9+fn8AYAp/f39/f39/f39/AX9gBn9/f39+fgF/YAd/f39/f35+AX9gA39/fwF8YAN/fn8Bf2AMf39/f39/f39/f39/AX9gBX9/f398AX9gBH9/f3wBf2AFf39/fn4Bf2ALf39/f39/f39/f38Bf2AKf39/f39/f39/fwBgD39/f39/f39/f39/f39/fwBgDX9/f39/f39/f39/f38AYAl/f39/f39/f38AYAV/f39/fwF8YAR/f39/AX1gAXwBfGABfwF+YAN/fn8AYAJ/fgBgAn98AGAEfn5+fgF/YAN+fn4Bf2ABfwF8YAJ/fwF+YAJ+fgF9YAJ+fgF8YAN/f34AYAJ8fwF8YAJ+fwF/YAZ/fH9/f38Bf2AEf39/fgF+YAV+f39/fwF/YAl/f39/f39/f38Bf2AEf39+fgAChAosA2VudhhlbXNjcmlwdGVuX2FzbV9jb25zdF9pbnQABANlbnYZX2VtYmluZF9yZWdpc3Rlcl9mdW5jdGlvbgARA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2NsYXNzACUDZW52Il9lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY29uc3RydWN0b3IADQNlbnYfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbgAmA2VudiVfZW1iaW5kX3JlZ2lzdGVyX2NsYXNzX2NsYXNzX2Z1bmN0aW9uABcDZW52EV9lbXZhbF90YWtlX3ZhbHVlAAMDZW52DV9lbXZhbF9pbmNyZWYAAgNlbnYNX2VtdmFsX2RlY3JlZgACA2VudhBfZW12YWxfbmV3X2FycmF5AA8DZW52EV9lbXZhbF9uZXdfb2JqZWN0AA8DZW52El9lbXZhbF9uZXdfY3N0cmluZwABA2VudhNfZW12YWxfc2V0X3Byb3BlcnR5AAUDZW52E19lbXZhbF9nZXRfcHJvcGVydHkAAwNlbnYJX2VtdmFsX2FzABwDZW52Fl9lbXZhbF9ydW5fZGVzdHJ1Y3RvcnMAAgNlbnYYX2VtdmFsX2dldF9tZXRob2RfY2FsbGVyAAMDZW52F19lbXZhbF9jYWxsX3ZvaWRfbWV0aG9kAAcDZW52IV9lbXZhbF9uZXdfYXJyYXlfZnJvbV9tZW1vcnlfdmlldwABA2VudhJfZW12YWxfY2FsbF9tZXRob2QAJwNlbnYNX19hc3NlcnRfZmFpbAAHA2VudhVfZW1iaW5kX3JlZ2lzdGVyX3ZvaWQAAANlbnYVX2VtYmluZF9yZWdpc3Rlcl9ib29sAAoDZW52GF9lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcgAKA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0AAUDZW52G19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZwAAA2VudhxfZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nAAUDZW52Fl9lbWJpbmRfcmVnaXN0ZXJfZW12YWwAAANlbnYcX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldwAFA2VudhVlbXNjcmlwdGVuX21lbWNweV9iaWcABQNlbnYWZW1zY3JpcHRlbl9yZXNpemVfaGVhcAABA2VudhBfX3N5c2NhbGxfb3BlbmF0AAYDZW52EV9fc3lzY2FsbF9mY250bDY0AAQDZW52D19fc3lzY2FsbF9pb2N0bAAEFndhc2lfc25hcHNob3RfcHJldmlldzEIZmRfd3JpdGUABhZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxB2ZkX3JlYWQABhZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX2Nsb3NlAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MRFlbnZpcm9uX3NpemVzX2dldAADFndhc2lfc25hcHNob3RfcHJldmlldzELZW52aXJvbl9nZXQAAwNlbnYKc3RyZnRpbWVfbAAJA2VudgVhYm9ydAAMA2VudiJfX3Rocm93X2V4Y2VwdGlvbl93aXRoX3N0YWNrX3RyYWNlAAIDZW52F19lbWJpbmRfcmVnaXN0ZXJfYmlnaW50ABEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQdmZF9zZWVrAAkDrgesBwwDDAAMAgICDAMBAgMBCygBAwEBAQIDAQQBAgQDAAUAAwAFAAUHAAoJAQEBDREABQcHCgoNBQcAAAUEBwoFBwoNEQEAAwAABQABAQAKBwYAAQIBDwACDwUABAUCAwoAAwUFBRAABQwAAAABAgMLAQEBAgsBAwECBwoACgADAQECAAMBAgMCAgEHBQAFCgABAQIACgUJDQcFAQUAAAIBAAEMDAQEBCkEBAEPAQIDAAEBBAwDAwMTBAQBAwEBHR0BAQEEAQQGKgIBAgAEFAcEBQQBAQMEAwEBAgIAAgEAAwEBBQArAQECAgACAAUFAQMBAQABAAUABAEBAQEEAgIBDAMDBBQHAQACAQICAQIEBQcFAAUDAwEBAQUBAgABAgACLAEYABgSEi0uLzASABIYEhISBzEyMwY0BAQDAwQBAwMDNQkFAQU2CgQ3AAYEAwYCAAEGOAcJBwUECQcFBAgBEAMAAggBBRkGBwgWCAYIBggWCAoeCwgcCAcIDwQEAwgBEAgDBRkICAgICAoeCAgIBAkBAQkHCQQRCBUJFR8gBAYRGiEJBAkBCREIFQkVHyARGiEJBAAADgEICAgNCA0ICgkODggICA0IDQgKCQ4QDRACAQAAAAEAABAiAAUFEAUAAQEDABAiABAFAQABAxsjJAQIGyMkBAgEDQ0BDAIAAgIBBQICAQIAAwICAgIEBgYGAwQDBAYECQECAwQDBAYECQ4JCQIOBA4JCQEBCQEODgkBDg4JAQIBAgEBAAAAAAAAAAABAgECAAECAQIBAgECAQIBAgECAQIBAgECAQIBAgIBBQMFBQAFAQEFBQACDAIWFgIMAQMDAAMDAwIFFwEKBQUEAwADFwEKAAADAwMDBQQEAAEFAQUFBAECBQACAQwMAgAMDAwCDAIEBAQDBQcHBwcEAwcKDQoKCg0NDQEBAQECAgEBAwEBOQACDA8PDwYCAwMDAQMFBAEAAgIBAQMDAQEABRACAwADAQEDAQMEBAQBAwABAwMDAAEFAQMECAADAAADAwAAAAEBAgYDBAEDAwMJAwMDAwMAAAEABAYBAQMDBQMDAwAGAQEEAQMAAAcAAAAAAAAAAAAAAAAGAAMBAgAAAAAAAAMAAAAAAAAAAAAAAAAAAwAAAgMAAAAEAAAAAAAAAAADAAAAAAAEAAAAAAAGAAAAAwMDAwAAAAAAAwAAAAQAAAAAAAADAwMAAAAAAAQAAAAAAAADAAEAAAUABAABBQ8CAQwJERA6GTsEBQFwAM0FBQcBAYACgIACDQMBAAIGFwR/AUGw8QYLfwFBAAt/AUEAC38BQQALB+0EHQZtZW1vcnkCABFfX3dhc21fY2FsbF9jdG9ycwAsD19fY3BwX2V4Y2VwdGlvbgQABm1hbGxvYwDWAQRmcmVlANcBGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAA1fX2dldFR5cGVOYW1lAMsBG19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5ncwDMARBfX2Vycm5vX2xvY2F0aW9uANUBBmZmbHVzaADqAQZfX3RyYXAA0QcVZW1zY3JpcHRlbl9zdGFja19pbml0APUFGWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2ZyZWUA9gUZZW1zY3JpcHRlbl9zdGFja19nZXRfYmFzZQD3BRhlbXNjcmlwdGVuX3N0YWNrX2dldF9lbmQA+AUJc3RhY2tTYXZlAM4HDHN0YWNrUmVzdG9yZQDPBwpzdGFja0FsbG9jANAHHGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2N1cnJlbnQAzgciX19jeGFfZGVjcmVtZW50X2V4Y2VwdGlvbl9yZWZjb3VudADHBSJfX2N4YV9pbmNyZW1lbnRfZXhjZXB0aW9uX3JlZmNvdW50AMsFDl9fY3hhX2RlbWFuZ2xlAPkFJV9fdGhyb3duX29iamVjdF9mcm9tX3Vud2luZF9leGNlcHRpb24AzAcXX19nZXRfZXhjZXB0aW9uX21lc3NhZ2UAzQcMZHluQ2FsbF9qaWppANIHDmR5bkNhbGxfdmlpamlpANMHDmR5bkNhbGxfaWlpaWlqANQHD2R5bkNhbGxfaWlpaWlqagDVBxBkeW5DYWxsX2lpaWlpaWpqANYHCbQKAQBBAQvMBe0FMjUvNjc4OTo7PD0+Nzg/Ojs8PUBBQkNERUZHSElKS0xNTk9QUVJTVFU9VjxXRkdIWFlaSltcXV5fYEtMYWJjTmRlZmdoaVFqa2xtbj1vcHFyc3R1PTx2d3hUeXp7MXx9fn+AAYEBfoIBgwGEAeoFngGfAZkBMjM0mgGbAZwBnwGdAZoBmwGcAZ0BoAGhAaIBowGkAaYBpwGqAasBtAG4AbkBugG8Ac0B4QHiAeMB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QYABcSACcjoACyABIAEtAAtB/wBxOgALDAELIAEgAkELTwR/IAJBEGpBcHEiBSAFQQFrIgUgBUELRhsFQQoLQQFqIgUQvgIhCyABIAEoAghBgICAgHhxIAVB/////wdxcjYCCCABIAEoAghBgICAgHhyNgIIIAEgCzYCACABIAI2AgQLIApBEGokACABDAELEC4ACyICLQALQQd2BEAgAigCAAwBCyACCyICQeDGACAGEPoBIAIgBmoiAgJ/IAAtAAtBB3YEQCAAKAIADAELIAALIAcQ+gEgAiAHakEBQQAQqgUgCUEQaiQAIAFBAToADgZAIAMgARCgBSIAQbCCAjYCACABQQA6AA4gAEHUggJB6gAQxQUZIAEkACABLQAOIQAgASwAC0EASARAIAEoAgAQ1wELIAEgAEEBcToADwkACxkgASQAIAEtAA8EQCADEMQFCwkACwALIQAZIAgkACAEENcBCQALIAALTwECfyMAIQMgACgCBCICBEAgAiACKAIAKAIUEQIACwZABkBBzAAQngUhAhgBIAIgACgCCCABEIUBIQEZIAMkACACENcBCQALIAAgATYCBAs3AQF/IAEgACgCBCIDQQF1aiEBIAAoAgAhACABIAIgA0EBcQR/IAEoAgAgAGooAgAFIAALEQAAC0sBAX8jAEEQayICJAAgAAJ/IAEoAgRFBEAgAkEANgIIQbD9ASACQQhqEAYMAQsgAkEBNgIIQbD9ASACQQhqEAYLNgIAIAJBEGokAAuFAQECfyMAQRBrIgIkACABIAAoAgQiA0EBdWohASAAKAIAIQAgAkEMaiABIANBAXEEfyABKAIAIABqKAIABSAACxEAAAZAIAIoAgwQBxkgAiQABkAgAigCDBAIGSACJAAQzwUACwkACwZAIAIoAgwiABAIGSACJAAQzwUACyACQRBqJAAgAAv4BAEEfyMAQUBqIgIkACAAKAIEIgMEQCADIAMoAgAoAhQRAgALBkBBzAAQngUhAyAAKAIIIQQgA0IANwIEIANBvNEANgIAIANCADcCDCADQQA2AhQgA0IANwIcIANCADcCJCADQgA3AiwgA0IANwI0IANCADcCPCADQoCAgICAgIDAPzcCRAZAIAMgASAEEIYBGSACJAAgA0E4ahCHASADENcBCQALBwAhASACJABBpPECQZAINgIAQaDxAkEANgIAIAEQ9AVBqPECKAIAQQFGBEAGQAJABkAgAkEwaiEDIAEQyAUiASABKAIAKAIIEQEAIQEYBCADIAEQLSEBBkAgAkEkakGPJhAtIQMGQCABIAMQiAFBf0cEQAZAQQgQwwUhBBgHIAAoAgQoAgghACACQQE6AD8GQCACQQxqIgUgABC0BSACQQE6AD4GQCACIAVB78UAEK0FIgAoAgg2AiAgAiAAKQIANwMYIABCADcCACAAQQA2AgggAkEBOgA9BkAgBCACQRhqEKMFIQAgAkEAOgA9IABB3IMCQQEQxQUMBhkgAiQAIAItAD0hACACLAAjQQBIBEAgAigCGBDXAQsgAiAAQQFxOgA+CQALABkgAiQAIAItAD4hACACLAAXQQBIBEAgAigCDBDXAQsgAiAAQQFxOgA/CQALABkgAiQAIAItAD8EQAZAIAQQxAUYCQsJAAsACxDKBRkgAiQAIAMsAAtBAEgEQCADKAIAENcBCwkACxkgAiQAIAEsAAtBAEgEQCABKAIAENcBCwkACwsZIAIkAAZAEMkFGSACJAAQzwUACwkACwALCQALIAAgAzYCBCACQUBrJAALgwIBBH8jAEEQayIDJAAgASAAKAIEIgRBAXVqIQYgACgCACEBIARBAXEEQCAGKAIAIAFqKAIAIQELAkAgAigCACIAQfD///8HSQRAAkACQCAAQQtPBEAgAEEPckEBaiIFEJ4FIQQgAyAFQYCAgIB4cjYCDCADIAQ2AgQgAyAANgIIIAAgBGohBQwBCyADIAA6AA8gA0EEaiIEIABqIQUgAEUNAQsgBCACQQRqIAAQzgEaCyAFQQA6AAAGQCAGIANBBGogAREAAAwCGSADJAAgAywAD0EASARAIAMoAgQQ1wELCQALAAsQLgALIAMsAA9BAEgEQCADKAIEENcBCyADQRBqJAALgAEBAX8jAEEQayICJAACQCAAKAIEIgBFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSACJAAgABDEBQkACwALIAAgASAAKAIAKAIMEQAAIAJBAjYCBCACQQA2AgBBgM8CQdPIACACEAAaIAJBEGokAA8LIABB3IMCQQEQxQUAC/sJAgh/An0jAEFAaiIDJAACQCAAKAIEIgdFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSADJAAgABDEBQkACwALAkAgASgCBCIEIAEoAgAiBWsiCUECdSIIIAAoAgBHBEBBCBDDBSEBIAAoAgAhACADQQE6ADkGQCADQQxqIgIgABC0BSADQQE6ADgGQCADIAJBjT8QrQUiACgCCDYCICADIAApAgA3AxggAEIANwIAIABBADYCCCADQQE6ADcGQCADIANBGGpBiTgQrwUiACgCCDYCMCADIAApAgA3AyggAEIANwIAIABBADYCCCADQQE6ADYGQCABIANBKGoQoAUiAEGwggI2AgAgA0EAOgA2IABB1IICQeoAEMUFDAUZIAMkACADLQA2IQAgAywAM0EASARAIAMoAigQ1wELIAMgAEEBcToANwkACwAZIAMkACADLQA3IQAgAywAI0EASARAIAMoAhgQ1wELIAMgAEEBcToAOAkACwAZIAMkACADLQA4IQAgAywAF0EASARAIAMoAgwQ1wELIAMgAEEBcToAOQkACwAZIAMkACADLQA5BEAgARDEBQsJAAsACwJAIAAtAAxFDQAgBCAFRiIGRQRAIAUhAQNAIAEqAgAiDCAMlCALkiELIAFBBGoiASAERw0ACwsgC4uRIgtDAAAAAF5FDQAgBg0AQQEgCCAIQQFNGyIEQQFxIQhBACEBIAlBCE8EQCAEQX5xIQlBACEEA0AgBSABQQJ0IgZqIgogCioCACALlTgCACAFIAZBBHJqIgYgBioCACALlTgCACABQQJqIQEgBEECaiIEIAlHDQALCyAIRQ0AIAUgAUECdGoiASABKgIAIAuVOAIACyAHKAIMIAcoAghGBEBBCBDDBSEBIAAoAgQoAgghACADQQE6ADwGQCADQRhqIgIgABC0BSADQQE6ADsGQCADIAJBhMUAEK0FIgAoAgg2AjAgAyAAKQIANwMoIABCADcCACAAQQA2AgggA0EBOgA6BkAgASADQShqEKMFIQAgA0EAOgA6IABB3IMCQQEQxQUMBBkgAyQAIAMtADohACADLAAzQQBIBEAgAygCKBDXAQsgAyAAQQFxOgA7CQALABkgAyQAIAMtADshACADLAAjQQBIBEAgAygCGBDXAQsgAyAAQQFxOgA8CQALABkgAyQAIAMtADwEQCABEMQFCwkACwALBkAgByAFIAJBACAHKAIAKAIAEQcABwAhACADJABBpPECQaAINgIAQaDxAkEANgIAIAAQ9AUC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IAFCADcDwAEgAUIANwO4ASABQgA3A7ABIAFCADcDqAEgAUIANwLsASABIAI6AOgBIAFCADcD4AEgAUKBgICAEDcD2AEgAUKAgICAgICAwD83A9ABIAFCADcC9AEgAUIANwL8ASABQYQCaiICQgA3AgAgAUIANwKMAiABQYCAgPwDNgKUAgZAIAEgBSAEEMUBGSAGJAAgAhCHASABQcQBahCHASABKAKUASICBEAgASACNgKYASACENcBCyABQewAahCxASABQcgAahCxAQkACxkgAyQAIAEQ1wEJAAsHACEBIAMkAEGk8QJBsAg2AgBBoPECQQA2AgAgARD0BUGo8QIoAgBBAUYEQAZAAkAGQCADQTBqIQIgARDIBSIBIAEoAgAoAggRAQAhARgFIAIgARAtIQEGQCADQSRqQY8mEC0hAgZAIAEgAhCIAUF/RwRABkBBCBDDBSEEGAggACgCBCgCBCEAIANBAToATwZAIANBDGoiBSAAELQFIANBAToATgZAIAMgBUHvxQAQrQUiACgCCDYCICADIAApAgA3AxggAEIANwIAIABBADYCCCADQQE6AE0GQCAEIANBGGoQowUhACADQQA6AE0gAEHcgwJBARDFBQwGGSADJAAgAy0ATSEAIAMsACNBAEgEQCADKAIYENcBCyADIABBAXE6AE4JAAsAGSADJAAgAy0ATiEAIAMsABdBAEgEQCADKAIMENcBCyADIABBAXE6AE8JAAsAGSADJAAgAy0ATwRABkAgBBDEBRgKCwkACwALEMoFGSADJAAgAiwAC0EASARAIAIoAgAQ1wELCQALGSADJAAgASwAC0EASARAIAEoAgAQ1wELCQALCxkgAyQABkAQyQUZIAMkABDPBQALCQALAAsJAAsZIAMkACADLABLQQBIBEAgAygCQBDXAQsJAAsgACABNgIEIAMsAEtBAEgEQCADKAJAENcBCyADQdAAaiQAC4UCAQR/IwBBEGsiBCQAIAEgACgCBCIFQQF1aiEHIAAoAgAhASAFQQFxBEAgBygCACABaigCACEBCwJAIAIoAgAiAEHw////B0kEQAJAAkAgAEELTwRAIABBD3JBAWoiBhCeBSEFIAQgBkGAgICAeHI2AgwgBCAFNgIEIAQgADYCCCAAIAVqIQYMAQsgBCAAOgAPIARBBGoiBSAAaiEGIABFDQELIAUgAkEEaiAAEM4BGgsgBkEAOgAABkAgByAEQQRqIAMgAREFAAwCGSAEJAAgBCwAD0EASARAIAQoAgQQ1wELCQALAAsQLgALIAQsAA9BAEgEQCAEKAIEENcBCyAEQRBqJAAL4QMBBn8jAEEwayICJAACQCAAKAIERQRABkAGQEEIEMMFIQAYAyAAQeM1EKQFIQAMAhkgAiQAIAAQxAUJAAsACwJAQcDWAigCAEHH1gIsAAAiBkH/AXEgBkEASBsiBUEBaiIDQfD///8HSQRAAkAgA0EKTQRAIAJBADYCGCACQgA3AxAgAiADOgAbIAJBEGohBAwBCyADQQ9yQQFqIgcQngUhBCACIAM2AhQgAiAENgIQIAIgB0GAgICAeHI2AhgLIAUEQCAEQbzWAkG81gIoAgAgBkEAThsgBRDPARoLIAQgBWpBLzsAAAZAIAJBEGogASgCACABIAEtAAsiA8BBAEgiBBsgASgCBCADIAQbEKwFIQEMAhkgAiQAIAIsABtBAEgEQCACKAIQENcBCwkACwALEC4ACyACIAEoAgg2AiggAiABKQIANwMgIAFCADcCACABQQA2AgggAiwAG0EASARAIAIoAhAQ1wELBkAgACgCBCIAIAJBIGogACgCACgCDBEAABkgAiQAIAIsACtBAEgEQCACKAIgENcBCwkACyACQQI2AgQgAkEANgIAQYDPAkHTyAAgAhAAGiACLAArQQBIBEAgAigCIBDXAQsgAkEwaiQADwsgAEHcgwJBARDFBQALUQEBfyMAIQICQCAAKAIEIgBFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSACJAAgABDEBQkACwALIAAgARCQAQ8LIABB3IMCQQEQxQUAC+4FAQR/IwBBMGsiAyQAAkAgASgCBCIBRQRABkAGQEEIEMMFIQAYAyAAQeM1EKQFIQAMAhkgAyQAIAAQxAUJAAsACwZAIANBIGogASACEJEBBkAgABAJNgIAQQAhASADQQA2AhAgAygCJCICIAMoAiAiBEcEQCAEIQIDQAZAIAIgAUECdGohBCMAQRBrIgEkACAAKAIAIQUgASADKAIQNgIIQZz+ASABQQhqIgYQBiECIAEgBCoCADgCCAZAQcD+ASAGEAYhBAZAIAUgAiAEEAwZIAEkAAZAIAQQCBkgASQAEM8FAAsJAAsZIAEkAAZAIAIQCBkgASQAEM8FAAsJAAsGQCAEEAgZIAEkABDPBQALBkAgAhAIGSABJAAQzwUACyABQRBqJAAZIAMkAAZAIAAoAgAQCBkgAyQAEM8FAAsJAAsgAyADKAIQQQFqIgE2AhAgASADKAIkIAMoAiAiAmtBAnVJDQALCyACBEAgAyACNgIkIAIQ1wELIANBMGokAA8ZIAMkACADKAIgIgAEQCADIAA2AiQgABDXAQsJAAsABwAhACADJABBpPECQcAINgIAQaDxAkEANgIAIAAQ9AUCQEGo8QIoAgBBAUYEQCAAEMgFIQBBCBDDBSECIAAgACgCACgCCBEBACEAIANBAToALwZAIANBBGogABAtIQAgA0EBOgAuBkAgAyAAQdfDABCtBSIBKAIINgIYIAMgASkCADcDECABQgA3AgAgAUEANgIIIANBAToALQZAIAIgA0EQahCjBSEBIANBADoALSABQdyDAkEBEMUFDAQZIAMkACADLQAtIQEgAywAG0EASARAIAMoAhAQ1wELIAMgAUEBcToALgkACwAZIAMkACADLQAuIQEgACwAC0EASARAIAAoAgAQ1wELIAMgAUEBcToALwkACwAZIAMkACADLQAvBEAgAhDEBQsGQBDJBRkgAyQAEM8FAAsJAAsACwkBCwALAAsgAEHcgwJBARDFBQALhwEBAn8jAEEQayIDJAAgASAAKAIEIgRBAXVqIQEgACgCACEAIANBDGogASACIARBAXEEfyABKAIAIABqKAIABSAACxEFAAZAIAMoAgwQBxkgAyQABkAgAygCDBAIGSADJAAQzwUACwkACwZAIAMoAgwiABAIGSADJAAQzwUACyADQRBqJAAgAAuDCgIJfwJ9IwBBQGoiBCQAAkAgACgCBCILRQRABkAGQEEIEMMFIQAYAyAAQeM1EKQFIQAMAhkgBCQAIAAQxAUJAAsACwJAIAEoAgQiBiABKAIAIgdrIgpBAnUiCSAAKAIARwRAQQgQwwUhASAAKAIAIQAgBEEBOgA5BkAgBEEMaiICIAAQtAUgBEEBOgA4BkAgBCACQY0/EK0FIgAoAgg2AiAgBCAAKQIANwMYIABCADcCACAAQQA2AgggBEEBOgA3BkAgBCAEQRhqQYk4EK8FIgAoAgg2AjAgBCAAKQIANwMoIABCADcCACAAQQA2AgggBEEBOgA2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IQcgASAISQRAIAEgBzYCACAAIAFBBGoiATYCBAwBCwsGQAJ/IAEgBGsiCkECdSIGQQFqIgJBgICAgARPBEAQMAwFC0EAQf////8DIAggBGsiA0EBdiIBIAIgASACSxsgA0H8////B08bIgJFDQAaIAJBgICAgARPBEAQkgEMBQsgAkECdBCeBQshAxkgCSQAIAAoAgAiAQRAIAAgATYCBCABENcBCwkACyADIAZBAnRqIgEgBzYCACAAIAMgBCAKEM8BIgYgAkECdGoiCDYCCCAAIAFBBGoiATYCBCAAIAY2AgAgBEUNACAEENcBDAALAAsPCwALiQEBA38jAEEQayICJAAgACgCACEDIAJBBGoiBCABIAAoAgQiAEEBdWoiASAAQQFxBH8gASgCACADaigCAAUgAwsRAAAGQCAEEMkBIQEZIAIkACACKAIEIgAEQCACIAA2AgggABDXAQsJAAsgAigCBCIABEAgAiAANgIIIAAQ1wELIAJBEGokACABC1EBAX8jACECAkAgACgCBCIARQRABkAGQEEIEMMFIQAYAyAAQeM1EKQFIQAMAhkgAiQAIAAQxAUJAAsACyAAIAEQkwEPCyAAQdyDAkEBEMUFAAvEAwECfyMAQSBrIgIkAAJAIAAoAgRFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSACJAAgABDEBQkACwALIAEoAgAiAyABKAIEIgFHBEADQAZAIAAoAgQgAygCABCTAQcAIQAgAiQAQaTxAkGACTYCAEGg8QJBADYCACAAEPQFAkBBqPECKAIAQQFGBEAgABDIBSEAQQgQwwUhAyAAIAAoAgAoAggRAQAhACACQQE6AB8GQCACQQRqIAAQLSEAIAJBAToAHgZAIAIgAEHePhCtBSIBKAIINgIYIAIgASkCADcDECABQgA3AgAgAUEANgIIIAJBAToAHQZAIAMgAkEQahCjBSEBIAJBADoAHSABQdyDAkEBEMUFDAQZIAIkACACLQAdIQEgAiwAG0EASARAIAIoAhAQ1wELIAIgAUEBcToAHgkACwAZIAIkACACLQAeIQEgACwAC0EASARAIAAoAgAQ1wELIAIgAUEBcToAHwkACwAZIAIkACACLQAfBEAgAxDEBQsGQBDJBRkgAiQAEM8FAAsJAAsACwkBCwALIANBBGoiAyABRw0ACwsg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QQF1aiEBIAAoAgAhACAFQQFxBEAgASgCACAAaigCACEACyAEIAI2AgwGQCAEIARBDGoQlQEZIAQkAAZAIAQoAgwQCBkgBCQAEM8FAAsJAAsGQCAEKAIMEAgZIAQkABDPBQALBkAgBEEMaiABIAQgAyAAEQcABkAgBCgCDBAHGSAEJAAGQCAEKAIMEAgZIAQkABDPBQALCQALGSAEJAAgBCgCACIABEAgBCAANgIEIAAQ1wELCQALBkAgBCgCDCIBEAgZIAQkABDPBQALIAQoAgAiAARAIAQgADYCBCAAENcBCyAEQRBqJAAgAQsJACABIAARAgALBgBB8NgACwwAIAAEQCAAENcBCwsHACAAEQ8ACwcAQQEQngUL1gEBBH8jAEEQayICJAACQCABKAIAIgNB8P///wdJBEACQAJAIANBC08EQCADQQ9yQQFqIgQQngUhBSACIARBgICAgHhyNgIMIAIgBTYCBCACIAM2AgggAyAFaiEEDAELIAIgAzoADyACQQRqIgUgA2ohBCADRQ0BCyAFIAFBBGogAxDOARoLIARBADoAAAZAIAJBBGogABECAAwCGSACJAAgAiwAD0EASARAIAIoAgQQ1wELCQALAAsQLgALIAIsAA9BAEgEQCACKAIEENcBCyACQRBqJAALewEBfyMAQRBrIgEkAAZAQbzWAkGUC0EOEKsFGSABJAAJAAtBuNYCLQAARQRAIAEgACgCACAAIAAsAAtBAEgbNgIAIAFBvNYCQbzWAigCAEHH1gIsAABBAE4bNgIEQe/QAkGE2gAgARAAGkG41gJBAToAAAsgAUEQaiQACwkAQbjWAi0AAAtXAQF/IwBBEGsiAyQAIAMgAjYCDAZAIAEgA0EMaiAAEQAAGSADJAAGQCADKAIMEAgZIAMkABDPBQALCQALBkAgAygCDBAIGSADJAAQzwUACyADQRBqJAALrAEBAX8jAEEQayICJAAgAkECNgIEIAIgADYCAEGAzwJB08gAIAIQABogASgCACEABkBB3NYCLQAAQQFxRQRAQQJBmNoAEBAhAUHc1gJBAToAAEHY1gIgATYCAAtB2NYCKAIAIQFBARAHIAJBATYCCCABIABBrhwgAkEIahARGSACJAAGQEEBEAgZIAIkABDPBQALCQALBkBBARAIGSACJAAQzwUACyACQRBqJAAL+wEBAn8jACEDIABCADcCICAAIAI2AgggAEG80QA2AgAgAEIANwIoIABCADcCMCAAQThqIgRCADcCACAAQUBrQgA3AgAgAEGAgID8AzYCSAZAIAAgASABKAIAKAIAEQEANgIUIAAgASABKAIAKAIEEQEANgIYIAAgASABKAIAKAIIEQEANgIcIAAgACgCFEEEaiIBNgIQIAAgASACbBDWASIBNgIEAkAgAUUEQAZABkBBCBDDBSEAGAQgAEGTKBCkBSEADAIZIAMkAAZAIAAQxAUYBAkACwALIABBADYCDCAADwsgAEHcgwJBARDFBRkgAyQAIAQQhwEJAAsAC9gCAQF/IwBBwAFrIgMkAAZABkAgA0EEaiABEK0BIQEYASABIABBCGpBBBCMAiABIABBEGpBBBCMAiABIABBDGpBBBCMAiAAIAIgAigCACgCABEBADYCFCAAIAIgAigCACgCBBEBADYCGCAAIAIgAigCACgCCBEBADYCHCAAIAAoAhRBBGoiAjYCECAAIAAoAgggAmwiAhDWASIANgIEAkAgAEUEQAZABkBBCBDDBSEAGAQgAEHeJxCkBSEADAIZIAMkAAZAIAAQxAUYBAkACwALIAEgACACEIwCIAFBCGoiABClAkUEQCABIAEoAgBBDGsoAgBqIgIgAigCEEEEchDGAgsgAUGciAEoAgAiAjYCACABIAJBDGsoAgBqQaiIASgCADYCACAAEKQCGiABQewAahDyASADQcABaiQADwsgAEHcgwJBARDFBRkgAyQAIAEQrgEaCQALAAs7AQJ/IAAoAggiAgRAA0AgAigCACEBIAIQ1wEgASICDQALCyAAKAIAIQEgAEEANgIAIAEEQCABENcBCwvCAQEFfyAAKAIEIAAtAAsiAiACwEEASCICGyIDQQBPBH8gASgCBCABLQALIgQgBMBBAEgiBhsiBUUEQEEADwsCQAJAIAMgACgCACAAIAIbIgNqIgIgAyIEayIAIAVIDQAgASgCACABIAYbIgEtAAAhBgNAIAAgBWtBAWoiAEUNASAEIAYgABDSASIARQ0BIAAgASAFENMBRQ0CIAIgAEEBaiIEayIAIAVODQALCyACIQALQX8gACADayAAIAJGGwVBfwsLpAYCBX8CfSMAIQggAigCACEGIAACfwJAIAEoAgQiBEUNAAJAIARpIgdBAk8EQCAGIQUg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BSAAIAJBAWsiAmoiAyABIAJqLQAAOgAAIANBA3ENAAsLIAJBA00NAANAIAAgAkEEayICaiABIAJqKAIANgIAIAJBA0sNAAsLIAJFDQIDQCAAIAJBAWsiAmogASACai0AADoAACACDQALDAILIAJBA00NAANAIAMgASgCADYCACABQQRqIQEgA0EEaiEDIAJBBGsiAkEDSw0ACwsgAkUNAANAIAMgAS0AADoAACADQQFqIQMgAUEBaiEBIAJBAWsiAg0ACwsgAAvyAgICfwF+AkAgAkUNACAAIAE6AAAgACACaiIDQQFrIAE6AAAgAkEDSQ0AIAAgAToAAiAAIAE6AAEgA0EDayABOgAAIANBAmsgAToAACACQQdJDQAgACABOgADIANBBGsgAToAACACQQlJDQAgAEEAIABrQQNxIgRqIgMgAUH/AXFBgYKECGwiATYCACADIAIgBGtBfHEiBGoiAkEEayABNgIAIARBCUkNACADIAE2AgggAyABNgIEIAJBCGsgATYCACACQQxrIAE2AgAgBEEZSQ0AIAMgATYCGCADIAE2AhQgAyABNgIQIAMgATYCDCACQRBrIAE2AgAgAkEUayABNgIAIAJBGGsgATYCACACQRxrIAE2AgAgBCADQQRxQRhyIgRrIgJBIEkNACABrUKBgICAEH4hBSADIARqIQEDQCABIAU3AxggASAFNwMQIAEgBTcDCCABIAU3AwAgAUEgaiEBIAJBIGsiAkEfSw0ACwsgAAvnBAMBfwZ8An4gAL0iCEIwiKchASAIQoCAgICAgID3P31C//////+fwgFYBEAgCEKAgICAgICA+D9RBEBEAAAAAAAAAAAPCyAARAAAAAAAAPC/oCIAIAAgAEQAAAAAAACgQaIiAqAgAqEiAiACokG44AArAwAiBaIiBqAiByAAIAAgAKIiA6IiBCAEIAQgBEGI4QArAwCiIANBgOEAKwMAoiAAQfjgACsDAKJB8OAAKwMAoKCgoiADQejgACsDAKIgAEHg4AArAwCiQdjgACsDAKCgoKIgA0HQ4AArAwCiIABByOAAKwMAokHA4AArAwCgoKCiIAAgAqEgBaIgACACoKIgBiAAIAehoKCgoA8LAkAgAUHw/wFrQZ+Afk0EQCAIQv///////////wCDUARAIwBBEGsiAUQAAAAAAADwvzkDCCABKwMIRAAAAAAAAAAAow8LIAhCgICAgICAgPj/AFENASABQfD/AXFB8P8BRyABQf//AU1xRQRAIAAgAKEiACAAow8LIABEAAAAAAAAMEOivUKAgICAgICAoAN9IQgLIAhCgICAgICAgPM/fSIJQjSHp7ciA0GA4AArAwCiIAlCLYinQf8AcUEEdCIBQZjhAGorAwCgIgQgAUGQ4QBqKwMAIAggCUKAgICAgICAeIN9vyABQZDxAGorAwChIAFBmPEAaisDAKGiIgCgIgUgACAAIACiIgKiIAIgAEGw4AArAwCiQajgACsDAKCiIABBoOAAKwMAokGY4AArAwCgoKIgAkGQ4AArAwCiIANBiOAAKwMAoiAAIAQgBaGgoKCgoCEACyAAC+MBAQJ/IAJBAEchAwJAAkACQCAAQQNxRQ0AIAJFDQAgAUH/AXEhBANAIAAtAAAgBEYNAiACQQFrIgJBAEchAyAAQQFqIgBBA3FFDQEgAg0ACwsgA0UNAQJAIAAtAAAgAUH/AXFGDQAgAkEESQ0AIAFB/wFxQYGChAhsIQMDQCAAKAIAIANzIgRBf3MgBEGBgoQIa3FBgIGChHhxDQIgAEEEaiEAIAJBBGsiAkEDSw0ACwsgAkUNAQsgAUH/AXEhAQNAIAEgAC0AAEYEQCAADwsgAEEBaiEAIAJBAWsiAg0ACwtBAAuBAQECfwJAAkAgAkEETwRAIAAgAXJBA3ENAQNAIAAoAgAgASgCAEcNAiABQQRqIQEgAEEEaiEAIAJBBGsiAkEDSw0ACwsgAkUNAQsDQCAALQAAIgMgAS0AACIERgRAIAFBAWohASAAQQFqIQAgAkEBayICDQEMAgsLIAMgBGsPC0EAC2kBA38CQCAAIgFBA3EEQANAIAEtAABFDQIgAUEBaiIBQQNxDQALCwNAIAEiAkEEaiEBIAIoAgAiA0F/cyADQYGChAhrcUGAgYKEeHFFDQALA0AgAiIBQQFqIQIgAS0AAA0ACwsgASAAawsGAEHs1gILnSkBC38jAEEQayILJAACQAJAAkACQAJAAkACQAJAAkAgAEH0AU0EQEHw1gIoAgAiBkEQIABBC2pBeHEgAEELSRsiBUEDdiIAdiIBQQNxBEACQCABQX9zQQFxIABqIgJBA3QiAUGY1wJqIgAgAUGg1wJqKAIAIgEoAggiBEYEQEHw1gIgBkF+IAJ3cTYCAAwBCyAEIAA2AgwgACAENgIICyABQQhqIQAgASACQQN0IgJBA3I2AgQgASACaiIBIAEoAgRBAXI2AgQMCgsgBUH41gIoAgAiB00NASABBEACQEECIAB0IgJBACACa3IgASAAdHEiAEEAIABrcWgiAUEDdCIAQZjXAmoiAiAAQaDXAmooAgAiACgCCCIERgRAQfDWAiAGQX4gAXdxIgY2AgAMAQsgBCACNgIMIAIgBDYCCAsgACAFQQNyNgIEIAAgBWoiCCABQQN0IgEgBWsiBEEBcjYCBCAAIAFqIAQ2AgAgBwRAIAdBeHFBmNcCaiEBQYTXAigCACECAn8gBkEBIAdBA3Z0IgNxRQRAQfDWAiADIAZyNgIAIAEMAQsgASgCCAshAyABIAI2AgggAyACNgIMIAIgATYCDCACIAM2AggLIABBCGohAEGE1wIgCDYCAEH41gIgBDYCAAwKC0H01gIoAgAiCkUNASAKQQAgCmtxaEECdEGg2QJqKAIAIgIoAgRBeHEgBWshAyACIQEDQAJAIAEoAhAiAEUEQCABKAIUIgBFDQELIAAoAgRBeHEgBWsiASADIAEgA0kiARshAyAAIAIgARshAiAAIQEMAQsLIAIoAhghCSACIAIoAgwiBEcEQEGA1wIoAgAaIAIoAggiACAENgIMIAQgADYCCAwJCyACQRRqIgEoAgAiAEUEQCACKAIQIgBFDQMgAkEQaiEBCwNAIAEhCCAAIgRBFGoiASgCACIADQAgBEEQaiEBIAQoAhAiAA0ACyAIQQA2AgAMCAtBfyEFIABBv39LDQAgAEELaiIAQXhxIQVB9NYCKAIAIghFDQBBACAFayEDAkACQAJAAn9BACAFQYACSQ0AGkEfIAVB////B0sNABogBUEmIABBCHZnIgBrdkEBcSAAQQF0a0E+agsiB0ECdEGg2QJqKAIAIgFFBEBBACEADAELQQAhACAFQRkgB0EBdmtBACAHQR9HG3QhAgNAAkAgASgCBEF4cSAFayIGIANPDQAgASEEIAYiAw0AQQAhAyABIQAMAwsgACABKAIUIgYgBiABIAJBHXZBBHFqKAIQIgFGGyAAIAYbIQAgAkEBdCECIAENAAsLIAAgBHJFBEBBACEEQQIgB3QiAEEAIABrciAIcSIARQ0DIABBACAAa3FoQQJ0QaDZAmooAgAhAAsgAEUNAQsDQCAAKAIEQXhxIAVrIgIgA0khASACIAMgARshAyAAIAQgARshBCAAKAIQIgEEfyABBSAAKAIUCyIADQALCyAERQ0AIANB+NYCKAIAIAVrTw0AIAQoAhghByAEIAQoAgwiAkcEQEGA1wIoAgAaIAQoAggiACACNgIMIAIgADYCCAwHCyAEQRRqIgEoAgAiAEUEQCAEKAIQIgBFDQMgBEEQaiEBCwNAIAEhBiAAIgJBFGoiASgCACIADQAgAkEQaiEBIAIoAhAiAA0ACyAGQQA2AgAMBgsgBUH41gIoAgAiBE0EQEGE1wIoAgAhAAJAIAQgBWsiAUEQTwRAIAAgBWoiAiABQQFyNgIEIAAgBGogATYCACAAIAVBA3I2AgQMAQsgACAEQQNyNgIEIAAgBGoiASABKAIEQQFyNgIEQQAhAkEAIQELQfjWAiABNgIAQYTXAiACNgIAIABBCGohAAwICyAFQfzWAigCACICSQRAQfzWAiACIAVrIgE2AgBBiNcCQYjXAigCACIAIAVqIgI2AgAgAiABQQFyNgIEIAAgBUEDcjYCBCAAQQhqIQAMCAtBACEAIAVBL2oiAwJ/QcjaAigCAARAQdDaAigCAAwBC0HU2gJCfzcCAEHM2gJCgKCAgICABDcCAEHI2gIgC0EMakFwcUHYqtWqBXM2AgBB3NoCQQA2AgBBrNoCQQA2AgBBgCALIgFqIgZBACABayIIcSIBIAVNDQdBqNoCKAIAIgQEQEGg2gIoAgAiByABaiIJIAdNDQggBCAJSQ0ICwJAQazaAi0AAEEEcUUEQAJAAkACQAJAQYjXAigCACIEBEBBsNoCIQADQCAEIAAoAgAiB08EQCAHIAAoAgRqIARLDQMLIAAoAggiAA0ACwtBABDaASICQX9GDQMgASEGQczaAigCACIAQQFrIgQgAnEEQCABIAJrIAIgBGpBACAAa3FqIQYLIAUgBk8NA0Go2gIoAgAiAARAQaDaAigCACIEIAZqIgggBE0NBCAAIAhJDQQLIAYQ2gEiACACRw0BDAULIAYgAmsgCHEiBhDaASICIAAoAgAgACgCBGpGDQEgAiEACyAAQX9GDQEgBiAFQTBqTwRAIAAhAgwEC0HQ2gIoAgAiAiADIAZrakEAIAJrcSICENoBQX9GDQEgAiAGaiEGIAAhAgwDCyACQX9HDQILQazaAkGs2gIoAgBBBHI2AgALIAEQ2gEhAkEAENoBIQAgAkF/Rg0FIABBf0YNBSAAIAJNDQUgACACayIGIAVBKGpNDQULQaDaAkGg2gIoAgAgBmoiADYCAEGk2gIoAgAgAEkEQEGk2gIgADYCAAsCQEGI1wIoAgAiAwRAQbDaAiEAA0AgAiAAKAIAIgEgACgCBCIEakYNAiAAKAIIIgANAAsMBAtBgNcCKAIAIgBBACAAIAJNG0UEQEGA1wIgAjYCAAtBACEAQbTaAiAGNgIAQbDaAiACNgIAQZDXAkF/NgIAQZTXAkHI2gIoAgA2AgBBvNoCQQA2AgADQCAAQQN0IgFBoNcCaiABQZjXAmoiBDYCACABQaTXAmogBDYCACAAQQFqIgBBIEcNAAtB/NYCIAZBKGsiAEF4IAJrQQdxQQAgAkEIakEHcRsiAWsiBDYCAEGI1wIgASACaiIBNgIAIAEgBEEBcjYCBCAAIAJqQSg2AgRBjNcCQdjaAigCADYCAAwECyAALQAMQQhxDQIgASADSw0CIAIgA00NAiAAIAQgBmo2AgRBiNcCIANBeCADa0EHcUEAIANBCGpBB3EbIgBqIgE2AgBB/NYCQfzWAigCACAGaiICIABrIgA2AgAgASAAQQFyNgIEIAIgA2pBKDYCBEGM1wJB2NoCKAIANgIADAMLQQAhBAwFC0EAIQIMAwtBgNcCKAIAIAJLBEBBgNcCIAI2AgALIAIgBmohAUGw2gIhAAJAAkACQAJAAkACQANAIAEgACgCAEcEQCAAKAIIIgANAQwCCwsgAC0ADEEIcUUNAQtBsNoCIQADQCADIAAoAgAiAU8EQCABIAAoAgRqIgQgA0sNAwsgACgCCCEADAALAAsgACACNgIAIAAgACgCBCAGajYCBCACQXggAmtBB3FBACACQQhqQQdxG2oiByAFQQNyNgIEIAFBeCABa0EHcUEAIAFBCGpBB3EbaiIGIAUgB2oiBWshACADIAZGBEBBiNcCIAU2AgBB/NYCQfzWAigCACAAaiIANgIAIAUgAEEBcjYCBAwDC0GE1wIoAgAgBkYEQEGE1wIgBTYCAEH41gJB+NYCKAIAIABqIgA2AgAgBSAAQQFyNgIEIAAgBWogADYCAAwDCyAGKAIEIgNBA3FBAUYEQCADQXhxIQkCQCADQf8BTQRAIAYoAgwiASAGKAIIIgJGBEBB8NYCQfDWAigCAEF+IANBA3Z3cTYCAAwCCyACIAE2AgwgASACNgIIDAELIAYoAhghCAJAIAYgBigCDCICRwRAIAYoAggiASACNgIMIAIgATYCCAwBCwJAIAZBFGoiAygCACIBDQAgBkEQaiIDKAIAIgENAEEAIQIMAQsDQCADIQQgASICQRRqIgMoAgAiAQ0AIAJBEGohAyACKAIQIgENAAsgBEEANgIACyAIRQ0AAkAgBigCHCIBQQJ0QaDZAmoiBCgCACAGRgRAIAQgAjYCACACDQFB9NYCQfTWAigCAEF+IAF3cTYCAAwCCyAIQRBBFCAIKAIQIAZGG2ogAjYCACACRQ0BCyACIAg2AhggBigCECIBBEAgAiABNgIQIAEgAjYCGAsgBigCFCIBRQ0AIAIgATYCFCABIAI2AhgLIAYgCWoiBigCBCEDIAAgCWohAAsgBiADQX5xNgIEIAUgAEEBcjYCBCAAIAVqIAA2AgAgAEH/AU0EQCAAQXhxQZjXAmohAQJ/QfDWAigCACICQQEgAEEDdnQiAHFFBEBB8NYCIAAgAnI2AgAgAQwBCyABKAIICyEAIAEgBTYCCCAAIAU2AgwgBSABNgIMIAUgADYCCAwDC0EfIQMgAEH///8HTQRAIABBJiAAQQh2ZyIBa3ZBAXEgAUEBdGtBPmohAwsgBSADNgIcIAVCADcCECADQQJ0QaDZAmohAQJAQfTWAigCACICQQEgA3QiBHFFBEBB9NYCIAIgBHI2AgAgASAFNgIADAELIABBGSADQQF2a0EAIANBH0cbdCEDIAEoAgAhAgNAIAIiASgCBEF4cSAARg0DIANBHXYhAiADQQF0IQMgASACQQRxaiIEKAIQIgINAAsgBCAFNgIQCyAFIAE2AhggBSAFNgIMIAUgBTYCCAwCC0H81gIgBkEoayIAQXggAmtBB3FBACACQQhqQQdxGyIBayIINgIAQYjXAiABIAJqIgE2AgAgASAIQQFyNgIEIAAgAmpBKDYCBEGM1wJB2NoCKAIANgIAIAMgBEEnIARrQQdxQQAgBEEna0EHcRtqQS9rIgAgACADQRBqSRsiAUEbNgIEIAFBuNoCKQIANwIQIAFBsNoCKQIANwIIQbjaAiABQQhqNgIAQbTaAiAGNgIAQbDaAiACNgIAQbzaAkEANgIAIAFBGGohAANAIABBBzYCBCAAQQhqIQIgAEEEaiEAIAIgBEkNAAsgASADRg0DIAEgASgCBEF+cTYCBCADIAEgA2siAkEBcjYCBCABIAI2AgAgAkH/AU0EQCACQXhxQZjXAmohAAJ/QfDWAigCACIBQQEgAkEDdnQiAnFFBEBB8NYCIAEgAnI2AgAgAAwBCyAAKAIICyEBIAAgAzYCCCABIAM2AgwgAyAANgIMIAMgATYCCAwEC0EfIQAgAkH///8HTQRAIAJBJiACQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgAyAANgIcIANCADcCECAAQQJ0QaDZAmohAQJAQfTWAigCACIEQQEgAHQiBnFFBEBB9NYCIAQgBnI2AgAgASADNgIADAELIAJBGSAAQQF2a0EAIABBH0cbdCEAIAEoAgAhBANAIAQiASgCBEF4cSACRg0EIABBHXYhBCAAQQF0IQAgASAEQQRxaiIGKAIQIgQNAAsgBiADNgIQCyADIAE2AhggAyADNgIMIAMgAzYCCAwDCyABKAIIIgAgBTYCDCABIAU2AgggBUEANgIYIAUgATYCDCAFIAA2AggLIAdBCGohAAwFCyABKAIIIgAgAzYCDCABIAM2AgggA0EANgIYIAMgATYCDCADIAA2AggLQfzWAigCACIAIAVNDQBB/NYCIAAgBWsiATYCAEGI1wJBiNcCKAIAIgAgBWoiAjYCACACIAFBAXI2AgQgACAFQQNyNgIEIABBCGohAAwDC0Hs1gJBMDYCAEEAIQAMAgsCQCAHRQ0AAkAgBCgCHCIAQQJ0QaDZAmoiASgCACAERgRAIAEgAjYCACACDQFB9NYCIAhBfiAAd3EiCDYCAAwCCyAHQRBBFCAHKAIQIARGG2ogAjYCACACRQ0BCyACIAc2AhggBCgCECIABEAgAiAANgIQIAAgAjYCGAsgBCgCFCIARQ0AIAIgADYCFCAAIAI2AhgLAkAgA0EPTQRAIAQgAyAFaiIAQQNyNgIEIAAgBGoiACAAKAIEQQFyNgIEDAELIAQgBUEDcjYCBCAEIAVqIgIgA0EBcjYCBCACIANqIAM2AgAgA0H/AU0EQCADQXhxQZjXAmohAAJ/QfDWAigCACIBQQEgA0EDdnQiA3FFBEBB8NYCIAEgA3I2AgAgAAwBCyAAKAIICyEBIAAgAjYCCCABIAI2AgwgAiAANgIMIAIgATYCCAwBC0EfIQAgA0H///8HTQRAIANBJiADQQh2ZyIAa3ZBAXEgAEEBdGtBPmohAAsgAiAANgIcIAJCADcCECAAQQJ0QaDZAmohAQJAAkAgCEEBIAB0IgZxRQRAQfTWAiAGIAhyNgIAIAEgAjYCAAwBCyADQRkgAEEBdmtBACAAQR9HG3QhACABKAIAIQUDQCAFIgEoAgRBeHEgA0YNAiAAQR12IQYgAEEBdCEAIAEgBkEEcWoiBigCECIFDQALIAYgAjYCEAsgAiABNgIYIAIgAjYCDCACIAI2AggMAQsgASgCCCIAIAI2AgwgASACNgIIIAJBADYCGCACIAE2AgwgAiAANgIICyAEQQhqIQAMAQsCQCAJRQ0AAkAgAigCHCIAQQJ0QaDZAmoiASgCACACRgRAIAEgBDYCACAEDQFB9NYCIApBfiAAd3E2AgAMAgsgCUEQQRQgCSgCECACRhtqIAQ2AgAgBEUNAQsgBCAJNgIYIAIoAhAiAARAIAQgADYCECAAIAQ2AhgLIAIoAhQiAEUNACAEIAA2AhQgACAENgIYCwJAIANBD00EQCACIAMgBWoiAEEDcjYCBCAAIAJqIgAgACgCBEEBcjYCBAwBCyACIAVBA3I2AgQgAiAFaiIEIANBAXI2AgQgAyAEaiADNgIAIAcEQCAHQXhxQZjXAmohAEGE1wIoAgAhAQJ/QQEgB0EDdnQiBSAGcUUEQEHw1gIgBSAGcjYCACAADAELIAAoAggLIQYgACABNgIIIAYgATYCDCABIAA2AgwgASAGNgIIC0GE1wIgBDYCAEH41gIgAzYCAAsgAkEIaiEACyALQRBqJAAgAAvuCwEHfwJAIABFDQAgAEEIayICIABBBGsoAgAiAUF4cSIAaiEFAkAgAUEBcQ0AIAFBA3FFDQEgAiACKAIAIgFrIgJBgNcCKAIASQ0BIAAgAWohAEGE1wIoAgAgAkcEQCABQf8BTQRAIAFBA3YhASACKAIMIgMgAigCCCIERgRAQfDWAkHw1gIoAgBBfiABd3E2AgAMAwsgBCADNgIMIAMgBDYCCAwCCyACKAIYIQYCQCACIAIoAgwiAUcEQCACKAIIIgMgATYCDCABIAM2AggMAQsCQCACQRRqIgQoAgAiAw0AIAJBEGoiBCgCACIDDQBBACEBDAELA0AgBCEHIAMiAUEUaiIEKAIAIgMNACABQRBqIQQgASgCECIDDQALIAdBADYCAAsgBkUNAQJAIAIoAhwiBEECdEGg2QJqIgMoAgAgAkYEQCADIAE2AgAgAQ0BQfTWAkH01gIoAgBBfiAEd3E2AgAMAwsgBkEQQRQgBigCECACRhtqIAE2AgAgAUUNAgsgASAGNgIYIAIoAhAiAwRAIAEgAzYCECADIAE2AhgLIAIoAhQiA0UNASABIAM2AhQgAyABNgIYDAELIAUoAgQiAUEDcUEDRw0AQfjWAiAANgIAIAUgAUF+cTYCBCACIABBAXI2AgQgACACaiAANgIADwsgAiAFTw0AIAUoAgQiAUEBcUUNAAJAIAFBAnFFBEBBiNcCKAIAIAVGBEBBiNcCIAI2AgBB/NYCQfzWAigCACAAaiIANgIAIAIgAEEBcjYCBCACQYTXAigCAEcNA0H41gJBADYCAEGE1wJBADYCAA8LQYTXAigCACAFRgRAQYTXAiACNgIAQfjWAkH41gIoAgAgAGoiADYCACACIABBAXI2AgQgACACaiAANgIADwsgAUF4cSAAaiEAAkAgAUH/AU0EQCABQQN2IQEgBSgCDCIDIAUoAggiBEYEQEHw1gJB8NYCKAIAQX4gAXdxNgIADAILIAQgAzYCDCADIAQ2AggMAQsgBSgCGCEGAkAgBSAFKAIMIgFHBEBBgNcCKAIAGiAFKAIIIgMgATYCDCABIAM2AggMAQsCQCAFQRRqIgQoAgAiAw0AIAVBEGoiBCgCACIDDQBBACEBDAELA0AgBCEHIAMiAUEUaiIEKAIAIgMNACABQRBqIQQgASgCECIDDQALIAdBADYCAAsgBkUNAAJAIAUoAhwiBEECdEGg2QJqIgMoAgAgBUYEQCADIAE2AgAgAQ0BQfTWAkH01gIoAgBBfiAEd3E2AgAMAgsgBkEQQRQgBigCECAFRhtqIAE2AgAgAUUNAQsgASAGNgIYIAUoAhAiAwRAIAEgAzYCECADIAE2AhgLIAUoAhQiA0UNACABIAM2AhQgAyABNgIYCyACIABBAXI2AgQgACACaiAANgIAIAJBhNcCKAIARw0BQfjWAiAANgIADwsgBSABQX5xNgIEIAIgAEEBcjYCBCAAIAJqIAA2AgALIABB/wFNBEAgAEF4cUGY1wJqIQECf0Hw1gIoAgAiA0EBIABBA3Z0IgBxRQRAQfDWAiAAIANyNgIAIAEMAQsgASgCCAshACABIAI2AgggACACNgIMIAIgATYCDCACIAA2AggPC0EfIQQgAEH///8HTQRAIABBJiAAQQh2ZyIBa3ZBAXEgAUEBdGtBPmohBAsgAiAENgIcIAJCADcCECAEQQJ0QaDZAmohBwJAAkACQEH01gIoAgAiA0EBIAR0IgFxRQRAQfTWAiABIANyNgIAIAcgAjYCACACIAc2AhgMAQsgAEEZIARBAXZrQQAgBEEfRxt0IQQgBygCACEBA0AgASIDKAIEQXhxIABGDQIgBEEddiEBIARBAXQhBCADIAFBBHFqIgdBEGooAgAiAQ0ACyAHIAI2AhAgAiADNgIYCyACIAI2AgwgAiACNgIIDAELIAMoAggiACACNgIMIAMgAjYCCCACQQA2AhggAiADNgIMIAIgADYCCAtBkNcCQZDXAigCAEEBayIAQX8gABs2AgALC4kIAQt/IABFBEAgARDWAQ8LIAFBQE8EQEHs1gJBMDYCAEEADwsCf0EQIAFBC2pBeHEgAUELSRshBSAAQQhrIgQoAgQiCUF4cSEDAkAgCUEDcUUEQEEAIAVBgAJJDQIaIAVBBGogA00EQCAEIQIgAyAFa0HQ2gIoAgBBAXRNDQILQQAMAgsgAyAEaiEGAkAgAyAFTwRAIAMgBWsiA0EQSQ0BIAQgCUEBcSAFckECcjYCBCAEIAVqIgIgA0EDcjYCBCAGIAYoAgRBAXI2AgQgAiADENkBDAELQYjXAigCACAGRgRAQfzWAigCACADaiIIIAVNDQIgBCAJQQFxIAVyQQJyNgIEIAQgBWoiAyAIIAVrIgJBAXI2AgRB/NYCIAI2AgBBiNcCIAM2AgAMAQtBhNcCKAIAIAZGBEBB+NYCKAIAIANqIgMgBUkNAgJAIAMgBWsiAkEQTwRAIAQgCUEBcSAFckECcjYCBCAEIAVqIgggAkEBcjYCBCADIARqIgMgAjYCACADIAMoAgRBfnE2AgQMAQsgBCAJQQFxIANyQQJyNgIEIAMgBGoiAiACKAIEQQFyNgIEQQAhAgtBhNcCIAg2AgBB+NYCIAI2AgAMAQsgBigCBCIIQQJxDQEgCEF4cSADaiIKIAVJDQEgCiAFayEMAkAgCEH/AU0EQCAGKAIMIgMgBigCCCICRgRAQfDWAkHw1gIoAgBBfiAIQQN2d3E2AgAMAgsgAiADNgIMIAMgAjYCCAwBCyAGKAIYIQsCQCAGIAYoAgwiB0cEQEGA1wIoAgAaIAYoAggiAiAHNgIMIAcgAjYCCAwBCwJAIAZBFGoiCCgCACICDQAgBkEQaiIIKAIAIgINAEEAIQcMAQsDQCAIIQMgAiIHQRRqIggoAgAiAg0AIAdBEGohCCAHKAIQIgINAAsgA0EANgIACyALRQ0AAkAgBigCHCIDQQJ0QaDZAmoiAigCACAGRgRAIAIgBzYCACAHDQFB9NYCQfTWAigCAEF+IAN3cTYCAAwCCyALQRBBFCALKAIQIAZGG2ogBzYCACAHRQ0BCyAHIAs2AhggBigCECICBEAgByACNgIQIAIgBzYCGAsgBigCFCICRQ0AIAcgAjYCFCACIAc2AhgLIAxBD00EQCAEIAlBAXEgCnJBAnI2AgQgBCAKaiICIAIoAgRBAXI2AgQMAQsgBCAJQQFxIAVyQQJyNgIEIAQgBWoiAyAMQQNyNgIEIAQgCmoiAiACKAIEQQFyNgIEIAMgDBDZAQsgBCECCyACCyICBEAgAkEIag8LIAEQ1gEiBEUEQEEADwsgBCAAQXxBeCAAQQRrKAIAIgJBA3EbIAJBeHFqIgIgASABIAJLGxDOARogABDXASAEC6oLAQZ/IAAgAWohBQJAAkAgACgCBCICQQFxDQAgAkEDcUUNASAAKAIAIgIgAWohAQJAIAAgAmsiAEGE1wIoAgBHBEAgAkH/AU0EQCACQQN2IQIgACgCCCIEIAAoAgwiA0cNAkHw1gJB8NYCKAIAQX4gAndxNgIADAMLIAAoAhghBgJAIAAgACgCDCICRwRAQYDXAigCABogACgCCCIDIAI2AgwgAiADNgIIDAELAkAgAEEUaiIEKAIAIgMNACAAQRBqIgQoAgAiAw0AQQAhAgwBCwNAIAQhByADIgJBFGoiBCgCACIDDQAgAkEQaiEEIAIoAhAiAw0ACyAHQQA2AgALIAZFDQICQCAAKAIcIgRBAnRBoNkCaiIDKAIAIABGBEAgAyACNgIAIAINAUH01gJB9NYCKAIAQX4gBHdxNgIADAQLIAZBEEEUIAYoAhAgAEYbaiACNgIAIAJFDQMLIAIgBjYCGCAAKAIQIgMEQCACIAM2AhAgAyACNgIYCyAAKAIUIgNFDQIgAiADNgIUIAMgAjYCGAwCCyAFKAIEIgJBA3FBA0cNAUH41gIgATYCACAFIAJBfnE2AgQgACABQQFyNgIEIAUgATYCAA8LIAQgAzYCDCADIAQ2AggLAkAgBSgCBCICQQJxRQRAQYjXAigCACAFRgRAQYjXAiAANgIAQfzWAkH81gIoAgAgAWoiATYCACAAIAFBAXI2AgQgAEGE1wIoAgBHDQNB+NYCQQA2AgBBhNcCQQA2AgAPC0GE1wIoAgAgBUYEQEGE1wIgADYCAEH41gJB+NYCKAIAIAFqIgE2AgAgACABQQFyNgIEIAAgAWogATYCAA8LIAJBeHEgAWohAQJAIAJB/wFNBEAgAkEDdiECIAUoAgwiAyAFKAIIIgRGBEBB8NYCQfDWAigCAEF+IAJ3cTYCAAwCCyAEIAM2AgwgAyAENgIIDAELIAUoAhghBgJAIAUgBSgCDCICRwRAQYDXAigCABogBSgCCCIDIAI2AgwgAiADNgIIDAELAkAgBUEUaiIDKAIAIgQNACAFQRBqIgMoAgAiBA0AQQAhAgwBCwNAIAMhByAEIgJBFGoiAygCACIEDQAgAkEQaiEDIAIoAhAiBA0ACyAHQQA2AgALIAZFDQACQCAFKAIcIgRBAnRBoNkCaiIDKAIAIAVGBEAgAyACNgIAIAINAUH01gJB9NYCKAIAQX4gBHdxNgIADAILIAZBEEEUIAYoAhAgBUYbaiACNgIAIAJFDQELIAIgBjYCGCAFKAIQIgMEQCACIAM2AhAgAyACNgIYCyAFKAIUIgNFDQAgAiADNgIUIAMgAjYCGAsgACABQQFyNgIEIAAgAWogATYCACAAQYTXAigCAEcNAUH41gIgATYCAA8LIAUgAkF+cTYCBCAAIAFBAXI2AgQgACABaiABNgIACyABQf8BTQRAIAFBeHFBmNcCaiECAn9B8NYCKAIAIgNBASABQQN2dCIBcUUEQEHw1gIgASADcjYCACACDAELIAIoAggLIQEgAiAANgIIIAEgADYCDCAAIAI2AgwgACABNgIIDwtBHyEEIAFB////B00EQCABQSYgAUEIdmciAmt2QQFxIAJBAXRrQT5qIQQLIAAgBDYCHCAAQgA3AhAgBEECdEGg2QJqIQcCQAJAQfTWAigCACIDQQEgBHQiAnFFBEBB9NYCIAIgA3I2AgAgByAANgIAIAAgBzYCGAwBCyABQRkgBEEBdmtBACAEQR9HG3QhBCAHKAIAIQIDQCACIgMoAgRBeHEgAUYNAiAEQR12IQIgBEEBdCEEIAMgAkEEcWoiB0EQaigCACICDQALIAcgADYCECAAIAM2AhgLIAAgADYCDCAAIAA2AggPCyADKAIIIgEgADYCDCADIAA2AgggAEEANgIYIAAgAzYCDCAAIAE2AggLC1IBAn9B0M0CKAIAIgEgAEEHakF4cSICaiEAAkAgAkEAIAAgAU0bDQAgAD8AQRB0SwRAIAAQHkUNAQtB0M0CIAA2AgAgAQ8LQezWAkEwNgIAQX8LrgwBBn8jAEEQayIEJAAgBCAANgIMAkAgAEHTAU0EQEGQgQFB0IIBIARBDGoQ3AEoAgAhAgwBCyAAQXxPBEAQ3QEACyAEIAAgAEHSAW4iBkHSAWwiAms2AghB0IIBQZCEASAEQQhqENwBQdCCAWtBAnUhBQNAIAVBAnRB0IIBaigCACACaiECQQUhAANAAkAgAEEvRgRAQdMBIQADQCACIABuIgEgAEkNBSACIAAgAWxGDQIgAiAAQQpqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQQxqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQRBqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQRJqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQRZqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQRxqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQR5qIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQSRqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQShqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQSpqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQS5qIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQTRqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQTpqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQTxqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQcIAaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEHGAGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABByABqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQc4AaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEHSAGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABB2ABqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQeAAaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEHkAGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABB5gBqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQeoAaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEHsAGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABB8ABqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQfgAaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEH+AGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBggFqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQYgBaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEGKAWoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBjgFqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQZQBaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEGWAWoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBnAFqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQaIBaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEGmAWoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBqAFqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQawBaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEGyAWoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBtAFqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQboBaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEG+AWoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBwAFqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQcQBaiIBbiIDIAFJDQUgAiABIANsRg0CIAIgAEHGAWoiAW4iAyABSQ0FIAIgASADbEYNAiACIABB0AFqIgFuIgMgAUkNBSAAQdIBaiEAIAIgASADbEcNAAsMAQsgAiAAQQJ0QZCBAWooAgAiAW4iAyABSQ0DIABBAWohACACIAEgA2xHDQELC0EAIAVBAWoiACAAQTBGIgAbIQUgACAGaiIGQdIBbCECDAALAAsgBEEQaiQAIAILggEBA38jAEEQayIFJAAjAEEQayIDJAAgASAAa0ECdSEBA0AgAQRAIAMgADYCDCADIAMoAgwgAUEBdiIEQQJ0ajYCDCABIARBf3NqIAQgAygCDCgCACACKAIASSIEGyEBIAMoAgxBBGogACAEGyEADAELCyADQRBqJAAgBUEQaiQAIAALPwECfyMAIQEGQAZAQQgQwwUhABgBIABB9wsQpAUiAEHwgwI2AgAZIAEkACAAEMQFCQALIABBkIQCQQEQxQUACwQAIAEL2wEBAn8CQCABQf8BcSIDBEAgAEEDcQRAA0AgAC0AACICRQ0DIAIgAUH/AXFGDQMgAEEBaiIAQQNxDQALCwJAIAAoAgAiAkF/cyACQYGChAhrcUGAgYKEeHENACADQYGChAhsIQMDQCACIANzIgJBf3MgAkGBgoQIa3FBgIGChHhxDQEgACgCBCECIABBBGohACACQYGChAhrIAJBf3NxQYCBgoR4cUUNAAsLA0AgACICLQAAIgMEQCACQQFqIQAgAyABQf8BcUcNAQsLIAIPCyAAENQBIABqDwsgAAsaACAAIAEQ3wEiAEEAIAAtAAAgAUH/AXFGGwtWAQF/IAAoAjwhAyMAQRBrIgAkACADIAGnIAFCIIinIAJB/wFxIABBCGoQKyICBH9B7NYCIAI2AgBBfwVBAAshAiAAKQMIIQEgAEEQaiQAQn8gASACGwv2AgEHfyMAQSBrIgMkACADIAAoAhwiBDYCECAAKAIUIQUgAyACNgIcIAMgATYCGCADIAUgBGsiATYCFCABIAJqIQVBAiEHAn8CQAJAAkAgACgCPCADQRBqIgFBAiADQQxqECIiBAR/QezWAiAENgIAQX8FQQALBEAgASEEDAELA0AgBSADKAIMIgZGDQIgBkEASARAIAEhBAwECyABIAYgASgCBCIISyIJQQN0aiIEIAYgCEEAIAkbayIIIAQoAgBqNgIAIAFBDEEEIAkbaiIBIAEoAgAgCGs2AgAgBSAGayEFIAAoAjwgBCIBIAcgCWsiByADQQxqECIiBgR/QezWAiAGNgIAQX8FQQALRQ0ACwsgBUF/Rw0BCyAAIAAoAiwiATYCHCAAIAE2AhQgACABIAAoAjBqNgIQIAIMAQsgAEEANgIcIABCADcDECAAIAAoAgBBIHI2AgBBACAHQQJGDQAaIAIgBCgCBGsLIQAgA0EgaiQAIAAL4wEBBH8jAEEgayIEJAAgBCABNgIQIAQgAiAAKAIwIgNBAEdrNgIUIAAoAiwhBSAEIAM2AhwgBCAFNgIYAkACQCAAIAAoAjwgBEEQakECIARBDGoQIyIDBH9B7NYCIAM2AgBBfwVBAAsEf0EgBSAEKAIMIgNBAEoNAUEgQRAgAxsLIAAoAgByNgIADAELIAQoAhQiBSADIgZPDQAgACAAKAIsIgM2AgQgACADIAYgBWtqNgIIIAAoAjAEQCAAIANBAWo2AgQgASACakEBayADLQAAOgAACyACIQYLIARBIGokACAGCwkAIAAoAjwQJAsEAEEACwQAQQALBABBAQubAQEBfwJAIAJBA08EQEHs1gJBHDYCAAwBCwJAIAJBAUcNACAAKAIIIgNFDQAgASADIAAoAgRrrH0hAQsgACgCFCAAKAIcRwRAIABBAEEAIAAoAiQRBAAaIAAoAhRFDQELIABBADYCHCAAQgA3AxAgACABIAIgACgCKBETAEIAUw0AIABCADcCBCAAIAAoAgBBb3E2AgBBAA8LQX8LIAAgACgCTEEASARAIAAgASACEOgBDwsgACABIAIQ6AEL8AEBA38gAEUEQEGg2wIoAgAEQEGg2wIoAgAQ6gEhAQtB8M4CKAIABEBB8M4CKAIAEOoBIAFyIQELQZzbAigCACIABEADQCAAKAJMGiAAKAIUIAAoAhxHBEAgABDqASABciEBCyAAKAI4IgANAAsLIAEPCyAAKAJMQQBOIQICQAJAIAAoAhQgACgCHEYNACAAQQBBACAAKAIkEQQAGiAAKAIUDQBBfyEBDAELIAAoAgQiASAAKAIIIgNHBEAgACABIANrrEEBIAAoAigREwAaC0EAIQEgAEEANgIcIABCADcDECAAQgA3AgQgAkUNAAsgAQt2AQR/IAAoAkwaIAAQ6gEhAyAAIAAoAgwRAQAhBCAALQAAQQFxRQRAIAAoAjQiAQRAIAEgACgCODYCOAsgACgCOCICBEAgAiABNgI0CyAAQZzbAigCAEYEQEGc2wIgAjYCAAsgACgCYBDXASAAENcBCyADIARyC3wBAn8gACAAKAJIIgFBAWsgAXI2AkggACgCFCAAKAIcRwRAIABBAEEAIAAoAiQRBAAaCyAAQQA2AhwgAEIANwMQIAAoAgAiAUEEcQRAIAAgAUEgcjYCAEF/DwsgACAAKAIsIAAoAjBqIgI2AgggACACNgIEIAFBG3RBH3ULoQEBAn8gAigCTBogAiACKAJIIgNBAWsgA3I2AkggAigCBCIDIAIoAggiBEYEfyABBSAAIAMgBCADayIDIAEgASADSxsiAxDOARogAiACKAIEIANqNgIEIAAgA2ohACABIANrCyIDBEADQAJAIAIQ7AFFBEAgAiAAIAMgAigCIBEEACIEDQELIAEgA2sPCyAAIARqIQAgAyAEayIDDQALCyABC1kBAX8gACAAKAJIIgFBAWsgAXI2AkggACgCACIBQQhxBEAgACABQSByNgIAQX8PCyAAQgA3AgQgACAAKAIsIgE2AhwgACABNgIUIAAgASAAKAIwajYCEEEAC8IBAQN/AkAgASACKAIQIgMEfyADBSACEO4BDQEgAigCEAsgAigCFCIFa0sEQCACIAAgASACKAIkEQQADwsCQCACKAJQQQBIBEBBACEDDAELIAEhBANAIAQiA0UEQEEAIQMMAgsgACADQQFrIgRqLQAAQQpHDQALIAIgACADIAIoAiQRBAAiBCADSQ0BIAAgA2ohACABIANrIQEgAigCFCEFCyAFIAAgARDOARogAiACKAIUIAFqNgIUIAEgA2ohBAsgBAtCAQF/IAEgAmwhBCAEAn8gAygCTEEASARAIAAgBCADEO8BDAELIAAgBCADEO8BCyIARgRAIAJBACABGw8LIAAgAW4LcAICfwF+IAAoAighAkEBIQECQCAAQgAgAC0AAEGAAXEEf0EBQQIgACgCFCAAKAIcRhsFQQELIAIREwAiA0IAUw0AIAMgACgCCCIBBH8gAEEEagUgACgCHCIBRQ0BIABBFGoLKAIAIAFrrHwhAwsgAwsIACAAEMcCGgs4AQJ/IABBmIQBNgIAIAAoAgQiASABKAIEQQFrIgI2AgQgAkF/RgRAIAEgASgCACgCCBECAAsgAAsNACAAEPMBGiAAENcBCwMAAQsEACAACxAAIABCfzcDCCAAQgA3AwALEAAgAEJ/NwMIIABCADcDAAuCAgEGfyMAQRBrIgQkAANAAkAgAiAGTA0AAkAgACgCDCIDIAAoAhAiBUkEQCAEQf////8HNgIMIAQgBSADazYCCCAEIAIgBms2AgQjAEEQayIDJAAgBEEEaiIFKAIAIARBCGoiBygCAEghCCADQRBqJAAgBSAHIAgbIQMjAEEQayIFJAAgAygCACAEQQxqIgcoAgBIIQggBUEQaiQAIAMgByAIGyEDIAEgACgCDCADKAIAIgMQ+gEgACAAKAIMIANqNgIMDAELIAAgACgCACgCKBEBACIDQX9GDQEgASADwDoAAEEBIQMLIAEgA2ohASADIAZqIQYMAQsLIARBEGokACAGCx4BAX8jACEDBkAgASACIAAQ+wEaGSADJAAQzwUACwsOACAAIAAgAWogAhC4AgsEAEF/CywAIAAgACgCACgCJBEBAEF/RgRAQX8PCyAAIAAoAgwiAEEBajYCDCAALQAACwQAQX8LzgEBBn8jAEEQayIFJAADQAJAIAIgBEwNACAAKAIYIgMgACgCHCIGTwRAIAAgAS0AACAAKAIAKAI0EQMAQX9GDQEgBEEBaiEEIAFBAWohAQwCCyAFIAYgA2s2AgwgBSACIARrNgIIIwBBEGsiAyQAIAVBCGoiBigCACAFQQxqIgcoAgBIIQggA0EQaiQAIAYgByAIGyEDIAAoAhggASADKAIAIgMQ+gEgACADIAAoAhhqNgIYIAMgBGohBCABIANqIQEMAQsLIAVBEGokACAECwQAIAALDAAgAEEIahDyASAACxMAIAAgACgCAEEMaygCAGoQgQILCgAgABCBAhDXAQsTACAAIAAoAgBBDGsoAgBqEIMCC3gBAn8jAEEQayIDJAAgAEEAOgAAIAEgASgCAEEMaygCAGohAgJAAkAgAigCEEUEQCACKAJIBEAgASABKAIAQQxrKAIAaigCSBCGAgsMAQsgAkEEEIgCDAELIAAgASABKAIAQQxrKAIAaigCEEU6AAALIANBEGokAAvUAQECfyMAQRBrIgEkAAJABkACQCAAIAAoAgBBDGsoAgBqKAIYRQ0CIAFBCGogABCTAiABLQAIRQ0ABkAgACAAKAIAQQxrKAIAaigCGCICIAIoAgAoAhgRAQBBf0cNASAAIAAoAgBBDGsoAgBqQQEQiAIZIAEkAAZAIAFBCGoQlAIYBAkACwsHACECIAEkACACEMgFGgZAIAAgACgCAEEMaygCAGoQygIZIAEkAAZAEMkFGSABJAAQzwUACwkACxDJBQwBCyABQQhqEJQCCyABQRBqJAALCwAgAEHA3gIQiwMLDwAgACAAKAIQIAFyEMYCCxAAIAAQwAIgARDAAnNBAXMLDQAgACgCABCLAhogAAsxAQF/IAAoAgwiASAAKAIQRgRAIAAgACgCACgCKBEBAA8LIAAgAUEBajYCDCABLQAAC/ABAQJ/IwBBEGsiAyQAIABBADYCBCADQQ9qIAAQhQICf0EEIAMtAA9FDQAaBkAgACAAKAIAQQxrKAIAaigCGCIEIAEgAiAEKAIAKAIgEQQAIQEHACEBIAMkACABEMgFGiAAIAAoAgBBDGsoAgBqIgEgASgCGEUgASgCEEEBcnI2AhACQAZAIAAgACgCAEEMaygCAGooAhRBAXEEQBDKBQwCCxkgAyQABkAQyQUZIAMkABDPBQALCQALEMkFQQEMAgsACyAAIAE2AgRBBkEAIAEgAkcbCyEBIAAgACgCAEEMaygCAGogARCIAiADQRBqJAAL/gEBAn8jAEEgayICJAAgAEJ/NwMIIABCADcDACACQR9qIAEQhQIgAi0AHwRAAn8GQCACQQhqIAEgASgCAEEMaygCAGooAhgiA0IAQQFBCCADKAIAKAIQERQABwAhACACJAAgABDIBRogASABKAIAQQxrKAIAaiIAIAAoAhhFIAAoAhBBAXJyNgIQAkAGQCABIAEoAgBBDGsoAgBqKAIUQQFxBEAQygUMAgsZIAIkAAZAEMkFGSACJAAQzwUACwkACxDJBUEBDAILAAsgACACKQMINwMAIAAgAikDEDcDCEEACyEAIAEgASgCAEEMaygCAGogABCIAgsgAkEgaiQAC6YCAQR/IwBBMGsiAyQAIAAgACgCAEEMaygCAGoiBCAEKAIQQX1xIgUQxgIgA0EvaiAAEIUCIAMtAC8EQAJABkAgA0EYaiIEIAAgACgCAEEMaygCAGooAhgiBiABIAJBCCAGKAIAKAIQERQAIANBCGoiAkJ/NwMIIAJCADcDACAEKQMIIAIpAwhRIQIHACECIAMkACACEMgFGiAAIAAoAgBBDGsoAgBqIgQgBCgCGEUgBUEBciICIAQoAhBycjYCEAJABkAgACAAKAIAQQxrKAIAaigCFEEBcQRAEMoFDAILGSADJAAGQBDJBRkgAyQAEM8FAAsJAAsQyQUMAgsACyAFQQRyIAUgAhshAgsgACAAKAIAQQxrKAIAaiACEIgCCyADQTBqJAALDAAgAEEEahDyASAACxMAIAAgACgCAEEMaygCAGoQjwILCgAgABCPAhDXAQsTACAAIAAoAgBBDGsoAgBqEJECC1QAIAAgATYCBCAAQQA6AAAgASABKAIAQQxrKAIAaigCEEUEQCABIAEoAgBBDGsoAgBqKAJIBEAgASABKAIAQQxrKAIAaigCSBCGAgsgAEEBOgAACwvGAQECfyMAIQIGQAJAIAAoAgQiASABKAIAQQxrKAIAaigCGEUNACAAKAIEIgEgASgCAEEMaygCAGooAhANACAAKAIEIgEgASgCAEEMaygCAGooAgRBgMAAcUUNAEGA7QIoAgBBAEoNAAZAIAAoAgQiASABKAIAQQxrKAIAaigCGCIBIAEoAgAoAhgRAQBBf0cNASAAKAIEIgAgACgCAEEMaygCAGpBARCIAgcAIQAgAiQAIAAQyAUaEMkFCwsZIAIkABDPBQALC1wBAn8CQCAAKAIAIgJFDQACfyACKAIYIgMgAigCHEYEQCACIAFB/wFxIAIoAgAoAjQRAwAMAQsgAiADQQFqNgIYIAMgAToAACABQf8BcQtBf0cNACAAQQA2AgALC80BAQJ/IwBBEGsiAyQAAkAGQAJAIANBCGogABCTAiADLQAIIQQgAkUNACAERQ0ABkAgACAAKAIAQQxrKAIAaigCGCIEIAEgAiAEKAIAKAIwEQQAIAJGDQEgACAAKAIAQQxrKAIAakEBEIgCGSADJAAGQCADQQhqEJQCGAQJAAsLBwAhASADJAAgARDIBRoGQCAAIAAoAgBBDGsoAgBqEMoCGSADJAAGQBDJBRkgAyQAEM8FAAsJAAsQyQUMAQsgA0EIahCUAgsgA0EQaiQACyQBAX8jACEDBkAgASABIAJBAnRqIAAQuAIaGSADJAAQzwUACwsLACAAQbjeAhCLAwsQACAAEMECIAEQwQJzQQFzCw0AIAAoAgAQmwIaIAALMQEBfyAAKAIMIgEgACgCEEYEQCAAIAAoAgAoAigRAQAPCyAAIAFBBGo2AgwgASgCAAtUAQJ/AkAgACgCACICRQ0AAn8gAigCGCIDIAIoAhxGBEAgAiABIAIoAgAoAjQRAwAMAQsgAiADQQRqNgIYIAMgATYCACABC0F/Rw0AIABBADYCAAsLBwAgACgCDAt2AQF/IwBBEGsiAiQAIAAtAAtBB3YEQCAAIAAoAgAgACgCCEH/////B3EQuwILIAAgASgCCDYCCCAAIAEpAgA3AgAgASABLQALQYABcToACyABIAEtAAtB/wBxOgALIAJBADoADyABIAItAA86AAAgAkEQaiQAC4YCAQN/IwBBEGsiBCQAIAIgAWsiBUHv////B00EQAJAIAVBC0kEQCAAIAAtAAtBgAFxIAVyOgALIAAgAC0AC0H/AHE6AAsgACEDDAELIARBCGogACAFQQtPBH8gBUEQakFwcSIDIANBAWsiAyADQQtGGwVBCgtBAWoQvQIgBCgCDBogACAEKAIIIgM2AgAgACAAKAIIQYCAgIB4cSAEKAIMQf////8HcXI2AgggACAAKAIIQYCAgIB4cjYCCCAAIAU2AgQLA0AgASACRwRAIAMgAS0AADoAACADQQFqIQMgAUEBaiEBDAELCyAEQQA6AAcgAyAELQAHOgAAIARBEGokAA8LEC4AC4QCAQR/AkAgAQJ/IAAtAAtBB3YEQCAAKAIEDAELIAAtAAtB/wBxCyICSwRAIwBBEGsiBCQAIAEgAmsiAgRAIAAtAAtBB3YEfyAAKAIIQf////8HcUEBawVBCgshAwJ/IAAtAAtBB3YEQCAAKAIEDAELIAAtAAtB/wBxCyIBIAJqIQUgAiADIAFrSwRAIAAgAyAFIANrIAEgARCpBQsgAQJ/IAAtAAtBB3YEQCAAKAIADAELIAALIgNqIAJBABCqBSAAIAUQigQgBEEAOgAPIAMgBWogBC0ADzoAAAsgBEEQaiQADAELIAACfyAALQALQQd2BEAgACgCAAwBCyAACyABEI4FCwvdBgEFfwJAAkAgACgCQA0AAn9BmwwhAwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgAkF9cSIEQQFrDh0BDAwMBwwMAgUMDAgLDAwNAQwMBgcMDAMFDAwJCwALAkAgBEEwaw4FDQwMDAYACyAEQThrDgUDCwsLCQsLQdgoDAwLQcEYDAsLQbk4DAoLQa84DAkLQbw4DAgLQbUnDAcLQcgnDAYLQbgnDAULQdInDAQLQc4nDAMLQdYnDAILQQAhAwsgAwsiBEUNACABIQVBACEDIwBBEGsiBiQAAkACQEHaJyAEIgEsAAAQ4AFFBEBB7NYCQRw2AgAMAQtBAiEEIAFBKxDgAUUEQCABLQAAQfIARyEECyAEQYABciAEIAFB+AAQ4AEbIgRBgIAgciAEIAFB5QAQ4AEbIgQgBEHAAHIgAS0AACIEQfIARhsiB0GABHIgByAEQfcARhsiB0GACHIgByAEQeEARhshBCAGQrYDNwMAQZx/IAUgBEGAgAJyIAYQHyIEQYFgTwRAQezWAkEAIARrNgIAQX8hBAsgBEEASA0BIwBBIGsiBSQAAn8CQAJAQdonIAEsAAAQ4AFFBEBB7NYCQRw2AgAMAQtBmAkQ1gEiAw0BC0EADAELIANBAEGQARDQARogAUErEOABRQRAIANBCEEEIAEtAABB8gBGGzYCAAsCQCABLQAAQeEARwRAIAMoAgAhAQwBCyAEQQNBABAgIgFBgAhxRQRAIAUgAUGACHKsNwMQIARBBCAFQRBqECAaCyADIAMoAgBBgAFyIgE2AgALIANBfzYCUCADQYAINgIwIAMgBDYCPCADIANBmAFqNgIsAkAgAUEIcQ0AIAUgBUEYaq03AwAgBEGTqAEgBRAhDQAgA0EKNgJQCyADQYkBNgIoIANBigE2AiQgA0GLATYCICADQYwBNgIMQeHaAi0AAEUEQCADQX82AkwLIANBnNsCKAIANgI4QZzbAigCACIBBEAgASADNgI0C0Gc2wIgAzYCACADCyEDIAVBIGokACADDQEgBBAkGgtBACEDCyAGQRBqJAAgACADIgE2AkAgA0UNACAAIAI2AlggAkECcUUNASABQgBBAhDpAUUNASAAKAJAEOsBGiAAQQA2AkALQQAPCyAAC4oDAQR/IwBBEGsiAiQAIABBmIQBNgIAIABBBGoQswQgAEIANwIYIABCADcCECAAQgA3AgggAEEANgIoIABCADcCICAAQbiFATYCACAAQTRqQQBBLxDQARogAiAAKAIEIgE2AgwgASABKAIEQQFqNgIEIwAhAQZAIAIoAgxByN4CEKsEELIEIQMZIAEkABDPBQALIAIoAgwiASABKAIEQQFrIgQ2AgQgBEF/RgRAIAEgASgCACgCCBECAAsGQCADBEAgAkEIaiIDIAAoAgQiATYCACABIAEoAgRBAWo2AgQGQCADEKMCIQEZIAIkACACKAIIIgEgASgCBEEBayIDNgIEIANBf0YEQCABIAEoAgAoAggRAgALCQALIAAgATYCRCACKAIIIgEgASgCBEEBayIDNgIEIANBf0YEQCABIAEoAgAoAggRAgALIAAgACgC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QR91IgJzIAJrIgKtQgAgAmciAkHRAGoQzQIgAykDCEKAgICAgIDAAIVBnoABIAJrrUIwhnwgAUGAgICAeHGtQiCGhCEEIAMpAwALNwMAIAAgBDcDCCADQRBqJAALUAEBfgJAIANBwABxBEAgAiADQUBqrYghAUIAIQIMAQsgA0UNACACQcAAIANrrYYgASADrSIEiIQhASACIASIIQILIAAgATcDACAAIAI3AwgLyQoCBX8PfiMAQeAAayIFJAAgBEL///////8/gyEMIAIgBIVCgICAgICAgICAf4MhCiACQv///////z+DIg1CIIghDiAEQjCIp0H//wFxIQcCQAJAIAJCMIinQf//AXEiCUH//wFrQYKAfk8EQCAHQf//AWtBgYB+Sw0BCyABUCACQv///////////wCDIgtCgICAgICAwP//AFQgC0KAgICAgIDA//8AURtFBEAgAkKAgICAgIAghCEKDAILIANQIARC////////////AIMiAkKAgICAgIDA//8AVCACQoCAgICAgMD//wBRG0UEQCAEQoCAgICAgCCEIQogAyEBDAILIAEgC0KAgICAgIDA//8AhYRQBEAgAiADhFAEQEKAgICAgIDg//8AIQpCACEBDAMLIApCgICAgICAwP//AIQhCkIAIQEMAgsgAyACQoCAgICAgMD//wCFhFAEQCABIAuEIQJCACEBIAJQBEBCgICAgICA4P//ACEKDAMLIApCgICAgICAwP//AIQhCgwCCyABIAuEUARAQgAhAQwCCyACIAOEUARAQgAhAQwCCyALQv///////z9YBEAgBUHQAGogASANIAEgDSANUCIGG3kgBkEGdK18pyIGQQ9rEM0CQRAgBmshBiAFKQNYIg1CIIghDiAFKQNQIQELIAJC////////P1YNACAFQUBrIAMgDCADIAwgDFAiCBt5IAhBBnStfKciCEEPaxDNAiAGIAhrQRBqIQYgBSkDSCEMIAUpA0AhAwsgA0IPhiILQoCA/v8PgyICIAFCIIgiBH4iECALQiCIIhMgAUL/////D4MiAX58Ig9CIIYiESABIAJ+fCILIBFUrSACIA1C/////w+DIg1+IhUgBCATfnwiESAMQg+GIhIgA0IxiIRC/////w+DIgMgAX58IhQgDyAQVK1CIIYgD0IgiIR8Ig8gAiAOQoCABIQiDH4iFiANIBN+fCIOIBJCIIhCgICAgAiEIgIgAX58IhAgAyAEfnwiEkIghnwiF3whASAHIAlqIAZqQf//AGshBgJAIAIgBH4iGCAMIBN+fCIEIBhUrSAEIAQgAyANfnwiBFatfCACIAx+fCAEIAQgESAVVK0gESAUVq18fCIEVq18IAMgDH4iAyACIA1+fCICIANUrUIghiACQiCIhHwgBCACQiCGfCICIARUrXwgAiACIBAgElatIA4gFlStIA4gEFatfHxCIIYgEkIgiIR8IgJWrXwgAiACIA8gFFStIA8gF1atfHwiAlatfCIEQoCAgICAgMAAg0IAUgRAIAZBAWohBgwBCyALQj+IIQMgBEIBhiACQj+IhCEEIAJCAYYgAUI/iIQhAiALQgGGIQsgAyABQgGGhCEBCyAGQf//AU4EQCAKQoCAgICAgMD//wCEIQpCACEBDAELAn4gBkEATARAQQEgBmsiB0H/AE0EQCAFQTBqIAsgASAGQf8AaiIGEM0CIAVBIGogAiAEIAYQzQIgBUEQaiALIAEgBxDPAiAFIAIgBCAHEM8CIAUpAzAgBSkDOIRCAFKtIAUpAyAgBSkDEISEIQsgBSkDKCAFKQMYhCEBIAUpAwAhAiAFKQMIDAILQgAhAQwCCyAEQv///////z+DIAatQjCGhAsgCoQhCiALUCABQgBZIAFCgICAgICAgICAf1EbRQRAIAogAkIBfCIBUK18IQoMAQsgCyABQoCAgICAgICAgH+FhEIAUgRAIAIhAQwBCyAKIAIgAkIBg3wiASACVK18IQoLIAAgATcDACAAIAo3AwggBUHgAGokAAvMCQIEfwV+IwBB8ABrIgYkACAEQv///////////wCDIQkCQAJAIAFQIgUgAkL///////////8AgyIKQoCAgICAgMD//wB9QoCAgICAgMCAgH9UIApQG0UEQCADQgBSIAlCgICAgICAwP//AH0iC0KAgICAgIDAgIB/ViALQoCAgICAgMCAgH9RGw0BCyAFIApCgICAgICAwP//AFQgCkKAgICAgIDA//8AURtFBEAgAkKAgICAgIAghCEEIAEhAwwCCyADUCAJQoCAgICAgMD//wBUIAlCgICAgICAwP//AFEbRQRAIARCgICAgICAIIQhBAwCCyABIApCgICAgICAwP//AIWEUARAQoCAgICAgOD//wAgAiABIAOFIAIgBIVCgICAgICAgICAf4WEUCIFGyEEQgAgASAFGyEDDAILIAMgCUKAgICAgIDA//8AhYRQDQEgASAKhFAEQCADIAmEQgBSDQIgASADgyEDIAIgBIMhBAwCCyADIAmEQgBSDQAgASEDIAIhBAwBCyADIAEgASADVCAJIApWIAkgClEbIggbIQogBCACIAgbIgtC////////P4MhCSACIAQgCBsiAkIwiKdB//8BcSEHIAtCMIinQf//AXEiBUUEQCAGQeAAaiAKIAkgCiAJIAlQIgUbeSAFQQZ0rXynIgVBD2sQzQIgBikDaCEJIAYpA2AhCkEQIAVrIQULIAEgAyAIGyEDIAJC////////P4MhBCAHRQRAIAZB0ABqIAMgBCADIAQgBFAiBxt5IAdBBnStfKciB0EPaxDNAkEQIAdrIQcgBikDWCEEIAYpA1AhAwsgBEIDhiADQj2IhEKAgICAgICABIQhASAJQgOGIApCPYiEIQQgAiALhSENAn4gA0IDhiICIAUgB0YNABogBSAHayIHQf8ASwRAQgAhAUIBDAELIAZBQGsgAiABQYABIAdrEM0CIAZBMGogAiABIAcQzwIgBikDOCEBIAYpAzAgBikDQCAGKQNIhEIAUq2ECyEJIARCgICAgICAgASEIQwgCkIDhiEKAkAgDUIAUwRAQgAhA0IAIQQgCSAKhSABIAyFhFANAiAKIAl9IQIgDCABfSAJIApWrX0iBEL/////////A1YNASAGQSBqIAIgBCACIAQgBFAiBxt5IAdBBnStfKdBDGsiBxDNAiAFIAdrIQUgBikDKCEEIAYpAyAhAgwBCyAJIAp8IgIgCVStIAEgDHx8IgRCgICAgICAgAiDUA0AIAlCAYMgBEI/hiACQgGIhIQhAiAFQQFqIQUgBEIBiCEECyALQoCAgICAgICAgH+DIQEgBUH//wFOBEAgAUKAgICAgIDA//8AhCEEQgAhAwwBC0EAIQcCQCAFQQBKBEAgBSEHDAELIAZBEGogAiAEIAVB/wBqEM0CIAYgAiAEQQEgBWsQzwIgBikDACAGKQMQIAYpAxiEQgBSrYQhAiAGKQMIIQQLIAKnQQdxIgVBBEutIARCPYYgAkIDiIQiAnwiAyACVK0gBEIDiEL///////8/gyAHrUIwhoQgAYR8IQQCQCAFQQRGBEAgBCADQgGDIgEgA3wiAyABVK18IQQMAQsgBUUNAQsLIAAgAzcDACAAIAQ3AwggBkHwAGokAAv6AQIDfgJ/IwBBEGsiBSQAAn4gAb0iA0L///////////8AgyICQoCAgICAgIAIfUL/////////7/8AWARAIAJCPIYhBCACQgSIQoCAgICAgICAPHwMAQsgAkKAgICAgICA+P8AWgRAIANCPIYhBCADQgSIQoCAgICAgMD//wCEDAELIAJQBEBCAAwBCyAFIAJCACADp2dBIGogAkIgiKdnIAJCgICAgBBUGyIGQTFqEM0CIAUpAwAhBCAFKQMIQoCAgICAgMAAhUGM+AAgBmutQjCGhAshAiAAIAQ3AwAgACACIANCgICAgICAgICAf4OENwMIIAVBEGokAAvbAQIBfwJ+QQEhBAJAIABCAFIgAUL///////////8AgyIFQoCAgICAgMD//wBWIAVCgICAgICAwP//AFEbDQAgAkIAUiADQv///////////wCDIgZCgICAgICAwP//AFYgBkKAgICAgIDA//8AURsNACAAIAKEIAUgBoSEUARAQQAPCyABIAODQgBZBEBBfyEEIAAgAlQgASADUyABIANRGw0BIAAgAoUgASADhYRCAFIPC0F/IQQgACACViABIANVIAEgA1EbDQAgACAChSABIAOFhEIAUiEECyAEC8ABAgF/An5BfyEDAkAgAEIAUiABQv///////////wCDIgRCgICAgICAwP//AFYgBEKAgICAgIDA//8AURsNACACQv///////////wCDIgVCgICAgICAwP//AFYgBUKAgICAgIDA//8AUnENACAAIAQgBYSEUARAQQAPCyABIAKDQgBZBEAgASACUiABIAJTcQ0BIAAgASAChYRCAFIPCyAAQgBSIAEgAlUgASACURsNACAAIAEgAoWEQgBSIQMLIAMLqQEBAXxEAAAAAAAA8D8hAQJAIABBgAhOBEBEAAAAAAAA4H8hASAAQf8PSQRAIABB/wdrIQAMAgtEAAAAAAAA8H8hAUH9FyAAIABB/RdOG0H+D2shAAwBCyAAQYF4Sg0ARAAAAAAAAGADIQEgAEG4cEsEQCAAQckHaiEADAELRAAAAAAAAAAAIQFB8GggACAAQfBoTBtBkg9qIQALIAEgAEH/B2qtQjSGv6ILNQAgACABNwMAIAAgAkL///////8/gyAEQjCIp0GAgAJxIAJCMIinQf//AXFyrUIwhoQ3AwgLZAIBfwF+IwBBEGsiAiQAIAACfiABRQRAQgAMAQsgAiABrUIAIAFnIgFB0QBqEM0CIAIpAwhCgICAgICAwACFQZ6AASABa61CMIZ8IQMgAikDAAs3AwAgACADNwMIIAJBEGokAAtFAQF/IwBBEGsiBSQAIAUgASACIAMgBEKAgICAgICAgIB/hRDRAiAFKQMAIQEgACAFKQMINwMIIAAgATcDACAFQRBqJAALxAIBAX8jAEHQAGsiBCQAAkAgA0GAgAFOBEAgBEEgaiABIAJCAEKAgICAgICA//8AENACIAQpAyghAiAEKQMgIQEgA0H//wFJBEAgA0H//wBrIQMMAgsgBEEQaiABIAJCAEKAgICAgICA//8AENACQf3/AiADIANB/f8CThtB/v8BayEDIAQpAxghAiAEKQMQIQEMAQsgA0GBgH9KDQAgBEFAayABIAJCAEKAgICAgICAORDQAiAEKQNIIQIgBCkDQCEBIANB9IB+SwRAIANBjf8AaiEDDAELIARBMGogASACQgBCgICAgICAgDkQ0AJB6IF9IAMgA0HogX1MG0Ga/gFqIQMgBCkDOCECIAQpAzAhAQsgBCABIAJCACADQf//AGqtQjCGENACIAAgBCkDCDcDCCAAIAQpAwA3AwAgBEHQAGokAAt1AQF+IAAgASAEfiACIAN+fCADQiCIIgIgAUIgiCIEfnwgA0L/////D4MiAyABQv////8PgyIBfiIFQiCIIAMgBH58IgNCIIh8IAEgAn4gA0L/////D4N8IgFCIIh8NwMIIAAgBUL/////D4MgAUIghoQ3AwALvg8CBX8PfiMAQdACayIFJAAgBEL///////8/gyELIAJC////////P4MhCiACIASFQoCAgICAgICAgH+DIQ0gBEIwiKdB//8BcSEIAkACQCACQjCIp0H//wFxIglB//8Ba0GCgH5PBEAgCEH//wFrQYGAfksNAQsgAVAgAkL///////////8AgyIMQoCAgICAgMD//wBUIAxCgICAgICAwP//AFEbRQRAIAJCgICAgICAIIQhDQwCCyADUCAEQv///////////wCDIgJCgICAgICAwP//AFQgAkKAgICAgIDA//8AURtFBEAg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ByECIAVC////////v7/AAFYNAEEAIQIgBUIwiKciBEGR/gBJDQAgA0EQaiAAIAFC////////P4NCgICAgICAwACEIgUgBEGB/gBrEM0CIAMgACAFQYH/ACAEaxDPAiADKQMIIgBCGYinIQIgAykDACADKQMQIAMpAxiEQgBSrYQiBVAgAEL///8PgyIAQoCAgAhUIABCgICACFEbRQRAIAJBAWohAgwBCyAFIABCgICACIWEQgBSDQAgAkEBcSACaiECCyADQSBqJAAgAiABQiCIp0GAgICAeHFyvgvTAwICfgJ/IwBBIGsiBCQAAkAgAUL///////////8AgyIDQoCAgICAgMCAPH0gA0KAgICAgIDA/8MAfVQEQCABQgSGIABCPIiEIQMgAEL//////////w+DIgBCgYCAgICAgIAIWgRAIANCgYCAgICAgIDAAHwhAgwCCyADQoCAgICAgICAQH0hAiAAQoCAgICAgICACFINASACIANCAYN8IQIMAQsgAFAgA0KAgICAgIDA//8AVCADQoCAgICAgMD//wBRG0UEQCABQgSGIABCPIiEQv////////8Dg0KAgICAgICA/P8AhCECDAELQoCAgICAgID4/wAhAiADQv///////7//wwBWDQBCACECIANCMIinIgVBkfcASQ0AIARBEGogACABQv///////z+DQoCAgICAgMAAhCICIAVBgfcAaxDNAiAEIAAgAkGB+AAgBWsQzwIgBCkDCEIEhiAEKQMAIgBCPIiEIQIgBCkDECAEKQMYhEIAUq0gAEL//////////w+DhCIAQoGAgICAgICACFoEQCACQgF8IQIMAQsgAEKAgICAgICAgAhSDQAgAkIBgyACfCECCyAEQSBqJAAgAiABQoCAgICAgICAgH+DhL8LxQIBBH8gA0Gs3AIgAxsiBSgCACEDAkACfwJAIAFFBEAgAw0BQQAPC0F+IAJFDQEaAkAgAwRAIAIhBAwBCyABLQAAIgPAIgRBAE4EQCAABEAgACADNgIACyAEQQBHDwtBiNwCKAIAKAIARQRAQQEgAEUNAxogACABLAAAQf+/A3E2AgBBAQ8LIAEtAABBwgFrIgNBMksNASADQQJ0QYCPAWooAgAhAyACQQFrIgRFDQMgAUEBaiEBCyABLQAAIgZBA3YiB0EQayADQRp1IAdqckEH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IAIoAgAiAUEEajYCACAAIAEyAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEzAQA3AwAPCyACIAIoAgAiAUEEajYCACAAIAEwAAA3AwAPCyACIAIoAgAiAUEEajYCACAAIAExAAA3AwAPCyACIAIoAgBBB2pBeHEiAUEIajYCACAAIAErAwA5AwAPCyAAIAIQ9QILDwsgAiACKAIAIgFBBGo2AgAgACABNAIANwMADwsgAiACKAIAIgFBBGo2AgAgACABNQIANwMADwsgAiACKAIAQQdqQXhxIgFBCGo2AgAgACABKQMANwMAC4MBAgN/AX4CQCAAQoCAgIAQVARAIAAhBQwBCwNAIAFBAWsiASAAIABCCoAiBUIKfn2nQTByOgAAIABC/////58BViECIAUhACACDQALCyAFpyICBEADQCABQQFrIgEgAiACQQpuIgNBCmxrQTByOgAAIAJBCUshBCADIQIgBA0ACwsgAQtyAQF/IwBBgAJrIgUkAAJAIAIgA0wNACAEQYDABHENACAFIAFB/wFxIAIgA2siA0GAAiADQYACSSIBGxDQARogAUUEQANAIAAgBUGAAhDuAiADQYACayIDQf8BSw0ACwsgACAFIAMQ7gILIAVBgAJqJAALzgIBBH8jAEHQAWsiAyQAIAMgAjYCzAEgA0GgAWoiAkEAQSgQ0AEaIAMgAygCzAE2AsgBAkBBACABIANByAFqIANB0ABqIAIQ7QJBAEgEQEF/IQAMAQsgACgCTEEATiEGIAAoAgAhBSAAKAJIQQBMBEAgACAFQV9xNgIACwJAAkACQCAAKAIwRQRAIABB0AA2AjAgAEEANgIcIABCADcDECAAKAIsIQQgACADNgIsDAELIAAoAhANAQtBfyECIAAQ7gENAQsgACABIANByAFqIANB0ABqIANBoAFqEO0CIQILIAQEQCAAQQBBACAAKAIkEQQAGiAAQQA2AjAgACAENgIsIABBADYCHCAAKAIUIQEgAEIANwMQIAJBfyABGyECCyAAIAAoAgAiACAFQSBxcjYCAEF/IAIgAEEgcRshACAGRQ0ACyADQdABaiQAIAALtRgDEn8BfAJ+IwBBsARrIgwkACAMQQA2AiwCQCABvSIZQgBTBEBBASEQQdsLIRMgAZoiAb0hGQwBCyAEQYAQcQRAQQEhEEHeCyETDAELQeEL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DQAgACADQQRqNgIMIAMgACgCCDYCAAsgBSACIAAoArABIAQQoQM5AwAgAEHAAWogAEEQaiAAKAIMIAQQkwMgAEH8AWogAEH4AWoQiQIhAhkgACQAIAEQqAUaIABBwAFqEKgFGgkACyACBEAgBCAEKAIAQQJyNgIACyAAKAL8ASECIAEQqAUaIABBwAFqEKgFGiAAQYACaiQAIAILuwECBH8CfCMAQRBrIgMkAAJAAkACQCAAIAFHBEBB7NYCKAIAIQVB7NYCQQA2AgAgA0EMaiEGEKUDGiMAQRBrIgQkACAEIAAgBkEBEP8CIAQpAwAgBCkDCBDgAiEHIARBEGokAEHs1gIoAgAiAEUNASADKAIMIAFHDQIgByEIIABBxABHDQMMAgsgAkEENgIADAILQezWAiAFNgIAIAMoAgwgAUYNAQsgAkEENgIAIAghBwsgA0EQaiQAIAcL9wUCAX8BfiMAQZACayIAJAAgACACNgKIAiAAIAE2AowCIABB0AFqIAMgAEHgAWogAEHfAWogAEHeAWoQnQMGQCMAQRBrIgIkACAAQcQBaiIBQgA3AgAgAUEANgIIIAJBEGokACABIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQoAIgAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgI2AsABIAAgAEEgajYCHCAAQQA2AhggAEEBOgAXIABBxQA6ABYDQAJAIABBjAJqIABBiAJqEIkCDQAgACgCwAECfyABLQALQQd2BEAgASgCBAwBCyABLQALQf8AcQsgAmpGBEACfyABLQALQQd2BEAgASgCBAwBCyABLQALQf8AcQshAyABAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0AC0H/AHELQQF0EKACIAEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxCgAiAAIAMCfyABLQALQQd2BEAgASgCAAwBCyABCyICajYCwAELAn8gACgCjAIiAygCDCIGIAMoAhBGBEAgAyADKAIAKAIkEQEADAELIAYtAAALwCAAQRdqIABBFmogAiAAQcABaiAALADfASAALADeASAAQdABaiAAQSBqIABBHGogAEEYaiAAQeABahCeAw0AIABBjAJqEIoCGgwBCwsCQAJ/IAAtANsBQQd2BEAgACgC1AEMAQsgAC0A2wFB/wBx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NgLMAiADEI8DIQYgAyAAQdABahCtAyEHIABBxAFqIAMgAEHEAmoQrgMGQCMAQRBrIgIkACAAQbgBaiIBQgA3AgAgAUEANgIIIAJBEGokACABIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQoAIgAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgI2ArQBIAAgAEEQajYCDCAAQQA2AggDQAJAIABBzAJqIABByAJqEJkCDQAgACgCtAECfyABLQALQQd2BEAgASgCBAwBCyABLQALQf8AcQsgAmpGBEACfyABLQALQQd2BEAgASgCBAwBCyABLQALQf8AcQshAyABAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0AC0H/AHELQQF0EKACIAEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxCgAiAAIAMCfyABLQALQQd2BEAgASgCAAwBCyABCyICajYCtAELAn8gACgCzAIiAygCDCIIIAMoAhBGBEAgAyADKAIAKAIkEQEADAELIAgoAgALIAYgAiAAQbQBaiAAQQhqIAAoAsQCIABBxAFqIABBEGogAEEMaiAHEK8DDQAgAEHMAmoQmgIaDAELCwJAAn8gAC0AzwFBB3YEQCAAKALIAQwBCyAALQDPAUH/AHELRQ0AIAAoAgwiAyAAQRBqa0GfAUoNACAAIANBBGo2AgwgAyAAKAIINgIACyAFIAIgACgCtAEgBCAGEJcDOwEAIABBxAFqIABBEGogACgCDCAEEJMDIABBzAJqIABByAJqEJkCIQIZIAAkACABEKgFGiAAQcQBahCoBRoJAAsgAgRAIAQgBCgCAEECcjYCAAsgACgCzAIhAiABEKgFGiAAQcQBahCoBRogAEHQAmokACACC8AFAQN/IwBB0AJrIgAkACAAIAI2AsgCIAAgATYCzAIgAxCPAyEGIAMgAEHQAWoQrQMhByAAQcQBaiADIABBxAJqEK4DBkAjAEEQayICJAAgAEG4AWoiAUIANwIAIAFBADYCCCACQRBqJAAgASABLQALQQd2BH8gASgCCEH/////B3FBAWsFQQoLEKACIAACfyABLQALQQd2BEAgASgCAAwBCyABCyICNgK0ASAAIABBEGo2AgwgAEEANgIIA0ACQCAAQcwCaiAAQcgCahCZAg0AIAAoArQBAn8gAS0A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AgggAUEQaiQAIAIgAi0AC0EHdgR/IAIoAghB/////wdxQQFrBUEKCxCgAiAAAn8gAi0AC0EHdgRAIAIoAgAMAQsgAgsiATYCtAEgACAAQRBqNgIMIABBADYCCANAAkAgAEG8AmogAEG4AmoQmQINACAAKAK0AQJ/IAItAAtBB3YEQCACKAIEDAELIAItAAtB/wBxCyABakYEQAJ/IAItAAtBB3YEQCACKAIEDAELIAItAAtB/wBxCyEDIAICfyACLQALQQd2BEAgAigCBAwBCyACLQALQf8AcQtBAXQQoAIgAiACLQALQQd2BH8gAigCCEH/////B3FBAWsFQQoLEKACIAAgAwJ/IAItAAtBB3YEQCACKAIADAELIAILIgFqNgK0AQsCfyAAKAK8AiIDKAIMIgcgAygCEEYEQCADIAMoAgAoAiQRAQAMAQsgBygCAAtBECABIABBtAFqIABBCGpBACAGIABBEGogAEEMaiAAQdABahCvAw0AIABBvAJqEJoCGgwBCwsgAiAAKAK0ASABaxCgAgJ/IAItAAtBB3YEQCACKAIADAELIAILIQEQpQMhAyAAIAU2AgAgASADIAAQpgNBAUcEQCAEQQQ2AgALIABBvAJqIABBuAJqEJkCIQEZIAAkACACEKgFGgkACxkgACQAIAYQqAUaCQALIAEEQCAEIAQoAgBBAnI2AgALIAAoArwCIQEgAhCoBRogBhCoBRogAEHAAmokACABCzEAIAIoAgAhAgNAAkAgACABRwR/IAAoAgAgAkcNASAABSABCw8LIABBBGohAAwACwAL5AIBAX8jAEEgayIFJAAgBSABNgIcAkAgAigCBEEBcUUEQCAAIAEgAiADIAQgACgCACgCGBEJACECDAELIAVBEGoiASACKAIcIgA2AgAgACAAKAIEQQFqNgIEBkAgARCJAyEAGSAFJAAgBSgCECIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAFKAIQIgEgASgCBEEBayICNgIEIAJBf0YEQCABIAEoAgAoAggRAgALAkAgBARAIAVBEGogACAAKAIAKAIYEQAADAELIAVBEGogACAAKAIAKAIcEQAACyAFIAVBEGoQvAM2AgwDQCAFIAVBEGoQvQM2AgggBSgCDCAFKAIIRgRAIAUoAhwhAiAFQRBqEKgFGgwCCwZAIAVBHGogBSgCDCwAABCVAhkgBSQAIAVBEGoQqAUaCQALIAUgBSgCDEEBajYCDAwACwALIAVBIGokACACCzkBAX8jAEEQayIBJAAgAQJ/IAAtAAtBB3YEQCAAKAIADAELIAALNgIMIAEoAgwhACABQRBqJAAgAAtYAQF/IwBBEGsiASQAIAECfyAALQALQQd2BEAgACgCAAwBCyAACwJ/IAAtAAtBB3YEQCAAKAIEDAELIAAtAAtB/wBxC2o2AgwgASgCDCEAIAFBEGokACAAC44CAQR/IwBBQGoiACQAIABCJTcDOCAAQThqIgVBAXJB2R1BASACKAIEEL8DEKUDIQYgACAENgIAIABBK2oiBCAEQQ0gBiAFIAAQwAMgBGoiBiACEMEDIQcgAEEEaiIIIAIoAhwiBTYCACAFIAUoAgRBAWo2AgQGQCAEIAcgBiAAQRBqIABBDGogAEEIaiAIEMIDGSAAJAAgACgCBCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAAKAIEIgQgBCgCBEEBayIFNgIEIAVBf0YEQCAEIAQoAgAoAggRAgALIAEgAEEQaiAAKAIMIAAoAgggAiADEMMDIQEgAEFAayQAIAELrAEBAX8CQCADQYAQcUUNACADQcoAcSIEQQhGDQAgBEHAAEYNACACRQ0AIABBKzoAACAAQQFqIQALIANBgARxBEAgAEEjOgAAIABBAWohAAsDQCABLQAAIgQEQCAAIAQ6AAAgAEEBaiEAIAFBAWohAQwBCwsgAAJ/Qe8AIANBygBxIgFBwABGDQAaQdgAQfgAIANBgIABcRsgAUEIRg0AGkHkAEH1ACACGws6AAALbQEBfyMAQRBrIgUkACAFIAI2AgwgBSAENgIIIAVBBGogBUEMahCoAyECIAAgASADIAUoAggQ9gIhASACKAIAIgAEQEGI3AIoAgAaIAAEQEGI3AJBgNsCIAAgAEF/Rhs2AgALCyAFQRBqJAAgAQtkACACKAIEQbABcSICQSBGBEAgAQ8LAkAgAkEQRw0AAkACQCAALQAAIgJBK2sOAwABAAELIABBAWoPCyABIABrQQJIDQAgAkEwRw0AIAAtAAFBIHJB+ABHDQAgAEECaiEACyAAC4kFAQh/IwBBEGsiCSQAIAYQhwIhCiAJQQRqIgcgBhCJAyIIIAgoAgAoAhQRAAAGQAJAAn8gBy0AC0EHdgRAIAcoAgQMAQsgBy0AC0H/AHELRQRAIAogACACIAMgCigCACgCIBEGABogBSADIAIgAGtqIgY2AgAMAQsgBSADNgIAAkACQCAAIgstAAAiBkEraw4DAAEAAQsgCiAGwCAKKAIAKAIcEQMAIQcgBSAFKAIAIgZBAWo2AgAgBiAHOgAAIABBAWohCwsCQCACIAtrQQJIDQAgCy0AAEEwRw0AIAstAAFBIHJB+ABHDQAgCkEwIAooAgAoAhwRAwAhByAFIAUoAgAiBkEBajYCACAGIAc6AAAgCiALLAABIAooAgAoAhwRAwAhByAFIAUoAgAiBkEBajYCACAGIAc6AAAgC0ECaiELCyALIAIQ3wMgCCAIKAIAKAIQEQEAIQ1BACEHIAshBgNAIAIgBk0EQCADIAsgAGtqIAUoAgAQ3wMgBSgCACEGDAILAkACfyAJQQRqIggtAAtBB3YEQCAIKAIADAELIAgLIAdqLQAARQ0AIAwCfyAJQQRqIggtAAtBB3YEQCAIKAIADAELIAgLIAdqLAAARw0AIAUgBSgCACIIQQFqNgIAIAggDToAACAHIAcCfyAJLQAPQQd2BEAgCSgCCAwBCyAJLQAPQf8AcQtBAWtJaiEHQQAhDAsgCiAGLAAAIAooAgAoAhwRAwAhDiAFIAUoAgAiCEEBajYCACAIIA46AAAgBkEBaiEGIAxBAWohDAwACwALGSAJJAAgCUEEahCoBRoJAAsgBCAGIAMgASAAa2ogASACRhs2AgAgCUEEahCoBRogCUEQaiQAC+0BAQR/IwBBEGsiByQAAkAgAEUNACAEKAIMIQYgAiABayIIQQBKBEAgACABIAggACgCACgCMBEEACAIRw0BCyAGIAMgAWsiAWtBACABIAZIGyIGQQBKBEAGQAZAIAdBBGogBiAFEM8DIQEYAyAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsgBiAAKAIAKAIwEQQAIQUZIAckACABEKgFGgkACyABEKgFGiAFIAZHDQELIAMgAmsiAUEASgRAIAAgAiABIAAoAgAoAjARBAAgAUcNAQsgBCgCDBogBEEANgIMIAAhCQsgB0EQaiQAIAkLkgIBBX8jAEHwAGsiACQAIABCJTcDaCAAQegAaiIGQQFyQbAcQQEgAigCBBC/AxClAyEHIAAgBDcDACAAQdAAaiIFIAVBGCAHIAYgABDAAyAFaiIHIAIQwQMhCCAAQRRqIgkgAigCHCIGNgIAIAYgBigCBEEBajYCBAZAIAUgCCAHIABBIGogAEEcaiAAQRhqIAkQwgMZIAAkACAAKAIUIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAAoAhQiBSAFKAIEQQFrIgY2AgQgBkF/RgRAIAUgBSgCACgCCBECAAsgASAAQSBqIAAoAhwgACgCGCACIAMQwwMhASAAQfAAaiQAIAELjgIBBH8jAEFAaiIAJAAgAEIlNwM4IABBOGoiBUEBckHZHUEAIAIoAgQQvwMQpQMhBiAAIAQ2AgAgAEEraiIEIARBDSAGIAUgABDAAyAEaiIGIAIQwQMhByAAQQRqIgggAigCHCIFNgIAIAUgBSgCBEEBajYCBAZAIAQgByAGIABBEGogAEEMaiAAQQhqIAgQwgMZIAAkACAAKAIEIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAAoAgQiBCAEKAIEQQFrIgU2AgQgBUF/RgRAIAQgBCgCACgCCBECAAsgASAAQRBqIAAoAgwgACgCCCACIAMQwwMhASAAQUBrJAAgAQuSAgEFfyMAQfAAayIAJAAgAEIlNwNoIABB6ABqIgZBAXJBsBxBACACKAIEEL8DEKUDIQcgACAENwMAIABB0ABqIgUgBUEYIAcgBiAAEMADIAVqIgcgAhDBAyEIIABBFGoiCSACKAIcIgY2AgAgBiAGKAIEQQFqNgIEBkAgBSAIIAcgAEEgaiAAQRxqIABBGGogCRDCAxkgACQAIAAoAhQiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgACgCFCIFIAUoAgRBAWsiBjYCBCAGQX9GBEAgBSAFKAIAKAIIEQIACyABIABBIGogACgCHCAAKAIYIAIgAxDDAyEBIABB8ABqJAAgAQsNACABIAIgAyAEEMgDC44FAQl/IwBB0AFrIgQkACAEQiU3A8gBIARByAFqQQFyQdLIACABKAIEEMkDIQYgBCAEQaABajYCnAEQpQMhBQJ/IAYEQCABKAIIIQggBCADOQMoIAQgCDYCICAEQaABakEeIAUgBEHIAWogBEEgahDAAwwBCyAEIAM5AzAgBEGgAWpBHiAFIARByAFqIARBMGoQwAMLIQUgBEHIATYCUCAEQZQBakEAIARB0ABqEKYCIQggBEGgAWoiCSEHAkAGQCAFQR5OBEACfyAGBEAQpQMhBSABKAIIIQcgBCADOQMIIAQgBzYCACAEQZwBaiAFIARByAFqIAQQygMMAQsQpQMhBSAEIAM5AxAgBEGcAWogBSAEQcgBaiAEQRBqEMoDCyIFQX9GBEAQnQUMAwsgCCAEKAKcARCMAyAEKAKcASEHCyAHIAUgB2oiCiABEMEDIQsgBEHIATYCRCAEQcgAakEAIARBxABqEKYCIQcGQAJAIAQoApwBIARBoAFqRgRAIARB0ABqIQUMAQsgBUEBdBDWASIFRQRAEJ0FDAQLIAcgBRCMAyAEKAKcASEJCyAEQTxqIgwgASgCHCIGNgIAIAYgBigCBEEBajYCBAZAIAkgCyAKIAUgBEHEAGogBEFAayAMEMsDGSAEJAAGQCAEKAI8IgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALGAQJAAsGQCAEKAI8IgYgBigCBEEBayIJNgIEIAlBf0YEQCAGIAYoAgAoAggRAgALGAMgACAFIAQoAkQgBCgCQCABIAIQwwMhABkgBCQAIAcQjQMJAAsZIAQkACAIEI0DCQALIAcQjQMgCBCNAyAEQdABaiQAIAAPCwAL0AEBAn8gAkGAEHEEQCAAQSs6AAAgAEEBaiEACyACQYAIcQRAIABBIzoAACAAQQFqIQALIAJBhAJxIgNBhAJHBEAgAEGu1AA7AAAgAEECaiEACyACQYCAAXEhAgNAIAEtAAAiBARAIAAgBDoAACAAQQFqIQAgAUEBaiEBDAELCyAAAn8CQCADQYACRwRAIANBBEcNAUHGAEHmACACGwwCC0HFAEHlACACGwwBC0HBAEHhACACGyADQYQCRg0AGkHHAEHnACACGws6AAAgA0GEAkcL9QEBA38jAEEQayIEJAAgBCABNgIMIAQgAzYCCCAEQQRqIARBDGoQqAMhBgZAIAQoAgghBSMAQRBrIgMkACADIAU2AgwgAyAFNgIIQX8hAQJAQQBBACACIAUQ9gIiBUEASA0AIAAgBUEBaiIFENYBIgA2AgAgAEUNACAAIAUgAiADKAIMEPYCIQELIANBEGokABkgBCQAIAYoAgAiAARAQYjcAigCABogAARAQYjcAkGA2wIgACAAQX9GGzYCAAsLCQALIAYoAgAiAARAQYjcAigCABogAARAQYjcAkGA2wIgACAAQX9GGzYCAAsLIARBEGokACABC44HAQp/IwBBEGsiCSQAIAYQhwIhCCAJQQRqIAYQiQMiDiIGIAYoAgAoAhQRAAAgBSADNgIABkACQAJAIAAiBy0AACIGQStrDgMAAQABCyAIIAbAIAgoAgAoAhwRAwAhBiAFIAUoAgAiB0EBajYCACAHIAY6AAAgAEEBaiEHCwJAAkAgAiAHIgZrQQFMDQAgBy0AAEEwRw0AIActAAFBIHJB+ABHDQAgCEEwIAgoAgAoAhwRAwAhBiAFIAUoAgAiCkEBajYCACAKIAY6AAAgCCAHLAABIAgoAgAoAhwRAwAhBiAFIAUoAgAiCkEBajYCACAKIAY6AAAgB0ECaiIHIQYDQCACIAZNDQIgBiwAACEKEKUDGiAKQTBrQQpJIApBIHJB4QBrQQZJckUNAiAGQQFqIQYMAAsACwNAIAIgBk0NASAGLAAAIQoQpQMaIApBMGtBCk8NASAGQQFqIQYMAAsACwJAAn8gCS0AD0EHdgRAIAkoAggMAQsgCS0AD0H/AHELRQRAIAggByAGIAUoAgAgCCgCACgCIBEGABogBSAFKAIAIAYgB2tqNgIADAELIAcgBhDfAyAOIA4oAgAoAhARAQAhDyAHIQoDQCAGIApNBEAgAyAHIABraiAFKAIAEN8DDAILAkACfyAJQQRqIgwtAAtBB3YEQCAMKAIADAELIAwLIAtqLAAAQQBMDQAgDQJ/IAlBBGoiDC0AC0EHdgRAIAwoAgAMAQsgDAsgC2osAABHDQAgBSAFKAIAIg1BAWo2AgAgDSAPOgAAIAsgCwJ/IAktAA9BB3YEQCAJKAIIDAELIAktAA9B/wBxC0EBa0lqIQtBACENCyAIIAosAAAgCCgCACgCHBEDACEMIAUgBSgCACIQQQFqNgIAIBAgDDoAACAKQQFqIQogDUEBaiENDAALAAsDQAJAIAIgBksEQCAGLQAAIgdBLkcNASAOIA4oAgAoAgwRAQAhByAFIAUoAgAiC0EBajYCACALIAc6AAAgBkEBaiEGCyAIIAYgAiAFKAIAIAgoAgAoAiARBgAaIAUgBSgCACACIAZraiIFNgIAIAQgBSADIAEgAGtqIAEgAkYbNgIAIAlBBGoQqAUaIAlBEGokAA8LIAggB8AgCCgCACgCHBEDACEHIAUgBSgCACILQQFqNgIAIAsgBzoAACAGQQFqIQYMAAsAGSAJJAAgCUEEahCoBRoJAAsACw8AIAEgAiADIAQgBRDNAwuwBQEJfyMAQYACayIFJAAgBUIlNwP4ASAFQfgBakEBckGcKiABKAIEEMkDIQcgBSAFQdABajYCzAEQpQMhBgJ/IAcEQCABKAIIIQkgBUFAayAENwMAIAUgAzcDOCAFIAk2AjAgBUHQAWpBHiAGIAVB+AFqIAVBMGoQwAMMAQsgBSADNwNQIAUgBDcDWCAFQdABakEeIAYgBUH4AWogBUHQAGoQwAMLIQYgBUHIATYCgAEgBUHEAWpBACAFQYABahCmAiEJIAVB0AFqIgohCAJABkAgBkEeTgRAAn8gBwRAEKUDIQYgASgCCCEIIAUgBDcDECAFIAM3AwggBSAINgIAIAVBzAFqIAYgBUH4AWogBRDKAwwBCxClAyEGIAUgAzcDICAFIAQ3AyggBUHMAWogBiAFQfgBaiAFQSBqEMoDCyIGQX9GBEAQnQUMAwsgCSAFKALMARCMAyAFKALMASEICyAIIAYgCGoiCyABEMEDIQwgBUHIATYCdCAFQfgAakEAIAVB9ABqEKYCIQgGQAJAIAUoAswBIAVB0AFqRgRAIAVBgAFqIQYMAQsgBkEBdBDWASIGRQRAEJ0FDAQLIAggBhCMAyAFKALMASEKCyAFQewAaiINIAEoAhwiBzYCACAHIAcoAgRBAWo2AgQGQCAKIAwgCyAGIAVB9ABqIAVB8ABqIA0QywMZIAUkAAZAIAUoAmwiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsYBAkACwZAIAUoAmwiByAHKAIEQQFrIgo2AgQgCkF/RgRAIAcgBygCACgCCBECAAsYAyAAIAYgBSgCdCAFKAJwIAEgAhDDAyEAGSAFJAAgCBCNAwkACxkgBSQAIAkQjQMJAAsgCBCNAyAJEI0DIAVBgAJqJAAgAA8LAAuLAgEFfyMAQeAAayIAJAAQpQMhBSAAIAQ2AgAgAEFAayIEIAQgBEEUIAVB1xkgABDAAyIIaiIFIAIQwQMhByAAQQxqIgYgAigCHCIENgIAIAQgBCgCBEEBajYCBAZAIAYQhwIhBhkgACQAIAAoAgwiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgACgCDCIEIAQoAgRBAWsiCTYCBCAJQX9GBEAgBCAEKAIAKAIIEQIACyAGIABBQGsgBSAAQRBqIgQgBigCACgCIBEGABogASAEIAQgCGoiASAHIABrIABqQTBrIAUgB0YbIAEgAiADEMMDIQEgAEHgAGokACABC/4BAQN/IwBBEGsiBSQAIwBBEGsiAyQAAkAgAUHv////B00EQAJAIAFBC0kEQCAAIAAtAAtBgAFxIAFyOgALIAAgAC0AC0H/AHE6AAsgACEEDAELIANBCGogACABQQtPBH8gAUEQakFwcSIEIARBAWsiBCAEQQtGGwVBCgtBAWoQvQIgAygCDBogACADKAIIIgQ2AgAgACAAKAIIQYCAgIB4cSADKAIMQf////8HcXI2AgggACAAKAIIQYCAgIB4cjYCCCAAIAE2AgQLIAQgASACEKoFIANBADoAByABIARqIAMtAAc6AAAgA0EQaiQADAELEC4ACyAFQRBqJAAgAAvkAgEBfyMAQSBrIgUkACAFIAE2AhwCQCACKAIEQQFxRQRAIAAgASACIAMgBCAAKAIAKAIYEQkAIQIMAQsgBUEQaiIBIAIoAhwiADYCACAAIAAoAgRBAWo2AgQGQCABEKoDIQAZIAUkACAFKAIQIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAUoAhAiASABKAIEQQFrIgI2AgQgAkF/RgRAIAEgASgCACgCCBECAAsCQCAEBEAgBUEQaiAAIAAoAgAoAhgRAAAMAQsgBUEQaiAAIAAoAgAoAhwRAAALIAUgBUEQahC8AzYCDANAIAUgBUEQahDRAzYCCCAFKAIMIAUoAghGBEAgBSgCHCECIAVBEGoQsQUaDAILBkAgBUEcaiAFKAIMKAIAEJwCGSAFJAAgBUEQahCxBRoJAAsgBSAFKAIMQQRqNgIMDAALAAsgBUEgaiQAIAILWwEBfyMAQRBrIgEkACABAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAsCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQtBAnRqNgIMIAEoAgwhACABQRBqJAAgAAuTAgEEfyMAQZABayIAJAAgAEIlNwOIASAAQYgBaiIFQQFyQdkdQQEgAigCBBC/AxClAyEGIAAgBDYCACAAQfsAaiIEIARBDSAGIAUgABDAAyAEaiIGIAIQwQMhByAAQQRqIgggAigCHCIFNgIAIAUgBSgCBEEBajYCBAZAIAQgByAGIABBEGogAEEMaiAAQQhqIAgQ0wMZIAAkACAAKAIEIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAAoAgQiBCAEKAIEQQFrIgU2AgQgBUF/RgRAIAQgBCgCACgCCBECAAsgASAAQRBqIAAoAgwgACgCCCACIAMQ1AMhASAAQZABaiQAIAELkgUBCH8jAEEQayIJJAAgBhCYAiEKIAlBBGoiByAGEKoDIgggCCgCACgCFBEAAAZAAkACfyAHLQALQQd2BEAgBygCBAwBCyAHLQALQf8AcQtFBEAgCiAAIAIgAyAKKAIAKAIwEQYAGiAFIAMgAiAAa0ECdGoiBjYCAAwBCyAFIAM2AgACQAJAIAAiCy0AACIGQStrDgMAAQABCyAKIAbAIAooAgAoAiwRAwAhByAFIAUoAgAiBkEEajYCACAGIAc2AgAgAEEBaiELCwJAIAIgC2tBAkgNACALLQAAQTBHDQAgCy0AAUEgckH4AEcNACAKQTAgCigCACgCLBEDACEHIAUgBSgCACIGQQRqNgIAIAYgBzYCACAKIAssAAEgCigCACgCLBEDACEHIAUgBSgCACIGQQRqNgIAIAYgBzYCACALQQJqIQsLIAsgAhDfAyAIIAgoAgAoAhARAQAhDUEAIQcgCyEGA0AgAiAGTQRAIAMgCyAAa0ECdGogBSgCABDgAyAFKAIAIQYMAgsCQAJ/IAlBBGoiCC0AC0EHdgRAIAgoAgAMAQsgCAsgB2otAABFDQAgDAJ/IAlBBGoiCC0AC0EHdgRAIAgoAgAMAQsgCAsgB2osAABHDQAgBSAFKAIAIghBBGo2AgAgCCANNgIAIAcgBwJ/IAktAA9BB3YEQCAJKAIIDAELIAktAA9B/wBxC0EBa0lqIQdBACEMCyAKIAYsAAAgCigCACgCLBEDACEOIAUgBSgCACIIQQRqNgIAIAggDjYCACAGQQFqIQYgDEEBaiEMDAALAAsZIAkkACAJQQRqEKgFGgkACyAEIAYgAyABIABrQQJ0aiABIAJGGzYCACAJQQRqEKgFGiAJQRBqJAAL+gEBBH8jAEEQayIHJAACQCAARQ0AIAQoAgwhBiACIAFrIghBAEoEQCAAIAEgCEECdiIIIAAoAgAoAjARBAAgCEcNAQsgBiADIAFrQQJ1IgFrQQAgASAGSBsiBkEASgRABkAGQCAHQQRqIAYgBRDeAyEBGAMgAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIAYgACgCACgCMBEEACEFGSAHJAAgARCxBRoJAAsgARCxBRogBSAGRw0BCyADIAJrIgFBAEoEQCAAIAIgAUECdiIBIAAoAgAoAjARBAAgAUcNAQsgBCgCDBogBEEANgIMIAAhCQsgB0EQaiQAIAkLkwIBBX8jAEGAAmsiACQAIABCJTcD+AEgAEH4AWoiBkEBckGwHEEBIAIoAgQQvwMQpQMhByAAIAQ3AwAgAEHgAWoiBSAFQRggByAGIAAQwAMgBWoiByACEMEDIQggAEEUaiIJIAIoAhwiBjYCACAGIAYoAgRBAWo2AgQGQCAFIAggByAAQSBqIABBHGogAEEYaiAJENMDGSAAJAAgACgCFCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAAKAIUIgUgBSgCBEEBayIGNgIEIAZBf0YEQCAFIAUoAgAoAggRAgALIAEgAEEgaiAAKAIcIAAoAhggAiADENQDIQEgAEGAAmokACABC5MCAQR/IwBBkAFrIgAkACAAQiU3A4gBIABBiAFqIgVBAXJB2R1BACACKAIEEL8DEKUDIQYgACAENgIAIABB+wBqIgQgBEENIAYgBSAAEMADIARqIgYgAhDBAyEHIABBBGoiCCACKAIcIgU2AgAgBSAFKAIEQQFqNgIEBkAgBCAHIAYgAEEQaiAAQQxqIABBCGogCBDTAxkgACQAIAAoAgQiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgACgCBCIEIAQoAgRBAWsiBTYCBCAFQX9GBEAgBCAEKAIAKAIIEQIACyABIABBEGogACgCDCAAKAIIIAIgAxDUAyEBIABBkAFqJAAgAQuTAgEFfyMAQYACayIAJAAgAEIlNwP4ASAAQfgBaiIGQQFyQbAcQQAgAigCBBC/AxClAyEHIAAgBDcDACAAQeABaiIFIAVBGCAHIAYgABDAAyAFaiIHIAIQwQMhCCAAQRRqIgkgAigCHCIGNgIAIAYgBigCBEEBajYCBAZAIAUgCCAHIABBIGogAEEcaiAAQRhqIAkQ0wMZIAAkACAAKAIUIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAAoAhQiBSAFKAIEQQFrIgY2AgQgBkF/RgRAIAUgBSgCACgCCBECAAsgASAAQSBqIAAoAhwgACgCGCACIAMQ1AMhASAAQYACaiQAIAELDQAgASACIAMgBBDZAwuOBQEJfyMAQfACayIEJAAgBEIlNwPoAiAEQegCakEBckHSyAAgASgCBBDJAyEGIAQgBEHAAmo2ArwCEKUDIQUCfyAGBEAgASgCCCEIIAQgAzkDKCAEIAg2AiAgBEHAAmpBHiAFIARB6AJqIARBIGoQwAMMAQsgBCADOQMwIARBwAJqQR4gBSAEQegCaiAEQTBqEMADCyEFIARByAE2AlAgBEG0AmpBACAEQdAAahCmAiEIIARBwAJqIgkhBwJABkAgBUEeTgRAAn8gBgRAEKUDIQUgASgCCCEHIAQgAzkDCCAEIAc2AgAgBEG8AmogBSAEQegCaiAEEMoDDAELEKUDIQUgBCADOQMQIARBvAJqIAUgBEHoAmogBEEQahDKAwsiBUF/RgRAEJ0FDAMLIAggBCgCvAIQjAMgBCgCvAIhBwsgByAFIAdqIgogARDBAyELIARByAE2AkQgBEHIAGpBACAEQcQAahCmAiEHBkACQCAEKAK8AiAEQcACakYEQCAEQdAAaiEFDAELIAVBA3QQ1gEiBUUEQBCdBQwECyAHIAUQjAMgBCgCvAIhCQsgBEE8aiIMIAEoAhwiBjYCACAGIAYoAgRBAWo2AgQGQCAJIAsgCiAFIARBxABqIARBQGsgDBDaAxkgBCQABkAgBCgCPCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACxgECQALBkAgBCgCPCIGIAYoAgRBAWsiCTYCBCAJQX9GBEAgBiAGKAIAKAIIEQIACxgDIAAgBSAEKAJEIAQoAkAgASACENQDIQAZIAQkACAHEI0DCQALGSAEJAAgCBCNAwkACyAHEI0DIAgQjQMgBEHwAmokACAADwsAC6AHAQp/IwBBEGsiCiQAIAYQmAIhCSAKQQRqIAYQqgMiDiIGIAYoAgAoAhQRAAAgBSADNgIABkACQAJAIAAiBy0AACIGQStrDgMAAQABCyAJIAbAIAkoAgAoAiwRAwAhBiAFIAUoAgAiB0EEajYCACAHIAY2AgAgAEEBaiEHCwJAAkAgAiAHIgZrQQFMDQAgBy0AAEEwRw0AIActAAFBIHJB+ABHDQAgCUEwIAkoAgAoAiwRAwAhBiAFIAUoAgAiCEEEajYCACAIIAY2AgAgCSAHLAABIAkoAgAoAiwRAwAhBiAFIAUoAgAiCEEEajYCACAIIAY2AgAgB0ECaiIHIQYDQCACIAZNDQIgBiwAACEIEKUDGiAIQTBrQQpJIAhBIHJB4QBrQQZJckUNAiAGQQFqIQYMAAsACwNAIAIgBk0NASAGLAAAIQgQpQMaIAhBMGtBCk8NASAGQQFqIQYMAAsACwJAAn8gCi0AD0EHdgRAIAooAggMAQsgCi0AD0H/AHELRQRAIAkgByAGIAUoAgAgCSgCACgCMBEGABogBSAFKAIAIAYgB2tBAnRqNgIADAELIAcgBhDfAyAOIA4oAgAoAhARAQAhDyAHIQgDQCAGIAhNBEAgAyAHIABrQQJ0aiAFKAIAEOADDAILAkACfyAKQQRqIgwtAAtBB3YEQCAMKAIADAELIAwLIAtqLAAAQQBMDQAgDQJ/IApBBGoiDC0AC0EHdgRAIAwoAgAMAQsgDAsgC2osAABHDQAgBSAFKAIAIg1BBGo2AgAgDSAPNgIAIAsgCwJ/IAotAA9BB3YEQCAKKAIIDAELIAotAA9B/wBxC0EBa0lqIQtBACENCyAJIAgsAAAgCSgCACgCLBEDACEMIAUgBSgCACIQQQRqNgIAIBAgDDYCACAIQQFqIQggDUEBaiENDAALAAsCQANAIAIgBksEQCAGLQAAIgdBLkYEQCAOIA4oAgAoAgwRAQAhByAFIAUoAgAiC0EEaiIINgIAIAsgBzYCACAGQQFqIQYMAwsgCSAHwCAJKAIAKAIsEQMAIQcgBSAFKAIAIgtBBGo2AgAgCyAHNgIAIAZBAWohBgwBCwsgBSgCACEICyAJIAYgAiAIIAkoAgAoAjARBgAaGSAKJAAgCkEEahCoBRoJAAsgBSAFKAIAIAIgBmtBAnRqIgU2AgAgBCAFIAMgASAAa0ECdGogASACRhs2AgAgCkEEahCoBRogCkEQaiQACw8AIAEgAiADIAQgBRDcAwuwBQEJfyMAQaADayIFJAAgBUIlNwOYAyAFQZgDakEBckGcKiABKAIEEMkDIQcgBSAFQfACajYC7AIQpQMhBgJ/IAcEQCABKAIIIQkgBUFAayAENwMAIAUgAzcDOCAFIAk2AjAgBUHwAmpBHiAGIAVBmANqIAVBMGoQwAMMAQsgBSADNwNQIAUgBDcDWCAFQfACakEeIAYgBUGYA2ogBUHQAGoQwAMLIQYgBUHIATYCgAEgBUHkAmpBACAFQYABahCmAiEJIAVB8AJqIgohCAJABkAgBkEeTgRAAn8gBwRAEKUDIQYgASgCCCEIIAUgBDcDECAFIAM3AwggBSAINgIAIAVB7AJqIAYgBUGYA2ogBRDKAwwBCxClAyEGIAUgAzcDICAFIAQ3AyggBUHsAmogBiAFQZgDaiAFQSBqEMoDCyIGQX9GBEAQnQUMAwsgCSAFKALsAhCMAyAFKALsAiEICyAIIAYgCGoiCyABEMEDIQwgBUHIATYCdCAFQfgAakEAIAVB9ABqEKYCIQgGQAJAIAUoAuwCIAVB8AJqRgRAIAVBgAFqIQYMAQsgBkEDdBDWASIGRQRAEJ0FDAQLIAggBhCMAyAFKALsAiEKCyAFQewAaiINIAEoAhwiBzYCACAHIAcoAgRBAWo2AgQGQCAKIAwgCyAGIAVB9ABqIAVB8ABqIA0Q2gMZIAUkAAZAIAUoAmwiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsYBAkACwZAIAUoAmwiByAHKAIEQQFrIgo2AgQgCkF/RgRAIAcgBygCACgCCBECAAsYAyAAIAYgBSgCdCAFKAJwIAEgAhDUAyEAGSAFJAAgCBCNAwkACxkgBSQAIAkQjQMJAAsgCBCNAyAJEI0DIAVBoANqJAAgAA8LAAuUAgEFfyMAQdABayIAJAAQpQMhBSAAIAQ2AgAgAEGwAWoiBCAEIARBFCAFQdcZIAAQwAMiCGoiBSACEMEDIQcgAEEMaiIGIAIoAhwiBDYCACAEIAQoAgRBAWo2AgQGQCAGEJgCIQYZIAAkACAAKAIMIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAAoAgwiBCAEKAIEQQFrIgk2AgQgCUF/RgRAIAQgBCgCACgCCBECAAsgBiAAQbABaiAFIABBEGoiBCAGKAIAKAIwEQYAGiABIAQgCEECdCAEaiIBIAcgAGtBAnQgAGpBsAVrIAUgB0YbIAEgAiADENQDIQEgAEHQAWokACABC7kCAQV/IwBBEGsiByQAIwBBEGsiAyQAAkAgAUHv////A00EQAJAIAFBAkkEQCAAIAAtAAtBgAFxIAFyOgALIAAgAC0AC0H/AHE6AAsgACEEDAELIANBCGogACABQQJPBH8gAUEEakF8cSIEIARBAWsiBCAEQQJGGwVBAQtBAWoQjAUgAygCDBogACADKAIIIgQ2AgAgACAAKAIIQYCAgIB4cSADKAIMQf////8HcXI2AgggACAAKAIIQYCAgIB4cjYCCCAAIAE2AgQLIwBBEGsiBSQAIAUgAjYCDCAEIQIgASEGA0AgBgRAIAIgBSgCDDYCACAGQQFrIQYgAkEEaiECDAELCyAFQRBqJAAgA0EANgIEIAQgAUECdGogAygCBDYCACADQRBqJAAMAQsQLgALIAdBEGokACAAC3YBAX8jAEEQayICJAAgAiAANgIMAkAgACABRg0AA0AgAiABQQFrIgE2AgggACABTw0BIAIoAgwiAC0AACEBIAAgAigCCCIALQAAOgAAIAAgAToAACACIAIoAgxBAWoiADYCDCACKAIIIQEMAAsACyACQRBqJAALdgEBfyMAQRBrIgIkACACIAA2AgwCQCAAIAFGDQADQCACIAFBBGsiATYCCCAAIAFPDQEgAigCDCIAKAIAIQEgACACKAIIIgAoAgA2AgAgACABNgIAIAIgAigCDEEEaiIANgIMIAIoAgghAQwACwALIAJBEGokAAv9BQEEfyMAQRBrIggkACAIIAI2AgggCCABNgIMIAhBBGoiAiADKAIcIgE2AgAgASABKAIEQQFqNgIEBkAgAhCHAiEJGSAIJAAgCCgCBCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAIKAIEIgEgASgCBEEBayICNgIEIAJBf0YEQCABIAEoAgAoAggRAgALIARBADYCAEEAIQECQANAIAYgB0YNASABDQECQCAIQQxqIAhBCGoQiQINAAJAIAkgBiwAAEEAIAkoAgAoAiQRBABBJUYEQCAGQQFqIgEgB0YN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IANBfHFqNgIAIARBEGokAA8LEJ0FAAuYBAEDfyMAQZABayIAJAAgACACNgKIASAAIAE2AowBIABByQE2AhQgAEEYaiAAQSBqIABBFGoiCRCmAiEHBkAgAEEQaiIIIAQoAhwiATYCACABIAEoAgRBAWo2AgQGQCAIEIcCIQEgAEEAOgAPIABBjAFqIAIgAyAIIAQoAgQgBSAAQQ9qIAEgByAJIABBhAFqEIQEBEAjAEEQayICJAACQCAGLQALQQd2BEAgBigCACEDIAJBADoADyADIAItAA86AAAgBkEANgIEDAELIAJBADoADiAGIAItAA46AAAgBiAGLQALQYABcToACyAGIAYtAAtB/wBxOgALCyACQRBqJAAgAC0ADwRAIAYgAUEtIAEoAgAoAhwRAwAQrgULIAFBMCABKAIAKAIcEQMAIQEgBygCACECIAAoAhQiA0EBayEEIAFB/wFxIQEDQAJAIAIgBE8NACACLQAAIAFHDQAgAkEBaiECDAELCyAGIAIgAxCJBAsgAEGMAWogAEGIAWoQiQIhARkgACQABkAgACgCECIBIAEoAgRBAWsiAjYCBCACQX9GBEAgASABKAIAKAIIEQIACxgCCQALGSAAJAAgBxCNAwkACyABBEAgBSAFKAIAQQJyNgIACyAAKAKMASECIAAoAhAiASABKAIEQQFrIgM2AgQgA0F/RgRAIAEgASgCACgCCBECAAsgBxCNAyAAQZABaiQAIAILtAMBBX8jAEEQayIDJAACfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQshBSAAIgQtAAtBB3YEfyAEKAIIQf////8HcUEBawVBCgshBgJAIAIgAWsiB0UNAAJAAkACfyAELQALQQd2BEAgACgCAAwBCyAACyABTQR/An8gAC0AC0EHdgRAIAAoAgAMAQsgAAsCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQtqIAFPBUEAC0UEQCAHIAYgBWtLBEAgACAGIAUgB2ogBmsgBSAFEKkFCwJ/IAAtAAtBB3YEQCAAKAIADAELIAALIAVqIQQDQCABIAJGDQIgBCABLQAAOgAAIAFBAWohASAEQQFqIQQMAAsACwZABkAjAEEQayIEJAAgAyABIAIQnwIgBEEQaiQAGAQgAAJ/IAMtAAtBB3YEQCADKAIADAELIAML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IQEgCSAJKAIAIgRBBGo2AgAgBCABNgIAIAsgCygCFEEBazYCFCAAEJoCGgwACwALIAIhCiAIKAIAIAkoAgBHDQQMAQsCQCACRQ0AQQEhCgNAAn8gAi0AC0EHdgRAIAIoAgQMAQsgAi0AC0H/AHELIApNDQECQCAAIAtBjARqEJkCRQRAAn8gACgCACIBKAIMIgMgASgCEEYEQCABIAEoAgAoAiQRAQAMAQsgAygCAAshASABAn8gAi0AC0EHdgRAIAIoAgAMAQsgAgsgCkECdGooAgBGDQELDAMLIApBAWohCiAAEJoCGgwACwALQQEhACARKAIAIAsoAmRGDQEgC0EANgIMIA8gESgCACALKAJkIAtBDGoQkwMgCygCDEUNAQsgBSAFKAIAQQRyNgIAQQAhAAsgEBCxBRogDBCxBRogDRCxBRogDhCxBRogDxCoBRogERCNAwwDCyACIQoLIANBAWohAwwACwALGSALJAAgEBCxBRogDBCxBRogDRCxBRogDhCxBRogDxCoBRogERCNAwkACwsgC0GQBGokACAACx8BAX8gASgCABCbAiECIAAgASgCADYCBCAAIAI2AgALkAQBA38jAEHAA2siACQAIAAgAjYCuAMgACABNgK8AyAAQckBNgIUIABBGGogAEEgaiAAQRRqIgkQpgIhBwZAIABBEGoiCCAEKAIcIgE2AgAgASABKAIEQQFqNgIEBkAgCBCYAiEBIABBADoADyAAQbwDaiACIAMgCCAEKAIEIAUgAEEPaiABIAcgCSAAQbADahCQBARAIwBBEGsiAiQAAkAgBi0AC0EHdgRAIAYoAgAhAyACQQA2AgwgAyACKAIMNgIAIAZBADYCBAwBCyACQQA2AgggBiACKAIINgIAIAYgBi0AC0GAAXE6AAsgBiAGLQALQf8AcToACwsgAkEQaiQAIAAtAA8EQCAGIAFBLSABKAIAKAIsEQMAELMFCyABQTAgASgCACgCLBEDACEBIAcoAgAhAiAAKAIUIgNBBGshBANAAkAgAiAETw0AIAIoAgAgAUcNACACQQRqIQIMAQsLIAYgAiADEJMECyAAQbwDaiAAQbgDahCZAiEBGSAAJAAGQCAAKAIQIgEgASgCBEEBayICNgIEIAJBf0YEQCABIAEoAgAoAggRAgALGAIJAAsZIAAkACAHEI0DCQALIAEE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AgALGAMJAAsZIAAkACAKEI0DIA0QjQMJAAsgDBCNAyAIEKgFGiAHEKgFGiAOEKgFGiAAKALMASIBIAEoAgRBAWsiAzYCBCADQX9GBEAgASABKAIAKAIIEQIACyAKEI0DIA0QjQMgAEHAA2okACACDwsAC+8DAQF/IwBBEGsiCiQAIAkCfyAABEAgAhCLBCEAAkAgAQRAIApBBGoiASAAIAAoAgAoAiwRAAAgAyAKKAIENgAAIAEgACAAKAIAKAIgEQAADAELIApBBGoiASAAIAAoAgAoAigRAAAgAyAKKAIENgAAIAEgACAAKAIAKAIcEQAACyAIIAEQngIgARCoBRogBCAAIAAoAgAoAgwRAQA6AAAgBSAAIAAoAgAoAhARAQA6AAAgCkEEaiIBIAAgACgCACgCFBEAACAGIAEQngIgARCoBRogASAAIAAoAgAoAhgRAAAgByABEJ4CIAEQqAUaIAAgACgCACgCJBEBAAwBCyACEIwEIQACQCABBEAgCkEEaiIBIAAgACgCACgCLBEAACADIAooAgQ2AAAgASAAIAAoAgAoAiARAAAMAQsgCkEEaiIBIAAgACgCACgCKBEAACADIAooAgQ2AAAgASAAIAAoAgAoAhwRAAALIAggARCeAiABEKgFGiAEIAAgACgCACgCDBEBADoAACAFIAAgACgCACgCEBEBADoAACAKQQRqIgEgACAAKAIAKAIUEQAAIAYgARCeAiABEKgFGiABIAAgACgCACgCGBEAACAHIAEQngIgARCoBRogACAAKAIAKAIkEQEACzYCACAKQRBqJAAL4QcBCn8jAEEQayITJAAgAiAANgIAIANBgARxIRYDQCAUQQRGBEACfyANLQALQQd2BEAgDSgCBAwBCyANLQALQf8AcQtBAUsEQCATIA0QvAM2AgwgAiATQQxqQQEQjQQgDRC9AyACKAIAEJsENgIACyADQbABcSIDQRBHBEAgASADQSBGBH8gAigCAAUgAAs2AgALIBNBEGokAA8LAkACQAJAAkACQAJAIAggFGosAAAOBQABAwIEBQsgASACKAIANgIADAQLIAEgAigCADYCACAGQSAgBigCACgCHBEDACEPIAIgAigCACIQQQFqNgIAIBAgDzoAAAwDCwJ/IA0tAAtBB3YEQCANKAIEDAELIA0tAAtB/wBxC0UNAgJ/IA0t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AwkACxkgACQAIAoQjQMgDRCNAwkACyAMEI0DIAgQsQUaIAcQsQUaIA4QqAUaIAAoAvwDIgEgASgCBEEBayIDNgIEIANBf0YEQCABIAEoAgAoAggRAgALIAoQjQMgDRCNAyAAQaAIaiQAIAIPCwAL7wMBAX8jAEEQayIKJAAgCQJ/IAAEQCACEJQEIQACQCABBEAgCkEEaiIBIAAgACgCACgCLBEAACADIAooAgQ2AAAgASAAIAAoAgAoAiARAAAMAQsgCkEEaiIBIAAgACgCACgCKBEAACADIAooAgQ2AAAgASAAIAAoAgAoAhwRAAALIAggARCVBCABELEFGiAEIAAgACgCACgCDBEBADYCACAFIAAgACgCACgCEBEBADYCACAKQQRqIgEgACAAKAIAKAIUEQAAIAYgARCeAiABEKgFGiABIAAgACgCACgCGBEAACAHIAEQlQQgARCxBRogACAAKAIAKAIkEQEADAELIAIQlgQhAAJAIAEEQCAKQQRqIgEgACAAKAIAKAIsEQAAIAMgCigCBDYAACABIAAgACgCACgCIBEAAAwBCyAKQQRqIgEgACAAKAIAKAIoEQAAIAMgCigCBDYAACABIAAgACgCACgCHBEAAAsgCCABEJUEIAEQsQUaIAQgACAAKAIAKAIMEQEANgIAIAUgACAAKAIAKAIQEQEANgIAIApBBGoiASAAIAAoAgAoAhQRAAAgBiABEJ4CIAEQqAUaIAEgACAAKAIAKAIYEQAAIAcgARCVBCABELEFGiAAIAAoAgAoAiQRAQALNgIAIApBEGokAAv1BwEKfyMAQRBrIhMkACACIAA2AgAgA0GABHEhFSAHQQJ0IRYDQCAUQQRGBEACfyANLQALQQd2BEAgDSgCBAwBCyANLQALQf8AcQtBAUsEQCATIA0QvAM2AgwgAiATQQxqQQEQlwQgDRDRAyACKAIAEKAENgIACyADQbABcSIDQRBHBEAgASADQSBGBH8gAigCAAUgAAs2AgALIBNBEGokAA8LAkACQAJAAkACQAJAIAggFGosAAAOBQABAwIEBQsgASACKAIANgIADAQLIAEgAigCADYCACAGQSAgBigCACgCLBEDACEHIAIgAigCACIPQQRqNgIAIA8gBzYCAAwDCwJ/IA0tAAtBB3YEQCANKAIEDAELIA0tAAtB/wBxC0UNAgJ/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QcTfAkEBOgAAC0G43wILCgBBuN8CEKgFGgslAEHU3wItAABFBEBByN8CQfy5ARDpBEHU3wJBAToAAAtByN8CCwoAQcjfAhCxBRoLJABB5N8CLQAARQRAQdjfAkHkKRAtGkHk3wJBAToAAAtB2N8CCwoAQdjfAhCoBRoLJQBB9N8CLQAARQRAQejfAkGgugEQ6QRB9N8CQQE6AAALQejfAgsKAEHo3wIQsQUaCyQAQYTgAi0AAEUEQEH43wJBrikQLRpBhOACQQE6AAALQfjfAgsKAEH43wIQqAUaCyUAQZTgAi0AAEUEQEGI4AJBxLoBEOkEQZTgAkEBOgAAC0GI4AILCgBBiOACELEFGgskAEGk4AItAABFBEBBmOACQc4ZEC0aQaTgAkEBOgAAC0GY4AILCgBBmOACEKgFGgslAEG04AItAABFBEBBqOACQZi7ARDpBEG04AJBAToAAAtBqOACCwoAQajgAhCxBRoLCgAgABCLBRDXAQsqAQF/IwAhAQZAIAAoAggQpQNHBEAgACgCCBD6AgsZIAEkABDPBQALIAALGQAgASACEI0FIQEgACACNgIEIAAgATYCAAscACABQf////8DSwRAEJIBAAsgAUECdEEEEL8CCy8BAX8jAEEQayIDJAAgACACEIoEIANBADoADyABIAJqIAMtAA86AAAgA0EQaiQACwkAIAAgARCQBQsZACMAIQAGQCABQQQQvAIZIAAkABDPBQALCzwBAX8jAEEQayIDJAAgAyABEJIFNgIMIAMgAhCSBTYCCCAAIAMoAgw2AgAgACADKAIINgIEIANBEGokAAtCAQJ/IwBBEGsiASQAIAEgADYCDCABKAIMIQIjAEEQayIAJAAgACACNgIMIAAoAgwhAiAAQRBqJAAgAUEQaiQAIAILXwEEfyMAQRBrIgAkACAAQf////8DNgIMIABB/////wc2AggjAEEQayIBJAAgAEEIaiICKAIAIABBDGoiAygCAEkhBCABQRBqJAAgAiADIAQbKAIAIQEgAEEQaiQAIAELSwEBfyMAQRBrIgMkAAJAAkAgAkEeSw0AIAEtAHgNACABQQE6AHgMAQsgA0EPaiACEI0FIQELIANBEGokACAAIAI2AgQgACABNgIACzAAIwBBEGsiAiQAAkAgACABRgRAIAFBADoAeAwBCyACQQ9qIAEQkAULIAJBEGokAAsmAQF/IAAoAgQhAgNAIAEgAkcEQCACQQRrIQIMAQsLIAAgATYCBAtTAQF/IAAoAgQhAQNAIAEgACgCCEcEQCAAKAIQGiAAIAAoAghBBGs2AggMAQsLIAAoAgAEQCAAKAIQIAAoAgAiASAAQQxqKAIAIAFrQQJ1EJUFCwtAAQJ/IwAhAQZABkBBCBDDBSEAGAEgAEH1IBCiBSIAQZyDAjYCABkgASQAIAAQxAUJAAsgAEG8gwJB6gAQxQUACwoAIAAQpQM2AgALFgAgACABIAJCgICAgICAgICAfxD+AgsNACAAIAEgAkJ/EP4CCwMAAAsoAQF/QQQQwwUiAEGAgQI2AgAgAEHYgAI2AgAgAEHMgQJB7AAQxQUAC1gBAX9BASAAIABBAU0bIQACQANAIAAQ1gEiAQ0BQYztAigCACIBBEAgAREMAAwBCwtBBBDDBSIAQYCBAjYCACAAQdiAAjYCACAAQcyBAkHsABDFBQALIAELlQQBBn8jAEEQayIFJAAgBUEANgIMAkACfyAAQQhGBEAgARDWAQwBCyAAQQRJDQEgAEEDcQ0BIABBAnYiAyADQQFrcQ0BQUAgAGsgAUkNAQJ/QRAhAgJAQRBBECAAIABBEE0bIgAgAEEQTRsiAyADQQFrcUUEQCADIQAMAQsDQCACIgBBAXQhAiAAIANJDQALCyABQUAgAGtPBEBB7NYCQTA2AgBBAAwBC0EAQRAgAUELakF4cSABQQtJGyIDIABqQQxqENYBIgJFDQAaIAJBCGshAQJAIABBAWsgAnFFBEAgASEADAELIAJBBGsiBigCACIHQXhxIAAgAmpBAWtBACAAa3FBCGsiAiAAQQAgAiABa0EPTRtqIgAgAWsiAmshBCAHQQNxRQRAIAEoAgAhASAAIAQ2AgQgACABIAJqNgIADAELIAAgBCAAKAIEQQFxckECcjYCBCAAIARqIgQgBCgCBEEBcjYCBCAGIAIgBigCAEEBcXJBAnI2AgAgASACaiIEIAQoAgRBAXI2AgQgASACENkBCwJAIAAoAgQiAUEDcUUNACABQXhxIgIgA0EQak0NACAAIAMgAUEBcXJBAnI2AgQgACADaiIBIAIgA2siA0EDcjYCBCAAIAJqIgIgAigCBEEBcjYCBCABIAMQ2QELIABBCGoLCyIARQ0AIAUgADYCDAsgBSgCDCEAIAVBEGokACAAC0UBAX8jACECIABBgIECNgIAIABB7IECNgIABkAgAEEEagJ/IAEtAAtBB3YEQCABKAIADAELIAELEKEFGSACJAAJAAsgAAs6AQJ/IAEQ1AEiAkENahCeBSIDQQA2AgggAyACNgIEIAMgAjYCACAAIANBDGogASACQQFqEM4BNgIACzABAX8jACECIABBgIECNgIAIABB7IECNgIABkAgAEEEaiABEKEFGSACJAAJAAsgAAtFAQF/IwAhAiAAQYCBAjYCACAAQYCCAjYCAAZAIABBBGoCfyABLQALQQd2BEAgASgCAAwBCyABCxChBRkgAiQACQALIAALMAEBfyMAIQIgAEGAgQI2AgAgAEGAggI2AgAGQCAAQQRqIAEQoQUZIAIkAAkACyAAC30BAn8jAEEQayIBJAAgAUEKOgAPAkACQCAAKAIQIgIEfyACBSAAEO4BDQIgACgCEAsgACgCFCICRg0AIAAoAlBBCkYNACAAIAJBAWo2AhQgAkEKOgAADAELIAAgAUEPakEBIAAoAiQRBABBAUcNACABLQAPGgsgAUEQaiQACwwAIAAgASACEM8BGguOAwEFfyMAQRBrIggkACACIAFBf3NB7////wdqTQRAAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAshCSAIQQRqIAAgAUHn////A0kEfyAIIAFBAXQ2AgwgCCABIAJqNgIEIwBBEGsiAiQAIAhBBGoiCigCACAIQQxqIgsoAgBJIQwgAkEQaiQAIAsgCiAMGygCACICQQtPBH8gAkEQakFwcSICIAJBAWsiAiACQQtGGwVBCgtBAWoFQe////8HCxC9AiAIKAIEIQIgCCgCCBogBARAIAIgCSAEEPoBCyAGBEAgAiAEaiAHIAYQ+gELIAMgBCAFaiIKayEHIAMgCkcEQCACIARqIAZqIAQgCWogBWogBxD6AQsgAUEBaiIBQQtHBEAgACAJIAEQuwILIAAgAjYCACAAIAAoAghBgICAgHhxIAgoAghB/////wdxcjYCCCAAIAAoAghBgICAgHhyNgIIIAAgBCAGaiAHaiIANgIEIAhBADoADCAAIAJqIAgtAAw6AAAgCEEQaiQADwsQLgALJQAgAC0AC0EHdgRAIAAgACgCACAAKAIIQf////8HcRC7AgsgAAvIAgEFfyMAQRBrIgUkACACQe////8HIAFrTQRAAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAshBiAFQQRqIAAgAUHn////A0kEfyAFIAFBAXQ2AgwgBSABIAJqNgIEIwBBEGsiAiQAIAVBBGoiBygCACAFQQxqIggoAgBJIQkgAkEQaiQAIAggByAJGygCACICQQtPBH8gAkEQakFwcSICIAJBAWsiAiACQQtGGwVBCgtBAWoFQe////8HCxC9AiAFKAIEIQIgBSgCCBogBARAIAIgBiAEEPoBCyADIARHBEAgAiAEaiAEIAZqIAMgBGsQ+gELIAFBAWoiAUELRwRAIAAgBiABELsCCyAAIAI2AgAgACAAKAIIQYCAgIB4cSAFKAIIQf////8HcXI2AgggACAAKAIIQYCAgIB4cjYCCCAFQRBqJAAPCxAuAAtEAQF/IwBBEGsiAyQAIAMgAjoADyADQQ9qIQIDQCABBEAgACACLQAAOgAAIAFBAWshASAAQQFqIQAMAQsLIANBEGokAAuHAQEBfyACIAAtAAtBB3YEfyAAKAIIQf////8HcUEBawVBCgsiA00EQAJ/IAAtAAtBB3YEQCAAKAIADAELIAALIgMgASACEKYFIAAgAyACEI4FDwsgACADIAIgA2sCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQsiAEEAIAAgAiABEKcFC8IBAQN/IwBBEGsiBSQAAkAgAiAALQALQQd2BH8gACgCCEH/////B3FBAWsFQQoLIgQCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQsiA2tNBEAgAkUNAQJ/IAAtAAtBB3YEQCAAKAIADAELIAALIgQgA2ogASACEPoBIAAgAiADaiIBEIoEIAVBADoADyABIARqIAUtAA86AAAMAQsgACAEIAIgA2ogBGsgAyADQQAgAiABEKcFCyAFQRBqJAAgAAuBAgEEfwJ/IAEQ1AEhAiMAQRBrIgUkAAJ/IAAtAAtBB3YEQCAAKAIEDAELIAAtAAtB/wBxCyIEQQBPBEACQCACIAAtAAtBB3YEfyAAKAIIQf////8HcUEBawVBCgsiAyAEa00EQCACRQ0BAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAsiAyAEBH8gAiADaiADIAQQpgUgASACQQAgAyAEaiABSxtBACABIANPG2oFIAELIAIQpgUgACACIARqIgEQigQgBUEAOgAPIAEgA2ogBS0ADzoAAAwBCyAAIAMgAiAEaiADayAEQQBBACACIAEQpwULIAVBEGokACAADAELEJgFAAsL+QEBA38jAEEQayICJAAgAiABOgAPAkACQAJ/IAAtAAtBB3YiBEUEQEEKIQEgAC0AC0H/AHEMAQsgACgCCEH/////B3FBAWshASAAKAIECyIDIAFGBEAgACABQQEgASABEKkFAn8gAC0AC0EHdgRAIAAoAgAMAQtBAAsaDAELAn8gAC0AC0EHdgRAIAAoAgAMAQtBAAsaIAQNACAAIgEgA0EBaiAALQALQYABcXI6AAsgACAALQALQf8AcToACwwBCyAAKAIAIQEgACADQQFqNgIECyABIANqIgAgAi0ADzoAACACQQA6AA4gACACLQAOOgABIAJBEGokAAsOACAAIAEgARDUARCsBQufAwEFfyMAQRBrIggkACACIAFBf3NB7////wNqTQRAAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAshCSAIQQRqIAAgAUHn////AUkEfyAIIAFBAXQ2AgwgCCABIAJqNgIEIwBBEGsiAiQAIAhBBGoiCigCACAIQQxqIgsoAgBJIQwgAkEQaiQAIAsgCiAMGygCACICQQJPBH8gAkEEakF8cSICIAJBAWsiAiACQQJGGwVBAQtBAWoFQe////8DCxCMBSAIKAIEIQIgCCgCCBogBARAIAIgCSAEEJcCCyAGBEAgBEECdCACaiAHIAYQlwILIAMgBCAFaiIKayEHIAMgCkcEQCAEQQJ0IgMgAmogBkECdGogAyAJaiAFQQJ0aiAHEJcCCyABQQFqIgFBAkcEQCAAIAkgARCPBQsgACACNgIAIAAgACgCCEGAgICAeHEgCCgCCEH/////B3FyNgIIIAAgACgCCEGAgICAeHI2AgggACAEIAZqIAdqIgA2AgQgCEEANgIMIAIgAEECdGogCCgCDDYCACAIQRBqJAAPCxAuAAslACAALQALQQd2BEAgACAAKAIAIAAoAghB/////wdxEI8FCyAAC80CAQV/IwBBEGsiBSQAIAJB7////wMgAWtNBEACfyAALQALQQd2BEAgACgCAAwBCyAACyEGIAVBBGogACABQef///8BSQR/IAUgAUEBdDYCDCAFIAEgAmo2AgQjAEEQayICJAAg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IAIoAhQiACABIAAoAgAoAhQRAAALGSACJAAgAygCACADLQAEOgAACQALIAMoAgAgAy0ABDoAAAsgAkEgaiQACy0AIABBBUEAQQFBAUEBEKgGIgAgATYCCCAAQcjMAjYCACAAIAIpAgA3AgwgAAtFAgJ/AX4jAEEQayICJAAgACgCCCIDIAEgAygCACgCEBEAACACIAApAgwiBDcDACACIAQ3AwggASACEKoGGiACQRBqJAALBwAgAEEgagvIAQEDfyMAQRBrIgMkACADIAA2AgwgAEHQAGsoAgAiBSgCBCEAIANBADYCCCAAQQBBACADQQhqEPkFIQQCQAJAIAMoAggNACAERQ0AIAEgBDYCAAwBCyAEENcBIAEgABDUAUEBahDWASIBNgIAIAEgABD7AgsgAkEANgIAQZyBAiAFIANBDGpBnIECKAIAKAIQEQQABEAgAiADKAIMIgAgACgCACgCCBEBACIAENQBQQFqENYBIgE2AgAgASAAEPsCCyADQRBqJAALBAAjAAsGACAAJAALEAAjACAAa0FwcSIAJAAgAAsDAAALIgEBfiABIAKtIAOtQiCGhCAEIAAREwAiBUIgiKckAyAFpwsZACABIAIgA60gBK1CIIaEIAUgBiAAERQACxkAIAEgAiADIAQgBa0gBq1CIIaEIAARFQALIwAgASACIAMgBCAFrSAGrUIghoQgB60gCK1CIIaEIAARGgALJQAgASACIAMgBCAFIAatIAetQiCGhCAIrSAJrUIghoQgABEbAAscACAAIAFBCCACpyACQiCIpyADpyADQiCIpxAqCwucrwI4AEGACAuSRf8ADQECAAEBAAAAAJyAAAD/AA0BAgABAQAAAADcgQAA/wANAQIAAQEAAAAAnIAAAP8ADQECAAEBAAAAANyBAAD/AA0BAgABAQAAAADcgQAA/wANAQIAAQEAAAAAnIAAAP8ADQECAAEBAAAAAJyAAAD/AA0BAgABAQAAAACcgAAA/wANAQIAAQEAAAAAnIAAAP8ADQECAAEBAAAAAJyAAABvcGVyYXRvcn4Aey4uLn0Ab3BlcmF0b3J8fABvcGVyYXRvcnwAaW5maW5pdHkATm90IGVub3VnaCBtZW1vcnkARmVicnVhcnkASmFudWFyeQAgaW1hZ2luYXJ5AEp1bHkAcG9wVHJhaWxpbmdOb2RlQXJyYXkAVGh1cnNkYXkAVHVlc2RheQBXZWRuZXNkYXkAU2F0dXJkYXkAU3VuZGF5AE1vbmRheQBGcmlkYXkATWF5AFR5ACVtLyVkLyV5AG54AHVuaXF1ZV9sb2NrOjpsb2NrOiByZWZlcmVuY2VzIG51bGwgbXV0ZXgAIGNvbXBsZXgAL2huc3dsaWItaW5kZXgAaW5pdEluZGV4AHJlc2l6ZUluZGV4AHdyaXRlSW5kZXgAcmVhZEluZGV4AER4AC0rICAgMFgweAAtMFgrMFggMFgtMHgrMHggMHgAdHcAdGhyb3cAX19uZXh0X3ByaW1lIG92ZXJmbG93AG9wZXJhdG9yIG5ldwBEdwBOb3YARHYAVGh1AFR1AEF1Z3VzdAAgY29uc3QATm90IGVub3VnaCBtZW1vcnk6IGxvYWRJbmRleCBmYWlsZWQgdG8gYWxsb2NhdGUgbGlua2xpc3QATm90IGVub3VnaCBtZW1vcnk6IGFkZFBvaW50IGZhaWxlZCB0byBhbGxvY2F0ZSBsaW5rbGlzdABUaGUgbmV3bHkgaW5zZXJ0ZWQgZWxlbWVudCBzaG91bGQgaGF2ZSBibGFuayBsaW5rIGxpc3QAZ2V0SWRzTGlzdAB+U2NvcGVkVGVtcGxhdGVQYXJhbUxpc3QAY29uc3RfY2FzdAByZWludGVycHJldF9jYXN0AHN0ZDo6YmFkX2Nhc3QAc3RhdGljX2Nhc3QAZHluYW1pY19jYXN0AHVuc2lnbmVkIHNob3J0AG5vZXhjZXB0AGsgPD0gY3VyX2VsZW1lbnRfY291bnQAaW50ZXJuYWxJZCA8IGN1cl9lbGVtZW50X2NvdW50AGdldEN1cnJlbnRDb3VudABnZXRQb2ludABub3JtYWxpemVQb2ludAByZW1vdmVQb2ludABhZGRQb2ludAB1bnNpZ25lZCBpbnQAX0JpdEludABUaGUgbnVtYmVyIG9mIGVsZW1lbnRzIGV4Y2VlZHMgdGhlIHNwZWNpZmllZCBsaW1pdABvcGVyYXRvciBjb19hd2FpdAB1bmNhdWdodABzdHJ1Y3QAIHJlc3RyaWN0AG9iamNfb2JqZWN0AE9jdABmbG9hdABfRmxvYXQAU2F0AHN0ZDo6bnVsbHB0cl90AHdjaGFyX3QAY2hhcjhfdABjaGFyMTZfdAB1aW50NjRfdABjaGFyMzJfdABVdABUdABTdABOb3QgZW5vdWdoIG1lbW9yeTogbG9hZEluZGV4IGZhaWxlZCB0byBhbGxvY2F0ZSBsaW5rbGlzdHMATm90IGVub3VnaCBtZW1vcnk6IEhpZXJhcmNoaWNhbE5TVyBmYWlsZWQgdG8gYWxsb2NhdGUgbGlua2xpc3RzAFBhcnNlci0+VGVtcGxhdGVQYXJhbXMuc2l6ZSgpID49IE9sZE51bVRlbXBsYXRlUGFyYW1MaXN0cwBDYW5ub3QgcmVzaXplLCBtYXggZWxlbWVudCBpcyBsZXNzIHRoYW4gdGhlIGN1cnJlbnQgbnVtYmVyIG9mIGVsZW1lbnRzAGdldE1heEVsZW1lbnRzAG5laWdoYm9ycwBOb3QgZW5vdWdoIG1lbW9yeTogcmVzaXplSW5kZXggZmFpbGVkIHRvIGFsbG9jYXRlIG90aGVyIGxheWVycwBnZXROdW1EaW1lbnNpb25zAG1hcmtEZWxldGVJdGVtcwBhZGRJdGVtcwB0aGlzAGdzAGRpc3RhbmNlcwBUcwBzeW5jRnMAdGVybWluYXRpbmcgZHVlIHRvICVzIGV4Y2VwdGlvbiBvZiB0eXBlICVzAHRlcm1pbmF0aW5nIGR1ZSB0byAlcyBleGNlcHRpb24gb2YgdHlwZSAlczogJXMAbnVsbHB0cgBhZGRJdGVtc1dpdGhQdHIAc3IAQXByAFJlcGxhY2VtZW50IG9mIGRlbGV0ZWQgZWxlbWVudHMgaXMgZGlzYWJsZWQgaW4gY29uc3RydWN0b3IAQ3VzdG9tRmlsdGVyRnVuY3RvcgB2ZWN0b3IAb3BlcmF0b3IAYWxsb2NhdG9yAHVuc3BlY2lmaWVkIGlvc3RyZWFtX2NhdGVnb3J5IGVycm9yAG1vbmV5X2dldCBlcnJvcgBMZXZlbCBlcnJvcgBjYW5kIGVycm9yAE5vdCBlbm91Z2ggbWVtb3J5OiByZXNpemVJbmRleCBmYWlsZWQgdG8gYWxsb2NhdGUgYmFzZSBsYXllcgByZWFkRW5jb2RlZFBvaW50ZXIAQmFkIHZhbHVlIG9mIHN6X2xpbmtfbGlzdF9vdGhlcgBFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXIAT2N0b2JlcgBOb3ZlbWJlcgBTZXB0ZW1iZXIARGVjZW1iZXIAdW5zaWduZWQgY2hhcgBpb3NfYmFzZTo6Y2xlYXIATWFyAHNwAC9lbXNkay9lbXNjcmlwdGVuL3N5c3RlbS9saWIvbGliY3h4YWJpL3NyYy9jeGFfcGVyc29uYWxpdHkuY3BwAC9lbXNkay9lbXNjcmlwdGVuL3N5c3RlbS9saWIvbGliY3h4YWJpL3NyYy9jeGFfZGVtYW5nbGUuY3BwAG9wAGZwAFNlcABUcAAlSTolTTolUyAlcABhdXRvAG9iamNwcm90bwBzbwBEbwBTdW4ASnVuAHlwdG4AUG9zc2libGUgbWVtb3J5IGNvcnJ1cHRpb24Ac3RkOjpleGNlcHRpb24AdGVybWluYXRpbmcgZHVlIHRvICVzIGZvcmVpZ24gZXhjZXB0aW9uAHRlcm1pbmF0ZV9oYW5kbGVyIHVuZXhwZWN0ZWRseSB0aHJldyBhbiBleGNlcHRpb24AQ3VycmVudFBvc2l0aW9uAHVuaW9uAE1vbgBzZWFyY2hLbm4AZG4AbmFuAEphbgBUbgBEbgBlbnVtAHN5c3RlbQBpbml0aWFsaXplRmlsZVN5c3RlbQBwYXJzZVRlbXBsYXRlUGFyYW0AYmFzaWNfaW9zdHJlYW0AYmFzaWNfb3N0cmVhbQBiYXNpY19pc3RyZWFtAEp1bAB0bABib29sAGdldFN5bWJvbAB1bGwAY2FsbABBcHJpbABMZXZlbCBvZiBpdGVtIHRvIGJlIHVwZGF0ZWQgY2Fubm90IGJlIGJpZ2dlciB0aGFuIG1heCBsZXZlbABUcnlpbmcgdG8gbWFrZSBhIGxpbmsgb24gYSBub24tZXhpc3RlbnQgbGV2ZWwAZW1zY3JpcHRlbjo6dmFsAHN0cmluZyBsaXRlcmFsAHVubWFya0RlbGV0ZWRJbnRlcm5hbABVbABwb3BfYmFjawBkcm9wQmFjawBGcmkAcGkAbGkAYmFkX2FycmF5X25ld19sZW5ndGgAc2V0RWZTZWFyY2gAZ2V0RWZTZWFyY2gAQnJ1dGVmb3JjZVNlYXJjaABNYXJjaAAvZW1zZGsvZW1zY3JpcHRlbi9zeXN0ZW0vbGliL2xpYmN4eGFiaS9zcmMvZGVtYW5nbGUvVXRpbGl0eS5oAC9lbXNkay9lbXNjcmlwdGVuL3N5c3RlbS9saWIvbGliY3h4YWJpL3NyYy9kZW1hbmdsZS9TdHJpbmdWaWV3LmgALi8uL3NyYy9obnN3bGliL2huc3dhbGcuaAAvZW1zZGsvZW1zY3JpcHRlbi9zeXN0ZW0vbGliL2xpYmN4eGFiaS9zcmMvZGVtYW5nbGUvSXRhbml1bURlbWFuZ2xlLmgALi8uL3NyYy9obnN3bGliL2JydXRlZm9yY2UuaABBdWcAdW5zaWduZWQgbG9uZyBsb25nAHVuc2lnbmVkIGxvbmcAdGVybWluYXRpbmcAc3RkOjp3c3RyaW5nAGJhc2ljX3N0cmluZwBzdGQ6OnN0cmluZwBzdGQ6OnUxNnN0cmluZwBzdGQ6OnUzMnN0cmluZwBfX3V1aWRvZgBpbmYAVHJ5aW5nIHRvIGNvbm5lY3QgYW4gZWxlbWVudCB0byBpdHNlbGYAaGFsZgAlYWYAJS4wTGYAJUxmAHRydWUAVHVlAG9wZXJhdG9yIGRlbGV0ZQB1bm1hcmtEZWxldGUAZmFsc2UAZGVjbHR5cGUASnVuZQBjb3NpbmUAZ2V0QmFzZU5hbWUAIHZvbGF0aWxlAENhbm5vdCBvcGVuIGZpbGUAX19jeGFfZGVtYW5nbGUAbG9uZyBkb3VibGUAX2Jsb2NrX2ludm9rZQBGb3J3YXJkUmVmLT5nZXRLaW5kKCkgPT0gTm9kZTo6S0ZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZQBkaXN0YW5jZQBJbm5lclByb2R1Y3RTcGFjZQBMMlNwYWNlAFRlAHN0ZABMYWJlbCBub3QgZm91bmQAdm9pZABpc0luZGV4SW5pdGlhbGl6ZWQAaXNJbml0aWFsaXplZABJbmRleCBzZWVtcyB0byBiZSBjb3JydXB0ZWQgb3IgdW5zdXBwb3J0ZWQAbG9jYWxlIG5vdCBzdXBwb3J0ZWQAVGhlIHJlcXVlc3RlZCB0byBkZWxldGUgZWxlbWVudCBpcyBhbHJlYWR5IGRlbGV0ZWQAVGhlIHJlcXVlc3RlZCB0byB1bmRlbGV0ZSBlbGVtZW50IGlzIG5vdCBkZWxldGVkAHVuZXhwZWN0ZWQAdGVybWluYXRlX2hhbmRsZXIgdW5leHBlY3RlZGx5IHJldHVybmVkACd1bm5hbWVkAG11dGV4IGxvY2sgZmFpbGVkAFRoZSBtYXhpbXVtIG51bWJlciBvZiBlbGVtZW50cyBoYXMgYmVlbiByZWFjaGVkAFdlZABVbmtub3duIGVycm9yICVkAHN0ZDo6YmFkX2FsbG9jAG1jAFNob3VsZCBiZSBub3QgYmUgbW9yZSB0aGFuIE1fIGNhbmRpZGF0ZXMgcmV0dXJuZWQgYnkgdGhlIGhldXJpc3RpYwBnZW5lcmljAERlYwB3YgByYgBGZWIAc2Nhbl9laF90YWIAVWIAdytiAHIrYgBhK2IAcndhAE5vdCBlbm91Z2ggbWVtb3J5OiBsb2FkSW5kZXggZmFpbGVkIHRvIGFsbG9jYXRlIGRhdGEATm90IGVub3VnaCBtZW1vcnk6IEJydXRlZm9yY2VTZWFyY2ggZmFpbGVkIHRvIGFsbG9jYXRlIGRhdGEAJ2xhbWJkYQAlYQBiYXNpY18Ab3BlcmF0b3JeAG9wZXJhdG9yIG5ld1tdAG9wZXJhdG9yW10Ab3BlcmF0b3IgZGVsZXRlW10AcGl4ZWwgdmVjdG9yWwBzWgBfX19fWgAlYSAlYiAlZCAlSDolTTolUyAlWQBQT1NJWABIaWVyYXJjaGljYWxOU1cAZnBUACRUVAAkVAAlSDolTTolUwBzUABETwBzck4AX0dMT0JBTF9fTgBOQU4AJE4AUE0AQU0AZkwAJUxhTABMQ19BTEwAVWE5ZW5hYmxlX2lmSQBMQU5HAElORgB2RQBhY3Rpb25zICYgX1VBX0NMRUFOVVBfUEhBU0UAYWN0aW9ucyAmIF9VQV9TRUFSQ0hfUEhBU0UAUkUAT0UAYjFFAGIwRQByZXN1bHRzLnJlYXNvbiA9PSBfVVJDX0hBTkRMRVJfRk9VTkQAREMAb3BlcmF0b3I/AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBzaG9ydD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGZsb2F0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50OF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQxNl90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50NjRfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50NjRfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDMyX3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDMyX3Q+AG9wZXJhdG9yPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxjaGFyPgA8Y2hhciwgc3RkOjpjaGFyX3RyYWl0czxjaGFyPgAsIHN0ZDo6YWxsb2NhdG9yPGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGNoYXI+AHN0ZDo6YmFzaWNfc3RyaW5nPHVuc2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHNpZ25lZCBjaGFyPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1bnNpZ25lZCBsb25nPgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxkb3VibGU+AG9wZXJhdG9yPj4Ab3BlcmF0b3I8PT4Ab3BlcmF0b3ItPgBvcGVyYXRvcnw9AG9wZXJhdG9yPQBvcGVyYXRvcl49AG9wZXJhdG9yPj0Ab3BlcmF0b3I+Pj0Ab3BlcmF0b3I9PQBvcGVyYXRvcjw9AG9wZXJhdG9yPDw9AG9wZXJhdG9yLz0Ab3BlcmF0b3ItPQBvcGVyYXRvcis9AG9wZXJhdG9yKj0Ab3BlcmF0b3ImPQBvcGVyYXRvciU9AG9wZXJhdG9yIT0Ab3BlcmF0b3I8AHRlbXBsYXRlPABpZDwAb3BlcmF0b3I8PAAuPAAiPABbYWJpOgAgW2VuYWJsZV9pZjoAc3RkOjoAMDEyMzQ1Njc4OQB1bnNpZ25lZCBfX2ludDEyOABfX2Zsb2F0MTI4AGRlY2ltYWwxMjgAQy5VVEYtOABkZWNpbWFsNjQAZGVjaW1hbDMyAF9fZ3h4X3BlcnNvbmFsaXR5X3dhc20wAE5vdCBlbm91Z2ggbWVtb3J5OiBsb2FkSW5kZXggZmFpbGVkIHRvIGFsbG9jYXRlIGxldmVsMABvcGVyYXRvci8ASW52YWxpZCBjYWxsYmFjayBmdW5jdGlvbiBmb3IgQ3VzdG9tRmlsdGVyRnVuY3Rvci4Ab3BlcmF0b3IuAEludmFsaWQgdGhlIGZpcnN0IGFyZ3VtZW50IHR5cGUsIG11c3QgYmUgYSBudW1iZXIuAFRoZSBudW1iZXIgb2YgdmVjdG9ycyBhbmQgaWRzIG11c3QgYmUgdGhlIHNhbWUuAFNlYXJjaCBpbmRleCBoYXMgbm90IGJlZW4gaW5pdGlhbGl6ZWQsIGNhbGwgYGluaXRJbmRleGAgaW4gYWR2YW5jZS4AQ2FuJ3QgdXNlIGFkZFBvaW50IHRvIHVwZGF0ZSBkZWxldGVkIGVsZW1lbnRzIGlmIHJlcGxhY2VtZW50IG9mIGRlbGV0ZWQgZWxlbWVudHMgaXMgZW5hYmxlZC4AVGhlIG51bWJlciBvZiB2ZWN0b3JzIGFuZCBpZHMgbXVzdCBiZSBncmVhdGVyIHRoYW4gMC4Ac2l6ZW9mLi4uAEludmFsaWQgdGhlIG51bWJlciBvZiBrLW5lYXJlc3QgbmVpZ2hib3JzIChtdXN0IGJlIGEgcG9zaXRpdmUgbnVtYmVyKS4Ab3BlcmF0b3ItAC1pbi0Ab3BlcmF0b3ItLQBvcGVyYXRvciwAdysAb3BlcmF0b3IrAGErAG9wZXJhdG9yKysAb3BlcmF0b3IqAG9wZXJhdG9yLT4qADo6KgBvcGVyYXRvci4qAGRlY2x0eXBlKGF1dG8pAChudWxsKQAoYW5vbnltb3VzIG5hbWVzcGFjZSkAYWN0aW9ucyAmIChfVUFfU0VBUkNIX1BIQVNFIHwgX1VBX0ZPUkNFX1VOV0lORCkAYWN0aW9ucyAmIChfVUFfU0VBUkNIX1BIQVNFIHwgX1VBX0hBTkRMRVJfRlJBTUUgfCBfVUFfRk9SQ0VfVU5XSU5EKQBQYXJzZXIuRm9yd2FyZFRlbXBsYXRlUmVmcy5lbXB0eSgpACFlbXB0eSgpAG9wZXJhdG9yKCkARnJvbVBvc2l0aW9uIDw9IE5hbWVzLnNpemUoKQBTVi5zdGFydHNXaXRoKCJiYXNpY18iKQAgKAAnYmxvY2stbGl0ZXJhbCcAb3BlcmF0b3ImAG9wZXJhdG9yJiYAICYmACAmAG9wZXJhdG9yJQA+IgAoYmFzZSAhPSAwKSAmJiAiRFdfRUhfUEVfZGF0YXJlbCBpcyBpbnZhbGlkIHdpdGggYSBiYXNlIG9mIDAiAFJlcy5zdGFydHNXaXRoKCJvcGVyYXRvciIpICYmICJvcGVyYXRvciBuYW1lIGRvZXMgbm90IHN0YXJ0IHdpdGggJ29wZXJhdG9yJyIASW5kZXggPCBzaXplKCkgJiYgIkludmFsaWQgYWNjZXNzISIATGFzdCAhPSBGaXJzdCAmJiAiQ2FsbGluZyBiYWNrKCkgb24gZW1wdHkgdmVjdG9yISIATGFzdCAhPSBGaXJzdCAmJiAiUG9wcGluZyBlbXB0eSB2ZWN0b3IhIgBJbmRleCA8PSBzaXplKCkgJiYgImRyb3BCYWNrKCkgY2FuJ3QgZXhwYW5kISIAb3BlcmF0b3IhAFB1cmUgdmlydHVhbCBmdW5jdGlvbiBjYWxsZWQhAEludmFsaWQgdmVjdG9yIHNpemUgYXQgaW5kZXggAHRocm93IABub2V4Y2VwdCAALCBidXQgZ290IAAgYXQgb2Zmc2V0IABDb3VsZCBub3QgbWFya0RlbGV0ZUl0ZW1zIABDb3VsZCBub3QgYWRkSXRlbXMgAEludmFsaWQgdmVjdG9yIHNpemUuIE11c3QgYmUgZXF1YWwgdG8gdGhlIGRpbWVuc2lvbiBvZiB0aGUgc3BhY2UuIFRoZSBkaW1lbnNpb24gb2YgdGhlIHNwYWNlIGlzIABvcGVyYXRvciAAcmVmZXJlbmNlIHRlbXBvcmFyeSBmb3IgAHRlbXBsYXRlIHBhcmFtZXRlciBvYmplY3QgZm9yIAB0eXBlaW5mbyBmb3IgAHRocmVhZC1sb2NhbCB3cmFwcGVyIHJvdXRpbmUgZm9yIAB0aHJlYWQtbG9jYWwgaW5pdGlhbGl6YXRpb24gcm91dGluZSBmb3IgAHR5cGVpbmZvIG5hbWUgZm9yIABjb25zdHJ1Y3Rpb24gdnRhYmxlIGZvciAAZ3VhcmQgdmFyaWFibGUgZm9yIABWVFQgZm9yIABjb3ZhcmlhbnQgcmV0dXJuIHRodW5rIHRvIABub24tdmlydHVhbCB0aHVuayB0byAAaW52b2NhdGlvbiBmdW5jdGlvbiBmb3IgYmxvY2sgaW4gAGFsaWdub2YgAHNpemVvZiAAPiB0eXBlbmFtZSAAaW5pdGlhbGl6ZXIgZm9yIG1vZHVsZSAAdHlwZWlkIABJbnZhbGlkIHRoZSBnaXZlbiBhcnJheSBsZW5ndGggKGV4cGVjdGVkIAB1bnNpZ25lZCAAID8gACA9IABGYWlsZWQgdG8gbm9ybWFsaXplIHRoZSBwb2ludCwgY2hlY2sgdmVjdG9yIGRpbWVuc2lvbnM6IABIbnN3bGliIEVycm9yOiAARmFpbGVkIHRvIGNhbGwgdGhlIGNhbGxiYWNrIGZ1bmN0aW9uOiAAbGliYysrYWJpOiAAVGhlIG1heGltdW0gbnVtYmVyIG9mIGVsZW1lbnRzIGhhcyBiZWVuIHJlYWNoZWQgaW4gaW5kZXgsIHBsZWFzZSBpbmNyZWFzZSB0aGUgaW5kZXggbWF4X3NpemUuICBtYXhfc2l6ZTogAFRoZSBtYXhpbXVtIG51bWJlciBvZiBlbGVtZW50cyBoYXMgYmVlbiByZWFjaGVkIGluIGluZGV4LCBwbGVhc2UgaW5jcmVhc2VkIHRoZSBpbmRleCBtYXhfc2l6ZS4gIG1heF9zaXplOiAAVGhlIG1heGltdW0gbnVtYmVyIG9mIGVsZW1lbnRzIGluIHRoZSBpbmRleCBoYXMgYmVlbiByZWFjaGVkLiAsIHBsZWFzZSBpbmNyZWFzZWQgdGhlIGluZGV4IG1heF9zaXplLiAgbWF4X3NpemU6IABpbnZhbGlkIHNwYWNlIHNob3VsZCBiZSBleHBlY3RlZCBsMiwgaXAsIG9yIGNvc2luZSwgbmFtZTogAEludmFsaWQgdGhlIG51bWJlciBvZiBrLW5lYXJlc3QgbmVpZ2hib3JzIChjYW5ub3QgYmUgZ2l2ZW4gYSB2YWx1ZSBncmVhdGVyIHRoYW4gYG1heEVsZW1lbnRzYDogACA6IABzaXplb2YuLi4gACAuLi4gACwgAG9wZXJhdG9yIiIgAFRoZSBudW1iZXIgb2YgZWxlbWVudHMgZXhjZWVkcyB0aGUgc3BlY2lmaWVkIGxpbWl0CgBpaQBOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lmRUUAAAAAXH8AAFYkAACcJAAAnCQAAE4xMGVtc2NyaXB0ZW4zdmFsRQAAXH8AAIgkAABpaWkATjEwZW1zY3JpcHRlbjdMMlNwYWNlRQAAXH8AAKgkAABQTjEwZW1zY3JpcHRlbjdMMlNwYWNlRQA8gAAAyCQAAAAAAADAJAAAUEtOMTBlbXNjcmlwdGVuN0wyU3BhY2VFAAAAADyAAADwJAAAAQAAAMAkAABpaQB2AHZpAOAkAAAEfwAAAAAAAIQlAABxAAAAcgAAAHMAAAB0AAAAdQAAAE43aG5zd2xpYjdMMlNwYWNlRQBON2huc3dsaWIxNFNwYWNlSW50ZXJmYWNlSWZFRQAAAABcfwAAWyUAAIR/AABIJQAAfCUAAEB/AADgJAAAnCQAAJwkAABmaWlpaQAAAAR/AADgJAAATjEwZW1zY3JpcHRlbjE3SW5uZXJQcm9kdWN0U3BhY2VFAAAAXH8AALAlAABQTjEwZW1zY3JpcHRlbjE3SW5uZXJQcm9kdWN0U3BhY2VFAAA8gAAA3CUAAAAAAADUJQAAUEtOMTBlbXNjcmlwdGVuMTdJbm5lclByb2R1Y3RTcGFjZUUAPIAAABAmAAABAAAA1CUAAAAmAAAEfwAAAAAAAIgmAAB2AAAAdwAAAHgAAAB0AAAAeQAAAE43aG5zd2xpYjE3SW5uZXJQcm9kdWN0U3BhY2VFAAAAhH8AAGgmAAB8JQBBoM0AC6IFQH8AAAAmAACcJAAAnCQAAAR/AAAAJgAATjEwZW1zY3JpcHRlbjE5Q3VzdG9tRmlsdGVyRnVuY3RvckUATjdobnN3bGliMTdCYXNlRmlsdGVyRnVuY3RvckUAAABcfwAA3CYAAIR/AAC4JgAA/CYAAFBOMTBlbXNjcmlwdGVuMTlDdXN0b21GaWx0ZXJGdW5jdG9yRQAAAAA8gAAAECcAAAAAAAAEJwAAUEtOMTBlbXNjcmlwdGVuMTlDdXN0b21GaWx0ZXJGdW5jdG9yRQAAADyAAABIJwAAAQAAAAQnAAA4JwAAnCQAAAAAAAAEJwAAegAAAHsAAAB8AAAAsH4AAJwkAAAcfwAAsH4AADgnAAAcfwAAaWlpaQBOMTBlbXNjcmlwdGVuMTZCcnV0ZWZvcmNlU2VhcmNoRQAAAFx/AAC5JwAAUE4xMGVtc2NyaXB0ZW4xNkJydXRlZm9yY2VTZWFyY2hFAAAAPIAAAOQnAAAAAAAA3CcAAFBLTjEwZW1zY3JpcHRlbjE2QnJ1dGVmb3JjZVNlYXJjaEUAADyAAAAYKAAAAQAAANwnAAAIKAAAmCgAAAR/AABOU3QzX18yMTJiYXNpY19zdHJpbmdJY05TXzExY2hhcl90cmFpdHNJY0VFTlNfOWFsbG9jYXRvckljRUVFRQAAXH8AAFgoAACYfgAACCgAAAR/AAB2aWlpAAAAAAAAAAAgKQAAfQAAAH4AAAB/AAAAgAAAAIEAAACCAAAATjdobnN3bGliMTZCcnV0ZWZvcmNlU2VhcmNoSWZFRQBON2huc3dsaWIxOEFsZ29yaXRobUludGVyZmFjZUlmRUUAAABcfwAA9CgAAIR/AADUKAAAGCkAAAAAAACcJAAACCgAAJh+AAAIKAAAmCgAQdDSAAsVmH4AAAgoAACcJAAABH8AAHZpaWlpAEHw0gALlgOcJAAACCgAAJwkAAAEfwAAnCQAAGlpaWlpaQAABH8AAAgoAABOMTBlbXNjcmlwdGVuMTVIaWVyYXJjaGljYWxOU1dFAFx/AACUKQAAUE4xMGVtc2NyaXB0ZW4xNUhpZXJhcmNoaWNhbE5TV0UAAAAAPIAAALwpAAAAAAAAtCkAAFBLTjEwZW1zY3JpcHRlbjE1SGllcmFyY2hpY2FsTlNXRQAAADyAAADwKQAAAQAAALQpAADgKQAAmCgAAAR/AACYfgAA4CkAAAR/AAAEfwAABH8AAAR/AACwfgAAdmlpaWlpaWkAAAAAAAAAAJgqAACDAAAAhAAAAH8AAACFAAAAhgAAAIcAAABON2huc3dsaWIxNUhpZXJhcmNoaWNhbE5TV0lmRUUAAIR/AAB4KgAAGCkAAJh+AADgKQAABH8AAJh+AADgKQAABH8AAAR/AACYfgAA4CkAAAR/AAAEfwAABH8AAHZpaWlpaQAAAAAAAJh+AADgKQAABH8AAAR/AAAEfwAABH8AAHZpaWlpaWkAnCQAAOApAEGQ1gALJph+AADgKQAAmCgAALB+AACYfgAA4CkAAJgoAACcJAAA4CkAAAR/AEHA1gALEph+AADgKQAAnCQAAAR/AACwfgBB4NYACyKYfgAA4CkAAJwkAAAEfwAAmH4AAOApAACcJAAAnCQAALB+AEGQ1wALZph+AADgKQAAnCQAAAR/AACcJAAABH8AALB+AAD4fgAA4CkAAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWlFRQAAXH8AALQrAACcJAAA4CkAAJh+AADgKQAAnCQAAAR/AAAUKgBBgNgACxKcJAAA4CkAAJwkAAAEfwAAnCQAQaDYAAvTOJwkAADgKQAAnCQAAAR/AABpaWlpaQAAAJh+AACwfgAAdmlpAE4xMGVtc2NyaXB0ZW4yN0Vtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlckUAXH8AAEQsAABQTjEwZW1zY3JpcHRlbjI3RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyRQAAAAA8gAAAeCwAAAAAAABwLAAAUEtOMTBlbXNjcmlwdGVuMjdFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXJFAAAAPIAAALgsAAABAAAAcCwAAKgsAACYfgAAmCgAAGlpAACwfgAAmH4AALB+AACcJAAAmH4AAJwkAABOU3QzX18yMTJiYXNpY19zdHJpbmdJaE5TXzExY2hhcl90cmFpdHNJaEVFTlNfOWFsbG9jYXRvckloRUVFRQAAXH8AACAtAABOU3QzX18yMTJiYXNpY19zdHJpbmdJd05TXzExY2hhcl90cmFpdHNJd0VFTlNfOWFsbG9jYXRvckl3RUVFRQAAXH8AAGgtAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRHNOU18xMWNoYXJfdHJhaXRzSURzRUVOU185YWxsb2NhdG9ySURzRUVFRQAAAFx/AACwLQAATlN0M19fMjEyYmFzaWNfc3RyaW5nSURpTlNfMTFjaGFyX3RyYWl0c0lEaUVFTlNfOWFsbG9jYXRvcklEaUVFRUUAAABcfwAA/C0AAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWNFRQAAXH8AAEguAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lhRUUAAFx/AABwLgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaEVFAABcfwAAmC4AAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXNFRQAAXH8AAMAuAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0l0RUUAAFx/AADoLgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJakVFAABcfwAAEC8AAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWxFRQAAXH8AADgvAABOMTBlbXNjcmlwdGVuMTFt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VEQAAJRDAABoAAAAAAAAACBFAACzAAAAtAAAAJj///+Y////IEUAALUAAAC2AAAAnEQAANREAADoRAAAsEQAAGgAAAAAAAAA3EMAAKEAAACiAAAAmP///5j////cQwAAowAAAKQAAABOU3QzX18yMTRiYXNpY19vZnN0cmVhbUljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRQCEfwAA8EQAANxDAABOU3QzX18yMTNiYXNpY19maWxlYnVmSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAACEfwAALEUAAFxDAAAAAAAAFEYAALkAAAC6AAAAuwAAALwAAAC9AAAAvgAAAL8AAAAAAAAA6EUAALgAAADAAAAAwQAAAAAAAADERQAAwgAAAMMAAABOU3QzX18yOGlvc19iYXNlRQAAAFx/AACwRQAATlN0M19fMjhpb3NfYmFzZTdmYWlsdXJlRQAAAIR/AADMRQAAXHwAAE5TdDNfXzIxOV9faW9zdHJlYW1fY2F0ZWdvcnlFAAAAhH8AAPRFAACkfAAA0XSeAFedvSqAcFIP//8+JwoAAABkAAAA6AMAABAnAACghgEAQEIPAICWmAAA4fUFGAAAADUAAABxAAAAa////877//+Sv///AAAAAAAAAAD/////////////////////////////////////////////////////////////////AAECAwQFBgcICf////////8KCwwNDg8QERITFBUWFxgZGhscHR4fICEiI////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////wABAgQHAwYFAAAAAAAAAAIAAMADAADABAAAwAUAAMAGAADABwAAwAgAAMAJAADACgAAwAsAAMAMAADADQAAwA4AAMAPAADAEAAAwBEAAMASAADAEwAAwBQAAMAVAADAFgAAwBcAAMAYAADAGQAAwBoAAMAbAADAHAAAwB0AAMAeAADAHwAAwAAAALMBAADDAgAAwwMAAMMEAADD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ZmlsZSBvciBkaXJlY3RvcnkATm8gc3VjaCBwcm9jZXNzAEZpbGUgZXhpc3RzAFZhbHVlIHRvbyBsYXJnZSBmb3IgZGF0YSB0eXBlAE5vIHNwYWNlIGxlZnQgb24gZGV2aWNlAE91dCBvZiBtZW1vcnkAUmVzb3VyY2UgYnVzeQBJbnRlcnJ1cHRlZCBzeXN0ZW0gY2FsbABSZXNvdXJjZSB0ZW1wb3JhcmlseSB1bmF2YWlsYWJsZQBJbnZhbGlkIHNlZWsAQ3Jvc3MtZGV2aWNlIGxpbmsAUmVhZC1vbmx5IGZpbGUgc3lzdGVtAERpcmVjdG9yeSBub3QgZW1wdHkAQ29ubmVjdGlvbiByZXNldCBieSBwZWVyAE9wZXJhdGlvbiB0aW1lZCBvdXQAQ29ubmVjdGlvbiByZWZ1c2VkAEhvc3QgaXMgZG93bgBIb3N0IGlzIHVucmVhY2hhYmxlAEFkZHJlc3MgaW4gdXNlAEJyb2tlbiBwaXBlAEkvTyBlcnJvcgBObyBzdWNoIGRldmljZSBvciBhZGRyZXNzAEJsb2NrIGRldmljZSByZXF1aXJlZABObyBzdWNoIGRldmljZQBOb3QgYSBkaXJlY3RvcnkASXMgYSBkaXJlY3RvcnkAVGV4dCBmaWxlIGJ1c3kARXhlYyBmb3JtYXQgZXJyb3IASW52YWxpZCBhcmd1bWVudABBcmd1bWVudCBsaXN0IHRvbyBsb25nAFN5bWJvbGljIGxpbmsgbG9vcABGaWxlbmFtZSB0b28gbG9uZwBUb28gbWFueSBvcGVuIGZpbGVzIGluIHN5c3RlbQBObyBmaWxlIGRlc2NyaXB0b3JzIGF2YWlsYWJsZQBCYWQgZmlsZSBkZXNjcmlwdG9yAE5vIGNoaWxkIHByb2Nlc3MAQmFkIGFkZHJlc3MARmlsZSB0b28gbGFyZ2UAVG9vIG1hbnkgbGlua3MATm8gbG9ja3MgYXZhaWxhYmxlAFJlc291cmNlIGRlYWRsb2NrIHdvdWxkIG9jY3VyAFN0YXRlIG5vdCByZWNvdmVyYWJsZQBQcmV2aW91cyBvd25lciBkaWVkAE9wZXJhdGlvbiBjYW5jZWxlZABGdW5jdGlvbiBub3QgaW1wbGVtZW50ZWQATm8gbWVzc2FnZSBvZiBkZXNpcmVkIHR5cGUASWRlbnRpZmllciByZW1vdmVkAERldmljZSBub3QgYSBzdHJlYW0ATm8gZGF0YSBhdmFpbGFibGUARGV2aWNlIHRpbWVvdXQAT3V0IG9mIHN0cmVhbXMgcmVzb3VyY2VzAExpbmsgaGFzIGJlZW4gc2V2ZXJlZABQcm90b2NvbCBlcnJvcgBCYWQgbWVzc2FnZQBGaWxlIGRlc2NyaXB0b3IgaW4gYmFkIHN0YXRlAE5vdCBhIHNvY2tldABEZXN0aW5hdGlvbiBhZGRyZXNzIHJlcXVpcmVkAE1lc3NhZ2UgdG9vIGxhcmdlAFByb3RvY29sIHdyb25nIHR5cGUgZm9yIHNvY2tldABQcm90b2NvbCBub3QgYXZhaWxhYmxlAFByb3RvY29sIG5vdCBzdXBwb3J0ZWQAU29ja2V0IHR5cGUgbm90IHN1cHBvcnRlZABOb3Qgc3VwcG9ydGVkAFByb3RvY29sIGZhbWlseSBub3Qgc3VwcG9ydGVkAEFkZHJlc3MgZmFtaWx5IG5vdCBzdXBwb3J0ZWQgYnkgcHJvdG9jb2wAQWRkcmVzcyBub3QgYXZhaWxhYmxlAE5ldHdvcmsgaXMgZG93bgBOZXR3b3JrIHVucmVhY2hhYmxlAENvbm5lY3Rpb24gcmVzZXQgYnkgbmV0d29yawBDb25uZWN0aW9uIGFib3J0ZWQATm8gYnVmZmVyIHNwYWNlIGF2YWlsYWJsZQBTb2NrZXQgaXMgY29ubmVjdGVkAFNvY2tldCBub3QgY29ubmVjdGVkAENhbm5vdCBzZW5kIGFmdGVyIHNvY2tldCBzaHV0ZG93bgBPcGVyYXRpb24gYWxyZWFkeSBpbiBwcm9ncmVzcwBPcGVyYXRpb24gaW4gcHJvZ3Jlc3MAU3RhbGUgZmlsZSBoYW5kbGUAUmVtb3RlIEkvTyBlcnJvcgBRdW90YSBleGNlZWRlZABObyBtZWRpdW0gZm91bmQAV3JvbmcgbWVkaXVtIHR5cGUATXVsdGlob3AgYXR0ZW1wdGVkAFJlcXVpcmVkIGtleSBub3QgYXZhaWxhYmxlAEtleSBoYXMgZXhwaXJlZABLZXkgaGFzIGJlZW4gcmV2b2tlZABLZXkgd2FzIHJlamVjdGVkIGJ5IHNlcnZpY2UAQbLzAQuWAaUCWwDwAbUFjAUlAYMGHQOUBP8A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DIEAAJyAAAAAAAAAVIEAAGoAAAD4AQAA9gEAAFN0MTZpbnZhbGlkX2FyZ3VtZW50AAAAAIR/AAA8gQAAHIEAAAAAAACIgQAAagAAAPkBAAD2AQAAU3QxMmxlbmd0aF9lcnJvcgAAAACEfwAAdIEAAByBAAAAAAAAvIEAAGoAAAD6AQAA9gEAAFN0MTJvdXRfb2ZfcmFuZ2UAAAAAhH8AAKiBAAAcgQAAU3QxM3J1bnRpbWVfZXJyb3IAAACEfwAAyIEAAJyAAAAAAAAAEIIAAAEAAAD7AQAAwQAAAFN0MTRvdmVyZmxvd19lcnJvcgAAhH8AAPyBAADcgQAAAAAAAFSCAACOAAAA/AEAAP0BAABTdDl0eXBlX2luZm8AAAAAXH8AADCCAABTdDhiYWRfY2FzdACEfwAASIIAAJyAAAD8//////////z//////////v/////////8//////////j//////////P/////////8//////////z//////////P/////////8//////////7//////////P/////////4/////////wAAAABUgwAA/gEAAP8BAAAAAgAAAQIAAAICAAADAgAABAIAAAUCAAAGAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTFTcGVjaWFsTmFtZUUATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlNE5vZGVFAFx/AAAkgwAAhH8AAPSCAABMgwAAAAAAAEyDAAD+AQAA/wEAAAACAAABAgAAzQEAAAMCAAAEAgAABQIAAAcCAAAAAAAA9IMAAP4BAAD/AQAAAAIAAAECAAAIAgAAAwIAAAQCAAAFAgAACQIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTIxQ3RvclZ0YWJsZVNwZWNpYWxOYW1lRQAAAIR/AAC4gwAATIMAAAAAAABYhAAA/gEAAP8BAAAAAgAAAQIAAAoCAAADAgAACwIAAAUCAAAMAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlOE5hbWVUeXBlRQCEfwAALIQAAEyDAAAAAAAAwIQAAP4BAAD/AQAAAAIAAAECAAANAgAAAwIAAAQCAAAFAgAADgIAAE4xMl9HTE9CQUxfX05fMTE2aXRh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Ml9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTlBcnJheVR5cGVFAAAAAIR/AABMpAAATIMAAAAAAADspAAAvQIAAP8BAAAAAgAAAQIAAL4CAAC/AgAABAIAAAUCAADAAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTlQb2ludGVyVG9NZW1iZXJUeXBlRQCEfwAAtKQAAEyDAAAAAAAAYKUAAP4BAAD/AQAAAAIAAAECAADBAgAAAwIAAAQCAAAFAgAAwgIAAE4xMl9HTE9CQUxfX05fMTE2aXRhbml1bV9kZW1hbmdsZTIyRWxhYm9yYXRlZFR5cGVTcGVmVHlwZUUAAIR/AAAkpQAATIMAAAAAAADIpQAAwwIAAP8BAAAAAgAAAQIAAMQCAADFAgAABAIAAAUCAADGAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMTFQb2ludGVyVHlwZUUAhH8AAJilAABMgwAAAAAAADSmAADHAgAA/wEAAAACAAABAgAAyAIAAMkCAAAEAgAABQIAAMoCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxM1JlZmVyZW5jZVR5cGVFAAAAhH8AAACmAABMgwAAAAAAAKimAAD+AQAA/wEAAAACAAABAgAAywIAAAMCAAAEAgAABQIAAMwCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUyMFBvc3RmaXhRdWFsaWZpZWRUeXBlRQAAAACEfwAAbKYAAEyDAAAcCwAAdRAAAHUQAAAGDgAA+A0AAOkNAEHQzQILEbC4AQBwRQAA8HsAABR8AAAFAEHszQILAYwAQYTOAgsKigAAAIkAAACMtgBBnM4CCwECAEGszgILCP//////////AEHwzgILDuCmAADZAQAA2gEAAC0IAJCGCARuYW1lAcqACNgHABhlbXNjcmlwdGVuX2FzbV9jb25zdF9pbnQBGV9lbWJpbmRfcmVnaXN0ZXJfZnVuY3Rpb24CFl9lbWJpbmRfcmVnaXN0ZXJfY2xhc3MDIl9lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY29uc3RydWN0b3IEH19lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfZnVuY3Rpb24FJV9lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY2xhc3NfZnVuY3Rpb24GEV9lbXZhbF90YWtlX3ZhbHVlBw1fZW12YWxfaW5jcmVmCA1fZW12YWxfZGVjcmVmCRBfZW12YWxfbmV3X2FycmF5ChFfZW12YWxfbmV3X29iamVjdAsSX2VtdmFsX25ld19jc3RyaW5nDBNfZW12YWxfc2V0X3Byb3BlcnR5DRNfZW12YWxfZ2V0X3Byb3BlcnR5DglfZW12YWxfYXMPFl9lbXZhbF9ydW5fZGVzdHJ1Y3RvcnMQGF9lbXZhbF9nZXRfbWV0aG9kX2NhbGxlchEXX2VtdmFsX2NhbGxfdm9pZF9tZXRob2QSIV9lbXZhbF9uZXdfYXJyYXlfZnJvbV9tZW1vcnlfdmlldxMSX2VtdmFsX2NhbGxfbWV0aG9kFA1fX2Fzc2VydF9mYWlsFRVfZW1iaW5kX3JlZ2lzdGVyX3ZvaWQWFV9lbWJpbmRfcmVnaXN0ZXJfYm9vbBcYX2VtYmluZF9yZWdpc3Rlcl9pbnRlZ2VyGBZfZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0GRtfZW1iaW5kX3JlZ2lzdGVyX3N0ZF9zdHJpbmcaHF9lbWJpbmRfcmVnaXN0ZXJfc3RkX3dzdHJpbmcbFl9lbWJpbmRfcmVnaXN0ZXJfZW12YWwcHF9lbWJpbmRfcmVnaXN0ZXJfbWVtb3J5X3ZpZXcdFWVtc2NyaXB0ZW5fbWVtY3B5X2JpZx4WZW1zY3JpcHRlbl9yZXNpemVfaGVhcB8QX19zeXNjYWxsX29wZW5hdCARX19zeXNjYWxsX2ZjbnRsNjQhD19fc3lzY2FsbF9pb2N0bCIPX193YXNpX2ZkX3dyaXRlIw5fX3dhc2lfZmRfcmVhZCQPX193YXNpX2ZkX2Nsb3NlJRhfX3dhc2lfZW52aXJvbl9zaXplc19nZXQmEl9fd2FzaV9lbnZpcm9uX2dldCcKc3RyZnRpbWVfbCgFYWJvcnQpIl9fdGhyb3dfZXhjZXB0aW9uX3dpdGhfc3RhY2tfdHJhY2UqI2xlZ2FsaW1wb3J0JF9lbWJpbmRfcmVnaXN0ZXJfYmlnaW50KxpsZWdhbGltcG9ydCRfX3dhc2lfZmRfc2VlaywRX193YXNtX2NhbGxfY3RvcnMtiwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmJhc2ljX3N0cmluZ1thYmk6djE1MDA3XTxzdGQ6Om51bGxwdHJfdD4oY2hhciBjb25zdCopLn5zdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fdGhyb3dfbGVuZ3RoX2Vycm9yW2FiaTp2MTUwMDddKCkgY29uc3QvW2Vtc2NyaXB0ZW46Om5vcm1hbGl6ZVBvaW50c1B1cmUoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JikwXXN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Pjo6X190aHJvd19sZW5ndGhfZXJyb3JbYWJpOnYxNTAwN10oKSBjb25zdDEOaG5zd2xpYl9zeW5jZnMyImhuc3dsaWJfc3luY2ZzOjokXzA6Ol9faW52b2tlKGludCkzGV9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM0IWVtc2NyaXB0ZW46OmVtYmluZF9pbml0X2huc3dsaWIoKTWhAmVtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Piwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0Jj46Omludm9rZShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gKCopKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYpLCBlbXNjcmlwdGVuOjpfRU1fVkFMKik2WnZvaWQgY29uc3QqIGVtc2NyaXB0ZW46OmludGVybmFsOjpnZXRBY3R1YWxUeXBlPGVtc2NyaXB0ZW46OkwyU3BhY2U+KGVtc2NyaXB0ZW46OkwyU3BhY2UqKTdUdm9pZCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6cmF3X2Rlc3RydWN0b3I8ZW1zY3JpcHRlbjo6TDJTcGFjZT4oZW1zY3JpcHRlbjo6TDJTcGFjZSopOIMBZW1zY3JpcHRlbjo6aW50ZXJuYWw6Okludm9rZXI8ZW1zY3JpcHRlbjo6TDJTcGFjZSosIHVuc2lnbmVkIGludCYmPjo6aW52b2tlKGVtc2NyaXB0ZW46OkwyU3BhY2UqICgqKSh1bnNpZ25lZCBpbnQmJiksIHVuc2lnbmVkIGludCk5amVtc2NyaXB0ZW46OkwyU3BhY2UqIGVtc2NyaXB0ZW46OmludGVybmFsOjpvcGVyYXRvcl9uZXc8ZW1zY3JpcHRlbjo6TDJTcGFjZSwgdW5zaWduZWQgaW50Pih1bnNpZ25lZCBpbnQmJik6lQFlbXNjcmlwdGVuOjpMMlNwYWNlOjpkaXN0YW5jZShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmKTu5BGVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPGZsb2F0IChlbXNjcmlwdGVuOjpMMlNwYWNlOjoqKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmKSwgZmxvYXQsIGVtc2NyaXB0ZW46OkwyU3BhY2UqLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmPjo6aW52b2tlKGZsb2F0IChlbXNjcmlwdGVuOjpMMlNwYWNlOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0Jiwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiksIGVtc2NyaXB0ZW46OkwyU3BhY2UqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCopPCdlbXNjcmlwdGVuOjpMMlNwYWNlOjpnZXROdW1EaW1lbnNpb25zKCk9vgFlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx1bnNpZ25lZCBpbnQgKGVtc2NyaXB0ZW46OkwyU3BhY2U6OiopKCksIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6TDJTcGFjZSo+OjppbnZva2UodW5zaWduZWQgaW50IChlbXNjcmlwdGVuOjpMMlNwYWNlOjoqIGNvbnN0JikoKSwgZW1zY3JpcHRlbjo6TDJTcGFjZSopPm52b2lkIGNvbnN0KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Z2V0QWN0dWFsVHlwZTxlbXNjcmlwdGVuOjpJbm5lclByb2R1Y3RTcGFjZT4oZW1zY3JpcHRlbjo6SW5uZXJQcm9kdWN0U3BhY2UqKT9+ZW1zY3JpcHRlbjo6SW5uZXJQcm9kdWN0U3BhY2UqIGVtc2NyaXB0ZW46OmludGVybmFsOjpvcGVyYXRvcl9uZXc8ZW1zY3JpcHRlbjo6SW5uZXJQcm9kdWN0U3BhY2UsIHVuc2lnbmVkIGludD4odW5zaWduZWQgaW50JiYpQHJ2b2lkIGNvbnN0KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Z2V0QWN0dWFsVHlwZTxlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yPihlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yKilBbHZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OnJhd19kZXN0cnVjdG9yPGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3I+KGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3IqKUKpAWVtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3IqLCBlbXNjcmlwdGVuOjp2YWwmJj46Omludm9rZShlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yKiAoKikoZW1zY3JpcHRlbjo6dmFsJiYpLCBlbXNjcmlwdGVuOjpfRU1fVkFMKilDiAFlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yKiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6b3BlcmF0b3JfbmV3PGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3IsIGVtc2NyaXB0ZW46OnZhbD4oZW1zY3JpcHRlbjo6dmFsJiYpRI4CZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8Ym9vbCAoZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3Rvcjo6KikodW5zaWduZWQgbG9uZyksIGJvb2wsIGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3IqLCB1bnNpZ25lZCBsb25nPjo6aW52b2tlKGJvb2wgKGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3I6OiogY29uc3QmKSh1bnNpZ25lZCBsb25nKSwgZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3RvciosIHVuc2lnbmVkIGxvbmcpRWx2b2lkIGNvbnN0KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Z2V0QWN0dWFsVHlwZTxlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoPihlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKilGZnZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OnJhd19kZXN0cnVjdG9yPGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g+KGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqKUfQA2Vtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4mJiwgdW5zaWduZWQgaW50JiY+OjppbnZva2UoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCogKCopKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYmLCB1bnNpZ25lZCBpbnQmJiksIGVtc2NyaXB0ZW46OmludGVybmFsOjpCaW5kaW5nVHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4sIHZvaWQ+OjondW5uYW1lZCcqLCB1bnNpZ25lZCBpbnQpSKoCZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCogZW1zY3JpcHRlbjo6aW50ZXJuYWw6Om9wZXJhdG9yX25ldzxlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4sIHVuc2lnbmVkIGludD4oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+JiYsIHVuc2lnbmVkIGludCYmKUk1ZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6aW5pdEluZGV4KHVuc2lnbmVkIGludClK/gFlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqKSh1bnNpZ25lZCBpbnQpLCB2b2lkLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgdW5zaWduZWQgaW50Pjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiogY29uc3QmKSh1bnNpZ25lZCBpbnQpLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgdW5zaWduZWQgaW50KUsyZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6aXNJbmRleEluaXRpYWxpemVkKClM6wFlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjxlbXNjcmlwdGVuOjp2YWwgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiopKCksIGVtc2NyaXB0ZW46OnZhbCwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCo+OjppbnZva2UoZW1zY3JpcHRlbjo6dmFsIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqIGNvbnN0JikoKSwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCopTYQBZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6cmVhZEluZGV4KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpTugEZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6Kikoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiksIHZvaWQsIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmPjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiogY29uc3QmKShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKSwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIGVtc2NyaXB0ZW46OmludGVybmFsOjpCaW5kaW5nVHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4sIHZvaWQ+OjondW5uYW1lZCcqKU+FAWVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OndyaXRlSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JilQcGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OmFkZFBvaW50KHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludClRyANlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpLCB2b2lkLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50Pjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiogY29uc3QmKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIHVuc2lnbmVkIGludClSN2Vtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OnJlbW92ZVBvaW50KHVuc2lnbmVkIGludClTggFlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjpzZWFyY2hLbm4oc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWwpVLIEZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8ZW1zY3JpcHRlbjo6dmFsIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGVtc2NyaXB0ZW46OnZhbCksIGVtc2NyaXB0ZW46OnZhbCwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsPjo6aW52b2tlKGVtc2NyaXB0ZW46OnZhbCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6KiBjb25zdCYpKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsKSwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIGVtc2NyaXB0ZW46Ol9FTV9WQUwqLCB1bnNpZ25lZCBpbnQsIGVtc2NyaXB0ZW46Ol9FTV9WQUwqKVUuZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6Z2V0TWF4RWxlbWVudHMoKVYvZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6Z2V0Q3VycmVudENvdW50KClXanZvaWQgY29uc3QqIGVtc2NyaXB0ZW46OmludGVybmFsOjpnZXRBY3R1YWxUeXBlPGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVz4oZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKilYZGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6aW5pdEluZGV4KHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgYm9vbClZugNlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgYm9vbCksIHZvaWQsIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgYm9vbD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKSh1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIGJvb2wpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIGJvb2wpWjVlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmluaXRJbmRleDIodW5zaWduZWQgaW50KVtDZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjppbml0SW5kZXgzKHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KVyyAmVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KikodW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKSh1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCksIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KV1RZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjppbml0SW5kZXg0KHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpXuoCZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKSh1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KSwgdm9pZCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKSh1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludClfX2Vtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6aW5pdEluZGV4NSh1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpYKIDZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKSh1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQ+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0JikodW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KWGJAWVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6cmVhZEluZGV4KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIGJvb2wpYvwEZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBib29sKSwgdm9pZCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgYm9vbD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBib29sKSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OkJpbmRpbmdUeXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Piwgdm9pZD46Oid1bm5hbWVkJyosIGJvb2wpY4QBZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjp3cml0ZUluZGV4KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpZDZlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OnJlc2l6ZUluZGV4KHVuc2lnbmVkIGludCllM2Vtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Z2V0UG9pbnQodW5zaWduZWQgaW50KWabAmVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPGVtc2NyaXB0ZW46OnZhbCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKSh1bnNpZ25lZCBpbnQpLCBlbXNjcmlwdGVuOjp2YWwsIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHVuc2lnbmVkIGludD46Omludm9rZShlbXNjcmlwdGVuOjp2YWwgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KiBjb25zdCYpKHVuc2lnbmVkIGludCksIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHVuc2lnbmVkIGludClndWVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6YWRkUG9pbnQoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBib29sKWjcA2Vtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Kikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBib29sKSwgdm9pZCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBib29sPjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KiBjb25zdCYpKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCwgYm9vbCksIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIGVtc2NyaXB0ZW46Ol9FTV9WQUwqLCB1bnNpZ25lZCBpbnQsIGJvb2wpaXBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmFkZFBvaW50MihzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpao0CZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjphZGRJdGVtcyhzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+PiBjb25zdCYsIHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0JiwgYm9vbClrrAdlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Pj4+IGNvbnN0Jiwgc3RkOjpfXzI6OnZlY3Rvcjx1bnNpZ25lZCBpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8dW5zaWduZWQgaW50Pj4gY29uc3QmLCBib29sKSwgdm9pZCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYsIGJvb2w+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYsIGJvb2wpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIGJvb2wpbHBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmFkZEl0ZW1zV2l0aFB0cihlbXNjcmlwdGVuOjp2YWwsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsLCB1bnNpZ25lZCBpbnQsIGJvb2wpbdwDZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKShlbXNjcmlwdGVuOjp2YWwsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsLCB1bnNpZ25lZCBpbnQsIGJvb2wpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBlbXNjcmlwdGVuOjp2YWwsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsLCB1bnNpZ25lZCBpbnQsIGJvb2w+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0JikoZW1zY3JpcHRlbjo6dmFsLCB1bnNpZ25lZCBpbnQsIGVtc2NyaXB0ZW46OnZhbCwgdW5zaWduZWQgaW50LCBib29sKSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIHVuc2lnbmVkIGludCwgYm9vbCluLWVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Z2V0TWF4RWxlbWVudHMoKW8pZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpnZXRJZHNMaXN0KClwxwJlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjxzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+PiAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKSgpLCBzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+PiwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKj46Omludm9rZShzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+PiAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0JikoKSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKilxNWVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6bWFya0RlbGV0ZSh1bnNpZ25lZCBpbnQpcnZlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6Om1hcmtEZWxldGVJdGVtcyhzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYpc7YDZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKShzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCY+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3Rvcjx1bnNpZ25lZCBpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8dW5zaWduZWQgaW50Pj4gY29uc3QmKSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCopdDdlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OnVubWFya0RlbGV0ZSh1bnNpZ25lZCBpbnQpdTRlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmdldEN1cnJlbnRDb3VudCgpIGNvbnN0djBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmdldEVmU2VhcmNoKCkgY29uc3R3NmVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6c2V0RWZTZWFyY2godW5zaWduZWQgaW50KXiBAWVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6c2VhcmNoS25uKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsKXlxZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpzZWFyY2hLbm4yKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCl65QNlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjxlbXNjcmlwdGVuOjp2YWwgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Kikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6dmFsLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQ+OjppbnZva2UoZW1zY3JpcHRlbjo6dmFsIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgdW5zaWduZWQgaW50KXtHZW1zY3JpcHRlbjo6aW50ZXJuYWw6Okludm9rZXI8dm9pZCwgYm9vbD46Omludm9rZSh2b2lkICgqKShib29sKSwgYm9vbCl8ggF2b2lkIGNvbnN0KiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6Z2V0QWN0dWFsVHlwZTxlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXI+KGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlciopfXx2b2lkIGVtc2NyaXB0ZW46OmludGVybmFsOjpyYXdfZGVzdHJ1Y3RvcjxlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXI+KGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlciopfn9lbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjxlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXIqPjo6aW52b2tlKGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlciogKCopKCkpf3ZlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXIqIGVtc2NyaXB0ZW46OmludGVybmFsOjpvcGVyYXRvcl9uZXc8ZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyPigpgAH6AmVtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPHZvaWQsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCY+OjppbnZva2Uodm9pZCAoKikoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiksIGVtc2NyaXB0ZW46OmludGVybmFsOjpCaW5kaW5nVHlwZTxzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4sIHZvaWQ+OjondW5uYW1lZCcqKYEBmgFlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXI6OmluaXRpYWxpemVGaWxlU3lzdGVtKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpggE4ZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOjppc0luaXRpYWxpemVkKCmDAX9lbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjx2b2lkLCBib29sLCBlbXNjcmlwdGVuOjp2YWw+OjppbnZva2Uodm9pZCAoKikoYm9vbCwgZW1zY3JpcHRlbjo6dmFsKSwgYm9vbCwgZW1zY3JpcHRlbjo6X0VNX1ZBTCophAFGZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyOjpzeW5jRnMoYm9vbCwgZW1zY3JpcHRlbjo6dmFsKYUBYmhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+OjpCcnV0ZWZvcmNlU2VhcmNoKGhuc3dsaWI6OlNwYWNlSW50ZXJmYWNlPGZsb2F0PiosIHVuc2lnbmVkIGxvbmcphgGpAWhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+Ojpsb2FkSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgaG5zd2xpYjo6U3BhY2VJbnRlcmZhY2U8ZmxvYXQ+KimHAd4Bc3RkOjpfXzI6OnVub3JkZXJlZF9tYXA8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6cGFpcjx1bnNpZ25lZCBsb25nIGNvbnN0LCB1bnNpZ25lZCBsb25nPj4+Ojp+dW5vcmRlcmVkX21hcFthYmk6djE1MDA3XSgpiAHYAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6ZmluZFthYmk6djE1MDA3XShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBsb25nKSBjb25zdIkBmgdzdGQ6Ol9fMjo6cGFpcjxzdGQ6Ol9fMjo6X19oYXNoX2l0ZXJhdG9yPHN0ZDo6X18yOjpfX2hhc2hfbm9kZTxzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHZvaWQqPio+LCBib29sPiBzdGQ6Ol9fMjo6X19oYXNoX3RhYmxlPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Ol9fdW5vcmRlcmVkX21hcF9oYXNoZXI8dW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmVxdWFsX3RvPHVuc2lnbmVkIGxvbmc+LCB0cnVlPiwgc3RkOjpfXzI6Ol9fdW5vcmRlcmVkX21hcF9lcXVhbDx1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHRydWU+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPj4+OjpfX2VtcGxhY2VfdW5pcXVlX2tleV9hcmdzPHVuc2lnbmVkIGxvbmcsIHN0ZDo6X18yOjpwaWVjZXdpc2VfY29uc3RydWN0X3QgY29uc3QmLCBzdGQ6Ol9fMjo6dHVwbGU8dW5zaWduZWQgbG9uZyBjb25zdCY+LCBzdGQ6Ol9fMjo6dHVwbGU8Pj4odW5zaWduZWQgbG9uZyBjb25zdCYsIHN0ZDo6X18yOjpwaWVjZXdpc2VfY29uc3RydWN0X3QgY29uc3QmLCBzdGQ6Ol9fMjo6dHVwbGU8dW5zaWduZWQgbG9uZyBjb25zdCY+JiYsIHN0ZDo6X18yOjp0dXBsZTw+JiYpigHLBHVuc2lnbmVkIGxvbmcgc3RkOjpfXzI6Ol9faGFzaF90YWJsZTxzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjpfX3Vub3JkZXJlZF9tYXBfaGFzaGVyPHVuc2lnbmVkIGxvbmcsIHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgdHJ1ZT4sIHN0ZDo6X18yOjpfX3Vub3JkZXJlZF9tYXBfZXF1YWw8dW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6ZXF1YWxfdG88dW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjpoYXNoPHVuc2lnbmVkIGxvbmc+LCB0cnVlPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4+Pjo6X19lcmFzZV91bmlxdWU8dW5zaWduZWQgbG9uZz4odW5zaWduZWQgbG9uZyBjb25zdCYpiwFAc3RkOjppbnZhbGlkX2FyZ3VtZW50OjppbnZhbGlkX2FyZ3VtZW50W2FiaTp2MTUwMDddKGNoYXIgY29uc3QqKYwBP3ZvaWQgZW1zY3JpcHRlbjo6dmFsOjpzZXQ8aW50LCBmbG9hdD4oaW50IGNvbnN0JiwgZmxvYXQgY29uc3QmKY0BT3ZvaWQgZW1zY3JpcHRlbjo6dmFsOjpzZXQ8aW50LCB1bnNpZ25lZCBsb25nPihpbnQgY29uc3QmLCB1bnNpZ25lZCBsb25nIGNvbnN0JimOAdMDdm9pZCBzdGQ6Ol9fMjo6X19wb3BfaGVhcFthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6X0NsYXNzaWNBbGdQb2xpY3ksIHN0ZDo6X18yOjpsZXNzPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4qPj4oc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPio+LCBzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+Kj4sIHN0ZDo6X18yOjpsZXNzPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPj4mLCBzdGQ6Ol9fMjo6aXRlcmF0b3JfdHJhaXRzPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4qPj46OmRpZmZlcmVuY2VfdHlwZSmPAZMBaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6SGllcmFyY2hpY2FsTlNXKGhuc3dsaWI6OlNwYWNlSW50ZXJmYWNlPGZsb2F0PiosIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIGJvb2wpkAE7aG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6cmVzaXplSW5kZXgodW5zaWduZWQgbG9uZymRAX9zdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6Z2V0RGF0YUJ5TGFiZWw8ZmxvYXQ+KHVuc2lnbmVkIGxvbmcpIGNvbnN0kgEvc3RkOjpfX3Rocm93X2JhZF9hcnJheV9uZXdfbGVuZ3RoW2FiaTp2MTUwMDddKCmTATpobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjptYXJrRGVsZXRlKHVuc2lnbmVkIGxvbmcplAE8aG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6dW5tYXJrRGVsZXRlKHVuc2lnbmVkIGxvbmcplQFtc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGVtc2NyaXB0ZW46OnZlY0Zyb21KU0FycmF5PGZsb2F0PihlbXNjcmlwdGVuOjp2YWwgY29uc3QmKZYBpAFlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+LCB2b2lkPjo6dG9XaXJlVHlwZShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmKZcBN3N0ZDo6X18yOjpfX3Rocm93X2xlbmd0aF9lcnJvclthYmk6djE1MDA3XShjaGFyIGNvbnN0KimYASplbXNjcmlwdGVuOjpMMlNwYWNlOjpMMlNwYWNlKHVuc2lnbmVkIGludCmZATVobnN3bGliOjpMMlNxcih2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqKZoBIWhuc3dsaWI6OkwyU3BhY2U6OmdldF9kYXRhX3NpemUoKZsBIWhuc3dsaWI6OkwyU3BhY2U6OmdldF9kaXN0X2Z1bmMoKZwBJ2huc3dsaWI6OkwyU3BhY2U6OmdldF9kaXN0X2Z1bmNfcGFyYW0oKZ0BHGhuc3dsaWI6OkwyU3BhY2U6On5MMlNwYWNlKCmeAURobnN3bGliOjpJbm5lclByb2R1Y3REaXN0YW5jZSh2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqKZ8BMWhuc3dsaWI6OlNwYWNlSW50ZXJmYWNlPGZsb2F0Pjo6flNwYWNlSW50ZXJmYWNlKCmgATplbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yOjpvcGVyYXRvcigpKHVuc2lnbmVkIGxvbmcpoQE3ZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3Rvcjo6fkN1c3RvbUZpbHRlckZ1bmN0b3IoKaIBOWVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3I6On5DdXN0b21GaWx0ZXJGdW5jdG9yKCkuMaMBTGhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+OjphZGRQb2ludCh2b2lkIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgYm9vbCmkAWpobnN3bGliOjpCcnV0ZWZvcmNlU2VhcmNoPGZsb2F0Pjo6c2VhcmNoS25uKHZvaWQgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBobnN3bGliOjpCYXNlRmlsdGVyRnVuY3RvciopIGNvbnN0pQGVAnN0ZDo6X18yOjpwcmlvcml0eV9xdWV1ZTxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPj4+LCBzdGQ6Ol9fMjo6bGVzczxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4+Pjo6cHVzaChzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4mJimmAXdobnN3bGliOjpBbGdvcml0aG1JbnRlcmZhY2U8ZmxvYXQ+OjpzZWFyY2hLbm5DbG9zZXJGaXJzdCh2b2lkIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgaG5zd2xpYjo6QmFzZUZpbHRlckZ1bmN0b3IqKSBjb25zdKcBiAFobnN3bGliOjpCcnV0ZWZvcmNlU2VhcmNoPGZsb2F0Pjo6c2F2ZUluZGV4KHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpqAG2AXN0ZDo6X18yOjpiYXNpY19vZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpiYXNpY19vZnN0cmVhbShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpqQFOc3RkOjpfXzI6OmJhc2ljX29mc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vZnN0cmVhbSgpqgE1aG5zd2xpYjo6QnJ1dGVmb3JjZVNlYXJjaDxmbG9hdD46On5CcnV0ZWZvcmNlU2VhcmNoKCmrATdobnN3bGliOjpCcnV0ZWZvcmNlU2VhcmNoPGZsb2F0Pjo6fkJydXRlZm9yY2VTZWFyY2goKS4xrAGvBHZvaWQgc3RkOjpfXzI6Ol9faGFzaF90YWJsZTxzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjpfX3Vub3JkZXJlZF9tYXBfaGFzaGVyPHVuc2lnbmVkIGxvbmcsIHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgdHJ1ZT4sIHN0ZDo6X18yOjpfX3Vub3JkZXJlZF9tYXBfZXF1YWw8dW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6ZXF1YWxfdG88dW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjpoYXNoPHVuc2lnbmVkIGxvbmc+LCB0cnVlPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4+Pjo6X19kb19yZWhhc2g8dHJ1ZT4odW5zaWduZWQgbG9uZymtAbYBc3RkOjpfXzI6OmJhc2ljX2lmc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmJhc2ljX2lmc3RyZWFtKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCmuAU5zdGQ6Ol9fMjo6YmFzaWNfaWZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lmc3RyZWFtKCmvAZABc3RkOjpfXzI6Ol9fdHJhbnNhY3Rpb248c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bXV0ZXgsIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Om11dGV4Pj46Ol9fZGVzdHJveV92ZWN0b3I+Ojp+X190cmFuc2FjdGlvblthYmk6djE1MDA3XSgpsAEzaG5zd2xpYjo6VmlzaXRlZExpc3RQb29sOjpWaXNpdGVkTGlzdFBvb2woaW50LCBpbnQpsQFec3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bXV0ZXgsIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Om11dGV4Pj46On52ZWN0b3JbYWJpOnYxNTAwN10oKbIBanN0ZDo6X18yOjpkZXF1ZTxobnN3bGliOjpWaXNpdGVkTGlzdCosIHN0ZDo6X18yOjphbGxvY2F0b3I8aG5zd2xpYjo6VmlzaXRlZExpc3QqPj46Ol9fYWRkX2Zyb250X2NhcGFjaXR5KCmzAWpzdGQ6Ol9fMjo6X19kZXF1ZV9iYXNlPGhuc3dsaWI6OlZpc2l0ZWRMaXN0Kiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxobnN3bGliOjpWaXNpdGVkTGlzdCo+Pjo6fl9fZGVxdWVfYmFzZSgptAFLaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6YWRkUG9pbnQodm9pZCBjb25zdCosIHVuc2lnbmVkIGxvbmcsIGJvb2wptQFKaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6YWRkUG9pbnQodm9pZCBjb25zdCosIHVuc2lnbmVkIGxvbmcsIGludCm2AURobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+Ojp1bm1hcmtEZWxldGVkSW50ZXJuYWwodW5zaWduZWQgaW50KbcBTmhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnVwZGF0ZVBvaW50KHZvaWQgY29uc3QqLCB1bnNpZ25lZCBpbnQsIGZsb2F0KbgBaWhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnNlYXJjaEtubih2b2lkIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgaG5zd2xpYjo6QmFzZUZpbHRlckZ1bmN0b3IqKSBjb25zdLkBhwFobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpzYXZlSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Jim6ATNobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+Ojp+SGllcmFyY2hpY2FsTlNXKCm7ASxobnN3bGliOjpWaXNpdGVkTGlzdFBvb2w6On5WaXNpdGVkTGlzdFBvb2woKbwBNWhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46On5IaWVyYXJjaGljYWxOU1coKS4xvQGIAXN0ZDo6X18yOjpfX3NwbGl0X2J1ZmZlcjxobnN3bGliOjpWaXNpdGVkTGlzdCoqLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGhuc3dsaWI6OlZpc2l0ZWRMaXN0Kio+Pjo6cHVzaF9mcm9udChobnN3bGliOjpWaXNpdGVkTGlzdCoqIGNvbnN0Jim+AVBobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpzZWFyY2hCYXNlTGF5ZXIodW5zaWduZWQgaW50LCB2b2lkIGNvbnN0KiwgaW50Kb8BmwJ2b2lkIHN0ZDo6X18yOjpwcmlvcml0eV9xdWV1ZTxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgaW50Piwgc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgaW50Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgaW50Pj4+LCBobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpDb21wYXJlQnlGaXJzdD46OmVtcGxhY2U8ZmxvYXQsIHVuc2lnbmVkIGludCY+KGZsb2F0JiYsIHVuc2lnbmVkIGludCYpwAHCAmhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46Om11dHVhbGx5Q29ubmVjdE5ld0VsZW1lbnQodm9pZCBjb25zdCosIHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OnByaW9yaXR5X3F1ZXVlPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+Pj4sIGhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OkNvbXBhcmVCeUZpcnN0PiYsIGludCwgYm9vbCnBAW5obnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpyZXBhaXJDb25uZWN0aW9uc0ZvclVwZGF0ZSh2b2lkIGNvbnN0KiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIGludCwgaW50KcIBzAJzdGQ6Ol9fMjo6cGFpcjxzdGQ6Ol9fMjo6X19oYXNoX2l0ZXJhdG9yPHN0ZDo6X18yOjpfX2hhc2hfbm9kZTx1bnNpZ25lZCBpbnQsIHZvaWQqPio+LCBib29sPiBzdGQ6Ol9fMjo6X19oYXNoX3RhYmxlPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgaW50Piwgc3RkOjpfXzI6OmVxdWFsX3RvPHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8dW5zaWduZWQgaW50Pj46Ol9fZW1wbGFjZV91bmlxdWVfa2V5X2FyZ3M8dW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQgY29uc3QmPih1bnNpZ25lZCBpbnQgY29uc3QmLCB1bnNpZ25lZCBpbnQgY29uc3QmKcMBqgJobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpnZXROZWlnaGJvcnNCeUhldXJpc3RpYzIoc3RkOjpfXzI6OnByaW9yaXR5X3F1ZXVlPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+Pj4sIGhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OkNvbXBhcmVCeUZpcnN0PiYsIHVuc2lnbmVkIGxvbmcpxAEuaG5zd2xpYjo6VmlzaXRlZExpc3RQb29sOjpnZXRGcmVlVmlzaXRlZExpc3QoKcUBtwFobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+Ojpsb2FkSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgaG5zd2xpYjo6U3BhY2VJbnRlcmZhY2U8ZmxvYXQ+KiwgdW5zaWduZWQgbG9uZynGAfcBc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj4gZW1zY3JpcHRlbjo6dmVjRnJvbUpTQXJyYXk8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+PihlbXNjcmlwdGVuOjp2YWwgY29uc3QmKccBggFzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBlbXNjcmlwdGVuOjp2ZWNGcm9tSlNBcnJheTx1bnNpZ25lZCBpbnQ+KGVtc2NyaXB0ZW46OnZhbCBjb25zdCYpyAGmAXN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Pj4+Ojp+dmVjdG9yW2FiaTp2MTUwMDddKCnJAZwBZW1zY3JpcHRlbjo6aW50ZXJuYWw6OkJpbmRpbmdUeXBlPHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4+LCB2b2lkPjo6dG9XaXJlVHlwZShzdGQ6Ol9fMjo6dmVjdG9yPGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxpbnQ+PiBjb25zdCYpygFCaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6bWFya0RlbGV0ZWRJbnRlcm5hbCh1bnNpZ25lZCBpbnQpywENX19nZXRUeXBlTmFtZcwBG19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5nc80BFWVtYmluZF9pbml0X2J1aWx0aW4oKc4BCF9fbWVtY3B5zwEHbWVtbW92ZdABBm1lbXNldNEBA2xvZ9IBBm1lbWNoctMBBm1lbWNtcNQBBnN0cmxlbtUBEF9fZXJybm9fbG9jYXRpb27WAQhkbG1hbGxvY9cBBmRsZnJlZdgBCWRscmVhbGxvY9kBDWRpc3Bvc2VfY2h1bmvaAQRzYnJr2wElc3RkOjpfXzI6Ol9fbmV4dF9wcmltZSh1bnNpZ25lZCBsb25nKdwBmQF1bnNpZ25lZCBpbnQgY29uc3QqIHN0ZDo6X18yOjpsb3dlcl9ib3VuZFthYmk6djE1MDA3XTx1bnNpZ25lZCBpbnQgY29uc3QqLCB1bnNpZ25lZCBsb25nPih1bnNpZ25lZCBpbnQgY29uc3QqLCB1bnNpZ25lZCBpbnQgY29uc3QqLCB1bnNpZ25lZCBsb25nIGNvbnN0JindATlzdGQ6Ol9fMjo6X190aHJvd19vdmVyZmxvd19lcnJvclthYmk6djE1MDA3XShjaGFyIGNvbnN0KineAWR1bnNpZ25lZCBpbnQgY29uc3QmIHN0ZDo6X18yOjpfX2lkZW50aXR5OjpvcGVyYXRvcigpPHVuc2lnbmVkIGludCBjb25zdCY+KHVuc2lnbmVkIGludCBjb25zdCYpIGNvbnN03wELX19zdHJjaHJudWzgAQZzdHJjaHLhAQxfX3N0ZGlvX3NlZWviAQ1fX3N0ZGlvX3dyaXRl4wEMX19zdGRpb19yZWFk5AENX19zdGRpb19jbG9zZeUBFWVtc2NyaXB0ZW5fZnV0ZXhfd2FrZeYBFF9fcHRocmVhZF9tdXRleF9sb2Nr5wEKX19sb2NrZmlsZegBEV9fZnNlZWtvX3VubG9ja2Vk6QEIX19mc2Vla2/qAQZmZmx1c2jrAQZmY2xvc2XsAQhfX3RvcmVhZO0BBWZyZWFk7gEJX190b3dyaXRl7wEJX19md3JpdGV48AEGZndyaXRl8QERX19mdGVsbG9fdW5sb2NrZWTyAURzdGQ6Ol9fMjo6YmFzaWNfaW9zPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19pb3MoKfMBUHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX3N0cmVhbWJ1Zigp9AFSc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfc3RyZWFtYnVmKCkuMfUBXHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6aW1idWUoc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYp9gFRc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZXRidWYoY2hhciosIGxvbmcp9wF7c3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZWVrb2ZmKGxvbmcgbG9uZywgc3RkOjpfXzI6Omlvc19iYXNlOjpzZWVrZGlyLCB1bnNpZ25lZCBpbnQp+AFwc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZWVrcG9zKHN0ZDo6X18yOjpmcG9zPF9fbWJzdGF0ZV90PiwgdW5zaWduZWQgaW50KfkBUXN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6eHNnZXRuKGNoYXIqLCBsb25nKfoBRHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPjo6Y29weShjaGFyKiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcp+wG6AXN0ZDo6X18yOjplbmFibGVfaWY8X19pc19jcHAxN19yYW5kb21fYWNjZXNzX2l0ZXJhdG9yPGNoYXIgY29uc3QqPjo6dmFsdWUsIGNoYXIqPjo6dHlwZSBzdGQ6Ol9fMjo6Y29weV9uW2FiaTp2MTUwMDddPGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBjaGFyKj4oY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcsIGNoYXIqKfwBSXN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6dW5kZXJmbG93KCn9AUVzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnVmbG93KCn+AUxzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnBiYWNrZmFpbChpbnQp/wFXc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp4c3B1dG4oY2hhciBjb25zdCosIGxvbmcpgAJMc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lzdHJlYW0oKYECTnN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19pc3RyZWFtKCkuMYICXXZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lzdHJlYW0oKYMCTnN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19pc3RyZWFtKCkuMoQCX3ZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lzdHJlYW0oKS4xhQKNAXN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNlbnRyeTo6c2VudHJ5KHN0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mLCBib29sKYYCQ3N0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmZsdXNoKCmHAmxzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXRbYWJpOnYxNTAwN108c3RkOjpfXzI6OmN0eXBlPGNoYXI+PihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimIAlpzdGQ6Ol9fMjo6YmFzaWNfaW9zPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNldHN0YXRlW2FiaTp2MTUwMDddKHVuc2lnbmVkIGludCmJAtoBYm9vbCBzdGQ6Ol9fMjo6b3BlcmF0b3I9PVthYmk6djE1MDA3XTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4gY29uc3QmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+IGNvbnN0JimKAlpzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpvcGVyYXRvcisrW2FiaTp2MTUwMDddKCmLAlJzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNidW1wY1thYmk6djE1MDA3XSgpjAJNc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6cmVhZChjaGFyKiwgbG9uZymNAkNzdGQ6Ol9fMjo6YmFzaWNfaXN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp0ZWxsZygpjgJpc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2Vla2cobG9uZyBsb25nLCBzdGQ6Ol9fMjo6aW9zX2Jhc2U6OnNlZWtkaXIpjwJOc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX29zdHJlYW0oKS4xkAJddmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb3N0cmVhbSgpkQJOc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX29zdHJlYW0oKS4ykgJfdmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb3N0cmVhbSgpLjGTAocBc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2VudHJ5OjpzZW50cnkoc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYplAJNc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2VudHJ5Ojp+c2VudHJ5KCmVAl1zdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpvcGVyYXRvcj1bYWJpOnYxNTAwN10oY2hhcimWAlRzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp3cml0ZShjaGFyIGNvbnN0KiwgbG9uZymXAk1zdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD46OmNvcHkod2NoYXJfdCosIHdjaGFyX3QgY29uc3QqLCB1bnNpZ25lZCBsb25nKZgCcnN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYgc3RkOjpfXzI6OnVzZV9mYWNldFthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4+KHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKZkC7AFib29sIHN0ZDo6X18yOjpvcGVyYXRvcj09W2FiaTp2MTUwMDddPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiBjb25zdCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4gY29uc3QmKZoCYHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj46Om9wZXJhdG9yKytbYWJpOnYxNTAwN10oKZsCWHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pjo6c2J1bXBjW2FiaTp2MTUwMDddKCmcAmZzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+OjpvcGVyYXRvcj1bYWJpOnYxNTAwN10od2NoYXJfdCmdAlZzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmdwdHJbYWJpOnYxNTAwN10oKSBjb25zdJ4CwwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Om9wZXJhdG9yPVthYmk6djE1MDA3XShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4mJimfArwBc3RkOjpfXzI6OmVuYWJsZV9pZjxfX2lzX2NwcDE3X2ZvcndhcmRfaXRlcmF0b3I8Y2hhcio+Ojp2YWx1ZSwgdm9pZD46OnR5cGUgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpfX2luaXQ8Y2hhcio+KGNoYXIqLCBjaGFyKimgAndzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OnJlc2l6ZVthYmk6djE1MDA3XSh1bnNpZ25lZCBsb25nKaECW3N0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46Om9wZW4oY2hhciBjb25zdCosIHVuc2lnbmVkIGludCmiAktzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpiYXNpY19maWxlYnVmKCmjApYBc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhciwgY2hhciwgX19tYnN0YXRlX3Q+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIsIGNoYXIsIF9fbWJzdGF0ZV90Pj4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYppAJMc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2ZpbGVidWYoKaUCQ3N0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmNsb3NlKCmmAtQBc3RkOjpfXzI6OnVuaXF1ZV9wdHI8X0lPX0ZJTEUsIGludCAoKikoX0lPX0ZJTEUqKT46OnVuaXF1ZV9wdHJbYWJpOnYxNTAwN108dHJ1ZSwgdm9pZD4oX0lPX0ZJTEUqLCBzdGQ6Ol9fMjo6X19kZXBlbmRlbnRfdHlwZTxzdGQ6Ol9fMjo6X191bmlxdWVfcHRyX2RlbGV0ZXJfc2ZpbmFlPGludCAoKikoX0lPX0ZJTEUqKT4sIHRydWU+OjpfX2dvb2RfcnZhbF9yZWZfdHlwZSmnAk5zdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfZmlsZWJ1ZigpLjGoAlBzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxfSU9fRklMRSwgaW50ICgqKShfSU9fRklMRSopPjo6cmVzZXRbYWJpOnYxNTAwN10oX0lPX0ZJTEUqKakCR3N0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnVuZGVyZmxvdygpqgIoc3RkOjpfXzI6Ol9fdGhyb3dfYmFkX2Nhc3RbYWJpOnYxNTAwN10oKasCSnN0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnBiYWNrZmFpbChpbnQprAJJc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6b3ZlcmZsb3coaW50Ka0CT3N0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNldGJ1ZihjaGFyKiwgbG9uZymuAnlzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZWVrb2ZmKGxvbmcgbG9uZywgc3RkOjpfXzI6Omlvc19iYXNlOjpzZWVrZGlyLCB1bnNpZ25lZCBpbnQprwJuc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2Vla3BvcyhzdGQ6Ol9fMjo6ZnBvczxfX21ic3RhdGVfdD4sIHVuc2lnbmVkIGludCmwAkJzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzeW5jKCmxAlpzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjppbWJ1ZShzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimyAlBzdGQ6Ol9fMjo6YmFzaWNfaWZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lmc3RyZWFtKCkuMbMCX3ZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX2lmc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19pZnN0cmVhbSgptAJhdmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfaWZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lmc3RyZWFtKCkuMbUCUHN0ZDo6X18yOjpiYXNpY19vZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb2ZzdHJlYW0oKS4xtgJfdmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfb2ZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX29mc3RyZWFtKCm3AmF2aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19vZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb2ZzdHJlYW0oKS4xuAJVY2hhciogc3RkOjpfXzI6OmNvcHlbYWJpOnYxNTAwN108Y2hhciBjb25zdCosIGNoYXIqPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIqKbkCXWF1dG8gc3RkOjpfXzI6Ol9fdW53cmFwX3JhbmdlW2FiaTp2MTUwMDddPGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0Kj4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqKboCfXN0ZDo6X18yOjpwYWlyPGNoYXIgY29uc3QqLCBjaGFyKj4gc3RkOjpfXzI6Ol9fY29weV9pbXBsW2FiaTp2MTUwMDddPGNoYXIgY29uc3QsIGNoYXIsIHZvaWQ+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciopuwJ/c3RkOjpfXzI6OmFsbG9jYXRvcl90cmFpdHM8c3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmRlYWxsb2NhdGVbYWJpOnYxNTAwN10oc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiYsIGNoYXIqLCB1bnNpZ25lZCBsb25nKbwCTnN0ZDo6X18yOjpfX2xpYmNwcF9kZWFsbG9jYXRlW2FiaTp2MTUwMDddKHZvaWQqLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKb0CzQFzdGQ6Ol9fMjo6X19hbGxvY2F0aW9uX3Jlc3VsdDxzdGQ6Ol9fMjo6YWxsb2NhdG9yX3RyYWl0czxzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6cG9pbnRlcj4gc3RkOjpfXzI6Ol9fYWxsb2NhdGVfYXRfbGVhc3RbYWJpOnYxNTAwN108c3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4oc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPiYsIHVuc2lnbmVkIGxvbmcpvgI+c3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPjo6YWxsb2NhdGVbYWJpOnYxNTAwN10odW5zaWduZWQgbG9uZym/AkVzdGQ6Ol9fMjo6X19saWJjcHBfYWxsb2NhdGVbYWJpOnYxNTAwN10odW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZynAAmRzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpfX3Rlc3RfZm9yX2VvZlthYmk6djE1MDA3XSgpIGNvbnN0wQJqc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pjo6X190ZXN0X2Zvcl9lb2ZbYWJpOnYxNTAwN10oKSBjb25zdMICK3N0ZDo6X18yOjpfX2lvc3RyZWFtX2NhdGVnb3J5OjpuYW1lKCkgY29uc3TDAjFzdGQ6Ol9fMjo6X19pb3N0cmVhbV9jYXRlZ29yeTo6bWVzc2FnZShpbnQpIGNvbnN0xAInc3RkOjpfXzI6Omlvc19iYXNlOjpmYWlsdXJlOjp+ZmFpbHVyZSgpxQIpc3RkOjpfXzI6Omlvc19iYXNlOjpmYWlsdXJlOjp+ZmFpbHVyZSgpLjHGAidzdGQ6Ol9fMjo6aW9zX2Jhc2U6OmNsZWFyKHVuc2lnbmVkIGludCnHAh9zdGQ6Ol9fMjo6aW9zX2Jhc2U6On5pb3NfYmFzZSgpyAIhc3RkOjpfXzI6Omlvc19iYXNlOjp+aW9zX2Jhc2UoKS4xyQIfc3RkOjpfXzI6Omlvc19iYXNlOjppbml0KHZvaWQqKcoCN3N0ZDo6X18yOjppb3NfYmFzZTo6X19zZXRfYmFkYml0X2FuZF9jb25zaWRlcl9yZXRocm93KCnLAgdfX3NobGltzAIIX19zaGdldGPNAglfX2FzaGx0aTPOAgtfX2Zsb2F0c2l0Zs8CCV9fbHNocnRpM9ACCF9fbXVsdGYz0QIIX19hZGR0ZjPSAg1fX2V4dGVuZGRmdGYy0wIHX19sZXRmMtQCB19fZ2V0ZjLVAgZzY2FsYm7WAgljb3B5c2lnbmzXAg1fX2Zsb2F0dW5zaXRm2AIIX19zdWJ0ZjPZAgdzY2FsYm5s2gIIX19tdWx0aTPbAghfX2RpdnRmM9wCBWZtb2Rs3QILX19mbG9hdHNjYW7eAgdzY2FuZXhw3wIMX190cnVuY3Rmc2Yy4AIMX190cnVuY3RmZGYy4QIHbWJydG93Y+ICCXN0b3JlX2ludOMCB3Zzc2NhbmbkAgtzdHJpbmdfcmVhZOUCBnN0cmNtcOYCBXN3YXBj5wIHc3RybmNtcOgCBmdldGVudukCDF9fZ2V0X2xvY2FsZeoCB3djcnRvbWLrAgZ3Y3RvbWLsAgVmcmV4cO0CC3ByaW50Zl9jb3Jl7gIDb3V07wIGZ2V0aW508AIHcG9wX2FyZ/ECBWZtdF918gIDcGFk8wIIdmZwcmludGb0AgZmbXRfZnD1AhNwb3BfYXJnX2xvbmdfZG91Ymxl9gIJdnNucHJpbnRm9wIIc25fd3JpdGX4AgZzc2Nhbmb5AghzbnByaW50ZvoCCmZyZWVsb2NhbGX7AgZzdHJjcHn8AgZ3Y3NsZW79AgltYnNydG93Y3P+AgZzdHJ0b3j/AghzdHJ0b3guMYADXXN0ZDo6X18yOjpjb2xsYXRlPGNoYXI+Ojpkb19jb21wYXJlKGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqKSBjb25zdIEDRXN0ZDo6X18yOjpjb2xsYXRlPGNoYXI+Ojpkb190cmFuc2Zvcm0oY2hhciBjb25zdCosIGNoYXIgY29uc3QqKSBjb25zdIIDmwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmJhc2ljX3N0cmluZ1thYmk6djE1MDA3XTxjaGFyIGNvbnN0Kiwgdm9pZD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqKYMDQHN0ZDo6X18yOjpjb2xsYXRlPGNoYXI+Ojpkb19oYXNoKGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KikgY29uc3SEA2xzdGQ6Ol9fMjo6Y29sbGF0ZTx3Y2hhcl90Pjo6ZG9fY29tcGFyZSh3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3SFA05zdGQ6Ol9fMjo6Y29sbGF0ZTx3Y2hhcl90Pjo6ZG9fdHJhbnNmb3JtKHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3SGA+kBc3RkOjpfXzI6OmVuYWJsZV9pZjxfX2lzX2NwcDE3X2ZvcndhcmRfaXRlcmF0b3I8d2NoYXJfdCBjb25zdCo+Ojp2YWx1ZSwgdm9pZD46OnR5cGUgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjpfX2luaXQ8d2NoYXJfdCBjb25zdCo+KHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KimHA0lzdGQ6Ol9fMjo6Y29sbGF0ZTx3Y2hhcl90Pjo6ZG9faGFzaCh3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCopIGNvbnN0iAOWAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgYm9vbCYpIGNvbnN0iQNyc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjpudW1wdW5jdDxjaGFyPj4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpigOcBXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCogc3RkOjpfXzI6Ol9fc2Nhbl9rZXl3b3JkPHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTxjaGFyPj4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCosIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYsIHVuc2lnbmVkIGludCYsIGJvb2wpiwM4c3RkOjpfXzI6OmxvY2FsZTo6dXNlX2ZhY2V0KHN0ZDo6X18yOjpsb2NhbGU6OmlkJikgY29uc3SMA1dzdGQ6Ol9fMjo6dW5pcXVlX3B0cjx1bnNpZ25lZCBjaGFyLCB2b2lkICgqKSh2b2lkKik+OjpyZXNldFthYmk6djE1MDA3XSh1bnNpZ25lZCBjaGFyKimNA09zdGQ6Ol9fMjo6dW5pcXVlX3B0cjx1bnNpZ25lZCBjaGFyLCB2b2lkICgqKSh2b2lkKik+Ojp+dW5pcXVlX3B0clthYmk6djE1MDA3XSgpjgOWAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyYpIGNvbnN0jwM5c3RkOjpfXzI6Ol9fbnVtX2dldF9iYXNlOjpfX2dldF9iYXNlKHN0ZDo6X18yOjppb3NfYmFzZSYpkANIc3RkOjpfXzI6Ol9fbnVtX2dldDxjaGFyPjo6X19zdGFnZTJfaW50X3ByZXAoc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciYpkQPkAXN0ZDo6X18yOjpfX251bV9nZXQ8Y2hhcj46Ol9fc3RhZ2UyX2ludF9sb29wKGNoYXIsIGludCwgY2hhciosIGNoYXIqJiwgdW5zaWduZWQgaW50JiwgY2hhciwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgaW50KiwgdW5zaWduZWQgaW50KiYsIGNoYXIgY29uc3QqKZIDXGxvbmcgc3RkOjpfXzI6Ol9fbnVtX2dldF9zaWduZWRfaW50ZWdyYWw8bG9uZz4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmLCBpbnQpkwOkAXN0ZDo6X18yOjpfX2NoZWNrX2dyb3VwaW5nKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCosIHVuc2lnbmVkIGludCosIHVuc2lnbmVkIGludCYplAObAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBsb25nJikgY29uc3SVA2Zsb25nIGxvbmcgc3RkOjpfXzI6Ol9fbnVtX2dldF9zaWduZWRfaW50ZWdyYWw8bG9uZyBsb25nPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYsIGludCmWA6ACc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBzaG9ydCYpIGNvbnN0lwNydW5zaWduZWQgc2hvcnQgc3RkOjpfXzI6Ol9fbnVtX2dldF91bnNpZ25lZF9pbnRlZ3JhbDx1bnNpZ25lZCBzaG9ydD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmLCBpbnQpmAOeAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdW5zaWduZWQgaW50JikgY29uc3SZA251bnNpZ25lZCBpbnQgc3RkOjpfXzI6Ol9fbnVtX2dldF91bnNpZ25lZF9pbnRlZ3JhbDx1bnNpZ25lZCBpbnQ+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JiwgaW50KZoDpAJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIGxvbmcgbG9uZyYpIGNvbnN0mwN6dW5zaWduZWQgbG9uZyBsb25nIHN0ZDo6X18yOjpfX251bV9nZXRfdW5zaWduZWRfaW50ZWdyYWw8dW5zaWduZWQgbG9uZyBsb25nPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYsIGludCmcA5cCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBmbG9hdCYpIGNvbnN0nQNYc3RkOjpfXzI6Ol9fbnVtX2dldDxjaGFyPjo6X19zdGFnZTJfZmxvYXRfcHJlcChzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyKiwgY2hhciYsIGNoYXImKZ4D7wFzdGQ6Ol9fMjo6X19udW1fZ2V0PGNoYXI+OjpfX3N0YWdlMl9mbG9hdF9sb29wKGNoYXIsIGJvb2wmLCBjaGFyJiwgY2hhciosIGNoYXIqJiwgY2hhciwgY2hhciwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgaW50KiwgdW5zaWduZWQgaW50KiYsIHVuc2lnbmVkIGludCYsIGNoYXIqKZ8DT2Zsb2F0IHN0ZDo6X18yOjpfX251bV9nZXRfZmxvYXQ8ZmxvYXQ+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JimgA5gCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBkb3VibGUmKSBjb25zdKEDUWRvdWJsZSBzdGQ6Ol9fMjo6X19udW1fZ2V0X2Zsb2F0PGRvdWJsZT4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmKaIDnQJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgZG91YmxlJikgY29uc3SjA1tsb25nIGRvdWJsZSBzdGQ6Ol9fMjo6X19udW1fZ2V0X2Zsb2F0PGxvbmcgZG91YmxlPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYppAOXAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50Jiwgdm9pZComKSBjb25zdKUDEnN0ZDo6X18yOjpfX2Nsb2MoKaYDTHN0ZDo6X18yOjpfX2xpYmNwcF9zc2NhbmZfbChjaGFyIGNvbnN0KiwgX19sb2NhbGVfc3RydWN0KiwgY2hhciBjb25zdCosIC4uLimnA2BjaGFyIGNvbnN0KiBzdGQ6Ol9fMjo6ZmluZFthYmk6djE1MDA3XTxjaGFyIGNvbnN0KiwgY2hhcj4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0JimoA1VzdGQ6Ol9fMjo6X19saWJjcHBfbG9jYWxlX2d1YXJkOjpfX2xpYmNwcF9sb2NhbGVfZ3VhcmRbYWJpOnYxNTAwN10oX19sb2NhbGVfc3RydWN0KiYpqQOrAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgYm9vbCYpIGNvbnN0qgN4c3RkOjpfXzI6Om51bXB1bmN0PHdjaGFyX3Q+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pj4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpqwPYBXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCogc3RkOjpfXzI6Ol9fc2Nhbl9rZXl3b3JkPHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pj4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCosIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYsIHVuc2lnbmVkIGludCYsIGJvb2wprAOrAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyYpIGNvbnN0rQNNc3RkOjpfXzI6Ol9fbnVtX2dldDx3Y2hhcl90Pjo6X19kb193aWRlbihzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90KikgY29uc3SuA05zdGQ6Ol9fMjo6X19udW1fZ2V0PHdjaGFyX3Q+OjpfX3N0YWdlMl9pbnRfcHJlcChzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90JimvA/ABc3RkOjpfXzI6Ol9fbnVtX2dldDx3Y2hhcl90Pjo6X19zdGFnZTJfaW50X2xvb3Aod2NoYXJfdCwgaW50LCBjaGFyKiwgY2hhciomLCB1bnNpZ25lZCBpbnQmLCB3Y2hhcl90LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgd2NoYXJfdCBjb25zdCopsAOwAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBsb25nJikgY29uc3SxA7UCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBzaG9ydCYpIGNvbnN0sgOzAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdW5zaWduZWQgaW50JikgY29uc3SzA7kCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBsb25nIGxvbmcmKSBjb25zdLQDrAJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGZsb2F0JikgY29uc3S1A2RzdGQ6Ol9fMjo6X19udW1fZ2V0PHdjaGFyX3Q+OjpfX3N0YWdlMl9mbG9hdF9wcmVwKHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QqLCB3Y2hhcl90Jiwgd2NoYXJfdCYptgP+AXN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fc3RhZ2UyX2Zsb2F0X2xvb3Aod2NoYXJfdCwgYm9vbCYsIGNoYXImLCBjaGFyKiwgY2hhciomLCB3Y2hhcl90LCB3Y2hhcl90LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgdW5zaWduZWQgaW50Jiwgd2NoYXJfdCoptwOtAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgZG91YmxlJikgY29uc3S4A7ICc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nIGRvdWJsZSYpIGNvbnN0uQOsAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50Jiwgdm9pZComKSBjb25zdLoDcndjaGFyX3QgY29uc3QqIHN0ZDo6X18yOjpmaW5kW2FiaTp2MTUwMDddPHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90Pih3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QmKbsDygFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGJvb2wpIGNvbnN0vANpc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpiZWdpblthYmk6djE1MDA3XSgpvQNnc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjplbmRbYWJpOnYxNTAwN10oKb4DygFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGxvbmcpIGNvbnN0vwNOc3RkOjpfXzI6Ol9fbnVtX3B1dF9iYXNlOjpfX2Zvcm1hdF9pbnQoY2hhciosIGNoYXIgY29uc3QqLCBib29sLCB1bnNpZ25lZCBpbnQpwANXc3RkOjpfXzI6Ol9fbGliY3BwX3NucHJpbnRmX2woY2hhciosIHVuc2lnbmVkIGxvbmcsIF9fbG9jYWxlX3N0cnVjdCosIGNoYXIgY29uc3QqLCAuLi4pwQNVc3RkOjpfXzI6Ol9fbnVtX3B1dF9iYXNlOjpfX2lkZW50aWZ5X3BhZGRpbmcoY2hhciosIGNoYXIqLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UgY29uc3QmKcIDdXN0ZDo6X18yOjpfX251bV9wdXQ8Y2hhcj46Ol9fd2lkZW5fYW5kX2dyb3VwX2ludChjaGFyKiwgY2hhciosIGNoYXIqLCBjaGFyKiwgY2hhciomLCBjaGFyKiYsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKcMDggJzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+IHN0ZDo6X18yOjpfX3BhZF9hbmRfb3V0cHV0PGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0Kiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhcinEA88Bc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBsb25nIGxvbmcpIGNvbnN0xQPTAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgdW5zaWduZWQgbG9uZykgY29uc3TGA9gBc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCB1bnNpZ25lZCBsb25nIGxvbmcpIGNvbnN0xwPMAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgZG91YmxlKSBjb25zdMgDvwJzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+IHN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+OjpfX2RvX3B1dF9mbG9hdGluZ19wb2ludFthYmk6djE1MDA3XTxkb3VibGU+KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGRvdWJsZSwgY2hhciBjb25zdCopIGNvbnN0yQNKc3RkOjpfXzI6Ol9fbnVtX3B1dF9iYXNlOjpfX2Zvcm1hdF9mbG9hdChjaGFyKiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCnKA0lzdGQ6Ol9fMjo6X19saWJjcHBfYXNwcmludGZfbChjaGFyKiosIF9fbG9jYWxlX3N0cnVjdCosIGNoYXIgY29uc3QqLCAuLi4pywN3c3RkOjpfXzI6Ol9fbnVtX3B1dDxjaGFyPjo6X193aWRlbl9hbmRfZ3JvdXBfZmxvYXQoY2hhciosIGNoYXIqLCBjaGFyKiwgY2hhciosIGNoYXIqJiwgY2hhciomLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JinMA9EBc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBsb25nIGRvdWJsZSkgY29uc3TNA8kCc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiBzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6X19kb19wdXRfZmxvYXRpbmdfcG9pbnRbYWJpOnYxNTAwN108bG9uZyBkb3VibGU+KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGxvbmcgZG91YmxlLCBjaGFyIGNvbnN0KikgY29uc3TOA9EBc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCB2b2lkIGNvbnN0KikgY29uc3TPA4MBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpiYXNpY19zdHJpbmdbYWJpOnYxNTAwN10odW5zaWduZWQgbG9uZywgY2hhcinQA9wBc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBib29sKSBjb25zdNEDcHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6ZW5kW2FiaTp2MTUwMDddKCnSA9wBc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBsb25nKSBjb25zdNMDgQFzdGQ6Ol9fMjo6X19udW1fcHV0PHdjaGFyX3Q+OjpfX3dpZGVuX2FuZF9ncm91cF9pbnQoY2hhciosIGNoYXIqLCBjaGFyKiwgd2NoYXJfdCosIHdjaGFyX3QqJiwgd2NoYXJfdComLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JinUA6ACc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiBzdGQ6Ol9fMjo6X19wYWRfYW5kX291dHB1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3Qp1QPhAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgbG9uZyBsb25nKSBjb25zdNYD5QFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIHVuc2lnbmVkIGxvbmcpIGNvbnN01wPqAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgdW5zaWduZWQgbG9uZyBsb25nKSBjb25zdNgD3gFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGRvdWJsZSkgY29uc3TZA9cCc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiBzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6X19kb19wdXRfZmxvYXRpbmdfcG9pbnRbYWJpOnYxNTAwN108ZG91YmxlPihzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBkb3VibGUsIGNoYXIgY29uc3QqKSBjb25zdNoDgwFzdGQ6Ol9fMjo6X19udW1fcHV0PHdjaGFyX3Q+OjpfX3dpZGVuX2FuZF9ncm91cF9mbG9hdChjaGFyKiwgY2hhciosIGNoYXIqLCB3Y2hhcl90Kiwgd2NoYXJfdComLCB3Y2hhcl90KiYsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKdsD4wFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGxvbmcgZG91YmxlKSBjb25zdNwD4QJzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+IHN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpfX2RvX3B1dF9mbG9hdGluZ19wb2ludFthYmk6djE1MDA3XTxsb25nIGRvdWJsZT4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgbG9uZyBkb3VibGUsIGNoYXIgY29uc3QqKSBjb25zdN0D4wFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIHZvaWQgY29uc3QqKSBjb25zdN4DjwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46OmJhc2ljX3N0cmluZ1thYmk6djE1MDA3XSh1bnNpZ25lZCBsb25nLCB3Y2hhcl90Kd8DN3ZvaWQgc3RkOjpfXzI6OnJldmVyc2VbYWJpOnYxNTAwN108Y2hhcio+KGNoYXIqLCBjaGFyKingA0B2b2lkIHN0ZDo6X18yOjpyZXZlcnNlW2FiaTp2MTUwMDddPHdjaGFyX3QqPih3Y2hhcl90Kiwgd2NoYXJfdCop4QOsAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6Z2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqKSBjb25zdOIDcXN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZGF0ZV9vcmRlcigpIGNvbnN04wOaAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0X3RpbWUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdOQDmgJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldF9kYXRlKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TlA50Cc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXRfd2Vla2RheShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN05gOrAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6X19nZXRfd2Vla2RheW5hbWUoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYpIGNvbnN05wOfAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0X21vbnRobmFtZShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN06AOpAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6X19nZXRfbW9udGhuYW1lKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmKSBjb25zdOkDmgJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldF95ZWFyKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TqA6QCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+OjpfX2dldF95ZWFyKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmKSBjb25zdOsDoQJpbnQgc3RkOjpfXzI6Ol9fZ2V0X3VwX3RvX25fZGlnaXRzPGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmLCBpbnQp7AOhAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKiwgY2hhciwgY2hhcikgY29uc3TtA8cCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpnZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qLCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCopIGNvbnN07gOvAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0X3RpbWUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdO8DrwJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldF9kYXRlKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TwA7ICc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXRfd2Vla2RheShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN08QPDAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6X19nZXRfd2Vla2RheW5hbWUoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYpIGNvbnN08gO0AnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0X21vbnRobmFtZShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN08wPBAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6X19nZXRfbW9udGhuYW1lKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdPQDrwJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldF95ZWFyKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3T1A7wCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpfX2dldF95ZWFyKGludCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmKSBjb25zdPYDuQJpbnQgc3RkOjpfXzI6Ol9fZ2V0X3VwX3RvX25fZGlnaXRzPHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4mLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCB1bnNpZ25lZCBpbnQmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmLCBpbnQp9wO2AnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKiwgY2hhciwgY2hhcikgY29uc3T4A9wBc3RkOjpfXzI6OnRpbWVfcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgdG0gY29uc3QqLCBjaGFyLCBjaGFyKSBjb25zdPkDSnN0ZDo6X18yOjpfX3RpbWVfcHV0OjpfX2RvX3B1dChjaGFyKiwgY2hhciomLCB0bSBjb25zdCosIGNoYXIsIGNoYXIpIGNvbnN0+gPuAXN0ZDo6X18yOjp0aW1lX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIHRtIGNvbnN0KiwgY2hhciwgY2hhcikgY29uc3T7AyxzdGQ6Ol9fMjo6X190aHJvd19ydW50aW1lX2Vycm9yKGNoYXIgY29uc3QqKfwDO3N0ZDo6X18yOjptb25leXB1bmN0PGNoYXIsIGZhbHNlPjo6ZG9fZGVjaW1hbF9wb2ludCgpIGNvbnN0/QM2c3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgZmFsc2U+Ojpkb19ncm91cGluZygpIGNvbnN0/gM7c3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgZmFsc2U+Ojpkb19uZWdhdGl2ZV9zaWduKCkgY29uc3T/AzhzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCBmYWxzZT46OmRvX3Bvc19mb3JtYXQoKSBjb25zdIAEPnN0ZDo6X18yOjptb25leXB1bmN0PHdjaGFyX3QsIGZhbHNlPjo6ZG9fZGVjaW1hbF9wb2ludCgpIGNvbnN0gQQ+c3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgZmFsc2U+Ojpkb19uZWdhdGl2ZV9zaWduKCkgY29uc3SCBL8Bc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpiYXNpY19zdHJpbmcoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JimDBKUCc3RkOjpfXzI6Om1vbmV5X2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgZG91YmxlJikgY29uc3SEBIgDc3RkOjpfXzI6Om1vbmV5X2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6X19kb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIGJvb2wsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCYsIGJvb2wmLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmLCBzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxjaGFyLCB2b2lkICgqKSh2b2lkKik+JiwgY2hhciomLCBjaGFyKimFBF1zdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpvcGVyYXRvcisrW2FiaTp2MTUwMDddKGludCmGBGZ2b2lkIHN0ZDo6X18yOjpfX2RvdWJsZV9vcl9ub3RoaW5nPGNoYXI+KHN0ZDo6X18yOjp1bmlxdWVfcHRyPGNoYXIsIHZvaWQgKCopKHZvaWQqKT4mLCBjaGFyKiYsIGNoYXIqJimHBIYBdm9pZCBzdGQ6Ol9fMjo6X19kb3VibGVfb3Jfbm90aGluZzx1bnNpZ25lZCBpbnQ+KHN0ZDo6X18yOjp1bmlxdWVfcHRyPHVuc2lnbmVkIGludCwgdm9pZCAoKikodm9pZCopPiYsIHVuc2lnbmVkIGludComLCB1bnNpZ25lZCBpbnQqJimIBO4Cc3RkOjpfXzI6Om1vbmV5X2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYpIGNvbnN0iQSZAnN0ZDo6X18yOjplbmFibGVfaWY8X19pc19jcHAxN19mb3J3YXJkX2l0ZXJhdG9yPGNoYXIqPjo6dmFsdWUsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiY+Ojp0eXBlIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6YXBwZW5kW2FiaTp2MTUwMDddPGNoYXIqPihjaGFyKiwgY2hhciopigR7c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpfX3NldF9zaXplW2FiaTp2MTUwMDddKHVuc2lnbmVkIGxvbmcpiwSCAXN0ZDo6X18yOjptb25leXB1bmN0PGNoYXIsIHRydWU+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjptb25leXB1bmN0PGNoYXIsIHRydWU+PihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimMBIQBc3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgZmFsc2U+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjptb25leXB1bmN0PGNoYXIsIGZhbHNlPj4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpjQQ/c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIqPjo6b3BlcmF0b3IrW2FiaTp2MTUwMDddKGxvbmcpIGNvbnN0jgRxc3RkOjpfXzI6OnVuaXF1ZV9wdHI8Y2hhciwgdm9pZCAoKikodm9pZCopPjo6b3BlcmF0b3I9W2FiaTp2MTUwMDddKHN0ZDo6X18yOjp1bmlxdWVfcHRyPGNoYXIsIHZvaWQgKCopKHZvaWQqKT4mJimPBLoCc3RkOjpfXzI6Om1vbmV5X2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgZG91YmxlJikgY29uc3SQBKkDc3RkOjpfXzI6Om1vbmV5X2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6X19kb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIGJvb2wsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCYsIGJvb2wmLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmLCBzdGQ6Ol9fMjo6dW5pcXVlX3B0cjx3Y2hhcl90LCB2b2lkICgqKSh2b2lkKik+Jiwgd2NoYXJfdComLCB3Y2hhcl90KimRBGNzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+OjpvcGVyYXRvcisrW2FiaTp2MTUwMDddKGludCmSBIwDc3RkOjpfXzI6Om1vbmV5X2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiYpIGNvbnN0kwS3AnN0ZDo6X18yOjplbmFibGVfaWY8X19pc19jcHAxN19mb3J3YXJkX2l0ZXJhdG9yPHdjaGFyX3QqPjo6dmFsdWUsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiY+Ojp0eXBlIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6YXBwZW5kW2FiaTp2MTUwMDddPHdjaGFyX3QqPih3Y2hhcl90Kiwgd2NoYXJfdCoplASIAXN0ZDo6X18yOjptb25leXB1bmN0PHdjaGFyX3QsIHRydWU+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjptb25leXB1bmN0PHdjaGFyX3QsIHRydWU+PihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimVBNUBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjpvcGVyYXRvcj1bYWJpOnYxNTAwN10oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+JiYplgSKAXN0ZDo6X18yOjptb25leXB1bmN0PHdjaGFyX3QsIGZhbHNlPiBjb25zdCYgc3RkOjpfXzI6OnVzZV9mYWNldFthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6bW9uZXlwdW5jdDx3Y2hhcl90LCBmYWxzZT4+KHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKZcEQnN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90Kj46Om9wZXJhdG9yK1thYmk6djE1MDA3XShsb25nKSBjb25zdJgE2QFzdGQ6Ol9fMjo6bW9uZXlfcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgbG9uZyBkb3VibGUpIGNvbnN0mQSIA3N0ZDo6X18yOjpfX21vbmV5X3B1dDxjaGFyPjo6X19nYXRoZXJfaW5mbyhib29sLCBib29sLCBzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0Jiwgc3RkOjpfXzI6Om1vbmV5X2Jhc2U6OnBhdHRlcm4mLCBjaGFyJiwgY2hhciYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYsIGludCYpmgTWA3N0ZDo6X18yOjpfX21vbmV5X3B1dDxjaGFyPjo6X19mb3JtYXQoY2hhciosIGNoYXIqJiwgY2hhciomLCB1bnNpZ25lZCBpbnQsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JiwgYm9vbCwgc3RkOjpfXzI6Om1vbmV5X2Jhc2U6OnBhdHRlcm4gY29uc3QmLCBjaGFyLCBjaGFyLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBpbnQpmwSaAWNoYXIqIHN0ZDo6X18yOjpjb3B5W2FiaTp2MTUwMDddPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIGNoYXIqPihzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCBzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCBjaGFyKimcBKkCc3RkOjpfXzI6Om1vbmV5X3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpIGNvbnN0nQTrAXN0ZDo6X18yOjptb25leV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBsb25nIGRvdWJsZSkgY29uc3SeBKMDc3RkOjpfXzI6Ol9fbW9uZXlfcHV0PHdjaGFyX3Q+OjpfX2dhdGhlcl9pbmZvKGJvb2wsIGJvb2wsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmLCBzdGQ6Ol9fMjo6bW9uZXlfYmFzZTo6cGF0dGVybiYsIHdjaGFyX3QmLCB3Y2hhcl90Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+JiwgaW50JimfBIMEc3RkOjpfXzI6Ol9fbW9uZXlfcHV0PHdjaGFyX3Q+OjpfX2Zvcm1hdCh3Y2hhcl90Kiwgd2NoYXJfdComLCB3Y2hhcl90KiYsIHVuc2lnbmVkIGludCwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCBzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD4gY29uc3QmLCBib29sLCBzdGQ6Ol9fMjo6bW9uZXlfYmFzZTo6cGF0dGVybiBjb25zdCYsIHdjaGFyX3QsIHdjaGFyX3QsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCYsIGludCmgBKwBd2NoYXJfdCogc3RkOjpfXzI6OmNvcHlbYWJpOnYxNTAwN108c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHdjaGFyX3QgY29uc3QqPiwgd2NoYXJfdCo+KHN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90IGNvbnN0Kj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjx3Y2hhcl90IGNvbnN0Kj4sIHdjaGFyX3QqKaEExAJzdGQ6Ol9fMjo6bW9uZXlfcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0JikgY29uc3SiBJ0Bc3RkOjpfXzI6Om1lc3NhZ2VzPGNoYXI+Ojpkb19vcGVuKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKSBjb25zdKMEkwFzdGQ6Ol9fMjo6bWVzc2FnZXM8Y2hhcj46OmRvX2dldChsb25nLCBpbnQsIGludCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JikgY29uc3SkBJ8Bc3RkOjpfXzI6Om1lc3NhZ2VzPHdjaGFyX3Q+Ojpkb19nZXQobG9uZywgaW50LCBpbnQsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PiBjb25zdCYpIGNvbnN0pQQ5c3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojp+Y29kZWN2dCgppgQtc3RkOjpfXzI6OmxvY2FsZTo6X19pbXA6Ol9faW1wKHVuc2lnbmVkIGxvbmcppwR8c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46On52ZWN0b3JbYWJpOnYxNTAwN10oKagEiAFzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+Pjo6X19jb25zdHJ1Y3RfYXRfZW5kKHVuc2lnbmVkIGxvbmcpqQSuAXN0ZDo6X18yOjpfX3RyYW5zYWN0aW9uPHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjpfX2Rlc3Ryb3lfdmVjdG9yPjo6fl9fdHJhbnNhY3Rpb25bYWJpOnYxNTAwN10oKaoEfHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjpfX2NsZWFyW2FiaTp2MTUwMDddKCmrBB1zdGQ6Ol9fMjo6bG9jYWxlOjppZDo6X19nZXQoKawEQHN0ZDo6X18yOjpsb2NhbGU6Ol9faW1wOjppbnN0YWxsKHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgbG9uZymtBJEBc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Ol9fZGVzdHJveV92ZWN0b3I6Om9wZXJhdG9yKClbYWJpOnYxNTAwN10oKa4EhAFzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCwgc3RkOjpfXzI6Oihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6cmVsZWFzZT46OnJlc2V0W2FiaTp2MTUwMDddKHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KimvBCFzdGQ6Ol9fMjo6bG9jYWxlOjpfX2ltcDo6fl9faW1wKCmwBCNzdGQ6Ol9fMjo6bG9jYWxlOjpfX2ltcDo6fl9faW1wKCkuMbEEfnN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjpfX2FwcGVuZCh1bnNpZ25lZCBsb25nKbIELnN0ZDo6X18yOjpsb2NhbGU6Ol9faW1wOjpoYXNfZmFjZXQobG9uZykgY29uc3SzBBpzdGQ6Ol9fMjo6bG9jYWxlOjpsb2NhbGUoKbQEHnN0ZDo6X18yOjpsb2NhbGU6OmlkOjpfX2luaXQoKbUEK3N0ZDo6X18yOjpsb2NhbGU6OmZhY2V0OjpfX29uX3plcm9fc2hhcmVkKCm2BHR2b2lkIHN0ZDo6X18yOjpfX2NhbGxfb25jZV9wcm94eVthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6dHVwbGU8c3RkOjpfXzI6Oihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6X19mYWtlX2JpbmQmJj4+KHZvaWQqKbcEPXN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9faXModW5zaWduZWQgbG9uZywgd2NoYXJfdCkgY29uc3S4BFVzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX2lzKHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KiwgdW5zaWduZWQgbG9uZyopIGNvbnN0uQRZc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb19zY2FuX2lzKHVuc2lnbmVkIGxvbmcsIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3S6BFpzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3NjYW5fbm90KHVuc2lnbmVkIGxvbmcsIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3S7BDNzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3RvdXBwZXIod2NoYXJfdCkgY29uc3S8BERzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3RvdXBwZXIod2NoYXJfdCosIHdjaGFyX3QgY29uc3QqKSBjb25zdL0EM3N0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fdG9sb3dlcih3Y2hhcl90KSBjb25zdL4ERHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fdG9sb3dlcih3Y2hhcl90Kiwgd2NoYXJfdCBjb25zdCopIGNvbnN0vwRMc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb193aWRlbihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHdjaGFyX3QqKSBjb25zdMAEOHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fbmFycm93KHdjaGFyX3QsIGNoYXIpIGNvbnN0wQRWc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb19uYXJyb3cod2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCBjaGFyLCBjaGFyKikgY29uc3TCBB9zdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46On5jdHlwZSgpwwQhc3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojp+Y3R5cGUoKS4xxAQtc3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojpkb190b3VwcGVyKGNoYXIpIGNvbnN0xQQ7c3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojpkb190b3VwcGVyKGNoYXIqLCBjaGFyIGNvbnN0KikgY29uc3TGBC1zdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX3RvbG93ZXIoY2hhcikgY29uc3THBDtzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX3RvbG93ZXIoY2hhciosIGNoYXIgY29uc3QqKSBjb25zdMgERnN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fd2lkZW4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyKikgY29uc3TJBDJzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX25hcnJvdyhjaGFyLCBjaGFyKSBjb25zdMoETXN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fbmFycm93KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciwgY2hhciopIGNvbnN0ywSEAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fb3V0KF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdMwEYHN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fdW5zaGlmdChfX21ic3RhdGVfdCYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdM0EcnN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fbGVuZ3RoKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKSBjb25zdM4EO3N0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6fmNvZGVjdnQoKS4xzwSQAXN0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fb3V0KF9fbWJzdGF0ZV90Jiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KiYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdNAEWHN0ZDo6X18yOjpfX2xpYmNwcF93Y3J0b21iX2xbYWJpOnYxNTAwN10oY2hhciosIHdjaGFyX3QsIF9fbWJzdGF0ZV90KiwgX19sb2NhbGVfc3RydWN0KinRBI8Bc3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19pbihfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdComLCB3Y2hhcl90Kiwgd2NoYXJfdCosIHdjaGFyX3QqJikgY29uc3TSBG5zdGQ6Ol9fMjo6X19saWJjcHBfbWJydG93Y19sW2FiaTp2MTUwMDddKHdjaGFyX3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgX19tYnN0YXRlX3QqLCBfX2xvY2FsZV9zdHJ1Y3QqKdMEY3N0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fdW5zaGlmdChfX21ic3RhdGVfdCYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdNQEQnN0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fZW5jb2RpbmcoKSBjb25zdNUEPXN0ZDo6X18yOjpfX2xpYmNwcF9tYl9jdXJfbWF4X2xbYWJpOnYxNTAwN10oX19sb2NhbGVfc3RydWN0KinWBHVzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2xlbmd0aChfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZykgY29uc3TXBERzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX21heF9sZW5ndGgoKSBjb25zdNgElAFzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMTZfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19vdXQoX19tYnN0YXRlX3QmLCBjaGFyMTZfdCBjb25zdCosIGNoYXIxNl90IGNvbnN0KiwgY2hhcjE2X3QgY29uc3QqJiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN02QSTAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2luKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIGNoYXIxNl90KiwgY2hhcjE2X3QqLCBjaGFyMTZfdComKSBjb25zdNoEdnN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2xlbmd0aChfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZykgY29uc3TbBEVzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMTZfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19tYXhfbGVuZ3RoKCkgY29uc3TcBJQBc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhcjMyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fb3V0KF9fbWJzdGF0ZV90JiwgY2hhcjMyX3QgY29uc3QqLCBjaGFyMzJfdCBjb25zdCosIGNoYXIzMl90IGNvbnN0KiYsIGNoYXIqLCBjaGFyKiwgY2hhciomKSBjb25zdN0EkwFzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMzJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19pbihfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdComLCBjaGFyMzJfdCosIGNoYXIzMl90KiwgY2hhcjMyX3QqJikgY29uc3TeBHZzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMzJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19sZW5ndGgoX19tYnN0YXRlX3QmLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcpIGNvbnN03wQlc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojp+bnVtcHVuY3QoKeAEJ3N0ZDo6X18yOjpudW1wdW5jdDxjaGFyPjo6fm51bXB1bmN0KCkuMeEEKHN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6fm51bXB1bmN0KCniBCpzdGQ6Ol9fMjo6bnVtcHVuY3Q8d2NoYXJfdD46On5udW1wdW5jdCgpLjHjBDJzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46OmRvX2RlY2ltYWxfcG9pbnQoKSBjb25zdOQEMnN0ZDo6X18yOjpudW1wdW5jdDxjaGFyPjo6ZG9fdGhvdXNhbmRzX3NlcCgpIGNvbnN05QQtc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojpkb19ncm91cGluZygpIGNvbnN05gQwc3RkOjpfXzI6Om51bXB1bmN0PHdjaGFyX3Q+Ojpkb19ncm91cGluZygpIGNvbnN05wQtc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojpkb190cnVlbmFtZSgpIGNvbnN06AQwc3RkOjpfXzI6Om51bXB1bmN0PHdjaGFyX3Q+Ojpkb190cnVlbmFtZSgpIGNvbnN06QSXAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6YmFzaWNfc3RyaW5nW2FiaTp2MTUwMDddPHN0ZDo6bnVsbHB0cl90Pih3Y2hhcl90IGNvbnN0KinqBC5zdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46OmRvX2ZhbHNlbmFtZSgpIGNvbnN06wQxc3RkOjpfXzI6Om51bXB1bmN0PHdjaGFyX3Q+Ojpkb19mYWxzZW5hbWUoKSBjb25zdOwEeHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6b3BlcmF0b3I9W2FiaTp2MTUwMDddKGNoYXIgY29uc3QqKe0ENXN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTxjaGFyPjo6X193ZWVrcygpIGNvbnN07gQaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuNTfvBDhzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fd2Vla3MoKSBjb25zdPAEGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjcy8QSEAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6b3BlcmF0b3I9W2FiaTp2MTUwMDddKHdjaGFyX3QgY29uc3QqKfIENnN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTxjaGFyPjo6X19tb250aHMoKSBjb25zdPMEGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjg39AQ5c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX21vbnRocygpIGNvbnN09QQbX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMTEx9gQ1c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX2FtX3BtKCkgY29uc3T3BBtfX2N4eF9nbG9iYWxfYXJyYXlfZHRvci4xMzX4BDhzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fYW1fcG0oKSBjb25zdPkEG19fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjEzOPoEMXN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTxjaGFyPjo6X194KCkgY29uc3T7BBlfX2N4eF9nbG9iYWxfYXJyYXlfZHRvci4y/AQ0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX3goKSBjb25zdP0EGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjMy/gQxc3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX1goKSBjb25zdP8EGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM0gAU0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX1goKSBjb25zdIEFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM2ggUxc3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX2MoKSBjb25zdIMFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjM4hAU0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX2MoKSBjb25zdIUFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjQwhgUxc3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX3IoKSBjb25zdIcFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjQyiAU0c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPHdjaGFyX3Q+OjpfX3IoKSBjb25zdIkFGl9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjQ0igVzc3RkOjpfXzI6OnRpbWVfcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojp+dGltZV9wdXRbYWJpOnYxNTAwN10oKYsFdXN0ZDo6X18yOjp0aW1lX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6fnRpbWVfcHV0W2FiaTp2MTUwMDddKCkuMYwF1gFzdGQ6Ol9fMjo6X19hbGxvY2F0aW9uX3Jlc3VsdDxzdGQ6Ol9fMjo6YWxsb2NhdG9yX3RyYWl0czxzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6cG9pbnRlcj4gc3RkOjpfXzI6Ol9fYWxsb2NhdGVfYXRfbGVhc3RbYWJpOnYxNTAwN108c3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj4oc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90PiYsIHVuc2lnbmVkIGxvbmcpjQVBc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pjo6YWxsb2NhdGVbYWJpOnYxNTAwN10odW5zaWduZWQgbG9uZymOBYsBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpfX251bGxfdGVybWluYXRlX2F0W2FiaTp2MTUwMDddKGNoYXIqLCB1bnNpZ25lZCBsb25nKY8FiAFzdGQ6Ol9fMjo6YWxsb2NhdG9yX3RyYWl0czxzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6ZGVhbGxvY2F0ZVthYmk6djE1MDA3XShzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Jiwgd2NoYXJfdCosIHVuc2lnbmVkIGxvbmcpkAVNc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pjo6ZGVhbGxvY2F0ZVthYmk6djE1MDA3XSh3Y2hhcl90KiwgdW5zaWduZWQgbG9uZymRBbkBYXV0byBzdGQ6Ol9fMjo6X191bndyYXBfcmFuZ2VbYWJpOnYxNTAwN108c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPiwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPj4oc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPiwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPimSBcUCZGVjbHR5cGUoc3RkOjpfXzI6Ol9fdW53cmFwX2l0ZXJfaW1wbDxzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCB0cnVlPjo6X191bndyYXAoc3RkOjpkZWNsdmFsPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4+KCkpKSBzdGQ6Ol9fMjo6X191bndyYXBfaXRlclthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCBzdGQ6Ol9fMjo6X191bndyYXBfaXRlcl9pbXBsPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIHRydWU+LCAwPihzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+KZMFd3N0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjptYXhfc2l6ZSgpIGNvbnN0lAWtAnN0ZDo6X18yOjpfX2FsbG9jYXRpb25fcmVzdWx0PHN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46OnBvaW50ZXI+IHN0ZDo6X18yOjpfX2FsbG9jYXRlX2F0X2xlYXN0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj4oc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+JiwgdW5zaWduZWQgbG9uZymVBdMBc3RkOjpfXzI6OmFsbG9jYXRvcl90cmFpdHM8c3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+Pjo6ZGVhbGxvY2F0ZVthYmk6djE1MDA3XShzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4mLCBzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCoqLCB1bnNpZ25lZCBsb25nKZYFpAFzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+Pjo6X19iYXNlX2Rlc3RydWN0X2F0X2VuZFthYmk6djE1MDA3XShzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCoqKZcFgQFzdGQ6Ol9fMjo6X19zcGxpdF9idWZmZXI8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4mPjo6fl9fc3BsaXRfYnVmZmVyKCmYBTdzdGQ6Ol9fMjo6X190aHJvd19vdXRfb2ZfcmFuZ2VbYWJpOnYxNTAwN10oY2hhciBjb25zdCopmQUuc3RkOjpfXzI6Ol9fdGltZV9wdXQ6Ol9fdGltZV9wdXRbYWJpOnYxNTAwN10oKZoFCXN0cnRvbGxfbJsFCnN0cnRvdWxsX2ycBS1zdGQ6Ol9fMjo6X19zaGFyZWRfY291bnQ6On5fX3NoYXJlZF9jb3VudCgpLjGdBRhzdGQ6Ol9fdGhyb3dfYmFkX2FsbG9jKCmeBRtvcGVyYXRvciBuZXcodW5zaWduZWQgbG9uZymfBUpzdGQ6Ol9fMjo6X19saWJjcHBfYWxpZ25lZF9hbGxvY1thYmk6djE1MDA3XSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKaAFenN0ZDo6bG9naWNfZXJyb3I6OmxvZ2ljX2Vycm9yKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpoQU9c3RkOjpfXzI6Ol9fbGliY3BwX3JlZnN0cmluZzo6X19saWJjcHBfcmVmc3RyaW5nKGNoYXIgY29uc3QqKaIFKnN0ZDo6bG9naWNfZXJyb3I6OmxvZ2ljX2Vycm9yKGNoYXIgY29uc3QqKaMFfnN0ZDo6cnVudGltZV9lcnJvcjo6cnVudGltZV9lcnJvcihzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKaQFLnN0ZDo6cnVudGltZV9lcnJvcjo6cnVudGltZV9lcnJvcihjaGFyIGNvbnN0KimlBQpfX292ZXJmbG93pgVEc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Ojptb3ZlKGNoYXIqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZymnBdIBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpfX2dyb3dfYnlfYW5kX3JlcGxhY2UodW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgY2hhciBjb25zdCopqAVlc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Ojp+YmFzaWNfc3RyaW5nKCmpBbkBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpfX2dyb3dfYnkodW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZymqBT9zdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj46OmFzc2lnbihjaGFyKiwgdW5zaWduZWQgbG9uZywgY2hhcimrBYMBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpfX2Fzc2lnbl9leHRlcm5hbChjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZymsBXhzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmFwcGVuZChjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZymtBXhzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Omluc2VydCh1bnNpZ25lZCBsb25nLCBjaGFyIGNvbnN0KimuBWVzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OnB1c2hfYmFjayhjaGFyKa8FaXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6YXBwZW5kKGNoYXIgY29uc3QqKbAF3gFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Ol9fZ3Jvd19ieV9hbmRfcmVwbGFjZSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB3Y2hhcl90IGNvbnN0KimxBW5zdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46On5iYXNpY19zdHJpbmcoKbIFwgFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Ol9fZ3Jvd19ieSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKbMFcXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6cHVzaF9iYWNrKHdjaGFyX3QptAUhc3RkOjpfXzI6OnRvX3N0cmluZyh1bnNpZ25lZCBpbnQptQU8c3RkOjpfXzI6Ol9faXRvYTo6X19hcHBlbmQyW2FiaTp2MTUwMDddKGNoYXIqLCB1bnNpZ25lZCBpbnQptgU8c3RkOjpfXzI6Ol9faXRvYTo6X19hcHBlbmQ0W2FiaTp2MTUwMDddKGNoYXIqLCB1bnNpZ25lZCBpbnQptwU8c3RkOjpfXzI6Ol9faXRvYTo6X19hcHBlbmQ2W2FiaTp2MTUwMDddKGNoYXIqLCB1bnNpZ25lZCBpbnQpuAU8c3RkOjpfXzI6Ol9faXRvYTo6X19hcHBlbmQ4W2FiaTp2MTUwMDddKGNoYXIqLCB1bnNpZ25lZCBpbnQpuQU8c3RkOjpfXzI6OmVycm9yX2NhdGVnb3J5OjpkZWZhdWx0X2Vycm9yX2NvbmRpdGlvbihpbnQpIGNvbnN0ugVRc3RkOjpfXzI6OmVycm9yX2NhdGVnb3J5OjplcXVpdmFsZW50KGludCwgc3RkOjpfXzI6OmVycm9yX2NvbmRpdGlvbiBjb25zdCYpIGNvbnN0uwVMc3RkOjpfXzI6OmVycm9yX2NhdGVnb3J5OjplcXVpdmFsZW50KHN0ZDo6X18yOjplcnJvcl9jb2RlIGNvbnN0JiwgaW50KSBjb25zdLwFKnN0ZDo6X18yOjpfX2RvX21lc3NhZ2U6Om1lc3NhZ2UoaW50KSBjb25zdL0FMHN0ZDo6X18yOjpfX2dlbmVyaWNfZXJyb3JfY2F0ZWdvcnk6Om5hbWUoKSBjb25zdL4FNnN0ZDo6X18yOjpfX2dlbmVyaWNfZXJyb3JfY2F0ZWdvcnk6Om1lc3NhZ2UoaW50KSBjb25zdL8FL3N0ZDo6X18yOjpfX3N5c3RlbV9lcnJvcl9jYXRlZ29yeTo6bmFtZSgpIGNvbnN0wAVFc3RkOjpfXzI6Ol9fc3lzdGVtX2Vycm9yX2NhdGVnb3J5OjpkZWZhdWx0X2Vycm9yX2NvbmRpdGlvbihpbnQpIGNvbnN0wQWRAXN0ZDo6X18yOjpzeXN0ZW1fZXJyb3I6Ol9faW5pdChzdGQ6Ol9fMjo6ZXJyb3JfY29kZSBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PinCBUdzdGQ6Ol9fMjo6c3lzdGVtX2Vycm9yOjpzeXN0ZW1fZXJyb3Ioc3RkOjpfXzI6OmVycm9yX2NvZGUsIGNoYXIgY29uc3QqKcMFGF9fY3hhX2FsbG9jYXRlX2V4Y2VwdGlvbsQFFF9fY3hhX2ZyZWVfZXhjZXB0aW9uxQULX19jeGFfdGhyb3fGBUtfX2N4eGFiaXYxOjpleGNlcHRpb25fY2xlYW51cF9mdW5jKF9VbndpbmRfUmVhc29uX0NvZGUsIF9VbndpbmRfRXhjZXB0aW9uKinHBSJfX2N4YV9kZWNyZW1lbnRfZXhjZXB0aW9uX3JlZmNvdW50yAURX19jeGFfYmVnaW5fY2F0Y2jJBQ9fX2N4YV9lbmRfY2F0Y2jKBQ1fX2N4YV9yZXRocm93ywUiX19jeGFfaW5jcmVtZW50X2V4Y2VwdGlvbl9yZWZjb3VudMwFDWFib3J0X21lc3NhZ2XNBR5kZW1hbmdsaW5nX3Rlcm1pbmF0ZV9oYW5kbGVyKCnOBR9kZW1hbmdsaW5nX3VuZXhwZWN0ZWRfaGFuZGxlcigpzwUQc3RkOjp0ZXJtaW5hdGUoKdAFHHN0ZDo6X190ZXJtaW5hdGUodm9pZCAoKikoKSnRBRJfX2N4YV9wdXJlX3ZpcnR1YWzSBS9fX2N4eGFiaXYxOjpfX2FsaWduZWRfZnJlZV93aXRoX2ZhbGxiYWNrKHZvaWQqKdMFYV9fY3h4YWJpdjE6Ol9fZnVuZGFtZW50YWxfdHlwZV9pbmZvOjpjYW5fY2F0Y2goX19jeHhhYml2MTo6X19zaGltX3R5cGVfaW5mbyBjb25zdCosIHZvaWQqJikgY29uc3TUBTxpc19lcXVhbChzdGQ6OnR5cGVfaW5mbyBjb25zdCosIHN0ZDo6dHlwZV9pbmZvIGNvbnN0KiwgYm9vbCnVBVtfX2N4eGFiaXYxOjpfX2NsYXNzX3R5cGVfaW5mbzo6Y2FuX2NhdGNoKF9fY3h4YWJpdjE6Ol9fc2hpbV90eXBlX2luZm8gY29uc3QqLCB2b2lkKiYpIGNvbnN01gUOX19keW5hbWljX2Nhc3TXBWtfX2N4eGFiaXYxOjpfX2NsYXNzX3R5cGVfaW5mbzo6cHJvY2Vzc19mb3VuZF9iYXNlX2NsYXNzKF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkKiwgaW50KSBjb25zdNgFbl9fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2UoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN02QVxX19jeHhhYml2MTo6X19zaV9jbGFzc190eXBlX2luZm86Omhhc191bmFtYmlndW91c19wdWJsaWNfYmFzZShfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCosIGludCkgY29uc3TaBXNfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2UoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN02wVyX19jeHhhYml2MTo6X192bWlfY2xhc3NfdHlwZV9pbmZvOjpoYXNfdW5hbWJpZ3VvdXNfcHVibGljX2Jhc2UoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN03AVdX19jeHhhYml2MTo6X19wb2ludGVyX3R5cGVfaW5mbzo6Y2FuX2NhdGNoKF9fY3h4YWJpdjE6Ol9fc2hpbV90eXBlX2luZm8gY29uc3QqLCB2b2lkKiYpIGNvbnN03QVmX19jeHhhYml2MTo6X19wb2ludGVyX3RvX21lbWJlcl90eXBlX2luZm86OmNhbl9jYXRjaF9uZXN0ZWQoX19jeHhhYml2MTo6X19zaGltX3R5cGVfaW5mbyBjb25zdCopIGNvbnN03gWDAV9fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpwcm9jZXNzX3N0YXRpY190eXBlX2Fib3ZlX2RzdChfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqLCBpbnQpIGNvbnN03wVzX19jeHhhYml2MTo6X192bWlfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdOAFgQFfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3ThBXRfX2N4eGFiaXYxOjpfX2Jhc2VfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdOIFcl9fY3h4YWJpdjE6Ol9fc2lfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdOMFb19fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYmVsb3dfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdOQFgAFfX2N4eGFiaXYxOjpfX3ZtaV9jbGFzc190eXBlX2luZm86OnNlYXJjaF9hYm92ZV9kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdOUFf19fY3h4YWJpdjE6Ol9fc2lfY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3TmBXxfX2N4eGFiaXYxOjpfX2NsYXNzX3R5cGVfaW5mbzo6c2VhcmNoX2Fib3ZlX2RzdChfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN05wUcc3RkOjpleGNlcHRpb246OndoYXQoKSBjb25zdOgFHHN0ZDo6YmFkX2FsbG9jOjp3aGF0KCkgY29uc3TpBSdzdGQ6OmJhZF9hcnJheV9uZXdfbGVuZ3RoOjp3aGF0KCkgY29uc3TqBSBzdGQ6OmxvZ2ljX2Vycm9yOjp+bG9naWNfZXJyb3IoKesFM3N0ZDo6X18yOjpfX2xpYmNwcF9yZWZzdHJpbmc6On5fX2xpYmNwcF9yZWZzdHJpbmcoKewFInN0ZDo6bG9naWNfZXJyb3I6On5sb2dpY19lcnJvcigpLjHtBSRzdGQ6OnJ1bnRpbWVfZXJyb3I6On5ydW50aW1lX2Vycm9yKCnuBRtzdGQ6OmJhZF9jYXN0Ojp3aGF0KCkgY29uc3TvBVNfX2N4eGFiaXYxOjpyZWFkRW5jb2RlZFBvaW50ZXIodW5zaWduZWQgY2hhciBjb25zdCoqLCB1bnNpZ25lZCBjaGFyLCB1bnNpZ25lZCBsb25nKfAFLl9fY3h4YWJpdjE6OnJlYWRVTEVCMTI4KHVuc2lnbmVkIGNoYXIgY29uc3QqKinxBS5fX2N4eGFiaXYxOjpyZWFkU0xFQjEyOCh1bnNpZ25lZCBjaGFyIGNvbnN0Kiop8gWAAV9fY3h4YWJpdjE6OmdldF9zaGltX3R5cGVfaW5mbyh1bnNpZ25lZCBsb25nIGxvbmcsIHVuc2lnbmVkIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBjaGFyLCBib29sLCBfVW53aW5kX0V4Y2VwdGlvbiosIHVuc2lnbmVkIGxvbmcp8wU0X19jeHhhYml2MTo6Y2FsbF90ZXJtaW5hdGUoYm9vbCwgX1Vud2luZF9FeGNlcHRpb24qKfQFF19VbndpbmRfQ2FsbFBlcnNvbmFsaXR59QUVZW1zY3JpcHRlbl9zdGFja19pbml09gUZZW1zY3JpcHRlbl9zdGFja19nZXRfZnJlZfcFGWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2Jhc2X4BRhlbXNjcmlwdGVuX3N0YWNrX2dldF9lbmT5BQ5fX2N4YV9kZW1hbmdsZfoF5QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+Ojp+QWJzdHJhY3RNYW5nbGluZ1BhcnNlcigp+wVHKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXI6Om9wZXJhdG9yKz0oY2hhcin8BUwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXc6OlN0cmluZ1ZpZXcoY2hhciBjb25zdCop/QWKAihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OmNvbnN1bWVJZigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXcp/gXbAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRW5jb2RpbmcoKf8F2wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+Ojpjb25zdW1lSWYoY2hhcimABt0BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VOdW1iZXIoYm9vbCmBBsEDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3BlY2lhbE5hbWUsIGNoYXIgY29uc3QgKCYpIFszNF0sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPihjaGFyIGNvbnN0ICgmKSBbMzRdLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJimCBtcBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VUeXBlKCmDBkooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlcjo6Z3Jvdyh1bnNpZ25lZCBsb25nKYQGkwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlKiwgNHVsPjo6flBPRFNtYWxsVmVjdG9yKCmFBn8oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDMydWw+OjpQT0RTbWFsbFZlY3RvcigphgZ+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+OjpQT0RTbWFsbFZlY3Rvcigphwa9AShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+KiwgNHVsPjo6UE9EU21hbGxWZWN0b3IoKYgGeihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldzo6c3RhcnRzV2l0aCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXcpIGNvbnN0iQatAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqKYoG+wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUVuY29kaW5nKCk6OidsYW1iZGEnKCk6Om9wZXJhdG9yKCkoKSBjb25zdIsG3gEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVRlbXBsYXRlQXJnKCmMBq8BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCAzMnVsPjo6cHVzaF9iYWNrKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogY29uc3QmKY0G7wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+Ojpwb3BUcmFpbGluZ05vZGVBcnJheSh1bnNpZ25lZCBsb25nKY4GrAcoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGdW5jdGlvbkVuY29kaW5nLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZUFycmF5LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsaWZpZXJzJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGdW5jdGlvblJlZlF1YWwmPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZUFycmF5JiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxpZmllcnMmLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uUmVmUXVhbCYpjwaGAihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRW5jb2RpbmcoKTo6U2F2ZVRlbXBsYXRlUGFyYW1zOjp+U2F2ZVRlbXBsYXRlUGFyYW1zKCmQBtoCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGUsIGNoYXIgY29uc3QgKCYpIFs1XT4oY2hhciBjb25zdCAoJikgWzVdKZEG4QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUJhcmVTb3VyY2VOYW1lKCmSBp4DKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldyY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldyYpkwbXAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRXhwcigplAbbAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRGVjbHR5cGUoKZUGogMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrRXhwYW5zaW9uLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYplgbgAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlVGVtcGxhdGVQYXJhbSgplwbjAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlVGVtcGxhdGVBcmdzKGJvb2wpmAaCBChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5hbWVXaXRoVGVtcGxhdGVBcmdzLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJimZBosEKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UmVmZXJlbmNlVHlwZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UmVmZXJlbmNlS2luZD4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UmVmZXJlbmNlS2luZCYmKZoGvAMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVVuc2NvcGVkTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqLCBib29sKimbBuABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VRdWFsaWZpZWRUeXBlKCmcBuUCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qLCA0dWw+OjpvcGVyYXRvcj0oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qLCA0dWw+JiYpnQbnAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPjo6b3BlcmF0b3I9KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPiYmKZ4G3QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUNhbGxPZmZzZXQoKZ8G5gEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVNlcUlkKHVuc2lnbmVkIGxvbmcqKaAGlQIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZU1vZHVsZU5hbWVPcHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNb2R1bGVOYW1lKiYpoQabAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2UqLCA0dWw+OjpvcGVyYXRvcltdKHVuc2lnbmVkIGxvbmcpogaZAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2UqLCA0dWw+Ojpkcm9wQmFjayh1bnNpZ25lZCBsb25nKaMG3gEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUV4cHJQcmltYXJ5KCmkBrkFKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+Kiogc3RkOjpfXzI6OmNvcHlbYWJpOnYxNTAwN108KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+KiosIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPioqPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qKiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+KiosIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPioqKaUGswMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVNvdXJjZU5hbWUoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6TmFtZVN0YXRlKimmBkQoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkJ1bXBQb2ludGVyQWxsb2NhdG9yOjphbGxvY2F0ZSh1bnNpZ25lZCBsb25nKacGrAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlNwZWNpYWxOYW1lOjpTcGVjaWFsTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXcsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSBjb25zdCopqAa/Aihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6Tm9kZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OktpbmQsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6UHJlYywgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSmpBn0oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlNwZWNpYWxOYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKoGdihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyOjpvcGVyYXRvcis9KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldymrBkIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OmdldEJhc2VOYW1lKCkgY29uc3SsBocBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDdG9yVnRhYmxlU3BlY2lhbE5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0rQbwAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlUG9zaXRpdmVJbnRlZ2VyKHVuc2lnbmVkIGxvbmcqKa4GcChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGU6Ok5hbWVUeXBlKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldymvBnooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5hbWVUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLAGRihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGU6OmdldEJhc2VOYW1lKCkgY29uc3SxBnwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1vZHVsZU5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0sgbfAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlQ1ZRdWFsaWZpZXJzKCmzBt8BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VTdWJzdGl0dXRpb24oKbQGeShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgMzJ1bD46OnBvcF9iYWNrKCm1Bp4EKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VVbnF1YWxpZmllZE5hbWUoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6TmFtZVN0YXRlKiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNb2R1bGVOYW1lKim2BlYoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OnBhcnNlX2Rpc2NyaW1pbmF0b3IoY2hhciBjb25zdCosIGNoYXIgY29uc3QqKbcG9wMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpMb2NhbE5hbWUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKbgGswEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPiosIDR1bD46OmJhY2soKbkGiAIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUFiaVRhZ3MoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKim6BrgDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VVbm5hbWVkVHlwZU5hbWUoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6TmFtZVN0YXRlKim7BrUDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VPcGVyYXRvck5hbWUoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6TmFtZVN0YXRlKim8BooCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpOb2RlKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6S2luZCwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpDYWNoZSm9BpQBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2U6Omhhc1JIU0NvbXBvbmVudFNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdL4GfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6aGFzUkhTQ29tcG9uZW50KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S/Bo0BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2U6Omhhc0FycmF5U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wAaQAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlOjpoYXNGdW5jdGlvblNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMEGjgEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZTo6Z2V0U3ludGF4Tm9kZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wgaKAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMMGiwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZTo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0xAbjAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlT3BlcmF0b3JFbmNvZGluZygpxQbrAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Ok9wZXJhdG9ySW5mbzo6Z2V0U3ltYm9sKCkgY29uc3TGBsUCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VQcmVmaXhFeHByKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldywgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpQcmVjKccG6gQoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDYWxsRXhwciwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZUFycmF5LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OlByZWM+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGVBcnJheSYmLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OlByZWMmJinIBuABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VGdW5jdGlvblBhcmFtKCnJBt0BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VCcmFjZWRFeHByKCnKBsMDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RW5jbG9zaW5nRXhwciwgY2hhciBjb25zdCAoJikgWzExXSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiY+KGNoYXIgY29uc3QgKCYpIFsxMV0sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKcsGqwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Om9wZXJhdG9yPT0oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3IGNvbnN0JiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3IGNvbnN0JinMBlMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXc6OmRyb3BGcm9udCh1bnNpZ25lZCBsb25nKSBjb25zdM0GlAIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUludGVnZXJMaXRlcmFsKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldynOBr4CKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Qm9vbEV4cHIsIGludD4oaW50JiYpzwajAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uUGFyYW0sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldyY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldyYp0AbpAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Ok9wZXJhdG9ySW5mbzo6Z2V0TmFtZSgpIGNvbnN00QaGBChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkJyYWNlZEV4cHIsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgYm9vbD4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCBib29sJiYp0gbhAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlVW5yZXNvbHZlZFR5cGUoKdMG2wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVNpbXBsZUlkKCnUBvsDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbGlmaWVkTmFtZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYp1QblAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlQmFzZVVucmVzb2x2ZWROYW1lKCnWBp8DKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6R2xvYmFsUXVhbGlmaWVkTmFtZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKdcGfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QmluYXJ5RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TYBkYoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlcjo6cHJpbnRPcGVuKGNoYXIp2Qa2AShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6cHJpbnRBc09wZXJhbmQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OlByZWMsIGJvb2wpIGNvbnN02gZHKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXI6OnByaW50Q2xvc2UoY2hhcinbBnwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlByZWZpeEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN03AZ9KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb3N0Zml4RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TdBoQBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBcnJheVN1YnNjcmlwdEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN03gZ8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNZW1iZXJFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdN8GeShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmV3RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TgBoABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlQXJyYXk6OnByaW50V2l0aENvbW1hKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3ThBnwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkRlbGV0ZUV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN04gZ6KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDYWxsRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TjBoABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDb252ZXJzaW9uRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TkBoEBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDb25kaXRpb25hbEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN05QZ6KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDYXN0RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TmBuUBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFbmNsb3NpbmdFeHByOjpFbmNsb3NpbmdFeHByKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldywgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlIGNvbnN0KiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpQcmVjKecGfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RW5jbG9zaW5nRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3ToBskDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6U2NvcGVkVGVtcGxhdGVQYXJhbUxpc3Q6OlNjb3BlZFRlbXBsYXRlUGFyYW1MaXN0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4qKekG5AEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVRlbXBsYXRlUGFyYW1EZWNsKCnqBv8BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6U2NvcGVkVGVtcGxhdGVQYXJhbUxpc3Q6On5TY29wZWRUZW1wbGF0ZVBhcmFtTGlzdCgp6waAAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6SW50ZWdlckxpdGVyYWw6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN07AZ6KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCb29sRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TtBokBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGbG9hdExpdGVyYWxJbXBsPGZsb2F0Pjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TuBooBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGbG9hdExpdGVyYWxJbXBsPGRvdWJsZT46OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN07waPAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RmxvYXRMaXRlcmFsSW1wbDxsb25nIGRvdWJsZT46OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN08AZ/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdMaXRlcmFsOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPEG+AIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVRlbXBsYXRlUGFyYW1EZWNsKCk6OidsYW1iZGEnKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVQYXJhbUtpbmQpOjpvcGVyYXRvcigpKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVQYXJhbUtpbmQpIGNvbnN08gaBAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VW5uYW1lZFR5cGVOYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPMGjAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN5bnRoZXRpY1RlbXBsYXRlUGFyYW1OYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPQGhwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlR5cGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T1BogBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUeXBlVGVtcGxhdGVQYXJhbURlY2w6OnByaW50UmlnaHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPYGigEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vblR5cGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T3BosBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb25UeXBlVGVtcGxhdGVQYXJhbURlY2w6OnByaW50UmlnaHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPgGiwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlRlbXBsYXRlVGVtcGxhdGVQYXJhbURlY2w6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0+QaHAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVQYXJhbVBhY2tEZWNsOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPoGiAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlRlbXBsYXRlUGFyYW1QYWNrRGVjbDo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0+waBAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q2xvc3VyZVR5cGVOYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPwGhwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNsb3N1cmVUeXBlTmFtZTo6cHJpbnREZWNsYXJhdG9yKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T9BnwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkxhbWJkYUV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0/gZ9KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFbnVtTGl0ZXJhbDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T/BnYoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlcjo6b3BlcmF0b3I8PCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXcpgAd/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGdW5jdGlvblBhcmFtOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIEHeihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9sZEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0ggeaAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9sZEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0OjonbGFtYmRhJygpOjpvcGVyYXRvcigpKCkgY29uc3SDB40BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrRXhwYW5zaW9uOjpQYXJhbWV0ZXJQYWNrRXhwYW5zaW9uKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSBjb25zdCophAeIAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UGFyYW1ldGVyUGFja0V4cGFuc2lvbjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SFB3woYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkJyYWNlZEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0hgeBAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QnJhY2VkUmFuZ2VFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIcHrQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkluaXRMaXN0RXhwcjo6SW5pdExpc3RFeHByKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSBjb25zdCosIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZUFycmF5KYgHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6SW5pdExpc3RFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIkHjwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvaW50ZXJUb01lbWJlckNvbnZlcnNpb25FeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIoHfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3Vib2JqZWN0RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SLB4UBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTaXplb2ZQYXJhbVBhY2tFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIwHfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZUFycmF5Tm9kZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SNB3soYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlRocm93RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SOB38oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxpZmllZE5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0jwdLKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsaWZpZWROYW1lOjpnZXRCYXNlTmFtZSgpIGNvbnN0kAeiAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNvbnZlcnNpb25PcGVyYXRvclR5cGUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJimRB3ooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkR0b3JOYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJIHiAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNvbnZlcnNpb25PcGVyYXRvclR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0kweBAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TGl0ZXJhbE9wZXJhdG9yOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJQHhQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Okdsb2JhbFF1YWxpZmllZE5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0lQdRKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpHbG9iYWxRdWFsaWZpZWROYW1lOjpnZXRCYXNlTmFtZSgpIGNvbnN0lgfPAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RXhwYW5kZWRTcGVjaWFsU3Vic3RpdHV0aW9uOjpFeHBhbmRlZFNwZWNpYWxTdWJzdGl0dXRpb24oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTcGVjaWFsU3ViS2luZCwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpLaW5kKZcHhQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlNwZWNpYWxTdWJzdGl0dXRpb246OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0mAdRKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTcGVjaWFsU3Vic3RpdHV0aW9uOjpnZXRCYXNlTmFtZSgpIGNvbnN0mQdZKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFeHBhbmRlZFNwZWNpYWxTdWJzdGl0dXRpb246OmdldEJhc2VOYW1lKCkgY29uc3SaB40BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFeHBhbmRlZFNwZWNpYWxTdWJzdGl0dXRpb246OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0mwd8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYmlUYWdBdHRyOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJwHsgMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDdG9yRHRvck5hbWUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCBib29sLCBpbnQmPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgYm9vbCYmLCBpbnQmKZ0HhwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cnVjdHVyZWRCaW5kaW5nTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SeB34oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkN0b3JEdG9yTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SfB34oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1vZHVsZUVudGl0eTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SgB4kBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrOjpoYXNSSFNDb21wb25lbnRTbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3ShB4IBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrOjpoYXNBcnJheVNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKIHhQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2s6Omhhc0Z1bmN0aW9uU2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0oweDAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UGFyYW1ldGVyUGFjazo6Z2V0U3ludGF4Tm9kZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0pAd/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKUHgAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2s6OnByaW50UmlnaHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKYHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVBcmdzOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKcHhgEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5hbWVXaXRoVGVtcGxhdGVBcmdzOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKgHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RW5hYmxlSWZBdHRyOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKkHjAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uRW5jb2Rpbmc6Omhhc1JIU0NvbXBvbmVudFNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKoHggEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uRW5jb2Rpbmc6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0qweDAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25FbmNvZGluZzo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0rAd7KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpEb3RTdWZmaXg6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0rQf4Ayhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlZlY3RvclR5cGUsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKa4Hfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9leGNlcHRTcGVjOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdK8HhgEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkR5bmFtaWNFeGNlcHRpb25TcGVjOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLAHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25UeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLEHfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25UeXBlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SyB38oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok9iakNQcm90b05hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0sweDAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VmVuZG9yRXh0UXVhbFR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0tAeEAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbFR5cGU6Omhhc1JIU0NvbXBvbmVudFNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLUHfShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbFR5cGU6Omhhc0FycmF5U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0tgeAAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbFR5cGU6Omhhc0Z1bmN0aW9uU2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0twd6KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S4B3soYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxUeXBlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S5B34oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkJpbmFyeUZQVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S6B3woYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkJpdEludFR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0uweBAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UGl4ZWxWZWN0b3JUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLwHqwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlZlY3RvclR5cGU6OlZlY3RvclR5cGUoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlIGNvbnN0KiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlIGNvbnN0Kim9B3woYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlZlY3RvclR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0vgd7KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBcnJheVR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0vwd8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBcnJheVR5cGU6OnByaW50UmlnaHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMAHhQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvaW50ZXJUb01lbWJlclR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wQeGAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UG9pbnRlclRvTWVtYmVyVHlwZTo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wgeIAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RWxhYm9yYXRlZFR5cGVTcGVmVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TDB4cBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb2ludGVyVHlwZTo6aGFzUkhTQ29tcG9uZW50U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0xAd9KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb2ludGVyVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TFB0woYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok9iakNQcm90b05hbWU6OmlzT2JqQ09iamVjdCgpIGNvbnN0xgd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb2ludGVyVHlwZTo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0xwd/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpSZWZlcmVuY2VUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMgHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UmVmZXJlbmNlVHlwZTo6Y29sbGFwc2UoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMkHgAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlJlZmVyZW5jZVR5cGU6OnByaW50UmlnaHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMoHvgEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvc3RmaXhRdWFsaWZpZWRUeXBlOjpQb3N0Zml4UXVhbGlmaWVkVHlwZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXcpyweGAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UG9zdGZpeFF1YWxpZmllZFR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0zAclX190aHJvd25fb2JqZWN0X2Zyb21fdW53aW5kX2V4Y2VwdGlvbs0HF19fZ2V0X2V4Y2VwdGlvbl9tZXNzYWdlzgcJc3RhY2tTYXZlzwcMc3RhY2tSZXN0b3Jl0AcKc3RhY2tBbGxvY9EHBl9fdHJhcNIHFmxlZ2Fsc3R1YiRkeW5DYWxsX2ppamnTBxhsZWdhbHN0dWIkZHluQ2FsbF92aWlqaWnUBxhsZWdhbHN0dWIkZHluQ2FsbF9paWlpaWrVBxlsZWdhbHN0dWIkZHluQ2FsbF9paWlpaWpq1gcabGVnYWxzdHViJGR5bkNhbGxfaWlpaWlpamrXByFsZWdhbGZ1bmMkX2VtYmluZF9yZWdpc3Rlcl9iaWdpbnQHNwQAD19fc3RhY2tfcG9pbnRlcgELX19zdGFja19lbmQCDF9fc3RhY2tfYmFzZQMIdGVtcFJldDAJgQU4AAcucm9kYXRhAQkucm9kYXRhLjECCS5yb2RhdGEuMgMJLnJvZGF0YS4zBAkucm9kYXRhLjQFCS5yb2RhdGEuNQYJLnJvZGF0YS42Bwkucm9kYXRhLjcICS5yb2RhdGEuOAkJLnJvZGF0YS45Cgoucm9kYXRhLjEwCwoucm9kYXRhLjExDAoucm9kYXRhLjEyDQoucm9kYXRhLjEzDgoucm9kYXRhLjE0Dwoucm9kYXRhLjE1EAoucm9kYXRhLjE2EQoucm9kYXRhLjE3Egoucm9kYXRhLjE4Ewoucm9kYXRhLjE5FAoucm9kYXRhLjIwFQoucm9kYXRhLjIxFgoucm9kYXRhLjIyFwoucm9kYXRhLjIzGAoucm9kYXRhLjI0GQoucm9kYXRhLjI1Ggoucm9kYXRhLjI2Gwoucm9kYXRhLjI3HAoucm9kYXRhLjI4HQoucm9kYXRhLjI5Hgoucm9kYXRhLjMwHwoucm9kYXRhLjMxIAoucm9kYXRhLjMyIQoucm9kYXRhLjMzIgoucm9kYXRhLjM0Iwoucm9kYXRhLjM1JAoucm9kYXRhLjM2JQoucm9kYXRhLjM3Jgoucm9kYXRhLjM4Jwoucm9kYXRhLjM5KAoucm9kYXRhLjQwKQoucm9kYXRhLjQxKgoucm9kYXRhLjQyKwoucm9kYXRhLjQzLAoucm9kYXRhLjQ0LQoucm9kYXRhLjQ1Lgoucm9kYXRhLjQ2Lwoucm9kYXRhLjQ3MAoucm9kYXRhLjQ4MQoucm9kYXRhLjQ5MgUuZGF0YTMHLmRhdGEuMTQHLmRhdGEuMjUHLmRhdGEuMzYHLmRhdGEuNDcHLmRhdGEuNQ==';
  if (!isDataURI(wasmBinaryFile)) {
    wasmBinaryFile = locateFile(wasmBinaryFile);
  }

function getBinary(file) {
  try {
    if (file == wasmBinaryFile && wasmBinary) {
      return new Uint8Array(wasmBinary);
    }
    var binary = tryParseAsDataURI(file);
    if (binary) {
      return binary;
    }
    if (readBinary) ;
    throw "both async and sync fetching of the wasm failed";
  }
  catch (err) {
    abort(err);
  }
}

function getBinaryPromise(binaryFile) {
  // If we don't have the binary yet, try to load it asynchronously.
  // Fetch has some additional restrictions over XHR, like it can't be used on a file:// url.
  // See https://github.com/github/fetch/pull/92#issuecomment-140665932
  // Cordova or Electron apps are typically loaded from a file:// url.
  // So use fetch if it is available and the url is not a file, otherwise fall back to XHR.
  if (!wasmBinary && (ENVIRONMENT_IS_WEB )) {
    if (typeof fetch == 'function'
    ) {
      return fetch(binaryFile, { credentials: 'same-origin' }).then(function(response) {
        if (!response['ok']) {
          throw "failed to load wasm binary file at '" + binaryFile + "'";
        }
        return response['arrayBuffer']();
      }).catch(function () {
          return getBinary(binaryFile);
      });
    }
  }

  // Otherwise, getBinary should be able to get it synchronously
  return Promise.resolve().then(function() { return getBinary(binaryFile); });
}

function instantiateArrayBuffer(binaryFile, imports, receiver) {
  return getBinaryPromise(binaryFile).then(function(binary) {
    return WebAssembly.instantiate(binary, imports);
  }).then(function (instance) {
    return instance;
  }).then(receiver, function(reason) {
    err('failed to asynchronously prepare wasm: ' + reason);

    // Warn on some common problems.
    if (isFileURI(wasmBinaryFile)) {
      err('warning: Loading from a file URI (' + wasmBinaryFile + ') is not supported in most browsers. See https://emscripten.org/docs/getting_started/FAQ.html#how-do-i-run-a-local-webserver-for-testing-why-does-my-program-stall-in-downloading-or-preparing');
    }
    abort(reason);
  });
}

function instantiateAsync(binary, binaryFile, imports, callback) {
  if (!binary &&
      typeof WebAssembly.instantiateStreaming == 'function' &&
      !isDataURI(binaryFile) &&
      typeof fetch == 'function') {
    return fetch(binaryFile, { credentials: 'same-origin' }).then(function(response) {
      // Suppress closure warning here since the upstream definition for
      // instantiateStreaming only allows Promise<Repsponse> rather than
      // an actual Response.
      // TODO(https://github.com/google/closure-compiler/pull/3913): Remove if/when upstream closure is fixed.
      /** @suppress {checkTypes} */
      var result = WebAssembly.instantiateStreaming(response, imports);

      return result.then(
        callback,
        function(reason) {
          // We expect the most common failure cause to be a bad MIME type for the binary,
          // in which case falling back to ArrayBuffer instantiation should work.
          err('wasm streaming compile failed: ' + reason);
          err('falling back to ArrayBuffer instantiation');
          return instantiateArrayBuffer(binaryFile, imports, callback);
        });
    });
  } else {
    return instantiateArrayBuffer(binaryFile, imports, callback);
  }
}

// Create the wasm instance.
// Receives the wasm imports, returns the exports.
function createWasm() {
  // prepare imports
  var info = {
    'env': wasmImports,
    'wasi_snapshot_preview1': wasmImports,
  };
  // Load the wasm module and create an instance of using native support in the JS engine.
  // handle a generated wasm instance, receiving its exports and
  // performing other necessary setup
  /** @param {WebAssembly.Module=} module*/
  function receiveInstance(instance, module) {
    var exports = instance.exports;

    Module['asm'] = exports;

    wasmMemory = Module['asm']['memory'];
    assert(wasmMemory, "memory not found in wasm exports");
    // This assertion doesn't hold when emscripten is run in --post-link
    // mode.
    // TODO(sbc): Read INITIAL_MEMORY out of the wasm file in post-link mode.
    //assert(wasmMemory.buffer.byteLength === 16777216);
    updateMemoryViews();

    wasmTable = Module['asm']['__indirect_function_table'];
    assert(wasmTable, "table not found in wasm exports");

    addOnInit(Module['asm']['__wasm_call_ctors']);

    removeRunDependency('wasm-instantiate');

    return exports;
  }
  // wait for the pthread pool (if any)
  addRunDependency('wasm-instantiate');

  // Prefer streaming instantiation if available.
  // Async compilation can be confusing when an error on the page overwrites Module
  // (for example, if the order of elements is wrong, and the one defining Module is
  // later), so we save Module and check it later.
  var trueModule = Module;
  function receiveInstantiationResult(result) {
    // 'result' is a ResultObject object which has both the module and instance.
    // receiveInstance() will swap in the exports (to Module.asm) so they can be called
    assert(Module === trueModule, 'the Module object should not be replaced during async compilation - perhaps the order of HTML elements is wrong?');
    trueModule = null;
    // TODO: Due to Closure regression https://github.com/google/closure-compiler/issues/3193, the above line no longer optimizes out down to the following line.
    // When the regression is fixed, can restore the above PTHREADS-enabled path.
    receiveInstance(result['instance']);
  }

  // User shell pages can write their own Module.instantiateWasm = function(imports, successCallback) callback
  // to manually instantiate the Wasm module themselves. This allows pages to
  // run the instantiation parallel to any other async startup actions they are
  // performing.
  // Also pthreads and wasm workers initialize the wasm instance through this
  // path.
  if (Module['instantiateWasm']) {

    try {
      return Module['instantiateWasm'](info, receiveInstance);
    } catch(e) {
      err('Module.instantiateWasm callback failed with error: ' + e);
        // If instantiation fails, reject the module ready promise.
        readyPromiseReject(e);
    }
  }

  // If instantiation fails, reject the module ready promise.
  instantiateAsync(wasmBinary, wasmBinaryFile, info, receiveInstantiationResult).catch(readyPromiseReject);
  return {}; // no exports yet; we'll fill them in later
}

// Globals used by JS i64 conversions (see makeSetValue)
var tempDouble;
var tempI64;

// include: runtime_debug.js
function legacyModuleProp(prop, newName) {
  if (!Object.getOwnPropertyDescriptor(Module, prop)) {
    Object.defineProperty(Module, prop, {
      configurable: true,
      get: function() {
        abort('Module.' + prop + ' has been replaced with plain ' + newName + ' (the initial value can be provided on Module, but after startup the value is only looked for on a local variable of that name)');
      }
    });
  }
}

function ignoredModuleProp(prop) {
  if (Object.getOwnPropertyDescriptor(Module, prop)) {
    abort('`Module.' + prop + '` was supplied but `' + prop + '` not included in INCOMING_MODULE_JS_API');
  }
}

// forcing the filesystem exports a few things by default
function isExportedByForceFilesystem(name) {
  return name === 'FS_createPath' ||
         name === 'FS_createDataFile' ||
         name === 'FS_createPreloadedFile' ||
         name === 'FS_unlink' ||
         name === 'addRunDependency' ||
         // The old FS has some functionality that WasmFS lacks.
         name === 'FS_createLazyFile' ||
         name === 'FS_createDevice' ||
         name === 'removeRunDependency';
}

function missingGlobal(sym, msg) {
  if (typeof globalThis !== 'undefined') {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get: function() {
        warnOnce('`' + sym + '` is not longer defined by emscripten. ' + msg);
        return undefined;
      }
    });
  }
}

missingGlobal('buffer', 'Please use HEAP8.buffer or wasmMemory.buffer');

function missingLibrarySymbol(sym) {
  if (typeof globalThis !== 'undefined' && !Object.getOwnPropertyDescriptor(globalThis, sym)) {
    Object.defineProperty(globalThis, sym, {
      configurable: true,
      get: function() {
        // Can't `abort()` here because it would break code that does runtime
        // checks.  e.g. `if (typeof SDL === 'undefined')`.
        var msg = '`' + sym + '` is a library symbol and not included by default; add it to your library.js __deps or to DEFAULT_LIBRARY_FUNCS_TO_INCLUDE on the command line';
        // DEFAULT_LIBRARY_FUNCS_TO_INCLUDE requires the name as it appears in
        // library.js, which means $name for a JS name with no prefix, or name
        // for a JS name like _name.
        var librarySymbol = sym;
        if (!librarySymbol.startsWith('_')) {
          librarySymbol = '$' + sym;
        }
        msg += " (e.g. -sDEFAULT_LIBRARY_FUNCS_TO_INCLUDE=" + librarySymbol + ")";
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        warnOnce(msg);
        return undefined;
      }
    });
  }
  // Any symbol that is not included from the JS libary is also (by definition)
  // not exported on the Module object.
  unexportedRuntimeSymbol(sym);
}

function unexportedRuntimeSymbol(sym) {
  if (!Object.getOwnPropertyDescriptor(Module, sym)) {
    Object.defineProperty(Module, sym, {
      configurable: true,
      get: function() {
        var msg = "'" + sym + "' was not exported. add it to EXPORTED_RUNTIME_METHODS (see the FAQ)";
        if (isExportedByForceFilesystem(sym)) {
          msg += '. Alternatively, forcing filesystem support (-sFORCE_FILESYSTEM) can export this for you';
        }
        abort(msg);
      }
    });
  }
}

// end include: runtime_debug.js
// === Body ===

var ASM_CONSTS = {
  42880: ($0, $1) => { const read = $0; const callback = $1; FS.syncfs(read, function(err) { if (err) { console.error('Error syncing FS:', err); dynCall('vi', callback,[-1]); } else { console.log('FS synced successfully'); dynCall('vi', callback,[0]); } }); },  
 43119: ($0, $1) => { let type = UTF8ToString($0); let directory = UTF8ToString($1); let allocatedDir = _malloc(directory.length + 1); stringToUTF8(directory, allocatedDir, directory.length + 1); let jsAllocatedDir = UTF8ToString(allocatedDir); if (type == "IDBFS") { FS.mkdir(jsAllocatedDir); FS.mount(IDBFS, {}, jsAllocatedDir); console.log('EmscriptenFileSystemManager: Mounting IDBFS filesystem...'); } else { throw new Error('Unsupported filesystem type, only NODEFS, IDBFS: ' + type); } FS.syncfs(true, function(err) { if (err) { console.error('EmscriptenFileSystemManager: Error syncing FS:', err); throw new Error('EmscriptenFileSystemManager: Error syncing FS: ' + err); } }); _free(allocatedDir); }
};

  function callRuntimeCallbacks(callbacks) {
      while (callbacks.length > 0) {
        // Pass the module as the first argument.
        callbacks.shift()(Module);
      }
    }

  
  function getCppExceptionTag() {
      // In static linking, tags are defined within the wasm module and are
      // exported, whereas in dynamic linking, tags are defined in library.js in
      // JS code and wasm modules import them.
      return Module['asm']['__cpp_exception'];
    }
  
  function getCppExceptionThrownObjectFromWebAssemblyException(ex) {
      // In Wasm EH, the value extracted from WebAssembly.Exception is a pointer
      // to the unwind header. Convert it to the actual thrown value.
      var unwind_header = ex.getArg(getCppExceptionTag(), 0);
      return ___thrown_object_from_unwind_exception(unwind_header);
    }

  function withStackSave(f) {
      var stack = stackSave();
      var ret = f();
      stackRestore(stack);
      return ret;
    }
  
  
  
  function lengthBytesUTF8(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var c = str.charCodeAt(i); // possibly a lead surrogate
        if (c <= 0x7F) {
          len++;
        } else if (c <= 0x7FF) {
          len += 2;
        } else if (c >= 0xD800 && c <= 0xDFFF) {
          len += 4; ++i;
        } else {
          len += 3;
        }
      }
      return len;
    }
  
  function stringToUTF8Array(str, heap, outIdx, maxBytesToWrite) {
      // Parameter maxBytesToWrite is not optional. Negative values, 0, null,
      // undefined and false each don't write out any bytes.
      if (!(maxBytesToWrite > 0))
        return 0;
  
      var startIdx = outIdx;
      var endIdx = outIdx + maxBytesToWrite - 1; // -1 for string null terminator.
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code
        // unit, not a Unicode code point of the character! So decode
        // UTF16->UTF32->UTF8.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        // For UTF8 byte structure, see http://en.wikipedia.org/wiki/UTF-8#Description
        // and https://www.ietf.org/rfc/rfc2279.txt
        // and https://tools.ietf.org/html/rfc3629
        var u = str.charCodeAt(i); // possibly a lead surrogate
        if (u >= 0xD800 && u <= 0xDFFF) {
          var u1 = str.charCodeAt(++i);
          u = 0x10000 + ((u & 0x3FF) << 10) | (u1 & 0x3FF);
        }
        if (u <= 0x7F) {
          if (outIdx >= endIdx) break;
          heap[outIdx++] = u;
        } else if (u <= 0x7FF) {
          if (outIdx + 1 >= endIdx) break;
          heap[outIdx++] = 0xC0 | (u >> 6);
          heap[outIdx++] = 0x80 | (u & 63);
        } else if (u <= 0xFFFF) {
          if (outIdx + 2 >= endIdx) break;
          heap[outIdx++] = 0xE0 | (u >> 12);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        } else {
          if (outIdx + 3 >= endIdx) break;
          if (u > 0x10FFFF) warnOnce('Invalid Unicode code point ' + ptrToString(u) + ' encountered when serializing a JS string to a UTF-8 string in wasm memory! (Valid unicode code points should be in range 0-0x10FFFF).');
          heap[outIdx++] = 0xF0 | (u >> 18);
          heap[outIdx++] = 0x80 | ((u >> 12) & 63);
          heap[outIdx++] = 0x80 | ((u >> 6) & 63);
          heap[outIdx++] = 0x80 | (u & 63);
        }
      }
      // Null-terminate the pointer to the buffer.
      heap[outIdx] = 0;
      return outIdx - startIdx;
    }
  function stringToUTF8(str, outPtr, maxBytesToWrite) {
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF8(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      return stringToUTF8Array(str, HEAPU8,outPtr, maxBytesToWrite);
    }
  function stringToUTF8OnStack(str) {
      var size = lengthBytesUTF8(str) + 1;
      var ret = stackAlloc(size);
      stringToUTF8(str, ret, size);
      return ret;
    }
  
  var UTF8Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf8') : undefined;
  
    /**
     * Given a pointer 'idx' to a null-terminated UTF8-encoded string in the given
     * array that contains uint8 values, returns a copy of that string as a
     * Javascript String object.
     * heapOrArray is either a regular array, or a JavaScript typed array view.
     * @param {number} idx
     * @param {number=} maxBytesToRead
     * @return {string}
     */
  function UTF8ArrayToString(heapOrArray, idx, maxBytesToRead) {
      var endIdx = idx + maxBytesToRead;
      var endPtr = idx;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.  Also, use the length info to avoid running tiny
      // strings through TextDecoder, since .subarray() allocates garbage.
      // (As a tiny code save trick, compare endPtr against endIdx using a negation,
      // so that undefined means Infinity)
      while (heapOrArray[endPtr] && !(endPtr >= endIdx)) ++endPtr;
  
      if (endPtr - idx > 16 && heapOrArray.buffer && UTF8Decoder) {
        return UTF8Decoder.decode(heapOrArray.subarray(idx, endPtr));
      }
      var str = '';
      // If building with TextDecoder, we have already computed the string length
      // above, so test loop end condition against that
      while (idx < endPtr) {
        // For UTF8 byte structure, see:
        // http://en.wikipedia.org/wiki/UTF-8#Description
        // https://www.ietf.org/rfc/rfc2279.txt
        // https://tools.ietf.org/html/rfc3629
        var u0 = heapOrArray[idx++];
        if (!(u0 & 0x80)) { str += String.fromCharCode(u0); continue; }
        var u1 = heapOrArray[idx++] & 63;
        if ((u0 & 0xE0) == 0xC0) { str += String.fromCharCode(((u0 & 31) << 6) | u1); continue; }
        var u2 = heapOrArray[idx++] & 63;
        if ((u0 & 0xF0) == 0xE0) {
          u0 = ((u0 & 15) << 12) | (u1 << 6) | u2;
        } else {
          if ((u0 & 0xF8) != 0xF0) warnOnce('Invalid UTF-8 leading byte ' + ptrToString(u0) + ' encountered when deserializing a UTF-8 string in wasm memory to a JS string!');
          u0 = ((u0 & 7) << 18) | (u1 << 12) | (u2 << 6) | (heapOrArray[idx++] & 63);
        }
  
        if (u0 < 0x10000) {
          str += String.fromCharCode(u0);
        } else {
          var ch = u0 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        }
      }
      return str;
    }
  
  
    /**
     * Given a pointer 'ptr' to a null-terminated UTF8-encoded string in the
     * emscripten HEAP, returns a copy of that string as a Javascript String object.
     *
     * @param {number} ptr
     * @param {number=} maxBytesToRead - An optional length that specifies the
     *   maximum number of bytes to read. You can omit this parameter to scan the
     *   string until the first   byte. If maxBytesToRead is passed, and the string
     *   at [ptr, ptr+maxBytesToReadr[ contains a null byte in the middle, then the
     *   string will cut short at that byte index (i.e. maxBytesToRead will not
     *   produce a string of exact length [ptr, ptr+maxBytesToRead[) N.B. mixing
     *   frequent uses of UTF8ToString() with and without maxBytesToRead may throw
     *   JS JIT optimizations off, so it is worth to consider consistently using one
     * @return {string}
     */
  function UTF8ToString(ptr, maxBytesToRead) {
      assert(typeof ptr == 'number');
      return ptr ? UTF8ArrayToString(HEAPU8, ptr, maxBytesToRead) : '';
    }
  function demangle(func) {
      // If demangle has failed before, stop demangling any further function names
      // This avoids an infinite recursion with malloc()->abort()->stackTrace()->demangle()->malloc()->...
      demangle.recursionGuard = (demangle.recursionGuard|0)+1;
      if (demangle.recursionGuard > 1) return func;
      return withStackSave(function() {
        try {
          var s = func;
          if (s.startsWith('__Z'))
            s = s.substr(1);
          var buf = stringToUTF8OnStack(s);
          var status = stackAlloc(4);
          var ret = ___cxa_demangle(buf, 0, 0, status);
          if (HEAP32[((status)>>2)] === 0 && ret) {
            return UTF8ToString(ret);
          }
          // otherwise, libcxxabi failed
        } catch(e) {
        } finally {
          _free(ret);
          if (demangle.recursionGuard < 2) --demangle.recursionGuard;
        }
        // failure when using libcxxabi, don't demangle
        return func;
      });
    }

  
  
  
  
  function getExceptionMessageCommon(ptr) {
      return withStackSave(function() {
        var type_addr_addr = stackAlloc(4);
        var message_addr_addr = stackAlloc(4);
        ___get_exception_message(ptr, type_addr_addr, message_addr_addr);
        var type_addr = HEAPU32[((type_addr_addr)>>2)];
        var message_addr = HEAPU32[((message_addr_addr)>>2)];
        var type = UTF8ToString(type_addr);
        _free(type_addr);
        var message;
        if (message_addr) {
          message = UTF8ToString(message_addr);
          _free(message_addr);
        }
        return [type, message];
      });
    }
  function getExceptionMessage(ex) {
      var ptr = getCppExceptionThrownObjectFromWebAssemblyException(ex);
      return getExceptionMessageCommon(ptr);
    }
  Module["getExceptionMessage"] = getExceptionMessage;

  function intArrayToString(array) {
    var ret = [];
    for (var i = 0; i < array.length; i++) {
      var chr = array[i];
      if (chr > 0xFF) {
        assert(false, 'Character code ' + chr + ' (' + String.fromCharCode(chr) + ')  at offset ' + i + ' not in 0x00-0xFF.');
        chr &= 0xFF;
      }
      ret.push(String.fromCharCode(chr));
    }
    return ret.join('');
  }

  function ptrToString(ptr) {
      assert(typeof ptr === 'number');
      return '0x' + ptr.toString(16).padStart(8, '0');
    }
  
  function demangleAll(text) {
      var regex =
        /\b_Z[\w\d_]+/g;
      return text.replace(regex,
        function(x) {
          var y = demangle(x);
          return x === y ? x : (y + ' [' + x + ']');
        });
    }

  function warnOnce(text) {
      if (!warnOnce.shown) warnOnce.shown = {};
      if (!warnOnce.shown[text]) {
        warnOnce.shown[text] = 1;
        err(text);
      }
    }

  function ___assert_fail(condition, filename, line, func) {
      abort('Assertion failed: ' + UTF8ToString(condition) + ', at: ' + [filename ? UTF8ToString(filename) : 'unknown filename', line, func ? UTF8ToString(func) : 'unknown function']);
    }

  function setErrNo(value) {
      HEAP32[((___errno_location())>>2)] = value;
      return value;
    }
  
  var PATH = {isAbs:(path) => path.charAt(0) === '/',splitPath:(filename) => {
        var splitPathRe = /^(\/?|)([\s\S]*?)((?:\.{1,2}|[^\/]+?|)(\.[^.\/]*|))(?:[\/]*)$/;
        return splitPathRe.exec(filename).slice(1);
      },normalizeArray:(parts, allowAboveRoot) => {
        // if the path tries to go above the root, `up` ends up > 0
        var up = 0;
        for (var i = parts.length - 1; i >= 0; i--) {
          var last = parts[i];
          if (last === '.') {
            parts.splice(i, 1);
          } else if (last === '..') {
            parts.splice(i, 1);
            up++;
          } else if (up) {
            parts.splice(i, 1);
            up--;
          }
        }
        // if the path is allowed to go above the root, restore leading ..s
        if (allowAboveRoot) {
          for (; up; up--) {
            parts.unshift('..');
          }
        }
        return parts;
      },normalize:(path) => {
        var isAbsolute = PATH.isAbs(path),
            trailingSlash = path.substr(-1) === '/';
        // Normalize the path
        path = PATH.normalizeArray(path.split('/').filter((p) => !!p), !isAbsolute).join('/');
        if (!path && !isAbsolute) {
          path = '.';
        }
        if (path && trailingSlash) {
          path += '/';
        }
        return (isAbsolute ? '/' : '') + path;
      },dirname:(path) => {
        var result = PATH.splitPath(path),
            root = result[0],
            dir = result[1];
        if (!root && !dir) {
          // No dirname whatsoever
          return '.';
        }
        if (dir) {
          // It has a dirname, strip trailing slash
          dir = dir.substr(0, dir.length - 1);
        }
        return root + dir;
      },basename:(path) => {
        // EMSCRIPTEN return '/'' for '/', not an empty string
        if (path === '/') return '/';
        path = PATH.normalize(path);
        path = path.replace(/\/$/, "");
        var lastSlash = path.lastIndexOf('/');
        if (lastSlash === -1) return path;
        return path.substr(lastSlash+1);
      },join:function() {
        var paths = Array.prototype.slice.call(arguments);
        return PATH.normalize(paths.join('/'));
      },join2:(l, r) => {
        return PATH.normalize(l + '/' + r);
      }};
  
  function initRandomFill() {
      if (typeof crypto == 'object' && typeof crypto['getRandomValues'] == 'function') {
        // for modern web browsers
        return (view) => crypto.getRandomValues(view);
      } else
      // we couldn't find a proper implementation, as Math.random() is not suitable for /dev/random, see emscripten-core/emscripten/pull/7096
      abort("no cryptographic support found for randomDevice. consider polyfilling it if you want to use something insecure like Math.random(), e.g. put this in a --pre-js: var crypto = { getRandomValues: function(array) { for (var i = 0; i < array.length; i++) array[i] = (Math.random()*256)|0 } };");
    }
  function randomFill(view) {
      // Lazily init on the first invocation.
      return (randomFill = initRandomFill())(view);
    }
  
  
  
  var PATH_FS = {resolve:function() {
        var resolvedPath = '',
          resolvedAbsolute = false;
        for (var i = arguments.length - 1; i >= -1 && !resolvedAbsolute; i--) {
          var path = (i >= 0) ? arguments[i] : FS.cwd();
          // Skip empty and invalid entries
          if (typeof path != 'string') {
            throw new TypeError('Arguments to path.resolve must be strings');
          } else if (!path) {
            return ''; // an invalid portion invalidates the whole thing
          }
          resolvedPath = path + '/' + resolvedPath;
          resolvedAbsolute = PATH.isAbs(path);
        }
        // At this point the path should be resolved to a full absolute path, but
        // handle relative paths to be safe (might happen when process.cwd() fails)
        resolvedPath = PATH.normalizeArray(resolvedPath.split('/').filter((p) => !!p), !resolvedAbsolute).join('/');
        return ((resolvedAbsolute ? '/' : '') + resolvedPath) || '.';
      },relative:(from, to) => {
        from = PATH_FS.resolve(from).substr(1);
        to = PATH_FS.resolve(to).substr(1);
        function trim(arr) {
          var start = 0;
          for (; start < arr.length; start++) {
            if (arr[start] !== '') break;
          }
          var end = arr.length - 1;
          for (; end >= 0; end--) {
            if (arr[end] !== '') break;
          }
          if (start > end) return [];
          return arr.slice(start, end - start + 1);
        }
        var fromParts = trim(from.split('/'));
        var toParts = trim(to.split('/'));
        var length = Math.min(fromParts.length, toParts.length);
        var samePartsLength = length;
        for (var i = 0; i < length; i++) {
          if (fromParts[i] !== toParts[i]) {
            samePartsLength = i;
            break;
          }
        }
        var outputParts = [];
        for (var i = samePartsLength; i < fromParts.length; i++) {
          outputParts.push('..');
        }
        outputParts = outputParts.concat(toParts.slice(samePartsLength));
        return outputParts.join('/');
      }};
  
  
  
  /** @type {function(string, boolean=, number=)} */
  function intArrayFromString(stringy, dontAddNull, length) {
    var len = length > 0 ? length : lengthBytesUTF8(stringy)+1;
    var u8array = new Array(len);
    var numBytesWritten = stringToUTF8Array(stringy, u8array, 0, u8array.length);
    if (dontAddNull) u8array.length = numBytesWritten;
    return u8array;
  }
  var TTY = {ttys:[],init:function () {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // currently, FS.init does not distinguish if process.stdin is a file or TTY
        //   // device, it always assumes it's a TTY device. because of this, we're forcing
        //   // process.stdin to UTF8 encoding to at least make stdin reading compatible
        //   // with text files until FS.init can be refactored.
        //   process.stdin.setEncoding('utf8');
        // }
      },shutdown:function() {
        // https://github.com/emscripten-core/emscripten/pull/1555
        // if (ENVIRONMENT_IS_NODE) {
        //   // inolen: any idea as to why node -e 'process.stdin.read()' wouldn't exit immediately (with process.stdin being a tty)?
        //   // isaacs: because now it's reading from the stream, you've expressed interest in it, so that read() kicks off a _read() which creates a ReadReq operation
        //   // inolen: I thought read() in that case was a synchronous operation that just grabbed some amount of buffered data if it exists?
        //   // isaacs: it is. but it also triggers a _read() call, which calls readStart() on the handle
        //   // isaacs: do process.stdin.pause() and i'd think it'd probably close the pending call
        //   process.stdin.pause();
        // }
      },register:function(dev, ops) {
        TTY.ttys[dev] = { input: [], output: [], ops: ops };
        FS.registerDevice(dev, TTY.stream_ops);
      },stream_ops:{open:function(stream) {
          var tty = TTY.ttys[stream.node.rdev];
          if (!tty) {
            throw new FS.ErrnoError(43);
          }
          stream.tty = tty;
          stream.seekable = false;
        },close:function(stream) {
          // flush any pending line data
          stream.tty.ops.fsync(stream.tty);
        },fsync:function(stream) {
          stream.tty.ops.fsync(stream.tty);
        },read:function(stream, buffer, offset, length, pos /* ignored */) {
          if (!stream.tty || !stream.tty.ops.get_char) {
            throw new FS.ErrnoError(60);
          }
          var bytesRead = 0;
          for (var i = 0; i < length; i++) {
            var result;
            try {
              result = stream.tty.ops.get_char(stream.tty);
            } catch (e) {
              throw new FS.ErrnoError(29);
            }
            if (result === undefined && bytesRead === 0) {
              throw new FS.ErrnoError(6);
            }
            if (result === null || result === undefined) break;
            bytesRead++;
            buffer[offset+i] = result;
          }
          if (bytesRead) {
            stream.node.timestamp = Date.now();
          }
          return bytesRead;
        },write:function(stream, buffer, offset, length, pos) {
          if (!stream.tty || !stream.tty.ops.put_char) {
            throw new FS.ErrnoError(60);
          }
          try {
            for (var i = 0; i < length; i++) {
              stream.tty.ops.put_char(stream.tty, buffer[offset+i]);
            }
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
          if (length) {
            stream.node.timestamp = Date.now();
          }
          return i;
        }},default_tty_ops:{get_char:function(tty) {
          if (!tty.input.length) {
            var result = null;
            if (typeof window != 'undefined' &&
              typeof window.prompt == 'function') {
              // Browser.
              result = window.prompt('Input: ');  // returns null on cancel
              if (result !== null) {
                result += '\n';
              }
            } else if (typeof readline == 'function') {
              // Command line.
              result = readline();
              if (result !== null) {
                result += '\n';
              }
            }
            if (!result) {
              return null;
            }
            tty.input = intArrayFromString(result, true);
          }
          return tty.input.shift();
        },put_char:function(tty, val) {
          if (val === null || val === 10) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val); // val == 0 would cut text output off in the middle.
          }
        },fsync:function(tty) {
          if (tty.output && tty.output.length > 0) {
            out(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }},default_tty1_ops:{put_char:function(tty, val) {
          if (val === null || val === 10) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          } else {
            if (val != 0) tty.output.push(val);
          }
        },fsync:function(tty) {
          if (tty.output && tty.output.length > 0) {
            err(UTF8ArrayToString(tty.output, 0));
            tty.output = [];
          }
        }}};
  function mmapAlloc(size) {
      abort('internal error: mmapAlloc called but `emscripten_builtin_memalign` native symbol not exported');
    }
  var MEMFS = {ops_table:null,mount:function(mount) {
        return MEMFS.createNode(null, '/', 16384 | 511 /* 0777 */, 0);
      },createNode:function(parent, name, mode, dev) {
        if (FS.isBlkdev(mode) || FS.isFIFO(mode)) {
          // no supported
          throw new FS.ErrnoError(63);
        }
        if (!MEMFS.ops_table) {
          MEMFS.ops_table = {
            dir: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                lookup: MEMFS.node_ops.lookup,
                mknod: MEMFS.node_ops.mknod,
                rename: MEMFS.node_ops.rename,
                unlink: MEMFS.node_ops.unlink,
                rmdir: MEMFS.node_ops.rmdir,
                readdir: MEMFS.node_ops.readdir,
                symlink: MEMFS.node_ops.symlink
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek
              }
            },
            file: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: {
                llseek: MEMFS.stream_ops.llseek,
                read: MEMFS.stream_ops.read,
                write: MEMFS.stream_ops.write,
                allocate: MEMFS.stream_ops.allocate,
                mmap: MEMFS.stream_ops.mmap,
                msync: MEMFS.stream_ops.msync
              }
            },
            link: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr,
                readlink: MEMFS.node_ops.readlink
              },
              stream: {}
            },
            chrdev: {
              node: {
                getattr: MEMFS.node_ops.getattr,
                setattr: MEMFS.node_ops.setattr
              },
              stream: FS.chrdev_stream_ops
            }
          };
        }
        var node = FS.createNode(parent, name, mode, dev);
        if (FS.isDir(node.mode)) {
          node.node_ops = MEMFS.ops_table.dir.node;
          node.stream_ops = MEMFS.ops_table.dir.stream;
          node.contents = {};
        } else if (FS.isFile(node.mode)) {
          node.node_ops = MEMFS.ops_table.file.node;
          node.stream_ops = MEMFS.ops_table.file.stream;
          node.usedBytes = 0; // The actual number of bytes used in the typed array, as opposed to contents.length which gives the whole capacity.
          // When the byte data of the file is populated, this will point to either a typed array, or a normal JS array. Typed arrays are preferred
          // for performance, and used by default. However, typed arrays are not resizable like normal JS arrays are, so there is a small disk size
          // penalty involved for appending file writes that continuously grow a file similar to std::vector capacity vs used -scheme.
          node.contents = null; 
        } else if (FS.isLink(node.mode)) {
          node.node_ops = MEMFS.ops_table.link.node;
          node.stream_ops = MEMFS.ops_table.link.stream;
        } else if (FS.isChrdev(node.mode)) {
          node.node_ops = MEMFS.ops_table.chrdev.node;
          node.stream_ops = MEMFS.ops_table.chrdev.stream;
        }
        node.timestamp = Date.now();
        // add the new node to the parent
        if (parent) {
          parent.contents[name] = node;
          parent.timestamp = node.timestamp;
        }
        return node;
      },getFileDataAsTypedArray:function(node) {
        if (!node.contents) return new Uint8Array(0);
        if (node.contents.subarray) return node.contents.subarray(0, node.usedBytes); // Make sure to not return excess unused bytes.
        return new Uint8Array(node.contents);
      },expandFileStorage:function(node, newCapacity) {
        var prevCapacity = node.contents ? node.contents.length : 0;
        if (prevCapacity >= newCapacity) return; // No need to expand, the storage was already large enough.
        // Don't expand strictly to the given requested limit if it's only a very small increase, but instead geometrically grow capacity.
        // For small filesizes (<1MB), perform size*2 geometric increase, but for large sizes, do a much more conservative size*1.125 increase to
        // avoid overshooting the allocation cap by a very large margin.
        var CAPACITY_DOUBLING_MAX = 1024 * 1024;
        newCapacity = Math.max(newCapacity, (prevCapacity * (prevCapacity < CAPACITY_DOUBLING_MAX ? 2.0 : 1.125)) >>> 0);
        if (prevCapacity != 0) newCapacity = Math.max(newCapacity, 256); // At minimum allocate 256b for each file when expanding.
        var oldContents = node.contents;
        node.contents = new Uint8Array(newCapacity); // Allocate new storage.
        if (node.usedBytes > 0) node.contents.set(oldContents.subarray(0, node.usedBytes), 0); // Copy old data over to the new storage.
      },resizeFileStorage:function(node, newSize) {
        if (node.usedBytes == newSize) return;
        if (newSize == 0) {
          node.contents = null; // Fully decommit when requesting a resize to zero.
          node.usedBytes = 0;
        } else {
          var oldContents = node.contents;
          node.contents = new Uint8Array(newSize); // Allocate new storage.
          if (oldContents) {
            node.contents.set(oldContents.subarray(0, Math.min(newSize, node.usedBytes))); // Copy old data over to the new storage.
          }
          node.usedBytes = newSize;
        }
      },node_ops:{getattr:function(node) {
          var attr = {};
          // device numbers reuse inode numbers.
          attr.dev = FS.isChrdev(node.mode) ? node.id : 1;
          attr.ino = node.id;
          attr.mode = node.mode;
          attr.nlink = 1;
          attr.uid = 0;
          attr.gid = 0;
          attr.rdev = node.rdev;
          if (FS.isDir(node.mode)) {
            attr.size = 4096;
          } else if (FS.isFile(node.mode)) {
            attr.size = node.usedBytes;
          } else if (FS.isLink(node.mode)) {
            attr.size = node.link.length;
          } else {
            attr.size = 0;
          }
          attr.atime = new Date(node.timestamp);
          attr.mtime = new Date(node.timestamp);
          attr.ctime = new Date(node.timestamp);
          // NOTE: In our implementation, st_blocks = Math.ceil(st_size/st_blksize),
          //       but this is not required by the standard.
          attr.blksize = 4096;
          attr.blocks = Math.ceil(attr.size / attr.blksize);
          return attr;
        },setattr:function(node, attr) {
          if (attr.mode !== undefined) {
            node.mode = attr.mode;
          }
          if (attr.timestamp !== undefined) {
            node.timestamp = attr.timestamp;
          }
          if (attr.size !== undefined) {
            MEMFS.resizeFileStorage(node, attr.size);
          }
        },lookup:function(parent, name) {
          throw FS.genericErrors[44];
        },mknod:function(parent, name, mode, dev) {
          return MEMFS.createNode(parent, name, mode, dev);
        },rename:function(old_node, new_dir, new_name) {
          // if we're overwriting a directory at new_name, make sure it's empty.
          if (FS.isDir(old_node.mode)) {
            var new_node;
            try {
              new_node = FS.lookupNode(new_dir, new_name);
            } catch (e) {
            }
            if (new_node) {
              for (var i in new_node.contents) {
                throw new FS.ErrnoError(55);
              }
            }
          }
          // do the internal rewiring
          delete old_node.parent.contents[old_node.name];
          old_node.parent.timestamp = Date.now();
          old_node.name = new_name;
          new_dir.contents[new_name] = old_node;
          new_dir.timestamp = old_node.parent.timestamp;
          old_node.parent = new_dir;
        },unlink:function(parent, name) {
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },rmdir:function(parent, name) {
          var node = FS.lookupNode(parent, name);
          for (var i in node.contents) {
            throw new FS.ErrnoError(55);
          }
          delete parent.contents[name];
          parent.timestamp = Date.now();
        },readdir:function(node) {
          var entries = ['.', '..'];
          for (var key in node.contents) {
            if (!node.contents.hasOwnProperty(key)) {
              continue;
            }
            entries.push(key);
          }
          return entries;
        },symlink:function(parent, newname, oldpath) {
          var node = MEMFS.createNode(parent, newname, 511 /* 0777 */ | 40960, 0);
          node.link = oldpath;
          return node;
        },readlink:function(node) {
          if (!FS.isLink(node.mode)) {
            throw new FS.ErrnoError(28);
          }
          return node.link;
        }},stream_ops:{read:function(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= stream.node.usedBytes) return 0;
          var size = Math.min(stream.node.usedBytes - position, length);
          assert(size >= 0);
          if (size > 8 && contents.subarray) { // non-trivial, and typed array
            buffer.set(contents.subarray(position, position + size), offset);
          } else {
            for (var i = 0; i < size; i++) buffer[offset + i] = contents[position + i];
          }
          return size;
        },write:function(stream, buffer, offset, length, position, canOwn) {
          // The data buffer should be a typed array view
          assert(!(buffer instanceof ArrayBuffer));
          // If the buffer is located in main memory (HEAP), and if
          // memory can grow, we can't hold on to references of the
          // memory buffer, as they may get invalidated. That means we
          // need to do copy its contents.
          if (buffer.buffer === HEAP8.buffer) {
            canOwn = false;
          }
  
          if (!length) return 0;
          var node = stream.node;
          node.timestamp = Date.now();
  
          if (buffer.subarray && (!node.contents || node.contents.subarray)) { // This write is from a typed array to a typed array?
            if (canOwn) {
              assert(position === 0, 'canOwn must imply no weird position inside the file');
              node.contents = buffer.subarray(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (node.usedBytes === 0 && position === 0) { // If this is a simple first write to an empty file, do a fast set since we don't need to care about old data.
              node.contents = buffer.slice(offset, offset + length);
              node.usedBytes = length;
              return length;
            } else if (position + length <= node.usedBytes) { // Writing to an already allocated and used subrange of the file?
              node.contents.set(buffer.subarray(offset, offset + length), position);
              return length;
            }
          }
  
          // Appending to an existing file and we need to reallocate, or source data did not come as a typed array.
          MEMFS.expandFileStorage(node, position+length);
          if (node.contents.subarray && buffer.subarray) {
            // Use typed array write which is available.
            node.contents.set(buffer.subarray(offset, offset + length), position);
          } else {
            for (var i = 0; i < length; i++) {
             node.contents[position + i] = buffer[offset + i]; // Or fall back to manual write if not.
            }
          }
          node.usedBytes = Math.max(node.usedBytes, position + length);
          return length;
        },llseek:function(stream, offset, whence) {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              position += stream.node.usedBytes;
            }
          }
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
          return position;
        },allocate:function(stream, offset, length) {
          MEMFS.expandFileStorage(stream.node, offset + length);
          stream.node.usedBytes = Math.max(stream.node.usedBytes, offset + length);
        },mmap:function(stream, length, position, prot, flags) {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
          var ptr;
          var allocated;
          var contents = stream.node.contents;
          // Only make a new copy when MAP_PRIVATE is specified.
          if (!(flags & 2) && contents.buffer === HEAP8.buffer) {
            // We can't emulate MAP_SHARED when the file is not backed by the
            // buffer we're mapping to (e.g. the HEAP buffer).
            allocated = false;
            ptr = contents.byteOffset;
          } else {
            // Try to avoid unnecessary slices.
            if (position > 0 || position + length < contents.length) {
              if (contents.subarray) {
                contents = contents.subarray(position, position + length);
              } else {
                contents = Array.prototype.slice.call(contents, position, position + length);
              }
            }
            allocated = true;
            ptr = mmapAlloc();
            if (!ptr) {
              throw new FS.ErrnoError(48);
            }
            HEAP8.set(contents, ptr);
          }
          return { ptr: ptr, allocated: allocated };
        },msync:function(stream, buffer, offset, length, mmapFlags) {
          MEMFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  /** @param {boolean=} noRunDep */
  function asyncLoad(url, onload, onerror, noRunDep) {
      var dep = !noRunDep ? getUniqueRunDependency('al ' + url) : '';
      readAsync(url, (arrayBuffer) => {
        assert(arrayBuffer, 'Loading data file "' + url + '" failed (no arrayBuffer).');
        onload(new Uint8Array(arrayBuffer));
        if (dep) removeRunDependency(dep);
      }, (event) => {
        if (onerror) {
          onerror();
        } else {
          throw 'Loading data file "' + url + '" failed.';
        }
      });
      if (dep) addRunDependency(dep);
    }
  
  
  
  
  
  
  var IDBFS = {dbs:{},indexedDB:() => {
        if (typeof indexedDB != 'undefined') return indexedDB;
        var ret = null;
        if (typeof window == 'object') ret = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
        assert(ret, 'IDBFS used, but indexedDB not supported');
        return ret;
      },DB_VERSION:21,DB_STORE_NAME:"FILE_DATA",mount:function(mount) {
        // reuse all of the core MEMFS functionality
        return MEMFS.mount.apply(null, arguments);
      },syncfs:(mount, populate, callback) => {
        IDBFS.getLocalSet(mount, (err, local) => {
          if (err) return callback(err);
  
          IDBFS.getRemoteSet(mount, (err, remote) => {
            if (err) return callback(err);
  
            var src = populate ? remote : local;
            var dst = populate ? local : remote;
  
            IDBFS.reconcile(src, dst, callback);
          });
        });
      },quit:() => {
        Object.values(IDBFS.dbs).forEach((value) => value.close());
        IDBFS.dbs = {};
      },getDB:(name, callback) => {
        // check the cache first
        var db = IDBFS.dbs[name];
        if (db) {
          return callback(null, db);
        }
  
        var req;
        try {
          req = IDBFS.indexedDB().open(name, IDBFS.DB_VERSION);
        } catch (e) {
          return callback(e);
        }
        if (!req) {
          return callback("Unable to connect to IndexedDB");
        }
        req.onupgradeneeded = (e) => {
          var db = /** @type {IDBDatabase} */ (e.target.result);
          var transaction = e.target.transaction;
  
          var fileStore;
  
          if (db.objectStoreNames.contains(IDBFS.DB_STORE_NAME)) {
            fileStore = transaction.objectStore(IDBFS.DB_STORE_NAME);
          } else {
            fileStore = db.createObjectStore(IDBFS.DB_STORE_NAME);
          }
  
          if (!fileStore.indexNames.contains('timestamp')) {
            fileStore.createIndex('timestamp', 'timestamp', { unique: false });
          }
        };
        req.onsuccess = () => {
          db = /** @type {IDBDatabase} */ (req.result);
  
          // add to the cache
          IDBFS.dbs[name] = db;
          callback(null, db);
        };
        req.onerror = (e) => {
          callback(this.error);
          e.preventDefault();
        };
      },getLocalSet:(mount, callback) => {
        var entries = {};
  
        function isRealDir(p) {
          return p !== '.' && p !== '..';
        }        function toAbsolute(root) {
          return (p) => {
            return PATH.join2(root, p);
          }
        }  
        var check = FS.readdir(mount.mountpoint).filter(isRealDir).map(toAbsolute(mount.mountpoint));
  
        while (check.length) {
          var path = check.pop();
          var stat;
  
          try {
            stat = FS.stat(path);
          } catch (e) {
            return callback(e);
          }
  
          if (FS.isDir(stat.mode)) {
            check.push.apply(check, FS.readdir(path).filter(isRealDir).map(toAbsolute(path)));
          }
  
          entries[path] = { 'timestamp': stat.mtime };
        }
  
        return callback(null, { type: 'local', entries: entries });
      },getRemoteSet:(mount, callback) => {
        var entries = {};
  
        IDBFS.getDB(mount.mountpoint, (err, db) => {
          if (err) return callback(err);
  
          try {
            var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readonly');
            transaction.onerror = (e) => {
              callback(this.error);
              e.preventDefault();
            };
  
            var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
            var index = store.index('timestamp');
  
            index.openKeyCursor().onsuccess = (event) => {
              var cursor = event.target.result;
  
              if (!cursor) {
                return callback(null, { type: 'remote', db: db, entries: entries });
              }
  
              entries[cursor.primaryKey] = { 'timestamp': cursor.key };
  
              cursor.continue();
            };
          } catch (e) {
            return callback(e);
          }
        });
      },loadLocalEntry:(path, callback) => {
        var stat, node;
  
        try {
          var lookup = FS.lookupPath(path);
          node = lookup.node;
          stat = FS.stat(path);
        } catch (e) {
          return callback(e);
        }
  
        if (FS.isDir(stat.mode)) {
          return callback(null, { 'timestamp': stat.mtime, 'mode': stat.mode });
        } else if (FS.isFile(stat.mode)) {
          // Performance consideration: storing a normal JavaScript array to a IndexedDB is much slower than storing a typed array.
          // Therefore always convert the file contents to a typed array first before writing the data to IndexedDB.
          node.contents = MEMFS.getFileDataAsTypedArray(node);
          return callback(null, { 'timestamp': stat.mtime, 'mode': stat.mode, 'contents': node.contents });
        } else {
          return callback(new Error('node type not supported'));
        }
      },storeLocalEntry:(path, entry, callback) => {
        try {
          if (FS.isDir(entry['mode'])) {
            FS.mkdirTree(path, entry['mode']);
          } else if (FS.isFile(entry['mode'])) {
            FS.writeFile(path, entry['contents'], { canOwn: true });
          } else {
            return callback(new Error('node type not supported'));
          }
  
          FS.chmod(path, entry['mode']);
          FS.utime(path, entry['timestamp'], entry['timestamp']);
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },removeLocalEntry:(path, callback) => {
        try {
          var stat = FS.stat(path);
  
          if (FS.isDir(stat.mode)) {
            FS.rmdir(path);
          } else if (FS.isFile(stat.mode)) {
            FS.unlink(path);
          }
        } catch (e) {
          return callback(e);
        }
  
        callback(null);
      },loadRemoteEntry:(store, path, callback) => {
        var req = store.get(path);
        req.onsuccess = (event) => { callback(null, event.target.result); };
        req.onerror = (e) => {
          callback(this.error);
          e.preventDefault();
        };
      },storeRemoteEntry:(store, path, entry, callback) => {
        try {
          var req = store.put(entry, path);
        } catch (e) {
          callback(e);
          return;
        }
        req.onsuccess = () => { callback(null); };
        req.onerror = (e) => {
          callback(this.error);
          e.preventDefault();
        };
      },removeRemoteEntry:(store, path, callback) => {
        var req = store.delete(path);
        req.onsuccess = () => { callback(null); };
        req.onerror = (e) => {
          callback(this.error);
          e.preventDefault();
        };
      },reconcile:(src, dst, callback) => {
        var total = 0;
  
        var create = [];
        Object.keys(src.entries).forEach(function (key) {
          var e = src.entries[key];
          var e2 = dst.entries[key];
          if (!e2 || e['timestamp'].getTime() != e2['timestamp'].getTime()) {
            create.push(key);
            total++;
          }
        });
  
        var remove = [];
        Object.keys(dst.entries).forEach(function (key) {
          if (!src.entries[key]) {
            remove.push(key);
            total++;
          }
        });
  
        if (!total) {
          return callback(null);
        }
  
        var errored = false;
        var db = src.type === 'remote' ? src.db : dst.db;
        var transaction = db.transaction([IDBFS.DB_STORE_NAME], 'readwrite');
        var store = transaction.objectStore(IDBFS.DB_STORE_NAME);
  
        function done(err) {
          if (err && !errored) {
            errored = true;
            return callback(err);
          }
        }  
        transaction.onerror = (e) => {
          done(this.error);
          e.preventDefault();
        };
  
        transaction.oncomplete = (e) => {
          if (!errored) {
            callback(null);
          }
        };
  
        // sort paths in ascending order so directory entries are created
        // before the files inside them
        create.sort().forEach((path) => {
          if (dst.type === 'local') {
            IDBFS.loadRemoteEntry(store, path, (err, entry) => {
              if (err) return done(err);
              IDBFS.storeLocalEntry(path, entry, done);
            });
          } else {
            IDBFS.loadLocalEntry(path, (err, entry) => {
              if (err) return done(err);
              IDBFS.storeRemoteEntry(store, path, entry, done);
            });
          }
        });
  
        // sort paths in descending order so files are deleted before their
        // parent directories
        remove.sort().reverse().forEach((path) => {
          if (dst.type === 'local') {
            IDBFS.removeLocalEntry(path, done);
          } else {
            IDBFS.removeRemoteEntry(store, path, done);
          }
        });
      }};
  
  
  
  var ERRNO_CODES = {};
  
  var NODEFS = {isWindows:false,staticInit:() => {
        NODEFS.isWindows = !!process.platform.match(/^win/);
        var flags = process.binding("constants");
        // Node.js 4 compatibility: it has no namespaces for constants
        if (flags["fs"]) {
          flags = flags["fs"];
        }
        NODEFS.flagsForNodeMap = {
          "1024": flags["O_APPEND"],
          "64": flags["O_CREAT"],
          "128": flags["O_EXCL"],
          "256": flags["O_NOCTTY"],
          "0": flags["O_RDONLY"],
          "2": flags["O_RDWR"],
          "4096": flags["O_SYNC"],
          "512": flags["O_TRUNC"],
          "1": flags["O_WRONLY"],
          "131072": flags["O_NOFOLLOW"],
        };
        // The 0 define must match on both sides, as otherwise we would not
        // know to add it.
        assert(NODEFS.flagsForNodeMap["0"] === 0);
      },convertNodeCode:(e) => {
        var code = e.code;
        assert(code in ERRNO_CODES, 'unexpected node error code: ' + code + ' (' + e + ')');
        return ERRNO_CODES[code];
      },mount:(mount) => {
        assert(ENVIRONMENT_IS_NODE);
        return NODEFS.createNode(null, '/', NODEFS.getMode(mount.opts.root), 0);
      },createNode:(parent, name, mode, dev) => {
        if (!FS.isDir(mode) && !FS.isFile(mode) && !FS.isLink(mode)) {
          throw new FS.ErrnoError(28);
        }
        var node = FS.createNode(parent, name, mode);
        node.node_ops = NODEFS.node_ops;
        node.stream_ops = NODEFS.stream_ops;
        return node;
      },getMode:(path) => {
        var stat;
        try {
          stat = fs.lstatSync(path);
          if (NODEFS.isWindows) {
            // Node.js on Windows never represents permission bit 'x', so
            // propagate read bits to execute bits
            stat.mode = stat.mode | ((stat.mode & 292) >> 2);
          }
        } catch (e) {
          if (!e.code) throw e;
          throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
        }
        return stat.mode;
      },realPath:(node) => {
        var parts = [];
        while (node.parent !== node) {
          parts.push(node.name);
          node = node.parent;
        }
        parts.push(node.mount.opts.root);
        parts.reverse();
        return PATH.join.apply(null, parts);
      },flagsForNode:(flags) => {
        flags &= ~2097152; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~2048; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~32768; // Ignore this flag from musl, otherwise node.js fails to open the file.
        flags &= ~524288; // Some applications may pass it; it makes no sense for a single process.
        flags &= ~65536; // Node.js doesn't need this passed in, it errors.
        var newFlags = 0;
        for (var k in NODEFS.flagsForNodeMap) {
          if (flags & k) {
            newFlags |= NODEFS.flagsForNodeMap[k];
            flags ^= k;
          }
        }
        if (flags) {
          throw new FS.ErrnoError(28);
        }
        return newFlags;
      },node_ops:{getattr:(node) => {
          var path = NODEFS.realPath(node);
          var stat;
          try {
            stat = fs.lstatSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
          // node.js v0.10.20 doesn't report blksize and blocks on Windows. Fake them with default blksize of 4096.
          // See http://support.microsoft.com/kb/140365
          if (NODEFS.isWindows && !stat.blksize) {
            stat.blksize = 4096;
          }
          if (NODEFS.isWindows && !stat.blocks) {
            stat.blocks = (stat.size+stat.blksize-1)/stat.blksize|0;
          }
          return {
            dev: stat.dev,
            ino: stat.ino,
            mode: stat.mode,
            nlink: stat.nlink,
            uid: stat.uid,
            gid: stat.gid,
            rdev: stat.rdev,
            size: stat.size,
            atime: stat.atime,
            mtime: stat.mtime,
            ctime: stat.ctime,
            blksize: stat.blksize,
            blocks: stat.blocks
          };
        },setattr:(node, attr) => {
          var path = NODEFS.realPath(node);
          try {
            if (attr.mode !== undefined) {
              fs.chmodSync(path, attr.mode);
              // update the common node structure mode as well
              node.mode = attr.mode;
            }
            if (attr.timestamp !== undefined) {
              var date = new Date(attr.timestamp);
              fs.utimesSync(path, date, date);
            }
            if (attr.size !== undefined) {
              fs.truncateSync(path, attr.size);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },lookup:(parent, name) => {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          var mode = NODEFS.getMode(path);
          return NODEFS.createNode(parent, name, mode);
        },mknod:(parent, name, mode, dev) => {
          var node = NODEFS.createNode(parent, name, mode, dev);
          // create the backing node for this in the fs root as well
          var path = NODEFS.realPath(node);
          try {
            if (FS.isDir(node.mode)) {
              fs.mkdirSync(path, node.mode);
            } else {
              fs.writeFileSync(path, '', { mode: node.mode });
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
          return node;
        },rename:(oldNode, newDir, newName) => {
          var oldPath = NODEFS.realPath(oldNode);
          var newPath = PATH.join2(NODEFS.realPath(newDir), newName);
          try {
            fs.renameSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
          oldNode.name = newName;
        },unlink:(parent, name) => {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.unlinkSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },rmdir:(parent, name) => {
          var path = PATH.join2(NODEFS.realPath(parent), name);
          try {
            fs.rmdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },readdir:(node) => {
          var path = NODEFS.realPath(node);
          try {
            return fs.readdirSync(path);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },symlink:(parent, newName, oldPath) => {
          var newPath = PATH.join2(NODEFS.realPath(parent), newName);
          try {
            fs.symlinkSync(oldPath, newPath);
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },readlink:(node) => {
          var path = NODEFS.realPath(node);
          try {
            path = fs.readlinkSync(path);
            path = nodePath.relative(nodePath.resolve(node.mount.opts.root), path);
            return path;
          } catch (e) {
            if (!e.code) throw e;
            // node under windows can return code 'UNKNOWN' here:
            // https://github.com/emscripten-core/emscripten/issues/15468
            if (e.code === 'UNKNOWN') throw new FS.ErrnoError(28);
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        }},stream_ops:{open:(stream) => {
          var path = NODEFS.realPath(stream.node);
          try {
            if (FS.isFile(stream.node.mode)) {
              stream.nfd = fs.openSync(path, NODEFS.flagsForNode(stream.flags));
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },close:(stream) => {
          try {
            if (FS.isFile(stream.node.mode) && stream.nfd) {
              fs.closeSync(stream.nfd);
            }
          } catch (e) {
            if (!e.code) throw e;
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },read:(stream, buffer, offset, length, position) => {
          // Node.js < 6 compatibility: node errors on 0 length reads
          if (length === 0) return 0;
          try {
            return fs.readSync(stream.nfd, Buffer.from(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },write:(stream, buffer, offset, length, position) => {
          try {
            return fs.writeSync(stream.nfd, Buffer.from(buffer.buffer), offset, length, position);
          } catch (e) {
            throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
          }
        },llseek:(stream, offset, whence) => {
          var position = offset;
          if (whence === 1) {
            position += stream.position;
          } else if (whence === 2) {
            if (FS.isFile(stream.node.mode)) {
              try {
                var stat = fs.fstatSync(stream.nfd);
                position += stat.size;
              } catch (e) {
                throw new FS.ErrnoError(NODEFS.convertNodeCode(e));
              }
            }
          }
  
          if (position < 0) {
            throw new FS.ErrnoError(28);
          }
  
          return position;
        },mmap:(stream, length, position, prot, flags) => {
          if (!FS.isFile(stream.node.mode)) {
            throw new FS.ErrnoError(43);
          }
  
          var ptr = mmapAlloc();
  
          NODEFS.stream_ops.read(stream, HEAP8, ptr, length, position);
          return { ptr: ptr, allocated: true };
        },msync:(stream, buffer, offset, length, mmapFlags) => {
          NODEFS.stream_ops.write(stream, buffer, 0, length, offset, false);
          // should we check if bytesWritten and length are the same?
          return 0;
        }}};
  
  var ERRNO_MESSAGES = {0:"Success",1:"Arg list too long",2:"Permission denied",3:"Address already in use",4:"Address not available",5:"Address family not supported by protocol family",6:"No more processes",7:"Socket already connected",8:"Bad file number",9:"Trying to read unreadable message",10:"Mount device busy",11:"Operation canceled",12:"No children",13:"Connection aborted",14:"Connection refused",15:"Connection reset by peer",16:"File locking deadlock error",17:"Destination address required",18:"Math arg out of domain of func",19:"Quota exceeded",20:"File exists",21:"Bad address",22:"File too large",23:"Host is unreachable",24:"Identifier removed",25:"Illegal byte sequence",26:"Connection already in progress",27:"Interrupted system call",28:"Invalid argument",29:"I/O error",30:"Socket is already connected",31:"Is a directory",32:"Too many symbolic links",33:"Too many open files",34:"Too many links",35:"Message too long",36:"Multihop attempted",37:"File or path name too long",38:"Network interface is not configured",39:"Connection reset by network",40:"Network is unreachable",41:"Too many open files in system",42:"No buffer space available",43:"No such device",44:"No such file or directory",45:"Exec format error",46:"No record locks available",47:"The link has been severed",48:"Not enough core",49:"No message of desired type",50:"Protocol not available",51:"No space left on device",52:"Function not implemented",53:"Socket is not connected",54:"Not a directory",55:"Directory not empty",56:"State not recoverable",57:"Socket operation on non-socket",59:"Not a typewriter",60:"No such device or address",61:"Value too large for defined data type",62:"Previous owner died",63:"Not super-user",64:"Broken pipe",65:"Protocol error",66:"Unknown protocol",67:"Protocol wrong type for socket",68:"Math result not representable",69:"Read only file system",70:"Illegal seek",71:"No such process",72:"Stale file handle",73:"Connection timed out",74:"Text file busy",75:"Cross-device link",100:"Device not a stream",101:"Bad font file fmt",102:"Invalid slot",103:"Invalid request code",104:"No anode",105:"Block device required",106:"Channel number out of range",107:"Level 3 halted",108:"Level 3 reset",109:"Link number out of range",110:"Protocol driver not attached",111:"No CSI structure available",112:"Level 2 halted",113:"Invalid exchange",114:"Invalid request descriptor",115:"Exchange full",116:"No data (for no delay io)",117:"Timer expired",118:"Out of streams resources",119:"Machine is not on the network",120:"Package not installed",121:"The object is remote",122:"Advertise error",123:"Srmount error",124:"Communication error on send",125:"Cross mount point (not really error)",126:"Given log. name not unique",127:"f.d. invalid for this operation",128:"Remote address changed",129:"Can   access a needed shared lib",130:"Accessing a corrupted shared lib",131:".lib section in a.out corrupted",132:"Attempting to link in too many libs",133:"Attempting to exec a shared library",135:"Streams pipe error",136:"Too many users",137:"Socket type not supported",138:"Not supported",139:"Protocol family not supported",140:"Can't send after socket shutdown",141:"Too many references",142:"Host is down",148:"No medium (in tape drive)",156:"Level 2 not synchronized"};
  
  
  var FS = {root:null,mounts:[],devices:{},streams:[],nextInode:1,nameTable:null,currentPath:"/",initialized:false,ignorePermissions:true,ErrnoError:null,genericErrors:{},filesystems:null,syncFSRequests:0,lookupPath:(path, opts = {}) => {
        path = PATH_FS.resolve(path);
  
        if (!path) return { path: '', node: null };
  
        var defaults = {
          follow_mount: true,
          recurse_count: 0
        };
        opts = Object.assign(defaults, opts);
  
        if (opts.recurse_count > 8) {  // max recursive lookup of 8
          throw new FS.ErrnoError(32);
        }
  
        // split the absolute path
        var parts = path.split('/').filter((p) => !!p);
  
        // start at the root
        var current = FS.root;
        var current_path = '/';
  
        for (var i = 0; i < parts.length; i++) {
          var islast = (i === parts.length-1);
          if (islast && opts.parent) {
            // stop resolving
            break;
          }
  
          current = FS.lookupNode(current, parts[i]);
          current_path = PATH.join2(current_path, parts[i]);
  
          // jump to the mount's root node if this is a mountpoint
          if (FS.isMountpoint(current)) {
            if (!islast || (islast && opts.follow_mount)) {
              current = current.mounted.root;
            }
          }
  
          // by default, lookupPath will not follow a symlink if it is the final path component.
          // setting opts.follow = true will override this behavior.
          if (!islast || opts.follow) {
            var count = 0;
            while (FS.isLink(current.mode)) {
              var link = FS.readlink(current_path);
              current_path = PATH_FS.resolve(PATH.dirname(current_path), link);
  
              var lookup = FS.lookupPath(current_path, { recurse_count: opts.recurse_count + 1 });
              current = lookup.node;
  
              if (count++ > 40) {  // limit max consecutive symlinks to 40 (SYMLOOP_MAX).
                throw new FS.ErrnoError(32);
              }
            }
          }
        }
  
        return { path: current_path, node: current };
      },getPath:(node) => {
        var path;
        while (true) {
          if (FS.isRoot(node)) {
            var mount = node.mount.mountpoint;
            if (!path) return mount;
            return mount[mount.length-1] !== '/' ? mount + '/' + path : mount + path;
          }
          path = path ? node.name + '/' + path : node.name;
          node = node.parent;
        }
      },hashName:(parentid, name) => {
        var hash = 0;
  
        for (var i = 0; i < name.length; i++) {
          hash = ((hash << 5) - hash + name.charCodeAt(i)) | 0;
        }
        return ((parentid + hash) >>> 0) % FS.nameTable.length;
      },hashAddNode:(node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        node.name_next = FS.nameTable[hash];
        FS.nameTable[hash] = node;
      },hashRemoveNode:(node) => {
        var hash = FS.hashName(node.parent.id, node.name);
        if (FS.nameTable[hash] === node) {
          FS.nameTable[hash] = node.name_next;
        } else {
          var current = FS.nameTable[hash];
          while (current) {
            if (current.name_next === node) {
              current.name_next = node.name_next;
              break;
            }
            current = current.name_next;
          }
        }
      },lookupNode:(parent, name) => {
        var errCode = FS.mayLookup(parent);
        if (errCode) {
          throw new FS.ErrnoError(errCode, parent);
        }
        var hash = FS.hashName(parent.id, name);
        for (var node = FS.nameTable[hash]; node; node = node.name_next) {
          var nodeName = node.name;
          if (node.parent.id === parent.id && nodeName === name) {
            return node;
          }
        }
        // if we failed to find it in the cache, call into the VFS
        return FS.lookup(parent, name);
      },createNode:(parent, name, mode, rdev) => {
        assert(typeof parent == 'object');
        var node = new FS.FSNode(parent, name, mode, rdev);
  
        FS.hashAddNode(node);
  
        return node;
      },destroyNode:(node) => {
        FS.hashRemoveNode(node);
      },isRoot:(node) => {
        return node === node.parent;
      },isMountpoint:(node) => {
        return !!node.mounted;
      },isFile:(mode) => {
        return (mode & 61440) === 32768;
      },isDir:(mode) => {
        return (mode & 61440) === 16384;
      },isLink:(mode) => {
        return (mode & 61440) === 40960;
      },isChrdev:(mode) => {
        return (mode & 61440) === 8192;
      },isBlkdev:(mode) => {
        return (mode & 61440) === 24576;
      },isFIFO:(mode) => {
        return (mode & 61440) === 4096;
      },isSocket:(mode) => {
        return (mode & 49152) === 49152;
      },flagModes:{"r":0,"r+":2,"w":577,"w+":578,"a":1089,"a+":1090},modeStringToFlags:(str) => {
        var flags = FS.flagModes[str];
        if (typeof flags == 'undefined') {
          throw new Error('Unknown file open mode: ' + str);
        }
        return flags;
      },flagsToPermissionString:(flag) => {
        var perms = ['r', 'w', 'rw'][flag & 3];
        if ((flag & 512)) {
          perms += 'w';
        }
        return perms;
      },nodePermissions:(node, perms) => {
        if (FS.ignorePermissions) {
          return 0;
        }
        // return 0 if any user, group or owner bits are set.
        if (perms.includes('r') && !(node.mode & 292)) {
          return 2;
        } else if (perms.includes('w') && !(node.mode & 146)) {
          return 2;
        } else if (perms.includes('x') && !(node.mode & 73)) {
          return 2;
        }
        return 0;
      },mayLookup:(dir) => {
        var errCode = FS.nodePermissions(dir, 'x');
        if (errCode) return errCode;
        if (!dir.node_ops.lookup) return 2;
        return 0;
      },mayCreate:(dir, name) => {
        try {
          var node = FS.lookupNode(dir, name);
          return 20;
        } catch (e) {
        }
        return FS.nodePermissions(dir, 'wx');
      },mayDelete:(dir, name, isdir) => {
        var node;
        try {
          node = FS.lookupNode(dir, name);
        } catch (e) {
          return e.errno;
        }
        var errCode = FS.nodePermissions(dir, 'wx');
        if (errCode) {
          return errCode;
        }
        if (isdir) {
          if (!FS.isDir(node.mode)) {
            return 54;
          }
          if (FS.isRoot(node) || FS.getPath(node) === FS.cwd()) {
            return 10;
          }
        } else {
          if (FS.isDir(node.mode)) {
            return 31;
          }
        }
        return 0;
      },mayOpen:(node, flags) => {
        if (!node) {
          return 44;
        }
        if (FS.isLink(node.mode)) {
          return 32;
        } else if (FS.isDir(node.mode)) {
          if (FS.flagsToPermissionString(flags) !== 'r' || // opening for write
              (flags & 512)) { // TODO: check for O_SEARCH? (== search for dir only)
            return 31;
          }
        }
        return FS.nodePermissions(node, FS.flagsToPermissionString(flags));
      },MAX_OPEN_FDS:4096,nextfd:(fd_start = 0, fd_end = FS.MAX_OPEN_FDS) => {
        for (var fd = fd_start; fd <= fd_end; fd++) {
          if (!FS.streams[fd]) {
            return fd;
          }
        }
        throw new FS.ErrnoError(33);
      },getStream:(fd) => FS.streams[fd],createStream:(stream, fd_start, fd_end) => {
        if (!FS.FSStream) {
          FS.FSStream = /** @constructor */ function() {
            this.shared = { };
          };
          FS.FSStream.prototype = {};
          Object.defineProperties(FS.FSStream.prototype, {
            object: {
              /** @this {FS.FSStream} */
              get: function() { return this.node; },
              /** @this {FS.FSStream} */
              set: function(val) { this.node = val; }
            },
            isRead: {
              /** @this {FS.FSStream} */
              get: function() { return (this.flags & 2097155) !== 1; }
            },
            isWrite: {
              /** @this {FS.FSStream} */
              get: function() { return (this.flags & 2097155) !== 0; }
            },
            isAppend: {
              /** @this {FS.FSStream} */
              get: function() { return (this.flags & 1024); }
            },
            flags: {
              /** @this {FS.FSStream} */
              get: function() { return this.shared.flags; },
              /** @this {FS.FSStream} */
              set: function(val) { this.shared.flags = val; },
            },
            position : {
              /** @this {FS.FSStream} */
              get: function() { return this.shared.position; },
              /** @this {FS.FSStream} */
              set: function(val) { this.shared.position = val; },
            },
          });
        }
        // clone it, so we can return an instance of FSStream
        stream = Object.assign(new FS.FSStream(), stream);
        var fd = FS.nextfd(fd_start, fd_end);
        stream.fd = fd;
        FS.streams[fd] = stream;
        return stream;
      },closeStream:(fd) => {
        FS.streams[fd] = null;
      },chrdev_stream_ops:{open:(stream) => {
          var device = FS.getDevice(stream.node.rdev);
          // override node's stream ops with the device's
          stream.stream_ops = device.stream_ops;
          // forward the open call
          if (stream.stream_ops.open) {
            stream.stream_ops.open(stream);
          }
        },llseek:() => {
          throw new FS.ErrnoError(70);
        }},major:(dev) => ((dev) >> 8),minor:(dev) => ((dev) & 0xff),makedev:(ma, mi) => ((ma) << 8 | (mi)),registerDevice:(dev, ops) => {
        FS.devices[dev] = { stream_ops: ops };
      },getDevice:(dev) => FS.devices[dev],getMounts:(mount) => {
        var mounts = [];
        var check = [mount];
  
        while (check.length) {
          var m = check.pop();
  
          mounts.push(m);
  
          check.push.apply(check, m.mounts);
        }
  
        return mounts;
      },syncfs:(populate, callback) => {
        if (typeof populate == 'function') {
          callback = populate;
          populate = false;
        }
  
        FS.syncFSRequests++;
  
        if (FS.syncFSRequests > 1) {
          err('warning: ' + FS.syncFSRequests + ' FS.syncfs operations in flight at once, probably just doing extra work');
        }
  
        var mounts = FS.getMounts(FS.root.mount);
        var completed = 0;
  
        function doCallback(errCode) {
          assert(FS.syncFSRequests > 0);
          FS.syncFSRequests--;
          return callback(errCode);
        }
  
        function done(errCode) {
          if (errCode) {
            if (!done.errored) {
              done.errored = true;
              return doCallback(errCode);
            }
            return;
          }
          if (++completed >= mounts.length) {
            doCallback(null);
          }
        }  
        // sync all mounts
        mounts.forEach((mount) => {
          if (!mount.type.syncfs) {
            return done(null);
          }
          mount.type.syncfs(mount, populate, done);
        });
      },mount:(type, opts, mountpoint) => {
        if (typeof type == 'string') {
          // The filesystem was not included, and instead we have an error
          // message stored in the variable.
          throw type;
        }
        var root = mountpoint === '/';
        var pseudo = !mountpoint;
        var node;
  
        if (root && FS.root) {
          throw new FS.ErrnoError(10);
        } else if (!root && !pseudo) {
          var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
          mountpoint = lookup.path;  // use the absolute path
          node = lookup.node;
  
          if (FS.isMountpoint(node)) {
            throw new FS.ErrnoError(10);
          }
  
          if (!FS.isDir(node.mode)) {
            throw new FS.ErrnoError(54);
          }
        }
  
        var mount = {
          type: type,
          opts: opts,
          mountpoint: mountpoint,
          mounts: []
        };
  
        // create a root node for the fs
        var mountRoot = type.mount(mount);
        mountRoot.mount = mount;
        mount.root = mountRoot;
  
        if (root) {
          FS.root = mountRoot;
        } else if (node) {
          // set as a mountpoint
          node.mounted = mount;
  
          // add the new mount to the current mount's children
          if (node.mount) {
            node.mount.mounts.push(mount);
          }
        }
  
        return mountRoot;
      },unmount:(mountpoint) => {
        var lookup = FS.lookupPath(mountpoint, { follow_mount: false });
  
        if (!FS.isMountpoint(lookup.node)) {
          throw new FS.ErrnoError(28);
        }
  
        // destroy the nodes for this mount, and all its child mounts
        var node = lookup.node;
        var mount = node.mounted;
        var mounts = FS.getMounts(mount);
  
        Object.keys(FS.nameTable).forEach((hash) => {
          var current = FS.nameTable[hash];
  
          while (current) {
            var next = current.name_next;
  
            if (mounts.includes(current.mount)) {
              FS.destroyNode(current);
            }
  
            current = next;
          }
        });
  
        // no longer a mountpoint
        node.mounted = null;
  
        // remove this mount from the child mounts
        var idx = node.mount.mounts.indexOf(mount);
        assert(idx !== -1);
        node.mount.mounts.splice(idx, 1);
      },lookup:(parent, name) => {
        return parent.node_ops.lookup(parent, name);
      },mknod:(path, mode, dev) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        if (!name || name === '.' || name === '..') {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.mayCreate(parent, name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.mknod) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.mknod(parent, name, mode, dev);
      },create:(path, mode) => {
        mode = mode !== undefined ? mode : 438 /* 0666 */;
        mode &= 4095;
        mode |= 32768;
        return FS.mknod(path, mode, 0);
      },mkdir:(path, mode) => {
        mode = mode !== undefined ? mode : 511 /* 0777 */;
        mode &= 511 | 512;
        mode |= 16384;
        return FS.mknod(path, mode, 0);
      },mkdirTree:(path, mode) => {
        var dirs = path.split('/');
        var d = '';
        for (var i = 0; i < dirs.length; ++i) {
          if (!dirs[i]) continue;
          d += '/' + dirs[i];
          try {
            FS.mkdir(d, mode);
          } catch(e) {
            if (e.errno != 20) throw e;
          }
        }
      },mkdev:(path, mode, dev) => {
        if (typeof dev == 'undefined') {
          dev = mode;
          mode = 438 /* 0666 */;
        }
        mode |= 8192;
        return FS.mknod(path, mode, dev);
      },symlink:(oldpath, newpath) => {
        if (!PATH_FS.resolve(oldpath)) {
          throw new FS.ErrnoError(44);
        }
        var lookup = FS.lookupPath(newpath, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var newname = PATH.basename(newpath);
        var errCode = FS.mayCreate(parent, newname);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.symlink) {
          throw new FS.ErrnoError(63);
        }
        return parent.node_ops.symlink(parent, newname, oldpath);
      },rename:(old_path, new_path) => {
        var old_dirname = PATH.dirname(old_path);
        var new_dirname = PATH.dirname(new_path);
        var old_name = PATH.basename(old_path);
        var new_name = PATH.basename(new_path);
        // parents must exist
        var lookup, old_dir, new_dir;
  
        // let the errors from non existant directories percolate up
        lookup = FS.lookupPath(old_path, { parent: true });
        old_dir = lookup.node;
        lookup = FS.lookupPath(new_path, { parent: true });
        new_dir = lookup.node;
  
        if (!old_dir || !new_dir) throw new FS.ErrnoError(44);
        // need to be part of the same mount
        if (old_dir.mount !== new_dir.mount) {
          throw new FS.ErrnoError(75);
        }
        // source must exist
        var old_node = FS.lookupNode(old_dir, old_name);
        // old path should not be an ancestor of the new path
        var relative = PATH_FS.relative(old_path, new_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(28);
        }
        // new path should not be an ancestor of the old path
        relative = PATH_FS.relative(new_path, old_dirname);
        if (relative.charAt(0) !== '.') {
          throw new FS.ErrnoError(55);
        }
        // see if the new path already exists
        var new_node;
        try {
          new_node = FS.lookupNode(new_dir, new_name);
        } catch (e) {
          // not fatal
        }
        // early out if nothing needs to change
        if (old_node === new_node) {
          return;
        }
        // we'll need to delete the old entry
        var isdir = FS.isDir(old_node.mode);
        var errCode = FS.mayDelete(old_dir, old_name, isdir);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        // need delete permissions if we'll be overwriting.
        // need create permissions if new doesn't already exist.
        errCode = new_node ?
          FS.mayDelete(new_dir, new_name, isdir) :
          FS.mayCreate(new_dir, new_name);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!old_dir.node_ops.rename) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(old_node) || (new_node && FS.isMountpoint(new_node))) {
          throw new FS.ErrnoError(10);
        }
        // if we are going to change the parent, check write permissions
        if (new_dir !== old_dir) {
          errCode = FS.nodePermissions(old_dir, 'w');
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // remove the node from the lookup hash
        FS.hashRemoveNode(old_node);
        // do the underlying fs rename
        try {
          old_dir.node_ops.rename(old_node, new_dir, new_name);
        } catch (e) {
          throw e;
        } finally {
          // add the node back to the hash (in case node_ops.rename
          // changed its name)
          FS.hashAddNode(old_node);
        }
      },rmdir:(path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, true);
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.rmdir) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.rmdir(parent, name);
        FS.destroyNode(node);
      },readdir:(path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        if (!node.node_ops.readdir) {
          throw new FS.ErrnoError(54);
        }
        return node.node_ops.readdir(node);
      },unlink:(path) => {
        var lookup = FS.lookupPath(path, { parent: true });
        var parent = lookup.node;
        if (!parent) {
          throw new FS.ErrnoError(44);
        }
        var name = PATH.basename(path);
        var node = FS.lookupNode(parent, name);
        var errCode = FS.mayDelete(parent, name, false);
        if (errCode) {
          // According to POSIX, we should map EISDIR to EPERM, but
          // we instead do what Linux does (and we must, as we use
          // the musl linux libc).
          throw new FS.ErrnoError(errCode);
        }
        if (!parent.node_ops.unlink) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isMountpoint(node)) {
          throw new FS.ErrnoError(10);
        }
        parent.node_ops.unlink(parent, name);
        FS.destroyNode(node);
      },readlink:(path) => {
        var lookup = FS.lookupPath(path);
        var link = lookup.node;
        if (!link) {
          throw new FS.ErrnoError(44);
        }
        if (!link.node_ops.readlink) {
          throw new FS.ErrnoError(28);
        }
        return PATH_FS.resolve(FS.getPath(link.parent), link.node_ops.readlink(link));
      },stat:(path, dontFollow) => {
        var lookup = FS.lookupPath(path, { follow: !dontFollow });
        var node = lookup.node;
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        if (!node.node_ops.getattr) {
          throw new FS.ErrnoError(63);
        }
        return node.node_ops.getattr(node);
      },lstat:(path) => {
        return FS.stat(path, true);
      },chmod:(path, mode, dontFollow) => {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          mode: (mode & 4095) | (node.mode & ~4095),
          timestamp: Date.now()
        });
      },lchmod:(path, mode) => {
        FS.chmod(path, mode, true);
      },fchmod:(fd, mode) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chmod(stream.node, mode);
      },chown:(path, uid, gid, dontFollow) => {
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: !dontFollow });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        node.node_ops.setattr(node, {
          timestamp: Date.now()
          // we ignore the uid / gid for now
        });
      },lchown:(path, uid, gid) => {
        FS.chown(path, uid, gid, true);
      },fchown:(fd, uid, gid) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        FS.chown(stream.node, uid, gid);
      },truncate:(path, len) => {
        if (len < 0) {
          throw new FS.ErrnoError(28);
        }
        var node;
        if (typeof path == 'string') {
          var lookup = FS.lookupPath(path, { follow: true });
          node = lookup.node;
        } else {
          node = path;
        }
        if (!node.node_ops.setattr) {
          throw new FS.ErrnoError(63);
        }
        if (FS.isDir(node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!FS.isFile(node.mode)) {
          throw new FS.ErrnoError(28);
        }
        var errCode = FS.nodePermissions(node, 'w');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        node.node_ops.setattr(node, {
          size: len,
          timestamp: Date.now()
        });
      },ftruncate:(fd, len) => {
        var stream = FS.getStream(fd);
        if (!stream) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(28);
        }
        FS.truncate(stream.node, len);
      },utime:(path, atime, mtime) => {
        var lookup = FS.lookupPath(path, { follow: true });
        var node = lookup.node;
        node.node_ops.setattr(node, {
          timestamp: Math.max(atime, mtime)
        });
      },open:(path, flags, mode) => {
        if (path === "") {
          throw new FS.ErrnoError(44);
        }
        flags = typeof flags == 'string' ? FS.modeStringToFlags(flags) : flags;
        mode = typeof mode == 'undefined' ? 438 /* 0666 */ : mode;
        if ((flags & 64)) {
          mode = (mode & 4095) | 32768;
        } else {
          mode = 0;
        }
        var node;
        if (typeof path == 'object') {
          node = path;
        } else {
          path = PATH.normalize(path);
          try {
            var lookup = FS.lookupPath(path, {
              follow: !(flags & 131072)
            });
            node = lookup.node;
          } catch (e) {
            // ignore
          }
        }
        // perhaps we need to create the node
        var created = false;
        if ((flags & 64)) {
          if (node) {
            // if O_CREAT and O_EXCL are set, error out if the node already exists
            if ((flags & 128)) {
              throw new FS.ErrnoError(20);
            }
          } else {
            // node doesn't exist, try to create it
            node = FS.mknod(path, mode, 0);
            created = true;
          }
        }
        if (!node) {
          throw new FS.ErrnoError(44);
        }
        // can't truncate a device
        if (FS.isChrdev(node.mode)) {
          flags &= ~512;
        }
        // if asked only for a directory, then this must be one
        if ((flags & 65536) && !FS.isDir(node.mode)) {
          throw new FS.ErrnoError(54);
        }
        // check permissions, if this is not a file we just created now (it is ok to
        // create and write to a file with read-only permissions; it is read-only
        // for later use)
        if (!created) {
          var errCode = FS.mayOpen(node, flags);
          if (errCode) {
            throw new FS.ErrnoError(errCode);
          }
        }
        // do truncation if necessary
        if ((flags & 512) && !created) {
          FS.truncate(node, 0);
        }
        // we've already handled these, don't pass down to the underlying vfs
        flags &= ~(128 | 512 | 131072);
  
        // register the stream with the filesystem
        var stream = FS.createStream({
          node: node,
          path: FS.getPath(node),  // we want the absolute path to the node
          flags: flags,
          seekable: true,
          position: 0,
          stream_ops: node.stream_ops,
          // used by the file family libc calls (fopen, fwrite, ferror, etc.)
          ungotten: [],
          error: false
        });
        // call the new stream's open function
        if (stream.stream_ops.open) {
          stream.stream_ops.open(stream);
        }
        if (Module['logReadFiles'] && !(flags & 1)) {
          if (!FS.readFiles) FS.readFiles = {};
          if (!(path in FS.readFiles)) {
            FS.readFiles[path] = 1;
          }
        }
        return stream;
      },close:(stream) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (stream.getdents) stream.getdents = null; // free readdir state
        try {
          if (stream.stream_ops.close) {
            stream.stream_ops.close(stream);
          }
        } catch (e) {
          throw e;
        } finally {
          FS.closeStream(stream.fd);
        }
        stream.fd = null;
      },isClosed:(stream) => {
        return stream.fd === null;
      },llseek:(stream, offset, whence) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (!stream.seekable || !stream.stream_ops.llseek) {
          throw new FS.ErrnoError(70);
        }
        if (whence != 0 && whence != 1 && whence != 2) {
          throw new FS.ErrnoError(28);
        }
        stream.position = stream.stream_ops.llseek(stream, offset, whence);
        stream.ungotten = [];
        return stream.position;
      },read:(stream, buffer, offset, length, position) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.read) {
          throw new FS.ErrnoError(28);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesRead = stream.stream_ops.read(stream, buffer, offset, length, position);
        if (!seeking) stream.position += bytesRead;
        return bytesRead;
      },write:(stream, buffer, offset, length, position, canOwn) => {
        if (length < 0 || position < 0) {
          throw new FS.ErrnoError(28);
        }
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(31);
        }
        if (!stream.stream_ops.write) {
          throw new FS.ErrnoError(28);
        }
        if (stream.seekable && stream.flags & 1024) {
          // seek to the end before writing in append mode
          FS.llseek(stream, 0, 2);
        }
        var seeking = typeof position != 'undefined';
        if (!seeking) {
          position = stream.position;
        } else if (!stream.seekable) {
          throw new FS.ErrnoError(70);
        }
        var bytesWritten = stream.stream_ops.write(stream, buffer, offset, length, position, canOwn);
        if (!seeking) stream.position += bytesWritten;
        return bytesWritten;
      },allocate:(stream, offset, length) => {
        if (FS.isClosed(stream)) {
          throw new FS.ErrnoError(8);
        }
        if (offset < 0 || length <= 0) {
          throw new FS.ErrnoError(28);
        }
        if ((stream.flags & 2097155) === 0) {
          throw new FS.ErrnoError(8);
        }
        if (!FS.isFile(stream.node.mode) && !FS.isDir(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (!stream.stream_ops.allocate) {
          throw new FS.ErrnoError(138);
        }
        stream.stream_ops.allocate(stream, offset, length);
      },mmap:(stream, length, position, prot, flags) => {
        // User requests writing to file (prot & PROT_WRITE != 0).
        // Checking if we have permissions to write to the file unless
        // MAP_PRIVATE flag is set. According to POSIX spec it is possible
        // to write to file opened in read-only mode with MAP_PRIVATE flag,
        // as all modifications will be visible only in the memory of
        // the current process.
        if ((prot & 2) !== 0
            && (flags & 2) === 0
            && (stream.flags & 2097155) !== 2) {
          throw new FS.ErrnoError(2);
        }
        if ((stream.flags & 2097155) === 1) {
          throw new FS.ErrnoError(2);
        }
        if (!stream.stream_ops.mmap) {
          throw new FS.ErrnoError(43);
        }
        return stream.stream_ops.mmap(stream, length, position, prot, flags);
      },msync:(stream, buffer, offset, length, mmapFlags) => {
        if (!stream.stream_ops.msync) {
          return 0;
        }
        return stream.stream_ops.msync(stream, buffer, offset, length, mmapFlags);
      },munmap:(stream) => 0,ioctl:(stream, cmd, arg) => {
        if (!stream.stream_ops.ioctl) {
          throw new FS.ErrnoError(59);
        }
        return stream.stream_ops.ioctl(stream, cmd, arg);
      },readFile:(path, opts = {}) => {
        opts.flags = opts.flags || 0;
        opts.encoding = opts.encoding || 'binary';
        if (opts.encoding !== 'utf8' && opts.encoding !== 'binary') {
          throw new Error('Invalid encoding type "' + opts.encoding + '"');
        }
        var ret;
        var stream = FS.open(path, opts.flags);
        var stat = FS.stat(path);
        var length = stat.size;
        var buf = new Uint8Array(length);
        FS.read(stream, buf, 0, length, 0);
        if (opts.encoding === 'utf8') {
          ret = UTF8ArrayToString(buf, 0);
        } else if (opts.encoding === 'binary') {
          ret = buf;
        }
        FS.close(stream);
        return ret;
      },writeFile:(path, data, opts = {}) => {
        opts.flags = opts.flags || 577;
        var stream = FS.open(path, opts.flags, opts.mode);
        if (typeof data == 'string') {
          var buf = new Uint8Array(lengthBytesUTF8(data)+1);
          var actualNumBytes = stringToUTF8Array(data, buf, 0, buf.length);
          FS.write(stream, buf, 0, actualNumBytes, undefined, opts.canOwn);
        } else if (ArrayBuffer.isView(data)) {
          FS.write(stream, data, 0, data.byteLength, undefined, opts.canOwn);
        } else {
          throw new Error('Unsupported data type');
        }
        FS.close(stream);
      },cwd:() => FS.currentPath,chdir:(path) => {
        var lookup = FS.lookupPath(path, { follow: true });
        if (lookup.node === null) {
          throw new FS.ErrnoError(44);
        }
        if (!FS.isDir(lookup.node.mode)) {
          throw new FS.ErrnoError(54);
        }
        var errCode = FS.nodePermissions(lookup.node, 'x');
        if (errCode) {
          throw new FS.ErrnoError(errCode);
        }
        FS.currentPath = lookup.path;
      },createDefaultDirectories:() => {
        FS.mkdir('/tmp');
        FS.mkdir('/home');
        FS.mkdir('/home/web_user');
      },createDefaultDevices:() => {
        // create /dev
        FS.mkdir('/dev');
        // setup /dev/null
        FS.registerDevice(FS.makedev(1, 3), {
          read: () => 0,
          write: (stream, buffer, offset, length, pos) => length,
        });
        FS.mkdev('/dev/null', FS.makedev(1, 3));
        // setup /dev/tty and /dev/tty1
        // stderr needs to print output using err() rather than out()
        // so we register a second tty just for it.
        TTY.register(FS.makedev(5, 0), TTY.default_tty_ops);
        TTY.register(FS.makedev(6, 0), TTY.default_tty1_ops);
        FS.mkdev('/dev/tty', FS.makedev(5, 0));
        FS.mkdev('/dev/tty1', FS.makedev(6, 0));
        // setup /dev/[u]random
        // use a buffer to avoid overhead of individual crypto calls per byte
        var randomBuffer = new Uint8Array(1024), randomLeft = 0;
        var randomByte = () => {
          if (randomLeft === 0) {
            randomLeft = randomFill(randomBuffer).byteLength;
          }
          return randomBuffer[--randomLeft];
        };
        FS.createDevice('/dev', 'random', randomByte);
        FS.createDevice('/dev', 'urandom', randomByte);
        // we're not going to emulate the actual shm device,
        // just create the tmp dirs that reside in it commonly
        FS.mkdir('/dev/shm');
        FS.mkdir('/dev/shm/tmp');
      },createSpecialDirectories:() => {
        // create /proc/self/fd which allows /proc/self/fd/6 => readlink gives the
        // name of the stream for fd 6 (see test_unistd_ttyname)
        FS.mkdir('/proc');
        var proc_self = FS.mkdir('/proc/self');
        FS.mkdir('/proc/self/fd');
        FS.mount({
          mount: () => {
            var node = FS.createNode(proc_self, 'fd', 16384 | 511 /* 0777 */, 73);
            node.node_ops = {
              lookup: (parent, name) => {
                var fd = +name;
                var stream = FS.getStream(fd);
                if (!stream) throw new FS.ErrnoError(8);
                var ret = {
                  parent: null,
                  mount: { mountpoint: 'fake' },
                  node_ops: { readlink: () => stream.path },
                };
                ret.parent = ret; // make it look like a simple root node
                return ret;
              }
            };
            return node;
          }
        }, {}, '/proc/self/fd');
      },createStandardStreams:() => {
        // TODO deprecate the old functionality of a single
        // input / output callback and that utilizes FS.createDevice
        // and instead require a unique set of stream ops
  
        // by default, we symlink the standard streams to the
        // default tty devices. however, if the standard streams
        // have been overwritten we create a unique device for
        // them instead.
        if (Module['stdin']) {
          FS.createDevice('/dev', 'stdin', Module['stdin']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdin');
        }
        if (Module['stdout']) {
          FS.createDevice('/dev', 'stdout', null, Module['stdout']);
        } else {
          FS.symlink('/dev/tty', '/dev/stdout');
        }
        if (Module['stderr']) {
          FS.createDevice('/dev', 'stderr', null, Module['stderr']);
        } else {
          FS.symlink('/dev/tty1', '/dev/stderr');
        }
  
        // open default streams for the stdin, stdout and stderr devices
        var stdin = FS.open('/dev/stdin', 0);
        var stdout = FS.open('/dev/stdout', 1);
        var stderr = FS.open('/dev/stderr', 1);
        assert(stdin.fd === 0, 'invalid handle for stdin (' + stdin.fd + ')');
        assert(stdout.fd === 1, 'invalid handle for stdout (' + stdout.fd + ')');
        assert(stderr.fd === 2, 'invalid handle for stderr (' + stderr.fd + ')');
      },ensureErrnoError:() => {
        if (FS.ErrnoError) return;
        FS.ErrnoError = /** @this{Object} */ function ErrnoError(errno, node) {
          // We set the `name` property to be able to identify `FS.ErrnoError`
          // - the `name` is a standard ECMA-262 property of error objects. Kind of good to have it anyway.
          // - when using PROXYFS, an error can come from an underlying FS
          // as different FS objects have their own FS.ErrnoError each,
          // the test `err instanceof FS.ErrnoError` won't detect an error coming from another filesystem, causing bugs.
          // we'll use the reliable test `err.name == "ErrnoError"` instead
          this.name = 'ErrnoError';
          this.node = node;
          this.setErrno = /** @this{Object} */ function(errno) {
            this.errno = errno;
            for (var key in ERRNO_CODES) {
              if (ERRNO_CODES[key] === errno) {
                this.code = key;
                break;
              }
            }
          };
          this.setErrno(errno);
          this.message = ERRNO_MESSAGES[errno];
  
          // Try to get a maximally helpful stack trace. On Node.js, getting Error.stack
          // now ensures it shows what we want.
          if (this.stack) {
            // Define the stack property for Node.js 4, which otherwise errors on the next line.
            Object.defineProperty(this, "stack", { value: (new Error).stack, writable: true });
            this.stack = demangleAll(this.stack);
          }
        };
        FS.ErrnoError.prototype = new Error();
        FS.ErrnoError.prototype.constructor = FS.ErrnoError;
        // Some errors may happen quite a bit, to avoid overhead we reuse them (and suffer a lack of stack info)
        [44].forEach((code) => {
          FS.genericErrors[code] = new FS.ErrnoError(code);
          FS.genericErrors[code].stack = '<generic error, no stack>';
        });
      },staticInit:() => {
        FS.ensureErrnoError();
  
        FS.nameTable = new Array(4096);
  
        FS.mount(MEMFS, {}, '/');
  
        FS.createDefaultDirectories();
        FS.createDefaultDevices();
        FS.createSpecialDirectories();
  
        FS.filesystems = {
          'MEMFS': MEMFS,
          'IDBFS': IDBFS,
          'NODEFS': NODEFS,
        };
      },init:(input, output, error) => {
        assert(!FS.init.initialized, 'FS.init was previously called. If you want to initialize later with custom parameters, remove any earlier calls (note that one is automatically added to the generated code)');
        FS.init.initialized = true;
  
        FS.ensureErrnoError();
  
        // Allow Module.stdin etc. to provide defaults, if none explicitly passed to us here
        Module['stdin'] = input || Module['stdin'];
        Module['stdout'] = output || Module['stdout'];
        Module['stderr'] = error || Module['stderr'];
  
        FS.createStandardStreams();
      },quit:() => {
        FS.init.initialized = false;
        // force-flush all streams, so we get musl std streams printed out
        _fflush(0);
        // close all of our streams
        for (var i = 0; i < FS.streams.length; i++) {
          var stream = FS.streams[i];
          if (!stream) {
            continue;
          }
          FS.close(stream);
        }
      },getMode:(canRead, canWrite) => {
        var mode = 0;
        if (canRead) mode |= 292 | 73;
        if (canWrite) mode |= 146;
        return mode;
      },findObject:(path, dontResolveLastLink) => {
        var ret = FS.analyzePath(path, dontResolveLastLink);
        if (!ret.exists) {
          return null;
        }
        return ret.object;
      },analyzePath:(path, dontResolveLastLink) => {
        // operate from within the context of the symlink's target
        try {
          var lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          path = lookup.path;
        } catch (e) {
        }
        var ret = {
          isRoot: false, exists: false, error: 0, name: null, path: null, object: null,
          parentExists: false, parentPath: null, parentObject: null
        };
        try {
          var lookup = FS.lookupPath(path, { parent: true });
          ret.parentExists = true;
          ret.parentPath = lookup.path;
          ret.parentObject = lookup.node;
          ret.name = PATH.basename(path);
          lookup = FS.lookupPath(path, { follow: !dontResolveLastLink });
          ret.exists = true;
          ret.path = lookup.path;
          ret.object = lookup.node;
          ret.name = lookup.node.name;
          ret.isRoot = lookup.path === '/';
        } catch (e) {
          ret.error = e.errno;
        }        return ret;
      },createPath:(parent, path, canRead, canWrite) => {
        parent = typeof parent == 'string' ? parent : FS.getPath(parent);
        var parts = path.split('/').reverse();
        while (parts.length) {
          var part = parts.pop();
          if (!part) continue;
          var current = PATH.join2(parent, part);
          try {
            FS.mkdir(current);
          } catch (e) {
            // ignore EEXIST
          }
          parent = current;
        }
        return current;
      },createFile:(parent, name, properties, canRead, canWrite) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(canRead, canWrite);
        return FS.create(path, mode);
      },createDataFile:(parent, name, data, canRead, canWrite, canOwn) => {
        var path = name;
        if (parent) {
          parent = typeof parent == 'string' ? parent : FS.getPath(parent);
          path = name ? PATH.join2(parent, name) : parent;
        }
        var mode = FS.getMode(canRead, canWrite);
        var node = FS.create(path, mode);
        if (data) {
          if (typeof data == 'string') {
            var arr = new Array(data.length);
            for (var i = 0, len = data.length; i < len; ++i) arr[i] = data.charCodeAt(i);
            data = arr;
          }
          // make sure we can write to the file
          FS.chmod(node, mode | 146);
          var stream = FS.open(node, 577);
          FS.write(stream, data, 0, data.length, 0, canOwn);
          FS.close(stream);
          FS.chmod(node, mode);
        }
        return node;
      },createDevice:(parent, name, input, output) => {
        var path = PATH.join2(typeof parent == 'string' ? parent : FS.getPath(parent), name);
        var mode = FS.getMode(!!input, !!output);
        if (!FS.createDevice.major) FS.createDevice.major = 64;
        var dev = FS.makedev(FS.createDevice.major++, 0);
        // Create a fake device that a set of stream ops to emulate
        // the old behavior.
        FS.registerDevice(dev, {
          open: (stream) => {
            stream.seekable = false;
          },
          close: (stream) => {
            // flush any pending line data
            if (output && output.buffer && output.buffer.length) {
              output(10);
            }
          },
          read: (stream, buffer, offset, length, pos /* ignored */) => {
            var bytesRead = 0;
            for (var i = 0; i < length; i++) {
              var result;
              try {
                result = input();
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
              if (result === undefined && bytesRead === 0) {
                throw new FS.ErrnoError(6);
              }
              if (result === null || result === undefined) break;
              bytesRead++;
              buffer[offset+i] = result;
            }
            if (bytesRead) {
              stream.node.timestamp = Date.now();
            }
            return bytesRead;
          },
          write: (stream, buffer, offset, length, pos) => {
            for (var i = 0; i < length; i++) {
              try {
                output(buffer[offset+i]);
              } catch (e) {
                throw new FS.ErrnoError(29);
              }
            }
            if (length) {
              stream.node.timestamp = Date.now();
            }
            return i;
          }
        });
        return FS.mkdev(path, mode, dev);
      },forceLoadFile:(obj) => {
        if (obj.isDevice || obj.isFolder || obj.link || obj.contents) return true;
        if (typeof XMLHttpRequest != 'undefined') {
          throw new Error("Lazy loading should have been performed (contents set) in createLazyFile, but it was not. Lazy loading only works in web workers. Use --embed-file or --preload-file in emcc on the main thread.");
        } else if (read_) {
          // Command-line.
          try {
            // WARNING: Can't read binary files in V8's d8 or tracemonkey's js, as
            //          read() will try to parse UTF8.
            obj.contents = intArrayFromString(read_(obj.url), true);
            obj.usedBytes = obj.contents.length;
          } catch (e) {
            throw new FS.ErrnoError(29);
          }
        } else {
          throw new Error('Cannot load without read() or XMLHttpRequest.');
        }
      },createLazyFile:(parent, name, url, canRead, canWrite) => {
        // Lazy chunked Uint8Array (implements get and length from Uint8Array). Actual getting is abstracted away for eventual reuse.
        /** @constructor */
        function LazyUint8Array() {
          this.lengthKnown = false;
          this.chunks = []; // Loaded chunks. Index is the chunk number
        }
        LazyUint8Array.prototype.get = /** @this{Object} */ function LazyUint8Array_get(idx) {
          if (idx > this.length-1 || idx < 0) {
            return undefined;
          }
          var chunkOffset = idx % this.chunkSize;
          var chunkNum = (idx / this.chunkSize)|0;
          return this.getter(chunkNum)[chunkOffset];
        };
        LazyUint8Array.prototype.setDataGetter = function LazyUint8Array_setDataGetter(getter) {
          this.getter = getter;
        };
        LazyUint8Array.prototype.cacheLength = function LazyUint8Array_cacheLength() {
          // Find length
          var xhr = new XMLHttpRequest();
          xhr.open('HEAD', url, false);
          xhr.send(null);
          if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
          var datalength = Number(xhr.getResponseHeader("Content-length"));
          var header;
          var hasByteServing = (header = xhr.getResponseHeader("Accept-Ranges")) && header === "bytes";
          var usesGzip = (header = xhr.getResponseHeader("Content-Encoding")) && header === "gzip";
  
          var chunkSize = 1024*1024; // Chunk size in bytes
  
          if (!hasByteServing) chunkSize = datalength;
  
          // Function to get a range from the remote URL.
          var doXHR = (from, to) => {
            if (from > to) throw new Error("invalid range (" + from + ", " + to + ") or no bytes requested!");
            if (to > datalength-1) throw new Error("only " + datalength + " bytes available! programmer error!");
  
            // TODO: Use mozResponseArrayBuffer, responseStream, etc. if available.
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, false);
            if (datalength !== chunkSize) xhr.setRequestHeader("Range", "bytes=" + from + "-" + to);
  
            // Some hints to the browser that we want binary data.
            xhr.responseType = 'arraybuffer';
            if (xhr.overrideMimeType) {
              xhr.overrideMimeType('text/plain; charset=x-user-defined');
            }
  
            xhr.send(null);
            if (!(xhr.status >= 200 && xhr.status < 300 || xhr.status === 304)) throw new Error("Couldn't load " + url + ". Status: " + xhr.status);
            if (xhr.response !== undefined) {
              return new Uint8Array(/** @type{Array<number>} */(xhr.response || []));
            }
            return intArrayFromString(xhr.responseText || '', true);
          };
          var lazyArray = this;
          lazyArray.setDataGetter((chunkNum) => {
            var start = chunkNum * chunkSize;
            var end = (chunkNum+1) * chunkSize - 1; // including this byte
            end = Math.min(end, datalength-1); // if datalength-1 is selected, this is the last block
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') {
              lazyArray.chunks[chunkNum] = doXHR(start, end);
            }
            if (typeof lazyArray.chunks[chunkNum] == 'undefined') throw new Error('doXHR failed!');
            return lazyArray.chunks[chunkNum];
          });
  
          if (usesGzip || !datalength) {
            // if the server uses gzip or doesn't supply the length, we have to download the whole file to get the (uncompressed) length
            chunkSize = datalength = 1; // this will force getter(0)/doXHR do download the whole file
            datalength = this.getter(0).length;
            chunkSize = datalength;
            out("LazyFiles on gzip forces download of the whole file when length is accessed");
          }
  
          this._length = datalength;
          this._chunkSize = chunkSize;
          this.lengthKnown = true;
        };
        if (typeof XMLHttpRequest != 'undefined') {
          throw 'Cannot do synchronous binary XHRs outside webworkers in modern browsers. Use --embed-file or --preload-file in emcc';
          var lazyArray = new LazyUint8Array();
  
          var properties = { isDevice: false, contents: lazyArray };
        } else {
          var properties = { isDevice: false, url: url };
        }
  
        var node = FS.createFile(parent, name, properties, canRead, canWrite);
        // This is a total hack, but I want to get this lazy file code out of the
        // core of MEMFS. If we want to keep this lazy file concept I feel it should
        // be its own thin LAZYFS proxying calls to MEMFS.
        if (properties.contents) {
          node.contents = properties.contents;
        } else if (properties.url) {
          node.contents = null;
          node.url = properties.url;
        }
        // Add a function that defers querying the file size until it is asked the first time.
        Object.defineProperties(node, {
          usedBytes: {
            get: /** @this {FSNode} */ function() { return this.contents.length; }
          }
        });
        // override each stream op with one that tries to force load the lazy file first
        var stream_ops = {};
        var keys = Object.keys(node.stream_ops);
        keys.forEach((key) => {
          var fn = node.stream_ops[key];
          stream_ops[key] = function forceLoadLazyFile() {
            FS.forceLoadFile(node);
            return fn.apply(null, arguments);
          };
        });
        function writeChunks(stream, buffer, offset, length, position) {
          var contents = stream.node.contents;
          if (position >= contents.length)
            return 0;
          var size = Math.min(contents.length - position, length);
          assert(size >= 0);
          if (contents.slice) { // normal array
            for (var i = 0; i < size; i++) {
              buffer[offset + i] = contents[position + i];
            }
          } else {
            for (var i = 0; i < size; i++) { // LazyUint8Array from sync binary XHR
              buffer[offset + i] = contents.get(position + i);
            }
          }
          return size;
        }
        // use a custom read function
        stream_ops.read = (stream, buffer, offset, length, position) => {
          FS.forceLoadFile(node);
          return writeChunks(stream, buffer, offset, length, position)
        };
        // use a custom mmap function
        stream_ops.mmap = (stream, length, position, prot, flags) => {
          FS.forceLoadFile(node);
          var ptr = mmapAlloc();
          if (!ptr) {
            throw new FS.ErrnoError(48);
          }
          writeChunks(stream, HEAP8, ptr, length, position);
          return { ptr: ptr, allocated: true };
        };
        node.stream_ops = stream_ops;
        return node;
      },createPreloadedFile:(parent, name, url, canRead, canWrite, onload, onerror, dontCreateFile, canOwn, preFinish) => {
        // TODO we should allow people to just pass in a complete filename instead
        // of parent and name being that we just join them anyways
        var fullname = name ? PATH_FS.resolve(PATH.join2(parent, name)) : parent;
        var dep = getUniqueRunDependency('cp ' + fullname); // might have several active requests for the same fullname
        function processData(byteArray) {
          function finish(byteArray) {
            if (preFinish) preFinish();
            if (!dontCreateFile) {
              FS.createDataFile(parent, name, byteArray, canRead, canWrite, canOwn);
            }
            if (onload) onload();
            removeRunDependency(dep);
          }
          if (Browser.handledByPreloadPlugin(byteArray, fullname, finish, () => {
            if (onerror) onerror();
            removeRunDependency(dep);
          })) {
            return;
          }
          finish(byteArray);
        }
        addRunDependency(dep);
        if (typeof url == 'string') {
          asyncLoad(url, (byteArray) => processData(byteArray), onerror);
        } else {
          processData(url);
        }
      },absolutePath:() => {
        abort('FS.absolutePath has been removed; use PATH_FS.resolve instead');
      },createFolder:() => {
        abort('FS.createFolder has been removed; use FS.mkdir instead');
      },createLink:() => {
        abort('FS.createLink has been removed; use FS.symlink instead');
      },joinPath:() => {
        abort('FS.joinPath has been removed; use PATH.join instead');
      },mmapAlloc:() => {
        abort('FS.mmapAlloc has been replaced by the top level function mmapAlloc');
      },standardizePath:() => {
        abort('FS.standardizePath has been removed; use PATH.normalize instead');
      }};
  
  var SYSCALLS = {DEFAULT_POLLMASK:5,calculateAt:function(dirfd, path, allowEmpty) {
        if (PATH.isAbs(path)) {
          return path;
        }
        // relative path
        var dir;
        if (dirfd === -100) {
          dir = FS.cwd();
        } else {
          var dirstream = SYSCALLS.getStreamFromFD(dirfd);
          dir = dirstream.path;
        }
        if (path.length == 0) {
          if (!allowEmpty) {
            throw new FS.ErrnoError(44);          }
          return dir;
        }
        return PATH.join2(dir, path);
      },doStat:function(func, path, buf) {
        try {
          var stat = func(path);
        } catch (e) {
          if (e && e.node && PATH.normalize(path) !== PATH.normalize(FS.getPath(e.node))) {
            // an error occurred while trying to look up the path; we should just report ENOTDIR
            return -54;
          }
          throw e;
        }
        HEAP32[((buf)>>2)] = stat.dev;
        HEAP32[(((buf)+(8))>>2)] = stat.ino;
        HEAP32[(((buf)+(12))>>2)] = stat.mode;
        HEAPU32[(((buf)+(16))>>2)] = stat.nlink;
        HEAP32[(((buf)+(20))>>2)] = stat.uid;
        HEAP32[(((buf)+(24))>>2)] = stat.gid;
        HEAP32[(((buf)+(28))>>2)] = stat.rdev;
        (tempI64 = [stat.size>>>0,(tempDouble=stat.size,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(40))>>2)] = tempI64[0],HEAP32[(((buf)+(44))>>2)] = tempI64[1]);
        HEAP32[(((buf)+(48))>>2)] = 4096;
        HEAP32[(((buf)+(52))>>2)] = stat.blocks;
        var atime = stat.atime.getTime();
        var mtime = stat.mtime.getTime();
        var ctime = stat.ctime.getTime();
        (tempI64 = [Math.floor(atime / 1000)>>>0,(tempDouble=Math.floor(atime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(56))>>2)] = tempI64[0],HEAP32[(((buf)+(60))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(64))>>2)] = (atime % 1000) * 1000;
        (tempI64 = [Math.floor(mtime / 1000)>>>0,(tempDouble=Math.floor(mtime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(72))>>2)] = tempI64[0],HEAP32[(((buf)+(76))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(80))>>2)] = (mtime % 1000) * 1000;
        (tempI64 = [Math.floor(ctime / 1000)>>>0,(tempDouble=Math.floor(ctime / 1000),(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(88))>>2)] = tempI64[0],HEAP32[(((buf)+(92))>>2)] = tempI64[1]);
        HEAPU32[(((buf)+(96))>>2)] = (ctime % 1000) * 1000;
        (tempI64 = [stat.ino>>>0,(tempDouble=stat.ino,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[(((buf)+(104))>>2)] = tempI64[0],HEAP32[(((buf)+(108))>>2)] = tempI64[1]);
        return 0;
      },doMsync:function(addr, stream, len, flags, offset) {
        if (!FS.isFile(stream.node.mode)) {
          throw new FS.ErrnoError(43);
        }
        if (flags & 2) {
          // MAP_PRIVATE calls need not to be synced back to underlying fs
          return 0;
        }
        var buffer = HEAPU8.slice(addr, addr + len);
        FS.msync(stream, buffer, offset, len, flags);
      },varargs:undefined,get:function() {
        assert(SYSCALLS.varargs != undefined);
        SYSCALLS.varargs += 4;
        var ret = HEAP32[(((SYSCALLS.varargs)-(4))>>2)];
        return ret;
      },getStr:function(ptr) {
        var ret = UTF8ToString(ptr);
        return ret;
      },getStreamFromFD:function(fd) {
        var stream = FS.getStream(fd);
        if (!stream) throw new FS.ErrnoError(8);
        return stream;
      }};
  function ___syscall_fcntl64(fd, cmd, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (cmd) {
        case 0: {
          var arg = SYSCALLS.get();
          if (arg < 0) {
            return -28;
          }
          var newStream;
          newStream = FS.createStream(stream, arg);
          return newStream.fd;
        }
        case 1:
        case 2:
          return 0;  // FD_CLOEXEC makes no sense for a single process.
        case 3:
          return stream.flags;
        case 4: {
          var arg = SYSCALLS.get();
          stream.flags |= arg;
          return 0;
        }
        case 5:
        /* case 5: Currently in musl F_GETLK64 has same value as F_GETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */ {
          
          var arg = SYSCALLS.get();
          var offset = 0;
          // We're always unlocked.
          HEAP16[(((arg)+(offset))>>1)] = 2;
          return 0;
        }
        case 6:
        case 7:
        /* case 6: Currently in musl F_SETLK64 has same value as F_SETLK, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
        /* case 7: Currently in musl F_SETLKW64 has same value as F_SETLKW, so omitted to avoid duplicate case blocks. If that changes, uncomment this */
          
          
          return 0; // Pretend that the locking is successful.
        case 16:
        case 8:
          return -28; // These are for sockets. We don't have them fully implemented yet.
        case 9:
          // musl trusts getown return values, due to a bug where they must be, as they overlap with errors. just return -1 here, so fcntl() returns that, and we set errno ourselves.
          setErrNo(28);
          return -1;
        default: {
          return -28;
        }
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_ioctl(fd, op, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      switch (op) {
        case 21509:
        case 21505: {
          if (!stream.tty) return -59;
          return 0;
        }
        case 21510:
        case 21511:
        case 21512:
        case 21506:
        case 21507:
        case 21508: {
          if (!stream.tty) return -59;
          return 0; // no-op, not actually adjusting terminal settings
        }
        case 21519: {
          if (!stream.tty) return -59;
          var argp = SYSCALLS.get();
          HEAP32[((argp)>>2)] = 0;
          return 0;
        }
        case 21520: {
          if (!stream.tty) return -59;
          return -28; // not supported
        }
        case 21531: {
          var argp = SYSCALLS.get();
          return FS.ioctl(stream, op, argp);
        }
        case 21523: {
          // TODO: in theory we should write to the winsize struct that gets
          // passed in, but for now musl doesn't read anything on it
          if (!stream.tty) return -59;
          return 0;
        }
        case 21524: {
          // TODO: technically, this ioctl call should change the window size.
          // but, since emscripten doesn't have any concept of a terminal window
          // yet, we'll just silently throw it away as we do TIOCGWINSZ
          if (!stream.tty) return -59;
          return 0;
        }
        default: return -28; // not supported
      }
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  function ___syscall_openat(dirfd, path, flags, varargs) {
  SYSCALLS.varargs = varargs;
  try {
  
      path = SYSCALLS.getStr(path);
      path = SYSCALLS.calculateAt(dirfd, path);
      var mode = varargs ? SYSCALLS.get() : 0;
      return FS.open(path, flags, mode).fd;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return -e.errno;
  }
  }

  
  function ___throw_exception_with_stack_trace(ex) {
      var e = new WebAssembly.Exception(getCppExceptionTag(), [ex], {traceStack: true});
      e.message = getExceptionMessage(e);
      // The generated stack trace will be in the form of:
      //
      // Error
      //     at ___throw_exception_with_stack_trace(test.js:1139:13)
      //     at __cxa_throw (wasm://wasm/009a7c9a:wasm-function[1551]:0x24367)
      //     ...
      //
      // Remove this JS function name, which is in the second line, from the stack
      // trace. Note that .stack does not yet exist in all browsers (see #18828).
      if (e.stack) {
        var arr = e.stack.split('\n');
        arr.splice(1,1);
        e.stack = arr.join('\n');
      }
      throw e;
    }

  function __embind_register_bigint(primitiveType, name, size, minRange, maxRange) {}

  function getShiftFromSize(size) {
      switch (size) {
          case 1: return 0;
          case 2: return 1;
          case 4: return 2;
          case 8: return 3;
          default:
              throw new TypeError('Unknown type size: ' + size);
      }
    }
  
  function embind_init_charCodes() {
      var codes = new Array(256);
      for (var i = 0; i < 256; ++i) {
          codes[i] = String.fromCharCode(i);
      }
      embind_charCodes = codes;
    }
  var embind_charCodes = undefined;
  function readLatin1String(ptr) {
      var ret = "";
      var c = ptr;
      while (HEAPU8[c]) {
          ret += embind_charCodes[HEAPU8[c++]];
      }
      return ret;
    }
  
  var awaitingDependencies = {};
  
  var registeredTypes = {};
  
  var typeDependencies = {};
  
  var char_0 = 48;
  
  var char_9 = 57;
  function makeLegalFunctionName(name) {
      if (undefined === name) {
        return '_unknown';
      }
      name = name.replace(/[^a-zA-Z0-9_]/g, '$');
      var f = name.charCodeAt(0);
      if (f >= char_0 && f <= char_9) {
        return '_' + name;
      }
      return name;
    }
  function createNamedFunction(name, body) {
      name = makeLegalFunctionName(name);
      // Use an abject with a computed property name to create a new function with
      // a name specified at runtime, but without using `new Function` or `eval`.
      return {
        [name]: function() {
          return body.apply(this, arguments);
        }
      }[name];
    }
  function extendError(baseErrorType, errorName) {
      var errorClass = createNamedFunction(errorName, function(message) {
        this.name = errorName;
        this.message = message;
  
        var stack = (new Error(message)).stack;
        if (stack !== undefined) {
          this.stack = this.toString() + '\n' +
              stack.replace(/^Error(:[^\n]*)?\n/, '');
        }
      });
      errorClass.prototype = Object.create(baseErrorType.prototype);
      errorClass.prototype.constructor = errorClass;
      errorClass.prototype.toString = function() {
        if (this.message === undefined) {
          return this.name;
        } else {
          return this.name + ': ' + this.message;
        }
      };
  
      return errorClass;
    }
  var BindingError = undefined;
  function throwBindingError(message) {
      throw new BindingError(message);
    }
  
  
  
  
  var InternalError = undefined;
  function throwInternalError(message) {
      throw new InternalError(message);
    }
  function whenDependentTypesAreResolved(myTypes, dependentTypes, getTypeConverters) {
      myTypes.forEach(function(type) {
          typeDependencies[type] = dependentTypes;
      });
  
      function onComplete(typeConverters) {
          var myTypeConverters = getTypeConverters(typeConverters);
          if (myTypeConverters.length !== myTypes.length) {
              throwInternalError('Mismatched type converter count');
          }
          for (var i = 0; i < myTypes.length; ++i) {
              registerType(myTypes[i], myTypeConverters[i]);
          }
      }
  
      var typeConverters = new Array(dependentTypes.length);
      var unregisteredTypes = [];
      var registered = 0;
      dependentTypes.forEach((dt, i) => {
        if (registeredTypes.hasOwnProperty(dt)) {
          typeConverters[i] = registeredTypes[dt];
        } else {
          unregisteredTypes.push(dt);
          if (!awaitingDependencies.hasOwnProperty(dt)) {
            awaitingDependencies[dt] = [];
          }
          awaitingDependencies[dt].push(() => {
            typeConverters[i] = registeredTypes[dt];
            ++registered;
            if (registered === unregisteredTypes.length) {
              onComplete(typeConverters);
            }
          });
        }
      });
      if (0 === unregisteredTypes.length) {
        onComplete(typeConverters);
      }
    }
  /** @param {Object=} options */
  function registerType(rawType, registeredInstance, options = {}) {
      if (!('argPackAdvance' in registeredInstance)) {
          throw new TypeError('registerType registeredInstance requires argPackAdvance');
      }
  
      var name = registeredInstance.name;
      if (!rawType) {
          throwBindingError('type "' + name + '" must have a positive integer typeid pointer');
      }
      if (registeredTypes.hasOwnProperty(rawType)) {
          if (options.ignoreDuplicateRegistrations) {
              return;
          } else {
              throwBindingError("Cannot register type '" + name + "' twice");
          }
      }
  
      registeredTypes[rawType] = registeredInstance;
      delete typeDependencies[rawType];
  
      if (awaitingDependencies.hasOwnProperty(rawType)) {
        var callbacks = awaitingDependencies[rawType];
        delete awaitingDependencies[rawType];
        callbacks.forEach((cb) => cb());
      }
    }
  function __embind_register_bool(rawType, name, size, trueValue, falseValue) {
      var shift = getShiftFromSize(size);
  
      name = readLatin1String(name);
      registerType(rawType, {
          name: name,
          'fromWireType': function(wt) {
              // ambiguous emscripten ABI: sometimes return values are
              // true or false, and sometimes integers (0 or 1)
              return !!wt;
          },
          'toWireType': function(destructors, o) {
              return o ? trueValue : falseValue;
          },
          'argPackAdvance': 8,
          'readValueFromPointer': function(pointer) {
              // TODO: if heap is fixed (like in asm.js) this could be executed outside
              var heap;
              if (size === 1) {
                  heap = HEAP8;
              } else if (size === 2) {
                  heap = HEAP16;
              } else if (size === 4) {
                  heap = HEAP32;
              } else {
                  throw new TypeError("Unknown boolean type size: " + name);
              }
              return this['fromWireType'](heap[pointer >> shift]);
          },
          destructorFunction: null, // This type does not need a destructor
      });
    }

  
  function ClassHandle_isAliasOf(other) {
      if (!(this instanceof ClassHandle)) {
        return false;
      }
      if (!(other instanceof ClassHandle)) {
        return false;
      }
  
      var leftClass = this.$$.ptrType.registeredClass;
      var left = this.$$.ptr;
      var rightClass = other.$$.ptrType.registeredClass;
      var right = other.$$.ptr;
  
      while (leftClass.baseClass) {
        left = leftClass.upcast(left);
        leftClass = leftClass.baseClass;
      }
  
      while (rightClass.baseClass) {
        right = rightClass.upcast(right);
        rightClass = rightClass.baseClass;
      }
  
      return leftClass === rightClass && left === right;
    }
  
  function shallowCopyInternalPointer(o) {
      return {
        count: o.count,
        deleteScheduled: o.deleteScheduled,
        preservePointerOnDelete: o.preservePointerOnDelete,
        ptr: o.ptr,
        ptrType: o.ptrType,
        smartPtr: o.smartPtr,
        smartPtrType: o.smartPtrType,
      };
    }
  
  function throwInstanceAlreadyDeleted(obj) {
      function getInstanceTypeName(handle) {
        return handle.$$.ptrType.registeredClass.name;
      }
      throwBindingError(getInstanceTypeName(obj) + ' instance already deleted');
    }
  
  var finalizationRegistry = false;
  
  function detachFinalizer(handle) {}
  
  function runDestructor($$) {
      if ($$.smartPtr) {
        $$.smartPtrType.rawDestructor($$.smartPtr);
      } else {
        $$.ptrType.registeredClass.rawDestructor($$.ptr);
      }
    }
  function releaseClassHandle($$) {
      $$.count.value -= 1;
      var toDelete = 0 === $$.count.value;
      if (toDelete) {
        runDestructor($$);
      }
    }
  
  function downcastPointer(ptr, ptrClass, desiredClass) {
      if (ptrClass === desiredClass) {
        return ptr;
      }
      if (undefined === desiredClass.baseClass) {
        return null; // no conversion
      }
  
      var rv = downcastPointer(ptr, ptrClass, desiredClass.baseClass);
      if (rv === null) {
        return null;
      }
      return desiredClass.downcast(rv);
    }
  
  var registeredPointers = {};
  
  function getInheritedInstanceCount() {
      return Object.keys(registeredInstances).length;
    }
  
  function getLiveInheritedInstances() {
      var rv = [];
      for (var k in registeredInstances) {
        if (registeredInstances.hasOwnProperty(k)) {
          rv.push(registeredInstances[k]);
        }
      }
      return rv;
    }
  
  var deletionQueue = [];
  function flushPendingDeletes() {
      while (deletionQueue.length) {
        var obj = deletionQueue.pop();
        obj.$$.deleteScheduled = false;
        obj['delete']();
      }
    }
  
  var delayFunction = undefined;
  
  
  function setDelayFunction(fn) {
      delayFunction = fn;
      if (deletionQueue.length && delayFunction) {
        delayFunction(flushPendingDeletes);
      }
    }
  function init_embind() {
      Module['getInheritedInstanceCount'] = getInheritedInstanceCount;
      Module['getLiveInheritedInstances'] = getLiveInheritedInstances;
      Module['flushPendingDeletes'] = flushPendingDeletes;
      Module['setDelayFunction'] = setDelayFunction;
    }
  var registeredInstances = {};
  
  function getBasestPointer(class_, ptr) {
      if (ptr === undefined) {
          throwBindingError('ptr should not be undefined');
      }
      while (class_.baseClass) {
          ptr = class_.upcast(ptr);
          class_ = class_.baseClass;
      }
      return ptr;
    }
  function getInheritedInstance(class_, ptr) {
      ptr = getBasestPointer(class_, ptr);
      return registeredInstances[ptr];
    }
  
  
  function makeClassHandle(prototype, record) {
      if (!record.ptrType || !record.ptr) {
        throwInternalError('makeClassHandle requires ptr and ptrType');
      }
      var hasSmartPtrType = !!record.smartPtrType;
      var hasSmartPtr = !!record.smartPtr;
      if (hasSmartPtrType !== hasSmartPtr) {
        throwInternalError('Both smartPtrType and smartPtr must be specified');
      }
      record.count = { value: 1 };
      return attachFinalizer(Object.create(prototype, {
        $$: {
            value: record,
        },
      }));
    }
  function RegisteredPointer_fromWireType(ptr) {
      // ptr is a raw pointer (or a raw smartpointer)
  
      // rawPointer is a maybe-null raw pointer
      var rawPointer = this.getPointee(ptr);
      if (!rawPointer) {
        this.destructor(ptr);
        return null;
      }
  
      var registeredInstance = getInheritedInstance(this.registeredClass, rawPointer);
      if (undefined !== registeredInstance) {
        // JS object has been neutered, time to repopulate it
        if (0 === registeredInstance.$$.count.value) {
          registeredInstance.$$.ptr = rawPointer;
          registeredInstance.$$.smartPtr = ptr;
          return registeredInstance['clone']();
        } else {
          // else, just increment reference count on existing object
          // it already has a reference to the smart pointer
          var rv = registeredInstance['clone']();
          this.destructor(ptr);
          return rv;
        }
      }
  
      function makeDefaultHandle() {
        if (this.isSmartPointer) {
          return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this.pointeeType,
            ptr: rawPointer,
            smartPtrType: this,
            smartPtr: ptr,
          });
        } else {
          return makeClassHandle(this.registeredClass.instancePrototype, {
            ptrType: this,
            ptr: ptr,
          });
        }
      }
  
      var actualType = this.registeredClass.getActualType(rawPointer);
      var registeredPointerRecord = registeredPointers[actualType];
      if (!registeredPointerRecord) {
        return makeDefaultHandle.call(this);
      }
  
      var toType;
      if (this.isConst) {
        toType = registeredPointerRecord.constPointerType;
      } else {
        toType = registeredPointerRecord.pointerType;
      }
      var dp = downcastPointer(
          rawPointer,
          this.registeredClass,
          toType.registeredClass);
      if (dp === null) {
        return makeDefaultHandle.call(this);
      }
      if (this.isSmartPointer) {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
          ptrType: toType,
          ptr: dp,
          smartPtrType: this,
          smartPtr: ptr,
        });
      } else {
        return makeClassHandle(toType.registeredClass.instancePrototype, {
          ptrType: toType,
          ptr: dp,
        });
      }
    }
  function attachFinalizer(handle) {
      if ('undefined' === typeof FinalizationRegistry) {
        attachFinalizer = (handle) => handle;
        return handle;
      }
      // If the running environment has a FinalizationRegistry (see
      // https://github.com/tc39/proposal-weakrefs), then attach finalizers
      // for class handles.  We check for the presence of FinalizationRegistry
      // at run-time, not build-time.
      finalizationRegistry = new FinalizationRegistry((info) => {
        console.warn(info.leakWarning.stack.replace(/^Error: /, ''));
        releaseClassHandle(info.$$);
      });
      attachFinalizer = (handle) => {
        var $$ = handle.$$;
        var hasSmartPtr = !!$$.smartPtr;
        if (hasSmartPtr) {
          // We should not call the destructor on raw pointers in case other code expects the pointee to live
          var info = { $$: $$ };
          // Create a warning as an Error instance in advance so that we can store
          // the current stacktrace and point to it when / if a leak is detected.
          // This is more useful than the empty stacktrace of `FinalizationRegistry`
          // callback.
          var cls = $$.ptrType.registeredClass;
          info.leakWarning = new Error("Embind found a leaked C++ instance " + cls.name + " <" + ptrToString($$.ptr) + ">.\n" +
          "We'll free it automatically in this case, but this functionality is not reliable across various environments.\n" +
          "Make sure to invoke .delete() manually once you're done with the instance instead.\n" +
          "Originally allocated"); // `.stack` will add "at ..." after this sentence
          if ('captureStackTrace' in Error) {
            Error.captureStackTrace(info.leakWarning, RegisteredPointer_fromWireType);
          }
          finalizationRegistry.register(handle, info, handle);
        }
        return handle;
      };
      detachFinalizer = (handle) => finalizationRegistry.unregister(handle);
      return attachFinalizer(handle);
    }
  function ClassHandle_clone() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
  
      if (this.$$.preservePointerOnDelete) {
        this.$$.count.value += 1;
        return this;
      } else {
        var clone = attachFinalizer(Object.create(Object.getPrototypeOf(this), {
          $$: {
            value: shallowCopyInternalPointer(this.$$),
          }
        }));
  
        clone.$$.count.value += 1;
        clone.$$.deleteScheduled = false;
        return clone;
      }
    }
  
  
  
  
  function ClassHandle_delete() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
  
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError('Object already scheduled for deletion');
      }
  
      detachFinalizer(this);
      releaseClassHandle(this.$$);
  
      if (!this.$$.preservePointerOnDelete) {
        this.$$.smartPtr = undefined;
        this.$$.ptr = undefined;
      }
    }
  
  function ClassHandle_isDeleted() {
      return !this.$$.ptr;
    }
  
  
  
  function ClassHandle_deleteLater() {
      if (!this.$$.ptr) {
        throwInstanceAlreadyDeleted(this);
      }
      if (this.$$.deleteScheduled && !this.$$.preservePointerOnDelete) {
        throwBindingError('Object already scheduled for deletion');
      }
      deletionQueue.push(this);
      if (deletionQueue.length === 1 && delayFunction) {
        delayFunction(flushPendingDeletes);
      }
      this.$$.deleteScheduled = true;
      return this;
    }
  function init_ClassHandle() {
      ClassHandle.prototype['isAliasOf'] = ClassHandle_isAliasOf;
      ClassHandle.prototype['clone'] = ClassHandle_clone;
      ClassHandle.prototype['delete'] = ClassHandle_delete;
      ClassHandle.prototype['isDeleted'] = ClassHandle_isDeleted;
      ClassHandle.prototype['deleteLater'] = ClassHandle_deleteLater;
    }
  function ClassHandle() {
    }
  
  
  
  function ensureOverloadTable(proto, methodName, humanName) {
      if (undefined === proto[methodName].overloadTable) {
        var prevFunc = proto[methodName];
        // Inject an overload resolver function that routes to the appropriate overload based on the number of arguments.
        proto[methodName] = function() {
          // TODO This check can be removed in -O3 level "unsafe" optimizations.
          if (!proto[methodName].overloadTable.hasOwnProperty(arguments.length)) {
              throwBindingError("Function '" + humanName + "' called with an invalid number of arguments (" + arguments.length + ") - expects one of (" + proto[methodName].overloadTable + ")!");
          }
          return proto[methodName].overloadTable[arguments.length].apply(this, arguments);
        };
        // Move the previous function into the overload table.
        proto[methodName].overloadTable = [];
        proto[methodName].overloadTable[prevFunc.argCount] = prevFunc;
      }
    }
  
  /** @param {number=} numArguments */
  function exposePublicSymbol(name, value, numArguments) {
      if (Module.hasOwnProperty(name)) {
        if (undefined === numArguments || (undefined !== Module[name].overloadTable && undefined !== Module[name].overloadTable[numArguments])) {
          throwBindingError("Cannot register public name '" + name + "' twice");
        }
  
        // We are exposing a function with the same name as an existing function. Create an overload table and a function selector
        // that routes between the two.
        ensureOverloadTable(Module, name, name);
        if (Module.hasOwnProperty(numArguments)) {
            throwBindingError("Cannot register multiple overloads of a function with the same number of arguments (" + numArguments + ")!");
        }
        // Add the new function into the overload table.
        Module[name].overloadTable[numArguments] = value;
      }
      else {
        Module[name] = value;
        if (undefined !== numArguments) {
          Module[name].numArguments = numArguments;
        }
      }
    }
  
  
  
  /** @constructor */
  function RegisteredClass(name,
                               constructor,
                               instancePrototype,
                               rawDestructor,
                               baseClass,
                               getActualType,
                               upcast,
                               downcast) {
      this.name = name;
      this.constructor = constructor;
      this.instancePrototype = instancePrototype;
      this.rawDestructor = rawDestructor;
      this.baseClass = baseClass;
      this.getActualType = getActualType;
      this.upcast = upcast;
      this.downcast = downcast;
      this.pureVirtualFunctions = [];
    }
  
  
  function upcastPointer(ptr, ptrClass, desiredClass) {
      while (ptrClass !== desiredClass) {
        if (!ptrClass.upcast) {
          throwBindingError("Expected null or instance of " + desiredClass.name + ", got an instance of " + ptrClass.name);
        }
        ptr = ptrClass.upcast(ptr);
        ptrClass = ptrClass.baseClass;
      }
      return ptr;
    }
  function constNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name);
        }
        return 0;
      }
  
      if (!handle.$$) {
        throwBindingError('Cannot pass "' + embindRepr(handle) + '" as a ' + this.name);
      }
      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      return ptr;
    }
  
  
  function genericPointerToWireType(destructors, handle) {
      var ptr;
      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name);
        }
  
        if (this.isSmartPointer) {
          ptr = this.rawConstructor();
          if (destructors !== null) {
            destructors.push(this.rawDestructor, ptr);
          }
          return ptr;
        } else {
          return 0;
        }
      }
  
      if (!handle.$$) {
        throwBindingError('Cannot pass "' + embindRepr(handle) + '" as a ' + this.name);
      }
      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name);
      }
      if (!this.isConst && handle.$$.ptrType.isConst) {
        throwBindingError('Cannot convert argument of type ' + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + ' to parameter type ' + this.name);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
  
      if (this.isSmartPointer) {
        // TODO: this is not strictly true
        // We could support BY_EMVAL conversions from raw pointers to smart pointers
        // because the smart pointer can hold a reference to the handle
        if (undefined === handle.$$.smartPtr) {
          throwBindingError('Passing raw pointer to smart pointer is illegal');
        }
  
        switch (this.sharingPolicy) {
          case 0: // NONE
            // no upcasting
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr;
            } else {
              throwBindingError('Cannot convert argument of type ' + (handle.$$.smartPtrType ? handle.$$.smartPtrType.name : handle.$$.ptrType.name) + ' to parameter type ' + this.name);
            }
            break;
  
          case 1: // INTRUSIVE
            ptr = handle.$$.smartPtr;
            break;
  
          case 2: // BY_EMVAL
            if (handle.$$.smartPtrType === this) {
              ptr = handle.$$.smartPtr;
            } else {
              var clonedHandle = handle['clone']();
              ptr = this.rawShare(
                ptr,
                Emval.toHandle(function() {
                  clonedHandle['delete']();
                })
              );
              if (destructors !== null) {
                destructors.push(this.rawDestructor, ptr);
              }
            }
            break;
  
          default:
            throwBindingError('Unsupporting sharing policy');
        }
      }
      return ptr;
    }
  
  
  function nonConstNoSmartPtrRawPointerToWireType(destructors, handle) {
      if (handle === null) {
        if (this.isReference) {
          throwBindingError('null is not a valid ' + this.name);
        }
        return 0;
      }
  
      if (!handle.$$) {
        throwBindingError('Cannot pass "' + embindRepr(handle) + '" as a ' + this.name);
      }
      if (!handle.$$.ptr) {
        throwBindingError('Cannot pass deleted object as a pointer of type ' + this.name);
      }
      if (handle.$$.ptrType.isConst) {
          throwBindingError('Cannot convert argument of type ' + handle.$$.ptrType.name + ' to parameter type ' + this.name);
      }
      var handleClass = handle.$$.ptrType.registeredClass;
      var ptr = upcastPointer(handle.$$.ptr, handleClass, this.registeredClass);
      return ptr;
    }
  
  function simpleReadValueFromPointer(pointer) {
      return this['fromWireType'](HEAP32[((pointer)>>2)]);
    }
  
  function RegisteredPointer_getPointee(ptr) {
      if (this.rawGetPointee) {
        ptr = this.rawGetPointee(ptr);
      }
      return ptr;
    }
  
  function RegisteredPointer_destructor(ptr) {
      if (this.rawDestructor) {
        this.rawDestructor(ptr);
      }
    }
  
  function RegisteredPointer_deleteObject(handle) {
      if (handle !== null) {
        handle['delete']();
      }
    }
  
  function init_RegisteredPointer() {
      RegisteredPointer.prototype.getPointee = RegisteredPointer_getPointee;
      RegisteredPointer.prototype.destructor = RegisteredPointer_destructor;
      RegisteredPointer.prototype['argPackAdvance'] = 8;
      RegisteredPointer.prototype['readValueFromPointer'] = simpleReadValueFromPointer;
      RegisteredPointer.prototype['deleteObject'] = RegisteredPointer_deleteObject;
      RegisteredPointer.prototype['fromWireType'] = RegisteredPointer_fromWireType;
    }
  /** @constructor
      @param {*=} pointeeType,
      @param {*=} sharingPolicy,
      @param {*=} rawGetPointee,
      @param {*=} rawConstructor,
      @param {*=} rawShare,
      @param {*=} rawDestructor,
       */
  function RegisteredPointer(
      name,
      registeredClass,
      isReference,
      isConst,
  
      // smart pointer properties
      isSmartPointer,
      pointeeType,
      sharingPolicy,
      rawGetPointee,
      rawConstructor,
      rawShare,
      rawDestructor
    ) {
      this.name = name;
      this.registeredClass = registeredClass;
      this.isReference = isReference;
      this.isConst = isConst;
  
      // smart pointer properties
      this.isSmartPointer = isSmartPointer;
      this.pointeeType = pointeeType;
      this.sharingPolicy = sharingPolicy;
      this.rawGetPointee = rawGetPointee;
      this.rawConstructor = rawConstructor;
      this.rawShare = rawShare;
      this.rawDestructor = rawDestructor;
  
      if (!isSmartPointer && registeredClass.baseClass === undefined) {
        if (isConst) {
          this['toWireType'] = constNoSmartPtrRawPointerToWireType;
          this.destructorFunction = null;
        } else {
          this['toWireType'] = nonConstNoSmartPtrRawPointerToWireType;
          this.destructorFunction = null;
        }
      } else {
        this['toWireType'] = genericPointerToWireType;
        // Here we must leave this.destructorFunction undefined, since whether genericPointerToWireType returns
        // a pointer that needs to be freed up is runtime-dependent, and cannot be evaluated at registration time.
        // TODO: Create an alternative mechanism that allows removing the use of var destructors = []; array in
        //       craftInvokerFunction altogether.
      }
    }
  
  /** @param {number=} numArguments */
  function replacePublicSymbol(name, value, numArguments) {
      if (!Module.hasOwnProperty(name)) {
        throwInternalError('Replacing nonexistant public symbol');
      }
      // If there's an overload table for this symbol, replace the symbol in the overload table instead.
      if (undefined !== Module[name].overloadTable && undefined !== numArguments) {
        Module[name].overloadTable[numArguments] = value;
      }
      else {
        Module[name] = value;
        Module[name].argCount = numArguments;
      }
    }
  
  
  
  function dynCallLegacy(sig, ptr, args) {
      assert(('dynCall_' + sig) in Module, 'bad function pointer type - dynCall function not found for sig \'' + sig + '\'');
      if (args && args.length) {
        // j (64-bit integer) must be passed in as two numbers [low 32, high 32].
        assert(args.length === sig.substring(1).replace(/j/g, '--').length);
      } else {
        assert(sig.length == 1);
      }
      var f = Module['dynCall_' + sig];
      return args && args.length ? f.apply(null, [ptr].concat(args)) : f.call(null, ptr);
    }
  
  var wasmTableMirror = [];
  
  function getWasmTableEntry(funcPtr) {
      var func = wasmTableMirror[funcPtr];
      if (!func) {
        if (funcPtr >= wasmTableMirror.length) wasmTableMirror.length = funcPtr + 1;
        wasmTableMirror[funcPtr] = func = wasmTable.get(funcPtr);
      }
      assert(wasmTable.get(funcPtr) == func, "JavaScript-side Wasm function table mirror is out of date!");
      return func;
    }
  
  /** @param {Object=} args */
  function dynCall(sig, ptr, args) {
      // Without WASM_BIGINT support we cannot directly call function with i64 as
      // part of thier signature, so we rely the dynCall functions generated by
      // wasm-emscripten-finalize
      if (sig.includes('j')) {
        return dynCallLegacy(sig, ptr, args);
      }
      assert(getWasmTableEntry(ptr), 'missing table entry in dynCall: ' + ptr);
      var rtn = getWasmTableEntry(ptr).apply(null, args);
      return rtn;
    }
  
  function getDynCaller(sig, ptr) {
      assert(sig.includes('j') || sig.includes('p'), 'getDynCaller should only be called with i64 sigs');
      var argCache = [];
      return function() {
        argCache.length = 0;
        Object.assign(argCache, arguments);
        return dynCall(sig, ptr, argCache);
      };
    }
  
  
  function embind__requireFunction(signature, rawFunction) {
      signature = readLatin1String(signature);
  
      function makeDynCaller() {
        if (signature.includes('j')) {
          return getDynCaller(signature, rawFunction);
        }
        return getWasmTableEntry(rawFunction);
      }
  
      var fp = makeDynCaller();
      if (typeof fp != "function") {
          throwBindingError("unknown function pointer with signature " + signature + ": " + rawFunction);
      }
      return fp;
    }
  
  
  
  var UnboundTypeError = undefined;
  
  
  function getTypeName(type) {
      var ptr = ___getTypeName(type);
      var rv = readLatin1String(ptr);
      _free(ptr);
      return rv;
    }
  function throwUnboundTypeError(message, types) {
      var unboundTypes = [];
      var seen = {};
      function visit(type) {
        if (seen[type]) {
          return;
        }
        if (registeredTypes[type]) {
          return;
        }
        if (typeDependencies[type]) {
          typeDependencies[type].forEach(visit);
          return;
        }
        unboundTypes.push(type);
        seen[type] = true;
      }
      types.forEach(visit);
  
      throw new UnboundTypeError(message + ': ' + unboundTypes.map(getTypeName).join([', ']));
    }
  
  function __embind_register_class(rawType,
                                     rawPointerType,
                                     rawConstPointerType,
                                     baseClassRawType,
                                     getActualTypeSignature,
                                     getActualType,
                                     upcastSignature,
                                     upcast,
                                     downcastSignature,
                                     downcast,
                                     name,
                                     destructorSignature,
                                     rawDestructor) {
      name = readLatin1String(name);
      getActualType = embind__requireFunction(getActualTypeSignature, getActualType);
      if (upcast) {
        upcast = embind__requireFunction(upcastSignature, upcast);
      }
      if (downcast) {
        downcast = embind__requireFunction(downcastSignature, downcast);
      }
      rawDestructor = embind__requireFunction(destructorSignature, rawDestructor);
      var legalFunctionName = makeLegalFunctionName(name);
  
      exposePublicSymbol(legalFunctionName, function() {
        // this code cannot run if baseClassRawType is zero
        throwUnboundTypeError('Cannot construct ' + name + ' due to unbound types', [baseClassRawType]);
      });
  
      whenDependentTypesAreResolved(
        [rawType, rawPointerType, rawConstPointerType],
        baseClassRawType ? [baseClassRawType] : [],
        function(base) {
          base = base[0];
  
          var baseClass;
          var basePrototype;
          if (baseClassRawType) {
            baseClass = base.registeredClass;
            basePrototype = baseClass.instancePrototype;
          } else {
            basePrototype = ClassHandle.prototype;
          }
  
          var constructor = createNamedFunction(legalFunctionName, function() {
            if (Object.getPrototypeOf(this) !== instancePrototype) {
              throw new BindingError("Use 'new' to construct " + name);
            }
            if (undefined === registeredClass.constructor_body) {
              throw new BindingError(name + " has no accessible constructor");
            }
            var body = registeredClass.constructor_body[arguments.length];
            if (undefined === body) {
              throw new BindingError("Tried to invoke ctor of " + name + " with invalid number of parameters (" + arguments.length + ") - expected (" + Object.keys(registeredClass.constructor_body).toString() + ") parameters instead!");
            }
            return body.apply(this, arguments);
          });
  
          var instancePrototype = Object.create(basePrototype, {
            constructor: { value: constructor },
          });
  
          constructor.prototype = instancePrototype;
  
          var registeredClass = new RegisteredClass(name,
                                                    constructor,
                                                    instancePrototype,
                                                    rawDestructor,
                                                    baseClass,
                                                    getActualType,
                                                    upcast,
                                                    downcast);
  
          var referenceConverter = new RegisteredPointer(name,
                                                         registeredClass,
                                                         true,
                                                         false,
                                                         false);
  
          var pointerConverter = new RegisteredPointer(name + '*',
                                                       registeredClass,
                                                       false,
                                                       false,
                                                       false);
  
          var constPointerConverter = new RegisteredPointer(name + ' const*',
                                                            registeredClass,
                                                            false,
                                                            true,
                                                            false);
  
          registeredPointers[rawType] = {
            pointerType: pointerConverter,
            constPointerType: constPointerConverter
          };
  
          replacePublicSymbol(legalFunctionName, constructor);
  
          return [referenceConverter, pointerConverter, constPointerConverter];
        }
      );
    }

  
  function runDestructors(destructors) {
      while (destructors.length) {
        var ptr = destructors.pop();
        var del = destructors.pop();
        del(ptr);
      }
    }
  
  function craftInvokerFunction(humanName, argTypes, classType, cppInvokerFunc, cppTargetFunc, isAsync) {
      // humanName: a human-readable string name for the function to be generated.
      // argTypes: An array that contains the embind type objects for all types in the function signature.
      //    argTypes[0] is the type object for the function return value.
      //    argTypes[1] is the type object for function this object/class type, or null if not crafting an invoker for a class method.
      //    argTypes[2...] are the actual function parameters.
      // classType: The embind type object for the class to be bound, or null if this is not a method of a class.
      // cppInvokerFunc: JS Function object to the C++-side function that interops into C++ code.
      // cppTargetFunc: Function pointer (an integer to FUNCTION_TABLE) to the target C++ function the cppInvokerFunc will end up calling.
      var argCount = argTypes.length;
  
      if (argCount < 2) {
        throwBindingError("argTypes array size mismatch! Must at least get return value and 'this' types!");
      }
  
      assert(!isAsync, 'Async bindings are only supported with JSPI.');
  
      var isClassMethodFunc = (argTypes[1] !== null && classType !== null);
  
      // Free functions with signature "void function()" do not need an invoker that marshalls between wire types.
  // TODO: This omits argument count check - enable only at -O3 or similar.
  //    if (ENABLE_UNSAFE_OPTS && argCount == 2 && argTypes[0].name == "void" && !isClassMethodFunc) {
  //       return FUNCTION_TABLE[fn];
  //    }
  
      // Determine if we need to use a dynamic stack to store the destructors for the function parameters.
      // TODO: Remove this completely once all function invokers are being dynamically generated.
      var needsDestructorStack = false;
  
      for (var i = 1; i < argTypes.length; ++i) { // Skip return value at index 0 - it's not deleted here.
        if (argTypes[i] !== null && argTypes[i].destructorFunction === undefined) { // The type does not define a destructor function - must use dynamic stack
          needsDestructorStack = true;
          break;
        }
      }
  
      var returns = (argTypes[0].name !== "void");
  
      var expectedArgCount = argCount - 2;
      var argsWired = new Array(expectedArgCount);
      var invokerFuncArgs = [];
      var destructors = [];
      return function() {
        if (arguments.length !== expectedArgCount) {
          throwBindingError('function ' + humanName + ' called with ' +
            arguments.length + ' arguments, expected ' + expectedArgCount +
            ' args!');
        }
        destructors.length = 0;
        var thisWired;
        invokerFuncArgs.length = isClassMethodFunc ? 2 : 1;
        invokerFuncArgs[0] = cppTargetFunc;
        if (isClassMethodFunc) {
          thisWired = argTypes[1]['toWireType'](destructors, this);
          invokerFuncArgs[1] = thisWired;
        }
        for (var i = 0; i < expectedArgCount; ++i) {
          argsWired[i] = argTypes[i + 2]['toWireType'](destructors, arguments[i]);
          invokerFuncArgs.push(argsWired[i]);
        }
  
        var rv = cppInvokerFunc.apply(null, invokerFuncArgs);
  
        function onDone(rv) {
          if (needsDestructorStack) {
            runDestructors(destructors);
          } else {
            for (var i = isClassMethodFunc ? 1 : 2; i < argTypes.length; i++) {
              var param = i === 1 ? thisWired : argsWired[i - 2];
              if (argTypes[i].destructorFunction !== null) {
                argTypes[i].destructorFunction(param);
              }
            }
          }
  
          if (returns) {
            return argTypes[0]['fromWireType'](rv);
          }
        }
  
        return onDone(rv);
      };
    }
  
  
  function heap32VectorToArray(count, firstElement) {
      var array = [];
      for (var i = 0; i < count; i++) {
          // TODO(https://github.com/emscripten-core/emscripten/issues/17310):
          // Find a way to hoist the `>> 2` or `>> 3` out of this loop.
          array.push(HEAPU32[(((firstElement)+(i * 4))>>2)]);
      }
      return array;
    }
  
  
  
  
  function __embind_register_class_class_function(rawClassType,
                                                    methodName,
                                                    argCount,
                                                    rawArgTypesAddr,
                                                    invokerSignature,
                                                    rawInvoker,
                                                    fn,
                                                    isAsync) {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      methodName = readLatin1String(methodName);
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
      whenDependentTypesAreResolved([], [rawClassType], function(classType) {
        classType = classType[0];
        var humanName = classType.name + '.' + methodName;
  
        function unboundTypesHandler() {
          throwUnboundTypeError('Cannot call ' + humanName + ' due to unbound types', rawArgTypes);
        }
  
        if (methodName.startsWith("@@")) {
          methodName = Symbol[methodName.substring(2)];
        }
  
        var proto = classType.registeredClass.constructor;
        if (undefined === proto[methodName]) {
          // This is the first function to be registered with this name.
          unboundTypesHandler.argCount = argCount-1;
          proto[methodName] = unboundTypesHandler;
        } else {
          // There was an existing function with the same name registered. Set up
          // a function overload routing table.
          ensureOverloadTable(proto, methodName, humanName);
          proto[methodName].overloadTable[argCount-1] = unboundTypesHandler;
        }
  
        whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
          // Replace the initial unbound-types-handler stub with the proper
          // function. If multiple overloads are registered, the function handlers
          // go into an overload table.
          var invokerArgsArray = [argTypes[0] /* return value */, null /* no class 'this'*/].concat(argTypes.slice(1) /* actual params */);
          var func = craftInvokerFunction(humanName, invokerArgsArray, null /* no class 'this'*/, rawInvoker, fn, isAsync);
          if (undefined === proto[methodName].overloadTable) {
            func.argCount = argCount-1;
            proto[methodName] = func;
          } else {
            proto[methodName].overloadTable[argCount-1] = func;
          }
          return [];
        });
        return [];
      });
    }

  
  
  
  
  
  
  function __embind_register_class_constructor(
      rawClassType,
      argCount,
      rawArgTypesAddr,
      invokerSignature,
      invoker,
      rawConstructor
    ) {
      assert(argCount > 0);
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      invoker = embind__requireFunction(invokerSignature, invoker);
  
      whenDependentTypesAreResolved([], [rawClassType], function(classType) {
        classType = classType[0];
        var humanName = 'constructor ' + classType.name;
  
        if (undefined === classType.registeredClass.constructor_body) {
          classType.registeredClass.constructor_body = [];
        }
        if (undefined !== classType.registeredClass.constructor_body[argCount - 1]) {
          throw new BindingError("Cannot register multiple constructors with identical number of parameters (" + (argCount-1) + ") for class '" + classType.name + "'! Overload resolution is currently only performed using the parameter count, not actual type info!");
        }
        classType.registeredClass.constructor_body[argCount - 1] = () => {
          throwUnboundTypeError('Cannot construct ' + classType.name + ' due to unbound types', rawArgTypes);
        };
  
        whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
          // Insert empty slot for context type (argTypes[1]).
          argTypes.splice(1, 0, null);
          classType.registeredClass.constructor_body[argCount - 1] = craftInvokerFunction(humanName, argTypes, null, invoker, rawConstructor);
          return [];
        });
        return [];
      });
    }

  
  
  
  
  
  function __embind_register_class_function(rawClassType,
                                              methodName,
                                              argCount,
                                              rawArgTypesAddr, // [ReturnType, ThisType, Args...]
                                              invokerSignature,
                                              rawInvoker,
                                              context,
                                              isPureVirtual,
                                              isAsync) {
      var rawArgTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      methodName = readLatin1String(methodName);
      rawInvoker = embind__requireFunction(invokerSignature, rawInvoker);
  
      whenDependentTypesAreResolved([], [rawClassType], function(classType) {
        classType = classType[0];
        var humanName = classType.name + '.' + methodName;
  
        if (methodName.startsWith("@@")) {
          methodName = Symbol[methodName.substring(2)];
        }
  
        if (isPureVirtual) {
          classType.registeredClass.pureVirtualFunctions.push(methodName);
        }
  
        function unboundTypesHandler() {
          throwUnboundTypeError('Cannot call ' + humanName + ' due to unbound types', rawArgTypes);
        }
  
        var proto = classType.registeredClass.instancePrototype;
        var method = proto[methodName];
        if (undefined === method || (undefined === method.overloadTable && method.className !== classType.name && method.argCount === argCount - 2)) {
          // This is the first overload to be registered, OR we are replacing a
          // function in the base class with a function in the derived class.
          unboundTypesHandler.argCount = argCount - 2;
          unboundTypesHandler.className = classType.name;
          proto[methodName] = unboundTypesHandler;
        } else {
          // There was an existing function with the same name registered. Set up
          // a function overload routing table.
          ensureOverloadTable(proto, methodName, humanName);
          proto[methodName].overloadTable[argCount - 2] = unboundTypesHandler;
        }
  
        whenDependentTypesAreResolved([], rawArgTypes, function(argTypes) {
          var memberFunction = craftInvokerFunction(humanName, argTypes, classType, rawInvoker, context, isAsync);
  
          // Replace the initial unbound-handler-stub function with the appropriate member function, now that all types
          // are resolved. If multiple overloads are registered for this function, the function goes into an overload table.
          if (undefined === proto[methodName].overloadTable) {
            // Set argCount in case an overload is registered later
            memberFunction.argCount = argCount - 2;
            proto[methodName] = memberFunction;
          } else {
            proto[methodName].overloadTable[argCount - 2] = memberFunction;
          }
  
          return [];
        });
        return [];
      });
    }

  /** @constructor */
  function HandleAllocator() {
      // Reserve slot 0 so that 0 is always an invalid handle
      this.allocated = [undefined];
      this.freelist = [];
      this.get = function(id) {
        assert(this.allocated[id] !== undefined, 'invalid handle: ' + id);
        return this.allocated[id];
      };
      this.allocate = function(handle) {
        let id = this.freelist.pop() || this.allocated.length;
        this.allocated[id] = handle;
        return id;
      };
      this.free = function(id) {
        assert(this.allocated[id] !== undefined);
        // Set the slot to `undefined` rather than using `delete` here since
        // apparently arrays with holes in them can be less efficient.
        this.allocated[id] = undefined;
        this.freelist.push(id);
      };
    }
  var emval_handles = new HandleAllocator();  function __emval_decref(handle) {
      if (handle >= emval_handles.reserved && 0 === --emval_handles.get(handle).refcount) {
        emval_handles.free(handle);
      }
    }
  
  
  
  function count_emval_handles() {
      var count = 0;
      for (var i = emval_handles.reserved; i < emval_handles.allocated.length; ++i) {
        if (emval_handles.allocated[i] !== undefined) {
          ++count;
        }
      }
      return count;
    }
  
  function init_emval() {
      // reserve some special values. These never get de-allocated.
      // The HandleAllocator takes care of reserving zero.
      emval_handles.allocated.push(
        {value: undefined},
        {value: null},
        {value: true},
        {value: false},
      );
      emval_handles.reserved = emval_handles.allocated.length;
      Module['count_emval_handles'] = count_emval_handles;
    }
  var Emval = {toValue:(handle) => {
        if (!handle) {
            throwBindingError('Cannot use deleted val. handle = ' + handle);
        }
        return emval_handles.get(handle).value;
      },toHandle:(value) => {
        switch (value) {
          case undefined: return 1;
          case null: return 2;
          case true: return 3;
          case false: return 4;
          default:{
            return emval_handles.allocate({refcount: 1, value: value});
          }
        }
      }};
  
  
  
  function __embind_register_emval(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': function(handle) {
          var rv = Emval.toValue(handle);
          __emval_decref(handle);
          return rv;
        },
        'toWireType': function(destructors, value) {
          return Emval.toHandle(value);
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: null, // This type does not need a destructor
  
        // TODO: do we need a deleteObject here?  write a test where
        // emval is passed into JS via an interface
      });
    }

  function embindRepr(v) {
      if (v === null) {
          return 'null';
      }
      var t = typeof v;
      if (t === 'object' || t === 'array' || t === 'function') {
          return v.toString();
      } else {
          return '' + v;
      }
    }
  
  function floatReadValueFromPointer(name, shift) {
      switch (shift) {
          case 2: return function(pointer) {
              return this['fromWireType'](HEAPF32[pointer >> 2]);
          };
          case 3: return function(pointer) {
              return this['fromWireType'](HEAPF64[pointer >> 3]);
          };
          default:
              throw new TypeError("Unknown float type: " + name);
      }
    }
  
  
  
  function __embind_register_float(rawType, name, size) {
      var shift = getShiftFromSize(size);
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': function(value) {
           return value;
        },
        'toWireType': function(destructors, value) {
          if (typeof value != "number" && typeof value != "boolean") {
            throw new TypeError('Cannot convert "' + embindRepr(value) + '" to ' + this.name);
          }
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': floatReadValueFromPointer(name, shift),
        destructorFunction: null, // This type does not need a destructor
      });
    }

  
  
  
  
  
  
  
  function __embind_register_function(name, argCount, rawArgTypesAddr, signature, rawInvoker, fn, isAsync) {
      var argTypes = heap32VectorToArray(argCount, rawArgTypesAddr);
      name = readLatin1String(name);
  
      rawInvoker = embind__requireFunction(signature, rawInvoker);
  
      exposePublicSymbol(name, function() {
        throwUnboundTypeError('Cannot call ' + name + ' due to unbound types', argTypes);
      }, argCount - 1);
  
      whenDependentTypesAreResolved([], argTypes, function(argTypes) {
        var invokerArgsArray = [argTypes[0] /* return value */, null /* no class 'this'*/].concat(argTypes.slice(1) /* actual params */);
        replacePublicSymbol(name, craftInvokerFunction(name, invokerArgsArray, null /* no class 'this'*/, rawInvoker, fn, isAsync), argCount - 1);
        return [];
      });
    }

  
  
  function integerReadValueFromPointer(name, shift, signed) {
      // integers are quite common, so generate very specialized functions
      switch (shift) {
          case 0: return signed ?
              function readS8FromPointer(pointer) { return HEAP8[pointer]; } :
              function readU8FromPointer(pointer) { return HEAPU8[pointer]; };
          case 1: return signed ?
              function readS16FromPointer(pointer) { return HEAP16[pointer >> 1]; } :
              function readU16FromPointer(pointer) { return HEAPU16[pointer >> 1]; };
          case 2: return signed ?
              function readS32FromPointer(pointer) { return HEAP32[pointer >> 2]; } :
              function readU32FromPointer(pointer) { return HEAPU32[pointer >> 2]; };
          default:
              throw new TypeError("Unknown integer type: " + name);
      }
    }
  
  
  function __embind_register_integer(primitiveType, name, size, minRange, maxRange) {
      name = readLatin1String(name);
      // LLVM doesn't have signed and unsigned 32-bit types, so u32 literals come
      // out as 'i32 -1'. Always treat those as max u32.
      if (maxRange === -1) {
          maxRange = 4294967295;
      }
  
      var shift = getShiftFromSize(size);
  
      var fromWireType = (value) => value;
  
      if (minRange === 0) {
          var bitshift = 32 - 8*size;
          fromWireType = (value) => (value << bitshift) >>> bitshift;
      }
  
      var isUnsignedType = (name.includes('unsigned'));
      var checkAssertions = (value, toTypeName) => {
        if (typeof value != "number" && typeof value != "boolean") {
          throw new TypeError('Cannot convert "' + embindRepr(value) + '" to ' + toTypeName);
        }
        if (value < minRange || value > maxRange) {
          throw new TypeError('Passing a number "' + embindRepr(value) + '" from JS side to C/C++ side to an argument of type "' + name + '", which is outside the valid range [' + minRange + ', ' + maxRange + ']!');
        }
      };
      var toWireType;
      if (isUnsignedType) {
        toWireType = function(destructors, value) {
          checkAssertions(value, this.name);
          return value >>> 0;
        };
      } else {
        toWireType = function(destructors, value) {
          checkAssertions(value, this.name);
          // The VM will perform JS to Wasm value conversion, according to the spec:
          // https://www.w3.org/TR/wasm-js-api-1/#towebassemblyvalue
          return value;
        };
      }
      registerType(primitiveType, {
        name: name,
        'fromWireType': fromWireType,
        'toWireType': toWireType,
        'argPackAdvance': 8,
        'readValueFromPointer': integerReadValueFromPointer(name, shift, minRange !== 0),
        destructorFunction: null, // This type does not need a destructor
      });
    }

  
  function __embind_register_memory_view(rawType, dataTypeIndex, name) {
      var typeMapping = [
        Int8Array,
        Uint8Array,
        Int16Array,
        Uint16Array,
        Int32Array,
        Uint32Array,
        Float32Array,
        Float64Array,
      ];
  
      var TA = typeMapping[dataTypeIndex];
  
      function decodeMemoryView(handle) {
        handle = handle >> 2;
        var heap = HEAPU32;
        var size = heap[handle]; // in elements
        var data = heap[handle + 1]; // byte offset into emscripten heap
        return new TA(heap.buffer, data, size);
      }
  
      name = readLatin1String(name);
      registerType(rawType, {
        name: name,
        'fromWireType': decodeMemoryView,
        'argPackAdvance': 8,
        'readValueFromPointer': decodeMemoryView,
      }, {
        ignoreDuplicateRegistrations: true,
      });
    }

  
  
  
  
  
  
  function __embind_register_std_string(rawType, name) {
      name = readLatin1String(name);
      var stdStringIsUTF8
      //process only std::string bindings with UTF8 support, in contrast to e.g. std::basic_string<unsigned char>
      = (name === "std::string");
  
      registerType(rawType, {
        name: name,
        'fromWireType': function(value) {
          var length = HEAPU32[((value)>>2)];
          var payload = value + 4;
  
          var str;
          if (stdStringIsUTF8) {
            var decodeStartPtr = payload;
            // Looping here to support possible embedded '0' bytes
            for (var i = 0; i <= length; ++i) {
              var currentBytePtr = payload + i;
              if (i == length || HEAPU8[currentBytePtr] == 0) {
                var maxRead = currentBytePtr - decodeStartPtr;
                var stringSegment = UTF8ToString(decodeStartPtr, maxRead);
                if (str === undefined) {
                  str = stringSegment;
                } else {
                  str += String.fromCharCode(0);
                  str += stringSegment;
                }
                decodeStartPtr = currentBytePtr + 1;
              }
            }
          } else {
            var a = new Array(length);
            for (var i = 0; i < length; ++i) {
              a[i] = String.fromCharCode(HEAPU8[payload + i]);
            }
            str = a.join('');
          }
  
          _free(value);
  
          return str;
        },
        'toWireType': function(destructors, value) {
          if (value instanceof ArrayBuffer) {
            value = new Uint8Array(value);
          }
  
          var length;
          var valueIsOfTypeString = (typeof value == 'string');
  
          if (!(valueIsOfTypeString || value instanceof Uint8Array || value instanceof Uint8ClampedArray || value instanceof Int8Array)) {
            throwBindingError('Cannot pass non-string to std::string');
          }
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            length = lengthBytesUTF8(value);
          } else {
            length = value.length;
          }
  
          // assumes 4-byte alignment
          var base = _malloc(4 + length + 1);
          var ptr = base + 4;
          HEAPU32[((base)>>2)] = length;
          if (stdStringIsUTF8 && valueIsOfTypeString) {
            stringToUTF8(value, ptr, length + 1);
          } else {
            if (valueIsOfTypeString) {
              for (var i = 0; i < length; ++i) {
                var charCode = value.charCodeAt(i);
                if (charCode > 255) {
                  _free(ptr);
                  throwBindingError('String has UTF-16 code units that do not fit in 8 bits');
                }
                HEAPU8[ptr + i] = charCode;
              }
            } else {
              for (var i = 0; i < length; ++i) {
                HEAPU8[ptr + i] = value[i];
              }
            }
          }
  
          if (destructors !== null) {
            destructors.push(_free, base);
          }
          return base;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: function(ptr) { _free(ptr); },
      });
    }

  
  
  
  var UTF16Decoder = typeof TextDecoder != 'undefined' ? new TextDecoder('utf-16le') : undefined;  function UTF16ToString(ptr, maxBytesToRead) {
      assert(ptr % 2 == 0, 'Pointer passed to UTF16ToString must be aligned to two bytes!');
      var endPtr = ptr;
      // TextDecoder needs to know the byte length in advance, it doesn't stop on
      // null terminator by itself.
      // Also, use the length info to avoid running tiny strings through
      // TextDecoder, since .subarray() allocates garbage.
      var idx = endPtr >> 1;
      var maxIdx = idx + maxBytesToRead / 2;
      // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.
      while (!(idx >= maxIdx) && HEAPU16[idx]) ++idx;
      endPtr = idx << 1;
  
      if (endPtr - ptr > 32 && UTF16Decoder)
        return UTF16Decoder.decode(HEAPU8.subarray(ptr, endPtr));
  
      // Fallback: decode without UTF16Decoder
      var str = '';
  
      // If maxBytesToRead is not passed explicitly, it will be undefined, and the
      // for-loop's condition will always evaluate to true. The loop is then
      // terminated on the first null char.
      for (var i = 0; !(i >= maxBytesToRead / 2); ++i) {
        var codeUnit = HEAP16[(((ptr)+(i*2))>>1)];
        if (codeUnit == 0) break;
        // fromCharCode constructs a character from a UTF-16 code unit, so we can
        // pass the UTF16 string right through.
        str += String.fromCharCode(codeUnit);
      }
  
      return str;
    }
  
  function stringToUTF16(str, outPtr, maxBytesToWrite) {
      assert(outPtr % 2 == 0, 'Pointer passed to stringToUTF16 must be aligned to two bytes!');
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF16(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 0x7FFFFFFF;
      }
      if (maxBytesToWrite < 2) return 0;
      maxBytesToWrite -= 2; // Null terminator.
      var startPtr = outPtr;
      var numCharsToWrite = (maxBytesToWrite < str.length*2) ? (maxBytesToWrite / 2) : str.length;
      for (var i = 0; i < numCharsToWrite; ++i) {
        // charCodeAt returns a UTF-16 encoded code unit, so it can be directly written to the HEAP.
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
        HEAP16[((outPtr)>>1)] = codeUnit;
        outPtr += 2;
      }
      // Null-terminate the pointer to the HEAP.
      HEAP16[((outPtr)>>1)] = 0;
      return outPtr - startPtr;
    }
  
  function lengthBytesUTF16(str) {
      return str.length*2;
    }
  
  function UTF32ToString(ptr, maxBytesToRead) {
      assert(ptr % 4 == 0, 'Pointer passed to UTF32ToString must be aligned to four bytes!');
      var i = 0;
  
      var str = '';
      // If maxBytesToRead is not passed explicitly, it will be undefined, and this
      // will always evaluate to true. This saves on code size.
      while (!(i >= maxBytesToRead / 4)) {
        var utf32 = HEAP32[(((ptr)+(i*4))>>2)];
        if (utf32 == 0) break;
        ++i;
        // Gotcha: fromCharCode constructs a character from a UTF-16 encoded code (pair), not from a Unicode code point! So encode the code point to UTF-16 for constructing.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        if (utf32 >= 0x10000) {
          var ch = utf32 - 0x10000;
          str += String.fromCharCode(0xD800 | (ch >> 10), 0xDC00 | (ch & 0x3FF));
        } else {
          str += String.fromCharCode(utf32);
        }
      }
      return str;
    }
  
  function stringToUTF32(str, outPtr, maxBytesToWrite) {
      assert(outPtr % 4 == 0, 'Pointer passed to stringToUTF32 must be aligned to four bytes!');
      assert(typeof maxBytesToWrite == 'number', 'stringToUTF32(str, outPtr, maxBytesToWrite) is missing the third parameter that specifies the length of the output buffer!');
      // Backwards compatibility: if max bytes is not specified, assume unsafe unbounded write is allowed.
      if (maxBytesToWrite === undefined) {
        maxBytesToWrite = 0x7FFFFFFF;
      }
      if (maxBytesToWrite < 4) return 0;
      var startPtr = outPtr;
      var endPtr = startPtr + maxBytesToWrite - 4;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var codeUnit = str.charCodeAt(i); // possibly a lead surrogate
        if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) {
          var trailSurrogate = str.charCodeAt(++i);
          codeUnit = 0x10000 + ((codeUnit & 0x3FF) << 10) | (trailSurrogate & 0x3FF);
        }
        HEAP32[((outPtr)>>2)] = codeUnit;
        outPtr += 4;
        if (outPtr + 4 > endPtr) break;
      }
      // Null-terminate the pointer to the HEAP.
      HEAP32[((outPtr)>>2)] = 0;
      return outPtr - startPtr;
    }
  
  function lengthBytesUTF32(str) {
      var len = 0;
      for (var i = 0; i < str.length; ++i) {
        // Gotcha: charCodeAt returns a 16-bit word that is a UTF-16 encoded code unit, not a Unicode code point of the character! We must decode the string to UTF-32 to the heap.
        // See http://unicode.org/faq/utf_bom.html#utf16-3
        var codeUnit = str.charCodeAt(i);
        if (codeUnit >= 0xD800 && codeUnit <= 0xDFFF) ++i; // possibly a lead surrogate, so skip over the tail surrogate.
        len += 4;
      }
  
      return len;
    }
  function __embind_register_std_wstring(rawType, charSize, name) {
      name = readLatin1String(name);
      var decodeString, encodeString, getHeap, lengthBytesUTF, shift;
      if (charSize === 2) {
        decodeString = UTF16ToString;
        encodeString = stringToUTF16;
        lengthBytesUTF = lengthBytesUTF16;
        getHeap = () => HEAPU16;
        shift = 1;
      } else if (charSize === 4) {
        decodeString = UTF32ToString;
        encodeString = stringToUTF32;
        lengthBytesUTF = lengthBytesUTF32;
        getHeap = () => HEAPU32;
        shift = 2;
      }
      registerType(rawType, {
        name: name,
        'fromWireType': function(value) {
          // Code mostly taken from _embind_register_std_string fromWireType
          var length = HEAPU32[value >> 2];
          var HEAP = getHeap();
          var str;
  
          var decodeStartPtr = value + 4;
          // Looping here to support possible embedded '0' bytes
          for (var i = 0; i <= length; ++i) {
            var currentBytePtr = value + 4 + i * charSize;
            if (i == length || HEAP[currentBytePtr >> shift] == 0) {
              var maxReadBytes = currentBytePtr - decodeStartPtr;
              var stringSegment = decodeString(decodeStartPtr, maxReadBytes);
              if (str === undefined) {
                str = stringSegment;
              } else {
                str += String.fromCharCode(0);
                str += stringSegment;
              }
              decodeStartPtr = currentBytePtr + charSize;
            }
          }
  
          _free(value);
  
          return str;
        },
        'toWireType': function(destructors, value) {
          if (!(typeof value == 'string')) {
            throwBindingError('Cannot pass non-string to C++ string type ' + name);
          }
  
          // assumes 4-byte alignment
          var length = lengthBytesUTF(value);
          var ptr = _malloc(4 + length + charSize);
          HEAPU32[ptr >> 2] = length >> shift;
  
          encodeString(value, ptr + 4, length + charSize);
  
          if (destructors !== null) {
            destructors.push(_free, ptr);
          }
          return ptr;
        },
        'argPackAdvance': 8,
        'readValueFromPointer': simpleReadValueFromPointer,
        destructorFunction: function(ptr) { _free(ptr); },
      });
    }

  
  function __embind_register_void(rawType, name) {
      name = readLatin1String(name);
      registerType(rawType, {
          isVoid: true, // void return values can be optimized out sometimes
          name: name,
          'argPackAdvance': 0,
          'fromWireType': function() {
              return undefined;
          },
          'toWireType': function(destructors, o) {
              // TODO: assert if anything else is given?
              return undefined;
          },
      });
    }

  
  
  
  function requireRegisteredType(rawType, humanName) {
      var impl = registeredTypes[rawType];
      if (undefined === impl) {
          throwBindingError(humanName + " has unknown type " + getTypeName(rawType));
      }
      return impl;
    }
  function __emval_as(handle, returnType, destructorsRef) {
      handle = Emval.toValue(handle);
      returnType = requireRegisteredType(returnType, 'emval::as');
      var destructors = [];
      var rd = Emval.toHandle(destructors);
      HEAPU32[((destructorsRef)>>2)] = rd;
      return returnType['toWireType'](destructors, handle);
    }

  function emval_allocateDestructors(destructorsRef) {
      var destructors = [];
      HEAPU32[((destructorsRef)>>2)] = Emval.toHandle(destructors);
      return destructors;
    }
  
  var emval_symbols = {};
  
  function getStringOrSymbol(address) {
      var symbol = emval_symbols[address];
      if (symbol === undefined) {
        return readLatin1String(address);
      }
      return symbol;
    }
  
  var emval_methodCallers = [];
  
  function __emval_call_method(caller, handle, methodName, destructorsRef, args) {
      caller = emval_methodCallers[caller];
      handle = Emval.toValue(handle);
      methodName = getStringOrSymbol(methodName);
      return caller(handle, methodName, emval_allocateDestructors(destructorsRef), args);
    }

  
  
  
  function __emval_call_void_method(caller, handle, methodName, args) {
      caller = emval_methodCallers[caller];
      handle = Emval.toValue(handle);
      methodName = getStringOrSymbol(methodName);
      caller(handle, methodName, null, args);
    }


  function emval_addMethodCaller(caller) {
      var id = emval_methodCallers.length;
      emval_methodCallers.push(caller);
      return id;
    }
  
  function emval_lookupTypes(argCount, argTypes) {
      var a = new Array(argCount);
      for (var i = 0; i < argCount; ++i) {
        a[i] = requireRegisteredType(HEAPU32[(((argTypes)+(i * 4))>>2)],
                                     "parameter " + i);
      }
      return a;
    }
  
  
  var emval_registeredMethods = [];
  function __emval_get_method_caller(argCount, argTypes) {
      var types = emval_lookupTypes(argCount, argTypes);
      var retType = types[0];
      var signatureName = retType.name + "_$" + types.slice(1).map(function (t) { return t.name; }).join("_") + "$";
      var returnId = emval_registeredMethods[signatureName];
      if (returnId !== undefined) {
        return returnId;
      }
  
      var argN = new Array(argCount - 1);
      var invokerFunction = (handle, name, destructors, args) => {
        var offset = 0;
        for (var i = 0; i < argCount - 1; ++i) {
          argN[i] = types[i + 1]['readValueFromPointer'](args + offset);
          offset += types[i + 1]['argPackAdvance'];
        }
        var rv = handle[name].apply(handle, argN);
        for (var i = 0; i < argCount - 1; ++i) {
          if (types[i + 1].deleteObject) {
            types[i + 1].deleteObject(argN[i]);
          }
        }
        if (!retType.isVoid) {
          return retType['toWireType'](destructors, rv);
        }
      };
      returnId = emval_addMethodCaller(invokerFunction);
      emval_registeredMethods[signatureName] = returnId;
      return returnId;
    }

  function __emval_get_property(handle, key) {
      handle = Emval.toValue(handle);
      key = Emval.toValue(key);
      return Emval.toHandle(handle[key]);
    }

  function __emval_incref(handle) {
      if (handle > 4) {
        emval_handles.get(handle).refcount += 1;
      }
    }

  function __emval_new_array() {
      return Emval.toHandle([]);
    }

  function __emval_new_array_from_memory_view(view) {
      view = Emval.toValue(view);
      // using for..loop is faster than Array.from
      var a = new Array(view.length);
      for (var i = 0; i < view.length; i++) a[i] = view[i];
      return Emval.toHandle(a);
    }

  
  function __emval_new_cstring(v) {
      return Emval.toHandle(getStringOrSymbol(v));
    }

  function __emval_new_object() {
      return Emval.toHandle({});
    }

  
  
  function __emval_run_destructors(handle) {
      var destructors = Emval.toValue(handle);
      runDestructors(destructors);
      __emval_decref(handle);
    }

  function __emval_set_property(handle, key, value) {
      handle = Emval.toValue(handle);
      key = Emval.toValue(key);
      value = Emval.toValue(value);
      handle[key] = value;
    }

  
  function __emval_take_value(type, arg) {
      type = requireRegisteredType(type, '_emval_take_value');
      var v = type['readValueFromPointer'](arg);
      return Emval.toHandle(v);
    }

  function _abort() {
      abort('native code called abort()');
    }

  var readEmAsmArgsArray = [];
  function readEmAsmArgs(sigPtr, buf) {
      // Nobody should have mutated _readEmAsmArgsArray underneath us to be something else than an array.
      assert(Array.isArray(readEmAsmArgsArray));
      // The input buffer is allocated on the stack, so it must be stack-aligned.
      assert(buf % 16 == 0);
      readEmAsmArgsArray.length = 0;
      var ch;
      // Most arguments are i32s, so shift the buffer pointer so it is a plain
      // index into HEAP32.
      buf >>= 2;
      while (ch = HEAPU8[sigPtr++]) {
        var chr = String.fromCharCode(ch);
        var validChars = ['d', 'f', 'i'];
        assert(validChars.includes(chr), 'Invalid character ' + ch + '("' + chr + '") in readEmAsmArgs! Use only [' + validChars + '], and do not specify "v" for void return argument.');
        // Floats are always passed as doubles, and doubles and int64s take up 8
        // bytes (two 32-bit slots) in memory, align reads to these:
        buf += (ch != 105/*i*/) & buf;
        readEmAsmArgsArray.push(
          ch == 105/*i*/ ? HEAP32[buf] :
         HEAPF64[buf++ >> 1]
        );
        ++buf;
      }
      return readEmAsmArgsArray;
    }
  function runEmAsmFunction(code, sigPtr, argbuf) {
      var args = readEmAsmArgs(sigPtr, argbuf);
      if (!ASM_CONSTS.hasOwnProperty(code)) abort('No EM_ASM constant found at address ' + code);
      return ASM_CONSTS[code].apply(null, args);
    }
  function _emscripten_asm_const_int(code, sigPtr, argbuf) {
      return runEmAsmFunction(code, sigPtr, argbuf);
    }

  function _emscripten_memcpy_big(dest, src, num) {
      HEAPU8.copyWithin(dest, src, src + num);
    }

  function getHeapMax() {
      // Stay one Wasm page short of 4GB: while e.g. Chrome is able to allocate
      // full 4GB Wasm memories, the size will wrap back to 0 bytes in Wasm side
      // for any code that deals with heap sizes, which would require special
      // casing all heap size related code to treat 0 specially.
      return 2147483648;
    }
  
  function emscripten_realloc_buffer(size) {
      var b = wasmMemory.buffer;
      try {
        // round size grow request up to wasm page size (fixed 64KB per spec)
        wasmMemory.grow((size - b.byteLength + 65535) >>> 16); // .grow() takes a delta compared to the previous size
        updateMemoryViews();
        return 1 /*success*/;
      } catch(e) {
        err('emscripten_realloc_buffer: Attempted to grow heap from ' + b.byteLength  + ' bytes to ' + size + ' bytes, but got error: ' + e);
      }
      // implicit 0 return to save code size (caller will cast "undefined" into 0
      // anyhow)
    }
  function _emscripten_resize_heap(requestedSize) {
      var oldSize = HEAPU8.length;
      requestedSize = requestedSize >>> 0;
      // With multithreaded builds, races can happen (another thread might increase the size
      // in between), so return a failure, and let the caller retry.
      assert(requestedSize > oldSize);
  
      // Memory resize rules:
      // 1.  Always increase heap size to at least the requested size, rounded up
      //     to next page multiple.
      // 2a. If MEMORY_GROWTH_LINEAR_STEP == -1, excessively resize the heap
      //     geometrically: increase the heap size according to
      //     MEMORY_GROWTH_GEOMETRIC_STEP factor (default +20%), At most
      //     overreserve by MEMORY_GROWTH_GEOMETRIC_CAP bytes (default 96MB).
      // 2b. If MEMORY_GROWTH_LINEAR_STEP != -1, excessively resize the heap
      //     linearly: increase the heap size by at least
      //     MEMORY_GROWTH_LINEAR_STEP bytes.
      // 3.  Max size for the heap is capped at 2048MB-WASM_PAGE_SIZE, or by
      //     MAXIMUM_MEMORY, or by ASAN limit, depending on which is smallest
      // 4.  If we were unable to allocate as much memory, it may be due to
      //     over-eager decision to excessively reserve due to (3) above.
      //     Hence if an allocation fails, cut down on the amount of excess
      //     growth, in an attempt to succeed to perform a smaller allocation.
  
      // A limit is set for how much we can grow. We should not exceed that
      // (the wasm binary specifies it, so if we tried, we'd fail anyhow).
      var maxHeapSize = getHeapMax();
      if (requestedSize > maxHeapSize) {
        err('Cannot enlarge memory, asked to go up to ' + requestedSize + ' bytes, but the limit is ' + maxHeapSize + ' bytes!');
        return false;
      }
  
      let alignUp = (x, multiple) => x + (multiple - x % multiple) % multiple;
  
      // Loop through potential heap size increases. If we attempt a too eager
      // reservation that fails, cut down on the attempted size and reserve a
      // smaller bump instead. (max 3 times, chosen somewhat arbitrarily)
      for (var cutDown = 1; cutDown <= 4; cutDown *= 2) {
        var overGrownHeapSize = oldSize * (1 + 0.2 / cutDown); // ensure geometric growth
        // but limit overreserving (default to capping at +96MB overgrowth at most)
        overGrownHeapSize = Math.min(overGrownHeapSize, requestedSize + 100663296 );
  
        var newSize = Math.min(maxHeapSize, alignUp(Math.max(requestedSize, overGrownHeapSize), 65536));
  
        var replacement = emscripten_realloc_buffer(newSize);
        if (replacement) {
  
          return true;
        }
      }
      err('Failed to grow the heap from ' + oldSize + ' bytes to ' + newSize + ' bytes, not enough memory!');
      return false;
    }

  var ENV = {};
  
  function getExecutableName() {
      return thisProgram || './this.program';
    }
  function getEnvStrings() {
      if (!getEnvStrings.strings) {
        // Default values.
        // Browser language detection #8751
        var lang = ((typeof navigator == 'object' && navigator.languages && navigator.languages[0]) || 'C').replace('-', '_') + '.UTF-8';
        var env = {
          'USER': 'web_user',
          'LOGNAME': 'web_user',
          'PATH': '/',
          'PWD': '/',
          'HOME': '/home/web_user',
          'LANG': lang,
          '_': getExecutableName()
        };
        // Apply the user-provided values, if any.
        for (var x in ENV) {
          // x is a key in ENV; if ENV[x] is undefined, that means it was
          // explicitly set to be so. We allow user code to do that to
          // force variables with default values to remain unset.
          if (ENV[x] === undefined) delete env[x];
          else env[x] = ENV[x];
        }
        var strings = [];
        for (var x in env) {
          strings.push(x + '=' + env[x]);
        }
        getEnvStrings.strings = strings;
      }
      return getEnvStrings.strings;
    }
  
  function stringToAscii(str, buffer) {
      for (var i = 0; i < str.length; ++i) {
        assert(str.charCodeAt(i) === (str.charCodeAt(i) & 0xff));
        HEAP8[((buffer++)>>0)] = str.charCodeAt(i);
      }
      // Null-terminate the string
      HEAP8[((buffer)>>0)] = 0;
    }
  
  function _environ_get(__environ, environ_buf) {
      var bufSize = 0;
      getEnvStrings().forEach(function(string, i) {
        var ptr = environ_buf + bufSize;
        HEAPU32[(((__environ)+(i*4))>>2)] = ptr;
        stringToAscii(string, ptr);
        bufSize += string.length + 1;
      });
      return 0;
    }

  
  function _environ_sizes_get(penviron_count, penviron_buf_size) {
      var strings = getEnvStrings();
      HEAPU32[((penviron_count)>>2)] = strings.length;
      var bufSize = 0;
      strings.forEach(function(string) {
        bufSize += string.length + 1;
      });
      HEAPU32[((penviron_buf_size)>>2)] = bufSize;
      return 0;
    }

  function _fd_close(fd) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.close(stream);
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  function doReadv(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.read(stream, HEAP8,ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (curr < len) break; // nothing more to read
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    }
  
  function _fd_read(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doReadv(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  function convertI32PairToI53Checked(lo, hi) {
      assert(lo == (lo >>> 0) || lo == (lo|0)); // lo should either be a i32 or a u32
      assert(hi === (hi|0));                    // hi should be a i32
      return ((hi + 0x200000) >>> 0 < 0x400001 - !!lo) ? (lo >>> 0) + hi * 4294967296 : NaN;
    }
  
  
  
  
  function _fd_seek(fd, offset_low, offset_high, whence, newOffset) {
  try {
  
      var offset = convertI32PairToI53Checked(offset_low, offset_high); if (isNaN(offset)) return 61;
      var stream = SYSCALLS.getStreamFromFD(fd);
      FS.llseek(stream, offset, whence);
      (tempI64 = [stream.position>>>0,(tempDouble=stream.position,(+(Math.abs(tempDouble))) >= 1.0 ? (tempDouble > 0.0 ? ((Math.min((+(Math.floor((tempDouble)/4294967296.0))), 4294967295.0))|0)>>>0 : (~~((+(Math.ceil((tempDouble - +(((~~(tempDouble)))>>>0))/4294967296.0)))))>>>0) : 0)],HEAP32[((newOffset)>>2)] = tempI64[0],HEAP32[(((newOffset)+(4))>>2)] = tempI64[1]);
      if (stream.getdents && offset === 0 && whence === 0) stream.getdents = null; // reset readdir state
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  /** @param {number=} offset */
  function doWritev(stream, iov, iovcnt, offset) {
      var ret = 0;
      for (var i = 0; i < iovcnt; i++) {
        var ptr = HEAPU32[((iov)>>2)];
        var len = HEAPU32[(((iov)+(4))>>2)];
        iov += 8;
        var curr = FS.write(stream, HEAP8,ptr, len, offset);
        if (curr < 0) return -1;
        ret += curr;
        if (typeof offset !== 'undefined') {
          offset += curr;
        }
      }
      return ret;
    }
  
  function _fd_write(fd, iov, iovcnt, pnum) {
  try {
  
      var stream = SYSCALLS.getStreamFromFD(fd);
      var num = doWritev(stream, iov, iovcnt);
      HEAPU32[((pnum)>>2)] = num;
      return 0;
    } catch (e) {
    if (typeof FS == 'undefined' || !(e.name === 'ErrnoError')) throw e;
    return e.errno;
  }
  }

  function isLeapYear(year) {
        return year%4 === 0 && (year%100 !== 0 || year%400 === 0);
    }
  
  function arraySum(array, index) {
      var sum = 0;
      for (var i = 0; i <= index; sum += array[i++]) {
        // no-op
      }
      return sum;
    }
  
  
  var MONTH_DAYS_LEAP = [31,29,31,30,31,30,31,31,30,31,30,31];
  
  var MONTH_DAYS_REGULAR = [31,28,31,30,31,30,31,31,30,31,30,31];
  function addDays(date, days) {
      var newDate = new Date(date.getTime());
      while (days > 0) {
        var leap = isLeapYear(newDate.getFullYear());
        var currentMonth = newDate.getMonth();
        var daysInCurrentMonth = (leap ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR)[currentMonth];
  
        if (days > daysInCurrentMonth-newDate.getDate()) {
          // we spill over to next month
          days -= (daysInCurrentMonth-newDate.getDate()+1);
          newDate.setDate(1);
          if (currentMonth < 11) {
            newDate.setMonth(currentMonth+1);
          } else {
            newDate.setMonth(0);
            newDate.setFullYear(newDate.getFullYear()+1);
          }
        } else {
          // we stay in current month
          newDate.setDate(newDate.getDate()+days);
          return newDate;
        }
      }
  
      return newDate;
    }
  
  
  
  
  function writeArrayToMemory(array, buffer) {
      assert(array.length >= 0, 'writeArrayToMemory array must have a length (should be an array or typed array)');
      HEAP8.set(array, buffer);
    }
  
  function _strftime(s, maxsize, format, tm) {
      // size_t strftime(char *restrict s, size_t maxsize, const char *restrict format, const struct tm *restrict timeptr);
      // http://pubs.opengroup.org/onlinepubs/009695399/functions/strftime.html
  
      var tm_zone = HEAP32[(((tm)+(40))>>2)];
  
      var date = {
        tm_sec: HEAP32[((tm)>>2)],
        tm_min: HEAP32[(((tm)+(4))>>2)],
        tm_hour: HEAP32[(((tm)+(8))>>2)],
        tm_mday: HEAP32[(((tm)+(12))>>2)],
        tm_mon: HEAP32[(((tm)+(16))>>2)],
        tm_year: HEAP32[(((tm)+(20))>>2)],
        tm_wday: HEAP32[(((tm)+(24))>>2)],
        tm_yday: HEAP32[(((tm)+(28))>>2)],
        tm_isdst: HEAP32[(((tm)+(32))>>2)],
        tm_gmtoff: HEAP32[(((tm)+(36))>>2)],
        tm_zone: tm_zone ? UTF8ToString(tm_zone) : ''
      };
  
      var pattern = UTF8ToString(format);
  
      // expand format
      var EXPANSION_RULES_1 = {
        '%c': '%a %b %d %H:%M:%S %Y',     // Replaced by the locale's appropriate date and time representation - e.g., Mon Aug  3 14:02:01 2013
        '%D': '%m/%d/%y',                 // Equivalent to %m / %d / %y
        '%F': '%Y-%m-%d',                 // Equivalent to %Y - %m - %d
        '%h': '%b',                       // Equivalent to %b
        '%r': '%I:%M:%S %p',              // Replaced by the time in a.m. and p.m. notation
        '%R': '%H:%M',                    // Replaced by the time in 24-hour notation
        '%T': '%H:%M:%S',                 // Replaced by the time
        '%x': '%m/%d/%y',                 // Replaced by the locale's appropriate date representation
        '%X': '%H:%M:%S',                 // Replaced by the locale's appropriate time representation
        // Modified Conversion Specifiers
        '%Ec': '%c',                      // Replaced by the locale's alternative appropriate date and time representation.
        '%EC': '%C',                      // Replaced by the name of the base year (period) in the locale's alternative representation.
        '%Ex': '%m/%d/%y',                // Replaced by the locale's alternative date representation.
        '%EX': '%H:%M:%S',                // Replaced by the locale's alternative time representation.
        '%Ey': '%y',                      // Replaced by the offset from %EC (year only) in the locale's alternative representation.
        '%EY': '%Y',                      // Replaced by the full alternative year representation.
        '%Od': '%d',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading zeros if there is any alternative symbol for zero; otherwise, with leading <space> characters.
        '%Oe': '%e',                      // Replaced by the day of the month, using the locale's alternative numeric symbols, filled as needed with leading <space> characters.
        '%OH': '%H',                      // Replaced by the hour (24-hour clock) using the locale's alternative numeric symbols.
        '%OI': '%I',                      // Replaced by the hour (12-hour clock) using the locale's alternative numeric symbols.
        '%Om': '%m',                      // Replaced by the month using the locale's alternative numeric symbols.
        '%OM': '%M',                      // Replaced by the minutes using the locale's alternative numeric symbols.
        '%OS': '%S',                      // Replaced by the seconds using the locale's alternative numeric symbols.
        '%Ou': '%u',                      // Replaced by the weekday as a number in the locale's alternative representation (Monday=1).
        '%OU': '%U',                      // Replaced by the week number of the year (Sunday as the first day of the week, rules corresponding to %U ) using the locale's alternative numeric symbols.
        '%OV': '%V',                      // Replaced by the week number of the year (Monday as the first day of the week, rules corresponding to %V ) using the locale's alternative numeric symbols.
        '%Ow': '%w',                      // Replaced by the number of the weekday (Sunday=0) using the locale's alternative numeric symbols.
        '%OW': '%W',                      // Replaced by the week number of the year (Monday as the first day of the week) using the locale's alternative numeric symbols.
        '%Oy': '%y',                      // Replaced by the year (offset from %C ) using the locale's alternative numeric symbols.
      };
      for (var rule in EXPANSION_RULES_1) {
        pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_1[rule]);
      }
  
      var WEEKDAYS = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      var MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  
      function leadingSomething(value, digits, character) {
        var str = typeof value == 'number' ? value.toString() : (value || '');
        while (str.length < digits) {
          str = character[0]+str;
        }
        return str;
      }
  
      function leadingNulls(value, digits) {
        return leadingSomething(value, digits, '0');
      }
  
      function compareByDay(date1, date2) {
        function sgn(value) {
          return value < 0 ? -1 : (value > 0 ? 1 : 0);
        }
  
        var compare;
        if ((compare = sgn(date1.getFullYear()-date2.getFullYear())) === 0) {
          if ((compare = sgn(date1.getMonth()-date2.getMonth())) === 0) {
            compare = sgn(date1.getDate()-date2.getDate());
          }
        }
        return compare;
      }
  
      function getFirstWeekStartDate(janFourth) {
          switch (janFourth.getDay()) {
            case 0: // Sunday
              return new Date(janFourth.getFullYear()-1, 11, 29);
            case 1: // Monday
              return janFourth;
            case 2: // Tuesday
              return new Date(janFourth.getFullYear(), 0, 3);
            case 3: // Wednesday
              return new Date(janFourth.getFullYear(), 0, 2);
            case 4: // Thursday
              return new Date(janFourth.getFullYear(), 0, 1);
            case 5: // Friday
              return new Date(janFourth.getFullYear()-1, 11, 31);
            case 6: // Saturday
              return new Date(janFourth.getFullYear()-1, 11, 30);
          }
      }
  
      function getWeekBasedYear(date) {
          var thisDate = addDays(new Date(date.tm_year+1900, 0, 1), date.tm_yday);
  
          var janFourthThisYear = new Date(thisDate.getFullYear(), 0, 4);
          var janFourthNextYear = new Date(thisDate.getFullYear()+1, 0, 4);
  
          var firstWeekStartThisYear = getFirstWeekStartDate(janFourthThisYear);
          var firstWeekStartNextYear = getFirstWeekStartDate(janFourthNextYear);
  
          if (compareByDay(firstWeekStartThisYear, thisDate) <= 0) {
            // this date is after the start of the first week of this year
            if (compareByDay(firstWeekStartNextYear, thisDate) <= 0) {
              return thisDate.getFullYear()+1;
            }
            return thisDate.getFullYear();
          }
          return thisDate.getFullYear()-1;
      }
  
      var EXPANSION_RULES_2 = {
        '%a': function(date) {
          return WEEKDAYS[date.tm_wday].substring(0,3);
        },
        '%A': function(date) {
          return WEEKDAYS[date.tm_wday];
        },
        '%b': function(date) {
          return MONTHS[date.tm_mon].substring(0,3);
        },
        '%B': function(date) {
          return MONTHS[date.tm_mon];
        },
        '%C': function(date) {
          var year = date.tm_year+1900;
          return leadingNulls((year/100)|0,2);
        },
        '%d': function(date) {
          return leadingNulls(date.tm_mday, 2);
        },
        '%e': function(date) {
          return leadingSomething(date.tm_mday, 2, ' ');
        },
        '%g': function(date) {
          // %g, %G, and %V give values according to the ISO 8601:2000 standard week-based year.
          // In this system, weeks begin on a Monday and week 1 of the year is the week that includes
          // January 4th, which is also the week that includes the first Thursday of the year, and
          // is also the first week that contains at least four days in the year.
          // If the first Monday of January is the 2nd, 3rd, or 4th, the preceding days are part of
          // the last week of the preceding year; thus, for Saturday 2nd January 1999,
          // %G is replaced by 1998 and %V is replaced by 53. If December 29th, 30th,
          // or 31st is a Monday, it and any following days are part of week 1 of the following year.
          // Thus, for Tuesday 30th December 1997, %G is replaced by 1998 and %V is replaced by 01.
  
          return getWeekBasedYear(date).toString().substring(2);
        },
        '%G': function(date) {
          return getWeekBasedYear(date);
        },
        '%H': function(date) {
          return leadingNulls(date.tm_hour, 2);
        },
        '%I': function(date) {
          var twelveHour = date.tm_hour;
          if (twelveHour == 0) twelveHour = 12;
          else if (twelveHour > 12) twelveHour -= 12;
          return leadingNulls(twelveHour, 2);
        },
        '%j': function(date) {
          // Day of the year (001-366)
          return leadingNulls(date.tm_mday + arraySum(isLeapYear(date.tm_year+1900) ? MONTH_DAYS_LEAP : MONTH_DAYS_REGULAR, date.tm_mon-1), 3);
        },
        '%m': function(date) {
          return leadingNulls(date.tm_mon+1, 2);
        },
        '%M': function(date) {
          return leadingNulls(date.tm_min, 2);
        },
        '%n': function() {
          return '\n';
        },
        '%p': function(date) {
          if (date.tm_hour >= 0 && date.tm_hour < 12) {
            return 'AM';
          }
          return 'PM';
        },
        '%S': function(date) {
          return leadingNulls(date.tm_sec, 2);
        },
        '%t': function() {
          return '\t';
        },
        '%u': function(date) {
          return date.tm_wday || 7;
        },
        '%U': function(date) {
          var days = date.tm_yday + 7 - date.tm_wday;
          return leadingNulls(Math.floor(days / 7), 2);
        },
        '%V': function(date) {
          // Replaced by the week number of the year (Monday as the first day of the week)
          // as a decimal number [01,53]. If the week containing 1 January has four
          // or more days in the new year, then it is considered week 1.
          // Otherwise, it is the last week of the previous year, and the next week is week 1.
          // Both January 4th and the first Thursday of January are always in week 1. [ tm_year, tm_wday, tm_yday]
          var val = Math.floor((date.tm_yday + 7 - (date.tm_wday + 6) % 7 ) / 7);
          // If 1 Jan is just 1-3 days past Monday, the previous week
          // is also in this year.
          if ((date.tm_wday + 371 - date.tm_yday - 2) % 7 <= 2) {
            val++;
          }
          if (!val) {
            val = 52;
            // If 31 December of prev year a Thursday, or Friday of a
            // leap year, then the prev year has 53 weeks.
            var dec31 = (date.tm_wday + 7 - date.tm_yday - 1) % 7;
            if (dec31 == 4 || (dec31 == 5 && isLeapYear(date.tm_year%400-1))) {
              val++;
            }
          } else if (val == 53) {
            // If 1 January is not a Thursday, and not a Wednesday of a
            // leap year, then this year has only 52 weeks.
            var jan1 = (date.tm_wday + 371 - date.tm_yday) % 7;
            if (jan1 != 4 && (jan1 != 3 || !isLeapYear(date.tm_year)))
              val = 1;
          }
          return leadingNulls(val, 2);
        },
        '%w': function(date) {
          return date.tm_wday;
        },
        '%W': function(date) {
          var days = date.tm_yday + 7 - ((date.tm_wday + 6) % 7);
          return leadingNulls(Math.floor(days / 7), 2);
        },
        '%y': function(date) {
          // Replaced by the last two digits of the year as a decimal number [00,99]. [ tm_year]
          return (date.tm_year+1900).toString().substring(2);
        },
        '%Y': function(date) {
          // Replaced by the year as a decimal number (for example, 1997). [ tm_year]
          return date.tm_year+1900;
        },
        '%z': function(date) {
          // Replaced by the offset from UTC in the ISO 8601:2000 standard format ( +hhmm or -hhmm ).
          // For example, "-0430" means 4 hours 30 minutes behind UTC (west of Greenwich).
          var off = date.tm_gmtoff;
          var ahead = off >= 0;
          off = Math.abs(off) / 60;
          // convert from minutes into hhmm format (which means 60 minutes = 100 units)
          off = (off / 60)*100 + (off % 60);
          return (ahead ? '+' : '-') + String("0000" + off).slice(-4);
        },
        '%Z': function(date) {
          return date.tm_zone;
        },
        '%%': function() {
          return '%';
        }
      };
  
      // Replace %% with a pair of NULLs (which cannot occur in a C string), then
      // re-inject them after processing.
      pattern = pattern.replace(/%%/g, '\0\0');
      for (var rule in EXPANSION_RULES_2) {
        if (pattern.includes(rule)) {
          pattern = pattern.replace(new RegExp(rule, 'g'), EXPANSION_RULES_2[rule](date));
        }
      }
      pattern = pattern.replace(/\0\0/g, '%');
  
      var bytes = intArrayFromString(pattern, false);
      if (bytes.length > maxsize) {
        return 0;
      }
  
      writeArrayToMemory(bytes, s);
      return bytes.length-1;
    }
  function _strftime_l(s, maxsize, format, tm, loc) {
      return _strftime(s, maxsize, format, tm); // no locale support yet
    }


  var FSNode = /** @constructor */ function(parent, name, mode, rdev) {
    if (!parent) {
      parent = this;  // root node sets parent to itself
    }
    this.parent = parent;
    this.mount = parent.mount;
    this.mounted = null;
    this.id = FS.nextInode++;
    this.name = name;
    this.mode = mode;
    this.node_ops = {};
    this.stream_ops = {};
    this.rdev = rdev;
  };
  var readMode = 292/*292*/ | 73/*73*/;
  var writeMode = 146/*146*/;
  Object.defineProperties(FSNode.prototype, {
   read: {
    get: /** @this{FSNode} */function() {
     return (this.mode & readMode) === readMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= readMode : this.mode &= ~readMode;
    }
   },
   write: {
    get: /** @this{FSNode} */function() {
     return (this.mode & writeMode) === writeMode;
    },
    set: /** @this{FSNode} */function(val) {
     val ? this.mode |= writeMode : this.mode &= ~writeMode;
    }
   },
   isFolder: {
    get: /** @this{FSNode} */function() {
     return FS.isDir(this.mode);
    }
   },
   isDevice: {
    get: /** @this{FSNode} */function() {
     return FS.isChrdev(this.mode);
    }
   }
  });
  FS.FSNode = FSNode;
  FS.staticInit();Module["FS_createPath"] = FS.createPath;Module["FS_createDataFile"] = FS.createDataFile;Module["FS_createPreloadedFile"] = FS.createPreloadedFile;Module["FS_unlink"] = FS.unlink;Module["FS_createLazyFile"] = FS.createLazyFile;Module["FS_createDevice"] = FS.createDevice;ERRNO_CODES = {
      'EPERM': 63,
      'ENOENT': 44,
      'ESRCH': 71,
      'EINTR': 27,
      'EIO': 29,
      'ENXIO': 60,
      'E2BIG': 1,
      'ENOEXEC': 45,
      'EBADF': 8,
      'ECHILD': 12,
      'EAGAIN': 6,
      'EWOULDBLOCK': 6,
      'ENOMEM': 48,
      'EACCES': 2,
      'EFAULT': 21,
      'ENOTBLK': 105,
      'EBUSY': 10,
      'EEXIST': 20,
      'EXDEV': 75,
      'ENODEV': 43,
      'ENOTDIR': 54,
      'EISDIR': 31,
      'EINVAL': 28,
      'ENFILE': 41,
      'EMFILE': 33,
      'ENOTTY': 59,
      'ETXTBSY': 74,
      'EFBIG': 22,
      'ENOSPC': 51,
      'ESPIPE': 70,
      'EROFS': 69,
      'EMLINK': 34,
      'EPIPE': 64,
      'EDOM': 18,
      'ERANGE': 68,
      'ENOMSG': 49,
      'EIDRM': 24,
      'ECHRNG': 106,
      'EL2NSYNC': 156,
      'EL3HLT': 107,
      'EL3RST': 108,
      'ELNRNG': 109,
      'EUNATCH': 110,
      'ENOCSI': 111,
      'EL2HLT': 112,
      'EDEADLK': 16,
      'ENOLCK': 46,
      'EBADE': 113,
      'EBADR': 114,
      'EXFULL': 115,
      'ENOANO': 104,
      'EBADRQC': 103,
      'EBADSLT': 102,
      'EDEADLOCK': 16,
      'EBFONT': 101,
      'ENOSTR': 100,
      'ENODATA': 116,
      'ETIME': 117,
      'ENOSR': 118,
      'ENONET': 119,
      'ENOPKG': 120,
      'EREMOTE': 121,
      'ENOLINK': 47,
      'EADV': 122,
      'ESRMNT': 123,
      'ECOMM': 124,
      'EPROTO': 65,
      'EMULTIHOP': 36,
      'EDOTDOT': 125,
      'EBADMSG': 9,
      'ENOTUNIQ': 126,
      'EBADFD': 127,
      'EREMCHG': 128,
      'ELIBACC': 129,
      'ELIBBAD': 130,
      'ELIBSCN': 131,
      'ELIBMAX': 132,
      'ELIBEXEC': 133,
      'ENOSYS': 52,
      'ENOTEMPTY': 55,
      'ENAMETOOLONG': 37,
      'ELOOP': 32,
      'EOPNOTSUPP': 138,
      'EPFNOSUPPORT': 139,
      'ECONNRESET': 15,
      'ENOBUFS': 42,
      'EAFNOSUPPORT': 5,
      'EPROTOTYPE': 67,
      'ENOTSOCK': 57,
      'ENOPROTOOPT': 50,
      'ESHUTDOWN': 140,
      'ECONNREFUSED': 14,
      'EADDRINUSE': 3,
      'ECONNABORTED': 13,
      'ENETUNREACH': 40,
      'ENETDOWN': 38,
      'ETIMEDOUT': 73,
      'EHOSTDOWN': 142,
      'EHOSTUNREACH': 23,
      'EINPROGRESS': 26,
      'EALREADY': 7,
      'EDESTADDRREQ': 17,
      'EMSGSIZE': 35,
      'EPROTONOSUPPORT': 66,
      'ESOCKTNOSUPPORT': 137,
      'EADDRNOTAVAIL': 4,
      'ENETRESET': 39,
      'EISCONN': 30,
      'ENOTCONN': 53,
      'ETOOMANYREFS': 141,
      'EUSERS': 136,
      'EDQUOT': 19,
      'ESTALE': 72,
      'ENOTSUP': 138,
      'ENOMEDIUM': 148,
      'EILSEQ': 25,
      'EOVERFLOW': 61,
      'ECANCELED': 11,
      'ENOTRECOVERABLE': 56,
      'EOWNERDEAD': 62,
      'ESTRPIPE': 135,
    };embind_init_charCodes();
BindingError = Module['BindingError'] = extendError(Error, 'BindingError');InternalError = Module['InternalError'] = extendError(Error, 'InternalError');init_ClassHandle();
init_embind();init_RegisteredPointer();
UnboundTypeError = Module['UnboundTypeError'] = extendError(Error, 'UnboundTypeError');init_emval();// include: base64Utils.js
// Copied from https://github.com/strophe/strophejs/blob/e06d027/src/polyfills.js#L149

// This code was written by Tyler Akins and has been placed in the
// public domain.  It would be nice if you left this header intact.
// Base64 code from Tyler Akins -- http://rumkin.com

/**
 * Decodes a base64 string.
 * @param {string} input The string to decode.
 */
var decodeBase64 = typeof atob == 'function' ? atob : function (input) {
  var keyStr = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

  var output = '';
  var chr1, chr2, chr3;
  var enc1, enc2, enc3, enc4;
  var i = 0;
  // remove all characters that are not A-Z, a-z, 0-9, +, /, or =
  input = input.replace(/[^A-Za-z0-9\+\/\=]/g, '');
  do {
    enc1 = keyStr.indexOf(input.charAt(i++));
    enc2 = keyStr.indexOf(input.charAt(i++));
    enc3 = keyStr.indexOf(input.charAt(i++));
    enc4 = keyStr.indexOf(input.charAt(i++));

    chr1 = (enc1 << 2) | (enc2 >> 4);
    chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
    chr3 = ((enc3 & 3) << 6) | enc4;

    output = output + String.fromCharCode(chr1);

    if (enc3 !== 64) {
      output = output + String.fromCharCode(chr2);
    }
    if (enc4 !== 64) {
      output = output + String.fromCharCode(chr3);
    }
  } while (i < input.length);
  return output;
};

// Converts a string of base64 into a byte array.
// Throws error on invalid input.
function intArrayFromBase64(s) {

  try {
    var decoded = decodeBase64(s);
    var bytes = new Uint8Array(decoded.length);
    for (var i = 0 ; i < decoded.length ; ++i) {
      bytes[i] = decoded.charCodeAt(i);
    }
    return bytes;
  } catch (_) {
    throw new Error('Converting base64 string to bytes failed.');
  }
}

// If filename is a base64 data URI, parses and returns data (Buffer on node,
// Uint8Array otherwise). If filename is not a base64 data URI, returns undefined.
function tryParseAsDataURI(filename) {
  if (!isDataURI(filename)) {
    return;
  }

  return intArrayFromBase64(filename.slice(dataURIPrefix.length));
}


// end include: base64Utils.js
function checkIncomingModuleAPI() {
  ignoredModuleProp('fetchSettings');
}
var wasmImports = {
  "__assert_fail": ___assert_fail,
  "__syscall_fcntl64": ___syscall_fcntl64,
  "__syscall_ioctl": ___syscall_ioctl,
  "__syscall_openat": ___syscall_openat,
  "__throw_exception_with_stack_trace": ___throw_exception_with_stack_trace,
  "_embind_register_bigint": __embind_register_bigint,
  "_embind_register_bool": __embind_register_bool,
  "_embind_register_class": __embind_register_class,
  "_embind_register_class_class_function": __embind_register_class_class_function,
  "_embind_register_class_constructor": __embind_register_class_constructor,
  "_embind_register_class_function": __embind_register_class_function,
  "_embind_register_emval": __embind_register_emval,
  "_embind_register_float": __embind_register_float,
  "_embind_register_function": __embind_register_function,
  "_embind_register_integer": __embind_register_integer,
  "_embind_register_memory_view": __embind_register_memory_view,
  "_embind_register_std_string": __embind_register_std_string,
  "_embind_register_std_wstring": __embind_register_std_wstring,
  "_embind_register_void": __embind_register_void,
  "_emval_as": __emval_as,
  "_emval_call_method": __emval_call_method,
  "_emval_call_void_method": __emval_call_void_method,
  "_emval_decref": __emval_decref,
  "_emval_get_method_caller": __emval_get_method_caller,
  "_emval_get_property": __emval_get_property,
  "_emval_incref": __emval_incref,
  "_emval_new_array": __emval_new_array,
  "_emval_new_array_from_memory_view": __emval_new_array_from_memory_view,
  "_emval_new_cstring": __emval_new_cstring,
  "_emval_new_object": __emval_new_object,
  "_emval_run_destructors": __emval_run_destructors,
  "_emval_set_property": __emval_set_property,
  "_emval_take_value": __emval_take_value,
  "abort": _abort,
  "emscripten_asm_const_int": _emscripten_asm_const_int,
  "emscripten_memcpy_big": _emscripten_memcpy_big,
  "emscripten_resize_heap": _emscripten_resize_heap,
  "environ_get": _environ_get,
  "environ_sizes_get": _environ_sizes_get,
  "fd_close": _fd_close,
  "fd_read": _fd_read,
  "fd_seek": _fd_seek,
  "fd_write": _fd_write,
  "strftime_l": _strftime_l
};
createWasm();
/** @type {function(...*):?} */
var _malloc = createExportWrapper("malloc");
/** @type {function(...*):?} */
var _free = Module["_free"] = createExportWrapper("free");
/** @type {function(...*):?} */
var ___getTypeName = Module["___getTypeName"] = createExportWrapper("__getTypeName");
/** @type {function(...*):?} */
Module["__embind_initialize_bindings"] = createExportWrapper("_embind_initialize_bindings");
/** @type {function(...*):?} */
var ___errno_location = createExportWrapper("__errno_location");
/** @type {function(...*):?} */
var _fflush = Module["_fflush"] = createExportWrapper("fflush");
/** @type {function(...*):?} */
var ___trap = function() {
  return (___trap = Module["asm"]["__trap"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_init = function() {
  return (_emscripten_stack_init = Module["asm"]["emscripten_stack_init"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var _emscripten_stack_get_end = function() {
  return (_emscripten_stack_get_end = Module["asm"]["emscripten_stack_get_end"]).apply(null, arguments);
};

/** @type {function(...*):?} */
var stackSave = createExportWrapper("stackSave");
/** @type {function(...*):?} */
var stackRestore = createExportWrapper("stackRestore");
/** @type {function(...*):?} */
var stackAlloc = createExportWrapper("stackAlloc");

/** @type {function(...*):?} */
Module["___cxa_decrement_exception_refcount"] = createExportWrapper("__cxa_decrement_exception_refcount");
/** @type {function(...*):?} */
Module["___cxa_increment_exception_refcount"] = createExportWrapper("__cxa_increment_exception_refcount");
/** @type {function(...*):?} */
var ___cxa_demangle = createExportWrapper("__cxa_demangle");
/** @type {function(...*):?} */
var ___thrown_object_from_unwind_exception = Module["___thrown_object_from_unwind_exception"] = createExportWrapper("__thrown_object_from_unwind_exception");
/** @type {function(...*):?} */
var ___get_exception_message = Module["___get_exception_message"] = createExportWrapper("__get_exception_message");
/** @type {function(...*):?} */
Module["dynCall_jiji"] = createExportWrapper("dynCall_jiji");
/** @type {function(...*):?} */
Module["dynCall_viijii"] = createExportWrapper("dynCall_viijii");
/** @type {function(...*):?} */
Module["dynCall_iiiiij"] = createExportWrapper("dynCall_iiiiij");
/** @type {function(...*):?} */
Module["dynCall_iiiiijj"] = createExportWrapper("dynCall_iiiiijj");
/** @type {function(...*):?} */
Module["dynCall_iiiiiijj"] = createExportWrapper("dynCall_iiiiiijj");


// include: postamble.js
// === Auto-generated postamble setup entry stuff ===

Module["addRunDependency"] = addRunDependency;
Module["removeRunDependency"] = removeRunDependency;
Module["FS_createPath"] = FS.createPath;
Module["FS_createDataFile"] = FS.createDataFile;
Module["FS_createPreloadedFile"] = FS.createPreloadedFile;
Module["FS_createLazyFile"] = FS.createLazyFile;
Module["FS_createDevice"] = FS.createDevice;
Module["FS_unlink"] = FS.unlink;
var missingLibrarySymbols = [
  'exitJS',
  'ydayFromDate',
  'inetPton4',
  'inetNtop4',
  'inetPton6',
  'inetNtop6',
  'readSockaddr',
  'writeSockaddr',
  'getHostByName',
  'traverseStack',
  'getCallstack',
  'emscriptenLog',
  'convertPCtoSourceLocation',
  'runMainThreadEmAsm',
  'jstoi_q',
  'jstoi_s',
  'listenOnce',
  'autoResumeAudioContext',
  'handleException',
  'runtimeKeepalivePush',
  'runtimeKeepalivePop',
  'callUserCallback',
  'maybeExit',
  'safeSetTimeout',
  'asmjsMangle',
  'getNativeTypeSize',
  'STACK_SIZE',
  'STACK_ALIGN',
  'POINTER_SIZE',
  'ASSERTIONS',
  'writeI53ToI64',
  'writeI53ToI64Clamped',
  'writeI53ToI64Signaling',
  'writeI53ToU64Clamped',
  'writeI53ToU64Signaling',
  'readI53FromI64',
  'readI53FromU64',
  'convertI32PairToI53',
  'convertU32PairToI53',
  'getCFunc',
  'ccall',
  'cwrap',
  'uleb128Encode',
  'sigToWasmTypes',
  'generateFuncType',
  'convertJsFunctionToWasm',
  'getEmptyTableSlot',
  'updateTableMap',
  'getFunctionAddress',
  'addFunction',
  'removeFunction',
  'reallyNegative',
  'unSign',
  'strLen',
  'reSign',
  'formatString',
  'AsciiToString',
  'stringToNewUTF8',
  'getSocketFromFD',
  'getSocketAddress',
  'registerKeyEventCallback',
  'maybeCStringToJsString',
  'findEventTarget',
  'findCanvasEventTarget',
  'getBoundingClientRect',
  'fillMouseEventData',
  'registerMouseEventCallback',
  'registerWheelEventCallback',
  'registerUiEventCallback',
  'registerFocusEventCallback',
  'fillDeviceOrientationEventData',
  'registerDeviceOrientationEventCallback',
  'fillDeviceMotionEventData',
  'registerDeviceMotionEventCallback',
  'screenOrientation',
  'fillOrientationChangeEventData',
  'registerOrientationChangeEventCallback',
  'fillFullscreenChangeEventData',
  'registerFullscreenChangeEventCallback',
  'JSEvents_requestFullscreen',
  'JSEvents_resizeCanvasForFullscreen',
  'registerRestoreOldStyle',
  'hideEverythingExceptGivenElement',
  'restoreHiddenElements',
  'setLetterbox',
  'softFullscreenResizeWebGLRenderTarget',
  'doRequestFullscreen',
  'fillPointerlockChangeEventData',
  'registerPointerlockChangeEventCallback',
  'registerPointerlockErrorEventCallback',
  'requestPointerLock',
  'fillVisibilityChangeEventData',
  'registerVisibilityChangeEventCallback',
  'registerTouchEventCallback',
  'fillGamepadEventData',
  'registerGamepadEventCallback',
  'registerBeforeUnloadEventCallback',
  'fillBatteryEventData',
  'battery',
  'registerBatteryEventCallback',
  'setCanvasElementSize',
  'getCanvasElementSize',
  'checkWasiClock',
  'wasiRightsToMuslOFlags',
  'wasiOFlagsToMuslOFlags',
  'createDyncallWrapper',
  'setImmediateWrapped',
  'clearImmediateWrapped',
  'polyfillSetImmediate',
  'getPromise',
  'makePromise',
  'makePromiseCallback',
  'setMainLoop',
  '_setNetworkCallback',
  'heapObjectForWebGLType',
  'heapAccessShiftForWebGLHeap',
  'webgl_enable_ANGLE_instanced_arrays',
  'webgl_enable_OES_vertex_array_object',
  'webgl_enable_WEBGL_draw_buffers',
  'webgl_enable_WEBGL_multi_draw',
  'emscriptenWebGLGet',
  'computeUnpackAlignedImageSize',
  'colorChannelsInGlTextureFormat',
  'emscriptenWebGLGetTexPixelData',
  '__glGenObject',
  'emscriptenWebGLGetUniform',
  'webglGetUniformLocation',
  'webglPrepareUniformLocationsBeforeFirstUse',
  'webglGetLeftBracePos',
  'emscriptenWebGLGetVertexAttrib',
  '__glGetActiveAttribOrUniform',
  'writeGLArray',
  'registerWebGlEventCallback',
  'runAndAbortIfError',
  'SDL_unicode',
  'SDL_ttfContext',
  'SDL_audio',
  'GLFW_Window',
  'ALLOC_NORMAL',
  'ALLOC_STACK',
  'allocate',
  'writeStringToMemory',
  'writeAsciiToMemory',
  'registerInheritedInstance',
  'unregisterInheritedInstance',
  'enumReadValueFromPointer',
  'validateThis',
  'craftEmvalAllocator',
  'emval_get_global',
];
missingLibrarySymbols.forEach(missingLibrarySymbol);

var unexportedSymbols = [
  'run',
  'addOnPreRun',
  'addOnInit',
  'addOnPreMain',
  'addOnExit',
  'addOnPostRun',
  'FS_createFolder',
  'FS_createLink',
  'out',
  'err',
  'callMain',
  'abort',
  'keepRuntimeAlive',
  'wasmMemory',
  'stackAlloc',
  'stackSave',
  'stackRestore',
  'getTempRet0',
  'setTempRet0',
  'writeStackCookie',
  'checkStackCookie',
  'intArrayFromBase64',
  'tryParseAsDataURI',
  'ptrToString',
  'zeroMemory',
  'getHeapMax',
  'emscripten_realloc_buffer',
  'ENV',
  'MONTH_DAYS_REGULAR',
  'MONTH_DAYS_LEAP',
  'MONTH_DAYS_REGULAR_CUMULATIVE',
  'MONTH_DAYS_LEAP_CUMULATIVE',
  'isLeapYear',
  'arraySum',
  'addDays',
  'ERRNO_CODES',
  'ERRNO_MESSAGES',
  'setErrNo',
  'DNS',
  'Protocols',
  'Sockets',
  'initRandomFill',
  'randomFill',
  'timers',
  'warnOnce',
  'UNWIND_CACHE',
  'readEmAsmArgsArray',
  'readEmAsmArgs',
  'runEmAsmFunction',
  'getExecutableName',
  'dynCallLegacy',
  'getDynCaller',
  'dynCall',
  'asyncLoad',
  'alignMemory',
  'mmapAlloc',
  'HandleAllocator',
  'convertI32PairToI53Checked',
  'freeTableIndexes',
  'functionsInTableMap',
  'setValue',
  'getValue',
  'PATH',
  'PATH_FS',
  'UTF8Decoder',
  'UTF8ArrayToString',
  'UTF8ToString',
  'stringToUTF8Array',
  'stringToUTF8',
  'lengthBytesUTF8',
  'intArrayFromString',
  'intArrayToString',
  'stringToAscii',
  'UTF16Decoder',
  'UTF16ToString',
  'stringToUTF16',
  'lengthBytesUTF16',
  'UTF32ToString',
  'stringToUTF32',
  'lengthBytesUTF32',
  'stringToUTF8OnStack',
  'writeArrayToMemory',
  'SYSCALLS',
  'JSEvents',
  'specialHTMLTargets',
  'currentFullscreenStrategy',
  'restoreOldWindowedStyle',
  'demangle',
  'demangleAll',
  'jsStackTrace',
  'stackTrace',
  'ExitStatus',
  'getEnvStrings',
  'doReadv',
  'doWritev',
  'dlopenMissingError',
  'promiseMap',
  'getExceptionMessageCommon',
  'getCppExceptionTag',
  'getCppExceptionThrownObjectFromWebAssemblyException',
  'incrementExceptionRefcount',
  'decrementExceptionRefcount',
  'getExceptionMessage',
  'Browser',
  'wget',
  'FS',
  'MEMFS',
  'TTY',
  'PIPEFS',
  'SOCKFS',
  'tempFixedLengthArray',
  'miniTempWebGLFloatBuffers',
  'miniTempWebGLIntBuffers',
  'GL',
  'emscripten_webgl_power_preferences',
  'AL',
  'GLUT',
  'EGL',
  'GLEW',
  'IDBStore',
  'SDL',
  'SDL_gfx',
  'GLFW',
  'allocateUTF8',
  'allocateUTF8OnStack',
  'InternalError',
  'BindingError',
  'UnboundTypeError',
  'PureVirtualError',
  'init_embind',
  'throwInternalError',
  'throwBindingError',
  'throwUnboundTypeError',
  'ensureOverloadTable',
  'exposePublicSymbol',
  'replacePublicSymbol',
  'extendError',
  'createNamedFunction',
  'embindRepr',
  'registeredInstances',
  'getBasestPointer',
  'getInheritedInstance',
  'getInheritedInstanceCount',
  'getLiveInheritedInstances',
  'registeredTypes',
  'awaitingDependencies',
  'typeDependencies',
  'registeredPointers',
  'registerType',
  'whenDependentTypesAreResolved',
  'embind_charCodes',
  'embind_init_charCodes',
  'readLatin1String',
  'getTypeName',
  'heap32VectorToArray',
  'requireRegisteredType',
  'getShiftFromSize',
  'integerReadValueFromPointer',
  'floatReadValueFromPointer',
  'simpleReadValueFromPointer',
  'runDestructors',
  'craftInvokerFunction',
  'embind__requireFunction',
  'tupleRegistrations',
  'structRegistrations',
  'genericPointerToWireType',
  'constNoSmartPtrRawPointerToWireType',
  'nonConstNoSmartPtrRawPointerToWireType',
  'init_RegisteredPointer',
  'RegisteredPointer',
  'RegisteredPointer_getPointee',
  'RegisteredPointer_destructor',
  'RegisteredPointer_deleteObject',
  'RegisteredPointer_fromWireType',
  'runDestructor',
  'releaseClassHandle',
  'finalizationRegistry',
  'detachFinalizer_deps',
  'detachFinalizer',
  'attachFinalizer',
  'makeClassHandle',
  'init_ClassHandle',
  'ClassHandle',
  'ClassHandle_isAliasOf',
  'throwInstanceAlreadyDeleted',
  'ClassHandle_clone',
  'ClassHandle_delete',
  'deletionQueue',
  'ClassHandle_isDeleted',
  'ClassHandle_deleteLater',
  'flushPendingDeletes',
  'delayFunction',
  'setDelayFunction',
  'RegisteredClass',
  'shallowCopyInternalPointer',
  'downcastPointer',
  'upcastPointer',
  'char_0',
  'char_9',
  'makeLegalFunctionName',
  'emval_handles',
  'emval_symbols',
  'init_emval',
  'count_emval_handles',
  'getStringOrSymbol',
  'Emval',
  'emval_newers',
  'emval_lookupTypes',
  'emval_allocateDestructors',
  'emval_methodCallers',
  'emval_addMethodCaller',
  'emval_registeredMethods',
  'NODEFS',
  'IDBFS',
];
unexportedSymbols.forEach(unexportedRuntimeSymbol);



var calledRun;

dependenciesFulfilled = function runCaller() {
  // If run has never been called, and we should call run (INVOKE_RUN is true, and Module.noInitialRun is not false)
  if (!calledRun) run();
  if (!calledRun) dependenciesFulfilled = runCaller; // try this again later, after new deps are fulfilled
};

function stackCheckInit() {
  // This is normally called automatically during __wasm_call_ctors but need to
  // get these values before even running any of the ctors so we call it redundantly
  // here.
  _emscripten_stack_init();
  // TODO(sbc): Move writeStackCookie to native to to avoid this.
  writeStackCookie();
}

function run() {

  if (runDependencies > 0) {
    return;
  }

    stackCheckInit();

  preRun();

  // a preRun added a dependency, run will be called later
  if (runDependencies > 0) {
    return;
  }

  function doRun() {
    // run may have just been called through dependencies being fulfilled just in this very frame,
    // or while the async setStatus time below was happening
    if (calledRun) return;
    calledRun = true;
    Module['calledRun'] = true;

    if (ABORT) return;

    initRuntime();

    readyPromiseResolve(Module);
    if (Module['onRuntimeInitialized']) Module['onRuntimeInitialized']();

    assert(!Module['_main'], 'compiled without a main, but one is present. if you added it from JS, use Module["onRuntimeInitialized"]');

    postRun();
  }

  if (Module['setStatus']) {
    Module['setStatus']('Running...');
    setTimeout(function() {
      setTimeout(function() {
        Module['setStatus']('');
      }, 1);
      doRun();
    }, 1);
  } else
  {
    doRun();
  }
  checkStackCookie();
}

if (Module['preInit']) {
  if (typeof Module['preInit'] == 'function') Module['preInit'] = [Module['preInit']];
  while (Module['preInit'].length > 0) {
    Module['preInit'].pop()();
  }
}

run();


// end include: postamble.js


  return hnswlib.ready
}

);
})();

export { hnswlib as default };
//# sourceMappingURL=hnswlib-wasm.js.map
