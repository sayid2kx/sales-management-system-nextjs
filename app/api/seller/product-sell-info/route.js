import { getServerSession } from "next-auth/next";
import { connectToMongoDB } from "@/lib/database";
import Order from "@/app/models/order";

export async function GET(req) {
  const session = await getServerSession();

  if (!session) {
    return new Response(JSON.stringify({ message: "Unauthorized" }), {
      status: 401,
    });
  }

  const { email: sellerEmail } = session.user;

  try {
    await connectToMongoDB();

    const orders = await Order.find({ sellerEmail });

    if (orders.length === 0) {
      return new Response(JSON.stringify({ message: "No Orders Found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(orders), { status: 200 });
  } catch (error) {
    console.error("Error retrieving orders:", error);
    return new Response(
      JSON.stringify({ message: "Error retrieving orders", error }),
      { status: 500 }
    );
  }
}
