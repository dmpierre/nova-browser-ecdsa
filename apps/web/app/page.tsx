"use client";

import { Header, NovaGenerateParams, NovaGenerateProof, NovaVerify, MainContainer, MainNovaContainer } from "ui";
import { useGenerateParams } from "../hooks/useGenerateParams";
import { useProve } from "../hooks/useProve";
import { useVerify } from "../hooks/useVerify";
import { useFoldingParams } from "../hooks/useFolding";
import Image from "next/image";
import "ui/styles.css";
import dynamic from "next/dynamic";

const Description = dynamic(() => import('ui/Description').then((mod) => mod.Description), { ssr: false })

export default function Page() {

  const foldingParams = useFoldingParams();
  const { pp, generateParams, isGenerating: isGeneratingParams, time: paramsTime } = useGenerateParams(foldingParams.filename);
  const { proof, generateProof, isGenerating: isGeneratingProof, time: provingTime } = useProve(foldingParams, pp.data);
  const { verify, generateVerify, isGenerating: isGeneratingVerify, time: verifyTime } = useVerify(foldingParams, pp.data, proof.data);

  return (
    <MainContainer>
      <Header text="ECDSA Aggregation with Nova" />
      <div className="flex justify-center">
        <a target="_blank" href="https://github.com/dmpierre/nova-browser-ecdsa">
          <Image src="/github-mark.png" width={25} height={25} alt="github" />
        </a>
      </div>
      <Description iteration_count={foldingParams.iteration_count}
        per_iteration_count={foldingParams.per_iteration_count}
        type={foldingParams.type}
        total={foldingParams.total}
      />
      <MainNovaContainer>
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
      </MainNovaContainer>
    </MainContainer>
  );
}
