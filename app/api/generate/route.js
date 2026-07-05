import clientPromise from "@/lib/mongodb";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ObjectId } from "mongodb";

export async function POST(request) {
  try {
    
   const { userId } = await auth();

const currentUserId = userId ?? "0000";
   
    const user = await currentUser();
    const username = user?.fullName || "Unknown User";

    
    const body = await request.json();

    const { longUrl, customAlias } = body;

    // Validate input
    if (!longUrl ) {
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
      userId: currentUserId,
      username,
      clicks: 0,
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



















export async function DELETE(request) {
  try {
    const { userId } = await auth();

    const currentUserId = userId ?? "0000";

    const { id } = await request.json();

    const client = await clientPromise;
    const db = client.db("zurl");
    const urls = db.collection("urls");

    const result = await urls.deleteOne({
      _id: new ObjectId(id),
      userId: currentUserId,
    });

    if (result.deletedCount === 0) {
      return Response.json(
        {
          success: false,
          message: "URL not found.",
        },
        { status: 404 }
      );
    }

    return Response.json({
      success: true,
      message: "URL deleted successfully.",
    });
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        success: false,
        message: error.message,
      },
      { status: 500 }
    );
  }
}