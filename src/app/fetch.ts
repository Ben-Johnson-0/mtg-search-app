'use server';
const { MongoClient } = require("mongodb");

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
  image_uris: { normal: string };
  name: string;
}

// Connection URI
const uri = `mongodb://${username}:${password}@${mongoIP}:${mongoPort}/?authSource=${authDb}`;

export async function fetchCards(query: Record<string, any>) {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(targetDb);
    const collection = db.collection(collectionName);

    const doc: Array<CardData> = await collection.find(query).toArray();
    return doc;

  } catch (err) {
    console.error("MongoDB error:", err);
  } finally {
    await client.close();
  }

  console.log("Failed to retrieve any documents.");
  return [];
}