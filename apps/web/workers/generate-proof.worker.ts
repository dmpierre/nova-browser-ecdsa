import { ctx, WEBSITE_ROOT } from "./shared";

async function generateProof(filename: string, iteration_count: number, per_iteration_count: number, pp: string, sigs: string) {
    const multiThread = await import("nova-ecdsa-browser");
    await multiThread.default();
    await multiThread.initThreadPool(navigator.hardwareConcurrency);
    const start = performance.now();
    const data = await multiThread.generate_proof(
        WEBSITE_ROOT, filename,
        iteration_count, per_iteration_count,
        pp, sigs
    );
    const end = performance.now();
    ctx.postMessage({
        data: data,
        time: end - start
    });
}

ctx.addEventListener("message", async (event) => {
    generateProof(
        event.data.filename,
        event.data.iteration_count, event.data.per_iteration_count,
        event.data.pp, event.data.sigs
    );
});