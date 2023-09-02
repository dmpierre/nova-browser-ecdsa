import { ctx, WEBSITE_ROOT } from "./shared";

async function generateParams() {
    const multiThread = await import("nova-ecdsa-browser");
    await multiThread.default();
    await multiThread.initThreadPool(navigator.hardwareConcurrency);
    const start = performance.now();
    const data = await multiThread.generate_params(WEBSITE_ROOT);
    const end = performance.now();
    ctx.postMessage({
        data: data,
        time: end - start
    });
}

ctx.addEventListener("message", async (event) => {
    generateParams();
});