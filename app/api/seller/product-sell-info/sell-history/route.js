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

  try {
    await connectToMongoDB();

    const orders = await Order.find({});

    const salesMap = new Map();

    let totalSalesAmount = 0;

    for (const order of orders) {
      const { title } = order.product;
      const totalPrice = order.totalPrice;

      if (salesMap.has(title)) {
        salesMap.set(title, salesMap.get(title) + totalPrice);
      } else {
        salesMap.set(title, totalPrice);
      }

      totalSalesAmount += totalPrice;
    }

    const salesHistory = Array.from(salesMap, ([productName, salesAmount]) => ({
      productName,
      salesAmount,
    }));

    return new Response(JSON.stringify({ salesHistory, totalSalesAmount }), {
      status: 200,
    });
  } catch (error) {
    console.error("Error retrieving sales history:", error);
    return new Response(
      JSON.stringify({ message: "Error retrieving sales history", error }),
      { status: 500 }
    );
  }
}
