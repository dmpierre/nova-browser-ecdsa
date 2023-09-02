export type FoldingParams = {
    filename: string;
    iteration_count: number; // not camelCasing to fit wasm fn signature
    per_iteration_count: number; // not camelCasing to fit wasm fn signature
    total: number;
    type: string;
}