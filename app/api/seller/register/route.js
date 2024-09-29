import { connectToMongoDB } from "@/lib/database";
import Seller from "@/app/models/seller";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const {
      shopname,
      fullname,
      username,
      email,
      phone,
      password,
      address,
      gender,
    } = Object.fromEntries(formData);
    const image = formData.get("image");

    if (
      !shopname ||
      !fullname ||
      !username ||
      !email ||
      !phone ||
      !password ||
      !address ||
      !gender
    ) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 }
      );
    }

    await connectToMongoDB();

    const hashedPassword = await bcrypt.hash(password, 10);

    let imagePath = null;
    if (image) {
      const bytes = await image.arrayBuffer();
      const buffer = Buffer.from(bytes);

      const imageName = `${Date.now()}_${image.name}`;
      imagePath = path.join(
        process.cwd(),
        "public",
        "uploads",
        "seller",
        imageName
      );
      await writeFile(imagePath, buffer);
      imagePath = `/uploads/seller/${imageName}`;
    }

    await Seller.create({
      shopname,
      fullname,
      username,
      email,
      phone,
      password: hashedPassword,
      address,
      gender,
      image: imagePath,
    });

    return NextResponse.json(
      { message: "Seller registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the seller." },
      { status: 500 }
    );
  }
}
