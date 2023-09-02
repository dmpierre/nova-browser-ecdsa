use std::collections::HashMap;

use nova_scotia::{
    circom::{circuit::CircomCircuit, reader::load_r1cs},
    create_public_params, create_recursive_circuit, F1, F2, G1, G2, S1, S2,
};
use nova_scotia::{FileLocation, EE1, EE2};
use nova_snark::{
    spartan::RelaxedR1CSSNARK,
    traits::{circuit::TrivialTestCircuit, Group},
    CompressedSNARK, PublicParams,
};
use serde::{Deserialize, Serialize};
use serde_json::json;
use wasm_bindgen::prelude::*;

use ff::PrimeField;

pub use wasm_bindgen_rayon::init_thread_pool;

#[wasm_bindgen]
extern "C" {
    // Use `js_namespace` here to bind `console.log(..)` instead of just
    // `log(..)`
    #[wasm_bindgen(js_namespace = console)]
    fn log(s: &str);

    // The `console.log` is quite polymorphic, so we can bind it with multiple
    // signatures. Note that we need to use `js_name` to ensure we always call
    // `log` in JS.
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_u32(a: u32);

    // Multiple arguments too!
    #[wasm_bindgen(js_namespace = console, js_name = log)]
    fn log_many(a: &str, b: &str);
}

macro_rules! console_log {
    // Note that this is using the `log` function imported above during
    // `bare_bones`
    ($($t:tt)*) => (log(&format_args!($($t)*).to_string()))
}

extern crate console_error_panic_hook;

#[wasm_bindgen]
#[derive(Serialize, Deserialize)]
pub struct EffSig {
    start_pub_input: [String; 7],
    signatures: Vec<[String; 7]>,
}

#[wasm_bindgen]
pub fn init_panic_hook() {
    console_error_panic_hook::set_once();
}

#[wasm_bindgen]
pub async fn generate_params(website_root: &str) -> String {
    let r1cs = load_r1cs(&FileLocation::URL(
        website_root.to_string().clone() + &"agg_ecdsa.r1cs".to_string(),
    ))
    .await;

    let pp = create_public_params(r1cs.clone());
    let serialised = serde_json::to_string(&pp).unwrap();
    return serialised;
}

#[wasm_bindgen]
pub async fn generate_proof(website_root: &str, pp_str: String, sigs: String) -> String {
    console_error_panic_hook::set_once();

    let r1cs = load_r1cs(&FileLocation::URL(
        website_root.to_string().clone() + &"agg_ecdsa.r1cs".to_string(),
    ))
    .await;
    let witness_generator_wasm =
        FileLocation::URL(website_root.to_string().clone() + &"agg_ecdsa.wasm".to_string());

    let sigs: EffSig = serde_json::from_str(&sigs).unwrap();
    let start_public_input = vec![
        F1::from_str_vartime(&sigs.start_pub_input[0]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[1]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[2]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[3]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[4]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[5]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[6]).unwrap(),
    ];

    let mut private_inputs = Vec::new();

    let iteration_count = 30;
    let per_iteration_count = 10;

    for i in 0..iteration_count {
        let mut private_input = HashMap::new();
        private_input.insert(
            "signatures".to_string(),
            json!(
                sigs.signatures
                    [i * per_iteration_count..i * per_iteration_count + per_iteration_count]
            ),
        );
        private_inputs.push(private_input);
    }

    let pp =
        serde_json::from_str::<PublicParams<G1, G2, CircomCircuit<F1>, TrivialTestCircuit<F2>>>(
            &pp_str,
        )
        .unwrap();

    unsafe {
        console_log!(
            "Number of constraints per step (primary circuit): {}",
            pp.num_constraints().0
        );
        console_log!(
            "Number of constraints per step (secondary circuit): {}",
            pp.num_constraints().1
        );

        console_log!(
            "Number of variables per step (primary circuit): {}",
            pp.num_variables().0
        );
        console_log!(
            "Number of variables per step (secondary circuit): {}",
            pp.num_variables().1
        );

        console_log!("Creating a RecursiveSNARK...");
    }
    let recursive_snark = create_recursive_circuit(
        witness_generator_wasm,
        r1cs,
        private_inputs,
        start_public_input.clone(),
        &pp,
    )
    .await
    .unwrap();

    // TODO: empty?
    let z0_secondary = vec![<G2 as Group>::Scalar::zero()];

    // verify the recursive SNARK
    unsafe {
        console_log!("Verifying a RecursiveSNARK...");
    }
    let res = recursive_snark.verify(
        &pp,
        iteration_count,
        start_public_input.clone(),
        z0_secondary.clone(),
    );
    assert!(res.is_ok());

    // produce a compressed SNARK
    unsafe {
        console_log!("Generating a CompressedSNARK using Spartan with IPA-PC...");
    }

    let (pk, _vk) = CompressedSNARK::<_, _, _, _, S1, S2>::setup(&pp).unwrap();
    let res = CompressedSNARK::<_, _, _, _, S1, S2>::prove(&pp, &pk, &recursive_snark);
    assert!(res.is_ok());
    let compressed_snark = res.unwrap();
    return serde_json::to_string(&compressed_snark).unwrap();
}

#[wasm_bindgen]
pub async fn verify_compressed_proof(pp_str: String, proof_str: String, sigs: String) -> bool {
    let pp =
        serde_json::from_str::<PublicParams<G1, G2, CircomCircuit<F1>, TrivialTestCircuit<F2>>>(
            &pp_str,
        )
        .unwrap();
    let (_pk, vk) = CompressedSNARK::<_, _, _, _, S1, S2>::setup(&pp).unwrap();
    let iteration_count = 30;
    let sigs: EffSig = serde_json::from_str(&sigs).unwrap();
    let start_public_input = vec![
        F1::from_str_vartime(&sigs.start_pub_input[0]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[1]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[2]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[3]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[4]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[5]).unwrap(),
        F1::from_str_vartime(&sigs.start_pub_input[6]).unwrap(),
    ];

    let z0_secondary = vec![<G2 as Group>::Scalar::zero()];

    let compressed_proof = serde_json::from_str::<
        CompressedSNARK<
            G1,
            G2,
            CircomCircuit<F1>,
            TrivialTestCircuit<F2>,
            RelaxedR1CSSNARK<G1, EE1>,
            RelaxedR1CSSNARK<G2, EE2>,
        >,
    >(&proof_str)
    .unwrap();
    let res = compressed_proof.verify(
        &vk,
        iteration_count,
        start_public_input.clone(),
        z0_secondary,
    );
    return res.is_ok();
}
