import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";
import { connectToMongoDB } from "@/lib/database";
import Product from "@/app/models/product";

export async function POST(request) {
  try {
    await connectToMongoDB();
    const formDataValue = await request.formData();

    const image = formDataValue.get("image");
    if (!image) {
      return NextResponse.json(
        { success: false, message: "No image uploaded" },
        { status: 400 }
      );
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const imageName = `${Date.now()}_${image.name}`;
    const imagePath = path.join(
      process.cwd(),
      "public",
      "uploads",
      "products",
      imageName
    );

    await writeFile(imagePath, buffer);
    const imageUrl = `/uploads/products/${imageName}`;

    const product = {
      title: formDataValue.get("title"),
      category: formDataValue.get("category"),
      description: formDataValue.get("description"),
      price: Number(formDataValue.get("price")),
      pieces: Number(formDataValue.get("pieces")),
      image: imageUrl,
    };

    const newProduct = new Product(product);
    await newProduct.save();

    return NextResponse.json(
      { success: true, message: "Product added successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error adding product:", error);
    return NextResponse.json(
      { success: false, message: `Error adding product: ${error.message}` },
      { status: 500 }
    );
  }
}
