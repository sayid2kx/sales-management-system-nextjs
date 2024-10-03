"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function CustomerInfo() {
  const { data: session } = useSession();
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchCustomers();
    }
  }, [session]);

  const fetchCustomers = async () => {
    try {
      const res = await fetch("/api/seller/product-sell-info/customer-info");

      if (!res.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await res.json();
      console.log("Fetched customer data:", data);

      if (Array.isArray(data)) {
        setCustomers(data);
      } else {
        console.error("Expected an array but got:", data);
        setCustomers([]);
      }
    } catch (error) {
      console.error("Fetch error:", error);
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-black text-xl font-medium mt-5">
        Loading...
      </div>
    );
  }

  if (customers.length === 0) {
    return (
      <div className="text-base p-20 text-center md:text-4xl md:p-32 font-medium">
        No Customers Found
      </div>
    );
  }

  return (
    <div className="p-5 min-h-screen">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl overflow-hidden">
          <div className="flex flex-col border border-gray-200">
            <h2 className="text-4xl font-bold text-center text-white py-8 bg-gradient-to-r from-cyan-400 to-blue-500">
              Customer Info
            </h2>
            <div className="flex justify-between items-center font-semibold text-gray-700 border-b border-gray-300 px-6 py-4 bg-gray-100">
              <span className="text-lg">Customer Name</span>
              <span className="text-lg">Total Purchases (BDT)</span>
            </div>
            <div className="divide-y divide-gray-300 px-6 py-4 bg-gradient-to-r from-white to-gray-50">
              {customers.map((customer, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center py-3 px-4 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {customer.customerFullname}
                  </span>
                  <span className="text-base font-semibold text-gray-700">
                    {customer.totalPurchase} BDT
                  </span>
                </div>
              ))}
            </div>
            <div className="mt-4 font-bold text-lg text-center text-gray-800 p-4">
              Total Customers: {customers.length}
            </div>
            <div className="mt-3 mb-10 text-center">
              <Link
                href="/seller/dashboard/sales-info/details"
                className="text-gray-800 bg-green-200 hover:bg-green-400 text-lg font-medium py-2 px-4 rounded-full inline-block"
              >
                See full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
