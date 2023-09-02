import * as React from 'react';
import { Button } from './Button';
import { NovaContainer } from './Containers';

const formatForDisplay = (data: string) => {
    return `${data.slice(1, 20)} [...] ${data.slice(data.length - 20, data.length - 1)}}`;
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
        <NovaContainer>
            <p>Generate Public Parameters:</p>
            {
                isGenerating ?
                    <p>Generating...</p>
                    :
                    data ?
                        <div className='flex flex-col space-y-1'>
                            <p>{formatForDisplay(`${data}`)}</p>
                            <p>Generation time: {formatTime(time)}s</p>
                        </div>
                        :
                        <Button text="Parametrize" onClick={generateParams} />
            }
        </NovaContainer>
    )
};

export const NovaGenerateProof: React.FC<NovaGenerateProofProps> = ({ data, isGenerating, generateProof, time }) => {
    return (
        <NovaContainer>
            <p>Generate Proof:</p>
            {
                isGenerating ?
                    <p>Generating...</p>
                    :
                    data ?
                        <>
                            <p>{formatForDisplay(`${data}`)}</p>
                            <p>Generation time: {formatTime(time)}s</p>
                            <p className='text-xs italic'>(~ {(300 / (time/1000)).toFixed(2)} signatures/second)</p>
                        </>
                        :
                        <Button text="Prove" onClick={generateProof} />
            }
        </NovaContainer>
    )
}

export const NovaVerify: React.FC<NovaVerifyProps> = ({ data, isGenerating, generateVerify, time }) => {
    return (
        <NovaContainer>
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
                        <Button text="Verify" onClick={generateVerify} />
            }
        </ NovaContainer>

    )
}
