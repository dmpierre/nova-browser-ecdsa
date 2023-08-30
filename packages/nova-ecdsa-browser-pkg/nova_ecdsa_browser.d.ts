/* tslint:disable */
/* eslint-disable */
/**
*/
export function init_panic_hook(): void;
/**
* @returns {Promise<string>}
*/
export function generate_params(): Promise<string>;
/**
* @param {string} pp_str
* @param {string} sigs
* @returns {Promise<string>}
*/
export function generate_proof(pp_str: string, sigs: string): Promise<string>;
/**
* @param {string} pp_str
* @param {string} proof_str
* @param {string} sigs
* @returns {Promise<boolean>}
*/
export function verify_compressed_proof(pp_str: string, proof_str: string, sigs: string): Promise<boolean>;
/**
* @param {string} path
* @returns {Promise<Uint8Array>}
*/
export function read_file(path: string): Promise<Uint8Array>;
/**
* @param {string} input_json_string
* @param {string} wasm_file
* @returns {Promise<Uint8Array>}
*/
export function generate_witness_browser(input_json_string: string, wasm_file: string): Promise<Uint8Array>;
/**
* @param {number} num_threads
* @returns {Promise<any>}
*/
export function initThreadPool(num_threads: number): Promise<any>;
/**
* @param {number} receiver
*/
export function wbg_rayon_start_worker(receiver: number): void;
/**
*/
export class EffSig {
  free(): void;
}
/**
*/
export class wbg_rayon_PoolBuilder {
  free(): void;
/**
* @returns {number}
*/
  numThreads(): number;
/**
* @returns {number}
*/
  receiver(): number;
/**
*/
  build(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly __wbg_effsig_free: (a: number) => void;
  readonly generate_params: () => number;
  readonly generate_proof: (a: number, b: number, c: number, d: number) => number;
  readonly verify_compressed_proof: (a: number, b: number, c: number, d: number, e: number, f: number) => number;
  readonly init_panic_hook: () => void;
  readonly __wbg_wbg_rayon_poolbuilder_free: (a: number) => void;
  readonly wbg_rayon_poolbuilder_numThreads: (a: number) => number;
  readonly wbg_rayon_poolbuilder_receiver: (a: number) => number;
  readonly wbg_rayon_poolbuilder_build: (a: number) => void;
  readonly wbg_rayon_start_worker: (a: number) => void;
  readonly initThreadPool: (a: number) => number;
  readonly read_file: (a: number, b: number) => number;
  readonly generate_witness_browser: (a: number, b: number, c: number, d: number) => number;
  readonly memory: WebAssembly.Memory;
  readonly __wbindgen_export_1: WebAssembly.Table;
  readonly _dyn_core__ops__function__FnMut__A____Output___R_as_wasm_bindgen__closure__WasmClosure___describe__invoke__h6ae7b9308d5b8965: (a: number, b: number, c: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly wasm_bindgen__convert__closures__invoke2_mut__h79d8b12638ec1af1: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_thread_destroy: (a: number, b: number) => void;
  readonly __wbindgen_start: () => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
* @param {WebAssembly.Memory} maybe_memory
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput, maybe_memory?: WebAssembly.Memory): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
* @param {WebAssembly.Memory} maybe_memory
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>, maybe_memory?: WebAssembly.Memory): Promise<InitOutput>;
