'use client'

import { useState } from 'react';

interface Blotter {
    id: number;
    created_at: string;
    text: string;
}

interface BlotterContainerProps {
    blotters: Blotter[];
}

export default function BlotterContainer({ blotters }: BlotterContainerProps) {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    const formatedDate = (date: string) => {
        const formattedDate = new Date(date).toDateString();
        const formattedTime = new Date(date).toLocaleTimeString();
        return `${formattedDate}, ${formattedTime}`;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentBlotters = blotters.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber: number) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        setCurrentPage(pageNumber)
    };

    return (
        <div className="">
            {currentBlotters.map((blotter: Blotter) => (
                <div
                    className={`p-8 my-8 first-of-type:mt-0 text-white rounded-md drop-shadow-xl bg-accent-${Math.floor(Math.random() * 4) + 2
                        }`}
                    key={blotter.id}
                >
                    <div className="flex text-lg pb-4">{formatedDate(blotter.created_at)}</div>
                    <div className="flex pb-4">***</div>
                    <p>{blotter.text}</p>
                    <div className="flex pt-4">***</div>
                </div>
            ))}

            <div className="pagination flex justify-center mt-8">
                {Array.from({ length: Math.ceil(blotters.length / itemsPerPage) }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={`px-4 py-2 mx-1 text-white ${currentPage == index + 1 ? 'bg-accent' : 'bg-accent-white text-accent border border-accent hover:text-white'} rounded-md drop-shadow-xl hover:bg-accent-dark focus:outline-none focus:bg-accent-dark`}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
}