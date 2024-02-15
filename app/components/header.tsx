import React from 'react';
import Image from 'next/image';
export default function Home() {
    return (
        <header className="bg-accent py-4 top-0 sticky z-10 drop-shadow-xl">
            <div className="container px-4 mx-auto flex items-center justify-between">
                <div className="text-white text-2xl font-bold">Baby Blotter 🚨</div>
                <Image alt='brought to you by fruit stripe' width={75} height={75} src='/yipes.png'/>
            </div>
        </header>
    );
};