import { connectToMongoDB } from "@/lib/database";
import Admin from "@/app/models/admin";
import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const { fullname, username, email, phone, password, address, gender } =
      Object.fromEntries(formData);
    const image = formData.get("image");

    if (
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
        "admin",
        imageName
      );
      await writeFile(imagePath, buffer);
      imagePath = `/uploads/admin/${imageName}`;
    }

    await Admin.create({
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
      { message: "Buyer registered successfully." },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "An error occurred while registering the buyer." },
      { status: 500 }
    );
  }
}
