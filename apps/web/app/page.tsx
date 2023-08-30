"use client";

import { Header, NovaGenerateParams, NovaGenerateProof, NovaVerify } from "ui";
import { useGenerateParams } from "../hooks/useGenerateParams";
import { useProve } from "../hooks/useProve";
import { useVerify } from "../hooks/useVerify";


export default function Page() {

  const { pp, generateParams } = useGenerateParams();
  const { proof, generateProof } = useProve(pp.data);
  const { verify, generateVerify } = useVerify(pp.data, proof.data);

  return (
    <>
      <Header text="ECDSA Aggregation with Nova" />
      <NovaGenerateParams data={pp.data} generateParams={generateParams}/>
      <NovaGenerateProof data={proof.data} generateProof={generateProof} />
      <NovaVerify data={verify.data} generateVerify={generateVerify} />
    </>
  );
}
