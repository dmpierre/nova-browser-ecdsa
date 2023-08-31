import * as React from 'react';

export const MainContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='flex justify-center'>
            <div className='flex flex-col mt-10 space-y-4'>
                {children}
            </div>
        </div>
    )
}

export const MainNovaContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className="m-10 text-clip text-center space-y-5">
            {children}
        </div>
    )
}

export const NovaContainer: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div className='space-y-1'>
            {children}
        </div>
    )
}