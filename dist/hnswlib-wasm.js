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
  wasmBinaryFile = 'data:application/octet-stream;base64,AGFzbQEAAAAB9QM8YAJ/fwBgAX8Bf2ABfwBgAn9/AX9gA39/fwF/YAN/f38AYAR/f39/AX9gBH9/f38AYAZ/f39/f38Bf2AFf39/f38Bf2AFf39/f38AYAN/f38BfWAAAGAGf39/f39/AGAIf39/f39/f38Bf2AAAX9gB39/f39/f38Bf2AHf39/f39/fwBgBX9+fn5+AGADf35/AX5gBX9/fn9/AGAFf39/f34Bf2AEf39/fwF+YAh/f39/f39/fwBgBH9+fn8AYAp/f39/f39/f39/AX9gBn9/f39+fgF/YAd/f39/f35+AX9gA39/fwF8YAN/fn8Bf2AMf39/f39/f39/f39/AX9gBX9/f398AX9gBH9/f3wBf2AFf39/fn4Bf2ALf39/f39/f39/f38Bf2AKf39/f39/f39/fwBgD39/f39/f39/f39/f39/fwBgDX9/f39/f39/f39/f38AYAl/f39/f39/f38AYAV/f39/fwF8YAR/f39/AX1gAXwBfGABfwF+YAN/fn8AYAJ/fgBgAn98AGAEfn5+fgF/YAN+fn4Bf2ABfwF8YAJ/fwF+YAJ+fgF9YAJ+fgF8YAN/f34AYAJ8fwF8YAJ+fwF/YAZ/fH9/f38Bf2AEf39/fgF+YAV+f39/fwF/YAl/f39/f39/f38Bf2AEf39+fgAChAosA2VudhhlbXNjcmlwdGVuX2FzbV9jb25zdF9pbnQABANlbnYZX2VtYmluZF9yZWdpc3Rlcl9mdW5jdGlvbgARA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2NsYXNzACUDZW52Il9lbWJpbmRfcmVnaXN0ZXJfY2xhc3NfY29uc3RydWN0b3IADQNlbnYfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbgAmA2VudiVfZW1iaW5kX3JlZ2lzdGVyX2NsYXNzX2NsYXNzX2Z1bmN0aW9uABcDZW52EV9lbXZhbF90YWtlX3ZhbHVlAAMDZW52DV9lbXZhbF9pbmNyZWYAAgNlbnYNX2VtdmFsX2RlY3JlZgACA2VudhBfZW12YWxfbmV3X2FycmF5AA8DZW52EV9lbXZhbF9uZXdfb2JqZWN0AA8DZW52El9lbXZhbF9uZXdfY3N0cmluZwABA2VudhNfZW12YWxfc2V0X3Byb3BlcnR5AAUDZW52E19lbXZhbF9nZXRfcHJvcGVydHkAAwNlbnYJX2VtdmFsX2FzABwDZW52Fl9lbXZhbF9ydW5fZGVzdHJ1Y3RvcnMAAgNlbnYYX2VtdmFsX2dldF9tZXRob2RfY2FsbGVyAAMDZW52F19lbXZhbF9jYWxsX3ZvaWRfbWV0aG9kAAcDZW52IV9lbXZhbF9uZXdfYXJyYXlfZnJvbV9tZW1vcnlfdmlldwABA2VudhJfZW12YWxfY2FsbF9tZXRob2QAJwNlbnYNX19hc3NlcnRfZmFpbAAHA2VudhVfZW1iaW5kX3JlZ2lzdGVyX3ZvaWQAAANlbnYVX2VtYmluZF9yZWdpc3Rlcl9ib29sAAoDZW52GF9lbWJpbmRfcmVnaXN0ZXJfaW50ZWdlcgAKA2VudhZfZW1iaW5kX3JlZ2lzdGVyX2Zsb2F0AAUDZW52G19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZwAAA2VudhxfZW1iaW5kX3JlZ2lzdGVyX3N0ZF93c3RyaW5nAAUDZW52Fl9lbWJpbmRfcmVnaXN0ZXJfZW12YWwAAANlbnYcX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldwAFA2VudhVlbXNjcmlwdGVuX21lbWNweV9iaWcABQNlbnYWZW1zY3JpcHRlbl9yZXNpemVfaGVhcAABA2VudhBfX3N5c2NhbGxfb3BlbmF0AAYDZW52EV9fc3lzY2FsbF9mY250bDY0AAQDZW52D19fc3lzY2FsbF9pb2N0bAAEFndhc2lfc25hcHNob3RfcHJldmlldzEIZmRfd3JpdGUABhZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxB2ZkX3JlYWQABhZ3YXNpX3NuYXBzaG90X3ByZXZpZXcxCGZkX2Nsb3NlAAEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MRFlbnZpcm9uX3NpemVzX2dldAADFndhc2lfc25hcHNob3RfcHJldmlldzELZW52aXJvbl9nZXQAAwNlbnYKc3RyZnRpbWVfbAAJA2VudgVhYm9ydAAMA2VudiJfX3Rocm93X2V4Y2VwdGlvbl93aXRoX3N0YWNrX3RyYWNlAAIDZW52F19lbWJpbmRfcmVnaXN0ZXJfYmlnaW50ABEWd2FzaV9zbmFwc2hvdF9wcmV2aWV3MQdmZF9zZWVrAAkDrgesBwwDDAAMAgICDAMBAgMBCygBAwEBAQIDAQQBAgQDAAUAAwAFAAUHAAoJAQEBDREABQcHCgoNBQcAAAUEBwoFBwoNEQEAAwAABQABAQAKBwYAAQIBDwACDwUABAUCAwoAAwUFBRAABQwAAAABAgMLAQEBAgsBAwECBwoACgADAQECAAMBAgMCAgEHBQAFCgABAQIACgUJDQcFAQUAAAIBAAEMDAQEBCkEBAEPAQIDAAEBBAwDAwMTBAQBAwEBHR0BAQEEAQQGKgIBAgAEFAcEBQQBAQMEAwEBAgIAAgEAAwEBBQArAQECAgACAAUFAQMBAQABAAUABAEBAQEEAgIBDAMDBBQHAQACAQICAQIEBQcFAAUDAwEBAQUBAgABAgACLAEYABgSEi0uLzASABIYEhISBzEyMwY0BAQDAwQBAwMDNQkFAQU2CgQ3AAYEAwYCAAEGOAcJBwUECQcFBAgBEAMAAggBBRkGBwgWCAYIBggWCAoeCwgcCAcIDwQEAwgBEAgDBRkICAgICAoeCAgIBAkBAQkHCQQRCBUJFR8gBAYRGiEJBAkBCREIFQkVHyARGiEJBAAADgEICAgNCA0ICgkODggICA0IDQgKCQ4QDRACAQAAAAEAABAiAAUFEAUAAQEDABAiABAFAQABAxsjJAQIGyMkBAgEDQ0BDAIAAgIBBQICAQIAAwICAgIEBgYGAwQDBAYECQECAwQDBAYECQ4JCQIOBA4JCQEBCQEODgkBDg4JAQIBAgEBAAAAAAAAAAABAgECAAECAQIBAgECAQIBAgECAQIBAgECAQIBAgIBBQMFBQAFAQEFBQACDAIWFgIMAQMDAAMDAwIFFwEKBQUEAwADFwEKAAADAwMDBQQEAAEFAQUFBAECBQACAQwMAgAMDAwCDAIEBAQDBQcHBwcEAwcKDQoKCg0NDQEBAQECAgEBAwEBOQACDA8PDwYCAwMDAQMFBAEAAgIBAQMDAQEABRACAwADAQEDAQMEBAQBAwABAwMDAAEFAQMECAADAAADAwAAAAEBAgYDBAEDAwMJAwMDAwMAAAEABAYBAQMDBQMDAwAGAQEEAQMAAAcAAAAAAAAAAAAAAAAGAAMBAgAAAAAAAAMAAAAAAAAAAAAAAAAAAwAAAgMAAAAEAAAAAAAAAAADAAAAAAAEAAAAAAAGAAAAAwMDAwAAAAAAAwAAAAQAAAAAAAADAwMAAAAAAAQAAAAAAAADAAEAAAUABAABBQ8CAQwJERA6GTsEBQFwAM0FBQcBAYACgIACDQMBAAIGFwR/AUGw8QYLfwFBAAt/AUEAC38BQQALB+0EHQZtZW1vcnkCABFfX3dhc21fY2FsbF9jdG9ycwAsD19fY3BwX2V4Y2VwdGlvbgQABm1hbGxvYwDWAQRmcmVlANcBGV9faW5kaXJlY3RfZnVuY3Rpb25fdGFibGUBAA1fX2dldFR5cGVOYW1lAMsBG19lbWJpbmRfaW5pdGlhbGl6ZV9iaW5kaW5ncwDMARBfX2Vycm5vX2xvY2F0aW9uANUBBmZmbHVzaADqAQZfX3RyYXAA0QcVZW1zY3JpcHRlbl9zdGFja19pbml0APUFGWVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2ZyZWUA9gUZZW1zY3JpcHRlbl9zdGFja19nZXRfYmFzZQD3BRhlbXNjcmlwdGVuX3N0YWNrX2dldF9lbmQA+AUJc3RhY2tTYXZlAM4HDHN0YWNrUmVzdG9yZQDPBwpzdGFja0FsbG9jANAHHGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2N1cnJlbnQAzgciX19jeGFfZGVjcmVtZW50X2V4Y2VwdGlvbl9yZWZjb3VudADHBSJfX2N4YV9pbmNyZW1lbnRfZXhjZXB0aW9uX3JlZmNvdW50AMsFDl9fY3hhX2RlbWFuZ2xlAPkFJV9fdGhyb3duX29iamVjdF9mcm9tX3Vud2luZF9leGNlcHRpb24AzAcXX19nZXRfZXhjZXB0aW9uX21lc3NhZ2UAzQcMZHluQ2FsbF9qaWppANIHDmR5bkNhbGxfdmlpamlpANMHDmR5bkNhbGxfaWlpaWlqANQHD2R5bkNhbGxfaWlpaWlqagDVBxBkeW5DYWxsX2lpaWlpaWpqANYHCbQKAQBBAQvMBe0FMjUvNjc4OTo7PD0+Nzg/Ojs8PUBBQkNERUZHSElKS0xNTk9QUVJTVFU9VjxXRkdIWFlaSltcXV5fYEtMYWJjTmRlZmdoaVFqa2xtbj1vcHFyc3R1PTx2d3hUeXp7MXx9fn+AAYEBfoIBgwGEAeoFngGfAZkBMjM0mgGbAZwBnwGdAZoBmwGcAZ0BoAGhAaIBowGkAaYBpwGqAasBtAG4AbkBugG8Ac0B4QHiAeMB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QYABcSACcjoACyABIAEtAAtB/wBxOgALDAELIAEgAkELTwR/IAJBEGpBcHEiBSAFQQFrIgUgBUELRhsFQQoLQQFqIgUQvgIhCyABIAEoAghBgICAgHhxIAVB/////wdxcjYCCCABIAEoAghBgICAgHhyNgIIIAEgCzYCACABIAI2AgQLIApBEGokACABDAELEC4ACyICLQALQQd2BEAgAigCAAwBCyACCyICQeDGACAGEPoBIAIgBmoiAgJ/IAAtAAtBB3YEQCAAKAIADAELIAALIAcQ+gEgAiAHakEBQQAQqgUgCUEQaiQAIAFBAToADgZAIAMgARCgBSIAQbCCAjYCACABQQA6AA4gAEHUggJB6gAQxQUZIAEkACABLQAOIQAgASwAC0EASARAIAEoAgAQ1wELIAEgAEEBcToADwkACxkgASQAIAEtAA8EQCADEMQFCwkACwALIQAZIAgkACAEENcBCQALIAALTwECfyMAIQMgACgCBCICBEAgAiACKAIAKAIUEQIACwZABkBBzAAQngUhAhgBIAIgACgCCCABEIUBIQEZIAMkACACENcBCQALIAAgATYCBAs3AQF/IAEgACgCBCIDQQF1aiEBIAAoAgAhACABIAIgA0EBcQR/IAEoAgAgAGooAgAFIAALEQAAC0sBAX8jAEEQayICJAAgAAJ/IAEoAgRFBEAgAkEANgIIQbD9ASACQQhqEAYMAQsgAkEBNgIIQbD9ASACQQhqEAYLNgIAIAJBEGokAAuFAQECfyMAQRBrIgIkACABIAAoAgQiA0EBdWohASAAKAIAIQAgAkEMaiABIANBAXEEfyABKAIAIABqKAIABSAACxEAAAZAIAIoAgwQBxkgAiQABkAgAigCDBAIGSACJAAQzwUACwkACwZAIAIoAgwiABAIGSACJAAQzwUACyACQRBqJAAgAAv4BAEEfyMAQUBqIgIkACAAKAIEIgMEQCADIAMoAgAoAhQRAgALBkBBzAAQngUhAyAAKAIIIQQgA0IANwIEIANBvNEANgIAIANCADcCDCADQQA2AhQgA0IANwIcIANCADcCJCADQgA3AiwgA0IANwI0IANCADcCPCADQoCAgICAgIDAPzcCRAZAIAMgASAEEIYBGSACJAAgA0E4ahCHASADENcBCQALBwAhASACJABBpPECQZAINgIAQaDxAkEANgIAIAEQ9AVBqPECKAIAQQFGBEAGQAJABkAgAkEwaiEDIAEQyAUiASABKAIAKAIIEQEAIQEYBCADIAEQLSEBBkAgAkEkakGPJhAtIQMGQCABIAMQiAFBf0cEQAZAQQgQwwUhBBgHIAAoAgQoAgghACACQQE6AD8GQCACQQxqIgUgABC0BSACQQE6AD4GQCACIAVB78UAEK0FIgAoAgg2AiAgAiAAKQIANwMYIABCADcCACAAQQA2AgggAkEBOgA9BkAgBCACQRhqEKMFIQAgAkEAOgA9IABB3IMCQQEQxQUMBhkgAiQAIAItAD0hACACLAAjQQBIBEAgAigCGBDXAQsgAiAAQQFxOgA+CQALABkgAiQAIAItAD4hACACLAAXQQBIBEAgAigCDBDXAQsgAiAAQQFxOgA/CQALABkgAiQAIAItAD8EQAZAIAQQxAUYCQsJAAsACxDKBRkgAiQAIAMsAAtBAEgEQCADKAIAENcBCwkACxkgAiQAIAEsAAtBAEgEQCABKAIAENcBCwkACwsZIAIkAAZAEMkFGSACJAAQzwUACwkACwALCQALIAAgAzYCBCACQUBrJAALgwIBBH8jAEEQayIDJAAgASAAKAIEIgRBAXVqIQYgACgCACEBIARBAXEEQCAGKAIAIAFqKAIAIQELAkAgAigCACIAQfD///8HSQRAAkACQCAAQQtPBEAgAEEPckEBaiIFEJ4FIQQgAyAFQYCAgIB4cjYCDCADIAQ2AgQgAyAANgIIIAAgBGohBQwBCyADIAA6AA8gA0EEaiIEIABqIQUgAEUNAQsgBCACQQRqIAAQzgEaCyAFQQA6AAAGQCAGIANBBGogAREAAAwCGSADJAAgAywAD0EASARAIAMoAgQQ1wELCQALAAsQLgALIAMsAA9BAEgEQCADKAIEENcBCyADQRBqJAALgAEBAX8jAEEQayICJAACQCAAKAIEIgBFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSACJAAgABDEBQkACwALIAAgASAAKAIAKAIMEQAAIAJBAjYCBCACQQA2AgBBgM8CQdPIACACEAAaIAJBEGokAA8LIABB3IMCQQEQxQUAC/sJAgh/An0jAEFAaiIDJAACQCAAKAIEIgdFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSADJAAgABDEBQkACwALAkAgASgCBCIEIAEoAgAiBWsiCUECdSIIIAAoAgBHBEBBCBDDBSEBIAAoAgAhACADQQE6ADkGQCADQQxqIgIgABC0BSADQQE6ADgGQCADIAJBjT8QrQUiACgCCDYCICADIAApAgA3AxggAEIANwIAIABBADYCCCADQQE6ADcGQCADIANBGGpBiTgQrwUiACgCCDYCMCADIAApAgA3AyggAEIANwIAIABBADYCCCADQQE6ADYGQCABIANBKGoQoAUiAEGwggI2AgAgA0EAOgA2IABB1IICQeoAEMUFDAUZIAMkACADLQA2IQAgAywAM0EASARAIAMoAigQ1wELIAMgAEEBcToANwkACwAZIAMkACADLQA3IQAgAywAI0EASARAIAMoAhgQ1wELIAMgAEEBcToAOAkACwAZIAMkACADLQA4IQAgAywAF0EASARAIAMoAgwQ1wELIAMgAEEBcToAOQkACwAZIAMkACADLQA5BEAgARDEBQsJAAsACwJAIAAtAAxFDQAgBCAFRiIGRQRAIAUhAQNAIAEqAgAiDCAMlCALkiELIAFBBGoiASAERw0ACwsgC4uRIgtDAAAAAF5FDQAgBg0AQQEgCCAIQQFNGyIEQQFxIQhBACEBIAlBCE8EQCAEQX5xIQlBACEEA0AgBSABQQJ0IgZqIgogCioCACALlTgCACAFIAZBBHJqIgYgBioCACALlTgCACABQQJqIQEgBEECaiIEIAlHDQALCyAIRQ0AIAUgAUECdGoiASABKgIAIAuVOAIACyAHKAIMIAcoAghGBEBBCBDDBSEBIAAoAgQoAgghACADQQE6ADwGQCADQRhqIgIgABC0BSADQQE6ADsGQCADIAJBhMUAEK0FIgAoAgg2AjAgAyAAKQIANwMoIABCADcCACAAQQA2AgggA0EBOgA6BkAgASADQShqEKMFIQAgA0EAOgA6IABB3IMCQQEQxQUMBBkgAyQAIAMtADohACADLAAzQQBIBEAgAygCKBDXAQsgAyAAQQFxOgA7CQALABkgAyQAIAMtADshACADLAAjQQBIBEAgAygCGBDXAQsgAyAAQQFxOgA8CQALABkgAyQAIAMtADwEQCABEMQFCwkACwALBkAgByAFIAJBACAHKAIAKAIAEQcABwAhACADJABBpPECQaAINgIAQaDxAkEANgIAIAAQ9AUC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IAFCADcDwAEgAUIANwO4ASABQgA3A7ABIAFCADcDqAEgAUIANwLsASABIAI6AOgBIAFCADcD4AEgAUKBgICAEDcD2AEgAUKAgICAgICAwD83A9ABIAFCADcC9AEgAUIANwL8ASABQYQCaiICQgA3AgAgAUIANwKMAiABQYCAgPwDNgKUAgZAIAEgBSAEEMUBGSAGJAAgAhCHASABQcQBahCHASABKAKUASICBEAgASACNgKYASACENcBCyABQewAahCxASABQcgAahCxAQkACxkgAyQAIAEQ1wEJAAsHACEBIAMkAEGk8QJBsAg2AgBBoPECQQA2AgAgARD0BQJAQajxAigCAEEBRgRABkAGQCADQTBqIQQgARDIBSICIAIoAgAoAggRAQAhARgFIAQgARAtIQQGQCAEIANBJGpBjyYQLSIFEIgBIQYGQEEIEMMFIQEYBgZAIAZBf0cEQCAAKAIEKAIEIQAgA0EBOgBPBkAgA0EMaiICIAAQtAUgA0EBOgBOBkAgAyACQe/FABCtBSIAKAIINgIgIAMgACkCADcDGCAAQgA3AgAgAEEANgIIIANBAToATQZAIAEgA0EYahCjBSEAIANBADoATSAAQdyDAkEBEMUFDAgZIAMkACADLQBNIQAgAywAI0EASARAIAMoAhgQ1wELIAMgAEEBcToATgkACwAZIAMkACADLQBOIQAgAywAF0EASARAIAMoAgwQ1wELIAMgAEEBcToATwkACwAZIAMkACADLQBPBEAGQCABEMQFGAoLCQALAAsGQAZAIAIgAigCACgCCBEBACEAGAggASAAEKQFIQAZIAMkAAZAIAEQxAUYCAkACyAAQdyDAkEBEMUFDAQZIAMkACAFLAALQQBIBEAgBSgCABDXAQsJAAsAGSADJAAgBCwAC0EASARAIAQoAgAQ1wELCQALABkgAyQABkAQyQUZIAMkABDPBQALCQALAAsJAQsACxkgAyQAIAMsAEtBAEgEQCADKAJAENcBCwkACyAAIAE2AgQgAywAS0EASARAIAMoAkAQ1wELIANB0ABqJAALhQIBBH8jAEEQayIEJAAgASAAKAIEIgVBAXVqIQcgACgCACEBIAVBAXEEQCAHKAIAIAFqKAIAIQELAkAgAigCACIAQfD///8HSQRAAkACQCAAQQtPBEAgAEEPckEBaiIGEJ4FIQUgBCAGQYCAgIB4cjYCDCAEIAU2AgQgBCAANgIIIAAgBWohBgwBCyAEIAA6AA8gBEEEaiIFIABqIQYgAEUNAQsgBSACQQRqIAAQzgEaCyAGQQA6AAAGQCAHIARBBGogAyABEQUADAIZIAQkACAELAAPQQBIBEAgBCgCBBDXAQsJAAsACxAuAAsgBCwAD0EASARAIAQoAgQQ1wELIARBEGokAAvhAwEGfyMAQTBrIgIkAAJAIAAoAgRFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSACJAAgABDEBQkACwALAkBBwNYCKAIAQcfWAiwAACIGQf8BcSAGQQBIGyIFQQFqIgNB8P///wdJBEACQCADQQpNBEAgAkEANgIYIAJCADcDECACIAM6ABsgAkEQaiEEDAELIANBD3JBAWoiBxCeBSEEIAIgAzYCFCACIAQ2AhAgAiAHQYCAgIB4cjYCGAsgBQRAIARBvNYCQbzWAigCACAGQQBOGyAFEM8BGgsgBCAFakEvOwAABkAgAkEQaiABKAIAIAEgAS0ACyIDwEEASCIEGyABKAIEIAMgBBsQrAUhAQwCGSACJAAgAiwAG0EASARAIAIoAhAQ1wELCQALAAsQLgALIAIgASgCCDYCKCACIAEpAgA3AyAgAUIANwIAIAFBADYCCCACLAAbQQBIBEAgAigCEBDXAQsGQCAAKAIEIgAgAkEgaiAAKAIAKAIMEQAAGSACJAAgAiwAK0EASARAIAIoAiAQ1wELCQALIAJBAjYCBCACQQA2AgBBgM8CQdPIACACEAAaIAIsACtBAEgEQCACKAIgENcBCyACQTBqJAAPCyAAQdyDAkEBEMUFAAtRAQF/IwAhAgJAIAAoAgQiAEUEQAZABkBBCBDDBSEAGAMgAEHjNRCkBSEADAIZIAIkACAAEMQFCQALAAsgACABEJABDwsgAEHcgwJBARDFBQAL7gUBBH8jAEEwayIDJAACQCABKAIEIgFFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSADJAAgABDEBQkACwALBkAgA0EgaiABIAIQkQEGQCAAEAk2AgBBACEBIANBADYCECADKAIkIgIgAygCICIERwRAIAQhAgNABkAgAiABQQJ0aiEEIwBBEGsiASQAIAAoAgAhBSABIAMoAhA2AghBnP4BIAFBCGoiBhAGIQIgASAEKgIAOAIIBkBBwP4BIAYQBiEEBkAgBSACIAQQDBkgASQABkAgBBAIGSABJAAQzwUACwkACxkgASQABkAgAhAIGSABJAAQzwUACwkACwZAIAQQCBkgASQAEM8FAAsGQCACEAgZIAEkABDPBQALIAFBEGokABkgAyQABkAgACgCABAIGSADJAAQzwUACwkACyADIAMoAhBBAWoiATYCECABIAMoAiQgAygCICICa0ECdUkNAAsLIAIEQCADIAI2AiQgAhDXAQsgA0EwaiQADxkgAyQAIAMoAiAiAARAIAMgADYCJCAAENcBCwkACwAHACEAIAMkAEGk8QJBwAg2AgBBoPECQQA2AgAgABD0BQJAQajxAigCAEEBRgRAIAAQyAUhAEEIEMMFIQIgACAAKAIAKAIIEQEAIQAgA0EBOgAvBkAgA0EEaiAAEC0hACADQQE6AC4GQCADIABB18MAEK0FIgEoAgg2AhggAyABKQIANwMQIAFCADcCACABQQA2AgggA0EBOgAtBkAgAiADQRBqEKMFIQEgA0EAOgAtIAFB3IMCQQEQxQUMBBkgAyQAIAMtAC0hASADLAAbQQBIBEAgAygCEBDXAQsgAyABQQFxOgAuCQALABkgAyQAIAMtAC4hASAALAALQQBIBEAgACgCABDXAQsgAyABQQFxOgAvCQALABkgAyQAIAMtAC8EQCACEMQFCwZAEMkFGSADJAAQzwUACwkACwALCQELAAsACyAAQdyDAkEBEMUFAAuHAQECfyMAQRBrIgMkACABIAAoAgQiBEEBdWohASAAKAIAIQAgA0EMaiABIAIgBEEBcQR/IAEoAgAgAGooAgAFIAALEQUABkAgAygCDBAHGSADJAAGQCADKAIMEAgZIAMkABDPBQALCQALBkAgAygCDCIAEAgZIAMkABDPBQALIANBEGokACAAC4MKAgl/An0jAEFAaiIEJAACQCAAKAIEIgtFBEAGQAZAQQgQwwUhABgDIABB4zUQpAUhAAwCGSAEJAAgABDEBQkACwALAkAgASgCBCIGIAEoAgAiB2siCkECdSIJIAAoAgBHBEBBCBDDBSEBIAAoAgAhACAEQQE6ADkGQCAEQQxqIgIgABC0BSAEQQE6ADgGQCAEIAJBjT8QrQUiACgCCDYCICAEIAApAgA3AxggAEIANwIAIABBADYC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EJ4FIgk2ApQBIAAgByAJaiIMNgKcASAJQQAgBxDQARogACAMNgKYAQsgAEIANwOoASAAQQA2AqABIABCADcC7AEgACAGOgDoASAAQQA2AuQBIABCATcC3AEgACACNgIEIABBADYCFCAAQgA3A7ABIABCADcDuAEgAEIANwPAASAAQgA3A8gBIABBADYC0AEgAEKAgID8EzcC1AEgAEIANwL0ASAAQgA3AvwBIABBhAJqIgZCADcCACAAQgA3AowCIABBgICA/AM2ApQCIABBxAFqIQcGQCAAIAEgASgCACgCABEBADYCoAEgACABIAEoAgAoAgQRAQA2AqQBIAEgASgCACgCCBEBACEBIABBCjYCKCAAIAM2AhwgACADNgIYIAAgATYCqAEgAEEANgKEASAAIANBAXQ2AiAgACAEIAMgAyAESRs2AiQgACADQQN0QQRyIgE2AnwgACABNgKAASAAQQEgBUH/////B3AiAyADQQFNGzYC2AEgACAAKAKgASABaiIBNgKIASAAQQEgBUEBakH/////B3AiAyADQQFNGzYC3AEgACABQQRqIgE2AgwgACAAKAIEIAFsENYBIgE2AowBAkAgAUUEQAZABkBBCBDDBSEBGAcgAUHOCRCkBSEBDAIZIAgkAAZAIAEQxAUYBwkACwALIABBADYCCEE0EJ4FIQEGQCABIAIQsAEhARkgCCQAIAEQ1wEJAAsgAEF/NgJ4IAAgATYCRCAAQX82AkAgACAAKAIEQQJ0ENYBIgE2ApABAkAgAUUEQAZABkBBCBDDBSEBGAggAUHlERCkBSEBDAIZIAgkAAZAIAEQxAUYCAkACwALIAAgACgCHEECdEEEajYCEAZAIAAoAhi4ENEBIQ0YBiAARAAAAAAAAPA/IA2jIg05AzAgAEQAAAAAAADwPyANozkDOCAIQRBqJAAgAA8LIAFB3IMCQQEQxQUMAwsgAUHcgwJBARDFBRkgCCQAIAYQhwEgBxCHASAAKAKUASIBBEAgACABNgKYASABENcBCwkACxkgCCQAIAoQsQEJAAsLGSAIJAAgCxCxAQkACwALgwcBCX8jAEEgayIDJAACQCABIAAoAghJBEAGQAZAQQgQwwUhABgDIABB3xIQpAUhAAwCGSADJAAgABDEBQkACwALIAAoAkQiAgRAIAIQuwEQ1wELBkAGQEE0EJ4F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IARBADYCECACBEAgAhDXAQsgBCgCMCICBEADQCACKAIAIQMgAhDXASADIgINAAsLIAQoAighAiAEQQA2AiggAgRAIAIQ1wELIApBAWohCgwACwALIARBQGskAAvMLQIUfwR9IwBBIGsiDyQAIABBADYCCCAAQgA3AgAGQAZAAkACQCABKAIIRQ0ABkAgAiABKAKAASABKAKMASABKAJ4IgYgASgCDGxqaiABKAKoASABKAKkARELACEZGAMgASgCQCEMA0AgDEEASgRAIAxBAWshDEEBIQUDQCAFQQFxRQ0CIAEoApABIAZBAnRqKAIAIAEoAhAgDGxqIgUvAQAhCyABIAEoAuQBQQFqNgLkASABIAsgASgC4AFqNgLgASAFQQRqIQlBACEIQQAhBQNAIAUgC08EQCAIQQFxIQUMAgsgCSAFQQJ0aigCACIHIAEoAgRLBEAGQAZAQQgQwwUhARgKIAFB5hYQpAUhAQwHGSAPJAAGQCABEMQFGAoGQAkBGAkACwALBkAgAiABKAKAASABKAKMASABKAIMIAdsamogASgCqAEgASgCpAERCwAhGhgHIAcgBiAZIBpeIgcbIQYgGiAZIAcbIRlBASAIIAcbIQggBUEBaiEFDAALAAsACwsCQCABKAIUBEAgASgCKCEFIA9BADYCHCAPQQxqIQkgAiEMIAUgAyADIAVJGyERIAQhCyMAQSBrIgckACAHIAY2AhwgASgCRBDEASIULwEAIRIgFCgCBCEVIAlBADYCCCAJQgA3AgAgB0EANgIUIAdCADcCDAJAAkACQAZAAkACQCABKAKMASIEIAEoAgwgBmwiAmoiBSABKAKEAWotAAJBAXENACALBEAgCyAFIAEoAogBaigAACALKAIAKAIAEQMARQ0BIAEoAowBIQQgASgCDCAHKAIcbCECCyAHIAwgASgCgAEgAiAEamogASgCqAEgASgCpAERCwAiGTgCCCAJIAdBCGogB0EcaiICEL8BIAcgByoCCIw4AgQgB0EMaiAHQQRqIAIQvwEMAQsgB0H///97NgIIIAdBDGogB0EIaiAHQRxqEL8BQ///f38hGQsgFSAHKAIcQQF0aiASOwEAA0ACQCAHKAIMIgYgBygCECIKRg0AIAYoAgQhDiAGKgIAIhqMIBleBEAgCSgCBCAJKAIAa0EDdSARRg0BCwJAIAog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oKCgDwsCQCABQfD/AWtBn4B+TQRAIAhC////////////AINQBEAjAEEQayIBRAAAAAAAAPC/OQMIIAErAwhEAAAAAAAAAACjDwsgCEKAgICAgICA+P8AUQ0BIAFB8P8BcUHw/wFHIAFB//8BTXFFBEAgACAAoSIAIACjDwsgAEQAAAAAAAAwQ6K9QoCAgICAgICgA30hCAsgCEKAgICAgICA8z99IglCNIentyIDQYDgACsDAKIgCUItiKdB/wBxQQR0IgFBmOEAaisDAKAiBCABQZDhAGorAwAgCCAJQoCAgICAgIB4g32/IAFBkPEAaisDAKEgAUGY8QBqKwMAoaIiAKAiBSAAIAAgAKIiAqIgAiAAQbDgACsDAKJBqOAAKwMAoKIgAEGg4AArAwCiQZjgACsDAKCgoiACQZDgACsDAKIgA0GI4AArAwCiIAAgBCAFoaCgoKCgIQALIAAL4wEBAn8gAkEARyEDAkACQAJAIABBA3FFDQAgAkUNACABQf8BcSEEA0AgAC0AACAERg0CIAJBAWsiAkEARyEDIABBAWoiAEEDcUUNASACDQALCyADRQ0BAkAgAC0AACABQf8BcUYNACACQQRJDQAgAUH/AXFBgYKECGwhAwNAIAAoAgAgA3MiBEF/cyAEQYGChAhrcUGAgYKEeHENAiAAQQRqIQAgAkEEayICQQNLDQALCyACRQ0BCyABQf8BcSEBA0AgASAALQAARgRAIAAPCyAAQQFqIQAgAkEBayICDQALC0EAC4EBAQJ/AkACQCACQQRPBEAgACABckEDcQ0BA0AgACgCACABKAIARw0CIAFBBGohASAAQQRqIQAgAkEEayICQQNLDQALCyACRQ0BCwNAIAAtAAAiAyABLQAAIgRGBEAgAUEBaiEBIABBAWohACACQQFrIgINAQwCCwsgAyAEaw8LQQALaQEDfwJAIAAiAUEDcQRAA0AgAS0AAEUNAiABQQFqIgFBA3ENAAsLA0AgASICQQRqIQEgAigCACIDQX9zIANBgYKECGtxQYCBgoR4cUUNAAsDQCACIgFBAWohAiABLQAADQALCyABIABrCwYAQezWAgudKQELfyMAQRBrIgskAAJAAkACQAJAAkACQAJAAkACQCAAQfQBTQRAQfDWAigCACIGQRAgAEELakF4cSAAQQtJGyIFQQN2IgB2IgFB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AmohBwJAAkBB9NYCKAIAIgNBASAEdCICcUUEQEH01gIgAiADcjYCACAHIAA2AgAgACAHNgIYDAELIAFBGSAEQQF2a0EAIARBH0cbdCEEIAcoAgAhAgNAIAIiAygCBEF4cSABRg0CIARBHXYhAiAEQQF0IQQgAyACQQRxaiIHQRBqKAIAIgINAAsgByAANgIQIAAgAzYCGAsgACAANgIMIAAgADYCCA8LIAMoAggiASAANgIMIAMgADYCCCAAQQA2AhggACADNgIMIAAgATYCCAsLUgECf0HQzQIoAgAiASAAQQdqQXhxIgJqIQACQCACQQAgACABTRsNACAAPwBBEHRLBEAgABAeRQ0BC0HQzQIgADYCACABDwtB7NYCQTA2AgBBfwuuDAEGfyMAQRBrIgQkACAEIAA2AgwCQCAAQdMBTQRAQZCBAUHQggEgBEEMahDcASgCACECDAELIABBfE8EQBDdAQALIAQgACAAQdIBbiIGQdIBbCICazYCCEHQggFBkIQBIARBCGoQ3AFB0IIBa0ECdSEFA0AgBUECdEHQggFqKAIAIAJqIQJBBSEAA0ACQCAAQS9GBEBB0wEhAANAIAIgAG4iASAASQ0FIAIgACABbEYNAiACIABBCmoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBDGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBEGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBEmoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBFmoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBHGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBHmoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBJGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBKGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBKmoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBLmoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBNGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBOmoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBPGoiAW4iAyABSQ0FIAIgASADbEYNAiACIABBwgBqIgFuIgMgAUkNBSACIAEgA2xGDQIgAiAAQcYAaiIBbiIDIAFJDQUgAiAB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IAAQ1wEL3AECAn8BfiAAIAAoAhhFIAFyIgE2AhAgACgCFCABcQRAIwBBEGsiASQAQRAQwwUhAiMAQRBrIgMkACADQQhqIQBBpNsCLQAARQRAQaTbAkEBOgAACyAAQdTNAjYCBCAAQQE2AgAgASADKQMINwIEIANBEGokACABQQE6AA8GQCMAQRBrIgAkACAAIAEpAgQiBDcDACAAIAQ3AwggAiAAQa8YEMIFQZSLATYCACAAQRBqJAAgAUEAOgAPIAJB6IsBQbgBEMUFGSABJAAgAS0ADwRAIAIQxAULCQALAAsLpAEBA38jACECIABBqIsBNgIABkACQCAAKAIoIQEDQCABRQ0BQQAgACABQQFrIgFBAnQiAyAAKAIkaigCACAAKAIgIANqKAIAEQUADAALAAsZIAIkABDPBQALIAAoAhwiASABKAIEQQFrIgI2AgQgAkF/RgRAIAEgASgCACgCCBECAAsgACgCIBDXASAAKAIkENcBIAAoAjAQ1wEgACgCPBDXASAACw0AIAAQxwIaIAAQ1wELQAAgAEEANgIUIAAgATYCGCAAQQA2AgwgAEKCoICA4AA3AgQgACABRTYCECAAQSBqQQBBKBDQARogAEEcahCzBAseACAAIAAoAhBBAXI2AhAgAC0AFEEBcQRAEMoFAAsLRwECfyAAIAE3A3AgACAAKAIsIAAoAgQiA2usNwN4IAAoAgghAgJAIAFQDQAgAiADa6wgAVcNACADIAGnaiECCyAAIAI2AmgLjAICA38CfgJAIAApA3AiBEIAUiAEIAApA3ggACgCBCIBIAAoAiwiAmusfCIFV3FFBEAjAEEQayICJABBfyEBAkAgABDsAQ0AIAAgAkEPakEBIAAoAiARBABBAUcNACACLQAPIQELIAJBEGokACABIgNBAE4NASAAKAIEIQEgACgCLCECCyAAQn83A3AgACABNgJoIAAgBSACIAFrrHw3A3hBfw8LIAVCAXwhBSAAKAIEIQEgACgCCCECAkAgACkDcCIEUA0AIAQgBX0iBCACIAFrrFkNACABIASnaiECCyAAIAI2AmggACAFIAAoAiwiACABa6x8NwN4IAAgAU8EQCABQQFrIAM6AAALIAMLUAEBfgJAIANBwABxBEAgASADQUBqrYYhAkIAIQEMAQsgA0UNACACIAOtIgSGIAFBwAAgA2utiIQhAiABIASGIQELIAAgATcDACAAIAI3AwgLfwICfwF+IwBBEGsiAyQAIAACfiABRQRAQgAMAQsgAyABIAFBH3UiAnMgAmsiAq1CACACZyICQdEAahDNAiADKQMIQoCAgICAgMAAhUGegAEgAmutQjCGfCABQYCAgIB4ca1CIIaEIQQgAykDAAs3AwAgACAENwMIIANBEGokAAtQAQF+AkAgA0HAAHEEQCACIANBQGqtiCEBQgAhAgwBCyADRQ0AIAJBwAAgA2uthiABIAOtIgSIhCEBIAIgBIghAgsgACABNwMAIAAgAjcDCAvJCgIFfw9+IwBB4ABrIgUkACAEQv///////z+DIQwgAiAEhUKAgICAgICAgIB/gyEKIAJC////////P4MiDUIgiCEOIARCMIinQf//AXEhBwJAAkAgAkIwiKdB//8BcSIJQf//AWtBgoB+TwRAIAdB//8Ba0GBgH5LDQELIAFQIAJC////////////AIMiC0KAgICAgIDA//8AVCALQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIQoMAgsgA1AgBEL///////////8AgyICQoCAgICAgMD//wBUIAJCgICAgICAwP//AFEbRQRAIARCgICAgICAIIQhCiADIQEMAgsgASALQoCAgICAgMD//wCFhFAEQCACIAOEUARAQoCAgICAgOD//wAhCkIAIQEMAwsgCkKAgICAgIDA//8AhCEKQgAhAQwCCyADIAJCgICAgICAwP//AIWEUARAIAEgC4QhAkIAIQEgAlAEQEKAgICAgIDg//8AIQoMAwsgCkKAgICAgIDA//8AhCEKDAILIAEgC4RQBEBCACEBDAILIAIgA4RQBEBCACEBDAILIAtC////////P1gEQCAFQdAAaiABIA0gASANIA1QIgYbeSAGQQZ0rXynIgZBD2sQzQJBECAGayEGIAUpA1giDUIgiCEOIAUpA1AhAQsgAkL///////8/Vg0AIAVBQGsgAyAMIAMgDCAMUCIIG3kgCEEGdK18pyIIQQ9rEM0CIAYgCGtBEGohBiAFKQNIIQwgBSkDQCEDCyADQg+GIgtCgID+/w+DIgIgAUIgiCIEfiIQIAtCIIgiEyABQv////8PgyIBfnwiD0IghiIRIAEgAn58IgsgEVStIAIgDUL/////D4MiDX4iFSAEIBN+fCIRIAxCD4YiEiADQjGIhEL/////D4MiAyABfnwiFCAPIBBUrUIghiAPQiCIhHwiDyACIA5CgIAEhCIMfiIWIA0gE358Ig4gEkIgiEKAgICACIQiAiABfnwiECADIAR+fCISQiCGfCIXfCEBIAcgCWogBmpB//8AayEGAkAgAiAEfiIYIAwgE358IgQgGFStIAQgBCADIA1+fCIEVq18IAIgDH58IAQgBCARIBVUrSARIBRWrXx8IgRWrXwgAyAMfiIDIAIgDX58IgIgA1StQiCGIAJCIIiEfCAEIAJCIIZ8IgIgBFStfCACIAIgECASVq0gDiAWVK0gDiAQVq18fEIghiASQiCIhHwiAlatfCACIAIgDyAUVK0gDyAXVq18fCICVq18IgRCgICAgICAwACDQgBSBEAgBkEBaiEGDAELIAtCP4ghAyAEQgGGIAJCP4iEIQQgAkIBhiABQj+IhCECIAtCAYYhCyADIAFCAYaEIQELIAZB//8BTgRAIApCgICAgICAwP//AIQhCkIAIQEMAQsCfiAGQQBMBEBBASAGayIHQf8ATQRAIAVBMGogCyABIAZB/wBqIgYQzQIgBUEgaiACIAQgBhDNAiAFQRBqIAsgASAHEM8CIAUgAiAEIAcQzwIgBSkDMCAFKQM4hEIAUq0gBSkDICAFKQMQhIQhCyAFKQMoIAUpAxiEIQEgBSkDACECIAUpAwgMAgtCACEBDAILIARC////////P4MgBq1CMIaECyAKhCEKIAtQIAFCAFkgAUKAgICAgICAgIB/URtFBEAgCiACQgF8IgFQrXwhCgwBCyALIAFCgICAgICAgICAf4WEQgBSBEAgAiEBDAELIAogAiACQgGDfCIBIAJUrXwhCgsgACABNwMAIAAgCjcDCCAFQeAAaiQAC8wJAgR/BX4jAEHwAGsiBiQAIARC////////////AIMhCQJAAkAgAVAiBSACQv///////////wCDIgpCgICAgICAwP//AH1CgICAgICAwICAf1QgClAbRQRAIANCAFIgCUKAgICAgIDA//8AfSILQoCAgICAgMCAgH9WIAtCgICAgICAwICAf1EbDQELIAUgCkKAgICAgIDA//8AVCAKQoCAgICAgMD//wBRG0UEQCACQoCAgICAgCCEIQQgASEDDAILIANQIAlCgICAgICAwP//AFQgCUKAgICAgIDA//8AURtFBEAgBEKAgICAgIAghCEEDAILIAEgCkKAgICAgIDA//8AhYRQBEBCgICAgICA4P//ACACIAEgA4UgAiAEhUKAgICAgICAgIB/hYRQIgUbIQRCACABIAUbIQMMAgsgAyAJQoCAgICAgMD//wCFhFANASABIAqEUARAIAMgCYRCAFINAiABIAODIQMgAiAEgyEEDAILIAMgCYRCAFINACABIQMgAiEEDAELIAMgASABIANUIAkgClYgCSAKURsiCBshCiAEIAIgCBsiC0L///////8/gyEJIAIgBCAIGyICQjCIp0H//wFxIQcgC0IwiKdB//8BcSIFRQRAIAZB4ABqIAogCSAKIAkgCVAiBRt5IAVBBnStfKciBUEPaxDNAiAGKQNoIQkgBikDYCEKQRAgBWshBQsgASADIAgbIQMgAkL///////8/gyEEIAdFBEAgBkHQAGogAyAEIAMgBCAEUCIHG3kgB0EGdK18pyIHQQ9rEM0CQRAgB2shByAGKQNYIQQgBikDUCEDCyAEQgOGIANCPYiEQoCAgICAgIAEhCEBIAlCA4YgCkI9iIQhBCACIAuFIQ0CfiADQgOGIgIgBSAHRg0AGiAFIAdrIgdB/wBLBEBCACEBQgEMAQsgBkFAayACIAFBgAEgB2sQzQIgBkEwaiACIAEgBxDPAiAGKQM4IQEgBikDMCAGKQNAIAYpA0iEQgBSrYQLIQkgBEKAgICAgICABIQhDCAKQgOGIQoCQCANQgBTBEBCACEDQgAhBCAJIAqFIAEgDIWEUA0CIAogCX0hAiAMIAF9IAkgClatfSIEQv////////8DVg0BIAZBIGogAiAEIAIgBCAEUCIHG3kgB0EGdK18p0EMayIHEM0CIAUgB2shBSAGKQMoIQQgBikDICECDAELIAkgCnwiAiAJVK0gASAMfHwiBEKAgICAgICACINQDQAgCUIBgyAEQj+GIAJCAYiEhCECIAVBAWohBSAEQgGIIQQLIAtCgICAgICAgICAf4MhASAFQf//AU4EQCABQoCAgICAgMD//wCEIQRCACEDDAELQQAhBwJAIAVBAEoEQCAFIQcMAQsgBkEQaiACIAQgBUH/AGoQzQIgBiACIARBASAFaxDPAiAGKQMAIAYpAxAgBikDGIRCAFKthCECIAYpAwghBAsgAqdBB3EiBUEES60gBEI9hiACQgOIhCICfCIDIAJUrSAEQgOIQv///////z+DIAetQjCGhCABhHwhBAJAIAVBBEYEQCAEIANCAYMiASADfCIDIAFUrXwhBAwBCyAFRQ0BCwsgACADNwMAIAAgBDcDCCAGQfAAaiQAC/oBAgN+An8jAEEQayIFJAACfiABvSIDQv///////////wCDIgJCgICAgICAgAh9Qv/////////v/wBYBEAgAkI8hiEEIAJCBIhCgICAgICAgIA8fAwBCyACQoCAgICAgID4/wBaBEAgA0I8hiEEIANCBIhCgICAgICAwP//AIQMAQsgAlAEQEIADAELIAUgAkIAIAOnZ0EgaiACQiCIp2cgAkKAgICAEFQbIgZBMWoQzQIgBSkDACEEIAUpAwhCgICAgICAwACFQYz4ACAGa61CMIaECyECIAAgBDcDACAAIAIgA0KAgICAgICAgIB/g4Q3AwggBUEQaiQAC9sBAgF/An5BASEEAkAgAEIAUiABQv///////////wCDIgVCgICAgICAwP//AFYgBUKAgICAgIDA//8AURsNACACQgBSIANC////////////AIMiBkKAgICAgIDA//8AViAGQoCAgICAgMD//wBRGw0AIAAgAoQgBSAGhIRQBEBBAA8LIAEgA4NCAFkEQEF/IQQgACACVCABIANTIAEgA1EbDQEgACAChSABIAOFhEIAUg8LQX8hBCAAIAJWIAEgA1UgASADURsNACAAIAKFIAEgA4WEQgBSIQQLIAQLwAECAX8CfkF/IQMCQCAAQgBSIAFC////////////AIMiBEKAgICAgIDA//8AViAEQoCAgICAgMD//wBRGw0AIAJC////////////AIMiBUKAgICAgIDA//8AViAFQoCAgICAgMD//wBScQ0AIAAgBCAFhIRQBEBBAA8LIAEgAoNCAFkEQCABIAJSIAEgAlNxDQEgACABIAKFhEIAUg8LIABCAFIgASACVSABIAJRGw0AIAAgASAChYRCAFIhAwsgAwupAQEBfEQAAAAAAADwPyEBAkAgAEGACE4EQEQAAAAAAADgfyEBIABB/w9JBEAgAEH/B2shAAwCC0QAAAAAAADwfyEBQf0XIAAgAEH9F04bQf4PayEADAELIABBgXhKDQBEAAAAAAAAYAMhASAAQbhwSwRAIABByQdqIQAMAQtEAAAAAAAAAAAhAUHwaCAAIABB8GhMG0GSD2ohAAsgASAAQf8Haq1CNIa/ogs1ACAAIAE3AwAgACACQv///////z+DIARCMIinQYCAAnEgAkIwiKdB//8BcXKtQjCGhDcDCAtkAgF/AX4jAEEQayICJAAgAAJ+IAFFBEBCAAwBCyACIAGtQgAgAWciAUHRAGoQzQIgAikDCEKAgICAgIDAAIVBnoABIAFrrUIwhnwhAyACKQMACzcDACAAIAM3AwggAkEQaiQAC0UBAX8jAEEQayIFJAAgBSABIAIgAyAEQoCAgICAgICAgH+FENECIAUpAwAhASAAIAUpAwg3AwggACABNwMAIAVBEGokAAvEAgEBfyMAQdAAayIEJAACQCADQYCAAU4EQCAEQSBqIAEgAkIAQoCAgICAgID//wAQ0AIgBCkDKCECIAQpAyAhASADQf//AUkEQCADQf//AGshAwwCCyAEQRBqIAEgAkIAQoCAgICAgID//wAQ0AJB/f8CIAMgA0H9/wJOG0H+/wFrIQMgBCkDGCECIAQpAxAhAQwBCyADQYGAf0oNACAEQUBrIAEgAkIAQoCAgICAgIA5ENACIAQpA0ghAiAEKQNAIQEgA0H0gH5LBEAgA0GN/wBqIQMMAQsgBEEwaiABIAJCAEKAgICAgICAORDQAkHogX0gAyADQeiBfUwbQZr+AWohAyAEKQM4IQIgBCkDMCEBCyAEIAEgAkIAIANB//8Aaq1CMIYQ0AIgACAEKQMINwMIIAAgBCkDADcDACAEQdAAaiQAC3UBAX4gACABIAR+IAIgA358IANCIIgiAiABQiCIIgR+fCADQv////8PgyIDIAFC/////w+DIgF+IgVCIIggAyAEfnwiA0IgiHwgASACfiADQv////8Pg3wiAUIgiHw3AwggACAFQv////8PgyABQiCGhDcDAAu+DwIFfw9+IwBB0AJrIgUkACAEQv///////z+DIQsgAkL///////8/gyEKIAIgBIVCgICAgICAgICAf4MhDSAEQjCIp0H//wFxIQgCQAJAIAJCMIinQf//AXEiCUH//wFrQYKAfk8EQCAIQf//AWtBgYB+Sw0BCyABUCACQv///////////wCDIgxCgICAgICAwP//AFQgDEKAgICAgIDA//8AURtFBEAgAkKA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NwMIIAVB0AJqJAAL0QYCBH8DfiMAQYABayIFJAACQAJAAkAgAyAEQgBCABDTAkUNAAJ/IARC////////P4MhCgJ/IARCMIinQf//AXEiBkH//wFHBEBBBCAGDQEaQQJBAyADIAqEUBsMAgsgAyAKhFALCyEGIAJCMIinIghB//8BcSIHQf//AUYNACAGDQELIAVBEGogASACIAMgBBDQAiAFIAUpAxAiAiAFKQMYIgEgAiABENsCIAUpAwghAiAFKQMAIQQMAQsgASACQv///////////wCDIgogAyAEQv///////////wCDIgkQ0wJBAEwEQCABIAogAyAJENMCBEAgASEEDAILIAVB8ABqIAEgAkIAQgAQ0AIgBSkDeCECIAUpA3AhBAwBCyAEQjCIp0H//wFxIQYgBwR+IAEFIAVB4ABqIAEgCkIAQoCAgICAgMC7wAAQ0AIgBSkDaCIKQjCIp0H4AGshByAFKQNgCyEEIAZFBEAgBUHQAGogAyAJQgBCgICAgICAwLvAABDQAiAFKQNYIglCMIinQfgAayEGIAUpA1AhAwsgCUL///////8/g0KAgICAgIDAAIQhCyAKQv///////z+DQoCAgICAgMAAhCEKIAYgB0gEQANAAn4gCiALfSADIARWrX0iCUIAWQRAIAkgBCADfSIEhFAEQCAFQSBqIAEgAkIAQgAQ0AIgBSkDKCECIAUpAyAhBAwFCyAJQgGGIARCP4iEDAELIApCAYYgBEI/iIQLIQogBEIBhiEEIAdBAWsiByAGSg0ACyAGIQcLAkAgCiALfSADIARWrX0iCUIAUwRAIAohCQwBCyAJIAQgA30iBIRCAFINACAFQTBqIAEgAkIAQgAQ0AIgBSkDOCECIAUpAzAhBAwBCyAJQv///////z9YBEADQCAEQj+IIQEgB0EBayEHIARCAYYhBCABIAlCAYaEIglCgICAgICAwABUDQALCyAIQYCAAnEhBiAHQQBMBEAgBUFAayAEIAlC////////P4MgB0H4AGogBnKtQjCGhEIAQoCAgICAgMDDPxDQAiAFKQNIIQIgBSkDQCEEDAELIAlC////////P4MgBiAHcq1CMIaEIQILIAAgBDcDACAAIAI3AwggBUGAAWokAAuLMwMPfwd+AXwjAEEwayIMJAACQCACQQJNBEAgAkECdCICQdyMAWooAgAhDyACQdCMAWooAgAhDgNAAn8gASgCBCICIAEoAmhHBEAgASACQQFqNgIEIAItAAAMAQsgARDMAgsiAkEgRiACQQlrQQVJcg0AC0EBIQYCQAJAIAJBK2sOAwABAAELQX9BASACQS1GGyEGIAEoAgQiAiABKAJoRwRAIAEgAkEBajYCBCACLQAAIQIMAQsgARDMAiECCwJAAkADQCAFQcUJaiwAACACQSByRgRAAkAgBUEGSw0AIAEoAgQiAiABKAJoRwRAIAEgAkEBajYCBCACLQAAIQIMAQsgARDMAiECCyAFQQFqIgVBCEcNAQwCCwsgBUEDRwRAIAVBCEYNASADRQ0CIAVBBEkNAiAFQQhGDQELIAEpA3AiE0IAWQRAIAEgASgCBEEBazYCBAsgA0UNACAFQQRJDQAgE0IAUyECA0AgAkUEQCABIAEoAgRBAWs2AgQLIAVBAWsiBUEDSw0ACwtCACETIwBBEGsiAiQAAn4gBrJDAACAf5S8IgNB/////wdxIgFBgICABGtB////9wdNBEAgAa1CGYZCgICAgICAgMA/fAwBCyADrUIZhkKAgICAgIDA//8AhCABQYCAgPwHTw0AGkIAIAFFDQAaIAIgAa1CACABZyIBQdEAahDNAiACKQMAIRMgAikDCEKAgICAgIDAAIVBif8AIAFrrUIwhoQLIRQgDCATNwMAIAwgFCADQYCAgIB4ca1CIIaENwMIIAJBEGokACAMKQMIIRMgDCkDACEUDAILAkACQAJAIAUNAEEAIQUDQCAFQacbaiwAACACQSByRw0BAkAgBUEBSw0AIAEoAgQiAiABKAJoRwRAIAEgAkEBajYCBCACLQAAIQIMAQsgARDMAiECCyAFQQFqIgVBA0cNAAsMAQsCQAJAIAUOBAABAQIBCwJAIAJBMEcNAAJ/IAEoAgQiBSABKAJoRwRAIAEgBUEBajYCBCAFLQAADAELIAEQzAILQV9xQdgARgRAIwBBsANrIgIkAAJ/IAEoAgQiBSABKAJoRwRAIAEgBUEBajYCBCAFLQAADAELIAEQzAILIQUCQAJ/A0ACQCAFQTBHBEAgBUEuRw0EIAEoAgQiBSABKAJoRg0BIAEgBUEBajYCBCAFLQAADAMLIAEoAgQiBSABKAJoRwRAQQEhCSABIAVBAWo2AgQgBS0AACEFDAILQQEhCSABEMwCIQUMAQsLIAEQzAILIQVBASEEIAVBMEcNAANAAn8gASgCBCIFIAEoAmhHBEAgASAFQQFqNgIEIAUtAAAMAQsgARDMAgshBSAWQgF9IRYgBUEwRg0AC0EBIQkLQoCAgICAgMD/PyEUA0ACQCAFQSByIQsCQAJAIAVBMGsiCEEKSQ0AIAVBLkcgC0HhAGtBBk9xDQIgBUEuRw0AIAQNAkEBIQQgEyEWDAELIAtB1wBrIAggBUE5ShshBQJAIBNCB1cEQCAFIApBBHRqIQoMAQsgE0IcWARAIAJBMGogBRDOAiACQSBqIBggFEIAQoCAgICAgMD9PxDQAiACQRBqIAIpAzAgAikDOCACKQMgIhggAikDKCIUENACIAIgAikDECACKQMYIBUgFxDRAiACKQMIIRcgAikDACEVDAELIAVFDQAgBw0AIAJB0ABqIBggFEIAQoCAgICAgID/PxDQAiACQUBrIAIpA1AgAikDWCAVIBcQ0QIgAikDSCEXQQEhByACKQNAIRULIBNCAXwhE0EBIQkLIAEoAgQiBSABKAJoRwRAIAEgBUEBajYCBCAFLQAAIQUMAgsgARDMAiEFDAELCwJ+IAlFBEACQAJAIAEpA3BCAFkEQCABIAEoAgQiBUEBazYCBCADRQ0BIAEgBUECazYCBCAERQ0CIAEgBUEDazYCBAwCCyADDQELIAFCABDLAgsgAkHgAGogBrdEAAAAAAAAAACiENICIAIpA2AhFSACKQNoDAELIBNCB1cEQCATIRQDQCAKQQR0IQogFEIBfCIUQghSDQALCwJAAkACQCAFQV9xQdAARgRAIAEgAxDeAiIUQoCAgICAgICAgH9SDQMgAwRAIAEpA3BCAFkNAgwDC0IAIRUgAUIAEMsCQgAMBAtCACEUIAEpA3BCAFMNAgsgASABKAIEQQFrNgIEC0IAIRQLIApFBEAgAkHwAGogBrdEAAAAAAAAAACiENICIAIpA3AhFSACKQN4DAELIBYgEyAEG0IChiAUfEIgfSITQQAgD2utVQRAQezWAkHEADYCACACQaABaiAGEM4CIAJBkAFqIAIpA6ABIAIpA6gBQn9C////////v///ABDQAiACQYABaiACKQOQASACKQOYAUJ/Qv///////7///wAQ0AIgAikDgAEhFSACKQOIAQwBCyAPQeIBa6wgE1cEQCAKQQBOBEADQCACQaADaiAVIBdCAEKAgICAgIDA/79/ENECIBUgF0KAgICAgICA/z8Q1AIhASACQZADaiAVIBcgAikDoAMgFSABQQBOIgEbIAIpA6gDIBcgARsQ0QIgE0IBfSETIAIpA5gDIRcgAikDkAMhFSAKQQF0IAFyIgpBAE4NAAsLAn4gEyAPrH1CIHwiFKciAUEAIAFBAEobIA4gFCAOrVMbIgFB8QBOBEAgAkGAA2ogBhDOAiACKQOIAyEWIAIpA4ADIRhCAAwBCyACQeACakGQASABaxDVAhDSAiACQdACaiAGEM4CIAJB8AJqIAIpA+ACIAIpA+gCIAIpA9ACIhggAikD2AIiFhDWAiACKQP4AiEZIAIpA/ACCyEUIAJBwAJqIAogCkEBcUUgFSAXQgBCABDTAkEARyABQSBIcXEiAWoQ1wIgAkGwAmogGCAWIAIpA8ACIAIpA8gCENACIAJBkAJqIAIpA7ACIAIpA7gCIBQgGRDRAiACQaACaiAYIBZCACAVIAEbQgAgFyABGxDQAiACQYACaiACKQOgAiACKQOoAiACKQOQAiACKQOYAhDRAiACQfABaiACKQOAAiACKQOIAiAUIBkQ2AIgAikD8AEiFCACKQP4ASIWQgBCABDTAkUEQEHs1gJBxAA2AgALIAJB4AFqIBQgFiATpxDZAiACKQPgASEVIAIpA+gBDAELQezWAkHEADYCACACQdABaiAGEM4CIAJBwAFqIAIpA9ABIAIpA9gBQgBCgICAgICAwAAQ0AIgAkGwAWogAikDwAEgAikDyAFCAEKAgICAgIDAABDQAiACKQOwASEVIAIpA7gBCyETIAwgFTcDECAMIBM3AxggAkGwA2okACAMKQMYIRMgDCkDECEUDAYLIAEpA3BCAFMNACABIAEoAgRBAWs2AgQLIAEhBSAGIQogAyEJQQAhAUEAIQYjAEGQxgBrIgQkAEEAIA9rIhAgDmshEgJAAn8DQAJAIAJBMEcEQCACQS5HDQQgBSgCBCICIAUoAmhGDQEgBSACQQFqNgIEIAItAAAMAwsgBSgCBCICIAUoAmhHBEBBASEBIAUgAkEBajYCBCACLQAAIQIMAgtBASEBIAUQzAIhAgwBCwsgBRDMAgshAkEBIQcgAkEwRw0AA0ACfyAFKAIEIgEgBSgCaEcEQCAFIAFBAWo2AgQgAS0AAAwBCyAFEMwCCyECIBNCAX0hEyACQTBGDQALQQEhAQsgBEEANgKQBiACQTBrIQggDAJ+AkACQAJAAkACQAJAIAJBLkYiAw0AIAhBCU0NAAwBCwNAAkAgA0EBcQRAIAdFBEAgFCETQQEhBwwCCyABRSEDDAQLIBRCAXwhFCAGQfwPTARAIA0gFKcgAkEwRhshDSAEQZAGaiAGQQJ0aiIBIAsEfyACIAEoAgBBCmxqQTBrBSAICzYCAEEBIQFBACALQQFqIgIgAkEJRiICGyELIAIgBmohBgwBCyACQTBGDQAgBCAEKAKARkEBcjYCgEZB3I8BIQ0LAn8gBSgCBCICIAUoAmhHBEAgBSACQQFqNgIEIAItAAAMAQsgBRDMAgsiAkEwayEIIAJBLkYiAw0AIAhBCkkNAAsLIBMgFCAHGyETAkAgAUUNACACQV9xQcUARw0AAkAgBSAJEN4CIhVCgICAgICAgICAf1INACAJRQ0EQgAhFSAFKQNwQgBTDQAgBSAFKAIEQQFrNgIECyATIBV8IRMMBAsgAUUhAyACQQBIDQELIAUpA3BCAFMNACAFIAUoAgRBAWs2AgQLIANFDQFB7NYCQRw2AgALQgAhFCAFQgAQywJCAAwBCyAEKAKQBiIBRQRAIAQgCrdEAAAAAAAAAACiENICIAQpAwAhFCAEKQMIDAELAkAgFEIJVQ0AIBMgFFINACAOQR5MQQAgASAOdhsNACAEQTBqIAoQzgIgBEEgaiABENcCIARBEGogBCkDMCAEKQM4IAQpAyAgBCkDKBDQAiAEKQMQIRQgBCkDGAwBCyAQQQF2rSATUwRAQezWAkHEADYCACAEQeAAaiAKEM4CIARB0ABqIAQpA2AgBCkDaEJ/Qv///////7///wAQ0AIgBEFAayAEKQNQIAQpA1hCf0L///////+///8AENACIAQpA0AhFCAEKQNIDAELIA9B4gFrrCATVQRAQezWAkHEADYCACAEQZABaiAKEM4CIARBgAFqIAQpA5ABIAQpA5gBQgBCgICAgICAwAAQ0AIgBEHwAGogBCkDgAEgBCkDiAFCAEKAgICAgIDAABDQAiAEKQNwIRQgBCkDeAwBCyALBEAgC0EITARAIARBkAZqIAZBAnRqIgEoAgAhBQNAIAVBCmwhBSALQQFqIgtBCUcNAAsgASAFNgIACyAGQQFqIQYLIBOnIQcCQCANQQlODQAgByANSA0AIAdBEUoNACAHQQlGBEAgBEHAAWogChDOAiAEQbABaiAEKAKQBhDXAiAEQaABaiAEKQPAASAEKQPIASAEKQOwASAEKQO4ARDQAiAEKQOgASEUIAQpA6gBDAILIAdBCEwEQCAEQZACaiAKEM4CIARBgAJqIAQoApAGENcCIARB8AFqIAQpA5ACIAQpA5gCIAQpA4ACIAQpA4gCENACIARB4AFqQQAgB2tBAnRB0IwBaigCABDOAiAEQdABaiAEKQPwASAEKQP4ASAEKQPgASAEKQPoARDbAiAEKQPQASEUIAQpA9gBDAILIA4gB0F9bGpBG2oiAUEeTEEAIAQoApAGIgIgAXYbDQAgBEHgAmogChDOAiAEQdACaiACENcCIARBwAJqIAQpA+ACIAQpA+gCIAQpA9ACIAQpA9gCENACIARBsAJqIAdBAnRBiIwBaigCABDOAiAEQaACaiAEKQPAAiAEKQPIAiAEKQOwAiAEKQO4AhDQAiAEKQOgAiEUIAQpA6gCDAELA0AgBEGQBmogBiICQQFrIgZBAnRqKAIARQ0AC0EAIQsCQCAHQQlvIgFFBEBBACEDDAELQQAhAyABQQlqIAEgB0EASBshAQJAIAJFBEBBACECDAELQYCU69wDQQAgAWtBAnRB0IwBaigCACIGbSEJQQAhCEEAIQUDQCAEQZAGaiAFQQJ0aiINIAggDSgCACINIAZuIhBqIgg2AgAgA0EBakH/D3EgAyAIRSADIAVGcSIIGyEDIAdBCWsgByAIGyEHIAkgDSAGIBBsa2whCCAFQQFqIgUgAkcNAAsgCEUNACAEQZAGaiACQQJ0aiAINgIAIAJBAWohAgsgByABa0EJaiEHCwNAIARBkAZqIANBAnRqIQkCQANAIAdBJE4EQCAHQSRHDQIgCSgCAEHR6fkETw0CCyACQf8PaiEGQQAhCCACIQEDQCABIQIgCK0gBEGQBmogBkH/D3EiBUECdGoiATUCAEIdhnwiE0KBlOvcA1QEf0EABSATIBNCgJTr3AOAIhRCgJTr3AN+fSETIBSnCyEIIAEgE6ciATYCACACIAIgAiAFIAEbIAMgBUYbIAUgAkEBa0H/D3FHGyEBIAVBAWshBiADIAVHDQALIAtBHWshCyAIRQ0ACyABIANBAWtB/w9xIgNGBEAgBEGQBmoiBiABQf4PakH/D3FBAnRqIgIgAigCACAGIAFBAWtB/w9xIgJBAnRqKAIAcjYCAAsgB0EJaiEHIARBkAZqIANBAnRqIAg2AgAMAQsLAkADQCACQQFqQf8PcSEGIARBkAZqIAJBAWtB/w9xQQJ0aiEIA0BBCUEBIAdBLUobIQkCQANAIAMhAUEAIQUCQANAAkAgASAFakH/D3EiAyACRg0AIARBkAZqIANBAnRqKAIAIgMgBUECdEGgjAFqKAIAIg1JDQAgAyANSw0CIAVBAWoiBUEERw0BCwsgB0EkRw0AQgAhE0EAIQVCACEUA0AgAiABIAVqQf8PcSIDRgRAIAJBAWpB/w9xIgJBAnQgBGpBADYCjAYLIARBgAZqIARBkAZqIANBAnRqKAIAENcCIARB8AVqIBMgFEIAQoCAgIDlmreOwAAQ0AIgBEHgBWogBCkD8AUgBCkD+AUgBCkDgAYgBCkDiAYQ0QIgBCkD6AUhFCAEKQPgBSETIAVBAWoiBUEERw0ACyAEQdAFaiAKEM4CIARBwAVqIBMgFCAEKQPQBSAEKQPYBRDQAiAEKQPIBSEUQgAhEyAEKQPABSEVIAtB8QBqIgcgD2siBkEAIAZBAEobIA4gBiAOSCIFGyIDQfAATA0CDAULIAkgC2ohCyACIQMgASACRg0AC0GAlOvcAyAJdiENQX8gCXRBf3MhEEEAIQUgASEDA0AgBEGQBmogAUECdGoiESAFIBEoAgAiESAJdmoiBTYCACADQQFqQf8PcSADIAVFIAEgA0ZxIgUbIQMgB0EJayAHIAUbIQcgECARcSANbCEFIAFBAWpB/w9xIgEgAkcNAAsgBUUNASADIAZHBEAgBEGQBmogAkECdGogBTYCACAGIQIMAwsgCCAIKAIAQQFyNgIADAELCwsgBEGQBWpB4QEgA2sQ1QIQ0gIgBEGwBWogBCkDkAUgBCkDmAUgFSAUENYCIAQpA7gFIRggBCkDsAUhFyAEQYAFakHxACADaxDVAhDSAiAEQaAFaiAVIBQgBCkDgAUgBCkDiAUQ3AIgBEHwBGogFSAUIAQpA6AFIhMgBCkDqAUiFhDYAiAEQeAEaiAXIBggBCkD8AQgBCkD+AQQ0QIgBCkD6AQhFCAEKQPgBCEVCwJAIAFBBGpB/w9xIgkgAkYNAAJAIARBkAZqIAlBAnRqKAIAIglB/8m17gFNBEAgCUUgAUEFakH/D3EgAkZxDQEgBEHwA2ogCrdEAAAAAAAA0D+iENICIARB4ANqIBMgFiAEKQPwAyAEKQP4AxDRAiAEKQPoAyEWIAQpA+ADIRMMAQsgCUGAyrXuAUcEQCAEQdAEaiAKt0QAAAAAAADoP6IQ0gIgBEHABGogEyAWIAQpA9AEIAQpA9gEENECIAQpA8gEIRYgBCkDwAQhEwwBCyAKtyEaIAIgAUEFakH/D3FGBEAgBEGQBGogGkQAAAAAAADgP6IQ0gIgBEGABGogEyAWIAQpA5AEIAQpA5gEENECIAQpA4gEIRYgBCkDgAQhEwwBCyAEQbAEaiAaRAAAAAAAAOg/ohDSAiAEQaAEaiATIBYgBCkDsAQgBCkDuAQQ0QIgBCkDqAQhFiAEKQOgBCETCyADQe8ASg0AIARB0ANqIBMgFkIAQoCAgICAgMD/PxDcAiAEKQPQAyAEKQPYA0IAQgAQ0wINACAEQcADaiATIBZCAEKAgICAgIDA/z8Q0QIgBCkDyAMhFiAEKQPAAyETCyAEQbADaiAVIBQgEyAWENECIARBoANqIAQpA7ADIAQpA7gDIBcgGBDYAiAEKQOoAyEUIAQpA6ADIRUCQCASQQJrIAdB/////wdxTg0AIAQgFEL///////////8AgzcDmAMgBCAVNwOQAyAEQYADaiAVIBRCAEKAgICAgICA/z8Q0AIgBCkDkAMgBCkDmANCgICAgICAgLjAABDUAiEBIAQpA4gDIBQgAUEATiIBGyEUIAQpA4ADIBUgARshFSATIBZCAEIAENMCQQBHIAUgAyAGR3EgBSABG3EgEiABIAtqIgtB7gBqSHJFDQBB7NYCQcQANgIACyAEQfACaiAVIBQgCxDZAiAEKQPwAiEUIAQpA/gCCzcDKCAMIBQ3AyAgBEGQxgBqJAAgDCkDKCETIAwpAyAhFAwECyABKQNwQgBZBEAgASABKAIEQQFrNgIECwwBCwJAAn8gASgCBCICIAEoAmhHBEAgASACQQFqNgIEIAItAAAMAQsgARDMAgtBKEYEQEEBIQUMAQtCgICAgICA4P//ACETIAEpA3BCAFMNAyABIAEoAgRBAWs2AgQMAwsDQAJ/IAEoAgQiAiABKAJoRwRAIAEgAkEBajYCBCACLQAADAELIAEQzAILIgJBwQBrIQYCQAJAIAJBMGtBCkkNACAGQRpJDQAgAkHfAEYNACACQeEAa0EaTw0BCyAFQQFqIQUMAQsLQoCAgICAgOD//wAhEyACQSlGDQIgASkDcCIWQgBZBEAgASABKAIEQQFrNgIECwJAIAMEQCAFDQEMBAsMAQsDQCAFQQFrIQUgFkIAWQRAIAEgASgCBEEBazYCBAsgBQ0ACwwCC0Hs1gJBHDYCACABQgAQywILQgAhEwsgACAUNwMAIAAgEzcDCCAMQTBqJAALmQQCBH8BfgJAAkACQAJAAkACfyAAKAIEIgIgACgCaEcEQCAAIAJBAWo2AgQgAi0AAAwBCyAAEMwCCyICQStrDgMAAQABCwJ/IAAoAgQiAyAAKAJoRwRAIAAgA0EBajYCBCADLQAADAELIAAQzAILIQMgAkEtRiEFIANBOmshBCABRQ0BIARBdUsNASAAKQNwQgBTDQIgACAAKAIEQQFrNgIEDAILIAJBOmshBCACIQMLIARBdkkNACADQTBrIgRBCkkEQEEAIQIDQCADIAJBCmxqIQECfyAAKAIEIgIgACgCaEcEQCAAIAJBAWo2AgQgAi0AAAwBCyAAEMwCCyIDQTBrIgRBCU0gAUEwayICQcyZs+YASHENAAsgAqwhBgsCQCAEQQpPDQADQCADrSAGQgp+fCEGAn8gACgCBCIBIAAoAmhHBEAgACABQQFqNgIEIAEtAAAMAQsgABDMAgshAyAGQjB9IQYgA0EwayIEQQlLDQEgBkKuj4XXx8LrowFTDQALCyAEQQpJBEADQAJ/IAAoAgQiASAAKAJoRwRAIAAgAUEBajYCBCABLQAADAELIAAQzAILQTBrQQpJDQALCyAAKQNwQgBZBEAgACAAKAIEQQFrNgIEC0IAIAZ9IAYgBRshBgwBC0KAgICAgICAgIB/IQYgACkDcEIAUw0AIAAgACgCBEEBazYCBEKAgICAgICAgIB/DwsgBgu2AwIDfwF+IwBBIGsiAyQAAkAgAUL///////////8AgyIFQoCAgICAgMDAP30gBUKAgICAgIDAv8AAfVQEQCABQhmIpyEEIABQIAFC////D4MiBUKAgIAIVCAFQoCAgAhRG0UEQCAEQYGAgIAEaiECDAILIARBgICAgARqIQIgACAFQoCAgAiFhEIAUg0BIAIgBEEBcWohAgwBCyAAUCAFQoCAgICAgMD//wBUIAVCgICAgICAwP//AFEbRQRAIAFCGYinQf///wFxQYCAgP4HciECDAELQYCAgPwHIQIgBUL///////+/v8AAVg0AQQAhAiAFQjCIpyIEQZH+AEkNACADQRBqIAAgAUL///////8/g0KAgICAgIDAAIQiBSAEQYH+AGsQzQIgAyAAIAVBgf8AIARrEM8CIAMpAwgiAEIZiKchAiADKQMAIAMpAxAgAykDGIRCAFKthCIFUCAAQv///w+DIgBCgICACFQgAEKAgIAIURtFBEAgAkEBaiECDAELIAUgAEKAgIAIhYRCAFINACACQQFxIAJqIQILIANBIGokACACIAFCIIinQYCAgIB4cXK+C9MDAgJ+An8jAEEgayIEJAACQCABQv///////////wCDIgNCgICAgICAwIA8fSADQoCAgICAgMD/wwB9VARAIAFCBIYgAEI8iIQhAyAAQv//////////D4MiAEKBgICAgICAgAhaBEAgA0KBgICAgICAgMAAfCECDAILIANCgICAgICAgIBAfSECIABCgICAgICAgIAIUg0BIAIgA0IBg3whAgwBCyAAUCADQoCAgICAgMD//wBUIANCgICAgICAwP//AFEbRQRAIAFCBIYgAEI8iIRC/////////wODQoCAgICAgID8/wCEIQIMAQtCgICAgICAgPj/ACECIANC////////v//DAFYNAEIAIQIgA0IwiKciBUGR9wBJDQAgBEEQaiAAIAFC////////P4NCgICAgICAwACEIgIgBUGB9wBrEM0CIAQgACACQYH4ACAFaxDPAiAEKQMIQgSGIAQpAwAiAEI8iIQhAiAEKQMQIAQpAxiEQgBSrSAAQv//////////D4OEIgBCgYCAgICAgIAIWgRAIAJCAXwhAgwBCyAAQoCAgICAgICACFINACACQgGDIAJ8IQILIARBIGokACACIAFCgICAgICAgICAf4OEvwvFAgEEfyADQazcAiADGyIFKAIAIQMCQAJ/AkAgAUUEQCADDQFBAA8LQX4gAkUNARoCQCADBEAgAiEEDAELIAEtAAAiA8AiBEEATgRAIAAEQCAAIAM2AgALIARBAEcPC0GI3AIoAgAoAgBFBEBBASAARQ0DGiAAIAEsAABB/78DcTYCAEEBDwsgAS0AAEHCAWsiA0Ey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KAIAIgAgCGtBnwFKDQAgCigCACEBIAkgAEEEajYCACAAIAE2AgALIAQgBCgCACIAQQFqNgIAIAAgBjoAAEEAIQAgBUHUAEoNASAKIAooAgBBAWo2AgAMAQtBfyEACyAMQRBqJAAgAAvfBQEBfyMAQfACayIAJAAgACACNgLoAiAAIAE2AuwCIABBzAFqIAMgAEHgAWogAEHcAWogAEHYAWoQtQMGQCMAQRBrIgIkACAAQcABaiIBQgA3AgAgAUEANgIIIAJBEGokACABIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQoAIgAAJ/IAEtAAtBB3YEQCABKAIADAELIAELIgI2ArwBIAAgAEEQajYCDCAAQQA2AgggAEEBOgAHIABBxQA6AAYDQAJAIABB7AJqIABB6AJqEJkCDQAgACgCvAECfyABLQALQQd2BEAgASgCBAwBCyABLQALQf8AcQsgAmpGBEACfyABLQALQQd2BEAgASgCBAwBCyABLQALQf8AcQshAyABAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0AC0H/AHELQQF0EKACIAEgAS0AC0EHdgR/IAEoAghB/////wdxQQFrBUEKCxCgAiAAIAMCfyABLQALQQd2BEAgASgCAAwBCyABCyICajYCvAELAn8gACgC7AIiAygCDCIGIAMoAhBGBEAgAyADKAIAKAIkEQEADAELIAYoAgALIABBB2ogAEEGaiACIABBvAFqIAAoAtwBIAAoAtgBIABBzAFqIABBEGogAEEMaiAAQQhqIABB4AFqELYDDQAgAEHsAmoQmgIaDAELCwJAAn8gAC0A1wFBB3YEQCAAKALQAQwBCyAALQDXAUH/AHELRQ0AIAAtAAdFDQAgACgCDCIDIABBEGprQZ8BSg0AIAAgA0EEajYCDCADIAAoAgg2AgALIAUgAiAAKAK8ASAEEKEDOQMAIABBzAFqIABBEGogACgCDCAEEJMDIABB7AJqIABB6AJqEJkCIQIZIAAkACABEKgFGiAAQcwBahCoBRoJAAsgAgRAIAQgBCgCAEECcjYCAAsgACgC7AIhAiABEKgFGiAAQcwBahCoBRogAEHwAmokACACC/YFAgF/AX4jAEGAA2siACQAIAAgAjYC+AIgACABNgL8AiAAQdwBaiADIABB8AFqIABB7AFqIABB6AFqELUDBkAjAEEQayICJAAgAEHQAWoiAUIANwIAIAFBADYCCCACQRBqJAAgASABLQALQQd2BH8gASgCCEH/////B3FBAWsFQQoLEKACIAACfyABLQALQQd2BEAgASgCAAwBCyABCyICNgLMASAAIABBIGo2AhwgAEEANgIYIABBAToAFyAAQcUAOgAWA0ACQCAAQfwCaiAAQfgCahCZAg0AIAAoAswBAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0AC0H/AHELIAJqRgRAAn8gAS0AC0EHdgRAIAEoAgQMAQsgAS0AC0H/AHELIQMgAQJ/IAEtAAtBB3YEQCABKAIEDAELIAEtAAtB/wBxC0EBdBCgAiABIAEtAAtBB3YEfyABKAIIQf////8HcUEBawVBCgsQoAIgACADAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsiAmo2AswBCwJ/IAAoAvwCIgMoAgwiBiADKAIQRgRAIAMgAygCACgCJBEBAAwBCyAGKAIACyAAQRdqIABBFmogAiAAQcwBaiAAKALsASAAKALoASAAQdwBaiAAQSBqIABBHGogAEEYaiAAQfABahC2Aw0AIABB/AJqEJoCGgwBCwsCQAJ/IAAtAOcBQQd2BEAgACgC4AEMAQsgAC0A5wFB/wBxC0UNACAALQAXRQ0AIAAoAhwiAyAAQSBqa0GfAUoNACAAIANBBGo2AhwgAyAAKAIYNgIACyAAIAIgACgCzAEgBBCjAyAAKQMIIQcgBSAAKQMANwMAIAUgBzcDCCAAQdwBaiAAQSBqIAAoAhwgBBCTAyAAQfwCaiAAQfgCahCZAiECGSAAJAAgARCoBRogAEHcAWoQqAUaCQALIAIEQCAEIAQoAgBBAnI2AgALIAAoAvwCIQIgARCoBRogAEHcAWoQqAUaIABBgANqJAAgAguyBgECfyMAQcACayIAJAAgACACNgK4AiAAIAE2ArwCIwBBEGsiASQAIABBxAFqIgZCADcCACAGQQA2AgggAUEQaiQABkAgAEEQaiICIAMoAhwiATYCACABIAEoAgRBAWo2AgQGQCACEJgCIgFBkK4BQaquASAAQdABaiABKAIAKAIwEQYAGhkgACQABkAgACgCECIBIAEoAgRBAWsiAjYCBCACQX9GBEAgASABKAIAKAIIEQIACxgCCQALBkAgACgCECIBIAEoAgRBAWsiAjYCBCACQX9GBEAgASABKAIAKAIIEQIACxgBBkAjAEEQayIBJAAgAEG4AWoiAkIANwIAIAJBADYCCCABQRBqJAAgAiACLQALQQd2BH8gAigCCEH/////B3FBAWsFQQoLEKACIAACfyACLQALQQd2BEAgAigCAAwBCyACCyIBNgK0ASAAIABBEGo2AgwgAEEANgIIA0ACQCAAQbwCaiAAQbgCahCZAg0AIAAoArQBAn8gAi0AC0EHdgRAIAIoAgQMAQsgAi0AC0H/AHELIAFqRgRAAn8gAi0AC0EHdgRAIAIoAgQMAQsgAi0AC0H/AHELIQMgAgJ/IAItAAtBB3YEQCACKAIEDAELIAItAAtB/wBxC0EBdBCgAiACIAItAAtBB3YEfyACKAIIQf////8HcUEBawVBCgsQoAIgACADAn8gAi0AC0EHdgRAIAIoAgAMAQsgAgsiAWo2ArQBCwJ/IAAoArwCIgMoAgwiByADKAIQRgRAIAMgAygCACgCJBEBAAwBCyAHKAIAC0EQIAEgAEG0AWogAEEIakEAIAYgAEEQaiAAQQxqIABB0AFqEK8DDQAgAEG8AmoQmgIaDAELCyACIAAoArQBIAFrEKACAn8gAi0AC0EHdgRAIAIoAgAMAQsgAgshARClAyEDIAAgBTYCACABIAMgABCmA0EBRwRAIARBBDYCAAsgAEG8AmogAEG4AmoQmQIhARkgACQAIAIQqAUaCQALGSAAJAAgBhCoBRoJAAsgAQRAIAQgBCgCAEECcjYCAAsgACgCvAIhASACEKgFGiAGEKgFGiAAQcACaiQAIAELMQAgAigCACECA0ACQCAAIAFHBH8gACgCACACRw0BIAAFIAELDwsgAEEEaiEADAALAAvkAgEBfyMAQSBrIgUkACAFIAE2AhwCQCACKAIEQQFxRQRAIAAgASACIAMgBCAAKAIAKAIYEQkAIQIMAQsgBUEQaiIBIAIoAhwiADYCACAAIAAoAgRBAWo2AgQGQCABEIkDIQAZIAUkACAFKAIQIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAUoAhAiASABKAIEQQFrIgI2AgQgAkF/RgRAIAEgASgCACgCCBECAAsCQCAEBEAgBUEQaiAAIAAoAgAoAhgRAAAMAQsgBUEQaiAAIAAoAgAoAhwRAAALIAUgBUEQahC8AzYCDANAIAUgBUEQahC9AzYCCCAFKAIMIAUoAghGBEAgBSgCHCECIAVBEGoQqAUaDAILBkAgBUEcaiAFKAIMLAAAEJUCGSAFJAAgBUEQahCoBRoJAAsgBSAFKAIMQQFqNgIMDAALAAsgBUEgaiQAIAILOQEBfyMAQRBrIgEkACABAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAs2AgwgASgCDCEAIAFBEGokACAAC1gBAX8jAEEQayIBJAAgAQJ/IAAtAAtBB3YEQCAAKAIADAELIAALAn8gAC0AC0EHdgRAIAAoAgQMAQsgAC0AC0H/AHELajYCDCABKAIMIQAgAUEQaiQAIAALjgIBBH8jAEFAaiIAJAAgAEIlNwM4IABBOGoiBUEBckHZHUEBIAIoAgQQvwMQpQMhBiAAIAQ2AgAgAEEraiIEIARBDSAGIAUgABDAAyAEaiIGIAIQwQMhByAAQQRqIgggAigCHCIFNgIAIAUgBSgCBEEBajYCBAZAIAQgByAGIABBEGogAEEMaiAAQQhqIAgQwgMZIAAkACAAKAIEIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAAoAgQiBCAEKAIEQQFrIgU2AgQgBUF/RgRAIAQgBCgCACgCCBECAAsgASAAQRBqIAAoAgwgACgCCCACIAMQwwMhASAAQUBrJAAgAQusAQEBfwJAIANBgBBxRQ0AIANBygBxIgRBCEYNACAEQcAARg0AIAJFDQAgAEErOgAAIABBAWohAAsgA0GABHEEQCAAQSM6AAAgAEEBaiEACwNAIAEtAAAiBARAIAAgBDoAACAAQQFqIQAgAUEBaiEBDAELCyAAAn9B7wAgA0HKAHEiAUHAAEYNABpB2ABB+AAgA0GAgAFxGyABQQhGDQAaQeQAQfUAIAIbCzoAAAttAQF/IwBBEGsiBSQAIAUgAjYCDCAFIAQ2AgggBUEEaiAFQQxqEKgDIQIgACABIAMgBSgCCBD2AiEBIAIoAgAiAARAQYjcAigCABogAARAQYjcAkGA2wIgACAAQX9GGzYCAAsLIAVBEGokACABC2QAIAIoAgRBsAFxIgJBIEYEQCABDwsCQCACQRBHDQACQAJAIAAtAAAiAkEraw4DAAEAAQsgAEEBag8LIAEgAGtBAkgNACACQTBHDQAgAC0AAUEgckH4AEcNACAAQQJqIQALIAALiQUBCH8jAEEQayIJJAAgBhCHAiEKIAlBBGoiByAGEIkDIgggCCgCACgCFBEAAAZAAkACfyAHLQALQQd2BEAgBygCBAwBCyAHLQALQf8AcQtFBEAgCiAAIAIgAyAKKAIAKAIgEQYAGiAFIAMgAiAAa2oiBjYCAAwBCyAFIAM2AgACQAJAIAAiCy0AACIGQStrDgMAAQABCyAKIAbAIAooAgAoAhwRAwAhByAFIAUoAgAiBkEBajYCACAGIAc6AAAgAEEBaiELCwJAIAIgC2tBAkgNACALLQAAQTBHDQAgCy0AAUEgckH4AEcNACAKQTAgCigCACgCHBEDACEHIAUgBSgCACIGQQFqNgIAIAYgBzoAACAKIAssAAEgCigCACgCHBEDACEHIAUgBSgCACIGQQFqNgIAIAYgBzoAACALQQJqIQsLIAsgAhDfAyAIIAgoAgAoAhARAQAhDUEAIQcgCyEGA0AgAiAGTQRAIAMgCyAAa2ogBSgCABDfAyAFKAIAIQYMAgsCQAJ/IAlBBGoiCC0AC0EHdgRAIAgoAgAMAQsgCAsgB2otAABFDQAgDAJ/IAlBBGoiCC0AC0EHdgRAIAgoAgAMAQsgCAsgB2osAABHDQAgBSAFKAIAIghBAWo2AgAgCCANOgAAIAcgBwJ/IAktAA9BB3YEQCAJKAIIDAELIAktAA9B/wBxC0EBa0lqIQdBACEMCyAKIAYsAAAgCigCACgCHBEDACEOIAUgBSgCACIIQQFqNgIAIAggDjoAACAGQQFqIQYgDEEBaiEMDAALAAsZIAkkACAJQQRqEKgFGgkACyAEIAYgAyABIABraiABIAJGGzYCACAJQQRqEKgFGiAJQRBqJAAL7QEBBH8jAEEQayIHJAACQCAARQ0AIAQoAgwhBiACIAFrIghBAEoEQCAAIAEgCCAAKAIAKAIwEQQAIAhHDQELIAYgAyABayIBa0EAIAEgBkgbIgZBAEoEQAZABkAgB0EEaiAGIAUQzwMhARgDIAACfyABLQALQQd2BEAgASgCAAwBCyABCyAGIAAoAgAoAjARBAAhBRkgByQAIAEQqAUaCQALIAEQqAUaIAUgBkcNAQsgAyACayIBQQBKBEAgACACIAEgACgCACgCMBEEACABRw0BCyAEKAIMGiAEQQA2AgwgACEJCyAHQRBqJAAgCQuSAgEFfyMAQfAAayIAJAAgAEIlNwNoIABB6ABqIgZBAXJBsBxBASACKAIEEL8DEKUDIQcgACAENwMAIABB0ABqIgUgBUEYIAcgBiAAEMADIAVqIgcgAhDBAyEIIABBFGoiCSACKAIcIgY2AgAgBiAGKAIEQQFqNgIEBkAgBSAIIAcgAEEgaiAAQRxqIABBGGogCRDCAxkgACQAIAAoAhQiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgACgCFCIFIAUoAgRBAWsiBjYCBCAGQX9GBEAgBSAFKAIAKAIIEQIACyABIABBIGogACgCHCAAKAIYIAIgAxDDAyEBIABB8ABqJAAgAQuOAgEEfyMAQUBqIgAkACAAQiU3AzggAEE4aiIFQQFyQdkdQQAgAigCBBC/AxClAyEGIAAgBDYCACAAQStqIgQgBEENIAYgBSAAEMADIARqIgYgAhDBAyEHIABBBGoiCCACKAIcIgU2AgAgBSAFKAIEQQFqNgIEBkAgBCAHIAYgAEEQaiAAQQxqIABBCGogCBDCAxkgACQAIAAoAgQiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgACgCBCIEIAQoAgRBAWsiBTYCBCAFQX9GBEAgBCAEKAIAKAIIEQIACyABIABBEGogACgCDCAAKAIIIAIgAxDDAyEBIABBQGskACABC5ICAQV/IwBB8ABrIgAkACAAQiU3A2ggAEHoAGoiBkEBckGwHEEAIAIoAgQQvwMQpQMhByAAIAQ3AwAgAEHQAGoiBSAFQRggByAGIAAQwAMgBWoiByACEMEDIQggAEEUaiIJIAIoAhwiBjYCACAGIAYoAgRBAWo2AgQGQCAFIAggByAAQSBqIABBHGogAEEYaiAJEMIDGSAAJAAgACgCFCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAAKAIUIgUgBSgCBEEBayIGNgIEIAZBf0YEQCAFIAUoAgAoAggRAgALIAEgAEEgaiAAKAIcIAAoAhggAiADEMMDIQEgAEHwAGokACABCw0AIAEgAiADIAQQyAMLjgUBCX8jAEHQAWsiBCQAIARCJTcDyAEgBEHIAWpBAXJB0sgAIAEoAgQQyQMhBiAEIARBoAFqNgKcARClAyEFAn8gBgRAIAEoAgghCCAEIAM5AyggBCAINgIgIARBoAFqQR4gBSAEQcgBaiAEQSBqEMADDAELIAQgAzkDMCAEQaABakEeIAUgBEHIAWogBEEwahDAAwshBSAEQcgBNgJQIARBlAFqQQAgBEHQAGoQpgIhCCAEQaABaiIJIQcCQAZAIAVBHk4EQAJ/IAYEQBClAyEFIAEoAgghByAEIAM5AwggBCAHNgIAIARBnAFqIAUgBEHIAWogBBDKAwwBCxClAyEFIAQgAzkDECAEQZwBaiAFIARByAFqIARBEGoQygMLIgVBf0YEQBCdBQwDCyAIIAQoApwBEIwDIAQoApwBIQcLIAcgBSAHaiIKIAEQwQMhCyAEQcgBNgJEIARByABqQQAgBEHEAGoQpgIhBwZAAkAgBCgCnAEgBEGgAWpGBEAgBEHQAGohBQwBCyAFQQF0ENYBIgVFBEAQnQUMBAsgByAFEIwDIAQoApwBIQkLIARBPGoiDCABKAIcIgY2AgAgBiAGKAIEQQFqNgIEBkAgCSALIAogBSAEQcQAaiAEQUBrIAwQywMZIAQkAAZAIAQoAjwiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsYBAkACwZAIAQoAjwiBiAGKAIEQQFrIgk2AgQgCUF/RgRAIAYgBigCACgCCBECAAsYAyAAIAUgBCgCRCAEKAJAIAEgAhDDAyEAGSAEJAAgBxCNAwkACxkgBCQAIAgQjQMJAAsgBxCNAyAIEI0DIARB0AFqJAAgAA8LAAvQAQECfyACQYAQcQRAIABBKzoAACAAQQFqIQALIAJBgAhxBEAgAEEjOgAAIABBAWohAAsgAkGEAnEiA0GEAkcEQCAAQa7UADsAACAAQQJqIQALIAJBgIABcSECA0AgAS0AACIEBEAgACAEOgAAIABBAWohACABQQFqIQEMAQsLIAACfwJAIANBgAJHBEAgA0EERw0BQcYAQeYAIAIbDAILQcUAQeUAIAIbDAELQcEAQeEAIAIbIANBhAJGDQAaQccAQecAIAIbCzoAACADQYQCRwv1AQEDfyMAQRBrIgQkACAEIAE2AgwgBCADNgIIIARBBGogBEEMahCoAyEGBkAgBCgCCCEFIwBBEGsiAyQAIAMgBTYCDCADIAU2AghBfyEBAkBBAEEAIAIgBRD2AiIFQQBIDQAgACAFQQFqIgUQ1gEiADYCACAARQ0AIAAgBSACIAMoAgwQ9gIhAQsgA0EQaiQAGSAEJAAgBigCACIABEBBiNwCKAIAGiAABEBBiNwCQYDbAiAAIABBf0YbNgIACwsJAAsgBigCACIABEBBiNwCKAIAGiAABEBBiNwCQYDbAiAAIABBf0YbNgIACwsgBEEQaiQAIAELjgcBCn8jAEEQayIJJAAgBhCHAiEIIAlBBGogBhCJAyIOIgYgBigCACgCFBEAACAFIAM2AgAGQAJAAkAgACIHLQAAIgZBK2sOAwABAAELIAggBsAgCCgCACgCHBEDACEGIAUgBSgCACIHQQFqNgIAIAcgBjoAACAAQQFqIQcLAkACQCACIAciBmtBAUwNACAHLQAAQTBHDQAgBy0AAUEgckH4AEcNACAIQTAgCCgCACgCHBEDACEGIAUgBSgCACIKQQFqNgIAIAogBjoAACAIIAcsAAEgCCgCACgCHBEDACEGIAUgBSgCACIKQQFqNgIAIAogBjoAACAHQQJqIgchBgNAIAIgBk0NAiAGLAAAIQoQpQMaIApBMGtBCkkgCkEgckHhAGtBBklyRQ0CIAZBAWohBgwACwALA0AgAiAGTQ0BIAYsAAAhChClAxogCkEwa0EKTw0BIAZBAWohBgwACwALAkACfyAJLQAPQQd2BEAgCSgCCAwBCyAJLQAPQf8AcQtFBEAgCCAHIAYgBSgCACAIKAIAKAIgEQYAGiAFIAUoAgAgBiAHa2o2AgAMAQsgByAGEN8DIA4gDigCACgCEBEBACEPIAchCgNAIAYgCk0EQCADIAcgAGtqIAUoAgAQ3wMMAgsCQAJ/IAlBBGoiDC0AC0EHdgRAIAwoAgAMAQsgDAsgC2osAABBAEwNACANAn8gCUEEaiIMLQALQQd2BEAgDCgCAAwBCyAMCyALaiwAAEcNACAFIAUoAgAiDUEBajYCACANIA86AAAgCyALAn8gCS0AD0EHdgRAIAkoAggMAQsgCS0AD0H/AHELQQFrSWohC0EAIQ0LIAggCiwAACAIKAIAKAIcEQMAIQwgBSAFKAIAIhBBAWo2AgAgECAMOgAAIApBAWohCiANQQFqIQ0MAAsACwNAAkAgAiAGSwRAIAYtAAAiB0EuRw0BIA4gDigCACgCDBEBACEHIAUgBSgCACILQQFqNgIAIAsgBzoAACAGQQFqIQYLIAggBiACIAUoAgAgCCgCACgCIBEGABogBSAFKAIAIAIgBmtqIgU2AgAgBCAFIAMgASAAa2ogASACRhs2AgAgCUEEahCoBRogCUEQaiQADwsgCCAHwCAIKAIAKAIcEQMAIQcgBSAFKAIAIgtBAWo2AgAgCyAHOgAAIAZBAWohBgwACwAZIAkkACAJQQRqEKgFGgkACwALDwAgASACIAMgBCAFEM0DC7AFAQl/IwBBgAJrIgUkACAFQiU3A/gBIAVB+AFqQQFyQZwqIAEoAgQQyQMhByAFIAVB0AFqNgLMARClAyEGAn8gBwRAIAEoAgghCSAFQUBrIAQ3AwAgBSADNwM4IAUgCTYCMCAFQdABakEeIAYgBUH4AWogBUEwahDAAwwBCyAFIAM3A1AgBSAENwNYIAVB0AFqQR4gBiAFQfgBaiAFQdAAahDAAwshBiAFQcgBNgKAASAFQcQBakEAIAVBgAFqEKYCIQkgBUHQAWoiCiEIAkAGQCAGQR5OBEACfyAHBEAQpQMhBiABKAIIIQggBSAENwMQIAUgAzcDCCAFIAg2AgAgBUHMAWogBiAFQfgBaiAFEMoDDAELEKUDIQYgBSADNwMgIAUgBDcDKCAFQcwBaiAGIAVB+AFqIAVBIGoQygMLIgZBf0YEQBCdBQwDCyAJIAUoAswBEIwDIAUoAswBIQgLIAggBiAIaiILIAEQwQMhDCAFQcgBNgJ0IAVB+ABqQQAgBUH0AGoQpgIhCAZAAkAgBSgCzAEgBUHQAWpGBEAgBUGAAWohBgwBCyAGQQF0ENYBIgZFBEAQnQUMBAsgCCAGEIwDIAUoAswBIQoLIAVB7ABqIg0gASgCHCIHNgIAIAcgBygCBEEBajYCBAZAIAogDCALIAYgBUH0AGogBUHwAGogDRDLAxkgBSQABkAgBSgCbCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACxgECQALBkAgBSgCbCIHIAcoAgRBAWsiCjYCBCAKQX9GBEAgByAHKAIAKAIIEQIACxgDIAAgBiAFKAJ0IAUoAnAgASACEMMDIQAZIAUkACAIEI0DCQALGSAFJAAgCRCNAwkACyAIEI0DIAkQjQMgBUGAAmokACAADwsAC4sCAQV/IwBB4ABrIgAkABClAyEFIAAgBDYCACAAQUBrIgQgBCAEQRQgBUHXGSAAEMADIghqIgUgAhDBAyEHIABBDGoiBiACKAIcIgQ2AgAgBCAEKAIEQQFqNgIEBkAgBhCHAiEGGSAAJAAgACgCDCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAAKAIMIgQgBCgCBEEBayIJNgIEIAlBf0YEQCAEIAQoAgAoAggRAgALIAYgAEFAayAFIABBEGoiBCAGKAIAKAIgEQYAGiABIAQgBCAIaiIBIAcgAGsgAGpBMGsgBSAHRhsgASACIAMQwwMhASAAQeAAaiQAIAEL/gEBA38jAEEQayIFJAAjAEEQayIDJAACQCABQe////8HTQRAAkAgAUELSQRAIAAgAC0AC0GAAXEgAXI6AAsgACAALQALQf8AcToACyAAIQQMAQsgA0EIaiAAIAFBC08EfyABQRBqQXBxIgQgBEEBayIEIARBC0YbBUEKC0EBahC9AiADKAIMGiAAIAMoAggiBDYCACAAIAAoAghBgICAgHhxIAMoAgxB/////wdxcjYCCCAAIAAoAghBgICAgHhyNgIIIAAgATYCBAsgBCABIAIQqgUgA0EAOgAHIAEgBGogAy0ABzoAACADQRBqJAAMAQsQLgALIAVBEGokACAAC+QCAQF/IwBBIGsiBSQAIAUgATYCHAJAIAIoAgRBAXFFBEAgACABIAIgAyAEIAAoAgAoAhgRCQAhAgwBCyAFQRBqIgEgAigCHCIANgIAIAAgACgCBEEBajYCBAZAIAEQqgMhABkgBSQAIAUoAhAiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgBSgCECIBIAEoAgRBAWsiAjYCBCACQX9GBEAgASABKAIAKAIIEQIACwJAIAQEQCAFQRBqIAAgACgCACgCGBEAAAwBCyAFQRBqIAAgACgCACgCHBEAAAsgBSAFQRBqELwDNgIMA0AgBSAFQRBqENEDNgIIIAUoAgwgBSgCCEYEQCAFKAIcIQIgBUEQahCxBRoMAgsGQCAFQRxqIAUoAgwoAgAQnAIZIAUkACAFQRBqELEFGgkACyAFIAUoAgxBBGo2AgwMAAsACyAFQSBqJAAgAgtbAQF/IwBBEGsiASQAIAECfyAALQALQQd2BEAgACgCAAwBCyAACwJ/IAAtAAtBB3YEQCAAKAIEDAELIAAtAAtB/wBxC0ECdGo2AgwgASgCDCEAIAFBEGokACAAC5MCAQR/IwBBkAFrIgAkACAAQiU3A4gBIABBiAFqIgVBAXJB2R1BASACKAIEEL8DEKUDIQYgACAENgIAIABB+wBqIgQgBEENIAYgBSAAEMADIARqIgYgAhDBAyEHIABBBGoiCCACKAIcIgU2AgAgBSAFKAIEQQFqNgIEBkAgBCAHIAYgAEEQaiAAQQxqIABBCGogCBDTAxkgACQAIAAoAgQiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgACgCBCIEIAQoAgRBAWsiBTYCBCAFQX9GBEAgBCAEKAIAKAIIEQIACyABIABBEGogACgCDCAAKAIIIAIgAxDUAyEBIABBkAFqJAAgAQuSBQEIfyMAQRBrIgkkACAGEJgCIQogCUEEaiIHIAYQqgMiCCAIKAIAKAIUEQAABkACQAJ/IActAAtBB3YEQCAHKAIEDAELIActAAtB/wBxC0UEQCAKIAAgAiADIAooAgAoAjARBgAaIAUgAyACIABrQQJ0aiIGNgIADAELIAUgAzYCAAJAAkAgACILLQAAIgZBK2sOAwABAAELIAogBsAgCigCACgCLBEDACEHIAUgBSgCACIGQQRqNgIAIAYgBzYCACAAQQFqIQsLAkAgAiALa0ECSA0AIAstAABBMEcNACALLQABQSByQfgARw0AIApBMCAKKAIAKAIsEQMAIQcgBSAFKAIAIgZBBGo2AgAgBiAHNgIAIAogCywAASAKKAIAKAIsEQMAIQcgBSAFKAIAIgZBBGo2AgAgBiAHNgIAIAtBAmohCwsgCyACEN8DIAggCCgCACgCEBEBACENQQAhByALIQYDQCACIAZNBEAgAyALIABrQQJ0aiAFKAIAEOADIAUoAgAhBgwCCwJAAn8gCUEEaiIILQALQQd2BEAgCCgCAAwBCyAICyAHai0AAEUNACAMAn8gCUEEaiIILQALQQd2BEAgCCgCAAwBCyAICyAHaiwAAEcNACAFIAUoAgAiCEEEajYCACAIIA02AgAgByAHAn8gCS0AD0EHdgRAIAkoAggMAQsgCS0AD0H/AHELQQFrSWohB0EAIQwLIAogBiwAACAKKAIAKAIsEQMAIQ4gBSAFKAIAIghBBGo2AgAgCCAONgIAIAZBAWohBiAMQQFqIQwMAAsACxkgCSQAIAlBBGoQqAUaCQALIAQgBiADIAEgAGtBAnRqIAEgAkYbNgIAIAlBBGoQqAUaIAlBEGokAAv6AQEEfyMAQRBrIgckAAJAIABFDQAgBCgCDCEGIAIgAWsiCEEASgRAIAAgASAIQQJ2IgggACgCACgCMBEEACAIRw0BCyAGIAMgAWtBAnUiAWtBACABIAZIGyIGQQBKBEAGQAZAIAdBBGogBiAFEN4DIQEYAyAAAn8gAS0AC0EHdgRAIAEoAgAMAQsgAQsgBiAAKAIAKAIwEQQAIQUZIAckACABELEFGgkACyABELEFGiAFIAZHDQELIAMgAmsiAUEASgRAIAAgAiABQQJ2IgEgACgCACgCMBEEACABRw0BCyAEKAIMGiAEQQA2AgwgACEJCyAHQRBqJAAgCQuTAgEFfyMAQYACayIAJAAgAEIlNwP4ASAAQfgBaiIGQQFyQbAcQQEgAigCBBC/AxClAyEHIAAgBDcDACAAQeABaiIFIAVBGCAHIAYgABDAAyAFaiIHIAIQwQMhCCAAQRRqIgkgAigCHCIGNgIAIAYgBigCBEEBajYCBAZAIAUgCCAHIABBIGogAEEcaiAAQRhqIAkQ0wMZIAAkACAAKAIUIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAAoAhQiBSAFKAIEQQFrIgY2AgQgBkF/RgRAIAUgBSgCACgCCBECAAsgASAAQSBqIAAoAhwgACgCGCACIAMQ1AMhASAAQYACaiQAIAELkwIBBH8jAEGQAWsiACQAIABCJTcDiAEgAEGIAWoiBUEBckHZHUEAIAIoAgQQvwMQpQMhBiAAIAQ2AgAgAEH7AGoiBCAEQQ0gBiAFIAAQwAMgBGoiBiACEMEDIQcgAEEEaiIIIAIoAhwiBTYCACAFIAUoAgRBAWo2AgQGQCAEIAcgBiAAQRBqIABBDGogAEEIaiAIENMDGSAAJAAgACgCBCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAAKAIEIgQgBCgCBEEBayIFNgIEIAVBf0YEQCAEIAQoAgAoAggRAgALIAEgAEEQaiAAKAIMIAAoAgggAiADENQDIQEgAEGQAWokACABC5MCAQV/IwBBgAJrIgAkACAAQiU3A/gBIABB+AFqIgZBAXJBsBxBACACKAIEEL8DEKUDIQcgACAENwMAIABB4AFqIgUgBUEYIAcgBiAAEMADIAVqIgcgAhDBAyEIIABBFGoiCSACKAIcIgY2AgAgBiAGKAIEQQFqNgIEBkAgBSAIIAcgAEEgaiAAQRxqIABBGGogCRDTAxkgACQAIAAoAhQiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgACgCFCIFIAUoAgRBAWsiBjYCBCAGQX9GBEAgBSAFKAIAKAIIEQIACyABIABBIGogACgCHCAAKAIYIAIgAxDUAyEBIABBgAJqJAAgAQsNACABIAIgAyAEENkDC44FAQl/IwBB8AJrIgQkACAEQiU3A+gCIARB6AJqQQFyQdLIACABKAIEEMkDIQYgBCAEQcACajYCvAIQpQMhBQJ/IAYEQCABKAIIIQggBCADOQMoIAQgCDYCICAEQcACakEeIAUgBEHoAmogBEEgahDAAwwBCyAEIAM5AzAgBEHAAmpBHiAFIARB6AJqIARBMGoQwAMLIQUgBEHIATYCUCAEQbQCakEAIARB0ABqEKYCIQggBEHAAmoiCSEHAkAGQCAFQR5OBEACfyAGBEAQpQMhBSABKAIIIQcgBCADOQMIIAQgBzYCACAEQbwCaiAFIARB6AJqIAQQygMMAQsQpQMhBSAEIAM5AxAgBEG8AmogBSAEQegCaiAEQRBqEMoDCyIFQX9GBEAQnQUMAwsgCCAEKAK8AhCMAyAEKAK8AiEHCyAHIAUgB2oiCiABEMEDIQsgBEHIATYCRCAEQcgAakEAIARBxABqEKYCIQcGQAJAIAQoArwCIARBwAJqRgRAIARB0ABqIQUMAQsgBUEDdBDWASIFRQRAEJ0FDAQLIAcgBRCMAyAEKAK8AiEJCyAEQTxqIgwgASgCHCIGNgIAIAYgBigCBEEBajYCBAZAIAkgCyAKIAUgBEHEAGogBEFAayAMENoDGSAEJAAGQCAEKAI8IgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALGAQJAAsGQCAEKAI8IgYgBigCBEEBayIJNgIEIAlBf0YEQCAGIAYoAgAoAggRAgALGAMgACAFIAQoAkQgBCgCQCABIAIQ1AMhABkgBCQAIAcQjQMJAAsZIAQkACAIEI0DCQALIAcQjQMgCBCNAyAEQfACaiQAIAAPCwALoAcBCn8jAEEQayIKJAAgBhCYAiEJIApBBGogBhCqAyIOIgYgBigCACgCFBEAACAFIAM2AgAGQAJAAkAgACIHLQAAIgZBK2sOAwABAAELIAkgBsAgCSgCACgCLBEDACEGIAUgBSgCACIHQQRqNgIAIAcgBjYCACAAQQFqIQcLAkACQCACIAciBmtBAUwNACAHLQAAQTBHDQAgBy0AAUEgckH4AEcNACAJQTAgCSgCACgCLBEDACEGIAUgBSgCACIIQQRqNgIAIAggBjYCACAJIAcsAAEgCSgCACgCLBEDACEGIAUgBSgCACIIQQRqNgIAIAggBjYCACAHQQJqIgchBgNAIAIgBk0NAiAGLAAAIQgQpQMaIAhBMGtBCkkgCEEgckHhAGtBBklyRQ0CIAZBAWohBgwACwALA0AgAiAGTQ0BIAYsAAAhCBClAxogCEEwa0EKTw0BIAZBAWohBgwACwALAkACfyAKLQAPQQd2BEAgCigCCAwBCyAKLQAPQf8AcQtFBEAgCSAHIAYgBSgCACAJKAIAKAIwEQYAGiAFIAUoAgAgBiAHa0ECdGo2AgAMAQsgByAGEN8DIA4gDigCACgCEBEBACEPIAchCANAIAYgCE0EQCADIAcgAGtBAnRqIAUoAgAQ4AMMAgsCQAJ/IApBBGoiDC0AC0EHdgRAIAwoAgAMAQsgDAsgC2osAABBAEwNACANAn8gCkEEaiIMLQALQQd2BEAgDCgCAAwBCyAMCyALaiwAAEcNACAFIAUoAgAiDUEEajYCACANIA82AgAgCyALAn8gCi0AD0EHdgRAIAooAggMAQsgCi0AD0H/AHELQQFrSWohC0EAIQ0LIAkgCCwAACAJKAIAKAIsEQMAIQwgBSAFKAIAIhBBBGo2AgAgECAMNgIAIAhBAWohCCANQQFqIQ0MAAsACwJAA0AgAiAGSwRAIAYtAAAiB0EuRgRAIA4gDigCACgCDBEBACEHIAUgBSgCACILQQRqIgg2AgAgCyAHNgIAIAZBAWohBgwDCyAJIAfAIAkoAgAoAiwRAwAhByAFIAUoAgAiC0EEajYCACALIAc2AgAgBkEBaiEGDAELCyAFKAIAIQgLIAkgBiACIAggCSgCACgCMBEGABoZIAokACAKQQRqEKgFGgkACyAFIAUoAgAgAiAGa0ECdGoiBTYCACAEIAUgAyABIABrQQJ0aiABIAJGGzYCACAKQQRqEKgFGiAKQRBqJAALDwAgASACIAMgBCAFENwDC7AFAQl/IwBBoANrIgUkACAFQiU3A5gDIAVBmANqQQFyQZwqIAEoAgQQyQMhByAFIAVB8AJqNgLsAhClAyEGAn8gBwRAIAEoAgghCSAFQUBrIAQ3AwAgBSADNwM4IAUgCTYCMCAFQfACakEeIAYgBUGYA2ogBUEwahDAAwwBCyAFIAM3A1AgBSAENwNYIAVB8AJqQR4gBiAFQZgDaiAFQdAAahDAAwshBiAFQcgBNgKAASAFQeQCakEAIAVBgAFqEKYCIQkgBUHwAmoiCiEIAkAGQCAGQR5OBEACfyAHBEAQpQMhBiABKAIIIQggBSAENwMQIAUgAzcDCCAFIAg2AgAgBUHsAmogBiAFQZgDaiAFEMoDDAELEKUDIQYgBSADNwMgIAUgBDcDKCAFQewCaiAGIAVBmANqIAVBIGoQygMLIgZBf0YEQBCdBQwDCyAJIAUoAuwCEIwDIAUoAuwCIQgLIAggBiAIaiILIAEQwQMhDCAFQcgBNgJ0IAVB+ABqQQAgBUH0AGoQpgIhCAZAAkAgBSgC7AIgBUHwAmpGBEAgBUGAAWohBgwBCyAGQQN0ENYBIgZFBEAQnQUMBAsgCCAGEIwDIAUoAuwCIQoLIAVB7ABqIg0gASgCHCIHNgIAIAcgBygCBEEBajYCBAZAIAogDCALIAYgBUH0AGogBUHwAGogDRDaAxkgBSQABkAgBSgCbCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACxgECQALBkAgBSgCbCIHIAcoAgRBAWsiCjYCBCAKQX9GBEAgByAHKAIAKAIIEQIACxgDIAAgBiAFKAJ0IAUoAnAgASACENQDIQAZIAUkACAIEI0DCQALGSAFJAAgCRCNAwkACyAIEI0DIAkQjQMgBUGgA2okACAADwsAC5QCAQV/IwBB0AFrIgAkABClAyEFIAAgBDYCACAAQbABaiIEIAQgBEEUIAVB1xkgABDAAyIIaiIFIAIQwQMhByAAQQxqIgYgAigCHCIENgIAIAQgBCgCBEEBajYCBAZAIAYQmAIhBhkgACQAIAAoAgwiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgACgCDCIEIAQoAgRBAWsiCTYCBCAJQX9GBEAgBCAEKAIAKAIIEQIACyAGIABBsAFqIAUgAEEQaiIEIAYoAgAoAjARBgAaIAEgBCAIQQJ0IARqIgEgByAAa0ECdCAAakGwBWsgBSAHRhsgASACIAMQ1AMhASAAQdABaiQAIAELuQIBBX8jAEEQayIHJAAjAEEQayIDJAACQCABQe////8DTQRAAkAgAUECSQRAIAAgAC0AC0GAAXEgAXI6AAsgACAALQALQf8AcToACyAAIQQMAQsgA0EIaiAAIAFBAk8EfyABQQRqQXxxIgQgBEEBayIEIARBAkYbBUEBC0EBahCMBSADKAIMGiAAIAMoAggiBDYCACAAIAAoAghBgICAgHhxIAMoAgxB/////wdxcjYCCCAAIAAoAghBgICAgHhyNgIIIAAgATYCBAsjAEEQayIFJAAgBSACNgIMIAQhAiABIQYDQCAGBEAgAiAFKAIMNgIAIAZBAWshBiACQQRqIQIMAQsLIAVBEGokACADQQA2AgQgBCABQQJ0aiADKAIENgIAIANBEGokAAwBCxAuAAsgB0EQaiQAIAALdgEBfyMAQRBrIgIkACACIAA2AgwCQCAAIAFGDQADQCACIAFBAWsiATYCCCAAIAFPDQEgAigCDCIALQAAIQEgACACKAIIIgAtAAA6AAAgACABOgAAIAIgAigCDEEBaiIANgIMIAIoAgghAQwACwALIAJBEGokAAt2AQF/IwBBEGsiAiQAIAIgADYCDAJAIAAgAUYNAANAIAIgAUEEayIBNgIIIAAgAU8NASACKAIMIgAoAgAhASAAIAIoAggiACgCADYCACAAIAE2AgAgAiACKAIMQQRqIgA2AgwgAigCCCEBDAALAAsgAkEQaiQAC/0FAQR/IwBBEGsiCCQAIAggAjYCCCAIIAE2AgwgCEEEaiICIAMoAhwiATYCACABIAEoAgRBAWo2AgQGQCACEIcCIQkZIAgkACAIKAIEIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAgoAgQiASABKAIEQQFrIgI2AgQgAkF/RgRAIAEgASgCACgCCBECAAsgBEEANgIAQQAhAQJAA0AgBiAHRg0BIAENAQJAIAhBDGogCEEIahCJAg0AAkAgCSAGLAAAQQAgCSgCACgCJBEEAEElRgRAIAZBAWoiASAHRg0CQQAhCgJAAkAgCSABLAAAQQAgCSgCACgCJBEEACICQcUARg0AIAJB/wFxQTBGDQAgAiELIAYhAQwBCyAGQQJqIAdGDQMgCSAGLAACQQAgCSgCACgCJBEEACELIAIhCgsgCCAAIAgoAgwgCCgCCCADIAQgBSALIAogACgCACgCJBEOADYCDCABQQJqIQYMAQsgBiwAACIBQQBOBH8gCSgCCCABQf8BcUECdGooAgBBAXEFQQALBEADQAJAIAcgBkEBaiIGRgRAIAchBgwBCyAGLAAAIgFBAE4EfyAJKAIIIAFB/wFxQQJ0aigCAEEBcQVBAAsNAQsLA0AgCEEMaiAIQQhqEIkCDQICfyAIKAIMIgEoAgwiAiABKAIQRgRAIAEgASgCACgCJBEBAAwBCyACLQAAC8AiAUEATgR/IAkoAgggAUH/AXFBAnRqKAIAQQFxBUEAC0UNAiAIQQxqEIoCGgwACwALIAkCfyAIKAIMIgEoAgwiAiABKAIQRgRAIAEgASgCACgCJBEBAAwBCyACLQAAC8AgCSgCACgCDBEDACAJIAYsAAAgCSgCACgCDBEDAEYEQCAGQQFqIQYgCEEMahCKAhoMAQsgBEEENgIACyAEKAIAIQEMAQsLIARBBDYCAAsgCEEMaiAIQQhqEIkCBEAgBCAEKAIAQQJyNgIACyAIKAIMIQAgCEEQaiQAIAALBABBAgtAAQF/IwBBEGsiBiQAIAZCpZDpqdLJzpLTADcDCCAAIAEgAiADIAQgBSAGQQhqIAZBEGoiARDhAyEAIAEkACAAC24AIAAgASACIAMgBCAFAn8gAEEIaiAAKAIIKAIUEQEAIgAtAAtBB3YEQCAAKAIADAELIAALAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAsCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQtqEOEDC7oBAQJ/IwBBEGsiBiQAIAYgATYCDCAGQQhqIgcgAygCHCIBNgIAIAEgASgCBEEBajYCBAZAIAcQhwIhAxkgBiQAIAYoAggiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgBigCCCIBIAEoAgRBAWsiBzYCBCAHQX9GBEAgASABKAIAKAIIEQIACyAAIAVBGGogBkEMaiACIAQgAxDmAyAGKAIMIQAgBkEQaiQAIAALQAAgAiADIABBCGogACgCCCgCABEBACIAIABBqAFqIAUgBEEAEIoDIABrIgBBpwFMBEAgASAAQQxtQQdvNgIACwu6AQECfyMAQRBrIgYkACAGIAE2AgwgBkEIaiIHIAMoAhwiATYCACABIAEoAgRBAWo2AgQGQCAHEIcCIQMZIAYkACAGKAIIIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAYoAggiASABKAIEQQFrIgc2AgQgB0F/RgRAIAEgASgCACgCCBECAAsgACAFQRBqIAZBDGogAiAEIAMQ6AMgBigCDCEAIAZBEGokACAAC0AAIAIgAyAAQQhqIAAoAggoAgQRAQAiACAAQaACaiAFIARBABCKAyAAayIAQZ8CTARAIAEgAEEMbUEMbzYCAAsLuAEBAX8jAEEQayIAJAAgACABNgIMIABBCGoiBiADKAIcIgE2AgAgASABKAIEQQFqNgIEBkAgBhCHAiEDGSAAJAAgACgCCCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAAKAIIIgEgASgCBEEBayIGNgIEIAZBf0YEQCABIAEoAgAoAggRAgALIAVBFGogAEEMaiACIAQgAxDqAyAAKAIMIQEgAEEQaiQAIAELQgAgASACIAMgBEEEEOsDIQEgAy0AAEEEcUUEQCAAIAFB0A9qIAFB7A5qIAEgAUHkAEgbIAFBxQBIG0HsDms2AgALC9wCAQR/IwBBEGsiByQAIAcgATYCDEEAIQFBBiEFAkACQCAAIAdBDGoQiQINAEEEIQUCfyAAKAIAIgYoAgwiCCAGKAIQRgRAIAYgBigCACgCJBEBAAwBCyAILQAAC8AiBkEATgR/IAMoAgggBkH/AXFBAnRqKAIAQcAAcUEARwVBAAtFDQAgAyAGQQAgAygCACgCJBEEACEBA0ACQCAAEIoCGiABQTBrIQEgACAHQQxqEIkCDQAgBEECSA0AAn8gACgCACIFKAIMIgYgBSgCEEYEQCAFIAUoAgAoAiQRAQAMAQsgBi0AAAvAIgVBAE4EfyADKAIIIAVB/wFxQQJ0aigCAEHAAHFBAEcFQQALRQ0DIARBAWshBCADIAVBACADKAIAKAIkEQQAIAFBCmxqIQEMAQsLQQIhBSAAIAdBDGoQiQJFDQELIAIgAigCACAFcjYCAAsgB0EQaiQAIAELyQ8BA38jAEEQayIHJAAgByABNgIMIARBADYCACAHIAMoAhwiCDYCACAIIAgoAgRBAWo2AgQGQCAHEIcCIQgZIAckACAHKAIAIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAcoAgAiCSAJKAIEQQFrIgo2AgQgCkF/RgRAIAkgCSgCACgCCBECAAsCfwJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAgBkHBAGsOOQABFwQXBRcGBxcXFwoXFxcXDg8QFxcXExUXFxcXFxcXAAECAwMXFwEXCBcXCQsXDBcNFwsXFxESFBYLIAAgBUEYaiAHQQxqIAIgBCAIEOYDDBgLIAAgBUEQaiAHQQxqIAIgBCAIEOgDDBcLIAcgACABIAIgAyAEIAUCfyAAQQhqIAAoAggoAgwRAQAiAC0AC0EHdgRAIAAoAgAMAQsgAAsCfyAALQALQQd2BEAgACgCAAwBCyAACwJ/IAAtAAtBB3YEQCAAKAIEDAELIAAtAAtB/wBxC2oQ4QM2AgwMFgsgB0EMaiACIAQgCEECEOsDIQAgBCgCACEBAkACQCAAQQFrQR5LDQAgAUEEcQ0AIAUgADYCDAwBCyAEIAFBBHI2AgALDBULIAdCpdq9qcLsy5L5ADcDACAHIAAgASACIAMgBCAFIAcgB0EIahDhAzYCDAwUCyAHQqWytanSrcuS5AA3AwAgByAAIAEgAiADIAQgBSAHIAdBCGoQ4QM2AgwMEwsgB0EMaiACIAQgCEECEOsDIQAgBCgCACEBAkACQCAAQRdKDQAgAUEEcQ0AIAUgADYCCAwBCyAEIAFBBHI2AgALDBILIAdBDGogAiAEIAhBAhDrAyEAIAQoAgAhAQJAAkAgAEEBa0ELSw0AIAFBBHENACAFIAA2AggMAQsgBCABQQRyNgIACwwRCyAHQQxqIAIgBCAIQQMQ6wMhACAEKAIAIQECQAJAIABB7QJKDQAgAUEEcQ0AIAUgADYCHAwBCyAEIAFBBHI2AgALDBALIAdBDGogAiAEIAhBAhDrAyEBIAQoAgAhAAJAAkAgAUEBayIBQQtLDQAgAEEEcQ0AIAUgATYCEAwBCyAEIABBBHI2AgALDA8LIAdBDGogAiAEIAhBAhDrAyEAIAQoAgAhAQJAAkAgAEE7Sg0AIAFBBHENACAFIAA2AgQMAQsgBCABQQRyNgIACwwOCyAHQQxqIQAjAEEQayIBJAAgASACNgIMA0ACQCAAIAFBDGoQiQINAAJ/IAAoAgAiAigCDCIDIAIoAhBGBEAgAiACKAIAKAIkEQEADAELIAMtAAALwCICQQBOBH8gCCgCCCACQf8BcUECdGooAgBBAXEFQQALRQ0AIAAQigIaDAELCyAAIAFBDGoQiQIEQCAEIAQoAgBBAnI2AgALIAFBEGokAAwNCyAHQQxqIQECQAJ/IABBCGogACgCCCgCCBEBACIALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQtBAAJ/IAAtABdBB3YEQCAAKAIQDAELIAAtABdB/wBxC2tGBEAgBCAEKAIAQQRyNgIADAELIAEgAiAAIABBGGogCCAEQQAQigMhAiAFKAIIIQECQCAAIAJHDQAgAUEMRw0AIAVBADYCCAwBCwJAIAIgAGtBDEcNACABQQtKDQAgBSABQQxqNgIICwsMDAsgB0G4rgEoAAA2AAcgB0GxrgEpAAA3AwAgByAAIAEgAiADIAQgBSAHIAdBC2oQ4QM2AgwMCwsgB0HArgEtAAA6AAQgB0G8rgEoAAA2AgAgByAAIAEgAiADIAQgBSAHIAdBBWoQ4QM2AgwMCgsgB0EMaiACIAQgCEECEOsDIQAgBCgCACEBAkACQCAAQTxKDQAgAUEEcQ0AIAUgADYCAAwBCyAEIAFBBHI2AgALDAkLIAdCpZDpqdLJzpLTADcDACAHIAAgASACIAMgBCAFIAcgB0EIahDhAzYCDAwICyAHQQxqIAIgBCAIQQEQ6wMhACAEKAIAIQECQAJAIABBBkoNACABQQRxDQAgBSAANgIYDAELIAQgAUEEcjYCAAsMBwsgACABIAIgAyAEIAUgACgCACgCFBEIAAwHCyAHIAAgASACIAMgBCAFAn8gAEEIaiAAKAIIKAIYEQEAIgAtAAtBB3YEQCAAKAIADAELIAALAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAsCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQtqEOEDNgIMDAULIAVBFGogB0EMaiACIAQgCBDqAwwECyAHQQxqIAIgBCAIQQQQ6wMhACAELQAAQQRxRQRAIAUgAEHsDms2AhQLDAMLIAZBJUYNAQsgBCAEKAIAQQRyNgIADAELIwBBEGsiACQAIAAgAjYCDEEGIQECQAJAIAdBDGoiAyAAQQxqEIkCDQBBBCEBIAgCfyADKAIAIgIoAgwiBSACKAIQRgRAIAIgAigCACgCJBEBAAwBCyAFLQAAC8BBACAIKAIAKAIkEQQAQSVHDQBBAiEBIAMQigIgAEEMahCJAkUNAQsgBCAEKAIAIAFyNgIACyAAQRBqJAALIAcoAgwLIQAgB0EQaiQAIAALyAUBBH8jAEEQayIIJAAgCCACNgIIIAggATYCDCAIQQRqIgIgAygCHCIBNgIAIAEgASgCBEEBajYCBAZAIAIQmAIhCRkgCCQAIAgoAgQiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgCCgCBCIBIAEoAgRBAWsiAjYCBCACQX9GBEAgASABKAIAKAIIEQIACyAEQQA2AgBBACEBAkADQCAGIAdGDQEgAQ0BAkAgCEEMaiAIQQhqEJkCDQACQCAJIAYoAgBBACAJKAIAKAI0EQQAQSVGBEAgBkEEaiIBIAdGDQJBACEKAkACQCAJIAEoAgBBACAJKAIAKAI0EQQAIgJBxQBGDQAgAkH/AXFBMEYNACACIQsgBiEBDAELIAZBCGogB0YNAyAJIAYoAghBACAJKAIAKAI0EQQAIQsgAiEKCyAIIAAgCCgCDCAIKAIIIAMgBCAFIAsgCiAAKAIAKAIkEQ4ANgIMIAFBCGohBgwBCyAJQQEgBigCACAJKAIAKAIMEQQABEADQAJAIAcgBkEEaiIGRgRAIAchBgwBCyAJQQEgBigCACAJKAIAKAIMEQQADQELCwNAIAhBDGogCEEIahCZAg0CIAlBAQJ/IAgoAgwiASgCDCICIAEoAhBGBEAgASABKAIAKAIkEQEADAELIAIoAgALIAkoAgAoAgwRBABFDQIgCEEMahCaAhoMAAsACyAJAn8gCCgCDCIBKAIMIgIgASgCEEYEQCABIAEoAgAoAiQRAQAMAQsgAigCAAsgCSgCACgCHBEDACAJIAYoAgAgCSgCACgCHBEDAEYEQCAGQQRqIQYgCEEMahCaAhoMAQsgBEEENgIACyAEKAIAIQEMAQsLIARBBDYCAAsgCEEMaiAIQQhqEJkCBEAgBCAEKAIAQQJyNgIACyAIKAIMIQAgCEEQaiQAIAALXQEBfyMAQSBrIgYkACAGQfivASkDADcDGCAGQfCvASkDADcDECAGQeivASkDADcDCCAGQeCvASkDADcDACAAIAEgAiADIAQgBSAGIAZBIGoiARDtAyEAIAEkACAAC3EAIAAgASACIAMgBCAFAn8gAEEIaiAAKAIIKAIUEQEAIgAtAAtBB3YEQCAAKAIADAELIAALAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAsCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQtBAnRqEO0DC7oBAQJ/IwBBEGsiBiQAIAYgATYCDCAGQQhqIgcgAygCHCIBNgIAIAEgASgCBEEBajYCBAZAIAcQmAIhAxkgBiQAIAYoAggiACAAKAIEQQFrIgE2AgQgAUF/RgRAIAAgACgCACgCCBECAAsJAAsgBigCCCIBIAEoAgRBAWsiBzYCBCAHQX9GBEAgASABKAIAKAIIEQIACyAAIAVBGGogBkEMaiACIAQgAxDxAyAGKAIMIQAgBkEQaiQAIAALQAAgAiADIABBCGogACgCCCgCABEBACIAIABBqAFqIAUgBEEAEKsDIABrIgBBpwFMBEAgASAAQQxtQQdvNgIACwu6AQECfyMAQRBrIgYkACAGIAE2AgwgBkEIaiIHIAMoAhwiATYCACABIAEoAgRBAWo2AgQGQCAHEJgCIQMZIAYkACAGKAIIIgAgACgCBEEBayIBNgIEIAFBf0YEQCAAIAAoAgAoAggRAgALCQALIAYoAggiASABKAIEQQFrIgc2AgQgB0F/RgRAIAEgASgCACgCCBECAAsgACAFQRBqIAZBDGogAiAEIAMQ8wMgBigCDCEAIAZBEGokACAAC0AAIAIgAyAAQQhqIAAoAggoAgQRAQAiACAAQaACaiAFIARBABCrAyAAayIAQZ8CTARAIAEgAEEMbUEMbzYCAAsLuAEBAX8jAEEQayIAJAAgACABNgIMIABBCGoiBiADKAIcIgE2AgAgASABKAIEQQFqNgIEBkAgBhCYAiEDGSAAJAAgACgCCCIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAAKAIIIgEgASgCBEEBayIGNgIEIAZBf0YEQCABIAEoAgAoAggRAgALIAVBFGogAEEMaiACIAQgAxD1AyAAKAIMIQEgAEEQaiQAIAELQgAgASACIAMgBEEEEPYDIQEgAy0AAEEEcUUEQCAAIAFB0A9qIAFB7A5qIAEgAUHkAEgbIAFBxQBIG0HsDms2AgALC7YCAQR/IwBBEGsiByQAIAcgATYCDEEAIQFBBiEFAkACQCAAIAdBDGoQmQINAEEEIQUgA0HAAAJ/IAAoAgAiBigCDCIIIAYoAhBGBEAgBiAGKAIAKAIkEQEADAELIAgoAgALIgYgAygCACgCDBEEAEUNACADIAZBACADKAIAKAI0EQQAIQEDQAJAIAAQmgIaIAFBMGshASAAIAdBDGoQmQINACAEQQJIDQAgA0HAAAJ/IAAoAgAiBSgCDCIGIAUoAhBGBEAgBSAFKAIAKAIkEQEADAELIAYoAgALIgUgAygCACgCDBEEAEUNAyAEQQFrIQQgAyAFQQAgAygCACgCNBEEACABQQpsaiEBDAELC0ECIQUgACAHQQxqEJkCRQ0BCyACIAIoAgAgBXI2AgALIAdBEGokACABC5sQAQN/IwBBMGsiByQAIAcgATYCLCAEQQA2AgAgByADKAIcIgg2AgAgCCAIKAIEQQFqNgIEBkAgBxCYAiEIGSAHJAAgBygCACIAIAAoAgRBAWsiATYCBCABQX9GBEAgACAAKAIAKAIIEQIACwkACyAHKAIAIgkgCSgCBEEBayIKNgIEIApBf0YEQCAJIAkoAgAoAggRAgALAn8CQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAIAZBwQBrDjkAARcEFwUXBgcXFxcKFxcXFw4PEBcXFxMVFxcXFxcXFwABAgMDFxcBFwgXFwkLFwwXDRcLFxcREhQWCyAAIAVBGGogB0EsaiACIAQgCBDxAwwYCyAAIAVBEGogB0EsaiACIAQgCBDzAwwXCyAHIAAgASACIAMgBCAFAn8gAEEIaiAAKAIIKAIMEQEAIgAtAAtBB3YEQCAAKAIADAELIAALAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAsCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQtBAnRqEO0DNgIsDBYLIAdBLGogAiAEIAhBAhD2AyEAIAQoAgAhAQJAAkAgAEEBa0EeSw0AIAFBBHENACAFIAA2AgwMAQsgBCABQQRyNgIACwwVCyAHQeiuASkDADcDGCAHQeCuASkDADcDECAHQdiuASkDADcDCCAHQdCuASkDADcDACAHIAAgASACIAMgBCAFIAcgB0EgahDtAzYCLAwUCyAHQYivASkDADcDGCAHQYCvASkDADcDECAHQfiuASkDADcDCCAHQfCuASkDADcDACAHIAAgASACIAMgBCAFIAcgB0EgahDtAzYCLAwTCyAHQSxqIAIgBCAIQQIQ9gMhACAEKAIAIQECQAJAIABBF0oNACABQQRxDQAgBSAANgIIDAELIAQgAUEEcjYCAAsMEgsgB0EsaiACIAQgCEECEPYDIQAgBCgCACEBAkACQCAAQQFrQQtLDQAgAUEEcQ0AIAUgADYCCAwBCyAEIAFBBHI2AgALDBELIAdBLGogAiAEIAhBAxD2AyEAIAQoAgAhAQJAAkAgAEHtAkoNACABQQRxDQAgBSAANgIcDAELIAQgAUEEcjYCAAsMEAsgB0EsaiACIAQgCEECEPYDIQEgBCgCACEAAkACQCABQQFrIgFBC0sNACAAQQRxDQAgBSABNgIQDAELIAQgAEEEcjYCAAsMDwsgB0EsaiACIAQgCEECEPYDIQAgBCgCACEBAkACQCAAQTtKDQAgAUEEcQ0AIAUgADYCBAwBCyAEIAFBBHI2AgALDA4LIAdBLGohACMAQRBrIgEkACABIAI2AgwDQAJAIAAgAUEMahCZAg0AIAhBAQJ/IAAoAgAiAigCDCIDIAIoAhBGBEAgAiACKAIAKAIkEQEADAELIAMoAgALIAgoAgAoAgwRBABFDQAgABCaAhoMAQsLIAAgAUEMahCZAgRAIAQgBCgCAEECcjYCAAsgAUEQaiQADA0LIAdBLGohAQJAAn8gAEEIaiAAKAIIKAIIEQEAIgAtAAtBB3YEQCAAKAIEDAELIAAtAAtB/wBxC0EAAn8gAC0AF0EHdgRAIAAoAhAMAQsgAC0AF0H/AHELa0YEQCAEIAQoAgBBBHI2AgAMAQsgASACIAAgAEEYaiAIIARBABCrAyECIAUoAgghAQJAIAAgAkcNACABQQxHDQAgBUEANgIIDAELAkAgAiAAa0EMRw0AIAFBC0oNACAFIAFBDGo2AggLCwwMCyAHQZCvAUEsEM4BIgYgACABIAIgAyAEIAUgBiAGQSxqEO0DNgIsDAsLIAdB0K8BKAIANgIQIAdByK8BKQMANwMIIAdBwK8BKQMANwMAIAcgACABIAIgAyAEIAUgByAHQRRqEO0DNgIsDAoLIAdBLGogAiAEIAhBAhD2AyEAIAQoAgAhAQJAAkAgAEE8Sg0AIAFBBHENACAFIAA2AgAMAQsgBCABQQRyNgIACwwJCyAHQfivASkDADcDGCAHQfCvASkDADcDECAHQeivASkDADcDCCAHQeCvASkDADcDACAHIAAgASACIAMgBCAFIAcgB0EgahDtAzYCLAwICyAHQSxqIAIgBCAIQQEQ9gMhACAEKAIAIQECQAJAIABBBkoNACABQQRxDQAgBSAANgIYDAELIAQgAUEEcjYCAAsMBwsgACABIAIgAyAEIAUgACgCACgCFBEIAAwHCyAHIAAgASACIAMgBCAFAn8gAEEIaiAAKAIIKAIYEQEAIgAtAAtBB3YEQCAAKAIADAELIAALAn8gAC0AC0EHdgRAIAAoAgAMAQsgAAsCfyAALQALQQd2BEAgACgCBAwBCyAALQALQf8AcQtBAnRqEO0DNgIsDAULIAVBFGogB0EsaiACIAQgCBD1AwwECyAHQSxqIAIgBCAIQQQQ9gMhACAELQAAQQRxRQRAIAUgAEHsDms2AhQLDAMLIAZBJUYNAQsgBCAEKAIAQQRyNgIADAELIwBBEGsiACQAIAAgAjYCDEEGIQECQAJAIAdBLGoiAyAAQQxqEJkCDQBBBCEBIAgCfyADKAIAIgIoAgwiBSACKAIQRgRAIAIgAigCACgCJBEBAAwBCyAFKAIAC0EAIAgoAgAoAjQRBABBJUcNAEECIQEgAxCaAiAAQQxqEJkCRQ0BCyAEIAQoAgAgAXI2AgALIABBEGokAAsgBygCLAshACAHQTBqJAAgAAuLAgEBfyMAQYABayICJAAgAiACQfQAajYCDCAAQQhqIAJBEGoiAyACQQxqIAQgBSAGEPkDIAIoAgwhBCMAQRBrIgYkACMAQSBrIgAkACAAQRhqIAMgBBC5AiAAKAIYIQUgACgCHCEHIwBBEGsiBCQAIAQgBTYCCCAEIAE2AgwDQCAFIAdHBEAgBEEMaiAFLAAAEJUCIAQgBUEBaiIFNgIIDAELCyAAIAQoAgg2AhAgACAEKAIMNgIUIARBEGokACAAIAMgACgCECADa2o2AgwgACAAKAIUNgIIIAYgACgCDDYCCCAGIAAoAgg2AgwgAEEgaiQAIAYoAgwhACAGQRBqJAAgAkGAAWokACAAC20BAX8jAEEQayIGJAAgBkEAOgAPIAYgBToADiAGIAQ6AA0gBkElOgAMIAUEQCAGLQANIQQgBiAGLQAOOgANIAYgBDoADgsgAiABIAIoAgAgAWsgBkEMaiADIAAoAgAQJyABajYCACAGQRBqJAALigQBA38jAEGgA2siCCQAIAggCEGgA2oiAzYCDCAIQRBqIQIjAEGQAWsiByQAIAcgB0GEAWo2AhwgAEEIaiAHQSBqIgkgB0EcaiAEIAUgBhD5AyAHQgA3AxAgByAJNgIMIAdBDGohBSAIKAIMIAJrQQJ1IQYgB0EQaiEJIAAoAgghBCMAQRBrIgAkACAAIAQ2AgwgAEEIaiAAQQxqEKgDIQQGQCACIAUgBiAJEP0CIQUZIAAkACAEKAIAIgAEQEGI3AIoAgAaIAAEQEGI3AJBgNsCIAAgAEF/Rhs2AgALCwkACyAEKAIAIgQEQEGI3AIoAgAaIAQEQEGI3AJBgNsCIAQgBEF/Rhs2AgALCyAAQRBqJAAgBUF/RgRAQcgkEPsDAAsgCCACIAVBAnRqNgIMIAdBkAFqJAAgCCgCDCEEIwBBEGsiBiQAIwBBIGsiACQAIABBGGogAiAEELkCIAAoAhghBSAAKAIcIQcjAEEQayIEJAAgBCAFNgIIIAQgATYCDANAIAUgB0cEQCAEQQxqIAUoAgAQnAIgBCAFQQRqIgU2AggMAQsLIAAgBCgCCDYCECAAIAQoAgw2AhQgBEEQaiQAIAAgAiAAKAIQIAJrajYCDCAAIAAoAhQ2AgggBiAAKAIMNgIIIAYgACgCCDYCDCAAQSBqJAAgBigCDCEAIAZBEGokACADJAAgAAs3AQJ/IwAhAgZABkBBCBDDBSEBGAEgASAAEKQFIQAZIAIkACABEMQFCQALIABB3IMCQQEQxQUACwUAQf8ACyAAIwBBEGsiASQAIABCADcCACAAQQA2AgggAUEQaiQACwwAIABBAUEtEM8DGgsMACAAQYKGgCA2AAALCABB/////wcLDAAgAEEBQS0Q3gMaC54CAQR/IwBBEGsiBCQAAkAgAS0AC0EHdkUEQCAAIAEoAgg2AgggACABKQIANwIADAELIAEoAgAhBSABKAIEIQIjAEEQayIDJAACQAJAAkAgAkELSQRAIAAiASABLQALQYABcSACcjoACyABIAEtAAtB/wBxOgALDAELIAJB7////wdLDQEgA0EIaiAAIAJBC08EfyACQRBqQXBxIgEgAUEBayIBIAFBC0YbBUEKC0EBahC9AiADKAIMGiAAIAMoAggiATYCACAAIAAoAghBgICAgHhxIAMoAgxB/////wdxcjYCCCAAIAAoAghBgICAgHhyNgIIIAAgAjYCBAsgASAFIAJBAWoQ+gEgA0EQaiQADAELEC4ACwsgBEEQaiQAC/0EAQJ/IwBBkAJrIgAkACAAIAI2AogCIAAgATYCjAIgAEHJATYCECAAQZgBaiAAQaABaiAAQRBqEKYCIQECQAZAIABBkAFqIgggBCgCHCIHNgIAIAcgBygCBEEBajYCBAZAIAgQhwIhByAAQQA6AI8BIABBjAJqIAIgAyAIIAQoAgQgBSAAQY8BaiAHIAEgAEGUAWogAEGEAmoQhAQEQCAAQaIzKAAANgCHASAAQZszKQAANwOAASAHIABBgAFqIABBigFqIABB9gBqIAcoAgAoAiARBgAaIABByAE2AgQgAEEIakEAIABBBGoQpgIhAyAAQRBqIQQGQAJAIAAoApQBIAEoAgBrQeMATgRAIAMgACgClAEgASgCAGtBAmoQ1gEQjAMgAygCAEUEQBCdBQwHCyADKAIAIQQLIAAtAI8BBEAgBEEtOgAAIARBAWohBAsgASgCACECA0AgACgClAEgAk0EQCAEQQA6AAAgACAGNgIAIABBEGogABD4AkEBRwRAQcoWEPsDDAgLIAMQjQMMAgsgBCAAQfYAaiIHIAdBCmogAhCnAyAAayAAai0ACjoAACAEQQFqIQQgAkEBaiECDAALAAsZIAAkACADEI0DCQALCyAAQYwCaiAAQYgCahCJAiECGSAAJAAGQCAAKAKQASICIAIoAgRBAWsiAzYCBCADQX9GBEAgAiACKAIAKAIIEQIACxgDCQALGSAAJAAgARCNAwkACyACBEAgBSAFKAIAQQJyNgIACyAAKAKMAiEDIAAoApABIgIgAigCBEEBayIENgIEIARBf0YEQCACIAIoAgAoAggRAgALIAEQjQMgAEGQAmokACADDwsAC48ZAQl/IwBBkARrIgskACALIAo2AogEIAsgATYCjAQCQCAAIAtBjARqEIkCBEAgBSAFKAIAQQRyNgIAQQAhAAwBCyALQckBNgJMIAsgC0HoAGogC0HwAGogC0HMAGoiDxCmAiIRKAIAIgE2AmQgCyABQZADajYCYCMAQRBrIgEkACAPQgA3AgAgD0EANgIIIAFBEGokACMAQRBrIgEkACALQUBrIg5CADcCACAOQQA2AgggAUEQaiQAIwBBEGsiASQAIAtBNGoiDUIANwIAIA1BADYCCCABQRBqJAAjAEEQayIBJAAgC0EoaiIMQgA3AgAgDEEANgIIIAFBEGokACMAQRBrIgEkACALQRxqIhBCADcCACAQQQA2AgggAUEQaiQABkACQCMAQRBrIgokACALAn8gAgRAIApBBGoiAiADEIsEIgEgASgCACgCLBEAACALIAooAgQ2AFwgAiABIAEoAgAoAiARAAAgDCACEJ4CIAIQqAUaIAIgASABKAIAKAIcEQAAIA0gAhCeAiACEKgFGiALIAEgASgCACgCDBEBADoAWyALIAEgASgCACgCEBEBADoAWiACIAEgASgCACgCFBEAACAPIAIQngIgAhCoBRogAiABIAEoAgAoAhgRAAAgDiACEJ4CIAIQqAUaIAEgASgCACgCJBEBAAwBCyAKQQRqIgIgAxCMBCIBIAEoAgAoAiwRAAAgCyAKKAIENgBcIAIgASABKAIAKAIgEQAAIAwgAhCeAiACEKgFGiACIAEgASgCACgCHBEAACANIAIQngIgAhCoBRogCyABIAEoAgAoAgwRAQA6AFsgCyABIAEoAgAoAhARAQA6AFogAiABIAEoAgAoAhQRAAAgDyACEJ4CIAIQqAUaIAIgASABKAIAKAIYEQAAIA4gAhCeAiACEKgFGiABIAEoAgAoAiQRAQALNgIYIApBEGokACAJIAgoAgA2AgAgBEGABHEhEkEAIQNBACEKA0AgCiECAkACQAJAAkACQCADQQNLDQAgACALQYwEahCJAg0AQQAhAQJAAkACQAJAAkACQCALQdwAaiADaiwAAA4FAQAEAwUKCyADQQNGDQgCfyAAKAIAIgEoAgwiBCABKAIQRgRAIAEgASgCACgCJBEBAAwBCyAELQAAC8AiAUEATgR/IAcoAggg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QQJyNgIACyAAKALsBCEDIAAoAsABIgIgAigCBEEBayIENgIEIARBf0YEQCACIAIoAgAoAggRAgALIAEQjQMgAEHwBGokACADDwsAC54YAQl/IwBBkARrIgskACALIAo2AogEIAsgATYCjAQCQCAAIAtBjARqEJkCBEAgBSAFKAIAQQRyNgIAQQAhAAwBCyALQckBNgJIIAsgC0HoAGogC0HwAGogC0HIAGoiDxCmAiIRKAIAIgE2AmQgCyABQZADajYCYCMAQRBrIgEkACAPQgA3AgAgD0EANgIIIAFBEGokACMAQRBrIgEkACALQTxqIg5CADcCACAOQQA2AgggAUEQaiQAIwBBEGsiASQAIAtBMGoiDUIANwIAIA1BADYCCCABQRBqJAAjAEEQayIBJAAgC0EkaiIMQgA3AgAgDEEANgIIIAFBEGokACMAQRBrIgEkACALQRhqIhBCADcCACAQQQA2AgggAUEQaiQABkACQCMAQRBrIgokACALAn8gAgRAIApBBGoiAiADEJQEIgEgASgCACgCLBEAACALIAooAgQ2AFwgAiABIAEoAgAoAiARAAAgDCACEJUEIAIQsQUaIAIgASABKAIAKAIcEQAAIA0gAhCVBCACELEFGiALIAEgASgCACgCDBEBADYCWCALIAEgASgCACgCEBEBADYCVCACIAEgASgCACgCFBEAACAPIAIQngIgAhCoBRogAiABIAEoAgAoAhgRAAAgDiACEJUEIAIQsQUaIAEgASgCACgCJBEBAAwBCyAKQQRqIgIgAxCWBCIBIAEoAgAoAiwRAAAgCyAKKAIENgBcIAIgASABKAIAKAIgEQAAIAwgAhCVBCACELEFGiACIAEgASgCACgCHBEAACANIAIQlQQgAhCxBRogCyABIAEoAgAoAgwRAQA2AlggCyABIAEoAgAoAhARAQA2AlQgAiABIAEoAgAoAhQRAAAgDyACEJ4CIAIQqAUaIAIgASABKAIAKAIYEQAAIA4gAhCVBCACELEFGiABIAEoAgAoAiQRAQALNgIUIApBEGokACAJIAgoAgA2AgAgBEGABHEhEkEAIQNBACEKA0AgCiECAkACQAJAAkACQCADQQNLDQAgACALQYwEahCZAg0AQQAhAQJAAkACQAJAAkACQCALQdwAaiADaiwAAA4FAQAEAwUKCyADQQNGDQgg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AkADQCACIANGDQECQCACKAIAIgBB/wBLDQAgAEECdEHQsAFqKAIAIAFxRQ0AIAJBBGohAgwBCwsgAiEDCyADCx4AIAFB/wBNBH9B8JUBKAIAIAFBAnRqKAIABSABCwtBAANAIAEgAkcEQCABIAEoAgAiAEH/AE0Ef0HwlQEoAgAgASgCAEECdGooAgAFIAALNgIAIAFBBGohAQwBCwsgAgseACABQf8ATQR/QYCiASgCACABQQJ0aigCAAUgAQsLQQADQCABIAJHBEAgASABKAIAIgBB/wBNBH9BgKIBKAIAIAEoAgBBAnRqKAIABSAACzYCACABQQRqIQEMAQsLIAILKgADQCABIAJGRQRAIAMgASwAADYCACADQQRqIQMgAUEBaiEBDAELCyACCw4AIAEgAiABQYABSRvACzUAA0AgASACRkUEQCAEIAEoAgAiACADIABBgAFJGzoAACAEQQFqIQQgAUEEaiEBDAELCyACCykBAX8gAEGcsAE2AgACQCAAKAIIIgFFDQAgAC0ADEUNACABENcBCyAACw0AIAAQwgQaIAAQ1wELIgAgAUEATgR/QfCVASgCACABQf8BcUECdGooAgAFIAELwAtAAANAIAEgAkcEQCABIAEsAAAiAEEATgR/QfCVASgCACABLAAAQQJ0aigCAAUgAAs6AAAgAUEBaiEBDAELCyACCyIAIAFBAE4Ef0GAogEoAgAgAUH/AXFBAnRqKAIABSABC8ALQAADQCABIAJHBEAgASABLAAAIgBBAE4Ef0GAogEoAgAgASwAAEECdGooAgAFIAALOgAAIAFBAWohAQwBCwsgAgsqAANAIAEgAkZFBEAgAyABLQAAOgAAIANBAWohAyABQQFqIQEMAQsLIAILDAAgAiABIAFBAEgbCzQAA0AgASACRkUEQCAEIAMgASwAACIAIABBAEgbOgAAIARBAWohBCABQQFqIQEMAQsLIAILEgAgBCACNgIAIAcgBTYCAEEDCwsAIAQgAjYCAEEDC1gAIwBBEGsiACQAIAAgBDYCDCAAIAMgAms2AggjAEEQayIBJAAgAEEIaiICKAIAIABBDGoiAygCAEkhBCABQRBqJAAgAiADIAQbKAIAIQEgAEEQaiQAIAELDQAgABClBBogABDXAQuUBgEMfyMAQRBrIg8kACACIQgDQAJAIAMgCEYEQCAD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ACgCAAwBCyAACyIDIAQEfyACIANqIAMgBBCmBSABIAJBACADIARqIAFLG0EAIAEgA08bagUgAQsgAhCmBSAAIAIgBGoiARCKBCAFQQA6AA8gASADaiAFLQAPOgAADAELIAAgAyACIARqIANrIARBAEEAIAIgARCnBQsgBUEQaiQAIAAMAQsQmAUACwv5AQEDfyMAQRBrIgIkACACIAE6AA8CQAJAAn8gAC0AC0EHdiIERQRAQQohASAALQALQf8AcQwBCyAAKAIIQf////8HcUEBayEBIAAoAgQLIgMgAUYEQCAAIAFBASABIAEQqQUCfyAALQALQQd2BEAgACgCAAwBC0EACxoMAQsCfyAALQALQQd2BEAgACgCAAwBC0EACxogBA0AIAAiASADQQFqIAAtAAtBgAFxcjoACyAAIAAtAAtB/wBxOgALDAELIAAoAgAhASAAIANBAWo2AgQLIAEgA2oiACACLQAPOgAAIAJBADoADiAAIAItAA46AAEgAkEQaiQACw4AIAAgASABENQBEKwFC58DAQV/IwBBEGsiCCQAIAIgAUF/c0Hv////A2pNBEACfyAALQALQQd2BEAgACgCAAwBCyAACyEJIAhBBGogACABQef///8BSQR/IAggAUEBdDYCDCAIIAEgAmo2AgQjAEEQayICJAAgCEEEaiIKKAIAIAhBDGoiCygCAEkhDCACQRBqJAAgCyAKIAwbKAIAIgJBAk8EfyACQQRqQXxxIgIgAkEBayICIAJBAkYbBUEBC0EBagVB7////wMLEIwFIAgoAgQhAiAIKAIIGiAEBEAgAiAJIAQQlwILIAYEQCAEQQJ0IAJqIAcgBhCXAgsgAyAEIAVqIgprIQcgAyAKRwRAIARBAnQiAyACaiAGQQJ0aiADIAlqIAVBAnRqIAcQlwILIAFBAWoiAUECRwRAIAAgCSABEI8FCyAAIAI2AgAgACAAKAIIQYCAgIB4cSAIKAIIQf////8HcXI2AgggACAAKAIIQYCAgIB4cjYCCCAAIAQgBmogB2oiADYCBCAIQQA2AgwgAiAAQQJ0aiAIKAIMNgIAIAhBEGokAA8LEC4ACyUAIAAtAAtBB3YEQCAAIAAoAgAgACgCCEH/////B3EQjwULIAALzQIBBX8jAEEQayIFJAAgAkHv////AyABa00EQAJ/IAAtAAtBB3YE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IQIgASgCACEBIAcgAykCACIINwMIIAYtAAAhAyAFKAIAIQUgBCgCACEEIAcgCDcDACAAQRJBAEEBQQAQvAYiACACNgIMIAAgATYCCCAAQZy+AjYCACAHKQIAIQggACADOgAgIAAgBTYCHCAAIAQ2AhggACAINwIQIAdBEGokACAACzUBAX8gACgCAEHMAmogAEEEaiIBEJwGGiAAKAIAQaACaiAAQSBqIgAQnQYgABCEBiABEIQGCz4BAX8jAEEQayICJAAgAEGYA2pBEBCmBiEAIAIgAkEIaiABEPwFKQIANwMAIAAgAhCuBiEAIAJBEGokACAAC3ABA38jAEEQayICJAAgAkEANgIMAkACQCABIAJBDGoQrQZFBEAgAigCDCIDIAEoAgQgASgCAGtNDQELIABCADcCAAwBCyAAIAEoAgAiBCADajYCBCAAIAQ2AgAgASABKAIAIANqNgIACyACQRBqJAALQQIBfwF+IwBBEGsiAiQAIABBmANqQRAQpgYhACACIAEpAgAiAzcDACACIAM3AwggACACEK4GIQAgAkEQaiQAIAAL0iwCB38CfiMAQaACayICJAAgAiACQZQCakGtFBD8BSkCADcDcCACIAAgAkHwAGoQ/QUiBToAnwICQAJAAkACQAJAAkAgABDEBiIDBEAgAkGIAmogAxDFBgJAAkACQAJAAkACQAJAAkACQCADLQACQQFrDgwCAAMEBQYHCAwPCwoBCyACIAIpA4gCNwOAAiADLAADQQF1IQEgAiACKQOAAjcDUCMAQRBrIgMkACADIAE2AgwgAyAAEJMGIgE2AggCfwJAIAFFDQAgAyAAEJMGIgE2AgQgAUUNACMAQRBrIgEkACAAQZgDakEYEKYGIQAgAygCCCEEIAEgAikCUCIINwMIIAMoAgwhBSADKAIEIQYgASAINwMAIABBMiAFQQFBAUEBEKgGIgAgBDYCCCAAQciOAjYCACABKQIAIQggACAGNgIUIAAgCDcCDCABQRBqJAAgAAwBC0EACyEBIANBEGokAAwOCyACIAIpA4gCNwP4ASADLAADQQF1IQEgAiACKQP4ATcDWCAAIAJB2ABqIAEQxgYhAQwNCyAAQd8AEP8FBEAgAiACKQOIAjcD8AEgAywAA0EBdSEBIAIgAikD8AE3A2AgACACQeAAaiABEMYGIQEMDQsgAiAA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BgsiATYC5AEgAUUNAyACIAMsAANBAXU2AtQBIwBBEGsiAyQAIABBmANqQRwQpgYhACADIAIpAogCIgg3AwggAigC1AEhASACKALkASEEIAMgCDcDACAAIAMgBCABEOYGIQEgA0EQaiQADAQLIAIgABCCBiIBNgLkASABRQ0CIAIgABCTBiIBNgLUASABRQ0CIAIgAywAA0EBdTYC7AEjAEEQayIDJAAgAEGYA2pBGBCmBiEAIAMgAikCiAIiCDcDCCACKALsASEBIAIoAtQBIQQgAigC5AEhBSADIAg3AwAgAEE5IAFBAUEBQQEQqAYiAUHglgI2AgAgAykCACEIIAEgBDYCFCABIAU2AhAgASAINwIIIANBEGokAAwDCyACIAAQkwYiATYC5AEgAUUNASACIAAQkwYiATYC1AEgAUUNASACIAAQkwYiATYC7AEgAUUNASACIAMsAANBAXU2AswBIABBmANqQRQQpgYhACACKALkASEDIAIoAtQBIQQgAigC7AEhBSAAQTUgAigCzAFBAUEBQQEQqAYiASAFNgIQIAEgBDYCDCABIAM2AgggAUH0lQI2AgAMAgsgAiAENgLUASACKALkASACLQDoAToAACAERQ0BIABBCGoiBiIEKAIEIAQoAgBrQQJ1IQQgAEHfABD/BSEFAkACQAJAA0AgAEHFABD/BQ0BIAIgABCTBiIHNgLkASAHRQ0FIAYgAkHkAWoQjAYgBQ0ACyACQeQBaiAAIAQQjQYMAQsgAkHkAWogACAEEI0GIAUNAQsgAigC6AFBAUcNAgsgAiADLAADQQF1NgLsASMAQRBrIgMkACAAQZgDakEUEKYGIQAgAigC1AEhBCADIAIpAuQBIgg3AwggAigC7AEhASADIAg3AwAgAEHAACABQQFBAUEBEKgGIgEgBDYCCCABQYiVAjYCACABIAMpAgA3AgwgA0EQaiQADAELQQAhAQsgAkGgAmokACABC6MBAQR/IwBBEGsiAiQAAkAgAEHEABD/BUUNACAAQfQAEP8FRQRAIABB1AAQ/wVFDQELIAIgABCTBiIBNgIMIAFFDQAgAEHFABD/BUUNACMAQRBrIgEkACAAQZgDakEcEKYGIQAgAUEIakGfIhD8BSEDIAIoAgwhBCABIAMpAgA3AwAgACABIARBABDmBiEAIAFBEGokACAAIQMLIAJB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QgA3AgAgASgCKCECIAEgADYCGCABIAAoAgA2AhwgACACNgIAIAEoAiwhAiABIABBBGo2AhAgASAAKAIENgIUIAAgAjYCBCABQQhqIAAQkQYgAyABKQMINwMAIAEoAhAgASgCFDYCACABKAIYIAEoAhw2AgBBACECIAMoAgAgAygCBEYNAyABIAAQmwYiAjYCGCACRQ0CIwBBEGsiAiQAIABBmANqQRQQpgYhACABKAIYIQQgAiADKQIAIgU3AwAgAiAFNwMIIABBCkEAQQFBAUEBEKgGIgAgBDYCCCAAQcDCAjYCACAAIAIpAgA3AgwgAkEQaiQAIAAhAgwDCyABQQA2AiggACgCACIDIAAoAgRHBH8gAy0AAAVBAAtB/wFxQckARgRAIAEgAEEAEJcGIgM2AiggA0UNAwsgASAAEJsGIgM2AiAgAwR/IwBBEGsiAyQAIABBmANqQRgQpgYhACABKAIgIQIgAyABKQI4IgU3AwggASgCKCEEIAMgBTcDACAAQQJBAEEBQQFBARCoBiIAIAI2AgggAEGswwI2AgAgAykCACEFIAAgBDYCFCAAIAU3AgwgA0EQaiQAIAAFQQALIQIMAgsgASAAELIGIgM2AjggASAAEIIGIgI2AiggAkUNACADRQ0BIABBmANqQRAQpgYhACABKAI4IQMgAEEDIAEoAigiAi8ABSIAQcABcUEGdiAAQQh2QQNxIABBCnZBA3EQvAYiACACNgIMIAAgAzYCCCAAQZzEAjYCACAAIQIMAQtBACECCyABQUBrJAAgAguRAgEBfyAAKAIAIABBDGpGIQICQCABKAIAIAFBDGpGBEAgAkUEQCAAKAIAENcBIAAgAEEcajYCCCAAIABBDGoiAjYCBCAAIAI2AgALIAEoAgAgASgCBCAAKAIAEKQGIAAgACgCACABKAIEIAEoAgBrQXxxajYCBAwBCyACBEAgACABKAIANgIAIAAgASgCBDYCBCAAIAEoAgg2AgggASABQRxqNgIIIAEgAUEMaiICNgIEIAEgAjYCACAADwsgACgCACECIAAgASgCADYCACABIAI2AgAgACgCBCECIAAgASgCBDYCBCABIAI2AgQgACgCCCECIAAgASgCCDYCCCABIAI2AggLIAEgASgCADYCBCAAC40CAQF/IAAoAgAgAEEMakYhAgJAIAEoAgAgAUEM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BHRqOgAAIANBAWohAyAAQQJqIQAMAQsLIAJByABqIAMQ3wMgAkIANwM4IAJCADcDMCACQgA3AyggAkIANwMgIAIgAisDSDkDECACQRhqIgMgAkEgaiIAQSBB1yggAkEQahD5AiAAajYCBCADIAA2AgAgAiADKQIANwMIIAEgAkEIahCqBhoLIAJB0ABqJAAL/QEBBH8jAEHwAGsiAiQAIABBCGoiACgCACEEIAAoAgQgBGtBAWpBIU8EQCACQeAAaiEDQQAhAANAIABBIEcEQCADQVBBqX8gBCAAQQFyaiwAACIFQTBrQQpJGyAFakEJQQAgACAEaiwAACIFQTBrQQpPGyAFakEEdGo6AAAgA0EBaiEDIABBAmohAAwBCwsgAkHgAGogAxDfAyACQTBqIgBBAEEqENABGiACIAIpA2A3AxAgAiACKQNoNwMYIAJBKGoiAyAAQSpBkiogAkEQahD5AiAAajYCBCADIAA2AgAgAiADKQIANwMIIAEgAkEIahCqBhoLIAJB8ABqJAALgQEBAX8jAEEgayICJAAgAiACQRhqQf8yEPwFKQIANwMIIAEgAkEIahCqBiEBIAAoAggiACABIAAoAgAoAhARAAAgAC8ABUHAAXFBwABHBEAgACABIAAoAgAoAhQRAAALIAIgAkEQakG0OxD8BSkCADcDACABIAIQqgYaIAJBIGokAAueAQEDfyMAQRBrIgIkACACIAE2AgwgACgCACIDIAFBAnRqIgAgACgCjAMiAEEBajYCjAMgAiAANgIIIANBmANqQRAQpgYhACACKAIMIQEgAigCCCEEIABBH0EAQQFBAUEBEKgGIgAgBDYCDCAAIAE2AgggAEGongI2AgAgAiAANgIEIANBzAJqELgGKAIAIAJBBGoQjAYgAkEQaiQAIAALbwIBfwF+IwBBMGsiAiQAIAIgAkEoakH0JRD8BSkCADcDECABIAJBEGoQqgYhASACIAApAggiAzcDCCACIAM3AyAgASACQQhqEKoGIQAgAiACQRhqQYw7EPwFKQIANwMAIAAgAhCqBhogAkEwaiQAC+YBAgN/An4jAEEgayICJAACQCACAn8CQAJAAkAgACgCCA4DAAECBAsgAkEYakHhKRD8BQwCCyACQRBqQYYqEPwFDAELIAJBCGpB3SkQ/AULKQIANwMAIAEgAhCqBhoLIAAoAgwiAARAIABBAWutIQUjAEEwayIAJAAgAEEwaiEEA0AgBEEBayIEIAUgBUIKgCIGQgp+fadBMHI6AAAgBUIJViEDIAYhBSADDQALIABBEGoiAyAAQTBqNgIEIAMgBDYCACAAIAMpAgA3AwggASAAQQhqEKoGGiAAQTBqJAALIAJBIGokAAsuACMAQRBrIgAkACAAIABBCGpBuMIAEPwFKQIANwMAIAEgABCqBhogAEEQaiQACzUAIAAoAggiACABIAAoAgAoAhARAAAgAC8ABUHAAXFBwABHBEAgACABIAAoAgAoAhQRAAALC1IBAn8jAEEQayICJAAgACgCDCIDIAEgAygCACgCEBEAACAAKAIMIAEQvgZFBEAgAiACQQhqQZ3IABD8BSkCADcDACABIAIQqgYaCyACQRBqJAALSwEBfyAAKAIIIgIgASACKAIAKAIQEQAAIAIvAAVBwAFxQcAARwRAIAIgASACKAIAKAIUEQAACyAAKAIMIgAgASAAKAIAKAIUEQAAC54BAQJ/IwBBMGsiAiQAIAJBKGoiAyABQRRqNgIAIAMgASgCFDYCBCABQQA2AhQgAiACQSBqQeMyEPwFKQIANwMQBkAgAEEMaiABIAJBEGoQqgYiABDgBhkgAiQAIAMoAgAgAygCBDYCAAkACyACIAJBGGpBtsIAEPwFKQIANwMIIAAgAkEIahCqBhogAygCACADKAIENgIAIAJBMGokAAtDAQF/IwBBEGsiAiQAIAAoAggiACABIAAoAgAoAhARAAAgAiACQQhqQcA3EPwFKQIANwMAIAEgAhCqBhogAkEQaiQACxYAIAAoAggiACABIAAoAgAoAhQRAAALcwIBfwF+IwBBMGsiAiQAIAIgAkEoakHPKBD8BSkCADcDECABIAJBEGoQqgYhASACIAApAhgiAzcDCCACIAM3AyAgASACQQhqEKoGIQEgAiACQRhqQYw7EPwFKQIANwMAIAAgASACEKoGEPwGIAJBMGokAAu/AQEDfyMAQTBrIgIkACAAQQhqIgQoAgQEQCACQShqIgMgAUEUajYCACADIAEoAhQ2AgQgAUEANgIUIAIgAkEgakGAMxD8BSkCADcDEAZAIAQgASACQRBqEKoGIgQQ4AYZIAIkACADKAIAIAMoAgQ2AgAJAAsgAiACQRhqQbExEPwFKQIANwMIIAQgAkEIahCqBhogAygCACADKAIENgIACyABQSgQ2AYgAEEQaiABEOAGIAFBKRDaBiACQTBqJAALZQEBfyMAQSBrIgIkACACIAJBGGpBlCkQ/AUpAgA3AwggASACQQhqEKoGIQEgACgCCCIALQAEQTBGBEAgACABEPwGCyACIAJBEGpBqgkQ/AUpAgA3AwAgASACEKoGGiACQSBqJAALywECAn8BfiMAQTBrIgIkACABQSgQ2AYgACgCCCIDIAEgAygCACgCEBEAACADLwAFQcABcUHAAEcEQCADIAEgAygCACgCFBEAAAsgAUEpENoGAkAgAEEMaiIAKAIALQAAQe4ARgRAIAIgAkEoakGjOBD8BSkCADcDCCABIAJBCGoQ/wYhASACQSBqIABBARDMBiACIAIpAiA3AwAgASACEP8GGgwBCyACIAApAgAiBDcDECACIAQ3AxggASACQRBqEP8GGgsgAkEwaiQACzQCAX8BfiMAQRBrIgIkACACIAEpAgAiAzcDACACIAM3AwggACACEKoGIQAgAkEQaiQAIAALUAIBfwF+IwBBIGsiAiQAIAIgAkEYakHEGRD8BSkCADcDCCABIAJBCGoQqgYhASACIAApAggiAzcDACACIAM3AxAgASACEKoGGiACQSBqJAAL/AICA38BfiMAQYABayICJAAgAiAANgJ8IAIgATYCeCABQSgQ2AZBACAALQAYIgQgACgCDCIDG0UEQAJAIAQEQCADIAFBA0EBENkGDAELIAJB+ABqEIIHCyACIAJB8ABqQZ3IABD8BSkCADcDOCABIAJBOGoQ/wYhAyACIAApAhAiBTcDMCACIAU3A2ggAyACQTBqEP8GIQMgAiACQeAAakGdyAAQ/AUpAgA3AyggAyACQShqEP8GGgsgAiACQdgAakHANxD8BSkCADcDICABIAJBIGoQ/wYhAQJAIAAtABhFBEAgACgCDEUNAQsgAiACQdAAakGdyAAQ/AUpAgA3AxggASACQRhqEP8GIQMgAiAAKQIQIgU3AxAgAiAFNwNIIAMgAkEQahD/BiEDIAIgAkFAa0GdyAAQ/AUpAgA3AwggAyACQQhqEP8GIQMgAC0AGARAIAJB+ABqEIIHDAELIAAoAgwgA0EDQQEQ2QYLIAFBKRDaBiACQYABaiQAC28BA38jAEEQayICJAAgACgCBCEBIAAoAgBBKBDYBiACQQRqIAEoAggQgwciASAAKAIAIgMgASgCACgCEBEAACABLwAFQcABcUHAAEcEQCABIAMgASgCACgCFBEAAAsgACgCAEEpENoGIAJBEGokAAsjACAAQSZBAEEBQQFBARCoBiIAIAE2AgggAEGEpwI2AgAgAAuHAwEHfyMAQTBrIgMkACADQShqIgIgAUEMajYCACACIAEoAgw2AgQgAUF/NgIMIAIhBSADQSBqIgIgAUEQajYCACACIAEoAhA2AgQgAUF/NgIQIAIhBiABKAIEIQQGQCAAKAIIIgIgASACKAIAKAIQEQAAIAIvAAVBwAFxQcAARwRAIAIgASACKAIAKAIUEQAAC0EBIQcCQAJAAkACQCABKAIQIghBAWoOAgIAAQsgASAENgIEDAILA0AgByAITw0CIAMgA0EQakGQyAAQ/AUpAgA3AwAgASADEKoGIQIgASAHNgIMIAAoAggiBCACIAQoAgAoAhARAAAgBC8ABUHAAXFBwABHBEAgBCACIAQoAgAoAhQRAAALIAdBAWohBwwACwALIAMgA0EYakHANxD8BSkCADcDCCABIANBCGoQqgYaCyAGKAIAIAYoAgQ2AgAgBSgCACAFKAIENgIAIANBMGokAA8ZIAMkACAGKAIAIAYoAgQ2AgAgBSgCACAFKAIENgIACQALAAuMAgEDfyMAQRBrIgQkAAJAIAAtABAEQCABQdsAEPsFIQIgACgCCCIDIAIgAygCACgCEBEAACADLwAFQcABcUHAAEcEQCADIAIgAygCACgCFBEAAAsgAkHdABD7BRoMAQsgAUEuEPsFIQIgACgCCCIDIAIgAygCACgCEBEAACADLwAFQcABcUHAAEcEQCADIAIgAygCACgCFBEAAAsLIAAoAgwiAi0ABEHNAGtB/wFxQQJPBEAgBCAEQQhqQZrDABD8BSkCADcDACABIAQQqgYaIAAoAgwhAgsgAiABIAIoAgAoAhARAAAgAi8ABUHAAXFBwABHBEAgAiABIAIoAgAoAhQRAAALIARBEGokAAuYAgECfyMAQSBrIgMkACABQdsAEPsFIQEgACgCCCICIAEgAigCACgCEBEAACACLwAFQcABcUHAAEcEQCACIAEgAigCACgCFBEAAAsgAyADQRhqQYrIABD8BSkCADcDCCABIANBCGoQqgYhASAAKAIMIgIgASACKAIAKAIQEQAAIAIvAAVBwAFxQcAARwRAIAIgASACKAIAKAIUEQAACyABQd0AEPsFIQEgACgCECICLQAEQc0Aa0H/AXFBAk8EfyADIANBEGpBmsMAEPwFKQIANwMAIAEgAxCqBhogACgCEAUgAgsiACABIAAoAgAoAhARAAAgAC8ABUHAAXFBwABHBEAgACABIAAoAgAoAhQRAAALIANBIGokAAsuACAAQcIAQQBBAUEBQQEQqAYiACABNgIIIABBzKkCNgIAIAAgAikCADcCDCAAC1cBAX8gACgCCCICBEAgAiABIAIoAgAoAhARAAAgAi8ABUHAAXFBwABHBEAgAiABIAIoAgAoAhQRAAALCyAAQQxqIAFB+wAQ+wUiABDgBiAAQf0AEPsFGguGAQEBfyABQSgQ2AYgACgCCCICIAEgAigCACgCEBEAACACLwAFQcABcUHAAEcEQCACIAEgAigCACgCFBEAAAsgAUEpENoGIAFBKBDYBiAAKAIMIgAgASAAKAIAKAIQEQAAIAAvAAVBwAFxQcAARwRAIAAgASAAKAIAKAIUEQAACyABQSkQ2gYL3QIBAn8jAEHgAGsiAiQAIAAoAgwiAyABIAMoAgAoAhARAAAgAy8ABUHAAXFBwABHBEAgAyABIAMoAgAoAhQRAAALIAIgAkHYAGpB/DIQ/AUpAgA3AyAgASACQSBqEKoGIQMgACgCCCIBIAMgASgCACgCEBEAACABLwAFQcABcUHAAEcEQCABIAMgASgCACgCFBEAAAsgAiACQdAAakHSPhD8BSkCADcDGCADIAJBGGoQqgYhASACAn8gAEEQaiIAKAIAIAAoAgRGBEAgAkHIAGpBtzQQ/AUMAQsgACgCAC0AAEHuAEYEQCACIAJBQGtBozgQ/AUpAgA3AxAgASACQRBqEKoGGiACQThqIgMgAEEBEMwGIAMMAQsgAiAAKQIANwMwIAJBMGoLKQIANwMIIAEgAkEIahCqBiEAIAIgAkEoakGxMRD8BSkCADcDACAAIAIQqgYaIAJB4ABqJAALTgEBfyMAQSBrIgIkACACIAJBGGpBujcQ/AUpAgA3AwAgASACEKoGIgFBKBDYBiACQQxqIAAoAggQgwcgARCEByABQSkQ2gYgAkEgaiQACwwAIABBCGogARDgBgtjAQF/IwBBEGsiAiQAIAIgAkEIakG2PhD8BSkCADcDACABIAIQqgYhASAAKAIIIgAgASAAKAIAKAIQEQAAIAAvAAVBwAFxQcAARwRAIAAgASAAKAIAKAIUEQAACyACQRBqJAALlgEBAn8jAEEQayICJAAgACgCCCIDIAEgAygCACgCEBEAACADLwAFQcABcUHAAEcEQCADIAEgAygCACgCFBEAAAsgAiACQQhqQZgzEPwFKQIANwMAIAEgAhCqBiEBIAAoAgwiACABIAAoAgAoAhARAAAgAC8ABUHAAXFBwABHBEAgACABIAAoAgAoAhQRAAALIAJBEGokAAsWACAAIAEoAgwiACAAKAIAKAIYEQAACzcAIABBmANqQQwQpgYhACABKAIAIQEgAEEEQQBBAUEBQQEQqAYiACABNgIIIABBtLACNgIAIAALRAEBfyMAQRBrIgIkACACIAJBCGpBqAkQ/AUpAgA3AwAgASACEKoGIQEgACgCCCIAIAEgACgCACgCEBEAACACQRBqJAALYwEBfyMAQRBrIgIkACACIAJBCGpB7j8Q/AUpAgA3AwAgASACEKoGIQEgACgCCCIAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsgAkEQaiQAC2QBAX8jAEEQayICJAAgAiACQQhqQZPIABD8BSkCADcDACABIAIQqgYhASAAKAIIIgAgASAAKAIAKAIQEQAAIAAvAAVBwAFxQcAARwRAIAAgASAAKAIAKAIUEQAACyACQRBqJAALYwEBfyMAQRBrIgIkACACIAJBCGpBmDMQ/AUpAgA3AwAgASACEKoGIQEgACgCCCIAIAEgACgCACgCEBEAACAALwAFQcABcUHAAEcEQCAAIAEgACgCACgCFBEAAAsgAkEQaiQACxYAIAAgASgCCCIAIAAoAgAoAhgRAAALIwAgACACQQBBAUEBQQEQqAYiACABNgIIIABBwLQCNgIAIAALTwEBfyMAQSBrIgIkACACIAJBGGpBlTMQ/AUpAgA3AwggASACQQhqEP8GIQEgAkEQaiAAEJgHIAIgAikCEDcDACABIAIQ/wYaIAJBIGokAAtvAQF/IwBBIGsiAiQAIAAgARCZBwJAIAEoAghBAUsEQCACIAJBGGpB2igQ/AUpAgA3AwggACACQQhqEIgGRQ0BIAJBEGogAEEGEMwG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dWdoIG1lbW9yeQBGZWJydWFyeQBKYW51YXJ5ACBpbWFnaW5hcnkASnVseQBwb3BUcmFpbGluZ05vZGVBcnJheQBUaHVyc2RheQBUdWVzZGF5AFdlZG5lc2RheQBTYXR1cmRheQBTdW5kYXkATW9uZGF5AEZyaWRheQBNYXkAVHkAJW0vJWQvJXkAbngAdW5pcXVlX2xvY2s6OmxvY2s6IHJlZmVyZW5jZXMgbnVsbCBtdXRleAAgY29tcGxleAAvaG5zd2xpYi1pbmRleABpbml0SW5kZXgAcmVzaXplSW5kZXgAd3JpdGVJbmRleAByZWFkSW5kZXgARHgALSsgICAwWDB4AC0wWCswWCAwWC0weCsweCAweAB0dwB0aHJvdwBfX25leHRfcHJpbWUgb3ZlcmZsb3cAb3BlcmF0b3IgbmV3AER3AE5vdgBEdgBUaHUAVHUAQXVndXN0ACBjb25zdABOb3QgZW5vdWdoIG1lbW9yeTogbG9hZEluZGV4IGZhaWxlZCB0byBhbGxvY2F0ZSBsaW5rbGlzdABOb3QgZW5vdWdoIG1lbW9yeTogYWRkUG9pbnQgZmFpbGVkIHRvIGFsbG9jYXRlIGxpbmtsaXN0AFRoZSBuZXdseSBpbnNlcnRlZCBlbGVtZW50IHNob3VsZCBoYXZlIGJsYW5rIGxpbmsgbGlzdABnZXRJZHNMaXN0AH5TY29wZWRUZW1wbGF0ZVBhcmFtTGlzdABjb25zdF9jYXN0AHJlaW50ZXJwcmV0X2Nhc3QAc3RkOjpiYWRfY2FzdABzdGF0aWNfY2FzdABkeW5hbWljX2Nhc3QAdW5zaWduZWQgc2hvcnQAbm9leGNlcHQAayA8PSBjdXJfZWxlbWVudF9jb3VudABpbnRlcm5hbElkIDwgY3VyX2VsZW1lbnRfY291bnQAZ2V0Q3VycmVudENvdW50AGdldFBvaW50AG5vcm1hbGl6ZVBvaW50AHJlbW92ZVBvaW50AGFkZFBvaW50AHVuc2lnbmVkIGludABfQml0SW50AFRoZSBudW1iZXIgb2YgZWxlbWVudHMgZXhjZWVkcyB0aGUgc3BlY2lmaWVkIGxpbWl0AG9wZXJhdG9yIGNvX2F3YWl0AHVuY2F1Z2h0AHN0cnVjdAAgcmVzdHJpY3QAb2JqY19vYmplY3QAT2N0AGZsb2F0AF9GbG9hdABTYXQAc3RkOjpudWxscHRyX3QAd2NoYXJfdABjaGFyOF90AGNoYXIxNl90AHVpbnQ2NF90AGNoYXIzMl90AFV0AFR0AFN0AE5vdCBlbm91Z2ggbWVtb3J5OiBsb2FkSW5kZXggZmFpbGVkIHRvIGFsbG9jYXRlIGxpbmtsaXN0cwBOb3QgZW5vdWdoIG1lbW9yeTogSGllcmFyY2hpY2FsTlNXIGZhaWxlZCB0byBhbGxvY2F0ZSBsaW5rbGlzdHMAUGFyc2VyLT5UZW1wbGF0ZVBhcmFtcy5zaXplKCkgPj0gT2xkTnVtVGVtcGxhdGVQYXJhbUxpc3RzAENhbm5vdCByZXNpemUsIG1heCBlbGVtZW50IGlzIGxlc3MgdGhhbiB0aGUgY3VycmVudCBudW1iZXIgb2YgZWxlbWVudHMAZ2V0TWF4RWxlbWVudHMAbmVpZ2hib3JzAE5vdCBlbm91Z2ggbWVtb3J5OiByZXNpemVJbmRleCBmYWlsZWQgdG8gYWxsb2NhdGUgb3RoZXIgbGF5ZXJzAGdldE51bURpbWVuc2lvbnMAbWFya0RlbGV0ZUl0ZW1zAGFkZEl0ZW1zAHRoaXMAZ3MAZGlzdGFuY2VzAFRzAHN5bmNGcwB0ZXJtaW5hdGluZyBkdWUgdG8gJXMgZXhjZXB0aW9uIG9mIHR5cGUgJXMAdGVybWluYXRpbmcgZHVlIHRvICVzIGV4Y2VwdGlvbiBvZiB0eXBlICVzOiAlcwBudWxscHRyAGFkZEl0ZW1zV2l0aFB0cgBzcgBBcHIAUmVwbGFjZW1lbnQgb2YgZGVsZXRlZCBlbGVtZW50cyBpcyBkaXNhYmxlZCBpbiBjb25zdHJ1Y3RvcgBDdXN0b21GaWx0ZXJGdW5jdG9yAHZlY3RvcgBvcGVyYXRvcgBhbGxvY2F0b3IAdW5zcGVjaWZpZWQgaW9zdHJlYW1fY2F0ZWdvcnkgZXJyb3IAbW9uZXlfZ2V0IGVycm9yAExldmVsIGVycm9yAGNhbmQgZXJyb3IATm90IGVub3VnaCBtZW1vcnk6IHJlc2l6ZUluZGV4IGZhaWxlZCB0byBhbGxvY2F0ZSBiYXNlIGxheWVyAHJlYWRFbmNvZGVkUG9pbnRlcgBCYWQgdmFsdWUgb2Ygc3pfbGlua19saXN0X290aGVyAEVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcgBPY3RvYmVyAE5vdmVtYmVyAFNlcHRlbWJlcgBEZWNlbWJlcgB1bnNpZ25lZCBjaGFyAGlvc19iYXNlOjpjbGVhcgBNYXIAc3AAL2Vtc2RrL2Vtc2NyaXB0ZW4vc3lzdGVtL2xpYi9saWJjeHhhYmkvc3JjL2N4YV9wZXJzb25hbGl0eS5jcHAAL2Vtc2RrL2Vtc2NyaXB0ZW4vc3lzdGVtL2xpYi9saWJjeHhhYmkvc3JjL2N4YV9kZW1hbmdsZS5jcHAAb3AAZnAAU2VwAFRwACVJOiVNOiVTICVwAGF1dG8Ab2JqY3Byb3RvAHNvAERvAFN1bgBKdW4AeXB0bgBQb3NzaWJsZSBtZW1vcnkgY29ycnVwdGlvbgBzdGQ6OmV4Y2VwdGlvbgB0ZXJtaW5hdGluZyBkdWUgdG8gJXMgZm9yZWlnbiBleGNlcHRpb24AdGVybWluYXRlX2hhbmRsZXIgdW5leHBlY3RlZGx5IHRocmV3IGFuIGV4Y2VwdGlvbgBDdXJyZW50UG9zaXRpb24AdW5pb24ATW9uAHNlYXJjaEtubgBkbgBuYW4ASmFuAFRuAERuAGVudW0Ac3lzdGVtAGluaXRpYWxpemVGaWxlU3lzdGVtAHBhcnNlVGVtcGxhdGVQYXJhbQBiYXNpY19pb3N0cmVhbQBiYXNpY19vc3RyZWFtAGJhc2ljX2lzdHJlYW0ASnVsAHRsAGJvb2wAZ2V0U3ltYm9sAHVsbABjYWxsAEFwcmlsAExldmVsIG9mIGl0ZW0gdG8gYmUgdXBkYXRlZCBjYW5ub3QgYmUgYmlnZ2VyIHRoYW4gbWF4IGxldmVsAFRyeWluZyB0byBtYWtlIGEgbGluayBvbiBhIG5vbi1leGlzdGVudCBsZXZlbABlbXNjcmlwdGVuOjp2YWwAc3RyaW5nIGxpdGVyYWwAdW5tYXJrRGVsZXRlZEludGVybmFsAFVsAHBvcF9iYWNrAGRyb3BCYWNrAEZyaQBwaQBsaQBiYWRfYXJyYXlfbmV3X2xlbmd0aABzZXRFZlNlYXJjaABnZXRFZlNlYXJjaABCcnV0ZWZvcmNlU2VhcmNoAE1hcmNoAC9lbXNkay9lbXNjcmlwdGVuL3N5c3RlbS9saWIvbGliY3h4YWJpL3NyYy9kZW1hbmdsZS9VdGlsaXR5LmgAL2Vtc2RrL2Vtc2NyaXB0ZW4vc3lzdGVtL2xpYi9saWJjeHhhYmkvc3JjL2RlbWFuZ2xlL1N0cmluZ1ZpZXcuaAAuLy4vc3JjL2huc3dsaWIvaG5zd2FsZy5oAC9lbXNkay9lbXNjcmlwdGVuL3N5c3RlbS9saWIvbGliY3h4YWJpL3NyYy9kZW1hbmdsZS9JdGFuaXVtRGVtYW5nbGUuaAAuLy4vc3JjL2huc3dsaWIvYnJ1dGVmb3JjZS5oAEF1ZwB1bnNpZ25lZCBsb25nIGxvbmcAdW5zaWduZWQgbG9uZwB0ZXJtaW5hdGluZwBzdGQ6OndzdHJpbmcAYmFzaWNfc3RyaW5nAHN0ZDo6c3RyaW5nAHN0ZDo6dTE2c3RyaW5nAHN0ZDo6dTMyc3RyaW5nAF9fdXVpZG9mAGluZgBUcnlpbmcgdG8gY29ubmVjdCBhbiBlbGVtZW50IHRvIGl0c2VsZgBoYWxmACVhZgAlLjBMZgAlTGYAdHJ1ZQBUdWUAb3BlcmF0b3IgZGVsZXRlAHVubWFya0RlbGV0ZQBmYWxzZQBkZWNsdHlwZQBKdW5lAGNvc2luZQBnZXRCYXNlTmFtZQAgdm9sYXRpbGUAQ2Fubm90IG9wZW4gZmlsZQBfX2N4YV9kZW1hbmdsZQBsb25nIGRvdWJsZQBfYmxvY2tfaW52b2tlAEZvcndhcmRSZWYtPmdldEtpbmQoKSA9PSBOb2RlOjpLRm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlAGRpc3RhbmNlAElubmVyUHJvZHVjdFNwYWNlAEwyU3BhY2UAVGUAc3RkAExhYmVsIG5vdCBmb3VuZAB2b2lkAGlzSW5kZXhJbml0aWFsaXplZABpc0luaXRpYWxpemVkAEluZGV4IHNlZW1zIHRvIGJlIGNvcnJ1cHRlZCBvciB1bnN1cHBvcnRlZABsb2NhbGUgbm90IHN1cHBvcnRlZABUaGUgcmVxdWVzdGVkIHRvIGRlbGV0ZSBlbGVtZW50IGlzIGFscmVhZHkgZGVsZXRlZABUaGUgcmVxdWVzdGVkIHRvIHVuZGVsZXRlIGVsZW1lbnQgaXMgbm90IGRlbGV0ZWQAdW5leHBlY3RlZAB0ZXJtaW5hdGVfaGFuZGxlciB1bmV4cGVjdGVkbHkgcmV0dXJuZWQAJ3VubmFtZWQAbXV0ZXggbG9jayBmYWlsZWQAVGhlIG1heGltdW0gbnVtYmVyIG9mIGVsZW1lbnRzIGhhcyBiZWVuIHJlYWNoZWQAV2VkAFVua25vd24gZXJyb3IgJWQAc3RkOjpiYWRfYWxsb2MAbWMAU2hvdWxkIGJlIG5vdCBiZSBtb3JlIHRoYW4gTV8gY2FuZGlkYXRlcyByZXR1cm5lZCBieSB0aGUgaGV1cmlzdGljAGdlbmVyaWMARGVjAHdiAHJiAEZlYgBzY2FuX2VoX3RhYgBVYgB3K2IAcitiAGErYgByd2EATm90IGVub3VnaCBtZW1vcnk6IGxvYWRJbmRleCBmYWlsZWQgdG8gYWxsb2NhdGUgZGF0YQBOb3QgZW5vdWdoIG1lbW9yeTogQnJ1dGVmb3JjZVNlYXJjaCBmYWlsZWQgdG8gYWxsb2NhdGUgZGF0YQAnbGFtYmRhACVhAGJhc2ljXwBvcGVyYXRvcl4Ab3BlcmF0b3IgbmV3W10Ab3BlcmF0b3JbXQBvcGVyYXRvciBkZWxldGVbXQBwaXhlbCB2ZWN0b3JbAHNaAF9fX19aACVhICViICVkICVIOiVNOiVTICVZAFBPU0lYAEhpZXJhcmNoaWNhbE5TVwBmcFQAJFRUACRUACVIOiVNOiVTAHNQAERPAHNyTgBfR0xPQkFMX19OAE5BTgAkTgBQTQBBTQBmTAAlTGFMAExDX0FMTABVYTllbmFibGVfaWZJAExBTkcASU5GAHZFAGFjdGlvbnMgJiBfVUFfQ0xFQU5VUF9QSEFTRQBhY3Rpb25zICYgX1VBX1NFQVJDSF9QSEFTRQBSRQBPRQBiMUUAYjBFAHJlc3VsdHMucmVhc29uID09IF9VUkNfSEFORExFUl9GT1VORABEQwBvcGVyYXRvcj8AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2hvcnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIHNob3J0PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGludD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8ZmxvYXQ+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQ4X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDhfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dWludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGludDE2X3Q+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVpbnQ2NF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzxpbnQ2NF90PgBlbXNjcmlwdGVuOjptZW1vcnlfdmlldzx1aW50MzJfdD4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8aW50MzJfdD4Ab3BlcmF0b3I+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGNoYXI+ADxjaGFyLCBzdGQ6OmNoYXJfdHJhaXRzPGNoYXI+ACwgc3RkOjphbGxvY2F0b3I8Y2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8dW5zaWduZWQgY2hhcj4Ac3RkOjpiYXNpY19zdHJpbmc8dW5zaWduZWQgY2hhcj4AZW1zY3JpcHRlbjo6bWVtb3J5X3ZpZXc8c2lnbmVkIGNoYXI+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGxvbmc+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PHVuc2lnbmVkIGxvbmc+AGVtc2NyaXB0ZW46Om1lbW9yeV92aWV3PGRvdWJsZT4Ab3BlcmF0b3I+PgBvcGVyYXRvcjw9PgBvcGVyYXRvci0+AG9wZXJhdG9yfD0Ab3BlcmF0b3I9AG9wZXJhdG9yXj0Ab3BlcmF0b3I+PQBvcGVyYXRvcj4+PQBvcGVyYXRvcj09AG9wZXJhdG9yPD0Ab3BlcmF0b3I8PD0Ab3BlcmF0b3IvPQBvcGVyYXRvci09AG9wZXJhdG9yKz0Ab3BlcmF0b3IqPQBvcGVyYXRvciY9AG9wZXJhdG9yJT0Ab3BlcmF0b3IhPQBvcGVyYXRvcjwAdGVtcGxhdGU8AGlkPABvcGVyYXRvcjw8AC48ACI8AFthYmk6ACBbZW5hYmxlX2lmOgBzdGQ6OgAwMTIzNDU2Nzg5AHVuc2lnbmVkIF9faW50MTI4AF9fZmxvYXQxMjgAZGVjaW1hbDEyOABDLlVURi04AGRlY2ltYWw2NABkZWNpbWFsMzIAX19neHhfcGVyc29uYWxpdHlfd2FzbTAATm90IGVub3VnaCBtZW1vcnk6IGxvYWRJbmRleCBmYWlsZWQgdG8gYWxsb2NhdGUgbGV2ZWwwAG9wZXJhdG9yLwBJbnZhbGlkIGNhbGxiYWNrIGZ1bmN0aW9uIGZvciBDdXN0b21GaWx0ZXJGdW5jdG9yLgBvcGVyYXRvci4ASW52YWxpZCB0aGUgZmlyc3QgYXJndW1lbnQgdHlwZSwgbXVzdCBiZSBhIG51bWJlci4AVGhlIG51bWJlciBvZiB2ZWN0b3JzIGFuZCBpZHMgbXVzdCBiZSB0aGUgc2FtZS4AU2VhcmNoIGluZGV4IGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCwgY2FsbCBgaW5pdEluZGV4YCBpbiBhZHZhbmNlLgBDYW4ndCB1c2UgYWRkUG9pbnQgdG8gdXBkYXRlIGRlbGV0ZWQgZWxlbWVudHMgaWYgcmVwbGFjZW1lbnQgb2YgZGVsZXRlZCBlbGVtZW50cyBpcyBlbmFibGVkLgBUaGUgbnVtYmVyIG9mIHZlY3RvcnMgYW5kIGlkcyBtdXN0IGJlIGdyZWF0ZXIgdGhhbiAwLgBzaXplb2YuLi4ASW52YWxpZCB0aGUgbnVtYmVyIG9mIGstbmVhcmVzdCBuZWlnaGJvcnMgKG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXIpLgBvcGVyYXRvci0ALWluLQBvcGVyYXRvci0tAG9wZXJhdG9yLAB3KwBvcGVyYXRvcisAYSsAb3BlcmF0b3IrKwBvcGVyYXRvcioAb3BlcmF0b3ItPioAOjoqAG9wZXJhdG9yLioAZGVjbHR5cGUoYXV0bykAKG51bGwpAChhbm9ueW1vdXMgbmFtZXNwYWNlKQBhY3Rpb25zICYgKF9VQV9TRUFSQ0hfUEhBU0UgfCBfVUFfRk9SQ0VfVU5XSU5EKQBhY3Rpb25zICYgKF9VQV9TRUFSQ0hfUEhBU0UgfCBfVUFfSEFORExFUl9GUkFNRSB8IF9VQV9GT1JDRV9VTldJTkQpAFBhcnNlci5Gb3J3YXJkVGVtcGxhdGVSZWZzLmVtcHR5KCkAIWVtcHR5KCkAb3BlcmF0b3IoKQBGcm9tUG9zaXRpb24gPD0gTmFtZXMuc2l6ZSgpAFNWLnN0YXJ0c1dpdGgoImJhc2ljXyIpACAoACdibG9jay1saXRlcmFsJwBvcGVyYXRvciYAb3BlcmF0b3ImJgAgJiYAICYAb3BlcmF0b3IlAD4iAChiYXNlICE9IDApICYmICJEV19FSF9QRV9kYXRhcmVsIGlzIGludmFsaWQgd2l0aCBhIGJhc2Ugb2YgMCIAUmVzLnN0YXJ0c1dpdGgoIm9wZXJhdG9yIikgJiYgIm9wZXJhdG9yIG5hbWUgZG9lcyBub3Qgc3RhcnQgd2l0aCAnb3BlcmF0b3InIgBJbmRleCA8IHNpemUoKSAmJiAiSW52YWxpZCBhY2Nlc3MhIgBMYXN0ICE9IEZpcnN0ICYmICJDYWxsaW5nIGJhY2soKSBvbiBlbXB0eSB2ZWN0b3IhIgBMYXN0ICE9IEZpcnN0ICYmICJQb3BwaW5nIGVtcHR5IHZlY3RvciEiAEluZGV4IDw9IHNpemUoKSAmJiAiZHJvcEJhY2soKSBjYW4ndCBleHBhbmQhIgBvcGVyYXRvciEAUHVyZSB2aXJ0dWFsIGZ1bmN0aW9uIGNhbGxlZCEASW52YWxpZCB2ZWN0b3Igc2l6ZSBhdCBpbmRleCAAdGhyb3cgAG5vZXhjZXB0IAAsIGJ1dCBnb3QgACBhdCBvZmZzZXQgAENvdWxkIG5vdCBtYXJrRGVsZXRlSXRlbXMgAENvdWxkIG5vdCBhZGRJdGVtcyAASW52YWxpZCB2ZWN0b3Igc2l6ZS4gTXVzdCBiZSBlcXVhbCB0byB0aGUgZGltZW5zaW9uIG9mIHRoZSBzcGFjZS4gVGhlIGRpbWVuc2lvbiBvZiB0aGUgc3BhY2UgaXMgAG9wZXJhdG9yIAByZWZlcmVuY2UgdGVtcG9yYXJ5IGZvciAAdGVtcGxhdGUgcGFyYW1ldGVyIG9iamVjdCBmb3IgAHR5cGVpbmZvIGZvciAAdGhyZWFkLWxvY2FsIHdyYXBwZXIgcm91dGluZSBmb3IgAHRocmVhZC1sb2NhbCBpbml0aWFsaXphdGlvbiByb3V0aW5lIGZvciAAdHlwZWluZm8gbmFtZSBmb3IgAGNvbnN0cnVjdGlvbiB2dGFibGUgZm9yIABndWFyZCB2YXJpYWJsZSBmb3IgAFZUVCBmb3IgAGNvdmFyaWFudCByZXR1cm4gdGh1bmsgdG8gAG5vbi12aXJ0dWFsIHRodW5rIHRvIABpbnZvY2F0aW9uIGZ1bmN0aW9uIGZvciBibG9jayBpbiAAYWxpZ25vZiAAc2l6ZW9mIAA+IHR5cGVuYW1lIABpbml0aWFsaXplciBmb3IgbW9kdWxlIAB0eXBlaWQgAEludmFsaWQgdGhlIGdpdmVuIGFycmF5IGxlbmd0aCAoZXhwZWN0ZWQgAHVuc2lnbmVkIAAgPyAAID0gAEZhaWxlZCB0byBub3JtYWxpemUgdGhlIHBvaW50LCBjaGVjayB2ZWN0b3IgZGltZW5zaW9uczogAEhuc3dsaWIgRXJyb3I6IABGYWlsZWQgdG8gY2FsbCB0aGUgY2FsbGJhY2sgZnVuY3Rpb246IABsaWJjKythYmk6IABUaGUgbWF4aW11bSBudW1iZXIgb2YgZWxlbWVudHMgaGFzIGJlZW4gcmVhY2hlZCBpbiBpbmRleCwgcGxlYXNlIGluY3JlYXNlIHRoZSBpbmRleCBtYXhfc2l6ZS4gIG1heF9zaXplOiAAVGhlIG1heGltdW0gbnVtYmVyIG9mIGVsZW1lbnRzIGhhcyBiZWVuIHJlYWNoZWQgaW4gaW5kZXgsIHBsZWFzZSBpbmNyZWFzZWQgdGhlIGluZGV4IG1heF9zaXplLiAgbWF4X3NpemU6IABUaGUgbWF4aW11bSBudW1iZXIgb2YgZWxlbWVudHMgaW4gdGhlIGluZGV4IGhhcyBiZWVuIHJlYWNoZWQuICwgcGxlYXNlIGluY3JlYXNlZCB0aGUgaW5kZXggbWF4X3NpemUuICBtYXhfc2l6ZTogAGludmFsaWQgc3BhY2Ugc2hvdWxkIGJlIGV4cGVjdGVkIGwyLCBpcCwgb3IgY29zaW5lLCBuYW1lOiAASW52YWxpZCB0aGUgbnVtYmVyIG9mIGstbmVhcmVzdCBuZWlnaGJvcnMgKGNhbm5vdCBiZSBnaXZlbiBhIHZhbHVlIGdyZWF0ZXIgdGhhbiBgbWF4RWxlbWVudHNgOiAAIDogAHNpemVvZi4uLiAAIC4uLiAALCAAb3BlcmF0b3IiIiAAVGhlIG51bWJlciBvZiBlbGVtZW50cyBleGNlZWRzIHRoZSBzcGVjaWZpZWQgbGltaXQKAGlpAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWZFRQAAAABcfwAAViQAAJwkAACcJAAATjEwZW1zY3JpcHRlbjN2YWxFAABcfwAAiCQAAGlpaQBOMTBlbXNjcmlwdGVuN0wyU3BhY2VFAABcfwAAqCQAAFBOMTBlbXNjcmlwdGVuN0wyU3BhY2VFADyAAADIJAAAAAAAAMAkAABQS04xMGVtc2NyaXB0ZW43TDJTcGFjZUUAAAAAPIAAAPAkAAABAAAAwCQAAGlpAHYAdmkA4CQAAAR/AAAAAAAAhCUAAHEAAAByAAAAcwAAAHQAAAB1AAAATjdobnN3bGliN0wyU3BhY2VFAE43aG5zd2xpYjE0U3BhY2VJbnRlcmZhY2VJZkVFAAAAAFx/AABbJQAAhH8AAEglAAB8JQAAQH8AAOAkAACcJAAAnCQAAGZpaWlpAAAABH8AAOAkAABOMTBlbXNjcmlwdGVuMTdJbm5lclByb2R1Y3RTcGFjZUUAAABcfwAAsCUAAFBOMTBlbXNjcmlwdGVuMTdJbm5lclByb2R1Y3RTcGFjZUUAADyAAADcJQAAAAAAANQlAABQS04xMGVtc2NyaXB0ZW4xN0lubmVyUHJvZHVjdFNwYWNlRQA8gAAAECYAAAEAAADUJQAAACYAAAR/AAAAAAAAiCYAAHYAAAB3AAAAeAAAAHQAAAB5AAAATjdobnN3bGliMTdJbm5lclByb2R1Y3RTcGFjZUUAAACEfwAAaCYAAHwlAEGgzQALogVAfwAAACYAAJwkAACcJAAABH8AAAAmAABOMTBlbXNjcmlwdGVuMTlDdXN0b21GaWx0ZXJGdW5jdG9yRQBON2huc3dsaWIxN0Jhc2VGaWx0ZXJGdW5jdG9yRQAAAFx/AADcJgAAhH8AALgmAAD8JgAAUE4xMGVtc2NyaXB0ZW4xOUN1c3RvbUZpbHRlckZ1bmN0b3JFAAAAADyAAAAQJwAAAAAAAAQnAABQS04xMGVtc2NyaXB0ZW4xOUN1c3RvbUZpbHRlckZ1bmN0b3JFAAAAPIAAAEgnAAABAAAABCcAADgnAACcJAAAAAAAAAQnAAB6AAAAewAAAHwAAACwfgAAnCQAABx/AACwfgAAOCcAABx/AABpaWlpAE4xMGVtc2NyaXB0ZW4xNkJydXRlZm9yY2VTZWFyY2hFAAAAXH8AALknAABQTjEwZW1zY3JpcHRlbjE2QnJ1dGVmb3JjZVNlYXJjaEUAAAA8gAAA5CcAAAAAAADcJwAAUEtOMTBlbXNjcmlwdGVuMTZCcnV0ZWZvcmNlU2VhcmNoRQAAPIAAABgoAAABAAAA3CcAAAgoAACYKAAABH8AAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0ljTlNfMTFjaGFyX3RyYWl0c0ljRUVOU185YWxsb2NhdG9ySWNFRUVFAABcfwAAWCgAAJh+AAAIKAAABH8AAHZpaWkAAAAAAAAAACApAAB9AAAAfgAAAH8AAACAAAAAgQAAAIIAAABON2huc3dsaWIxNkJydXRlZm9yY2VTZWFyY2hJZkVFAE43aG5zd2xpYjE4QWxnb3JpdGhtSW50ZXJmYWNlSWZFRQAAAFx/AAD0KAAAhH8AANQoAAAYKQAAAAAAAJwkAAAIKAAAmH4AAAgoAACYKABB0NIACxWYfgAACCgAAJwkAAAEfwAAdmlpaWkAQfDSAAuWA5wkAAAIKAAAnCQAAAR/AACcJAAAaWlpaWlpAAAEfwAACCgAAE4xMGVtc2NyaXB0ZW4xNUhpZXJhcmNoaWNhbE5TV0UAXH8AAJQpAABQTjEwZW1zY3JpcHRlbjE1SGllcmFyY2hpY2FsTlNXRQAAAAA8gAAAvCkAAAAAAAC0KQAAUEtOMTBlbXNjcmlwdGVuMTVIaWVyYXJjaGljYWxOU1dFAAAAPIAAAPApAAABAAAAtCkAAOApAACYKAAABH8AAJh+AADgKQAABH8AAAR/AAAEfwAABH8AALB+AAB2aWlpaWlpaQAAAAAAAAAAmCoAAIMAAACEAAAAfwAAAIUAAACGAAAAhwAAAE43aG5zd2xpYjE1SGllcmFyY2hpY2FsTlNXSWZFRQAAhH8AAHgqAAAYKQAAmH4AAOApAAAEfwAAmH4AAOApAAAEfwAABH8AAJh+AADgKQAABH8AAAR/AAAEfwAAdmlpaWlpAAAAAAAAmH4AAOApAAAEfwAABH8AAAR/AAAEfwAAdmlpaWlpaQCcJAAA4CkAQZDWAAsmmH4AAOApAACYKAAAsH4AAJh+AADgKQAAmCgAAJwkAADgKQAABH8AQcDWAAsSmH4AAOApAACcJAAABH8AALB+AEHg1gALIph+AADgKQAAnCQAAAR/AACYfgAA4CkAAJwkAACcJAAAsH4AQZDXAAtmmH4AAOApAACcJAAABH8AAJwkAAAEfwAAsH4AAPh+AADgKQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJaUVFAABcfwAAtCsAAJwkAADgKQAAmH4AAOApAACcJAAABH8AABQqAEGA2AALEpwkAADgKQAAnCQAAAR/AACcJABBoNgAC9M4nCQAAOApAACcJAAABH8AAGlpaWlpAAAAmH4AALB+AAB2aWkATjEwZW1zY3JpcHRlbjI3RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyRQBcfwAARCwAAFBOMTBlbXNjcmlwdGVuMjdFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXJFAAAAADyAAAB4LAAAAAAAAHAsAABQS04xMGVtc2NyaXB0ZW4yN0Vtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlckUAAAA8gAAAuCwAAAEAAABwLAAAqCwAAJh+AACYKAAAaWkAALB+AACYfgAAsH4AAJwkAACYfgAAnCQAAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0loTlNfMTFjaGFyX3RyYWl0c0loRUVOU185YWxsb2NhdG9ySWhFRUVFAABcfwAAIC0AAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0l3TlNfMTFjaGFyX3RyYWl0c0l3RUVOU185YWxsb2NhdG9ySXdFRUVFAABcfwAAaC0AAE5TdDNfXzIxMmJhc2ljX3N0cmluZ0lEc05TXzExY2hhcl90cmFpdHNJRHNFRU5TXzlhbGxvY2F0b3JJRHNFRUVFAAAAXH8AALAtAABOU3QzX18yMTJiYXNpY19zdHJpbmdJRGlOU18xMWNoYXJfdHJhaXRzSURpRUVOU185YWxsb2NhdG9ySURpRUVFRQAAAFx/AAD8LQAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJY0VFAABcfwAASC4AAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SWFFRQAAXH8AAHAuAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0loRUUAAFx/AACYLgAATjEwZW1zY3JpcHRlbjExbWVtb3J5X3ZpZXdJc0VFAABcfwAAwC4AAE4xMGVtc2NyaXB0ZW4xMW1lbW9yeV92aWV3SXRFRQAAXH8AAOguAABOMTBlbXNjcmlwdGVuMTFtZW1vcnlfdmlld0lqRUUAAFx/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AACfAAAAoAAAAE5TdDNfXzIxNGJhc2ljX2lmc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAIR/AABURAAAlEMAAGgAAAAAAAAAIEUAALMAAAC0AAAAmP///5j///8gRQAAtQAAALYAAACcRAAA1EQAAOhEAACwRAAAaAAAAAAAAADcQwAAoQAAAKIAAACY////mP///9xDAACjAAAApAAAAE5TdDNfXzIxNGJhc2ljX29mc3RyZWFtSWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFAIR/AADwRAAA3EMAAE5TdDNfXzIxM2Jhc2ljX2ZpbGVidWZJY05TXzExY2hhcl90cmFpdHNJY0VFRUUAAIR/AAAsRQAAXEMAAAAAAAAURgAAuQAAALoAAAC7AAAAvAAAAL0AAAC+AAAAvwAAAAAAAADoRQAAuAAAAMAAAADBAAAAAAAAAMRFAADCAAAAwwAAAE5TdDNfXzI4aW9zX2Jhc2VFAAAAXH8AALBFAABOU3QzX18yOGlvc19iYXNlN2ZhaWx1cmVFAAAAhH8AAMxFAABcfAAATlN0M19fMjE5X19pb3N0cmVhbV9jYXRlZ29yeUUAAACEfwAA9EUAAKR8AADRdJ4AV529KoBwUg///z4nCgAAAGQAAADoAwAAECcAAKCGAQBAQg8AgJaYAADh9QUYAAAANQAAAHEAAABr////zvv//5K///8AAAAAAAAAAP////////////////////////////////////////////////////////////////8AAQIDBAUGBwgJ/////////woLDA0ODxAREhMUFRYXGBkaGxwdHh8gISIj////////CgsMDQ4PEBESExQVFhcYGRobHB0eHyAhIiP/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////AAECBAcDBgUAAAAAAAAAAgAAwAMAAMAEAADABQAAwAYAAMAHAADACAAAwAkAAMAKAADACwAAwAwAAMANAADADgAAwA8AAMAQAADAEQAAwBIAAMATAADAFAAAwBUAAMAWAADAFwAAwBgAAMAZAADAGgAAwBsAAMAcAADAHQAAwB4AAMAfAADAAAAAswEAAMMCAADDAwAAwwQAAMMFAADDBgAAwwcAAMMIAADDCQAAwwoAAMMLAADDDAAAww0AANMOAADDDwAAwwAADLsBAAzDAgAMwwMADMMEAAzbAAAAAN4SBJUAAAAA////////////////UEgAABQAAABDLlVURi04AEGgkQELAmRIAEHAkQELR0xDX0NUWVBFAAAAAExDX05VTUVSSUMAAExDX1RJTUUAAAAAAExDX0NPTExBVEUAAExDX01PTkVUQVJZAExDX01FU1NBR0VTAEGQkgELQRkACgAZGRkAAAAABQAAAAAAAAkAAAAACwAAAAAAAAAAGQARChkZGQMKBwABAAkLGAAACQYLAAALAAYZAAAAGRkZAEHhkgELIQ4AAAAAAAAAABkACg0ZGRkADQAAAgAJDgAAAAkADgAADgBBm5MBCwEMAEGnkwELFRMAAAAAEwAAAAAJDAAAAAAADAAADABB1ZMBCwEQAEHhkwELFQ8AAAAEDwAAAAAJEAAAAAAAEAAAEABBj5QBCwESAEGblAELHhEAAAAAEQAAAAAJEgAAAAAAEgAAEgAAGgAAABoaGgBB0pQBCw4aAAAAGhoaAAAAAAAACQBBg5UBCwEUAEGPlQELFRcAAAAAFwAAAAAJFAAAAAAAFAAAFABBvZUBCwEWAEHJlQELKRUAAAAAFQAAAAAJFgAAAAAAFgAAFgAAMDEyMzQ1Njc4OUFCQ0RFRgBNAEGEmgEL+QMBAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACQAAAAlAAAAJgAAACcAAAAoAAAAKQAAACoAAAArAAAALAAAAC0AAAAuAAAALwAAADAAAAAxAAAAMgAAADMAAAA0AAAANQAAADYAAAA3AAAAOAAAADkAAAA6AAAAOwAAADwAAAA9AAAAPgAAAD8AAABAAAAAQQAAAEIAAABDAAAARAAAAEUAAABGAAAARwAAAEgAAABJAAAASgAAAEsAAABMAAAATQAAAE4AAABPAAAAUAAAAFEAAABSAAAAUwAAAFQAAABVAAAAVgAAAFcAAABYAAAAWQAAAFoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAABBAAAAQgAAAEMAAABEAAAARQAAAEYAAABHAAAASAAAAEkAAABKAAAASwAAAEwAAABNAAAATgAAAE8AAABQAAAAUQAAAFIAAABTAAAAVAAAAFUAAABWAAAAVwAAAFgAAABZAAAAWgAAAHsAAAB8AAAAfQAAAH4AAAB/AEGAogELAhBTAEGUpgEL+QMBAAAAAgAAAAMAAAAEAAAABQAAAAYAAAAHAAAACAAAAAkAAAAKAAAACwAAAAwAAAANAAAADgAAAA8AAAAQAAAAEQAAABIAAAATAAAAFAAAABUAAAAWAAAAFwAAABgAAAAZAAAAGgAAABsAAAAcAAAAHQAAAB4AAAAfAAAAIAAAACEAAAAiAAAAIwAAACQAAAAlAAAAJgAAACcAAAAoAAAAKQAAACoAAAArAAAALAAAAC0AAAAuAAAALwAAADAAAAAxAAAAMgAAADMAAAA0AAAANQAAADYAAAA3AAAAOAAAADkAAAA6AAAAOwAAADwAAAA9AAAAPgAAAD8AAABAAAAAYQAAAGIAAABjAAAAZAAAAGUAAABmAAAAZwAAAGgAAABpAAAAagAAAGsAAABsAAAAbQAAAG4AAABvAAAAcAAAAHEAAAByAAAAcwAAAHQAAAB1AAAAdgAAAHcAAAB4AAAAeQAAAHoAAABbAAAAXAAAAF0AAABeAAAAXwAAAGAAAABhAAAAYgAAAGMAAABkAAAAZQAAAGYAAABnAAAAaAAAAGkAAABqAAAAawAAAGwAAABtAAAAbgAAAG8AAABwAAAAcQAAAHIAAABzAAAAdAAAAHUAAAB2AAAAdwAAAHgAAAB5AAAAegAAAHsAAAB8AAAAfQAAAH4AAAB/AEGQrgELMTAxMjM0NTY3ODlhYmNkZWZBQkNERUZ4WCstcFBpSW5OACVJOiVNOiVTICVwJUg6JU0AQdCuAQuBASUAAABtAAAALwAAACUAAABkAAAALwAAACUAAAB5AAAAJQAAAFkAAAAtAAAAJQAAAG0AAAAtAAAAJQAAAGQAAAAlAAAASQAAADoAAAAlAAAATQAAADoAAAAlAAAAUwAAACAAAAAlAAAAcAAAAAAAAAAlAAAASAAAADoAAAAlAAAATQBB4K8BC2UlAAAASAAAADoAAAAlAAAATQAAADoAAAAlAAAAUwAAAAAAAABUYQAA2gAAANsAAADcAAAAAAAAALRhAADdAAAA3gAAANwAAADfAAAA4AAAAOEAAADiAAAA4wAAAOQAAADlAAAA5gBB0LABC/0DBAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABQIAAAUAAAAFAAAABQAAAAUAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAAEAAAABAAAAAQAAAADAgAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAACCAAAAQgEAAEIBAABCAQAAQgEAAEIBAABCAQAAQgEAAEIBAABCAQAAQgEAAIIAAACCAAAAggAAAIIAAACCAAAAggAAAIIAAAAqAQAAKgEAACoBAAAqAQAAKgEAACoBAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAACoAAAAqAAAAKgAAAIIAAACCAAAAggAAAIIAAACCAAAAggAAADIBAAAyAQAAMgEAADIBAAAyAQAAMgEAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAMgAAADIAAAAyAAAAggAAAIIAAACCAAAAggAAAAQAQdS4AQvtAhxhAADnAAAA6AAAANwAAADpAAAA6gAAAOsAAADsAAAA7QAAAO4AAADvAAAAAAAAAOxhAADwAAAA8QAAANwAAADyAAAA8wAAAPQAAAD1AAAA9gAAAAAAAAAQYgAA9wAAAPgAAADcAAAA+QAAAPoAAAD7AAAA/AAAAP0AAAB0AAAAcgAAAHUAAABlAAAAAAAAAGYAAABhAAAAbAAAAHMAAABlAAAAAAAAACUAAABtAAAALwAAACUAAABkAAAALwAAACUAAAB5AAAAAAAAACUAAABIAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAAAAAACUAAABhAAAAIAAAACUAAABiAAAAIAAAACUAAABkAAAAIAAAACUAAABIAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAIAAAACUAAABZAAAAAAAAACUAAABJAAAAOgAAACUAAABNAAAAOgAAACUAAABTAAAAIAAAACUAAABwAEHMuwEL/gr0XQAA/gAAAP8AAADcAAAATlN0M19fMjZsb2NhbGU1ZmFjZXRFAAAAhH8AANxdAAAgcgAAAAAAAHReAAD+AAAAAAEAANwAAAABAQAAAgEAAAMBAAAEAQAABQEAAAYBAAAHAQAACAEAAAkBAAAKAQAACwEAAAwBAABOU3QzX18yNWN0eXBlSXdFRQBOU3QzX18yMTBjdHlwZV9iYXNlRQAAXH8AAFZeAADgfwAARF4AAAAAAAACAAAA9F0AAAIAAABsXgAAAgAAAAAAAAAIXwAA/gAAAA0BAADcAAAADgEAAA8BAAAQAQAAEQEAABIBAAATAQAAFAEAAE5TdDNfXzI3Y29kZWN2dEljYzExX19tYnN0YXRlX3RFRQBOU3QzX18yMTJjb2RlY3Z0X2Jhc2VFAAAAAFx/AADmXgAA4H8AAMReAAAAAAAAAgAAAPRdAAACAAAAAF8AAAIAAAAAAAAAfF8AAP4AAAAVAQAA3AAAABYBAAAXAQAAGAEAABkBAAAaAQAAGwEAABwBAABOU3QzX18yN2NvZGVjdnRJRHNjMTFfX21ic3RhdGVfdEVFAADgfwAAWF8AAAAAAAACAAAA9F0AAAIAAAAAXwAAAgAAAAAAAADwXwAA/gAAAB0BAADcAAAAHgEAAB8BAAAgAQAAIQEAACIBAAAjAQAAJAEAAE5TdDNfXzI3Y29kZWN2dElEc0R1MTFfX21ic3RhdGVfdEVFAOB/AADMXwAAAAAAAAIAAAD0XQAAAgAAAABfAAACAAAAAAAAAGRgAAD+AAAAJQEAANwAAAAmAQAAJwEAACgBAAApAQAAKgEAACsBAAAsAQAATlN0M19fMjdjb2RlY3Z0SURpYzExX19tYnN0YXRlX3RFRQAA4H8AAEBgAAAAAAAAAgAAAPRdAAACAAAAAF8AAAIAAAAAAAAA2GAAAP4AAAAtAQAA3AAAAC4BAAAvAQAAMAEAADEBAAAyAQAAMwEAADQBAABOU3QzX18yN2NvZGVjdnRJRGlEdTExX19tYnN0YXRlX3RFRQDgfwAAtGAAAAAAAAACAAAA9F0AAAIAAAAAXwAAAgAAAE5TdDNfXzI3Y29kZWN2dEl3YzExX19tYnN0YXRlX3RFRQAAAOB/AAD4YAAAAAAAAAIAAAD0XQAAAgAAAABfAAACAAAATlN0M19fMjZsb2NhbGU1X19pbXBFAAAAhH8AADxhAAD0XQAATlN0M19fMjdjb2xsYXRlSWNFRQCEfwAAYGEAAPRdAABOU3QzX18yN2NvbGxhdGVJd0VFAIR/AACAYQAA9F0AAE5TdDNfXzI1Y3R5cGVJY0VFAAAA4H8AAKBhAAAAAAAAAgAAAPRdAAACAAAAbF4AAAIAAABOU3QzX18yOG51bXB1bmN0SWNFRQAAAACEfwAA1GEAAPRdAABOU3QzX18yOG51bXB1bmN0SXdFRQAAAACEfwAA+GEAAPRdAAAAAAAAdGEAADUBAAA2AQAA3AAAADcBAAA4AQAAOQEAAAAAAACUYQAAOgEAADsBAADcAAAAPAEAAD0BAAA+AQAAAAAAADBjAAD+AAAAPwEAANwAAABAAQAAQQEAAEIBAABDAQAARAEAAEUBAABGAQAARwEAAEgBAABJAQAASgEAAE5TdDNfXzI3bnVtX2dldEljTlNfMTlpc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjlfX251bV9nZXRJY0VFAE5TdDNfXzIxNF9fbnVtX2dldF9iYXNlRQAAXH8AAPZiAADgfwAA4GIAAAAAAAABAAAAEGMAAAAAAADgfwAAnGIAAAAAAAACAAAA9F0AAAIAAAAYYwBB1MYBC8oBBGQAAP4AAABLAQAA3AAAAEwBAABNAQAATgEAAE8BAABQAQAAUQEAAFIBAABTAQAAVAEAAFUBAABWAQAATlN0M19fMjdudW1fZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yOV9fbnVtX2dldEl3RUUAAADgfwAA1GMAAAAAAAABAAAAEGMAAAAAAADgfwAAkGMAAAAAAAACAAAA9F0AAAIAAADsYwBBqMgBC94B7GQAAP4AAABXAQAA3AAAAFgBAABZAQAAWgEAAFsBAABcAQAAXQEAAF4BAABfAQAATlN0M19fMjdudW1fcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yOV9fbnVtX3B1dEljRUUATlN0M19fMjE0X19udW1fcHV0X2Jhc2VFAABcfwAAsmQAAOB/AACcZAAAAAAAAAEAAADMZAAAAAAAAOB/AABYZAAAAAAAAAIAAAD0XQAAAgAAANRkAEGQygELvgG0ZQAA/gAAAGABAADcAAAAYQEAAGIBAABjAQAAZAEAAGUBAABmAQAAZwEAAGgBAABOU3QzX18yN251bV9wdXRJd05TXzE5b3N0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAE5TdDNfXzI5X19udW1fcHV0SXdFRQAAAOB/AACEZQAAAAAAAAEAAADMZAAAAAAAAOB/AABAZQAAAAAAAAIAAAD0XQAAAgAAAJxlAEHYywELmgu0ZgAAaQEAAGoBAADcAAAAawEAAGwBAABtAQAAbgEAAG8BAABwAQAAcQEAAPj///+0ZgAAcgEAAHMBAAB0AQAAdQEAAHYBAAB3AQAAeAEAAE5TdDNfXzI4dGltZV9nZXRJY05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckljTlNfMTFjaGFyX3RyYWl0c0ljRUVFRUVFAE5TdDNfXzI5dGltZV9iYXNlRQBcfwAAbWYAAE5TdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSWNFRQAAAFx/AACIZgAA4H8AAChmAAAAAAAAAwAAAPRdAAACAAAAgGYAAAIAAACsZgAAAAgAAAAAAACgZwAAeQEAAHoBAADcAAAAewEAAHwBAAB9AQAAfgEAAH8BAACAAQAAgQEAAPj///+gZwAAggEAAIMBAACEAQAAhQEAAIYBAACHAQAAiAEAAE5TdDNfXzI4dGltZV9nZXRJd05TXzE5aXN0cmVhbWJ1Zl9pdGVyYXRvckl3TlNfMTFjaGFyX3RyYWl0c0l3RUVFRUVFAE5TdDNfXzIyMF9fdGltZV9nZXRfY19zdG9yYWdlSXdFRQAAXH8AAHVnAADgfwAAMGcAAAAAAAADAAAA9F0AAAIAAACAZgAAAgAAAJhnAAAACAAAAAAAAERoAACJAQAAigEAANwAAACLAQAATlN0M19fMjh0aW1lX3B1dEljTlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySWNOU18xMWNoYXJfdHJhaXRzSWNFRUVFRUUATlN0M19fMjEwX190aW1lX3B1dEUAAABcfwAAJWgAAOB/AADgZwAAAAAAAAIAAAD0XQAAAgAAADxoAAAACAAAAAAAAMRoAACMAQAAjQEAANwAAACOAQAATlN0M19fMjh0aW1lX3B1dEl3TlNfMTlvc3RyZWFtYnVmX2l0ZXJhdG9ySXdOU18xMWNoYXJfdHJhaXRzSXdFRUVFRUUAAAAA4H8AAHxoAAAAAAAAAgAAAPRdAAACAAAAPGgAAAAIAAAAAAAAWGkAAP4AAACPAQAA3AAAAJABAACRAQAAkgEAAJMBAACUAQAAlQEAAJYBAACXAQAAmAEAAE5TdDNfXzIxMG1vbmV5cHVuY3RJY0xiMEVFRQBOU3QzX18yMTBtb25leV9iYXNlRQAAAABcfwAAOGkAAOB/AAAcaQAAAAAAAAIAAAD0XQAAAgAAAFBpAAACAAAAAAAAAMxpAAD+AAAAmQEAANwAAACaAQAAmwEAAJwBAACdAQAAngEAAJ8BAACgAQAAoQEAAKIBAABOU3QzX18yMTBtb25leXB1bmN0SWNMYjFFRUUA4H8AALBpAAAAAAAAAgAAAPRdAAACAAAAUGkAAAIAAAAAAAAAQGoAAP4AAACjAQAA3AAAAKQBAAClAQAApgEAAKcBAACoAQAAqQEAAKoBAACrAQAArAEAAE5TdDNfXzIxMG1vbmV5cHVuY3RJd0xiMEVFRQDgfwAAJGoAAAAAAAACAAAA9F0AAAIAAABQaQAAAgAAAAAAAAC0agAA/gAAAK0BAADcAAAArgEAAK8BAACwAQAAsQEAALIBAACzAQAAtAEAALUBAAC2AQAATlN0M19fMjEwbW9uZXlwdW5jdEl3TGIxRUVFAOB/AACYagAAAAAAAAIAAAD0XQAAAgAAAFBpAAACAAAAAAAAAFhrAAD+AAAAtwEAANwAAAC4AQAAuQEAAE5TdDNfXzI5bW9uZXlfZ2V0SWNOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X2dldEljRUUAAFx/AAA2awAA4H8AAPBqAAAAAAAAAgAAAPRdAAACAAAAUGsAQfzWAQuaAfxrAAD+AAAAugEAANwAAAC7AQAAvAEAAE5TdDNfXzI5bW9uZXlfZ2V0SXdOU18xOWlzdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X2dldEl3RUUAAFx/AADaawAA4H8AAJRrAAAAAAAAAgAAAPRdAAACAAAA9GsAQaDYAQuaAaBsAAD+AAAAvQEAANwAAAC+AQAAvwEAAE5TdDNfXzI5bW9uZXlfcHV0SWNOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJY05TXzExY2hhcl90cmFpdHNJY0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X3B1dEljRUUAAFx/AAB+bAAA4H8AADhsAAAAAAAAAgAAAPRdAAACAAAAmGwAQcTZAQuaAURtAAD+AAAAwAEAANwAAADBAQAAwgEAAE5TdDNfXzI5bW9uZXlfcHV0SXdOU18xOW9zdHJlYW1idWZfaXRlcmF0b3JJd05TXzExY2hhcl90cmFpdHNJd0VFRUVFRQBOU3QzX18yMTFfX21vbmV5X3B1dEl3RUUAAFx/AAAibQAA4H8AANxsAAAAAAAAAgAAAPRdAAACAAAAPG0AQejaAQu5CLxtAAD+AAAAwwEAANwAAADEAQAAxQEAAMYBAABOU3QzX18yOG1lc3NhZ2VzSWNFRQBOU3QzX18yMTNtZXNzYWdlc19iYXNlRQAAAABcfwAAmW0AAOB/AACEbQAAAAAAAAIAAAD0XQAAAgAAALRtAAACAAAAAAAAABRuAAD+AAAAxwEAANwAAADIAQAAyQEAAMoBAABOU3QzX18yOG1lc3NhZ2VzSXdFRQAAAADgfwAA/G0AAAAAAAACAAAA9F0AAAIAAAC0bQAAAgAAAFMAAAB1AAAAbgAAAGQAAABhAAAAeQAAAAAAAABNAAAAbwAAAG4AAABkAAAAYQAAAHkAAAAAAAAAVAAAAHUAAABlAAAAcwAAAGQAAABhAAAAeQAAAAAAAABXAAAAZQAAAGQAAABuAAAAZQAAAHMAAABkAAAAYQAAAHkAAAAAAAAAVAAAAGgAAAB1AAAAcgAAAHMAAABkAAAAYQAAAHkAAAAAAAAARgAAAHIAAABpAAAAZAAAAGEAAAB5AAAAAAAAAFMAAABhAAAAdAAAAHUAAAByAAAAZAAAAGEAAAB5AAAAAAAAAFMAAAB1AAAAbgAAAAAAAABNAAAAbwAAAG4AAAAAAAAAVAAAAHUAAABlAAAAAAAAAFcAAABlAAAAZAAAAAAAAABUAAAAaAAAAHUAAAAAAAAARgAAAHIAAABpAAAAAAAAAFMAAABhAAAAdAAAAAAAAABKAAAAYQAAAG4AAAB1AAAAYQAAAHIAAAB5AAAAAAAAAEYAAABlAAAAYgAAAHIAAAB1AAAAYQAAAHIAAAB5AAAAAAAAAE0AAABhAAAAcgAAAGMAAABoAAAAAAAAAEEAAABwAAAAcgAAAGkAAABsAAAAAAAAAE0AAABhAAAAeQAAAAAAAABKAAAAdQAAAG4AAABlAAAAAAAAAEoAAAB1AAAAbAAAAHkAAAAAAAAAQQAAAHUAAABnAAAAdQAAAHMAAAB0AAAAAAAAAFMAAABlAAAAcAAAAHQAAABlAAAAbQAAAGIAAABlAAAAcgAAAAAAAABPAAAAYwAAAHQAAABvAAAAYgAAAGUAAAByAAAAAAAAAE4AAABvAAAAdgAAAGUAAABtAAAAYgAAAGUAAAByAAAAAAAAAEQAAABlAAAAYwAAAGUAAABtAAAAYgAAAGUAAAByAAAAAAAAAEoAAABhAAAAbgAAAAAAAABGAAAAZQAAAGIAAAAAAAAATQAAAGEAAAByAAAAAAAAAEEAAABwAAAAcgAAAAAAAABKAAAAdQAAAG4AAAAAAAAASgAAAHUAAABsAAAAAAAAAEEAAAB1AAAAZwAAAAAAAABTAAAAZQAAAHAAAAAAAAAATwAAAGMAAAB0AAAAAAAAAE4AAABvAAAAdgAAAAAAAABEAAAAZQAAAGMAAAAAAAAAQQAAAE0AAAAAAAAAUAAAAE0AQazjAQv1D6xmAAByAQAAcwEAAHQBAAB1AQAAdgEAAHcBAAB4AQAAAAAAAJhnAACCAQAAgwEAAIQBAACFAQAAhgEAAIcBAACIAQAAAAAAACByAADLAQAAzAEAAM0BAABOU3QzX18yMTRfX3NoYXJlZF9jb3VudEUAAAAAXH8AAARyAABObyBlcnJvciBpbmZvcm1hdGlvbgBJbGxlZ2FsIGJ5dGUgc2VxdWVuY2UARG9tYWluIGVycm9yAFJlc3VsdCBub3QgcmVwcmVzZW50YWJsZQBOb3QgYSB0dHkAUGVybWlzc2lvbiBkZW5pZWQAT3BlcmF0aW9uIG5vdCBwZXJtaXR0ZWQATm8gc3VjaCBmaWxlIG9yIGRpcmVjdG9yeQBObyBzdWNoIHByb2Nlc3MARmlsZSBleGlzdHMAVmFsdWUgdG9vIGxhcmdlIGZvciBkYXRhIHR5cGUATm8gc3BhY2UgbGVmdCBvbiBkZXZpY2UAT3V0IG9mIG1lbW9yeQBSZXNvdXJjZSBidXN5AEludGVycnVwdGVkIHN5c3RlbSBjYWxsAFJlc291cmNlIHRlbXBvcmFyaWx5IHVuYXZhaWxhYmxlAEludmFsaWQgc2VlawBDcm9zcy1kZXZpY2UgbGluawBSZWFkLW9ubHkgZmlsZSBzeXN0ZW0ARGlyZWN0b3J5IG5vdCBlbXB0eQBDb25uZWN0aW9uIHJlc2V0IGJ5IHBlZXIAT3BlcmF0aW9uIHRpbWVkIG91dABDb25uZWN0aW9uIHJlZnVzZWQASG9zdCBpcyBkb3duAEhvc3QgaXMgdW5yZWFjaGFibGUAQWRkcmVzcyBpbiB1c2UAQnJva2VuIHBpcGUASS9PIGVycm9yAE5vIHN1Y2ggZGV2aWNlIG9yIGFkZHJlc3MAQmxvY2sgZGV2aWNlIHJlcXVpcmVkAE5vIHN1Y2ggZGV2aWNlAE5vdCBhIGRpcmVjdG9yeQBJcyBhIGRpcmVjdG9yeQBUZXh0IGZpbGUgYnVzeQBFeGVjIGZvcm1hdCBlcnJvcgBJbnZhbGlkIGFyZ3VtZW50AEFyZ3VtZW50IGxpc3QgdG9vIGxvbmcAU3ltYm9saWMgbGluayBsb29wAEZpbGVuYW1lIHRvbyBsb25nAFRvbyBtYW55IG9wZW4gZmlsZXMgaW4gc3lzdGVtAE5vIGZpbGUgZGVzY3JpcHRvcnMgYXZhaWxhYmxlAEJhZCBmaWxlIGRlc2NyaXB0b3IATm8gY2hpbGQgcHJvY2VzcwBCYWQgYWRkcmVzcwBGaWxlIHRvbyBsYXJnZQBUb28gbWFueSBsaW5rcwBObyBsb2NrcyBhdmFpbGFibGUAUmVzb3VyY2UgZGVhZGxvY2sgd291bGQgb2NjdXIAU3RhdGUgbm90IHJlY292ZXJhYmxlAFByZXZpb3VzIG93bmVyIGRpZWQAT3BlcmF0aW9uIGNhbmNlbGVkAEZ1bmN0aW9uIG5vdCBpbXBsZW1lbnRlZABObyBtZXNzYWdlIG9mIGRlc2lyZWQgdHlwZQBJZGVudGlmaWVyIHJlbW92ZWQARGV2aWNlIG5vdCBhIHN0cmVhbQBObyBkYXRhIGF2YWlsYWJsZQBEZXZpY2UgdGltZW91dABPdXQgb2Ygc3RyZWFtcyByZXNvdXJjZXMATGluayBoYXMgYmVlbiBzZXZlcmVkAFByb3RvY29sIGVycm9yAEJhZCBtZXNzYWdlAEZpbGUgZGVzY3JpcHRvciBpbiBiYWQgc3RhdGUATm90IGEgc29ja2V0AERlc3RpbmF0aW9uIGFkZHJlc3MgcmVxdWlyZWQATWVzc2FnZSB0b28gbGFyZ2UAUHJvdG9jb2wgd3JvbmcgdHlwZSBmb3Igc29ja2V0AFByb3RvY29sIG5vdCBhdmFpbGFibGUAUHJvdG9jb2wgbm90IHN1cHBvcnRlZABTb2NrZXQgdHlwZSBub3Qgc3VwcG9ydGVkAE5vdCBzdXBwb3J0ZWQAUHJvdG9jb2wgZmFtaWx5IG5vdCBzdXBwb3J0ZWQAQWRkcmVzcyBmYW1pbHkgbm90IHN1cHBvcnRlZCBieSBwcm90b2NvbABBZGRyZXNzIG5vdCBhdmFpbGFibGUATmV0d29yayBpcyBkb3duAE5ldHdvcmsgdW5yZWFjaGFibGUAQ29ubmVjdGlvbiByZXNldCBieSBuZXR3b3JrAENvbm5lY3Rpb24gYWJvcnRlZABObyBidWZmZXIgc3BhY2UgYXZhaWxhYmxlAFNvY2tldCBpcyBjb25uZWN0ZWQAU29ja2V0IG5vdCBjb25uZWN0ZWQAQ2Fubm90IHNlbmQgYWZ0ZXIgc29ja2V0IHNodXRkb3duAE9wZXJhdGlvbiBhbHJlYWR5IGluIHByb2dyZXNzAE9wZXJhdGlvbiBpbiBwcm9ncmVzcwBTdGFsZSBmaWxlIGhhbmRsZQBSZW1vdGUgSS9PIGVycm9yAFF1b3RhIGV4Y2VlZGVkAE5vIG1lZGl1bSBmb3VuZABXcm9uZyBtZWRpdW0gdHlwZQBNdWx0aWhvcCBhdHRlbXB0ZWQAUmVxdWlyZWQga2V5IG5vdCBhdmFpbGFibGUAS2V5IGhhcyBleHBpcmVkAEtleSBoYXMgYmVlbiBy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AAAAAAAAHIEAAGoAAAD1AQAA9gEAAAAAAADcgQAAAQAAAPcBAADBAAAAU3QxMWxvZ2ljX2Vycm9yAIR/AAAMgQAAnIAAAAAAAABUgQAAagAAAPgBAAD2AQAAU3QxNmludmFsaWRfYXJndW1lbnQAAAAAhH8AADyBAAAcgQAAAAAAAIiBAABqAAAA+QEAAPYBAABTdDEybGVuZ3RoX2Vycm9yAAAAAIR/AAB0gQAAHIEAAAAAAAC8gQAAagAAAPoBAAD2AQAAU3QxMm91dF9vZl9yYW5nZQAAAACEfwAAqIEAAByBAABTdDEzcnVudGltZV9lcnJvcgAAAIR/AADIgQAAnIAAAAAAAAAQggAAAQAAAPsBAADBAAAAU3QxNG92ZXJmbG93X2Vycm9yAACEfwAA/IEAANyBAAAAAAAAVIIAAI4AAAD8AQAA/QEAAFN0OXR5cGVfaW5mbwAAAABcfwAAMIIAAFN0OGJhZF9jYXN0AIR/AABIggAAnIAAAPz//////////P/////////+//////////z/////////+P/////////8//////////z//////////P/////////8//////////z//////////v/////////8//////////j/////////AAAAAFSDAAD+AQAA/wEAAAACAAABAgAAAgIAAAMCAAAEAgAABQIAAAYCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGUxMVNwZWNpYWxOYW1lRQBOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGU0Tm9kZUUAXH8AACSDAACEfwAA9IIAAEyDAAAAAAAATIMAAP4BAAD/AQAAAAIAAAECAADNAQAAAwIAAAQCAAAFAgAABwIAAAAAAAD0gwAA/gEAAP8BAAAAAgAAAQIAAAgCAAADAgAABAIAAAUCAAAJAgAATjEyX0dMT0JBTF9fTl8xMTZpdGFuaXVtX2RlbWFuZ2xlMjFDdG9yVnRhYmxlU3BlY2lhbE5hbWVFAAAAhH8AALiDAABMgwAAAAAAAFiEAAD+AQAA/wEAAAACAAABAgAACgIAAAMCAAALAgAABQIAAAwCAABOMTJfR0xPQkFMX19OXzExNml0YW5pdW1fZGVtYW5nbGU4TmFtZVR5cGVFAIR/AAAshAAATIMAAAAA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cl9jbGFzc19jb25zdHJ1Y3RvcgQfX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19mdW5jdGlvbgUlX2VtYmluZF9yZWdpc3Rlcl9jbGFzc19jbGFzc19mdW5jdGlvbgYRX2VtdmFsX3Rha2VfdmFsdWUHDV9lbXZhbF9pbmNyZWYIDV9lbXZhbF9kZWNyZWYJEF9lbXZhbF9uZXdfYXJyYXkKEV9lbXZhbF9uZXdfb2JqZWN0CxJfZW12YWxfbmV3X2NzdHJpbmcME19lbXZhbF9zZXRfcHJvcGVydHkNE19lbXZhbF9nZXRfcHJvcGVydHkOCV9lbXZhbF9hcw8WX2VtdmFsX3J1bl9kZXN0cnVjdG9ycxAYX2VtdmFsX2dldF9tZXRob2RfY2FsbGVyERdfZW12YWxfY2FsbF92b2lkX21ldGhvZBIhX2VtdmFsX25ld19hcnJheV9mcm9tX21lbW9yeV92aWV3ExJfZW12YWxfY2FsbF9tZXRob2QUDV9fYXNzZXJ0X2ZhaWwVFV9lbWJpbmRfcmVnaXN0ZXJfdm9pZBYVX2VtYmluZF9yZWdpc3Rlcl9ib29sFxhfZW1iaW5kX3JlZ2lzdGVyX2ludGVnZXIYFl9lbWJpbmRfcmVnaXN0ZXJfZmxvYXQZG19lbWJpbmRfcmVnaXN0ZXJfc3RkX3N0cmluZxocX2VtYmluZF9yZWdpc3Rlcl9zdGRfd3N0cmluZxsWX2VtYmluZF9yZWdpc3Rlcl9lbXZhbBwcX2VtYmluZF9yZWdpc3Rlcl9tZW1vcnlfdmlldx0VZW1zY3JpcHRlbl9tZW1jcHlfYmlnHhZlbXNjcmlwdGVuX3Jlc2l6ZV9oZWFwHxBfX3N5c2NhbGxfb3BlbmF0IBFfX3N5c2NhbGxfZmNudGw2NCEPX19zeXNjYWxsX2lvY3RsIg9fX3dhc2lfZmRfd3JpdGUjDl9fd2FzaV9mZF9yZWFkJA9fX3dhc2lfZmRfY2xvc2UlGF9fd2FzaV9lbnZpcm9uX3NpemVzX2dldCYSX193YXNpX2Vudmlyb25fZ2V0JwpzdHJmdGltZV9sKAVhYm9ydCkiX190aHJvd19leGNlcHRpb25fd2l0aF9zdGFja190cmFjZSojbGVnYWxpbXBvcnQkX2VtYmluZF9yZWdpc3Rlcl9iaWdpbnQrGmxlZ2FsaW1wb3J0JF9fd2FzaV9mZF9zZWVrLBFfX3dhc21fY2FsbF9jdG9ycy2LAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6YmFzaWNfc3RyaW5nW2FiaTp2MTUwMDddPHN0ZDo6bnVsbHB0cl90PihjaGFyIGNvbnN0KikufnN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6X190aHJvd19sZW5ndGhfZXJyb3JbYWJpOnYxNTAwN10oKSBjb25zdC9bZW1zY3JpcHRlbjo6bm9ybWFsaXplUG9pbnRzUHVyZShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmKTBdc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+OjpfX3Rocm93X2xlbmd0aF9lcnJvclthYmk6djE1MDA3XSgpIGNvbnN0MQ5obnN3bGliX3N5bmNmczIiaG5zd2xpYl9zeW5jZnM6OiRfMDo6X19pbnZva2UoaW50KTMZX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMzQhZW1zY3JpcHRlbjo6ZW1iaW5kX2luaXRfaG5zd2xpYigpNaECZW1zY3JpcHRlbjo6aW50ZXJuYWw6Okludm9rZXI8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+LCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmPjo6aW52b2tlKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiAoKikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiksIGVtc2NyaXB0ZW46Ol9FTV9WQUwqKTZadm9pZCBjb25zdCogZW1zY3JpcHRlbjo6aW50ZXJuYWw6OmdldEFjdHVhbFR5cGU8ZW1zY3JpcHRlbjo6TDJTcGFjZT4oZW1zY3JpcHRlbjo6TDJTcGFjZSopN1R2b2lkIGVtc2NyaXB0ZW46OmludGVybmFsOjpyYXdfZGVzdHJ1Y3RvcjxlbXNjcmlwdGVuOjpMMlNwYWNlPihlbXNjcmlwdGVuOjpMMlNwYWNlKik4gwFlbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjxlbXNjcmlwdGVuOjpMMlNwYWNlKiwgdW5zaWduZWQgaW50JiY+OjppbnZva2UoZW1zY3JpcHRlbjo6TDJTcGFjZSogKCopKHVuc2lnbmVkIGludCYmKSwgdW5zaWduZWQgaW50KTlqZW1zY3JpcHRlbjo6TDJTcGFjZSogZW1zY3JpcHRlbjo6aW50ZXJuYWw6Om9wZXJhdG9yX25ldzxlbXNjcmlwdGVuOjpMMlNwYWNlLCB1bnNpZ25lZCBpbnQ+KHVuc2lnbmVkIGludCYmKTqVAWVtc2NyaXB0ZW46OkwyU3BhY2U6OmRpc3RhbmNlKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYpO7kEZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8ZmxvYXQgKGVtc2NyaXB0ZW46OkwyU3BhY2U6OiopKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYpLCBmbG9hdCwgZW1zY3JpcHRlbjo6TDJTcGFjZSosIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCY+OjppbnZva2UoZmxvYXQgKGVtc2NyaXB0ZW46OkwyU3BhY2U6OiogY29uc3QmKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmKSwgZW1zY3JpcHRlbjo6TDJTcGFjZSosIGVtc2NyaXB0ZW46Ol9FTV9WQUwqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKik8J2Vtc2NyaXB0ZW46OkwyU3BhY2U6OmdldE51bURpbWVuc2lvbnMoKT2+AWVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHVuc2lnbmVkIGludCAoZW1zY3JpcHRlbjo6TDJTcGFjZTo6KikoKSwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjpMMlNwYWNlKj46Omludm9rZSh1bnNpZ25lZCBpbnQgKGVtc2NyaXB0ZW46OkwyU3BhY2U6OiogY29uc3QmKSgpLCBlbXNjcmlwdGVuOjpMMlNwYWNlKik+bnZvaWQgY29uc3QqIGVtc2NyaXB0ZW46OmludGVybmFsOjpnZXRBY3R1YWxUeXBlPGVtc2NyaXB0ZW46OklubmVyUHJvZHVjdFNwYWNlPihlbXNjcmlwdGVuOjpJbm5lclByb2R1Y3RTcGFjZSopP35lbXNjcmlwdGVuOjpJbm5lclByb2R1Y3RTcGFjZSogZW1zY3JpcHRlbjo6aW50ZXJuYWw6Om9wZXJhdG9yX25ldzxlbXNjcmlwdGVuOjpJbm5lclByb2R1Y3RTcGFjZSwgdW5zaWduZWQgaW50Pih1bnNpZ25lZCBpbnQmJilAcnZvaWQgY29uc3QqIGVtc2NyaXB0ZW46OmludGVybmFsOjpnZXRBY3R1YWxUeXBlPGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3I+KGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3IqKUFsdm9pZCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6cmF3X2Rlc3RydWN0b3I8ZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3Rvcj4oZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3RvciopQqkBZW1zY3JpcHRlbjo6aW50ZXJuYWw6Okludm9rZXI8ZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3RvciosIGVtc2NyaXB0ZW46OnZhbCYmPjo6aW52b2tlKGVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3IqICgqKShlbXNjcmlwdGVuOjp2YWwmJiksIGVtc2NyaXB0ZW46Ol9FTV9WQUwqKUOIAWVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3IqIGVtc2NyaXB0ZW46OmludGVybmFsOjpvcGVyYXRvcl9uZXc8ZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3RvciwgZW1zY3JpcHRlbjo6dmFsPihlbXNjcmlwdGVuOjp2YWwmJilEjgJlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjxib29sIChlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yOjoqKSh1bnNpZ25lZCBsb25nKSwgYm9vbCwgZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3RvciosIHVuc2lnbmVkIGxvbmc+OjppbnZva2UoYm9vbCAoZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3Rvcjo6KiBjb25zdCYpKHVuc2lnbmVkIGxvbmcpLCBlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yKiwgdW5zaWduZWQgbG9uZylFbHZvaWQgY29uc3QqIGVtc2NyaXB0ZW46OmludGVybmFsOjpnZXRBY3R1YWxUeXBlPGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g+KGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqKUZmdm9pZCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6cmF3X2Rlc3RydWN0b3I8ZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaD4oZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCopR9ADZW1zY3JpcHRlbjo6aW50ZXJuYWw6Okludm9rZXI8ZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYmLCB1bnNpZ25lZCBpbnQmJj46Omludm9rZShlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiAoKikoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+JiYsIHVuc2lnbmVkIGludCYmKSwgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OkJpbmRpbmdUeXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Piwgdm9pZD46Oid1bm5hbWVkJyosIHVuc2lnbmVkIGludClIqgJlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiBlbXNjcmlwdGVuOjppbnRlcm5hbDo6b3BlcmF0b3JfbmV3PGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiwgdW5zaWduZWQgaW50PihzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4mJiwgdW5zaWduZWQgaW50JiYpSTVlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjppbml0SW5kZXgodW5zaWduZWQgaW50KUr+AWVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiopKHVuc2lnbmVkIGludCksIHZvaWQsIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCB1bnNpZ25lZCBpbnQ+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6KiBjb25zdCYpKHVuc2lnbmVkIGludCksIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCB1bnNpZ25lZCBpbnQpSzJlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjppc0luZGV4SW5pdGlhbGl6ZWQoKUzrAWVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPGVtc2NyaXB0ZW46OnZhbCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6KikoKSwgZW1zY3JpcHRlbjo6dmFsLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKj46Omludm9rZShlbXNjcmlwdGVuOjp2YWwgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiogY29uc3QmKSgpLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKilNhAFlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjpyZWFkSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JilO6ARlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqKShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKSwgdm9pZCwgZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaCosIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCY+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6KiBjb25zdCYpKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYpLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OkJpbmRpbmdUeXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Piwgdm9pZD46Oid1bm5hbWVkJyopT4UBZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6d3JpdGVJbmRleChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKVBwZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6YWRkUG9pbnQoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50KVHIA2Vtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiopKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCksIHZvaWQsIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQ+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6KiBjb25zdCYpKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCksIGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2gqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgdW5zaWduZWQgaW50KVI3ZW1zY3JpcHRlbjo6QnJ1dGVmb3JjZVNlYXJjaDo6cmVtb3ZlUG9pbnQodW5zaWduZWQgaW50KVOCAWVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OnNlYXJjaEtubihzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGVtc2NyaXB0ZW46OnZhbClUsgRlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjxlbXNjcmlwdGVuOjp2YWwgKGVtc2NyaXB0ZW46OkJydXRlZm9yY2VTZWFyY2g6OiopKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsKSwgZW1zY3JpcHRlbjo6dmFsLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWw+OjppbnZva2UoZW1zY3JpcHRlbjo6dmFsIChlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWwpLCBlbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6X0VNX1ZBTCopVS5lbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjpnZXRNYXhFbGVtZW50cygpVi9lbXNjcmlwdGVuOjpCcnV0ZWZvcmNlU2VhcmNoOjpnZXRDdXJyZW50Q291bnQoKVdqdm9pZCBjb25zdCogZW1zY3JpcHRlbjo6aW50ZXJuYWw6OmdldEFjdHVhbFR5cGU8ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXPihlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqKVhkZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjppbml0SW5kZXgodW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCBib29sKVm6A2Vtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KikodW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCBib29sKSwgdm9pZCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCBib29sPjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KiBjb25zdCYpKHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgYm9vbCksIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgYm9vbClaNWVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6aW5pdEluZGV4Mih1bnNpZ25lZCBpbnQpW0NlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmluaXRJbmRleDModW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpXLICZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKSh1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCksIHZvaWQsIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50Pjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KiBjb25zdCYpKHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpXVFlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmluaXRJbmRleDQodW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCle6gJlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50Pjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KiBjb25zdCYpKHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50KV9fZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjppbml0SW5kZXg1KHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludClgogNlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCksIHZvaWQsIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKSh1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50LCB1bnNpZ25lZCBpbnQpYYkBZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpyZWFkSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgYm9vbCli/ARlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIGJvb2wpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBib29sPjo6aW52b2tlKHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KiBjb25zdCYpKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIGJvb2wpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+LCB2b2lkPjo6J3VubmFtZWQnKiwgYm9vbCljhAFlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OndyaXRlSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JilkNmVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6cmVzaXplSW5kZXgodW5zaWduZWQgaW50KWUzZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpnZXRQb2ludCh1bnNpZ25lZCBpbnQpZpsCZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8ZW1zY3JpcHRlbjo6dmFsIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHVuc2lnbmVkIGludCksIGVtc2NyaXB0ZW46OnZhbCwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50Pjo6aW52b2tlKGVtc2NyaXB0ZW46OnZhbCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0JikodW5zaWduZWQgaW50KSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgdW5zaWduZWQgaW50KWd1ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjphZGRQb2ludChzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGJvb2wpaNwDZW1zY3JpcHRlbjo6aW50ZXJuYWw6Ok1ldGhvZEludm9rZXI8dm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGJvb2wpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQsIGJvb2w+OjppbnZva2Uodm9pZCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqIGNvbnN0Jikoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBib29sKSwgZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXKiwgZW1zY3JpcHRlbjo6X0VNX1ZBTCosIHVuc2lnbmVkIGludCwgYm9vbClpcGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6YWRkUG9pbnQyKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludClqjQJlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmFkZEl0ZW1zKHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Pj4+IGNvbnN0Jiwgc3RkOjpfXzI6OnZlY3Rvcjx1bnNpZ25lZCBpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8dW5zaWduZWQgaW50Pj4gY29uc3QmLCBib29sKWusB2Vtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHZvaWQgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Kikoc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj4gY29uc3QmLCBzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYsIGJvb2wpLCB2b2lkLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+PiBjb25zdCYsIHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0JiwgYm9vbD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKShzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+PiBjb25zdCYsIHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0JiwgYm9vbCksIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIGVtc2NyaXB0ZW46Ol9FTV9WQUwqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgYm9vbClscGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6YWRkSXRlbXNXaXRoUHRyKGVtc2NyaXB0ZW46OnZhbCwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWwsIHVuc2lnbmVkIGludCwgYm9vbClt3ANlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKGVtc2NyaXB0ZW46OnZhbCwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWwsIHVuc2lnbmVkIGludCwgYm9vbCksIHZvaWQsIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIGVtc2NyaXB0ZW46OnZhbCwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWwsIHVuc2lnbmVkIGludCwgYm9vbD46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKShlbXNjcmlwdGVuOjp2YWwsIHVuc2lnbmVkIGludCwgZW1zY3JpcHRlbjo6dmFsLCB1bnNpZ25lZCBpbnQsIGJvb2wpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjpfRU1fVkFMKiwgdW5zaWduZWQgaW50LCBib29sKW4tZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpnZXRNYXhFbGVtZW50cygpbyllbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OmdldElkc0xpc3QoKXDHAmVtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4+IChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKCksIHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4+LCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqPjo6aW52b2tlKHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4+IChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKSgpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqKXE1ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjptYXJrRGVsZXRlKHVuc2lnbmVkIGludClydmVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6bWFya0RlbGV0ZUl0ZW1zKHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0JilztgNlbXNjcmlwdGVuOjppbnRlcm5hbDo6TWV0aG9kSW52b2tlcjx2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiopKHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0JiksIHZvaWQsIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGNvbnN0Jj46Omludm9rZSh2b2lkIChlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OiogY29uc3QmKShzdGQ6Ol9fMjo6dmVjdG9yPHVuc2lnbmVkIGludCwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+PiBjb25zdCYpLCBlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1cqLCBlbXNjcmlwdGVuOjpfRU1fVkFMKil0N2Vtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6dW5tYXJrRGVsZXRlKHVuc2lnbmVkIGludCl1NGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Z2V0Q3VycmVudENvdW50KCkgY29uc3R2MGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6Z2V0RWZTZWFyY2goKSBjb25zdHc2ZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpzZXRFZlNlYXJjaCh1bnNpZ25lZCBpbnQpeIEBZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjpzZWFyY2hLbm4oc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50LCBlbXNjcmlwdGVuOjp2YWwpeXFlbXNjcmlwdGVuOjpIaWVyYXJjaGljYWxOU1c6OnNlYXJjaEtubjIoc3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+IGNvbnN0JiwgdW5zaWduZWQgaW50KXrlA2Vtc2NyaXB0ZW46OmludGVybmFsOjpNZXRob2RJbnZva2VyPGVtc2NyaXB0ZW46OnZhbCAoZW1zY3JpcHRlbjo6SGllcmFyY2hpY2FsTlNXOjoqKShzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gY29uc3QmLCB1bnNpZ25lZCBpbnQpLCBlbXNjcmlwdGVuOjp2YWwsIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludD46Omludm9rZShlbXNjcmlwdGVuOjp2YWwgKGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVzo6KiBjb25zdCYpKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYsIHVuc2lnbmVkIGludCksIGVtc2NyaXB0ZW46OkhpZXJhcmNoaWNhbE5TVyosIGVtc2NyaXB0ZW46Ol9FTV9WQUwqLCB1bnNpZ25lZCBpbnQpe0dlbXNjcmlwdGVuOjppbnRlcm5hbDo6SW52b2tlcjx2b2lkLCBib29sPjo6aW52b2tlKHZvaWQgKCopKGJvb2wpLCBib29sKXyCAXZvaWQgY29uc3QqIGVtc2NyaXB0ZW46OmludGVybmFsOjpnZXRBY3R1YWxUeXBlPGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcj4oZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyKil9fHZvaWQgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OnJhd19kZXN0cnVjdG9yPGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcj4oZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyKil+f2Vtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPGVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcio+OjppbnZva2UoZW1zY3JpcHRlbjo6RW1zY3JpcHRlbkZpbGVTeXN0ZW1NYW5hZ2VyKiAoKikoKSl/dmVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlciogZW1zY3JpcHRlbjo6aW50ZXJuYWw6Om9wZXJhdG9yX25ldzxlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXI+KCmAAfoCZW1zY3JpcHRlbjo6aW50ZXJuYWw6Okludm9rZXI8dm9pZCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Jj46Omludm9rZSh2b2lkICgqKShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKSwgZW1zY3JpcHRlbjo6aW50ZXJuYWw6OkJpbmRpbmdUeXBlPHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Piwgdm9pZD46Oid1bm5hbWVkJyopgQGaAWVtc2NyaXB0ZW46OkVtc2NyaXB0ZW5GaWxlU3lzdGVtTWFuYWdlcjo6aW5pdGlhbGl6ZUZpbGVTeXN0ZW0oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JimCAThlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXI6OmlzSW5pdGlhbGl6ZWQoKYMBf2Vtc2NyaXB0ZW46OmludGVybmFsOjpJbnZva2VyPHZvaWQsIGJvb2wsIGVtc2NyaXB0ZW46OnZhbD46Omludm9rZSh2b2lkICgqKShib29sLCBlbXNjcmlwdGVuOjp2YWwpLCBib29sLCBlbXNjcmlwdGVuOjpfRU1fVkFMKimEAUZlbXNjcmlwdGVuOjpFbXNjcmlwdGVuRmlsZVN5c3RlbU1hbmFnZXI6OnN5bmNGcyhib29sLCBlbXNjcmlwdGVuOjp2YWwphQFiaG5zd2xpYjo6QnJ1dGVmb3JjZVNlYXJjaDxmbG9hdD46OkJydXRlZm9yY2VTZWFyY2goaG5zd2xpYjo6U3BhY2VJbnRlcmZhY2U8ZmxvYXQ+KiwgdW5zaWduZWQgbG9uZymGAakBaG5zd2xpYjo6QnJ1dGVmb3JjZVNlYXJjaDxmbG9hdD46OmxvYWRJbmRleChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBobnN3bGliOjpTcGFjZUludGVyZmFjZTxmbG9hdD4qKYcB3gFzdGQ6Ol9fMjo6dW5vcmRlcmVkX21hcDx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmVxdWFsX3RvPHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpwYWlyPHVuc2lnbmVkIGxvbmcgY29uc3QsIHVuc2lnbmVkIGxvbmc+Pj46On51bm9yZGVyZWRfbWFwW2FiaTp2MTUwMDddKCmIAdgBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpmaW5kW2FiaTp2MTUwMDddKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGxvbmcpIGNvbnN0iQGaB3N0ZDo6X18yOjpwYWlyPHN0ZDo6X18yOjpfX2hhc2hfaXRlcmF0b3I8c3RkOjpfXzI6Ol9faGFzaF9ub2RlPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgdm9pZCo+Kj4sIGJvb2w+IHN0ZDo6X18yOjpfX2hhc2hfdGFibGU8c3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6X191bm9yZGVyZWRfbWFwX2hhc2hlcjx1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjpoYXNoPHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6ZXF1YWxfdG88dW5zaWduZWQgbG9uZz4sIHRydWU+LCBzdGQ6Ol9fMjo6X191bm9yZGVyZWRfbWFwX2VxdWFsPHVuc2lnbmVkIGxvbmcsIHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmVxdWFsX3RvPHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBsb25nPiwgdHJ1ZT4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+Pj46Ol9fZW1wbGFjZV91bmlxdWVfa2V5X2FyZ3M8dW5zaWduZWQgbG9uZywgc3RkOjpfXzI6OnBpZWNld2lzZV9jb25zdHJ1Y3RfdCBjb25zdCYsIHN0ZDo6X18yOjp0dXBsZTx1bnNpZ25lZCBsb25nIGNvbnN0Jj4sIHN0ZDo6X18yOjp0dXBsZTw+Pih1bnNpZ25lZCBsb25nIGNvbnN0Jiwgc3RkOjpfXzI6OnBpZWNld2lzZV9jb25zdHJ1Y3RfdCBjb25zdCYsIHN0ZDo6X18yOjp0dXBsZTx1bnNpZ25lZCBsb25nIGNvbnN0Jj4mJiwgc3RkOjpfXzI6OnR1cGxlPD4mJimKAcsEdW5zaWduZWQgbG9uZyBzdGQ6Ol9fMjo6X19oYXNoX3RhYmxlPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Ol9fdW5vcmRlcmVkX21hcF9oYXNoZXI8dW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmVxdWFsX3RvPHVuc2lnbmVkIGxvbmc+LCB0cnVlPiwgc3RkOjpfXzI6Ol9fdW5vcmRlcmVkX21hcF9lcXVhbDx1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHRydWU+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPj4+OjpfX2VyYXNlX3VuaXF1ZTx1bnNpZ25lZCBsb25nPih1bnNpZ25lZCBsb25nIGNvbnN0JimLAUBzdGQ6OmludmFsaWRfYXJndW1lbnQ6OmludmFsaWRfYXJndW1lbnRbYWJpOnYxNTAwN10oY2hhciBjb25zdCopjAE/dm9pZCBlbXNjcmlwdGVuOjp2YWw6OnNldDxpbnQsIGZsb2F0PihpbnQgY29uc3QmLCBmbG9hdCBjb25zdCYpjQFPdm9pZCBlbXNjcmlwdGVuOjp2YWw6OnNldDxpbnQsIHVuc2lnbmVkIGxvbmc+KGludCBjb25zdCYsIHVuc2lnbmVkIGxvbmcgY29uc3QmKY4B0wN2b2lkIHN0ZDo6X18yOjpfX3BvcF9oZWFwW2FiaTp2MTUwMDddPHN0ZDo6X18yOjpfQ2xhc3NpY0FsZ1BvbGljeSwgc3RkOjpfXzI6Omxlc3M8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+Piwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPio+PihzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+Kj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4qPiwgc3RkOjpfXzI6Omxlc3M8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+PiYsIHN0ZDo6X18yOjppdGVyYXRvcl90cmFpdHM8c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPio+Pjo6ZGlmZmVyZW5jZV90eXBlKY8BkwFobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpIaWVyYXJjaGljYWxOU1coaG5zd2xpYjo6U3BhY2VJbnRlcmZhY2U8ZmxvYXQ+KiwgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZywgYm9vbCmQATtobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpyZXNpemVJbmRleCh1bnNpZ25lZCBsb25nKZEBf3N0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjpnZXREYXRhQnlMYWJlbDxmbG9hdD4odW5zaWduZWQgbG9uZykgY29uc3SSAS9zdGQ6Ol9fdGhyb3dfYmFkX2FycmF5X25ld19sZW5ndGhbYWJpOnYxNTAwN10oKZMBOmhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46Om1hcmtEZWxldGUodW5zaWduZWQgbG9uZymUATxobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+Ojp1bm1hcmtEZWxldGUodW5zaWduZWQgbG9uZymVAW1zdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4gZW1zY3JpcHRlbjo6dmVjRnJvbUpTQXJyYXk8ZmxvYXQ+KGVtc2NyaXB0ZW46OnZhbCBjb25zdCYplgGkAWVtc2NyaXB0ZW46OmludGVybmFsOjpCaW5kaW5nVHlwZTxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHZvaWQ+Ojp0b1dpcmVUeXBlKHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+PiBjb25zdCYplwE3c3RkOjpfXzI6Ol9fdGhyb3dfbGVuZ3RoX2Vycm9yW2FiaTp2MTUwMDddKGNoYXIgY29uc3QqKZgBKmVtc2NyaXB0ZW46OkwyU3BhY2U6OkwyU3BhY2UodW5zaWduZWQgaW50KZkBNWhuc3dsaWI6OkwyU3FyKHZvaWQgY29uc3QqLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCopmgEhaG5zd2xpYjo6TDJTcGFjZTo6Z2V0X2RhdGFfc2l6ZSgpmwEhaG5zd2xpYjo6TDJTcGFjZTo6Z2V0X2Rpc3RfZnVuYygpnAEnaG5zd2xpYjo6TDJTcGFjZTo6Z2V0X2Rpc3RfZnVuY19wYXJhbSgpnQEcaG5zd2xpYjo6TDJTcGFjZTo6fkwyU3BhY2UoKZ4BRGhuc3dsaWI6OklubmVyUHJvZHVjdERpc3RhbmNlKHZvaWQgY29uc3QqLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCopnwExaG5zd2xpYjo6U3BhY2VJbnRlcmZhY2U8ZmxvYXQ+Ojp+U3BhY2VJbnRlcmZhY2UoKaABOmVtc2NyaXB0ZW46OkN1c3RvbUZpbHRlckZ1bmN0b3I6Om9wZXJhdG9yKCkodW5zaWduZWQgbG9uZymhATdlbXNjcmlwdGVuOjpDdXN0b21GaWx0ZXJGdW5jdG9yOjp+Q3VzdG9tRmlsdGVyRnVuY3RvcigpogE5ZW1zY3JpcHRlbjo6Q3VzdG9tRmlsdGVyRnVuY3Rvcjo6fkN1c3RvbUZpbHRlckZ1bmN0b3IoKS4xowFMaG5zd2xpYjo6QnJ1dGVmb3JjZVNlYXJjaDxmbG9hdD46OmFkZFBvaW50KHZvaWQgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBib29sKaQBamhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+OjpzZWFyY2hLbm4odm9pZCBjb25zdCosIHVuc2lnbmVkIGxvbmcsIGhuc3dsaWI6OkJhc2VGaWx0ZXJGdW5jdG9yKikgY29uc3SlAZUCc3RkOjpfXzI6OnByaW9yaXR5X3F1ZXVlPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6cGFpcjxmbG9hdCwgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGxvbmc+Pj4sIHN0ZDo6X18yOjpsZXNzPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPj4+OjpwdXNoKHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBsb25nPiYmKaYBd2huc3dsaWI6OkFsZ29yaXRobUludGVyZmFjZTxmbG9hdD46OnNlYXJjaEtubkNsb3NlckZpcnN0KHZvaWQgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBobnN3bGliOjpCYXNlRmlsdGVyRnVuY3RvciopIGNvbnN0pwGIAWhuc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+OjpzYXZlSW5kZXgoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JimoAbYBc3RkOjpfXzI6OmJhc2ljX29mc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmJhc2ljX29mc3RyZWFtKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCmpAU5zdGQ6Ol9fMjo6YmFzaWNfb2ZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX29mc3RyZWFtKCmqATVobnN3bGliOjpCcnV0ZWZvcmNlU2VhcmNoPGZsb2F0Pjo6fkJydXRlZm9yY2VTZWFyY2goKasBN2huc3dsaWI6OkJydXRlZm9yY2VTZWFyY2g8ZmxvYXQ+Ojp+QnJ1dGVmb3JjZVNlYXJjaCgpLjGsAa8Edm9pZCBzdGQ6Ol9fMjo6X19oYXNoX3RhYmxlPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Ol9fdW5vcmRlcmVkX21hcF9oYXNoZXI8dW5zaWduZWQgbG9uZywgc3RkOjpfXzI6Ol9faGFzaF92YWx1ZV90eXBlPHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmc+LCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6OmVxdWFsX3RvPHVuc2lnbmVkIGxvbmc+LCB0cnVlPiwgc3RkOjpfXzI6Ol9fdW5vcmRlcmVkX21hcF9lcXVhbDx1bnNpZ25lZCBsb25nLCBzdGQ6Ol9fMjo6X19oYXNoX3ZhbHVlX3R5cGU8dW5zaWduZWQgbG9uZywgdW5zaWduZWQgbG9uZz4sIHN0ZDo6X18yOjplcXVhbF90bzx1bnNpZ25lZCBsb25nPiwgc3RkOjpfXzI6Omhhc2g8dW5zaWduZWQgbG9uZz4sIHRydWU+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpfX2hhc2hfdmFsdWVfdHlwZTx1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nPj4+OjpfX2RvX3JlaGFzaDx0cnVlPih1bnNpZ25lZCBsb25nKa0BtgFzdGQ6Ol9fMjo6YmFzaWNfaWZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6YmFzaWNfaWZzdHJlYW0oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgaW50Ka4BTnN0ZDo6X18yOjpiYXNpY19pZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaWZzdHJlYW0oKa8BkAFzdGQ6Ol9fMjo6X190cmFuc2FjdGlvbjxzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjptdXRleCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6bXV0ZXg+Pjo6X19kZXN0cm95X3ZlY3Rvcj46On5fX3RyYW5zYWN0aW9uW2FiaTp2MTUwMDddKCmwATNobnN3bGliOjpWaXNpdGVkTGlzdFBvb2w6OlZpc2l0ZWRMaXN0UG9vbChpbnQsIGludCmxAV5zdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjptdXRleCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6bXV0ZXg+Pjo6fnZlY3RvclthYmk6djE1MDA3XSgpsgFqc3RkOjpfXzI6OmRlcXVlPGhuc3dsaWI6OlZpc2l0ZWRMaXN0Kiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxobnN3bGliOjpWaXNpdGVkTGlzdCo+Pjo6X19hZGRfZnJvbnRfY2FwYWNpdHkoKbMBanN0ZDo6X18yOjpfX2RlcXVlX2Jhc2U8aG5zd2xpYjo6VmlzaXRlZExpc3QqLCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGhuc3dsaWI6OlZpc2l0ZWRMaXN0Kj4+Ojp+X19kZXF1ZV9iYXNlKCm0AUtobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjphZGRQb2ludCh2b2lkIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgYm9vbCm1AUpobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjphZGRQb2ludCh2b2lkIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgaW50KbYBRGhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnVubWFya0RlbGV0ZWRJbnRlcm5hbCh1bnNpZ25lZCBpbnQptwFOaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6dXBkYXRlUG9pbnQodm9pZCBjb25zdCosIHVuc2lnbmVkIGludCwgZmxvYXQpuAFpaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6c2VhcmNoS25uKHZvaWQgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBobnN3bGliOjpCYXNlRmlsdGVyRnVuY3RvciopIGNvbnN0uQGHAWhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnNhdmVJbmRleChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKboBM2huc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46On5IaWVyYXJjaGljYWxOU1coKbsBLGhuc3dsaWI6OlZpc2l0ZWRMaXN0UG9vbDo6flZpc2l0ZWRMaXN0UG9vbCgpvAE1aG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6fkhpZXJhcmNoaWNhbE5TVygpLjG9AYgBc3RkOjpfXzI6Ol9fc3BsaXRfYnVmZmVyPGhuc3dsaWI6OlZpc2l0ZWRMaXN0KiosIHN0ZDo6X18yOjphbGxvY2F0b3I8aG5zd2xpYjo6VmlzaXRlZExpc3QqKj4+OjpwdXNoX2Zyb250KGhuc3dsaWI6OlZpc2l0ZWRMaXN0KiogY29uc3QmKb4BUGhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnNlYXJjaEJhc2VMYXllcih1bnNpZ25lZCBpbnQsIHZvaWQgY29uc3QqLCBpbnQpvwGbAnZvaWQgc3RkOjpfXzI6OnByaW9yaXR5X3F1ZXVlPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHN0ZDo6X18yOjpwYWlyPGZsb2F0LCB1bnNpZ25lZCBpbnQ+Pj4sIGhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OkNvbXBhcmVCeUZpcnN0Pjo6ZW1wbGFjZTxmbG9hdCwgdW5zaWduZWQgaW50Jj4oZmxvYXQmJiwgdW5zaWduZWQgaW50JinAAcICaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6bXV0dWFsbHlDb25uZWN0TmV3RWxlbWVudCh2b2lkIGNvbnN0KiwgdW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6cHJpb3JpdHlfcXVldWU8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4+PiwgaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6Q29tcGFyZUJ5Rmlyc3Q+JiwgaW50LCBib29sKcEBbmhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OnJlcGFpckNvbm5lY3Rpb25zRm9yVXBkYXRlKHZvaWQgY29uc3QqLCB1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCwgaW50LCBpbnQpwgHMAnN0ZDo6X18yOjpwYWlyPHN0ZDo6X18yOjpfX2hhc2hfaXRlcmF0b3I8c3RkOjpfXzI6Ol9faGFzaF9ub2RlPHVuc2lnbmVkIGludCwgdm9pZCo+Kj4sIGJvb2w+IHN0ZDo6X18yOjpfX2hhc2hfdGFibGU8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6aGFzaDx1bnNpZ25lZCBpbnQ+LCBzdGQ6Ol9fMjo6ZXF1YWxfdG88dW5zaWduZWQgaW50Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx1bnNpZ25lZCBpbnQ+Pjo6X19lbXBsYWNlX3VuaXF1ZV9rZXlfYXJnczx1bnNpZ25lZCBpbnQsIHVuc2lnbmVkIGludCBjb25zdCY+KHVuc2lnbmVkIGludCBjb25zdCYsIHVuc2lnbmVkIGludCBjb25zdCYpwwGqAmhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OmdldE5laWdoYm9yc0J5SGV1cmlzdGljMihzdGQ6Ol9fMjo6cHJpb3JpdHlfcXVldWU8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnBhaXI8ZmxvYXQsIHVuc2lnbmVkIGludD4+PiwgaG5zd2xpYjo6SGllcmFyY2hpY2FsTlNXPGZsb2F0Pjo6Q29tcGFyZUJ5Rmlyc3Q+JiwgdW5zaWduZWQgbG9uZynEAS5obnN3bGliOjpWaXNpdGVkTGlzdFBvb2w6OmdldEZyZWVWaXNpdGVkTGlzdCgpxQG3AWhuc3dsaWI6OkhpZXJhcmNoaWNhbE5TVzxmbG9hdD46OmxvYWRJbmRleChzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCBobnN3bGliOjpTcGFjZUludGVyZmFjZTxmbG9hdD4qLCB1bnNpZ25lZCBsb25nKcYB9wFzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjp2ZWN0b3I8ZmxvYXQsIHN0ZDo6X18yOjphbGxvY2F0b3I8ZmxvYXQ+Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+PiBlbXNjcmlwdGVuOjp2ZWNGcm9tSlNBcnJheTxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4+KGVtc2NyaXB0ZW46OnZhbCBjb25zdCYpxwGCAXN0ZDo6X18yOjp2ZWN0b3I8dW5zaWduZWQgaW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHVuc2lnbmVkIGludD4+IGVtc2NyaXB0ZW46OnZlY0Zyb21KU0FycmF5PHVuc2lnbmVkIGludD4oZW1zY3JpcHRlbjo6dmFsIGNvbnN0JinIAaYBc3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6dmVjdG9yPGZsb2F0LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGZsb2F0Pj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8c3RkOjpfXzI6OnZlY3RvcjxmbG9hdCwgc3RkOjpfXzI6OmFsbG9jYXRvcjxmbG9hdD4+Pj46On52ZWN0b3JbYWJpOnYxNTAwN10oKckBnAFlbXNjcmlwdGVuOjppbnRlcm5hbDo6QmluZGluZ1R5cGU8c3RkOjpfXzI6OnZlY3RvcjxpbnQsIHN0ZDo6X18yOjphbGxvY2F0b3I8aW50Pj4sIHZvaWQ+Ojp0b1dpcmVUeXBlKHN0ZDo6X18yOjp2ZWN0b3I8aW50LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGludD4+IGNvbnN0JinKAUJobnN3bGliOjpIaWVyYXJjaGljYWxOU1c8ZmxvYXQ+OjptYXJrRGVsZXRlZEludGVybmFsKHVuc2lnbmVkIGludCnLAQ1fX2dldFR5cGVOYW1lzAEbX2VtYmluZF9pbml0aWFsaXplX2JpbmRpbmdzzQEVZW1iaW5kX2luaXRfYnVpbHRpbigpzgEIX19tZW1jcHnPAQdtZW1tb3Zl0AEGbWVtc2V00QEDbG9n0gEGbWVtY2hy0wEGbWVtY21w1AEGc3RybGVu1QEQX19lcnJub19sb2NhdGlvbtYBCGRsbWFsbG9j1wEGZGxmcmVl2AEJZGxyZWFsbG9j2QENZGlzcG9zZV9jaHVua9oBBHNicmvbASVzdGQ6Ol9fMjo6X19uZXh0X3ByaW1lKHVuc2lnbmVkIGxvbmcp3AGZAXVuc2lnbmVkIGludCBjb25zdCogc3RkOjpfXzI6Omxvd2VyX2JvdW5kW2FiaTp2MTUwMDddPHVuc2lnbmVkIGludCBjb25zdCosIHVuc2lnbmVkIGxvbmc+KHVuc2lnbmVkIGludCBjb25zdCosIHVuc2lnbmVkIGludCBjb25zdCosIHVuc2lnbmVkIGxvbmcgY29uc3QmKd0BOXN0ZDo6X18yOjpfX3Rocm93X292ZXJmbG93X2Vycm9yW2FiaTp2MTUwMDddKGNoYXIgY29uc3QqKd4BZHVuc2lnbmVkIGludCBjb25zdCYgc3RkOjpfXzI6Ol9faWRlbnRpdHk6Om9wZXJhdG9yKCk8dW5zaWduZWQgaW50IGNvbnN0Jj4odW5zaWduZWQgaW50IGNvbnN0JikgY29uc3TfAQtfX3N0cmNocm51bOABBnN0cmNocuEBDF9fc3RkaW9fc2Vla+IBDV9fc3RkaW9fd3JpdGXjAQxfX3N0ZGlvX3JlYWTkAQ1fX3N0ZGlvX2Nsb3Nl5QEVZW1zY3JpcHRlbl9mdXRleF93YWtl5gEUX19wdGhyZWFkX211dGV4X2xvY2vnAQpfX2xvY2tmaWxl6AERX19mc2Vla29fdW5sb2NrZWTpAQhfX2ZzZWVrb+oBBmZmbHVzaOsBBmZjbG9zZewBCF9fdG9yZWFk7QEFZnJlYWTuAQlfX3Rvd3JpdGXvAQlfX2Z3cml0ZXjwAQZmd3JpdGXxARFfX2Z0ZWxsb191bmxvY2tlZPIBRHN0ZDo6X18yOjpiYXNpY19pb3M8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lvcygp8wFQc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfc3RyZWFtYnVmKCn0AVJzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19zdHJlYW1idWYoKS4x9QFcc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjppbWJ1ZShzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0Jin2AVFzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNldGJ1ZihjaGFyKiwgbG9uZyn3AXtzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNlZWtvZmYobG9uZyBsb25nLCBzdGQ6Ol9fMjo6aW9zX2Jhc2U6OnNlZWtkaXIsIHVuc2lnbmVkIGludCn4AXBzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNlZWtwb3Moc3RkOjpfXzI6OmZwb3M8X19tYnN0YXRlX3Q+LCB1bnNpZ25lZCBpbnQp+QFRc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp4c2dldG4oY2hhciosIGxvbmcp+gFEc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Ojpjb3B5KGNoYXIqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZyn7AboBc3RkOjpfXzI6OmVuYWJsZV9pZjxfX2lzX2NwcDE3X3JhbmRvbV9hY2Nlc3NfaXRlcmF0b3I8Y2hhciBjb25zdCo+Ojp2YWx1ZSwgY2hhcio+Ojp0eXBlIHN0ZDo6X18yOjpjb3B5X25bYWJpOnYxNTAwN108Y2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcsIGNoYXIqPihjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZywgY2hhciop/AFJc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp1bmRlcmZsb3coKf0BRXN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6dWZsb3coKf4BTHN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6cGJhY2tmYWlsKGludCn/AVdzdGQ6Ol9fMjo6YmFzaWNfc3RyZWFtYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnhzcHV0bihjaGFyIGNvbnN0KiwgbG9uZymAAkxzdGQ6Ol9fMjo6YmFzaWNfaXN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaXN0cmVhbSgpgQJOc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lzdHJlYW0oKS4xggJddmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfaXN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaXN0cmVhbSgpgwJOc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lzdHJlYW0oKS4yhAJfdmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfaXN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaXN0cmVhbSgpLjGFAo0Bc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2VudHJ5OjpzZW50cnkoc3RkOjpfXzI6OmJhc2ljX2lzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYsIGJvb2wphgJDc3RkOjpfXzI6OmJhc2ljX29zdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6Zmx1c2goKYcCbHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYgc3RkOjpfXzI6OnVzZV9mYWNldFthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4+KHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKYgCWnN0ZDo6X18yOjpiYXNpY19pb3M8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2V0c3RhdGVbYWJpOnYxNTAwN10odW5zaWduZWQgaW50KYkC2gFib29sIHN0ZDo6X18yOjpvcGVyYXRvcj09W2FiaTp2MTUwMDddPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4gY29uc3QmKYoCWnN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46Om9wZXJhdG9yKytbYWJpOnYxNTAwN10oKYsCUnN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2J1bXBjW2FiaTp2MTUwMDddKCmMAk1zdGQ6Ol9fMjo6YmFzaWNfaXN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpyZWFkKGNoYXIqLCBsb25nKY0CQ3N0ZDo6X18yOjpiYXNpY19pc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnRlbGxnKCmOAmlzdGQ6Ol9fMjo6YmFzaWNfaXN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZWVrZyhsb25nIGxvbmcsIHN0ZDo6X18yOjppb3NfYmFzZTo6c2Vla2RpcimPAk5zdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb3N0cmVhbSgpLjGQAl12aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vc3RyZWFtKCmRAk5zdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb3N0cmVhbSgpLjKSAl92aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vc3RyZWFtKCkuMZMChwFzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZW50cnk6OnNlbnRyeShzdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+JimUAk1zdGQ6Ol9fMjo6YmFzaWNfb3N0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZW50cnk6On5zZW50cnkoKZUCXXN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46Om9wZXJhdG9yPVthYmk6djE1MDA3XShjaGFyKZYCVHN0ZDo6X18yOjpiYXNpY19vc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OndyaXRlKGNoYXIgY29uc3QqLCBsb25nKZcCTXN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pjo6Y29weSh3Y2hhcl90Kiwgd2NoYXJfdCBjb25zdCosIHVuc2lnbmVkIGxvbmcpmAJyc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pj4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpmQLsAWJvb2wgc3RkOjpfXzI6Om9wZXJhdG9yPT1bYWJpOnYxNTAwN108d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+IGNvbnN0Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiBjb25zdCYpmgJgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pjo6b3BlcmF0b3IrK1thYmk6djE1MDA3XSgpmwJYc3RkOjpfXzI6OmJhc2ljX3N0cmVhbWJ1Zjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+OjpzYnVtcGNbYWJpOnYxNTAwN10oKZwCZnN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj46Om9wZXJhdG9yPVthYmk6djE1MDA3XSh3Y2hhcl90KZ0CVnN0ZDo6X18yOjpiYXNpY19zdHJlYW1idWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6Z3B0clthYmk6djE1MDA3XSgpIGNvbnN0ngLDAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6b3BlcmF0b3I9W2FiaTp2MTUwMDddKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiYmKZ8CvAFzdGQ6Ol9fMjo6ZW5hYmxlX2lmPF9faXNfY3BwMTdfZm9yd2FyZF9pdGVyYXRvcjxjaGFyKj46OnZhbHVlLCB2b2lkPjo6dHlwZSBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9faW5pdDxjaGFyKj4oY2hhciosIGNoYXIqKaACd3N0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6cmVzaXplW2FiaTp2MTUwMDddKHVuc2lnbmVkIGxvbmcpoQJbc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6b3BlbihjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50KaICS3N0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmJhc2ljX2ZpbGVidWYoKaMClgFzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyLCBjaGFyLCBfX21ic3RhdGVfdD4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXRbYWJpOnYxNTAwN108c3RkOjpfXzI6OmNvZGVjdnQ8Y2hhciwgY2hhciwgX19tYnN0YXRlX3Q+PihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimkAkxzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfZmlsZWJ1ZigppQJDc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6Y2xvc2UoKaYC1AFzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxfSU9fRklMRSwgaW50ICgqKShfSU9fRklMRSopPjo6dW5pcXVlX3B0clthYmk6djE1MDA3XTx0cnVlLCB2b2lkPihfSU9fRklMRSosIHN0ZDo6X18yOjpfX2RlcGVuZGVudF90eXBlPHN0ZDo6X18yOjpfX3VuaXF1ZV9wdHJfZGVsZXRlcl9zZmluYWU8aW50ICgqKShfSU9fRklMRSopPiwgdHJ1ZT46Ol9fZ29vZF9ydmFsX3JlZl90eXBlKacCTnN0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19maWxlYnVmKCkuMagCUHN0ZDo6X18yOjp1bmlxdWVfcHRyPF9JT19GSUxFLCBpbnQgKCopKF9JT19GSUxFKik+OjpyZXNldFthYmk6djE1MDA3XShfSU9fRklMRSopqQJHc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6dW5kZXJmbG93KCmqAihzdGQ6Ol9fMjo6X190aHJvd19iYWRfY2FzdFthYmk6djE1MDA3XSgpqwJKc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6cGJhY2tmYWlsKGludCmsAklzdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpvdmVyZmxvdyhpbnQprQJPc3RkOjpfXzI6OmJhc2ljX2ZpbGVidWY8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6c2V0YnVmKGNoYXIqLCBsb25nKa4CeXN0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnNlZWtvZmYobG9uZyBsb25nLCBzdGQ6Ol9fMjo6aW9zX2Jhc2U6OnNlZWtkaXIsIHVuc2lnbmVkIGludCmvAm5zdGQ6Ol9fMjo6YmFzaWNfZmlsZWJ1ZjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+OjpzZWVrcG9zKHN0ZDo6X18yOjpmcG9zPF9fbWJzdGF0ZV90PiwgdW5zaWduZWQgaW50KbACQnN0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OnN5bmMoKbECWnN0ZDo6X18yOjpiYXNpY19maWxlYnVmPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46OmltYnVlKHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKbICUHN0ZDo6X18yOjpiYXNpY19pZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaWZzdHJlYW0oKS4xswJfdmlydHVhbCB0aHVuayB0byBzdGQ6Ol9fMjo6YmFzaWNfaWZzdHJlYW08Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pjo6fmJhc2ljX2lmc3RyZWFtKCm0AmF2aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19pZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfaWZzdHJlYW0oKS4xtQJQc3RkOjpfXzI6OmJhc2ljX29mc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vZnN0cmVhbSgpLjG2Al92aXJ0dWFsIHRodW5rIHRvIHN0ZDo6X18yOjpiYXNpY19vZnN0cmVhbTxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Ojp+YmFzaWNfb2ZzdHJlYW0oKbcCYXZpcnR1YWwgdGh1bmsgdG8gc3RkOjpfXzI6OmJhc2ljX29mc3RyZWFtPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46On5iYXNpY19vZnN0cmVhbSgpLjG4AlVjaGFyKiBzdGQ6Ol9fMjo6Y29weVthYmk6djE1MDA3XTxjaGFyIGNvbnN0KiwgY2hhcio+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciopuQJdYXV0byBzdGQ6Ol9fMjo6X191bndyYXBfcmFuZ2VbYWJpOnYxNTAwN108Y2hhciBjb25zdCosIGNoYXIgY29uc3QqPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCopugJ9c3RkOjpfXzI6OnBhaXI8Y2hhciBjb25zdCosIGNoYXIqPiBzdGQ6Ol9fMjo6X19jb3B5X2ltcGxbYWJpOnYxNTAwN108Y2hhciBjb25zdCwgY2hhciwgdm9pZD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyKim7An9zdGQ6Ol9fMjo6YWxsb2NhdG9yX3RyYWl0czxzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6ZGVhbGxvY2F0ZVthYmk6djE1MDA3XShzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+JiwgY2hhciosIHVuc2lnbmVkIGxvbmcpvAJOc3RkOjpfXzI6Ol9fbGliY3BwX2RlYWxsb2NhdGVbYWJpOnYxNTAwN10odm9pZCosIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcpvQLNAXN0ZDo6X18yOjpfX2FsbG9jYXRpb25fcmVzdWx0PHN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Ojpwb2ludGVyPiBzdGQ6Ol9fMjo6X19hbGxvY2F0ZV9hdF9sZWFzdFthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PihzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+JiwgdW5zaWduZWQgbG9uZym+Aj5zdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+OjphbGxvY2F0ZVthYmk6djE1MDA3XSh1bnNpZ25lZCBsb25nKb8CRXN0ZDo6X18yOjpfX2xpYmNwcF9hbGxvY2F0ZVthYmk6djE1MDA3XSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKcACZHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46Ol9fdGVzdF9mb3JfZW9mW2FiaTp2MTUwMDddKCkgY29uc3TBAmpzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+OjpfX3Rlc3RfZm9yX2VvZlthYmk6djE1MDA3XSgpIGNvbnN0wgIrc3RkOjpfXzI6Ol9faW9zdHJlYW1fY2F0ZWdvcnk6Om5hbWUoKSBjb25zdMMCMXN0ZDo6X18yOjpfX2lvc3RyZWFtX2NhdGVnb3J5OjptZXNzYWdlKGludCkgY29uc3TEAidzdGQ6Ol9fMjo6aW9zX2Jhc2U6OmZhaWx1cmU6On5mYWlsdXJlKCnFAilzdGQ6Ol9fMjo6aW9zX2Jhc2U6OmZhaWx1cmU6On5mYWlsdXJlKCkuMcYCJ3N0ZDo6X18yOjppb3NfYmFzZTo6Y2xlYXIodW5zaWduZWQgaW50KccCH3N0ZDo6X18yOjppb3NfYmFzZTo6fmlvc19iYXNlKCnIAiFzdGQ6Ol9fMjo6aW9zX2Jhc2U6On5pb3NfYmFzZSgpLjHJAh9zdGQ6Ol9fMjo6aW9zX2Jhc2U6OmluaXQodm9pZCopygI3c3RkOjpfXzI6Omlvc19iYXNlOjpfX3NldF9iYWRiaXRfYW5kX2NvbnNpZGVyX3JldGhyb3coKcsCB19fc2hsaW3MAghfX3NoZ2V0Y80CCV9fYXNobHRpM84CC19fZmxvYXRzaXRmzwIJX19sc2hydGkz0AIIX19tdWx0ZjPRAghfX2FkZHRmM9ICDV9fZXh0ZW5kZGZ0ZjLTAgdfX2xldGYy1AIHX19nZXRmMtUCBnNjYWxibtYCCWNvcHlzaWdubNcCDV9fZmxvYXR1bnNpdGbYAghfX3N1YnRmM9kCB3NjYWxibmzaAghfX211bHRpM9sCCF9fZGl2dGYz3AIFZm1vZGzdAgtfX2Zsb2F0c2Nhbt4CB3NjYW5leHDfAgxfX3RydW5jdGZzZjLgAgxfX3RydW5jdGZkZjLhAgdtYnJ0b3dj4gIJc3RvcmVfaW504wIHdnNzY2FuZuQCC3N0cmluZ19yZWFk5QIGc3RyY21w5gIFc3dhcGPnAgdzdHJuY21w6AIGZ2V0ZW526QIMX19nZXRfbG9jYWxl6gIHd2NydG9tYusCBndjdG9tYuwCBWZyZXhw7QILcHJpbnRmX2NvcmXuAgNvdXTvAgZnZXRpbnTwAgdwb3BfYXJn8QIFZm10X3XyAgNwYWTzAgh2ZnByaW50ZvQCBmZtdF9mcPUCE3BvcF9hcmdfbG9uZ19kb3VibGX2Agl2c25wcmludGb3Aghzbl93cml0ZfgCBnNzY2FuZvkCCHNucHJpbnRm+gIKZnJlZWxvY2FsZfsCBnN0cmNwefwCBndjc2xlbv0CCW1ic3J0b3djc/4CBnN0cnRveP8CCHN0cnRveC4xgANdc3RkOjpfXzI6OmNvbGxhdGU8Y2hhcj46OmRvX2NvbXBhcmUoY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCopIGNvbnN0gQNFc3RkOjpfXzI6OmNvbGxhdGU8Y2hhcj46OmRvX3RyYW5zZm9ybShjaGFyIGNvbnN0KiwgY2hhciBjb25zdCopIGNvbnN0ggObAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6YmFzaWNfc3RyaW5nW2FiaTp2MTUwMDddPGNoYXIgY29uc3QqLCB2b2lkPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCopgwNAc3RkOjpfXzI6OmNvbGxhdGU8Y2hhcj46OmRvX2hhc2goY2hhciBjb25zdCosIGNoYXIgY29uc3QqKSBjb25zdIQDbHN0ZDo6X18yOjpjb2xsYXRlPHdjaGFyX3Q+Ojpkb19jb21wYXJlKHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqKSBjb25zdIUDTnN0ZDo6X18yOjpjb2xsYXRlPHdjaGFyX3Q+Ojpkb190cmFuc2Zvcm0od2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqKSBjb25zdIYD6QFzdGQ6Ol9fMjo6ZW5hYmxlX2lmPF9faXNfY3BwMTdfZm9yd2FyZF9pdGVyYXRvcjx3Y2hhcl90IGNvbnN0Kj46OnZhbHVlLCB2b2lkPjo6dHlwZSBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Ol9faW5pdDx3Y2hhcl90IGNvbnN0Kj4od2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqKYcDSXN0ZDo6X18yOjpjb2xsYXRlPHdjaGFyX3Q+Ojpkb19oYXNoKHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3SIA5YCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBib29sJikgY29uc3SJA3JzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXRbYWJpOnYxNTAwN108c3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+PihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimKA5wFc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0KiBzdGQ6Ol9fMjo6X19zY2FuX2tleXdvcmQ8c3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+PihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Kiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JiwgdW5zaWduZWQgaW50JiwgYm9vbCmLAzhzdGQ6Ol9fMjo6bG9jYWxlOjp1c2VfZmFjZXQoc3RkOjpfXzI6OmxvY2FsZTo6aWQmKSBjb25zdIwDV3N0ZDo6X18yOjp1bmlxdWVfcHRyPHVuc2lnbmVkIGNoYXIsIHZvaWQgKCopKHZvaWQqKT46OnJlc2V0W2FiaTp2MTUwMDddKHVuc2lnbmVkIGNoYXIqKY0DT3N0ZDo6X18yOjp1bmlxdWVfcHRyPHVuc2lnbmVkIGNoYXIsIHZvaWQgKCopKHZvaWQqKT46On51bmlxdWVfcHRyW2FiaTp2MTUwMDddKCmOA5YCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nJikgY29uc3SPAzlzdGQ6Ol9fMjo6X19udW1fZ2V0X2Jhc2U6Ol9fZ2V0X2Jhc2Uoc3RkOjpfXzI6Omlvc19iYXNlJimQA0hzdGQ6Ol9fMjo6X19udW1fZ2V0PGNoYXI+OjpfX3N0YWdlMl9pbnRfcHJlcChzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyJimRA+QBc3RkOjpfXzI6Ol9fbnVtX2dldDxjaGFyPjo6X19zdGFnZTJfaW50X2xvb3AoY2hhciwgaW50LCBjaGFyKiwgY2hhciomLCB1bnNpZ25lZCBpbnQmLCBjaGFyLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgY2hhciBjb25zdCopkgNcbG9uZyBzdGQ6Ol9fMjo6X19udW1fZ2V0X3NpZ25lZF9pbnRlZ3JhbDxsb25nPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYsIGludCmTA6QBc3RkOjpfXzI6Ol9fY2hlY2tfZ3JvdXBpbmcoc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JiwgdW5zaWduZWQgaW50KiwgdW5zaWduZWQgaW50KiwgdW5zaWduZWQgaW50JimUA5sCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nIGxvbmcmKSBjb25zdJUDZmxvbmcgbG9uZyBzdGQ6Ol9fMjo6X19udW1fZ2V0X3NpZ25lZF9pbnRlZ3JhbDxsb25nIGxvbmc+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JiwgaW50KZYDoAJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIHNob3J0JikgY29uc3SXA3J1bnNpZ25lZCBzaG9ydCBzdGQ6Ol9fMjo6X19udW1fZ2V0X3Vuc2lnbmVkX2ludGVncmFsPHVuc2lnbmVkIHNob3J0PihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYsIGludCmYA54Cc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBpbnQmKSBjb25zdJkDbnVuc2lnbmVkIGludCBzdGQ6Ol9fMjo6X19udW1fZ2V0X3Vuc2lnbmVkX2ludGVncmFsPHVuc2lnbmVkIGludD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmLCBpbnQpmgOkAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdW5zaWduZWQgbG9uZyBsb25nJikgY29uc3SbA3p1bnNpZ25lZCBsb25nIGxvbmcgc3RkOjpfXzI6Ol9fbnVtX2dldF91bnNpZ25lZF9pbnRlZ3JhbDx1bnNpZ25lZCBsb25nIGxvbmc+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JiwgaW50KZwDlwJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGZsb2F0JikgY29uc3SdA1hzdGQ6Ol9fMjo6X19udW1fZ2V0PGNoYXI+OjpfX3N0YWdlMl9mbG9hdF9wcmVwKHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIqLCBjaGFyJiwgY2hhciYpngPvAXN0ZDo6X18yOjpfX251bV9nZXQ8Y2hhcj46Ol9fc3RhZ2UyX2Zsb2F0X2xvb3AoY2hhciwgYm9vbCYsIGNoYXImLCBjaGFyKiwgY2hhciomLCBjaGFyLCBjaGFyLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmLCB1bnNpZ25lZCBpbnQqLCB1bnNpZ25lZCBpbnQqJiwgdW5zaWduZWQgaW50JiwgY2hhciopnwNPZmxvYXQgc3RkOjpfXzI6Ol9fbnVtX2dldF9mbG9hdDxmbG9hdD4oY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBpbnQmKaADmAJzdGQ6Ol9fMjo6bnVtX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGRvdWJsZSYpIGNvbnN0oQNRZG91YmxlIHN0ZDo6X18yOjpfX251bV9nZXRfZmxvYXQ8ZG91YmxlPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGludCYpogOdAnN0ZDo6X18yOjpudW1fZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBkb3VibGUmKSBjb25zdKMDW2xvbmcgZG91YmxlIHN0ZDo6X18yOjpfX251bV9nZXRfZmxvYXQ8bG9uZyBkb3VibGU+KGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50JimkA5cCc3RkOjpfXzI6Om51bV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB2b2lkKiYpIGNvbnN0pQMSc3RkOjpfXzI6Ol9fY2xvYygppgNMc3RkOjpfXzI6Ol9fbGliY3BwX3NzY2FuZl9sKGNoYXIgY29uc3QqLCBfX2xvY2FsZV9zdHJ1Y3QqLCBjaGFyIGNvbnN0KiwgLi4uKacDYGNoYXIgY29uc3QqIHN0ZDo6X18yOjpmaW5kW2FiaTp2MTUwMDddPGNoYXIgY29uc3QqLCBjaGFyPihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QmKagDVXN0ZDo6X18yOjpfX2xpYmNwcF9sb2NhbGVfZ3VhcmQ6Ol9fbGliY3BwX2xvY2FsZV9ndWFyZFthYmk6djE1MDA3XShfX2xvY2FsZV9zdHJ1Y3QqJimpA6sCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBib29sJikgY29uc3SqA3hzdGQ6Ol9fMjo6bnVtcHVuY3Q8d2NoYXJfdD4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXRbYWJpOnYxNTAwN108c3RkOjpfXzI6Om51bXB1bmN0PHdjaGFyX3Q+PihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimrA9gFc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0KiBzdGQ6Ol9fMjo6X19zY2FuX2tleXdvcmQ8c3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+PihzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0Kiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0Kiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JiwgdW5zaWduZWQgaW50JiwgYm9vbCmsA6sCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nJikgY29uc3StA01zdGQ6Ol9fMjo6X19udW1fZ2V0PHdjaGFyX3Q+OjpfX2RvX3dpZGVuKHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QqKSBjb25zdK4DTnN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fc3RhZ2UyX2ludF9wcmVwKHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QmKa8D8AFzdGQ6Ol9fMjo6X19udW1fZ2V0PHdjaGFyX3Q+OjpfX3N0YWdlMl9pbnRfbG9vcCh3Y2hhcl90LCBpbnQsIGNoYXIqLCBjaGFyKiYsIHVuc2lnbmVkIGludCYsIHdjaGFyX3QsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCosIHVuc2lnbmVkIGludComLCB3Y2hhcl90IGNvbnN0KimwA7ACc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBsb25nIGxvbmcmKSBjb25zdLEDtQJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIHNob3J0JikgY29uc3SyA7MCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB1bnNpZ25lZCBpbnQmKSBjb25zdLMDuQJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHVuc2lnbmVkIGxvbmcgbG9uZyYpIGNvbnN0tAOsAnN0ZDo6X18yOjpudW1fZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgZmxvYXQmKSBjb25zdLUDZHN0ZDo6X18yOjpfX251bV9nZXQ8d2NoYXJfdD46Ol9fc3RhZ2UyX2Zsb2F0X3ByZXAoc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCosIHdjaGFyX3QmLCB3Y2hhcl90Jim2A/4Bc3RkOjpfXzI6Ol9fbnVtX2dldDx3Y2hhcl90Pjo6X19zdGFnZTJfZmxvYXRfbG9vcCh3Y2hhcl90LCBib29sJiwgY2hhciYsIGNoYXIqLCBjaGFyKiYsIHdjaGFyX3QsIHdjaGFyX3QsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHVuc2lnbmVkIGludCosIHVuc2lnbmVkIGludComLCB1bnNpZ25lZCBpbnQmLCB3Y2hhcl90Kim3A60Cc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCBkb3VibGUmKSBjb25zdLgDsgJzdGQ6Ol9fMjo6bnVtX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIGxvbmcgZG91YmxlJikgY29uc3S5A6wCc3RkOjpfXzI6Om51bV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB2b2lkKiYpIGNvbnN0ugNyd2NoYXJfdCBjb25zdCogc3RkOjpfXzI6OmZpbmRbYWJpOnYxNTAwN108d2NoYXJfdCBjb25zdCosIHdjaGFyX3Q+KHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCYpuwPKAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgYm9vbCkgY29uc3S8A2lzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmJlZ2luW2FiaTp2MTUwMDddKCm9A2dzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmVuZFthYmk6djE1MDA3XSgpvgPKAXN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgbG9uZykgY29uc3S/A05zdGQ6Ol9fMjo6X19udW1fcHV0X2Jhc2U6Ol9fZm9ybWF0X2ludChjaGFyKiwgY2hhciBjb25zdCosIGJvb2wsIHVuc2lnbmVkIGludCnAA1dzdGQ6Ol9fMjo6X19saWJjcHBfc25wcmludGZfbChjaGFyKiwgdW5zaWduZWQgbG9uZywgX19sb2NhbGVfc3RydWN0KiwgY2hhciBjb25zdCosIC4uLinBA1VzdGQ6Ol9fMjo6X19udW1fcHV0X2Jhc2U6Ol9faWRlbnRpZnlfcGFkZGluZyhjaGFyKiwgY2hhciosIHN0ZDo6X18yOjppb3NfYmFzZSBjb25zdCYpwgN1c3RkOjpfXzI6Ol9fbnVtX3B1dDxjaGFyPjo6X193aWRlbl9hbmRfZ3JvdXBfaW50KGNoYXIqLCBjaGFyKiwgY2hhciosIGNoYXIqLCBjaGFyKiYsIGNoYXIqJiwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpwwOCAnN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4gc3RkOjpfXzI6Ol9fcGFkX2FuZF9vdXRwdXQ8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PihzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyKcQDzwFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGxvbmcgbG9uZykgY29uc3TFA9MBc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCB1bnNpZ25lZCBsb25nKSBjb25zdMYD2AFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIHVuc2lnbmVkIGxvbmcgbG9uZykgY29uc3THA8wBc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBkb3VibGUpIGNvbnN0yAO/AnN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4gc3RkOjpfXzI6Om51bV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46Ol9fZG9fcHV0X2Zsb2F0aW5nX3BvaW50W2FiaTp2MTUwMDddPGRvdWJsZT4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgZG91YmxlLCBjaGFyIGNvbnN0KikgY29uc3TJA0pzdGQ6Ol9fMjo6X19udW1fcHV0X2Jhc2U6Ol9fZm9ybWF0X2Zsb2F0KGNoYXIqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgaW50KcoDSXN0ZDo6X18yOjpfX2xpYmNwcF9hc3ByaW50Zl9sKGNoYXIqKiwgX19sb2NhbGVfc3RydWN0KiwgY2hhciBjb25zdCosIC4uLinLA3dzdGQ6Ol9fMjo6X19udW1fcHV0PGNoYXI+OjpfX3dpZGVuX2FuZF9ncm91cF9mbG9hdChjaGFyKiwgY2hhciosIGNoYXIqLCBjaGFyKiwgY2hhciomLCBjaGFyKiYsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKcwD0QFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIGxvbmcgZG91YmxlKSBjb25zdM0DyQJzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+IHN0ZDo6X18yOjpudW1fcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+OjpfX2RvX3B1dF9mbG9hdGluZ19wb2ludFthYmk6djE1MDA3XTxsb25nIGRvdWJsZT4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgbG9uZyBkb3VibGUsIGNoYXIgY29uc3QqKSBjb25zdM4D0QFzdGQ6Ol9fMjo6bnVtX3B1dDxjaGFyLCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIGNoYXIsIHZvaWQgY29uc3QqKSBjb25zdM8DgwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmJhc2ljX3N0cmluZ1thYmk6djE1MDA3XSh1bnNpZ25lZCBsb25nLCBjaGFyKdAD3AFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGJvb2wpIGNvbnN00QNwc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjplbmRbYWJpOnYxNTAwN10oKdID3AFzdGQ6Ol9fMjo6bnVtX3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGxvbmcpIGNvbnN00wOBAXN0ZDo6X18yOjpfX251bV9wdXQ8d2NoYXJfdD46Ol9fd2lkZW5fYW5kX2dyb3VwX2ludChjaGFyKiwgY2hhciosIGNoYXIqLCB3Y2hhcl90Kiwgd2NoYXJfdComLCB3Y2hhcl90KiYsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKdQDoAJzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+IHN0ZDo6X18yOjpfX3BhZF9hbmRfb3V0cHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4oc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0Kiwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCnVA+EBc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBsb25nIGxvbmcpIGNvbnN01gPlAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgdW5zaWduZWQgbG9uZykgY29uc3TXA+oBc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCB1bnNpZ25lZCBsb25nIGxvbmcpIGNvbnN02APeAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgZG91YmxlKSBjb25zdNkD1wJzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+IHN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpfX2RvX3B1dF9mbG9hdGluZ19wb2ludFthYmk6djE1MDA3XTxkb3VibGU+KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGRvdWJsZSwgY2hhciBjb25zdCopIGNvbnN02gODAXN0ZDo6X18yOjpfX251bV9wdXQ8d2NoYXJfdD46Ol9fd2lkZW5fYW5kX2dyb3VwX2Zsb2F0KGNoYXIqLCBjaGFyKiwgY2hhciosIHdjaGFyX3QqLCB3Y2hhcl90KiYsIHdjaGFyX3QqJiwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYp2wPjAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgbG9uZyBkb3VibGUpIGNvbnN03APhAnN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4gc3RkOjpfXzI6Om51bV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46Ol9fZG9fcHV0X2Zsb2F0aW5nX3BvaW50W2FiaTp2MTUwMDddPGxvbmcgZG91YmxlPihzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBsb25nIGRvdWJsZSwgY2hhciBjb25zdCopIGNvbnN03QPjAXN0ZDo6X18yOjpudW1fcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgdm9pZCBjb25zdCopIGNvbnN03gOPAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6YmFzaWNfc3RyaW5nW2FiaTp2MTUwMDddKHVuc2lnbmVkIGxvbmcsIHdjaGFyX3Qp3wM3dm9pZCBzdGQ6Ol9fMjo6cmV2ZXJzZVthYmk6djE1MDA3XTxjaGFyKj4oY2hhciosIGNoYXIqKeADQHZvaWQgc3RkOjpfXzI6OnJldmVyc2VbYWJpOnYxNTAwN108d2NoYXJfdCo+KHdjaGFyX3QqLCB3Y2hhcl90KinhA6wCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+OjpnZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCopIGNvbnN04gNxc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19kYXRlX29yZGVyKCkgY29uc3TjA5oCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXRfdGltZShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN05AOaAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0X2RhdGUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdOUDnQJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX2dldF93ZWVrZGF5KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TmA6sCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+OjpfX2dldF93ZWVrZGF5bmFtZShpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPGNoYXI+IGNvbnN0JikgY29uc3TnA58Cc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXRfbW9udGhuYW1lKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3ToA6kCc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+OjpfX2dldF9tb250aG5hbWUoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYpIGNvbnN06QOaAnN0ZDo6X18yOjp0aW1lX2dldDxjaGFyLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Pjo6ZG9fZ2V0X3llYXIoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdOoDpAJzdGQ6Ol9fMjo6dGltZV9nZXQ8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46Ol9fZ2V0X3llYXIoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYpIGNvbnN06wOhAmludCBzdGQ6Ol9fMjo6X19nZXRfdXBfdG9fbl9kaWdpdHM8Y2hhciwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYsIGludCnsA6ECc3RkOjpfXzI6OnRpbWVfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qLCBjaGFyLCBjaGFyKSBjb25zdO0DxwJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmdldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSosIHdjaGFyX3QgY29uc3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3TuA68Cc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXRfdGltZShzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB1bnNpZ25lZCBpbnQmLCB0bSopIGNvbnN07wOvAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0X2RhdGUoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdPADsgJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX2dldF93ZWVrZGF5KHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TxA8MCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpfX2dldF93ZWVrZGF5bmFtZShpbnQmLCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+IGNvbnN0JikgY29uc3TyA7QCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXRfbW9udGhuYW1lKHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHN0ZDo6X18yOjppb3NfYmFzZSYsIHVuc2lnbmVkIGludCYsIHRtKikgY29uc3TzA8ECc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpfX2dldF9tb250aG5hbWUoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYpIGNvbnN09AOvAnN0ZDo6X18yOjp0aW1lX2dldDx3Y2hhcl90LCBzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fZ2V0X3llYXIoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qKSBjb25zdPUDvAJzdGQ6Ol9fMjo6dGltZV9nZXQ8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46Ol9fZ2V0X3llYXIoaW50Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYpIGNvbnN09gO5AmludCBzdGQ6Ol9fMjo6X19nZXRfdXBfdG9fbl9kaWdpdHM8d2NoYXJfdCwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj4oc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiYsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIHVuc2lnbmVkIGludCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYsIGludCn3A7YCc3RkOjpfXzI6OnRpbWVfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgdG0qLCBjaGFyLCBjaGFyKSBjb25zdPgD3AFzdGQ6Ol9fMjo6dGltZV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCB0bSBjb25zdCosIGNoYXIsIGNoYXIpIGNvbnN0+QNKc3RkOjpfXzI6Ol9fdGltZV9wdXQ6Ol9fZG9fcHV0KGNoYXIqLCBjaGFyKiYsIHRtIGNvbnN0KiwgY2hhciwgY2hhcikgY29uc3T6A+4Bc3RkOjpfXzI6OnRpbWVfcHV0PHdjaGFyX3QsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6Omlvc19iYXNlJiwgd2NoYXJfdCwgdG0gY29uc3QqLCBjaGFyLCBjaGFyKSBjb25zdPsDLHN0ZDo6X18yOjpfX3Rocm93X3J1bnRpbWVfZXJyb3IoY2hhciBjb25zdCop/AM7c3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgZmFsc2U+Ojpkb19kZWNpbWFsX3BvaW50KCkgY29uc3T9AzZzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCBmYWxzZT46OmRvX2dyb3VwaW5nKCkgY29uc3T+AztzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCBmYWxzZT46OmRvX25lZ2F0aXZlX3NpZ24oKSBjb25zdP8DOHN0ZDo6X18yOjptb25leXB1bmN0PGNoYXIsIGZhbHNlPjo6ZG9fcG9zX2Zvcm1hdCgpIGNvbnN0gAQ+c3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgZmFsc2U+Ojpkb19kZWNpbWFsX3BvaW50KCkgY29uc3SBBD5zdGQ6Ol9fMjo6bW9uZXlwdW5jdDx3Y2hhcl90LCBmYWxzZT46OmRvX25lZ2F0aXZlX3NpZ24oKSBjb25zdIIEvwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46OmJhc2ljX3N0cmluZyhzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKYMEpQJzdGQ6Ol9fMjo6bW9uZXlfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBkb3VibGUmKSBjb25zdIQEiANzdGQ6Ol9fMjo6bW9uZXlfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+OjpfX2RvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgYm9vbCwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50JiwgYm9vbCYsIHN0ZDo6X18yOjpjdHlwZTxjaGFyPiBjb25zdCYsIHN0ZDo6X18yOjp1bmlxdWVfcHRyPGNoYXIsIHZvaWQgKCopKHZvaWQqKT4mLCBjaGFyKiYsIGNoYXIqKYUEXXN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj46Om9wZXJhdG9yKytbYWJpOnYxNTAwN10oaW50KYYEZnZvaWQgc3RkOjpfXzI6Ol9fZG91YmxlX29yX25vdGhpbmc8Y2hhcj4oc3RkOjpfXzI6OnVuaXF1ZV9wdHI8Y2hhciwgdm9pZCAoKikodm9pZCopPiYsIGNoYXIqJiwgY2hhciomKYcEhgF2b2lkIHN0ZDo6X18yOjpfX2RvdWJsZV9vcl9ub3RoaW5nPHVuc2lnbmVkIGludD4oc3RkOjpfXzI6OnVuaXF1ZV9wdHI8dW5zaWduZWQgaW50LCB2b2lkICgqKSh2b2lkKik+JiwgdW5zaWduZWQgaW50KiYsIHVuc2lnbmVkIGludComKYgE7gJzdGQ6Ol9fMjo6bW9uZXlfZ2V0PGNoYXIsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+JikgY29uc3SJBJkCc3RkOjpfXzI6OmVuYWJsZV9pZjxfX2lzX2NwcDE3X2ZvcndhcmRfaXRlcmF0b3I8Y2hhcio+Ojp2YWx1ZSwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Jj46OnR5cGUgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjphcHBlbmRbYWJpOnYxNTAwN108Y2hhcio+KGNoYXIqLCBjaGFyKimKBHtzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fc2V0X3NpemVbYWJpOnYxNTAwN10odW5zaWduZWQgbG9uZymLBIIBc3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgdHJ1ZT4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXRbYWJpOnYxNTAwN108c3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgdHJ1ZT4+KHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKYwEhAFzdGQ6Ol9fMjo6bW9uZXlwdW5jdDxjaGFyLCBmYWxzZT4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXRbYWJpOnYxNTAwN108c3RkOjpfXzI6Om1vbmV5cHVuY3Q8Y2hhciwgZmFsc2U+PihzdGQ6Ol9fMjo6bG9jYWxlIGNvbnN0JimNBD9zdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhcio+OjpvcGVyYXRvcitbYWJpOnYxNTAwN10obG9uZykgY29uc3SOBHFzdGQ6Ol9fMjo6dW5pcXVlX3B0cjxjaGFyLCB2b2lkICgqKSh2b2lkKik+OjpvcGVyYXRvcj1bYWJpOnYxNTAwN10oc3RkOjpfXzI6OnVuaXF1ZV9wdHI8Y2hhciwgdm9pZCAoKikodm9pZCopPiYmKY8EugJzdGQ6Ol9fMjo6bW9uZXlfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50JiwgbG9uZyBkb3VibGUmKSBjb25zdJAEqQNzdGQ6Ol9fMjo6bW9uZXlfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+OjpfX2RvX2dldChzdGQ6Ol9fMjo6aXN0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Jiwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiwgYm9vbCwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYsIHVuc2lnbmVkIGludCwgdW5zaWduZWQgaW50JiwgYm9vbCYsIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYsIHN0ZDo6X18yOjp1bmlxdWVfcHRyPHdjaGFyX3QsIHZvaWQgKCopKHZvaWQqKT4mLCB3Y2hhcl90KiYsIHdjaGFyX3QqKZEEY3N0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj46Om9wZXJhdG9yKytbYWJpOnYxNTAwN10oaW50KZIEjANzdGQ6Ol9fMjo6bW9uZXlfZ2V0PHdjaGFyX3QsIHN0ZDo6X18yOjppc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4+Ojpkb19nZXQoc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Piwgc3RkOjpfXzI6OmlzdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgdW5zaWduZWQgaW50Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+JikgY29uc3STBLcCc3RkOjpfXzI6OmVuYWJsZV9pZjxfX2lzX2NwcDE3X2ZvcndhcmRfaXRlcmF0b3I8d2NoYXJfdCo+Ojp2YWx1ZSwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+Jj46OnR5cGUgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjphcHBlbmRbYWJpOnYxNTAwN108d2NoYXJfdCo+KHdjaGFyX3QqLCB3Y2hhcl90KimUBIgBc3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgdHJ1ZT4gY29uc3QmIHN0ZDo6X18yOjp1c2VfZmFjZXRbYWJpOnYxNTAwN108c3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgdHJ1ZT4+KHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmKZUE1QFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj46Om9wZXJhdG9yPVthYmk6djE1MDA3XShzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj4mJimWBIoBc3RkOjpfXzI6Om1vbmV5cHVuY3Q8d2NoYXJfdCwgZmFsc2U+IGNvbnN0JiBzdGQ6Ol9fMjo6dXNlX2ZhY2V0W2FiaTp2MTUwMDddPHN0ZDo6X18yOjptb25leXB1bmN0PHdjaGFyX3QsIGZhbHNlPj4oc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYplwRCc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHdjaGFyX3QqPjo6b3BlcmF0b3IrW2FiaTp2MTUwMDddKGxvbmcpIGNvbnN0mATZAXN0ZDo6X18yOjptb25leV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCBjaGFyLCBsb25nIGRvdWJsZSkgY29uc3SZBIgDc3RkOjpfXzI6Ol9fbW9uZXlfcHV0PGNoYXI+OjpfX2dhdGhlcl9pbmZvKGJvb2wsIGJvb2wsIHN0ZDo6X18yOjpsb2NhbGUgY29uc3QmLCBzdGQ6Ol9fMjo6bW9uZXlfYmFzZTo6cGF0dGVybiYsIGNoYXImLCBjaGFyJiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+JiwgaW50JimaBNYDc3RkOjpfXzI6Ol9fbW9uZXlfcHV0PGNoYXI+OjpfX2Zvcm1hdChjaGFyKiwgY2hhciomLCBjaGFyKiYsIHVuc2lnbmVkIGludCwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj4gY29uc3QmLCBib29sLCBzdGQ6Ol9fMjo6bW9uZXlfYmFzZTo6cGF0dGVybiBjb25zdCYsIGNoYXIsIGNoYXIsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYsIGludCmbBJoBY2hhciogc3RkOjpfXzI6OmNvcHlbYWJpOnYxNTAwN108c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPiwgY2hhcio+KHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIGNoYXIqKZwEqQJzdGQ6Ol9fMjo6bW9uZXlfcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojpkb19wdXQoc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+PiwgYm9vbCwgc3RkOjpfXzI6Omlvc19iYXNlJiwgY2hhciwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JikgY29uc3SdBOsBc3RkOjpfXzI6Om1vbmV5X3B1dDx3Y2hhcl90LCBzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+Pjo6ZG9fcHV0KHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Pj4sIGJvb2wsIHN0ZDo6X18yOjppb3NfYmFzZSYsIHdjaGFyX3QsIGxvbmcgZG91YmxlKSBjb25zdJ4EowNzdGQ6Ol9fMjo6X19tb25leV9wdXQ8d2NoYXJfdD46Ol9fZ2F0aGVyX2luZm8oYm9vbCwgYm9vbCwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYsIHN0ZDo6X18yOjptb25leV9iYXNlOjpwYXR0ZXJuJiwgd2NoYXJfdCYsIHdjaGFyX3QmLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4mLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj4mLCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj4mLCBpbnQmKZ8EgwRzdGQ6Ol9fMjo6X19tb25leV9wdXQ8d2NoYXJfdD46Ol9fZm9ybWF0KHdjaGFyX3QqLCB3Y2hhcl90KiYsIHdjaGFyX3QqJiwgdW5zaWduZWQgaW50LCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90PiBjb25zdCYsIGJvb2wsIHN0ZDo6X18yOjptb25leV9iYXNlOjpwYXR0ZXJuIGNvbnN0Jiwgd2NoYXJfdCwgd2NoYXJfdCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0JiwgaW50KaAErAF3Y2hhcl90KiBzdGQ6Ol9fMjo6Y29weVthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8d2NoYXJfdCBjb25zdCo+LCB3Y2hhcl90Kj4oc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHdjaGFyX3QgY29uc3QqPiwgc3RkOjpfXzI6Ol9fd3JhcF9pdGVyPHdjaGFyX3QgY29uc3QqPiwgd2NoYXJfdCopoQTEAnN0ZDo6X18yOjptb25leV9wdXQ8d2NoYXJfdCwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+Pj46OmRvX3B1dChzdGQ6Ol9fMjo6b3N0cmVhbWJ1Zl9pdGVyYXRvcjx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4+LCBib29sLCBzdGQ6Ol9fMjo6aW9zX2Jhc2UmLCB3Y2hhcl90LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPHdjaGFyX3QsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czx3Y2hhcl90Piwgc3RkOjpfXzI6OmFsbG9jYXRvcjx3Y2hhcl90Pj4gY29uc3QmKSBjb25zdKIEnQFzdGQ6Ol9fMjo6bWVzc2FnZXM8Y2hhcj46OmRvX29wZW4oc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0Jiwgc3RkOjpfXzI6OmxvY2FsZSBjb25zdCYpIGNvbnN0owSTAXN0ZDo6X18yOjptZXNzYWdlczxjaGFyPjo6ZG9fZ2V0KGxvbmcsIGludCwgaW50LCBzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj4gY29uc3QmKSBjb25zdKQEnwFzdGQ6Ol9fMjo6bWVzc2FnZXM8d2NoYXJfdD46OmRvX2dldChsb25nLCBpbnQsIGludCwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+IGNvbnN0JikgY29uc3SlBDlzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46On5jb2RlY3Z0KCmmBC1zdGQ6Ol9fMjo6bG9jYWxlOjpfX2ltcDo6X19pbXAodW5zaWduZWQgbG9uZymnBHxzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+Pjo6fnZlY3RvclthYmk6djE1MDA3XSgpqASIAXN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjpfX2NvbnN0cnVjdF9hdF9lbmQodW5zaWduZWQgbG9uZympBK4Bc3RkOjpfXzI6Ol9fdHJhbnNhY3Rpb248c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Ol9fZGVzdHJveV92ZWN0b3I+Ojp+X190cmFuc2FjdGlvblthYmk6djE1MDA3XSgpqgR8c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Ol9fY2xlYXJbYWJpOnYxNTAwN10oKasEHXN0ZDo6X18yOjpsb2NhbGU6OmlkOjpfX2dldCgprARAc3RkOjpfXzI6OmxvY2FsZTo6X19pbXA6Omluc3RhbGwoc3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBsb25nKa0EkQFzdGQ6Ol9fMjo6dmVjdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0Kiwgc3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+Pjo6X19kZXN0cm95X3ZlY3Rvcjo6b3BlcmF0b3IoKVthYmk6djE1MDA3XSgprgSEAXN0ZDo6X18yOjp1bmlxdWVfcHRyPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0LCBzdGQ6Ol9fMjo6KGFub255bW91cyBuYW1lc3BhY2UpOjpyZWxlYXNlPjo6cmVzZXRbYWJpOnYxNTAwN10oc3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqKa8EIXN0ZDo6X18yOjpsb2NhbGU6Ol9faW1wOjp+X19pbXAoKbAEI3N0ZDo6X18yOjpsb2NhbGU6Ol9faW1wOjp+X19pbXAoKS4xsQR+c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Ol9fYXBwZW5kKHVuc2lnbmVkIGxvbmcpsgQuc3RkOjpfXzI6OmxvY2FsZTo6X19pbXA6Omhhc19mYWNldChsb25nKSBjb25zdLMEGnN0ZDo6X18yOjpsb2NhbGU6OmxvY2FsZSgptAQec3RkOjpfXzI6OmxvY2FsZTo6aWQ6Ol9faW5pdCgptQQrc3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQ6Ol9fb25femVyb19zaGFyZWQoKbYEdHZvaWQgc3RkOjpfXzI6Ol9fY2FsbF9vbmNlX3Byb3h5W2FiaTp2MTUwMDddPHN0ZDo6X18yOjp0dXBsZTxzdGQ6Ol9fMjo6KGFub255bW91cyBuYW1lc3BhY2UpOjpfX2Zha2VfYmluZCYmPj4odm9pZCoptwQ9c3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb19pcyh1bnNpZ25lZCBsb25nLCB3Y2hhcl90KSBjb25zdLgEVXN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9faXMod2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqLCB1bnNpZ25lZCBsb25nKikgY29uc3S5BFlzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3NjYW5faXModW5zaWduZWQgbG9uZywgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqKSBjb25zdLoEWnN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fc2Nhbl9ub3QodW5zaWduZWQgbG9uZywgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqKSBjb25zdLsEM3N0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fdG91cHBlcih3Y2hhcl90KSBjb25zdLwERHN0ZDo6X18yOjpjdHlwZTx3Y2hhcl90Pjo6ZG9fdG91cHBlcih3Y2hhcl90Kiwgd2NoYXJfdCBjb25zdCopIGNvbnN0vQQzc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb190b2xvd2VyKHdjaGFyX3QpIGNvbnN0vgREc3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb190b2xvd2VyKHdjaGFyX3QqLCB3Y2hhcl90IGNvbnN0KikgY29uc3S/BExzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX3dpZGVuKGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0Kiwgd2NoYXJfdCopIGNvbnN0wAQ4c3RkOjpfXzI6OmN0eXBlPHdjaGFyX3Q+Ojpkb19uYXJyb3cod2NoYXJfdCwgY2hhcikgY29uc3TBBFZzdGQ6Ol9fMjo6Y3R5cGU8d2NoYXJfdD46OmRvX25hcnJvdyh3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIGNoYXIsIGNoYXIqKSBjb25zdMIEH3N0ZDo6X18yOjpjdHlwZTxjaGFyPjo6fmN0eXBlKCnDBCFzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46On5jdHlwZSgpLjHEBC1zdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX3RvdXBwZXIoY2hhcikgY29uc3TFBDtzdGQ6Ol9fMjo6Y3R5cGU8Y2hhcj46OmRvX3RvdXBwZXIoY2hhciosIGNoYXIgY29uc3QqKSBjb25zdMYELXN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fdG9sb3dlcihjaGFyKSBjb25zdMcEO3N0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fdG9sb3dlcihjaGFyKiwgY2hhciBjb25zdCopIGNvbnN0yARGc3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojpkb193aWRlbihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIqKSBjb25zdMkEMnN0ZDo6X18yOjpjdHlwZTxjaGFyPjo6ZG9fbmFycm93KGNoYXIsIGNoYXIpIGNvbnN0ygRNc3RkOjpfXzI6OmN0eXBlPGNoYXI+Ojpkb19uYXJyb3coY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyLCBjaGFyKikgY29uc3TLBIQBc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhciwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19vdXQoX19tYnN0YXRlX3QmLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqJiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN0zARgc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhciwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb191bnNoaWZ0KF9fbWJzdGF0ZV90JiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN0zQRyc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhciwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19sZW5ndGgoX19tYnN0YXRlX3QmLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIHVuc2lnbmVkIGxvbmcpIGNvbnN0zgQ7c3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojp+Y29kZWN2dCgpLjHPBJABc3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19vdXQoX19tYnN0YXRlX3QmLCB3Y2hhcl90IGNvbnN0Kiwgd2NoYXJfdCBjb25zdCosIHdjaGFyX3QgY29uc3QqJiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN00ARYc3RkOjpfXzI6Ol9fbGliY3BwX3djcnRvbWJfbFthYmk6djE1MDA3XShjaGFyKiwgd2NoYXJfdCwgX19tYnN0YXRlX3QqLCBfX2xvY2FsZV9zdHJ1Y3QqKdEEjwFzdGQ6Ol9fMjo6Y29kZWN2dDx3Y2hhcl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2luKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIHdjaGFyX3QqLCB3Y2hhcl90Kiwgd2NoYXJfdComKSBjb25zdNIEbnN0ZDo6X18yOjpfX2xpYmNwcF9tYnJ0b3djX2xbYWJpOnYxNTAwN10od2NoYXJfdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nLCBfX21ic3RhdGVfdCosIF9fbG9jYWxlX3N0cnVjdCop0wRjc3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb191bnNoaWZ0KF9fbWJzdGF0ZV90JiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN01ARCc3RkOjpfXzI6OmNvZGVjdnQ8d2NoYXJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19lbmNvZGluZygpIGNvbnN01QQ9c3RkOjpfXzI6Ol9fbGliY3BwX21iX2N1cl9tYXhfbFthYmk6djE1MDA3XShfX2xvY2FsZV9zdHJ1Y3QqKdYEdXN0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fbGVuZ3RoKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKSBjb25zdNcERHN0ZDo6X18yOjpjb2RlY3Z0PHdjaGFyX3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fbWF4X2xlbmd0aCgpIGNvbnN02ASUAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX291dChfX21ic3RhdGVfdCYsIGNoYXIxNl90IGNvbnN0KiwgY2hhcjE2X3QgY29uc3QqLCBjaGFyMTZfdCBjb25zdComLCBjaGFyKiwgY2hhciosIGNoYXIqJikgY29uc3TZBJMBc3RkOjpfXzI6OmNvZGVjdnQ8Y2hhcjE2X3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9faW4oX19tYnN0YXRlX3QmLCBjaGFyIGNvbnN0KiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqJiwgY2hhcjE2X3QqLCBjaGFyMTZfdCosIGNoYXIxNl90KiYpIGNvbnN02gR2c3RkOjpfXzI6OmNvZGVjdnQ8Y2hhcjE2X3QsIGNoYXIsIF9fbWJzdGF0ZV90Pjo6ZG9fbGVuZ3RoKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKSBjb25zdNsERXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIxNl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX21heF9sZW5ndGgoKSBjb25zdNwElAFzdGQ6Ol9fMjo6Y29kZWN2dDxjaGFyMzJfdCwgY2hhciwgX19tYnN0YXRlX3Q+Ojpkb19vdXQoX19tYnN0YXRlX3QmLCBjaGFyMzJfdCBjb25zdCosIGNoYXIzMl90IGNvbnN0KiwgY2hhcjMyX3QgY29uc3QqJiwgY2hhciosIGNoYXIqLCBjaGFyKiYpIGNvbnN03QSTAXN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIzMl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2luKF9fbWJzdGF0ZV90JiwgY2hhciBjb25zdCosIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiYsIGNoYXIzMl90KiwgY2hhcjMyX3QqLCBjaGFyMzJfdComKSBjb25zdN4EdnN0ZDo6X18yOjpjb2RlY3Z0PGNoYXIzMl90LCBjaGFyLCBfX21ic3RhdGVfdD46OmRvX2xlbmd0aChfX21ic3RhdGVfdCYsIGNoYXIgY29uc3QqLCBjaGFyIGNvbnN0KiwgdW5zaWduZWQgbG9uZykgY29uc3TfBCVzdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46On5udW1wdW5jdCgp4AQnc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojp+bnVtcHVuY3QoKS4x4QQoc3RkOjpfXzI6Om51bXB1bmN0PHdjaGFyX3Q+Ojp+bnVtcHVuY3QoKeIEKnN0ZDo6X18yOjpudW1wdW5jdDx3Y2hhcl90Pjo6fm51bXB1bmN0KCkuMeMEMnN0ZDo6X18yOjpudW1wdW5jdDxjaGFyPjo6ZG9fZGVjaW1hbF9wb2ludCgpIGNvbnN05AQyc3RkOjpfXzI6Om51bXB1bmN0PGNoYXI+Ojpkb190aG91c2FuZHNfc2VwKCkgY29uc3TlBC1zdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46OmRvX2dyb3VwaW5nKCkgY29uc3TmBDBzdGQ6Ol9fMjo6bnVtcHVuY3Q8d2NoYXJfdD46OmRvX2dyb3VwaW5nKCkgY29uc3TnBC1zdGQ6Ol9fMjo6bnVtcHVuY3Q8Y2hhcj46OmRvX3RydWVuYW1lKCkgY29uc3ToBDBzdGQ6Ol9fMjo6bnVtcHVuY3Q8d2NoYXJfdD46OmRvX3RydWVuYW1lKCkgY29uc3TpBJcBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjpiYXNpY19zdHJpbmdbYWJpOnYxNTAwN108c3RkOjpudWxscHRyX3Q+KHdjaGFyX3QgY29uc3QqKeoELnN0ZDo6X18yOjpudW1wdW5jdDxjaGFyPjo6ZG9fZmFsc2VuYW1lKCkgY29uc3TrBDFzdGQ6Ol9fMjo6bnVtcHVuY3Q8d2NoYXJfdD46OmRvX2ZhbHNlbmFtZSgpIGNvbnN07AR4c3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjpvcGVyYXRvcj1bYWJpOnYxNTAwN10oY2hhciBjb25zdCop7QQ1c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX3dlZWtzKCkgY29uc3TuBBpfX2N4eF9nbG9iYWxfYXJyYXlfZHRvci41N+8EOHN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTx3Y2hhcl90Pjo6X193ZWVrcygpIGNvbnN08AQaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuNzLxBIQBc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjpvcGVyYXRvcj1bYWJpOnYxNTAwN10od2NoYXJfdCBjb25zdCop8gQ2c3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX21vbnRocygpIGNvbnN08wQaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuODf0BDlzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fbW9udGhzKCkgY29uc3T1BBtfX2N4eF9nbG9iYWxfYXJyYXlfZHRvci4xMTH2BDVzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fYW1fcG0oKSBjb25zdPcEG19fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjEzNfgEOHN0ZDo6X18yOjpfX3RpbWVfZ2V0X2Nfc3RvcmFnZTx3Y2hhcl90Pjo6X19hbV9wbSgpIGNvbnN0+QQbX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMTM4+gQxc3RkOjpfXzI6Ol9fdGltZV9nZXRfY19zdG9yYWdlPGNoYXI+OjpfX3goKSBjb25zdPsEGV9fY3h4X2dsb2JhbF9hcnJheV9kdG9yLjL8BDRzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9feCgpIGNvbnN0/QQaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMzL+BDFzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fWCgpIGNvbnN0/wQaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMzSABTRzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fWCgpIGNvbnN0gQUaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMzaCBTFzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fYygpIGNvbnN0gwUaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuMziEBTRzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fYygpIGNvbnN0hQUaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuNDCGBTFzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8Y2hhcj46Ol9fcigpIGNvbnN0hwUaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuNDKIBTRzdGQ6Ol9fMjo6X190aW1lX2dldF9jX3N0b3JhZ2U8d2NoYXJfdD46Ol9fcigpIGNvbnN0iQUaX19jeHhfZ2xvYmFsX2FycmF5X2R0b3IuNDSKBXNzdGQ6Ol9fMjo6dGltZV9wdXQ8Y2hhciwgc3RkOjpfXzI6Om9zdHJlYW1idWZfaXRlcmF0b3I8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+Pj46On50aW1lX3B1dFthYmk6djE1MDA3XSgpiwV1c3RkOjpfXzI6OnRpbWVfcHV0PGNoYXIsIHN0ZDo6X18yOjpvc3RyZWFtYnVmX2l0ZXJhdG9yPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPj4+Ojp+dGltZV9wdXRbYWJpOnYxNTAwN10oKS4xjAXWAXN0ZDo6X18yOjpfX2FsbG9jYXRpb25fcmVzdWx0PHN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+Ojpwb2ludGVyPiBzdGQ6Ol9fMjo6X19hbGxvY2F0ZV9hdF9sZWFzdFthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+PihzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+JiwgdW5zaWduZWQgbG9uZymNBUFzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+OjphbGxvY2F0ZVthYmk6djE1MDA3XSh1bnNpZ25lZCBsb25nKY4FiwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fbnVsbF90ZXJtaW5hdGVfYXRbYWJpOnYxNTAwN10oY2hhciosIHVuc2lnbmVkIGxvbmcpjwWIAXN0ZDo6X18yOjphbGxvY2F0b3JfdHJhaXRzPHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjpkZWFsbG9jYXRlW2FiaTp2MTUwMDddKHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4mLCB3Y2hhcl90KiwgdW5zaWduZWQgbG9uZymQBU1zdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+OjpkZWFsbG9jYXRlW2FiaTp2MTUwMDddKHdjaGFyX3QqLCB1bnNpZ25lZCBsb25nKZEFuQFhdXRvIHN0ZDo6X18yOjpfX3Vud3JhcF9yYW5nZVthYmk6djE1MDA3XTxzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCBzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+PihzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+LCBzdGQ6Ol9fMjo6X193cmFwX2l0ZXI8Y2hhciBjb25zdCo+KZIFxQJkZWNsdHlwZShzdGQ6Ol9fMjo6X191bndyYXBfaXRlcl9pbXBsPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIHRydWU+OjpfX3Vud3JhcChzdGQ6OmRlY2x2YWw8c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPj4oKSkpIHN0ZDo6X18yOjpfX3Vud3JhcF9pdGVyW2FiaTp2MTUwMDddPHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4sIHN0ZDo6X18yOjpfX3Vud3JhcF9pdGVyX2ltcGw8c3RkOjpfXzI6Ol9fd3JhcF9pdGVyPGNoYXIgY29uc3QqPiwgdHJ1ZT4sIDA+KHN0ZDo6X18yOjpfX3dyYXBfaXRlcjxjaGFyIGNvbnN0Kj4pkwV3c3RkOjpfXzI6OnZlY3RvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPj46Om1heF9zaXplKCkgY29uc3SUBa0Cc3RkOjpfXzI6Ol9fYWxsb2NhdGlvbl9yZXN1bHQ8c3RkOjpfXzI6OmFsbG9jYXRvcl90cmFpdHM8c3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+Pjo6cG9pbnRlcj4gc3RkOjpfXzI6Ol9fYWxsb2NhdGVfYXRfbGVhc3RbYWJpOnYxNTAwN108c3RkOjpfXzI6Ol9fc3NvX2FsbG9jYXRvcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIDMwdWw+PihzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4mLCB1bnNpZ25lZCBsb25nKZUF0wFzdGQ6Ol9fMjo6YWxsb2NhdG9yX3RyYWl0czxzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjpkZWFsbG9jYXRlW2FiaTp2MTUwMDddKHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPiYsIHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiosIHVuc2lnbmVkIGxvbmcplgWkAXN0ZDo6X18yOjp2ZWN0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCBzdGQ6Ol9fMjo6X19zc29fYWxsb2NhdG9yPHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KiwgMzB1bD4+OjpfX2Jhc2VfZGVzdHJ1Y3RfYXRfZW5kW2FiaTp2MTUwMDddKHN0ZDo6X18yOjpsb2NhbGU6OmZhY2V0KioplwWBAXN0ZDo6X18yOjpfX3NwbGl0X2J1ZmZlcjxzdGQ6Ol9fMjo6bG9jYWxlOjpmYWNldCosIHN0ZDo6X18yOjpfX3Nzb19hbGxvY2F0b3I8c3RkOjpfXzI6OmxvY2FsZTo6ZmFjZXQqLCAzMHVsPiY+Ojp+X19zcGxpdF9idWZmZXIoKZgFN3N0ZDo6X18yOjpfX3Rocm93X291dF9vZl9yYW5nZVthYmk6djE1MDA3XShjaGFyIGNvbnN0KimZBS5zdGQ6Ol9fMjo6X190aW1lX3B1dDo6X190aW1lX3B1dFthYmk6djE1MDA3XSgpmgUJc3RydG9sbF9smwUKc3RydG91bGxfbJwFLXN0ZDo6X18yOjpfX3NoYXJlZF9jb3VudDo6fl9fc2hhcmVkX2NvdW50KCkuMZ0FGHN0ZDo6X190aHJvd19iYWRfYWxsb2MoKZ4FG29wZXJhdG9yIG5ldyh1bnNpZ25lZCBsb25nKZ8FSnN0ZDo6X18yOjpfX2xpYmNwcF9hbGlnbmVkX2FsbG9jW2FiaTp2MTUwMDddKHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcpoAV6c3RkOjpsb2dpY19lcnJvcjo6bG9naWNfZXJyb3Ioc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+IGNvbnN0JimhBT1zdGQ6Ol9fMjo6X19saWJjcHBfcmVmc3RyaW5nOjpfX2xpYmNwcF9yZWZzdHJpbmcoY2hhciBjb25zdCopogUqc3RkOjpsb2dpY19lcnJvcjo6bG9naWNfZXJyb3IoY2hhciBjb25zdCopowV+c3RkOjpydW50aW1lX2Vycm9yOjpydW50aW1lX2Vycm9yKHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+PiBjb25zdCYppAUuc3RkOjpydW50aW1lX2Vycm9yOjpydW50aW1lX2Vycm9yKGNoYXIgY29uc3QqKaUFCl9fb3ZlcmZsb3emBURzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj46Om1vdmUoY2hhciosIGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKacF0gFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fZ3Jvd19ieV9hbmRfcmVwbGFjZSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCBjaGFyIGNvbnN0KimoBWVzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46On5iYXNpY19zdHJpbmcoKakFuQFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fZ3Jvd19ieSh1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nLCB1bnNpZ25lZCBsb25nKaoFP3N0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPjo6YXNzaWduKGNoYXIqLCB1bnNpZ25lZCBsb25nLCBjaGFyKasFgwFzdGQ6Ol9fMjo6YmFzaWNfc3RyaW5nPGNoYXIsIHN0ZDo6X18yOjpjaGFyX3RyYWl0czxjaGFyPiwgc3RkOjpfXzI6OmFsbG9jYXRvcjxjaGFyPj46Ol9fYXNzaWduX2V4dGVybmFsKGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKawFeHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6YXBwZW5kKGNoYXIgY29uc3QqLCB1bnNpZ25lZCBsb25nKa0FeHN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6aW5zZXJ0KHVuc2lnbmVkIGxvbmcsIGNoYXIgY29uc3QqKa4FZXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8Y2hhciwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPGNoYXI+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPGNoYXI+Pjo6cHVzaF9iYWNrKGNoYXIprwVpc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+OjphcHBlbmQoY2hhciBjb25zdCopsAXeAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6X19ncm93X2J5X2FuZF9yZXBsYWNlKHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHdjaGFyX3QgY29uc3QqKbEFbnN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6fmJhc2ljX3N0cmluZygpsgXCAXN0ZDo6X18yOjpiYXNpY19zdHJpbmc8d2NoYXJfdCwgc3RkOjpfXzI6OmNoYXJfdHJhaXRzPHdjaGFyX3Q+LCBzdGQ6Ol9fMjo6YWxsb2NhdG9yPHdjaGFyX3Q+Pjo6X19ncm93X2J5KHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcsIHVuc2lnbmVkIGxvbmcpswVxc3RkOjpfXzI6OmJhc2ljX3N0cmluZzx3Y2hhcl90LCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8d2NoYXJfdD4sIHN0ZDo6X18yOjphbGxvY2F0b3I8d2NoYXJfdD4+OjpwdXNoX2JhY2sod2NoYXJfdCm0BSFzdGQ6Ol9fMjo6dG9fc3RyaW5nKHVuc2lnbmVkIGludCm1BTxzdGQ6Ol9fMjo6X19pdG9hOjpfX2FwcGVuZDJbYWJpOnYxNTAwN10oY2hhciosIHVuc2lnbmVkIGludCm2BTxzdGQ6Ol9fMjo6X19pdG9hOjpfX2FwcGVuZDRbYWJpOnYxNTAwN10oY2hhciosIHVuc2lnbmVkIGludCm3BTxzdGQ6Ol9fMjo6X19pdG9hOjpfX2FwcGVuZDZbYWJpOnYxNTAwN10oY2hhciosIHVuc2lnbmVkIGludCm4BTxzdGQ6Ol9fMjo6X19pdG9hOjpfX2FwcGVuZDhbYWJpOnYxNTAwN10oY2hhciosIHVuc2lnbmVkIGludCm5BTxzdGQ6Ol9fMjo6ZXJyb3JfY2F0ZWdvcnk6OmRlZmF1bHRfZXJyb3JfY29uZGl0aW9uKGludCkgY29uc3S6BVFzdGQ6Ol9fMjo6ZXJyb3JfY2F0ZWdvcnk6OmVxdWl2YWxlbnQoaW50LCBzdGQ6Ol9fMjo6ZXJyb3JfY29uZGl0aW9uIGNvbnN0JikgY29uc3S7BUxzdGQ6Ol9fMjo6ZXJyb3JfY2F0ZWdvcnk6OmVxdWl2YWxlbnQoc3RkOjpfXzI6OmVycm9yX2NvZGUgY29uc3QmLCBpbnQpIGNvbnN0vAUqc3RkOjpfXzI6Ol9fZG9fbWVzc2FnZTo6bWVzc2FnZShpbnQpIGNvbnN0vQUwc3RkOjpfXzI6Ol9fZ2VuZXJpY19lcnJvcl9jYXRlZ29yeTo6bmFtZSgpIGNvbnN0vgU2c3RkOjpfXzI6Ol9fZ2VuZXJpY19lcnJvcl9jYXRlZ29yeTo6bWVzc2FnZShpbnQpIGNvbnN0vwUvc3RkOjpfXzI6Ol9fc3lzdGVtX2Vycm9yX2NhdGVnb3J5OjpuYW1lKCkgY29uc3TABUVzdGQ6Ol9fMjo6X19zeXN0ZW1fZXJyb3JfY2F0ZWdvcnk6OmRlZmF1bHRfZXJyb3JfY29uZGl0aW9uKGludCkgY29uc3TBBZEBc3RkOjpfXzI6OnN5c3RlbV9lcnJvcjo6X19pbml0KHN0ZDo6X18yOjplcnJvcl9jb2RlIGNvbnN0Jiwgc3RkOjpfXzI6OmJhc2ljX3N0cmluZzxjaGFyLCBzdGQ6Ol9fMjo6Y2hhcl90cmFpdHM8Y2hhcj4sIHN0ZDo6X18yOjphbGxvY2F0b3I8Y2hhcj4+KcIFR3N0ZDo6X18yOjpzeXN0ZW1fZXJyb3I6OnN5c3RlbV9lcnJvcihzdGQ6Ol9fMjo6ZXJyb3JfY29kZSwgY2hhciBjb25zdCopwwUYX19jeGFfYWxsb2NhdGVfZXhjZXB0aW9uxAUUX19jeGFfZnJlZV9leGNlcHRpb27FBQtfX2N4YV90aHJvd8YFS19fY3h4YWJpdjE6OmV4Y2VwdGlvbl9jbGVhbnVwX2Z1bmMoX1Vud2luZF9SZWFzb25fQ29kZSwgX1Vud2luZF9FeGNlcHRpb24qKccFIl9fY3hhX2RlY3JlbWVudF9leGNlcHRpb25fcmVmY291bnTIBRFfX2N4YV9iZWdpbl9jYXRjaMkFD19fY3hhX2VuZF9jYXRjaMoFDV9fY3hhX3JldGhyb3fLBSJfX2N4YV9pbmNyZW1lbnRfZXhjZXB0aW9uX3JlZmNvdW50zAUNYWJvcnRfbWVzc2FnZc0FHmRlbWFuZ2xpbmdfdGVybWluYXRlX2hhbmRsZXIoKc4FH2RlbWFuZ2xpbmdfdW5leHBlY3RlZF9oYW5kbGVyKCnPBRBzdGQ6OnRlcm1pbmF0ZSgp0AUcc3RkOjpfX3Rlcm1pbmF0ZSh2b2lkICgqKSgpKdEFEl9fY3hhX3B1cmVfdmlydHVhbNIFL19fY3h4YWJpdjE6Ol9fYWxpZ25lZF9mcmVlX3dpdGhfZmFsbGJhY2sodm9pZCop0wVhX19jeHhhYml2MTo6X19mdW5kYW1lbnRhbF90eXBlX2luZm86OmNhbl9jYXRjaChfX2N4eGFiaXYxOjpfX3NoaW1fdHlwZV9pbmZvIGNvbnN0Kiwgdm9pZComKSBjb25zdNQFPGlzX2VxdWFsKHN0ZDo6dHlwZV9pbmZvIGNvbnN0Kiwgc3RkOjp0eXBlX2luZm8gY29uc3QqLCBib29sKdUFW19fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpjYW5fY2F0Y2goX19jeHhhYml2MTo6X19zaGltX3R5cGVfaW5mbyBjb25zdCosIHZvaWQqJikgY29uc3TWBQ5fX2R5bmFtaWNfY2FzdNcFa19fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpwcm9jZXNzX2ZvdW5kX2Jhc2VfY2xhc3MoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQqLCBpbnQpIGNvbnN02AVuX19jeHhhYml2MTo6X19jbGFzc190eXBlX2luZm86Omhhc191bmFtYmlndW91c19wdWJsaWNfYmFzZShfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCosIGludCkgY29uc3TZBXFfX2N4eGFiaXYxOjpfX3NpX2NsYXNzX3R5cGVfaW5mbzo6aGFzX3VuYW1iaWd1b3VzX3B1YmxpY19iYXNlKF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkKiwgaW50KSBjb25zdNoFc19fY3h4YWJpdjE6Ol9fYmFzZV9jbGFzc190eXBlX2luZm86Omhhc191bmFtYmlndW91c19wdWJsaWNfYmFzZShfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCosIGludCkgY29uc3TbBXJfX2N4eGFiaXYxOjpfX3ZtaV9jbGFzc190eXBlX2luZm86Omhhc191bmFtYmlndW91c19wdWJsaWNfYmFzZShfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCosIGludCkgY29uc3TcBV1fX2N4eGFiaXYxOjpfX3BvaW50ZXJfdHlwZV9pbmZvOjpjYW5fY2F0Y2goX19jeHhhYml2MTo6X19zaGltX3R5cGVfaW5mbyBjb25zdCosIHZvaWQqJikgY29uc3TdBWZfX2N4eGFiaXYxOjpfX3BvaW50ZXJfdG9fbWVtYmVyX3R5cGVfaW5mbzo6Y2FuX2NhdGNoX25lc3RlZChfX2N4eGFiaXYxOjpfX3NoaW1fdHlwZV9pbmZvIGNvbnN0KikgY29uc3TeBYMBX19jeHhhYml2MTo6X19jbGFzc190eXBlX2luZm86OnByb2Nlc3Nfc3RhdGljX3R5cGVfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCkgY29uc3TfBXNfX2N4eGFiaXYxOjpfX3ZtaV9jbGFzc190eXBlX2luZm86OnNlYXJjaF9iZWxvd19kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN04AWBAV9fY3h4YWJpdjE6Ol9fYmFzZV9jbGFzc190eXBlX2luZm86OnNlYXJjaF9hYm92ZV9kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdOEFdF9fY3h4YWJpdjE6Ol9fYmFzZV9jbGFzc190eXBlX2luZm86OnNlYXJjaF9iZWxvd19kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN04gVyX19jeHhhYml2MTo6X19zaV9jbGFzc190eXBlX2luZm86OnNlYXJjaF9iZWxvd19kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN04wVvX19jeHhhYml2MTo6X19jbGFzc190eXBlX2luZm86OnNlYXJjaF9iZWxvd19kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN05AWAAV9fY3h4YWJpdjE6Ol9fdm1pX2NsYXNzX3R5cGVfaW5mbzo6c2VhcmNoX2Fib3ZlX2RzdChfX2N4eGFiaXYxOjpfX2R5bmFtaWNfY2FzdF9pbmZvKiwgdm9pZCBjb25zdCosIHZvaWQgY29uc3QqLCBpbnQsIGJvb2wpIGNvbnN05QV/X19jeHhhYml2MTo6X19zaV9jbGFzc190eXBlX2luZm86OnNlYXJjaF9hYm92ZV9kc3QoX19jeHhhYml2MTo6X19keW5hbWljX2Nhc3RfaW5mbyosIHZvaWQgY29uc3QqLCB2b2lkIGNvbnN0KiwgaW50LCBib29sKSBjb25zdOYFfF9fY3h4YWJpdjE6Ol9fY2xhc3NfdHlwZV9pbmZvOjpzZWFyY2hfYWJvdmVfZHN0KF9fY3h4YWJpdjE6Ol9fZHluYW1pY19jYXN0X2luZm8qLCB2b2lkIGNvbnN0Kiwgdm9pZCBjb25zdCosIGludCwgYm9vbCkgY29uc3TnBRxzdGQ6OmV4Y2VwdGlvbjo6d2hhdCgpIGNvbnN06AUcc3RkOjpiYWRfYWxsb2M6OndoYXQoKSBjb25zdOkFJ3N0ZDo6YmFkX2FycmF5X25ld19sZW5ndGg6OndoYXQoKSBjb25zdOoFIHN0ZDo6bG9naWNfZXJyb3I6On5sb2dpY19lcnJvcigp6wUzc3RkOjpfXzI6Ol9fbGliY3BwX3JlZnN0cmluZzo6fl9fbGliY3BwX3JlZnN0cmluZygp7AUic3RkOjpsb2dpY19lcnJvcjo6fmxvZ2ljX2Vycm9yKCkuMe0FJHN0ZDo6cnVudGltZV9lcnJvcjo6fnJ1bnRpbWVfZXJyb3IoKe4FG3N0ZDo6YmFkX2Nhc3Q6OndoYXQoKSBjb25zdO8FU19fY3h4YWJpdjE6OnJlYWRFbmNvZGVkUG9pbnRlcih1bnNpZ25lZCBjaGFyIGNvbnN0KiosIHVuc2lnbmVkIGNoYXIsIHVuc2lnbmVkIGxvbmcp8AUuX19jeHhhYml2MTo6cmVhZFVMRUIxMjgodW5zaWduZWQgY2hhciBjb25zdCoqKfEFLl9fY3h4YWJpdjE6OnJlYWRTTEVCMTI4KHVuc2lnbmVkIGNoYXIgY29uc3QqKinyBYABX19jeHhhYml2MTo6Z2V0X3NoaW1fdHlwZV9pbmZvKHVuc2lnbmVkIGxvbmcgbG9uZywgdW5zaWduZWQgY2hhciBjb25zdCosIHVuc2lnbmVkIGNoYXIsIGJvb2wsIF9VbndpbmRfRXhjZXB0aW9uKiwgdW5zaWduZWQgbG9uZynzBTRfX2N4eGFiaXYxOjpjYWxsX3Rlcm1pbmF0ZShib29sLCBfVW53aW5kX0V4Y2VwdGlvbiop9AUXX1Vud2luZF9DYWxsUGVyc29uYWxpdHn1BRVlbXNjcmlwdGVuX3N0YWNrX2luaXT2BRllbXNjcmlwdGVuX3N0YWNrX2dldF9mcmVl9wUZZW1zY3JpcHRlbl9zdGFja19nZXRfYmFzZfgFGGVtc2NyaXB0ZW5fc3RhY2tfZ2V0X2VuZPkFDl9fY3hhX2RlbWFuZ2xl+gXlAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46On5BYnN0cmFjdE1hbmdsaW5nUGFyc2VyKCn7BUcoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlcjo6b3BlcmF0b3IrPShjaGFyKfwFTChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldzo6U3RyaW5nVmlldyhjaGFyIGNvbnN0Kin9BYoCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6Y29uc3VtZUlmKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldyn+BdsBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VFbmNvZGluZygp/wXbAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OmNvbnN1bWVJZihjaGFyKYAG3QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZU51bWJlcihib29sKYEGwQMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTcGVjaWFsTmFtZSwgY2hhciBjb25zdCAoJikgWzM0XSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiY+KGNoYXIgY29uc3QgKCYpIFszNF0sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKYIG1wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVR5cGUoKYMGSihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyOjpncm93KHVuc2lnbmVkIGxvbmcphAaTAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2UqLCA0dWw+Ojp+UE9EU21hbGxWZWN0b3IoKYUGfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgMzJ1bD46OlBPRFNtYWxsVmVjdG9yKCmGBn4oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD46OlBPRFNtYWxsVmVjdG9yKCmHBr0BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qLCA0dWw+OjpQT0RTbWFsbFZlY3RvcigpiAZ6KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3OjpzdGFydHNXaXRoKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldykgY29uc3SJBq0DKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VOYW1lKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Ok5hbWVTdGF0ZSopigb7AShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRW5jb2RpbmcoKTo6J2xhbWJkYScoKTo6b3BlcmF0b3IoKSgpIGNvbnN0iwbeAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlVGVtcGxhdGVBcmcoKYwGrwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDMydWw+OjpwdXNoX2JhY2soKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiBjb25zdCYpjQbvAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBvcFRyYWlsaW5nTm9kZUFycmF5KHVuc2lnbmVkIGxvbmcpjgasByhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uRW5jb2RpbmcsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlQXJyYXksIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxpZmllcnMmLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uUmVmUXVhbCY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlQXJyYXkmJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbGlmaWVycyYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25SZWZRdWFsJimPBoYCKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VFbmNvZGluZygpOjpTYXZlVGVtcGxhdGVQYXJhbXM6On5TYXZlVGVtcGxhdGVQYXJhbXMoKZAG2gIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOYW1lVHlwZSwgY2hhciBjb25zdCAoJikgWzVdPihjaGFyIGNvbnN0ICgmKSBbNV0pkQbhAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlQmFyZVNvdXJjZU5hbWUoKZIGngMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOYW1lVHlwZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3Jj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3JimTBtcBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VFeHByKCmUBtsBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VEZWNsdHlwZSgplQaiAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2tFeHBhbnNpb24sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJimWBuABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VUZW1wbGF0ZVBhcmFtKCmXBuMBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VUZW1wbGF0ZUFyZ3MoYm9vbCmYBoIEKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVdpdGhUZW1wbGF0ZUFyZ3MsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKZkGiwQoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpSZWZlcmVuY2VUeXBlLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpSZWZlcmVuY2VLaW5kPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpSZWZlcmVuY2VLaW5kJiYpmga8Ayhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlVW5zY29wZWROYW1lKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Ok5hbWVTdGF0ZSosIGJvb2wqKZsG4AEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVF1YWxpZmllZFR5cGUoKZwG5QIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPiosIDR1bD46Om9wZXJhdG9yPSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPiosIDR1bD4mJimdBucBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+OjpvcGVyYXRvcj0oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+JiYpngbdAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlQ2FsbE9mZnNldCgpnwbmAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlU2VxSWQodW5zaWduZWQgbG9uZyopoAaVAihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlTW9kdWxlTmFtZU9wdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1vZHVsZU5hbWUqJimhBpsBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZSosIDR1bD46Om9wZXJhdG9yW10odW5zaWduZWQgbG9uZymiBpkBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZSosIDR1bD46OmRyb3BCYWNrKHVuc2lnbmVkIGxvbmcpowbeAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlRXhwclByaW1hcnkoKaQGuQUoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qKiBzdGQ6Ol9fMjo6Y29weVthYmk6djE1MDA3XTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qKiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+Kio+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiwgOHVsPioqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBPRFNtYWxsVmVjdG9yPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSosIDh1bD4qKiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+KioppQazAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlU291cmNlTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqKaYGRChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6QnVtcFBvaW50ZXJBbGxvY2F0b3I6OmFsbG9jYXRlKHVuc2lnbmVkIGxvbmcppwasAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3BlY2lhbE5hbWU6OlNwZWNpYWxOYW1lKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldywgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlIGNvbnN0KimoBr8CKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpOb2RlKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6S2luZCwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpQcmVjLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OkNhY2hlLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OkNhY2hlLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OkNhY2hlKakGfShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3BlY2lhbE5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0qgZ2KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXI6Om9wZXJhdG9yKz0oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3KasGQihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6Z2V0QmFzZU5hbWUoKSBjb25zdKwGhwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkN0b3JWdGFibGVTcGVjaWFsTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3StBvABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VQb3NpdGl2ZUludGVnZXIodW5zaWduZWQgbG9uZyoprgZwKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOYW1lVHlwZTo6TmFtZVR5cGUoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3Ka8Geihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0sAZGKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOYW1lVHlwZTo6Z2V0QmFzZU5hbWUoKSBjb25zdLEGfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TW9kdWxlTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SyBt8BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VDVlF1YWxpZmllcnMoKbMG3wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVN1YnN0aXR1dGlvbigptAZ5KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCAzMnVsPjo6cG9wX2JhY2soKbUGngQoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVVucXVhbGlmaWVkTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1vZHVsZU5hbWUqKbYGVihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6cGFyc2VfZGlzY3JpbWluYXRvcihjaGFyIGNvbnN0KiwgY2hhciBjb25zdCoptwb3Ayhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkxvY2FsTmFtZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYpuAazAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UE9EU21hbGxWZWN0b3I8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQT0RTbWFsbFZlY3RvcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqLCA4dWw+KiwgNHVsPjo6YmFjaygpuQaIAihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlQWJpVGFncygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqKboGuAMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVVubmFtZWRUeXBlTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqKbsGtQMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZU9wZXJhdG9yTmFtZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpOYW1lU3RhdGUqKbwGigIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6Ok5vZGUoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpLaW5kLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OkNhY2hlLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OkNhY2hlLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OkNhY2hlKb0GlAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZTo6aGFzUkhTQ29tcG9uZW50U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0vgZ8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpoYXNSSFNDb21wb25lbnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdL8GjQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZvcndhcmRUZW1wbGF0ZVJlZmVyZW5jZTo6aGFzQXJyYXlTbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TABpABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2U6Omhhc0Z1bmN0aW9uU2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wQaOAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlOjpnZXRTeW50YXhOb2RlKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TCBooBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb3J3YXJkVGVtcGxhdGVSZWZlcmVuY2U6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wwaLAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Rm9yd2FyZFRlbXBsYXRlUmVmZXJlbmNlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TEBuMBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VPcGVyYXRvckVuY29kaW5nKCnFBusBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6T3BlcmF0b3JJbmZvOjpnZXRTeW1ib2woKSBjb25zdMYGxQIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZVByZWZpeEV4cHIoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OlByZWMpxwbqBChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNhbGxFeHByLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlQXJyYXksIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6UHJlYz4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZUFycmF5JiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6UHJlYyYmKcgG4AEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUZ1bmN0aW9uUGFyYW0oKckG3QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpwYXJzZUJyYWNlZEV4cHIoKcoGwwMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFbmNsb3NpbmdFeHByLCBjaGFyIGNvbnN0ICgmKSBbMTFdLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJj4oY2hhciBjb25zdCAoJikgWzExXSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYpywarAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6b3BlcmF0b3I9PSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXcgY29uc3QmLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ1ZpZXcgY29uc3QmKcwGUyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldzo6ZHJvcEZyb250KHVuc2lnbmVkIGxvbmcpIGNvbnN0zQaUAihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlSW50ZWdlckxpdGVyYWwoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3Kc4GvgIoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCb29sRXhwciwgaW50PihpbnQmJinPBqMDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25QYXJhbSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3Jj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3JinQBukBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6T3BlcmF0b3JJbmZvOjpnZXROYW1lKCkgY29uc3TRBoYEKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QnJhY2VkRXhwciwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCBib29sPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIGJvb2wmJinSBuEBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VVbnJlc29sdmVkVHlwZSgp0wbbAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlU2ltcGxlSWQoKdQG+wMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsaWZpZWROYW1lLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJinVBuUBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6cGFyc2VCYXNlVW5yZXNvbHZlZE5hbWUoKdYGnwMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46Om1ha2U8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpHbG9iYWxRdWFsaWZpZWROYW1lLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJj4oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYp1wZ8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCaW5hcnlFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdNgGRihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyOjpwcmludE9wZW4oY2hhcinZBrYBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlOjpwcmludEFzT3BlcmFuZCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZTo6UHJlYywgYm9vbCkgY29uc3TaBkcoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlcjo6cHJpbnRDbG9zZShjaGFyKdsGfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UHJlZml4RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TcBn0oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvc3RmaXhFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdN0GhAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFycmF5U3Vic2NyaXB0RXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TeBnwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1lbWJlckV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN03wZ5KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOZXdFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdOAGgAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGVBcnJheTo6cHJpbnRXaXRoQ29tbWEoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdOEGfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RGVsZXRlRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TiBnooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNhbGxFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdOMGgAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNvbnZlcnNpb25FeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdOQGgQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNvbmRpdGlvbmFsRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TlBnooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkNhc3RFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdOYG5QEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkVuY2xvc2luZ0V4cHI6OkVuY2xvc2luZ0V4cHIoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdHJpbmdWaWV3LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OlByZWMp5wZ/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFbmNsb3NpbmdFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdOgGyQMoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpTY29wZWRUZW1wbGF0ZVBhcmFtTGlzdDo6U2NvcGVkVGVtcGxhdGVQYXJhbUxpc3QoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiop6QbkAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlVGVtcGxhdGVQYXJhbURlY2woKeoG/wEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjpTY29wZWRUZW1wbGF0ZVBhcmFtTGlzdDo6flNjb3BlZFRlbXBsYXRlUGFyYW1MaXN0KCnrBoABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpJbnRlZ2VyTGl0ZXJhbDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TsBnooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkJvb2xFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdO0GiQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZsb2F0TGl0ZXJhbEltcGw8ZmxvYXQ+OjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdO4GigEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZsb2F0TGl0ZXJhbEltcGw8ZG91YmxlPjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TvBo8BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGbG9hdExpdGVyYWxJbXBsPGxvbmcgZG91YmxlPjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TwBn8oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlN0cmluZ0xpdGVyYWw6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN08Qb4Aihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QWJzdHJhY3RNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj4sIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6RGVmYXVsdEFsbG9jYXRvcj46OnBhcnNlVGVtcGxhdGVQYXJhbURlY2woKTo6J2xhbWJkYScoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUZW1wbGF0ZVBhcmFtS2luZCk6Om9wZXJhdG9yKCkoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUZW1wbGF0ZVBhcmFtS2luZCkgY29uc3TyBoEBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpVbm5hbWVkVHlwZU5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN08waMAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3ludGhldGljVGVtcGxhdGVQYXJhbU5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN09AaHAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VHlwZVRlbXBsYXRlUGFyYW1EZWNsOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPUGiAEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlR5cGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN09gaKAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9uVHlwZVRlbXBsYXRlUGFyYW1EZWNsOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdPcGiwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vblR5cGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0+AaLAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVUZW1wbGF0ZVBhcmFtRGVjbDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T5BocBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUZW1wbGF0ZVBhcmFtUGFja0RlY2w6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0+gaIAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGVtcGxhdGVQYXJhbVBhY2tEZWNsOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T7BoEBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpDbG9zdXJlVHlwZU5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0/AaHAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q2xvc3VyZVR5cGVOYW1lOjpwcmludERlY2xhcmF0b3IoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdP0GfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TGFtYmRhRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3T+Bn0oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkVudW1MaXRlcmFsOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdP8Gdihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyOjpvcGVyYXRvcjw8KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldymAB38oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkZ1bmN0aW9uUGFyYW06OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0gQd6KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb2xkRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SCB5oBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGb2xkRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3Q6OidsYW1iZGEnKCk6Om9wZXJhdG9yKCkoKSBjb25zdIMHjQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2tFeHBhbnNpb246OlBhcmFtZXRlclBhY2tFeHBhbnNpb24oKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlIGNvbnN0KimEB4gBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrRXhwYW5zaW9uOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIUHfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QnJhY2VkRXhwcjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SGB4EBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpCcmFjZWRSYW5nZUV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0hwetAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6SW5pdExpc3RFeHByOjpJbml0TGlzdEV4cHIoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlIGNvbnN0KiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlQXJyYXkpiAd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpJbml0TGlzdEV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0iQePAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UG9pbnRlclRvTWVtYmVyQ29udmVyc2lvbkV4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0igd/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpTdWJvYmplY3RFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdIsHhQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlNpemVvZlBhcmFtUGFja0V4cHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0jAd/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlQXJyYXlOb2RlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdI0Heyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VGhyb3dFeHByOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdI4Hfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbGlmaWVkTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SPB0soYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxpZmllZE5hbWU6OmdldEJhc2VOYW1lKCkgY29uc3SQB6IDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q29udmVyc2lvbk9wZXJhdG9yVHlwZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomKZEHeihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RHRvck5hbWU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0kgeIAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q29udmVyc2lvbk9wZXJhdG9yVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3STB4EBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpMaXRlcmFsT3BlcmF0b3I6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0lAeFAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6R2xvYmFsUXVhbGlmaWVkTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SVB1EoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Okdsb2JhbFF1YWxpZmllZE5hbWU6OmdldEJhc2VOYW1lKCkgY29uc3SWB88BKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFeHBhbmRlZFNwZWNpYWxTdWJzdGl0dXRpb246OkV4cGFuZGVkU3BlY2lhbFN1YnN0aXR1dGlvbigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlNwZWNpYWxTdWJLaW5kLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGU6OktpbmQplweFAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3BlY2lhbFN1YnN0aXR1dGlvbjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SYB1EoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlNwZWNpYWxTdWJzdGl0dXRpb246OmdldEJhc2VOYW1lKCkgY29uc3SZB1koYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkV4cGFuZGVkU3BlY2lhbFN1YnN0aXR1dGlvbjo6Z2V0QmFzZU5hbWUoKSBjb25zdJoHjQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkV4cGFuZGVkU3BlY2lhbFN1YnN0aXR1dGlvbjo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SbB3woYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFiaVRhZ0F0dHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0nAeyAyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSogKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpBYnN0cmFjdE1hbmdsaW5nUGFyc2VyPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPiwgKGFub255bW91cyBuYW1lc3BhY2UpOjpEZWZhdWx0QWxsb2NhdG9yPjo6bWFrZTwoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkN0b3JEdG9yTmFtZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIGJvb2wsIGludCY+KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomLCBib29sJiYsIGludCYpnQeHAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RydWN0dXJlZEJpbmRpbmdOYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJ4Hfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Q3RvckR0b3JOYW1lOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdJ8Hfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TW9kdWxlRW50aXR5OjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKAHiQEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2s6Omhhc1JIU0NvbXBvbmVudFNsb3coKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdKEHggEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2s6Omhhc0FycmF5U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0ogeFAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UGFyYW1ldGVyUGFjazo6aGFzRnVuY3Rpb25TbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SjB4MBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQYXJhbWV0ZXJQYWNrOjpnZXRTeW50YXhOb2RlKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SkB38oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBhcmFtZXRlclBhY2s6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0pQeAAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UGFyYW1ldGVyUGFjazo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0pgd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpUZW1wbGF0ZUFyZ3M6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0pweGAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6TmFtZVdpdGhUZW1wbGF0ZUFyZ3M6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0qAd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFbmFibGVJZkF0dHI6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0qQeMAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25FbmNvZGluZzo6aGFzUkhTQ29tcG9uZW50U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0qgeCAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RnVuY3Rpb25FbmNvZGluZzo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SrB4MBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGdW5jdGlvbkVuY29kaW5nOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SsB3soYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkRvdFN1ZmZpeDo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3StB/gDKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFic3RyYWN0TWFuZ2xpbmdQYXJzZXI8KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpNYW5nbGluZ1BhcnNlcjwoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+LCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6OkRlZmF1bHRBbGxvY2F0b3I+OjptYWtlPChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VmVjdG9yVHlwZSwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYsIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSomPigoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUqJiwgKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2RlKiYprgd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpOb2V4Y2VwdFNwZWM6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0rweGAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6RHluYW1pY0V4Y2VwdGlvblNwZWM6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0sAd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGdW5jdGlvblR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0sQd/KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpGdW5jdGlvblR5cGU6OnByaW50UmlnaHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLIHfyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T2JqQ1Byb3RvTmFtZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3SzB4MBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpWZW5kb3JFeHRRdWFsVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S0B4QBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsVHlwZTo6aGFzUkhTQ29tcG9uZW50U2xvdygoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0tQd9KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsVHlwZTo6aGFzQXJyYXlTbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S2B4ABKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpRdWFsVHlwZTo6aGFzRnVuY3Rpb25TbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S3B3ooYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlF1YWxUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLgHeyhhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UXVhbFR5cGU6OnByaW50UmlnaHQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLkHfihhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6QmluYXJ5RlBUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdLoHfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Qml0SW50VHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S7B4EBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQaXhlbFZlY3RvclR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0vAerAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VmVjdG9yVHlwZTo6VmVjdG9yVHlwZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqLCAoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok5vZGUgY29uc3QqKb0HfChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6VmVjdG9yVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S+B3soYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFycmF5VHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3S/B3woYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OkFycmF5VHlwZTo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0wAeFAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UG9pbnRlclRvTWVtYmVyVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TBB4YBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb2ludGVyVG9NZW1iZXJUeXBlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TCB4gBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpFbGFib3JhdGVkVHlwZVNwZWZUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMMHhwEoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvaW50ZXJUeXBlOjpoYXNSSFNDb21wb25lbnRTbG93KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TEB30oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvaW50ZXJUeXBlOjpwcmludExlZnQoKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpPdXRwdXRCdWZmZXImKSBjb25zdMUHTChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T2JqQ1Byb3RvTmFtZTo6aXNPYmpDT2JqZWN0KCkgY29uc3TGB34oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlBvaW50ZXJUeXBlOjpwcmludFJpZ2h0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3THB38oYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6OlJlZmVyZW5jZVR5cGU6OnByaW50TGVmdCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0yAd+KGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpSZWZlcmVuY2VUeXBlOjpjb2xsYXBzZSgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0yQeAAShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UmVmZXJlbmNlVHlwZTo6cHJpbnRSaWdodCgoYW5vbnltb3VzIG5hbWVzcGFjZSk6Oml0YW5pdW1fZGVtYW5nbGU6Ok91dHB1dEJ1ZmZlciYpIGNvbnN0yge+AShhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6UG9zdGZpeFF1YWxpZmllZFR5cGU6OlBvc3RmaXhRdWFsaWZpZWRUeXBlKChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6Tm9kZSBjb25zdCosIChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6U3RyaW5nVmlldynLB4YBKGFub255bW91cyBuYW1lc3BhY2UpOjppdGFuaXVtX2RlbWFuZ2xlOjpQb3N0Zml4UXVhbGlmaWVkVHlwZTo6cHJpbnRMZWZ0KChhbm9ueW1vdXMgbmFtZXNwYWNlKTo6aXRhbml1bV9kZW1hbmdsZTo6T3V0cHV0QnVmZmVyJikgY29uc3TMByVfX3Rocm93bl9vYmplY3RfZnJvbV91bndpbmRfZXhjZXB0aW9uzQcXX19nZXRfZXhjZXB0aW9uX21lc3NhZ2XOBwlzdGFja1NhdmXPBwxzdGFja1Jlc3RvcmXQBwpzdGFja0FsbG9j0QcGX190cmFw0gcWbGVnYWxzdHViJGR5bkNhbGxfamlqadMHGGxlZ2Fsc3R1YiRkeW5DYWxsX3ZpaWppadQHGGxlZ2Fsc3R1YiRkeW5DYWxsX2lpaWlpatUHGWxlZ2Fsc3R1YiRkeW5DYWxsX2lpaWlpamrWBxpsZWdhbHN0dWIkZHluQ2FsbF9paWlpaWlqatcHIWxlZ2FsZnVuYyRfZW1iaW5kX3JlZ2lzdGVyX2JpZ2ludAc3BAAPX19zdGFja19wb2ludGVyAQtfX3N0YWNrX2VuZAIMX19zdGFja19iYXNlAwh0ZW1wUmV0MAmBBTgABy5yb2RhdGEBCS5yb2RhdGEuMQIJLnJvZGF0YS4yAwkucm9kYXRhLjMECS5yb2RhdGEuNAUJLnJvZGF0YS41Bgkucm9kYXRhLjYHCS5yb2RhdGEuNwgJLnJvZGF0YS44CQkucm9kYXRhLjkKCi5yb2RhdGEuMTALCi5yb2RhdGEuMTEMCi5yb2RhdGEuMTINCi5yb2RhdGEuMTMOCi5yb2RhdGEuMTQPCi5yb2RhdGEuMTUQCi5yb2RhdGEuMTYRCi5yb2RhdGEuMTcSCi5yb2RhdGEuMTgTCi5yb2RhdGEuMTkUCi5yb2RhdGEuMjAVCi5yb2RhdGEuMjEWCi5yb2RhdGEuMjIXCi5yb2RhdGEuMjMYCi5yb2RhdGEuMjQZCi5yb2RhdGEuMjUaCi5yb2RhdGEuMjYbCi5yb2RhdGEuMjccCi5yb2RhdGEuMjgdCi5yb2RhdGEuMjkeCi5yb2RhdGEuMzAfCi5yb2RhdGEuMzEgCi5yb2RhdGEuMzIhCi5yb2RhdGEuMzMiCi5yb2RhdGEuMzQjCi5yb2RhdGEuMzUkCi5yb2RhdGEuMzYlCi5yb2RhdGEuMzcmCi5yb2RhdGEuMzgnCi5yb2RhdGEuMzkoCi5yb2RhdGEuNDApCi5yb2RhdGEuNDEqCi5yb2RhdGEuNDIrCi5yb2RhdGEuNDMsCi5yb2RhdGEuNDQtCi5yb2RhdGEuNDUuCi5yb2RhdGEuNDYvCi5yb2RhdGEuNDcwCi5yb2RhdGEuNDgxCi5yb2RhdGEuNDkyBS5kYXRhMwcuZGF0YS4xNAcuZGF0YS4yNQcuZGF0YS4zNgcuZGF0YS40NwcuZGF0YS41';
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
