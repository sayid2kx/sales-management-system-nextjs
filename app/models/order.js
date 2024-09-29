import mongoose, { Schema, models } from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    product: {
      title: { type: String, required: true },
      category: { type: String, required: true },
      description: { type: String, required: true },
      price: { type: Number, required: true },
      image: { type: String, required: true },
    },
    quantity: { type: Number, required: true, min: 1 },
    totalPrice: { type: Number, required: true },
    customerEmail: { type: String, required: true },
    sellerEmail: { type: String, required: true },
    customer: {
      customerFullname: { type: String, required: true },
      customerPhone: { type: String, required: true },
      customerAddress: { type: String, required: true },
    },
  },
  { timestamps: true }
);

const Order = mongoose.models.Order || mongoose.model("Order", OrderSchema);
export default Order;
