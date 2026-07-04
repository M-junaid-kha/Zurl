import clientPromise from "@/lib/mongodb";
import { auth } from "@clerk/nextjs/server";

export async function GET() {
  try {
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const client = await clientPromise;
    const db = client.db("zurl");
    const urls = db.collection("urls");

    const links = await urls
      .find({ userId })
      .sort({ _id: -1 })
      .toArray();

    return Response.json({
      success: true,
      links,
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: "Something went wrong",
      },
      { status: 500 }
    );
  }
}