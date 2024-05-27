/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable prettier/prettier */
/* eslint-disable no-undef */
const {MongoClient} = require("mongodb");
require('dotenv').config({path: './config.env'});

async function main() {
    const Db = process.env.ATLAS_URI;
    const client = new MongoClient(Db);
    try {
        console.log("connect");
        await client.connect();
        console.log("connected");
        const collections = await client.db('MppDB').collections();
        collections.forEach((collection) =>
            console.log(collection.s.namespace.collection),
        );
    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
    
}
main();
