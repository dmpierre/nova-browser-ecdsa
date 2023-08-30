import { useRef, useEffect, useCallback, useState } from "react";

export const useGenerateParams = () => {
    const [pp, setpp] = useState<any>({ data: "" });
    const [paramTime, setParamTime] = useState(-1);

    const worker = useRef<Worker>();

    useEffect(() => {
        worker.current = new Worker(new URL("../workers/generate-params.worker.ts", import.meta.url));
        worker.current.onmessage = (e) => {
            console.log("Public params generated!");
            setpp(e.data);
        };
        return () => {
            worker.current?.terminate();
        };
    }, []);

    const generateParams = useCallback(async () => {
        console.log("Starting public params generation...");
        worker.current?.postMessage({});
    }, []);

    return { pp, generateParams };
};