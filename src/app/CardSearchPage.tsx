'use client';
import { useState } from 'react';
import MultiCardDisplay from "./MultiCardDisplay";
import SearchGUI from "./SearchGUI"
import { fetchCards, type CardData } from "./fetch"
import { Filter } from "mongodb";


export default function CardSearchPage() {
    const [cards, setCards] = useState<CardData[]>([])

    async function handleSearch(query: Filter<CardData>) {
        const new_cards: CardData[] = await fetchCards(query);
        setCards(new_cards)
    }

    return (
        <div className = "flex">
            <SearchGUI onSearch={handleSearch} className="border-[5px] border-transparent w-96"/>
            <MultiCardDisplay cards={cards} className="flex-1" />
        </div>
    );
}