import * as React from 'react';

const formatForDisplay = (data: string) => {
    return data.slice(1, 50) + "... \"}\"";
};

interface NovaPublicParamsProps {
    data: string;
    generateParams: () => Promise<void>;
}

export const NovaGenerateParams: React.FC<NovaPublicParamsProps> = ({ data, generateParams }) => {
    return (
        <>
            <p>Generate Public params:</p>
            <button onClick={generateParams}>Parametrize</button>
            {
                data ?
                    <p>Public params: {formatForDisplay(data)}</p> : <></>
            }
        </>
    )
};

interface NovaGenerateProofProps {
    data: string;
    generateProof: () => Promise<void>;
}

export const NovaGenerateProof: React.FC<NovaGenerateProofProps> = ({ data, generateProof }) => {
    return (
        <>
            <p>Generate Proof:</p>
            <button onClick={generateProof}>Prove</button>
            {
                data ?
                    <p>Proof: {formatForDisplay(data)}</p> : <></>
            }
        </>
    )
}

interface NovaVerifyProps {
    data: boolean | undefined;
    generateVerify: () => Promise<void>;
}

export const NovaVerify: React.FC<NovaVerifyProps> = ({ data, generateVerify }) => {
    return (
        <>
            <p>Verify Proof:</p>
            <button onClick={generateVerify}>Verify</button>
            {
                data != undefined ?
                    <p>Verified as: {`${data}`}</p> : <></>
            }
        </>

    )
}
