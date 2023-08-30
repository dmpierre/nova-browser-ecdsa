import { useRef, useEffect, useCallback, useState } from "react";
import sigsJSON from "../public/batch.json";

export const useProve = (pp: string) => {
    const [proof, setproof] = useState<any>({ data: "" });
    const worker = useRef<Worker>();
    const [time, settime] = useState(0);
    const [isGenerating, setisGenerating] = useState(false);

    useEffect(() => {
        worker.current = new Worker(new URL("../workers/generate-proof.worker.ts", import.meta.url));
        worker.current.onmessage = (e) => {
            console.log("CompressedSNARK generated!");
            setisGenerating(false);
            setproof(e.data);
            settime(e.data.time);
        };
        return () => {
            worker.current?.terminate();
        };
    }, []);

    const generateProof = useCallback(async () => {
        setisGenerating(true);
        worker.current?.postMessage({
            pp: pp,
            sigs: JSON.stringify(sigsJSON)
        });
    }, [pp]);

    return { proof, generateProof, isGenerating, time };
};