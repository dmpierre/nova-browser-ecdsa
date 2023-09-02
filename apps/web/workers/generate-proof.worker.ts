import { ctx, WEBSITE_ROOT } from "./shared";

async function generateProof(pp: string, sigs: string) {
    const multiThread = await import("nova-ecdsa-browser");
    await multiThread.default();
    await multiThread.initThreadPool(navigator.hardwareConcurrency);
    const start = performance.now();
    const data = await multiThread.generate_proof(WEBSITE_ROOT, pp, sigs);
    const end = performance.now();
    ctx.postMessage({
        data: data,
        time: end - start
    });
}

ctx.addEventListener("message", async (event) => {
    generateProof(event.data.pp, event.data.sigs);
});