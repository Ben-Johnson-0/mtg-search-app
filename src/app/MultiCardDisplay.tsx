'use client';
import { useEffect, useState } from 'react';
import Card from "./Card";
import { type CardData } from "./fetch";

/*
 * Display widget for a group of cards
 */
export default function MultiCardDisplay({ cards, className }: { cards:Array<CardData>, className:string }) {
    const [page_num, setPageNum] = useState(0)
    const page_length: number = 60;
    useEffect(() => {setPageNum(0);}, [cards]);     // Reset page number on cards change
    useEffect(() => { window.scrollTo(0, 0);}, [page_num]);     // Reset scroll on page_num change
    const max_pages: number = Math.ceil(cards.length / page_length);

    return (
        <div className={className}>
            <div className="text-center text-2xl font-bold">
                <h1>{cards.length} Results</h1>
                <h1>Page {page_num+1} of {max_pages}</h1>
            </div>
            <div className="flex items-center justify-center">
                <button onClick={() => setPageNum(page_num - 1)} disabled={page_num === 0}>Prev</button>
                <button onClick={() => setPageNum(page_num + 1)} disabled={page_num >= max_pages-1}>Next</button>
            </div>
            <div className="flex-1 flex justify-left">
                <div className="grid grid-cols-[repeat(auto-fit,_minmax(220px,_1fr))] xl:grid-cols-5 w-full">
            {
                cards.slice(page_num * page_length, (page_num + 1) * page_length).map((card) => (
                <Card 
                    key = {card._id}
                    card = {card}
                />
            ))
            }
                </div>
            </div>
            <br/>
            <div className="flex items-center justify-center">
                <button onClick={() => setPageNum(page_num - 1)} disabled={page_num === 0}>Prev</button>
                <button onClick={() => setPageNum(page_num + 1)} disabled={page_num >= max_pages - 1}>Next</button>
            </div>
            <br/>
        </div>
    );
}
