import { computeEffEcdsaPubInput } from "@personaelabs/spartan-ecdsa"
import { ecsign } from "@ethereumjs/util";
import { ec } from "elliptic";
import crypto from "crypto";
import fs from "fs";

(BigInt.prototype as any).toJSON = function () {
    return this.toString();
};

const main = () => {
    /* 
    * This is a script for generating sample signatures for the sig_ecdsa circuits.
    * Useful for generating batches of random signatures when needed.
    */
    const numSignatures = parseInt(process.argv[2]);
    if (isNaN(numSignatures)) {
    throw new Error("Number of signatures must be a number");
    }
    if (numSignatures <= 1) {
        throw new Error("Number of signatures must be greater than 1");
    }
    const curve = new ec("secp256k1");
    const privKey = Buffer.from(
        "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80",
        "hex"
    );
    const keypair = curve.keyFromPrivate(privKey)
    const point = keypair.getPublic();
    const inputs: any[] = [];

    for (let i = 0; i < numSignatures; i++) {
        const msg = crypto.randomBytes(32);
        const { v, r: _r, s } = ecsign(msg, privKey);
        const r = BigInt("0x" + _r.toString("hex"));
        const circuitPubInput = computeEffEcdsaPubInput(r, v, msg);
        const input = [
            BigInt("0x" + s.toString("hex")),
            circuitPubInput.Tx,
            circuitPubInput.Ty,
            circuitPubInput.Ux,
            circuitPubInput.Uy,
            point.getX().toString(),
            point.getY().toString(),
        ]
        inputs.push(input);
    }

    const fileOutput = {
        "start_pub_input": inputs[0],
        "signatures": inputs.slice(1, inputs.length)
    };

    fs.writeFileSync(
        "out/sig_ecdsa_batch_sample.json",
        JSON.stringify(fileOutput)
    );
};

main();