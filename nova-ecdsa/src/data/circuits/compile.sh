#!/bin/bash
CIRCOMLIB_PATH=${1}
SPARTAN_ECDSA_EFFICIENT_ECDSA_PATH=${2}
circom -l ${CIRCOMLIB_PATH}  -l ${SPARTAN_ECDSA_EFFICIENT_ECDSA_PATH} --prime secq256k1 --r1cs --wasm ./main.circom