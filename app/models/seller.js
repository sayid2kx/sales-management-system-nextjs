import mongoose, { Schema, models } from "mongoose";

const SellerSchema = new mongoose.Schema(
  {
    shopname: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Others"],
      required: true,
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

const Seller = mongoose.models.Seller || mongoose.model("Seller", SellerSchema);
export default Seller;
