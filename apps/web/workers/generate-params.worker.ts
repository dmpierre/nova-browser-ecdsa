import { ctx } from "./shared";

async function generateParams() {
    const multiThread = await import("nova-ecdsa-browser");
    await multiThread.default();
    await multiThread.initThreadPool(navigator.hardwareConcurrency);
    const data = await multiThread.generate_params();
    ctx.postMessage({
        data: data
    });
}

ctx.addEventListener("message", async (event) => {
    generateParams();
});