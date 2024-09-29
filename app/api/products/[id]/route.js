import { NextResponse } from "next/server";
import Product from "@/app/models/product";
import { connectToMongoDB } from "@/lib/database";

export async function GET(request, { params }) {
  try {
    await connectToMongoDB();
    const product = await Product.findById(params.id);

    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching product details" },
      { status: 500 }
    );
  }
}
