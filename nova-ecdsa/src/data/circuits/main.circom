pragma circom 2.1.2;

include "./batch_efficient_ecdsa_pubkey.circom";

// Add/modify 'include' here - avoids duplicate template instantiations

// include "circomlib/circuits/comparators.circom";
// include "circomlib/circuits/gates.circom";
// include "circomlib/circuits/mux1.circom";
// include "circomlib/circuits/bitify.circom";
// include "circomlib/circuits/comparators.circom";
// include "circomlib/circuits/gates.circom";
// include "circomlib/circuits/bitify.circom";

// spartan-ecdsa-monorepo: https://github.com/personaelabs/spartan-ecdsa
// include "spartan-ecdsa-monorepo/packages/circuits/eff_ecdsa_membership/eff_ecdsa.circom";

// 10 is the batch size here. Change it to whatever you want.
component main { public [ step_in ] } = BatchEfficientECDSAPubKey(10);
