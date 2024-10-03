import { getServerSession } from "next-auth/next";
import Order from "@/app/models/order";
import { connectToMongoDB } from "@/lib/database";

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

    const customerMap = new Map();

    for (const order of orders) {
      const { customerFullname } = order.customer;
      const totalPrice = order.totalPrice;

      if (customerMap.has(customerFullname)) {
        customerMap.set(
          customerFullname,
          customerMap.get(customerFullname) + totalPrice
        );
      } else {
        customerMap.set(customerFullname, totalPrice);
      }
    }

    const customers = Array.from(customerMap, ([fullname, totalPurchase]) => ({
      customerFullname: fullname,
      totalPurchase,
    }));

    if (customers.length === 0) {
      return new Response(JSON.stringify({ message: "No Customers Found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(customers), { status: 200 });
  } catch (error) {
    console.error("Error retrieving customers:", error);
    return new Response(
      JSON.stringify({ message: "Error retrieving customers", error }),
      { status: 500 }
    );
  }
}
