use std::{collections::HashMap, env::current_dir, time::{Instant, Duration}};

use nova_scotia::{
    circom::reader::load_r1cs, create_public_params, create_recursive_circuit, FileLocation,
    F1, G2
};
use ff::PrimeField;
use nova_snark::traits::Group;
use serde::{Deserialize, Serialize};
use serde_json::json;

#[derive(Serialize, Deserialize)]
#[allow(non_snake_case)]
struct EffSig {
    start_pub_input: [String; 7],
    signatures: Vec<[String; 7]>,
}

fn run(per_iteration_count: usize, r1cs_path: String, wasm_path: String) -> (Duration, Duration) {

    let root = current_dir().unwrap();
    let circuit_file = root.join(r1cs_path);
    let r1cs = load_r1cs(&FileLocation::PathBuf(circuit_file));
    let witness_generator_wasm = root.join(wasm_path);
    let sigs: EffSig = serde_json::from_str(include_str!("data/batch.json"))
    .unwrap();
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
    let n_sigs = sigs.signatures.len();
    println!("n_sigs: {}", n_sigs);
    let iteration_count = n_sigs / per_iteration_count;
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
    let pp = create_public_params(r1cs.clone());
    println!("Creating a RecursiveSNARK...");
    let start = Instant::now();
    let recursive_snark = create_recursive_circuit(
        FileLocation::PathBuf(witness_generator_wasm),
        r1cs,
        private_inputs,
        start_public_input.clone(),
        &pp,
    )
    .unwrap();
    let prover_time = start.elapsed();
    println!("RecursiveSNARK creation took {:?}", start.elapsed());

    let z0_secondary = vec![<G2 as Group>::Scalar::zero()];

    // verify the recursive SNARK
    println!("Verifying a RecursiveSNARK...");
    let start = Instant::now();
    let res = recursive_snark.verify(
        &pp,
        iteration_count,
        start_public_input.clone(),
        z0_secondary.clone(),
    );
    println!(
        "RecursiveSNARK::verify: {:?}, took {:?}",
        res,
        start.elapsed()
    );
    let verifier_time = start.elapsed();
    assert!(res.is_ok());
    (prover_time, verifier_time)

}

fn main() {
    let circuit_filepath = format!("src/data/agg_ecdsa.r1cs");
    let witness_gen_filepath = format!("src/data/agg_ecdsa.wasm");
    run(10, circuit_filepath, witness_gen_filepath);
}
