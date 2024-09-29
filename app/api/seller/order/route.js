import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { connectToMongoDB } from "@/lib/database";
import Order from "@/app/models/order";

export async function GET(req) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
    });
  }

  const { email: sellerEmail } = session.user;

  try {
    await connectToMongoDB();

    const orders = await Order.find({ sellerEmail });

    if (!orders || orders.length === 0) {
      return new Response(
        JSON.stringify({ message: "No orders found for this seller." }),
        { status: 404 }
      );
    }

    const groupedOrders = orders.reduce((acc, order) => {
      if (!acc[order.customerEmail]) {
        acc[order.customerEmail] = {
          customer: order.customer,
          orders: [],
        };
      }
      acc[order.customerEmail].orders.push(order);
      return acc;
    }, {});

    return new Response(JSON.stringify(groupedOrders), { status: 200 });
  } catch (error) {
    console.error("Failed to fetch orders:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch orders" }), {
      status: 500,
    });
  }
}
