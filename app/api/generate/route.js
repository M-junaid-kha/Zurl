import clientPromise from "@/lib/mongodb";
import { auth, currentUser } from "@clerk/nextjs/server";

export async function POST(request) {
  try {
    
    const { userId } = await auth();

    if (!userId) {
      return Response.json(
        {
          success: false,
          message: "Unauthorized",
        },
       
      );
    }

   
    const user = await currentUser();
    const username = user?.fullName || "Unknown User";

    
    const body = await request.json();

    const { longUrl, customAlias } = body;

    // Validate input
    if (!longUrl || !customAlias) {
      return Response.json(
        {
          success: false,
          message: "Long URL is required.",
        },
        { status: 400 }
      );
    }

    
    const client = await clientPromise;
    const db = client.db("zurl");
    const urls = db.collection("urls");

    
    const existing = await urls.findOne({ customAlias });

    if (existing) {
      return Response.json(
        {
          success: false,
          message: "Custom alias already exists.",
        },
        { status: 409 }
      );
    }

    
    await urls.insertOne({
      longUrl,
      customAlias,
      shorturl: `${process.env.NEXT_PUBLIC_HOST}/${customAlias}`,
      userId,
      username,
      date: new Date().toISOString(),
    });

    return Response.json(
      {
        success: true,
        message: "Short URL generated successfully.",
        shortUrl: `${process.env.NEXT_PUBLIC_HOST}/${customAlias}`,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Generate API Error:", error);

    return Response.json(
      {
        success: false,
        message: error.message || "Internal Server Error",
      },
      { status: 500 }
    );
  }
}