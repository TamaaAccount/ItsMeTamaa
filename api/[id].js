import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "miaw";
const collectionName = "shortlinks";

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection(collectionName);
    const data = await col.findOne({ shortId: id });

    if (!data) return res.status(404).send("Link tidak ditemukan.");

    res.writeHead(302, { Location: data.url });
    res.end();
  } catch (err) {
    res.status(500).send("Server error");
  } finally {
    await client.close();
  }
}