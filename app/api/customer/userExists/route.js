import { connectToMongoDB } from "@/lib/database";
import { NextResponse } from "next/server";
import Customer from "@/app/models/customer";

export async function POST(req) {
  try {
    await connectToMongoDB();
    const { email, username } = await req.json();

    const user = await Customer.findOne({
      $or: [{ email }, { username }],
    }).select("_id email username");

    if (user) {
      console.log("User found: ", user);
      return NextResponse.json({ user });
    } else {
      return NextResponse.json(
        { message: "No user found with the provided email or username." },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("Error checking buyer existence:", error);
    return NextResponse.json(
      { message: "An error occurred while checking buyer existence." },
      { status: 500 }
    );
  }
}
