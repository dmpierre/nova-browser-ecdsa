#!/bin/bash
CIRCOMLIB_PATH=${1}
SPARTAN_ECDSA_EFFICENT_ECDSA_PATH=${2}
circom main.circom -l ${CIRCOMLIB_PATH}  -l ${SPARTAN_ECDSA_EFFICENT_ECDSA_PATH} --r1cs --wasm