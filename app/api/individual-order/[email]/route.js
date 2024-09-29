import { NextResponse } from "next/server";
import Order from "@/app/models/order";
import { connectToMongoDB } from "@/lib/database";

export async function GET(request, { params }) {
  const { email } = params;

  try {
    await connectToMongoDB();
    const orders = await Order.find({ customerEmail: email });

    if (!orders || orders.length === 0) {
      return NextResponse.json({ message: "No orders found" }, { status: 404 });
    }

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching orders" },
      { status: 500 }
    );
  }
}
