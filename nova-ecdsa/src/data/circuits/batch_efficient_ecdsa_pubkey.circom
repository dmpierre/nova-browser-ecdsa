include "./efficient_ecdsa_pubkey.circom";

template BatchEfficientECDSAPubKey(N_SIGS) {

    signal input step_in[7];
    signal input signatures[N_SIGS][7];
    signal output step_out[7];

    component sigsChecker[N_SIGS];

    sigsChecker[0] = EfficientECDSAPubKey();
    sigsChecker[0].s <== step_in[0];
    sigsChecker[0].Tx <== step_in[1];
    sigsChecker[0].Ty <== step_in[2];
    sigsChecker[0].Ux <== step_in[3];
    sigsChecker[0].Uy <== step_in[4];
    sigsChecker[0].pubX <== step_in[5];
    sigsChecker[0].pubY <== step_in[6];


    for (var i = 1; i < N_SIGS - 1; i++) {

        sigsChecker[i] = EfficientECDSAPubKey();
        sigsChecker[i].s <== signatures[i][0];
        sigsChecker[i].Tx <== signatures[i][1];
        sigsChecker[i].Ty <== signatures[i][2];
        sigsChecker[i].Ux <== signatures[i][3];
        sigsChecker[i].Uy <== signatures[i][4];
        sigsChecker[i].pubX <== signatures[i][5];
        sigsChecker[i].pubY <== signatures[i][6];

    }

    for (var i = 0; i < 7; i++) {
        step_out[i] <== signatures[N_SIGS - 1][i];
    }
}