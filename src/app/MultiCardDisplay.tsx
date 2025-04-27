'use client';
import Card from "./Card"

type CardData = {
    _id: number;
    image_uris: {normal:string};
    name: string;
}

/*
 * Display widget for a group of cards
 */
export default function MultiCardDisplay({ cards }: { cards:Array<CardData> }) {
    let page_num:number = 0;
    const page_length = 60;

    if (!cards || !Array.isArray(cards)) return <div>Loading...</div>;
    console.log("Cards", cards)
    console.log("Cards.length", cards.length)

    return (
        <div>
            <h1>{cards.length} Results</h1>
            <h1>Page {page_num+1} of {Math.ceil(cards.length / page_length)}</h1>
            <button onClick={(e) => page_num++}>Next</button>
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
