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
        setCurrentPage(pageNumber)
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const totalPages = Math.ceil(blotters.length / itemsPerPage);
    const visiblePages = 3;
    const firstVisiblePage = Math.max(1, currentPage - Math.floor(visiblePages / 2));
    const lastVisiblePage = Math.min(totalPages, firstVisiblePage + visiblePages - 1);

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

            <div className="pagination flex justify-center mt-8 p-8 rounded-md drop-shadow-xl bg-white w-fit m-auto">
                {currentPage !== 1 && (
                    <button
                        onClick={() => paginate(1)}
                        className={`px-4 py-2 mx-1 $ bg-accent-2 text-white rounded-md drop-shadow-xl hover:bg-accent-dark`}
                    >
                        First
                    </button>
                )}

                {Array.from({ length: lastVisiblePage - firstVisiblePage + 1 }).map((_, index) => {
                    const pageNumber = firstVisiblePage + index;
                    return (
                        <button
                            key={index}
                            onClick={() => paginate(pageNumber)}
                            className={`px-4 py-2 mx-1 ${currentPage === pageNumber ? 'bg-accent  text-white' : 'bg-accent-white text-accent border border-accent hover:text-white'} rounded-md drop-shadow-xl hover:bg-accent-dark`}
                        >
                            {pageNumber}
                        </button>
                    );
                })}
                {currentPage !== totalPages && (

                    <button
                        onClick={() => paginate(totalPages)}
                        className={`px-4 py-2 mx-1 text-white bg-accent-2 rounded-md drop-shadow-xl hover:bg-accent-dark`}
                    >
                        Last
                    </button>
                )}
            </div>
        </div>
    );
}