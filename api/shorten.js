import { MongoClient } from "mongodb";
import { nanoid } from "nanoid";

const client = new MongoClient(process.env.MONGODB_URI);
const dbName = "miaw"; // Sesuaikan nama DB lo
const collectionName = "shortlinks";

export default async function handler(req, res) {
  if (req.method !== "POST") return res.status(405).json({ error: "Only POST allowed" });

  const { url } = req.body;
  if (!url) return res.status(400).json({ error: "URL kosong" });

  const shortId = nanoid(6);

  try {
    await client.connect();
    const db = client.db(dbName);
    const col = db.collection(collectionName);

    await col.insertOne({ shortId, url, created: new Date() });

    const domain = req.headers.host;
    res.status(200).json({ shortlink: `https://${domain}/${shortId}` });
  } catch (err) {
    res.status(500).json({ error: err.message });
  } finally {
    await client.close();
  }
}