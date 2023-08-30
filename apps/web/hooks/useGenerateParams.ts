import { useRef, useEffect, useCallback, useState } from "react";

export const useGenerateParams = () => {
    const [pp, setpp] = useState<any>({ data: "" });
    const [time, settime] = useState();
    const [isGenerating, setisGenerating] = useState(false);

    const worker = useRef<Worker>();

    useEffect(() => {
        worker.current = new Worker(new URL("../workers/generate-params.worker.ts", import.meta.url));
        worker.current.onmessage = (e) => {
            console.log("Public params generated!");
            setisGenerating(false);
            setpp(e.data);
            settime(e.data.time);
        };
        return () => {
            worker.current?.terminate();
        };
    }, []);

    const generateParams = useCallback(async () => {
        console.log("Starting public params generation...");
        setisGenerating(true);
        worker.current?.postMessage({});
    }, []);

    return { pp, generateParams, isGenerating, time };
};