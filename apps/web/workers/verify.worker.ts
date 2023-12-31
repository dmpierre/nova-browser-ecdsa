import { ctx } from "./shared";

async function verify(iteration_count: number, pp: string, proof: string, sigs: string) {
    const multiThread = await import("nova-ecdsa-browser");
    await multiThread.default();
    await multiThread.initThreadPool(navigator.hardwareConcurrency);
    const start = performance.now();
    const data = await multiThread.verify_compressed_proof(iteration_count, pp, proof, sigs);
    const end = performance.now();
    ctx.postMessage({
        data: data,
        time: end - start
    });
}

ctx.addEventListener("message", async (event) => {
    verify(event.data.iteration_count, event.data.pp, event.data.proof, event.data.sigs);
});
