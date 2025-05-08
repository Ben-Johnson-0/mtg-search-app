'use server';
import { MongoClient, Filter } from "mongodb";

// Config
const mongoIP = "192.168.1.75";
const mongoPort = 27017;
const username = "viewer";
const password = "simViewer2";
const authDb = "mtg";
const targetDb = "mtg";
const collectionName = "similarity";

// Card Data prototype
export type CardData = {
  _id: number;
  artist: string;
  cmc: number;
  collector_number: string;
  color_identity: string[];
  colors: string[];
  flavor_text: string;
  image_uris: {normal: string};
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

// Connection URI
const uri = `mongodb://${username}:${password}@${mongoIP}:${mongoPort}/?authSource=${authDb}`;

export async function fetchCards(query: Filter<CardData>) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(targetDb);
    const collection = db.collection<CardData>(collectionName);
    const doc = await collection.find(query).toArray();
    return doc;

  } catch (err) {
    console.error("MongoDB error:", err);
  } finally {
    await client.close();
  }

  console.log("Failed to retrieve any documents.");
  return [];
}