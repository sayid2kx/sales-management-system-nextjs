import { NextResponse } from "next/server";
import { connectToMongoDB } from "@/lib/database";
import Product from "@/app/models/product";
import Order from "@/app/models/order";
import Customer from "@/app/models/customer";

export async function POST(request) {
  try {
    await connectToMongoDB();
    const { productId, quantity, customerEmail } = await request.json();

    console.log("Received order request:", {
      productId,
      quantity,
      customerEmail,
    });

    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { message: "Product not found" },
        { status: 404 }
      );
    }

    if (product.pieces < quantity) {
      return NextResponse.json(
        { message: "Insufficient stock" },
        { status: 400 }
      );
    }

    const customer = await Customer.findOne({ email: customerEmail });
    if (!customer) {
      return NextResponse.json(
        { message: "Customer not found" },
        { status: 404 }
      );
    }

    const totalPrice = product.price * quantity;

    const order = new Order({
      product: {
        title: product.title,
        category: product.category,
        description: product.description,
        price: product.price,
        image: product.image,
      },
      quantity: quantity,
      totalPrice: totalPrice,
      customerEmail: customer.email,
      customer: {
        customerFullname: customer.fullname,
        customerPhone: customer.phone,
        customerAddress: customer.address,
      },
      sellerEmail: product.seller.email,
    });

    await order.save();

    product.pieces -= quantity;
    await product.save();

    console.log("Order processed successfully:", order);

    return NextResponse.json({ product, order });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json(
      { message: "Server error: " + error.message },
      { status: 500 }
    );
  }
}
