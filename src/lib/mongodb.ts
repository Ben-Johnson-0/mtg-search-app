import { MongoClient } from "mongodb";

const uri = `mongodb://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@${process.env.MONGO_IP}:${process.env.MONGO_PORT}/?authSource=${process.env.MONGO_AUTH_DB}`;

const client = new MongoClient(uri);

export default client;
