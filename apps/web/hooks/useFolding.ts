import { useState, useEffect } from "react";

export const useFoldingParams = () => {
    // our folding will be different if on mobile vs on desktop
    // hook to detect whether running on mobile phones
    const initialWidth = typeof window !== "undefined" ? window.innerWidth : 0;
    const [width, setWidth] = useState<number>(initialWidth);

    function handleWindowSizeChange() {
        setWidth(window.innerWidth);
    }

    useEffect(() => {
        window.addEventListener('resize', handleWindowSizeChange);
        return () => {
            window.removeEventListener('resize', handleWindowSizeChange);
        }
    }, []);

    const isMobile = width <= 768;
    const folding = isMobile ?
        {
            filename: "",
            iteration_count: 30,
            per_iteration_count: 10,
            total: 300,
            type: "mobile"
        } :
        {
            filename: "agg_ecdsa",
            iteration_count: 30,
            per_iteration_count: 10,
            total: 300,
            type: "desktop"
        }
        ;

    return folding;
}