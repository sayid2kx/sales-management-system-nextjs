"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const SellerProfilePage = () => {
  const { data: session, status } = useSession();
  const [seller, setSeller] = useState(null);

  useEffect(() => {
    if (session?.user) {
      const fetchSellerData = async () => {
        try {
          const encodedEmail = encodeURIComponent(session.user.email);
          const res = await fetch(`/api/seller/profile/${encodedEmail}`);
          if (res.ok) {
            const data = await res.json();
            setSeller(data);
          } else {
            console.error("Error fetching seller data", res.status);
          }
        } catch (error) {
          console.error("Failed to fetch seller data:", error);
        }
      };

      fetchSellerData();
    }
  }, [session]);

  if (status === "loading") {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!seller) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-xl font-semibold text-gray-600 bg-white px-6 py-3 rounded-lg shadow-md">
          No seller data found
        </p>
      </div>
    );
  }

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white border border-cyan-300 rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="p-8">
          <div className="flex flex-col sm:flex-row items-center sm:items-start">
            {seller.image && (
              <div className="relative w-48 h-48 mb-6 sm:mb-0 sm:mr-8">
                <Image
                  src={seller.image}
                  alt={`${seller.fullname}'s profile picture`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-full border-4 border-blue-500 shadow-md transition-transform duration-300 hover:scale-105"
                />
              </div>
            )}
            <div className="text-center sm:text-left">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {seller.fullname}
              </h2>
              <p className="text-lg text-gray-600">{seller.email}</p>
            </div>
          </div>

          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-8">
            {[
              { label: "Username", value: seller.username },
              { label: "Phone", value: seller.phone },
              { label: "Address", value: seller.address },
              { label: "Gender", value: seller.gender },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg shadow-sm transition-all duration-300 hover:shadow-md"
              >
                <p className="text-gray-700 text-lg">
                  <span className="font-semibold text-blue-600">
                    {item.label}:
                  </span>{" "}
                  <span className="text-gray-800">{item.value}</span>
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfilePage;
