export const Description = () => {
    return (
        <div className="text-center py-5 px-5">
            <p>
                This is an app aggregating 300 ECDSA signatures - 30 folding steps, 10 signatures per step - over secp/secq using Nova. You can test it to generate and subsquently verify a compressed Nova SNARK.
                <br /> <br />
                Read <a className="underline text-violet-500" target="_blank"  href="">here</a> on how to leverage Nova within your zk app.
                And <a className="underline text-violet-500" target="_blank" href="https://hackmd.io/@PierreDM/rkbPW-AT2">here</a> on how we did this along with some benchmarks.
            </p>
        </div>
    )
};