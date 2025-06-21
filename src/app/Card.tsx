import { useState } from "react";
import { type CardData } from "./fetch"

export default function Card({card}: {card:CardData}) {
    console.log("Card Data: ", card);
    let img: string = "https://cards.scryfall.io/large/front/a/3/a3da3387-454c-4c09-b78f-6fcc36c426ce.jpg"
    if ( Array.isArray(card.image_uris) ) {
        img = card.image_uris[0].normal
        console.log(img)
    } else {
        img = card.image_uris.normal
    }
    const [currentImage, setCurrentImage] = useState<string>(img);
    
    return (
        <img src={currentImage} alt={card.name} className="rounded-[21px]" />
    );
}
