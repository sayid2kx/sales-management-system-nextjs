import { connectToMongoDB } from "@/lib/database";
import Order from "@/app/models/order";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { orderId } = params;

  try {
    await connectToMongoDB();
    const order = await Order.findById(orderId);

    if (!order) {
      return NextResponse.json({ message: "Order not found" }, { status: 404 });
    }

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Failed to fetch order", error: error.message },
      { status: 500 }
    );
  }
}
