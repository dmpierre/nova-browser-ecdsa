"use client";

import { Header, NovaGenerateParams, NovaGenerateProof, NovaVerify } from "ui";
import { useGenerateParams } from "../hooks/useGenerateParams";
import { useProve } from "../hooks/useProve";
import { useVerify } from "../hooks/useVerify";

export default function Page() {

  const { pp, generateParams, isGenerating: isGeneratingParams, time: paramsTime } = useGenerateParams();
  const { proof, generateProof, isGenerating: isGeneratingProof, time: provingTime } = useProve(pp.data);
  const { verify, generateVerify, isGenerating: isGeneratingVerify, time: verifyTime } = useVerify(pp.data, proof.data);

  return (
    <>
      <Header text="ECDSA Aggregation with Nova" />
      <NovaGenerateParams data={pp.data} isGenerating={isGeneratingParams} time={paramsTime} generateParams={generateParams} />
      {
        pp.data ?
          <NovaGenerateProof data={proof.data} isGenerating={isGeneratingProof} time={provingTime} generateProof={generateProof} />
          :
          <></>
      }
      {
        proof.data ?
        <NovaVerify data={verify.data} isGenerating={isGeneratingVerify} time={verifyTime} generateVerify={generateVerify} />
          :
          <></>
      }
    </>
  );
}
