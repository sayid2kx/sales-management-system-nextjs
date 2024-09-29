"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import FooterComp from "@/app/components/Footer";

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (orderId) {
      fetchOrderDetails();
    }
  }, [orderId]);

  const fetchOrderDetails = async () => {
    try {
      const response = await fetch(`/api/order/${orderId}`);
      if (response.ok) {
        const data = await response.json();
        setOrder(data);
      } else {
        console.error("Failed to fetch order details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  if (!order) {
    return (
      <div className="text-center text-4xl mt-64 font-medium min-h-screen">
        Loading...
      </div>
    );
  }

  return (
    <div>
      <header className="bg-[#ddddd4] shadow-md">
        <nav className="container mx-auto p-6">
          <div className="text-4xl font-bold text-center text-black hover:text-sky-600">
            Salesi
          </div>
        </nav>
      </header>
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-300 to-blue-400 flex flex-col justify-center items-center">
        <div className="bg-white p-12 w-[600px] text-center rounded-lg shadow-md">
          <div className="relative h-60 mb-4">
            <Image
              src={order.product.image}
              alt={order.product.title}
              layout="fill"
              objectFit="contain"
              className="rounded-lg"
            />
          </div>
          <h1 className="text-4xl font-bold mb-4">Order Confirmed!</h1>
          <p className="mb-2 font-medium">Order ID: {order._id}</p>
          <p className="mb-2 font-medium">Product: {order.product.title}</p>
          <p className="mb-2 font-medium">Quantity: {order.quantity}</p>
          <p className="mb-2 font-medium">Price: {order.product.price} BDT</p>
          <p className="mb-4 font-medium">
            Total Price: {order.totalPrice.toLocaleString()} BDT
          </p>
          <Link
            href="/customer/dashboard"
            className="text-blue-500 text-base text-center hover:underline"
          >
            Return to Dashboard
          </Link>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default OrderConfirmation;
