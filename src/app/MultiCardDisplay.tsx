'use client';
import { useState } from 'react';
import Card from "./Card"
import { type CardData } from "./fetch"


/*
 * Display widget for a group of cards
 */
export default function MultiCardDisplay({ cards }: { cards:Array<CardData> }) {
    const [page_num, setPageNum] = useState(0)
    const page_length: number = 60;
    const max_pages: number = Math.ceil(cards.length / page_length);

    return (
        <div>
            <h1>{cards.length} Results</h1>
            <h1>Page {page_num+1} of {max_pages}</h1>
            <button onClick={() => setPageNum(page_num - 1)} disabled={page_num === 0}>Prev</button>
            <button onClick={() => setPageNum(page_num + 1)} disabled={page_num >= max_pages-1}>Next</button>
            {
                cards.slice(page_num * page_length, (page_num + 1) * page_length).map((card) => (
                <Card 
                    key = {card["_id"]}
                    img={card["image_uris"] ? (card["image_uris"]["normal"]) : ("https://cards.scryfall.io/large/front/a/3/a3da3387-454c-4c09-b78f-6fcc36c426ce.jpg")} 
                    name = {card["name"]}
                />
            ))
            }
        </div>
    );
}
