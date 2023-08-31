"use client";

import { Header, NovaGenerateParams, NovaGenerateProof, NovaVerify, MainContainer, MainNovaContainer } from "ui";
import { useGenerateParams } from "../hooks/useGenerateParams";
import { useProve } from "../hooks/useProve";
import { useVerify } from "../hooks/useVerify";
import "ui/styles.css";

export default function Page() {

  const { pp, generateParams, isGenerating: isGeneratingParams, time: paramsTime } = useGenerateParams();
  const { proof, generateProof, isGenerating: isGeneratingProof, time: provingTime } = useProve(pp.data);
  const { verify, generateVerify, isGenerating: isGeneratingVerify, time: verifyTime } = useVerify(pp.data, proof.data);

  return (
    <MainContainer>
      <Header text="ECDSA Aggregation with Nova" />
      <div className="text-center py-5 px-5">
        <p>
          This is an app aggregating 300 ECDSA signatures over secp/secq using Nova. You can test it to generate and subsquently verify a compressed Nova SNARK.
          <br /> <br />
          Read here on how to leverage Nova within your zk app.
          And here on how we did this.
        </p>

      </div>
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
