pragma circom 2.1.2;

template EfficientECDSAPubKey() {

    signal input s;
    signal input Tx;
    signal input Ty; 
    signal input Ux; 
    signal input Uy;
    signal input pubX;
    signal input pubY;

    component eff_ecdsa = EfficientECDSA();
    eff_ecdsa.s <== s;
    eff_ecdsa.Tx <== Tx;
    eff_ecdsa.Ty <== Ty;
    eff_ecdsa.Ux <== Ux;
    eff_ecdsa.Uy <== Uy;
    
    eff_ecdsa.pubKeyX === pubX;
    eff_ecdsa.pubKeyY === pubY;
}