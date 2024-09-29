import { NextResponse } from "next/server";
import Order from "@/app/models/order";
import { connectToMongoDB } from "@/lib/database";

export async function GET(request, { params }) {
  const { email } = params;
  const decodedEmail = decodeURIComponent(email);

  try {
    await connectToMongoDB();
    const orders = await Order.find({ customerEmail: decodedEmail }).populate(
      "product"
    );

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}
