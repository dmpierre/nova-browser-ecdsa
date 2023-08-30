import { ctx } from "./shared";

async function generateProof(pp: string, sigs: string) {
    const multiThread = await import("nova-ecdsa-browser");
    await multiThread.default();
    await multiThread.initThreadPool(navigator.hardwareConcurrency);
    const data = await multiThread.generate_proof(pp, sigs);
    ctx.postMessage({
        data: data
    });
}

ctx.addEventListener("message", async (event) => {
    generateProof(event.data.pp, event.data.sigs);
});