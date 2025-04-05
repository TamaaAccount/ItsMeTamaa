import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);
const dbName = "miaw"; // Sesuai nama cluster lo
const collectionName = "messages"; // bebas

export default async function handler(req, res) {
  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    if (req.method === "POST") {
      const { nama, pesan } = req.body;
      if (!nama || !pesan) return res.status(400).json({ error: "Blank field" });

      await collection.insertOne({ nama, pesan, waktu: new Date() });
      return res.status(200).json({ status: "Successfully saved" });
    }

    if (req.method === "GET") {
      const data = await collection.find().sort({ waktu: -1 }).limit(10).toArray();
      return res.status(200).json(data);
    }

    res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}