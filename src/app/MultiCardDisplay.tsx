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

    if (!cards || !Array.isArray(cards)) return <div>Loading...</div>;
    // const cardArr = await cards
    console.log(Array.isArray(cards), cards);
    return (
        <div>
            {
            cards.map((card) => (
                <Card 
                    key = {card["_id"]}
                    img = {card["image_uris"]["normal"]} 
                    name = {card["name"]}
                />
            ))
            }
        </div>
    );
}
