import { useRef, useEffect, useCallback, useState } from "react";
import sigsJSON from "../public/batch.json";

export const useProve = (pp: string) => {
    const [proof, setproof] = useState<any>({ data: "" });
    const worker = useRef<Worker>();
    const [proofTime, setProofTime] = useState(-1);

    useEffect(() => {
        worker.current = new Worker(new URL("../workers/generate-proof.worker.ts", import.meta.url));
        worker.current.onmessage = (e) => {
            console.log("CompressedSNARK generated!");
            setproof(e.data);
        };
        return () => {
            worker.current?.terminate();
        };
    }, []);

    const generateProof = useCallback(async () => {
        worker.current?.postMessage({
            pp: pp,
            sigs: JSON.stringify(sigsJSON)
        });
    }, [pp]);

    return { proof, generateProof };
};