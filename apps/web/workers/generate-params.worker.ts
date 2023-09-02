import { ctx, WEBSITE_ROOT } from "./shared";

async function generateParams(filename: string) {
    const multiThread = await import("nova-ecdsa-browser");
    await multiThread.default();
    await multiThread.initThreadPool(navigator.hardwareConcurrency);
    const start = performance.now();
    const data = await multiThread.generate_params(WEBSITE_ROOT, filename);
    const end = performance.now();
    ctx.postMessage({
        data: data,
        time: end - start
    });
}

ctx.addEventListener("message", async (event) => {
    generateParams(event.data.filename);
});