import { connectToMongoDB } from "@/lib/database";
import Product from "@/app/models/product";

export async function GET(request) {
  await connectToMongoDB();

  const { searchParams } = new URL(request.url);
  const sortBy = searchParams.get("sortBy");
  const order = searchParams.get("order");
  const category = searchParams.get("category");

  try {
    let query = Product.find();

    if (category) {
      query = query.where("category").equals(category);
    }

    if (sortBy && order) {
      const sortOrder = order === "asc" ? 1 : -1;
      query = query.sort({ [sortBy]: sortOrder });
    }

    const products = await query.exec();

    if (products.length === 0) {
      return new Response(JSON.stringify({ message: "No products found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(products), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
