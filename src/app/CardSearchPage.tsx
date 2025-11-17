'use client';
import { useState } from 'react';
import MultiCardDisplay from "./MultiCardDisplay";
import SearchGUI from "./SearchGUI"
import { fetchCards, type CardData } from "./fetch"
import { Filter } from "mongodb";


export default function CardSearchPage() {
    const [cards, setCards] = useState<CardData[]>([])

    async function handleSearch(pipeline: Filter<CardData>[]) {
        const res = await fetch("api/cards", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(pipeline)
        });

        const newCards = await res.json();
        setCards(newCards)
    }

    return (
        <div className = "flex">
            <SearchGUI onSearch={handleSearch} className="border-[5px] border-transparent w-96"/>
            <MultiCardDisplay cards={cards} className="flex-1" />
        </div>
    );
}