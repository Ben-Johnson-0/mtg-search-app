import { useState } from "react";
import { type CardData } from "./fetch"

export default function Card({card}: {card:CardData}) {

    // Placeholder Image
    let img: string = "https://cards.scryfall.io/large/front/a/3/a3da3387-454c-4c09-b78f-6fcc36c426ce.jpg"
    const [imgIdx, setImgIdx] = useState(0);
    
    if ( Array.isArray(card.image_uris) ) {
        img = card.image_uris[imgIdx].normal
    } else {
        img = card.image_uris.normal
    }
    const [currentImage, setCurrentImage] = useState<string>(img);
    
    // Flip to a Secondary cardface
    function flip() {
        if (!Array.isArray(card.image_uris))
            return;

        const nextIdx = (imgIdx + 1) % card.image_uris.length
        setImgIdx(nextIdx)
        setCurrentImage(card.image_uris[nextIdx].normal)
    }

    return (
        <div className="relative inline-block min-w-[220px] min-h-[300px]">
            <img 
                src={currentImage}
                alt={card.name}
                className="rounded-[21px] w-full h-auto"
            />
            {Array.isArray(card.image_uris) ? ( 
             <button
                onClick={flip}
                className="absolute top-10 right-2 bg-white bg-opacity-70 p-1 rounded-full shadow"
             >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3" />
                </svg>
            </button>) : null}
        </div>
    );
}
