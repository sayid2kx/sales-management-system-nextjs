"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

export default function SellsHistoryPage() {
  const { data: session } = useSession();
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    if (session) {
      fetchOrderDetails();
    }

    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [session]);

  const fetchOrderDetails = async () => {
    try {
      const res = await fetch("/api/seller/order");
      if (!res.ok) throw new Error("Failed to fetch order details");
      const data = await res.json();
      setOrderDetails(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!orderDetails || Object.keys(orderDetails).length === 0) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            No Orders Found
          </h2>
          <p className="text-gray-600">
            It looks like you haven't made any sales yet.
          </p>
        </div>
      </div>
    );
  }

  let overallTotalPrice = Object.values(orderDetails).reduce(
    (total, customerData) =>
      total +
      customerData.orders.reduce((sum, order) => sum + order.totalPrice, 0),
    0
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-300 to-blue-400 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-10 text-gray-800">
          Customer Orders
        </h1>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {Object.entries(orderDetails).map(
            ([customerEmail, customerData], index) => {
              const customerTotalPrice = customerData.orders.reduce(
                (total, order) => total + order.totalPrice,
                0
              );

              return (
                <div
                  key={index}
                  className="bg-white rounded-xl shadow-lg overflow-hidden transition-transform duration-300 hover:scale-105"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
                    <h3 className="text-xl font-bold text-white truncate">
                      {customerData.customer.customerFullname}
                    </h3>
                    <p className="text-sm text-blue-100">{customerEmail}</p>
                  </div>
                  <div className="p-4">
                    <p className="text-gray-600 mb-2">
                      📞 {customerData.customer.customerPhone}
                    </p>
                    <p className="text-gray-600 mb-4">
                      🏠 {customerData.customer.customerAddress}
                    </p>
                    <div className="border-t border-gray-200 pt-4">
                      <h4 className="font-semibold text-lg mb-2">Orders:</h4>
                      {customerData.orders.map((order, orderIndex) => (
                        <div
                          key={orderIndex}
                          className="mb-3 p-3 bg-gray-50 rounded-lg"
                        >
                          <p className="font-medium text-gray-800">
                            {order.product.title} - {order.quantity} pcs
                          </p>
                          <p className="text-sm text-gray-600">
                            💰 {order.totalPrice} BDT
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            {new Date(order.createdAt).toLocaleDateString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="bg-gray-100 p-4">
                    <p className="text-xl font-bold text-gray-800">
                      Total: {customerTotalPrice} BDT
                    </p>
                  </div>
                </div>
              );
            }
          )}
        </div>

        <div className="mt-12 bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Sales Summary
          </h2>
          <p className="text-2xl font-extrabold text-blue-600">
            Overall Total Sales: {overallTotalPrice} BDT
          </p>
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/seller/dashboard/sales-info"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white text-lg font-medium py-3 px-6 rounded-full transition-transform duration-300 hover:scale-105 hover:shadow-lg"
          >
            Back to Sales Info Page
          </Link>
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
}
