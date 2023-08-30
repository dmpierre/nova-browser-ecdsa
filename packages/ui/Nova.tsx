import * as React from 'react';

const formatForDisplay = (data: string) => {
    return data.slice(1, 50) + "... \"}\"";
};

const formatTime = (time: number) => {
    return (time / 1000).toFixed(2);
}

interface NovaProps {
    data: string | boolean | undefined;
    time: number;
    isGenerating: boolean;
}

interface NovaGenerateParams extends NovaProps {
    generateParams: () => Promise<void>;
}

interface NovaGenerateProofProps extends NovaProps {
    generateProof: () => Promise<void>;
}

interface NovaVerifyProps extends NovaProps {
    generateVerify: () => Promise<void>;
}

export const NovaGenerateParams: React.FC<NovaGenerateParams> = ({ data, isGenerating, time, generateParams }) => {
    return (
        <>
            <p>Generate Public Parameters:</p>
            {
                isGenerating ?
                    <p>Generating...</p>
                    :
                    data ?
                        <>
                            <p>Current public params: {formatForDisplay(`${data}`)}</p>
                            <p>Generation time: {formatTime(time)}s</p>
                        </>
                        :
                        <button onClick={generateParams}>Parametrize</button>
            }
        </>
    )
};

export const NovaGenerateProof: React.FC<NovaGenerateProofProps> = ({ data, isGenerating, generateProof, time }) => {
    return (
        <>
            <p>Generate Proof:</p>
            {
                isGenerating ?
                    <p>Generating...</p>
                    :
                    data ?
                        <>
                            <p>Proof: {formatForDisplay(`${data}`)}</p>
                            <p>Generation time: {formatTime(time)}s</p>
                        </>
                        :
                        <button onClick={generateProof}>Prove</button>
            }
        </>
    )
}

export const NovaVerify: React.FC<NovaVerifyProps> = ({ data, isGenerating, generateVerify, time }) => {
    return (
        <>
            <p>Verify Proof:</p>
            {
                isGenerating ?
                    <p>Verifying...</p>
                    :
                    data != undefined ?
                        <>
                            <p>Verified as: {`${data}`}</p>
                            <p>Verification time: {formatTime(time)}s</p>
                        </>
                        :
                        <button onClick={generateVerify}>Verify</button>
            }
        </>

    )
}
