"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const CustomerOrders = () => {
  const { data: session, status } = useSession();
  const [orders, setOrders] = useState([]);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    if (session?.user?.email) {
      fetchOrders();
    }
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollToTop(true);
      } else {
        setShowScrollToTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [session]);

  const fetchOrders = async () => {
    try {
      const res = await fetch(`/api/individual-order/${session.user.email}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data);
      } else {
        console.error("Error fetching orders:", res.status);
      }
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (status === "loading") {
    return <p className="text-center mt-64 text-2xl">Loading...</p>;
  }

  if (status === "unauthenticated") {
    return (
      <p className="text-center mt-64 text-2xl">
        Please log in to view your orders.
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p className="text-center text-3xl mt-64 font-medium">No orders found</p>
    );
  }

  const totalAmount = orders.reduce((sum, order) => sum + order.totalPrice, 0);

  return (
    <div className="p-16 bg-gradient-to-r from-green-400 via-teal-300 to-blue-400">
      <h1 className="text-4xl font-bold text-center mb-10">Orders History</h1>
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-lg shadow-lg space-y-8">
        {orders.map((order) => (
          <div
            key={order._id}
            className="flex justify-between border-b-4 border-sky-200 pb-4"
          >
            <div className="flex items-center">
              <div className="relative h-40 w-40">
                <Image
                  src={order.product.image}
                  alt={order.product.title}
                  fill
                  className="object-contain"
                />
              </div>
              <div className="ml-6">
                <h2 className="text-xl md:text-2xl font-bold">
                  {order.product.title}
                </h2>
                <p className="text-sm md:text-lg text-gray-800">
                  {order.product.category}
                </p>
                <p className="text-sm md:text-lg text-gray-800">
                  Quantity: {order.quantity}
                </p>
                <p className="text-sm md:text-lg font-medium text-gray-800">
                  Price: {order.product.price.toLocaleString()} BDT
                </p>
                <p className="text-sm md:text-base font-medium">
                  Total Price: {order.totalPrice.toLocaleString()} BDT
                </p>
                <p className="text-sm md:text-base text-gray-500">
                  Ordered on: {new Date(order.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        ))}

        <div className="text-right">
          <p className="text-xl font-bold text-gray-800 mt-6">
            Total Amount: {totalAmount.toLocaleString()} BDT
          </p>
        </div>
      </div>
      {showScrollToTop && (
        <div
          className="fixed bottom-20 right-5 cursor-pointer z-50"
          onClick={handleScrollToTop}
        >
          <Image
            src="/images/back-to-top.svg"
            alt="Back to Top"
            width={35}
            height={35}
            className="rounded-full bg-white p-2 shadow-lg hover:bg-gray-200 transition"
          />
        </div>
      )}
    </div>
  );
};

export default CustomerOrders;
