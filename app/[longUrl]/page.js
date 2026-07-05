import { redirect, notFound } from "next/navigation";
import clientPromise from "@/lib/mongodb";

export default async function Page({ params }) {
  const { longUrl } = await params;

  const client = await clientPromise;
  const db = client.db("zurl");
  const urls = db.collection("urls");

  const existing = await urls.findOne({
    customAlias: longUrl,
  });

  if (!existing) {
    notFound();
  }

  // Increase click count by 1
  await urls.updateOne(
    { customAlias: longUrl },
    {
      $inc: {
        clicks: 1,
      },
    }
  );

  redirect(existing.longUrl);
}