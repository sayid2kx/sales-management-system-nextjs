import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";
import Product from "@/app/models/product";
import { connectToMongoDB } from "@/lib/database";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { email: sellerEmail } = session.user;

  try {
    await connectToMongoDB();

    const products = await Product.find({ "seller.email": sellerEmail });

    if (!products.length) {
      return new Response(JSON.stringify({ message: "No Products Found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(products), { status: 200 });
  } catch (error) {
    console.error("Error retrieving products:", error);
    return new Response(
      JSON.stringify({ message: "Error retrieving products" }),
      { status: 500 }
    );
  }
}
