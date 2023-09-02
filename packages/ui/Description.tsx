import React from "react"

export const Description: React.FC<{ total: number, type: string, iteration_count: number, per_iteration_count: number }> = ({ total, type, iteration_count, per_iteration_count }) => {
    return (
        <div className="text-center py-5 px-5">
            <p>
                This is an app aggregating {total} ECDSA signatures - {iteration_count} folding steps, {per_iteration_count} signatures per step - over secp/secq using Nova. You can test it to generate and subsequently verify a compressed Nova SNARK.
                <br /> <br />
                Read <a className="underline text-violet-500" target="_blank" href="">here</a> on how to leverage Nova within your zk app.
                And <a className="underline text-violet-500" target="_blank" href="https://hackmd.io/@PierreDM/rkbPW-AT2">here</a> on how we did this along with some benchmarks.
            </p>
        </div>
    )
};