"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default function AvailableProducts() {
  const { data: session } = useSession();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetchProducts();
    }
  }, [session]);

  const fetchProducts = async () => {
    try {
      const res = await fetch(
        "/api/seller/product-sell-info/available-product"
      );

      const data = await res.json();
      setProducts(data);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center text-xl text-black font-medium mt-5">
        Loading...
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center text-xl mx-auto w-96 h-12 rounded-full py-2 bg-purple-400 text-white border-2 border-blue-200">
        No Products Available
      </div>
    );
  }

  return (
    <div className="p-5">
      <div className="max-w-4xl mx-auto">
        <div className="bg-gradient-to-r from-blue-50 to-white rounded-xl overflow-hidden">
          <div className="flex flex-col border border-gray-200">
            <h2 className="text-4xl font-bold text-center text-white py-8 bg-gradient-to-r from-cyan-400 to-blue-500">
              Available Products
            </h2>

            <div className="flex justify-between items-center font-semibold text-gray-700 border-b border-gray-300 px-6 py-4 bg-gray-50">
              <span className="text-lg">Product Name</span>
              <span className="text-lg">Available Products</span>
            </div>

            <div className="divide-y divide-gray-300 px-6 py-4 bg-gradient-to-r from-white to-gray-50">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex justify-between items-center py-3 px-4 rounded-lg bg-gray-50 hover:bg-gray-200 transition-colors"
                >
                  <span className="text-lg font-medium text-gray-800">
                    {product.title}
                  </span>
                  <span className="text-base font-semibold text-gray-700">
                    {product.pieces}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
