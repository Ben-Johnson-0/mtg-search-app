import { NextResponse } from "next/server";
import { Filter } from "mongodb";
import type { CardData } from "@/types/card";
import client from "@/lib/mongodb";



// ---- API ROUTE ----
export async function POST(request: Request) {
    try {
        const pipeline = await request.json() as Filter<CardData>[];

        await client.connect();
        const db = client.db(process.env.MONGO_TARGET_DB!);
        const collection = db.collection<CardData>(process.env.MONGO_COLLECTION!);

        const results = await collection.aggregate<CardData>(pipeline).toArray();

        return NextResponse.json(results);

    } catch (err: unknown) {
        console.error("MongoDB error:", err);
        const message = err instanceof Error ? err.message : "Unknown error";
        return NextResponse.json({ error: message }, { status: 500 });
    }
}
