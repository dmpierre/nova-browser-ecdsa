import { useRef, useEffect, useCallback, useState } from "react";
import sigsJSON from "../public/batch.json";
import { FoldingParams } from "../types/types";

export const useVerify = (foldingParams: FoldingParams, pp: string, proof: string) => {
    const worker = useRef<Worker>();
    const [verify, setverify] = useState<{ data: boolean | undefined }>({ data: undefined });
    const [time, settime] = useState();
    const [isGenerating, setisGenerating] = useState(false);

    useEffect(() => {
        worker.current = new Worker(new URL("../workers/verify.worker.ts", import.meta.url));
        worker.current.onmessage = (e) => {
            console.log("CompressedSNARK verified!");
            setisGenerating(false);
            setverify(e.data);
            settime(e.data.time);
        };
        return () => {
            worker.current?.terminate();
        };
    }, []);

    const generateVerify = useCallback(async () => {
        console.log("Starting compressedSNARK verification...");
        setisGenerating(true);
        worker.current?.postMessage({
            pp: pp,
            sigs: JSON.stringify(sigsJSON),
            proof: proof,
            iteration_count: foldingParams.iteration_count,
        });
    }, [pp, proof]);

    return { verify, generateVerify, isGenerating, time };
};