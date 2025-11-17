export type CardData = {
    _id: number;
    artist: string;
    cmc: number;
    collector_number: string;
    color_identity: string[];
    colors: string[];
    flavor_text: string;
    image_uris: { normal: string } | Array<{ normal: string }>;
    mana_cost: string;
    multifaced: boolean;
    name: string;
    oracle_text: string;
    rarity: string;
    released_at: string;
    scryfall_uri: string;
    set_name: string;
    similarity_id: number;
    type_line: string;
    uri: string;
}