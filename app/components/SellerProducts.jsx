"use client";

import { useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SellerProducts() {
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
      const res = await fetch("/api/seller/my-product");

      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error("Failed to fetch products:", await res.json());
      }
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center text-xl font-medium">Loading...</div>;
  }

  if (!products.length) {
    return (
      <div className="text-base p-20 text-center md:text-4xl md:p-32 font-medium">
        No Products Found
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-20">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="border border-gray-200 rounded-lg shadow-lg p-6 bg-gray-200 hover:shadow-xl transition-shadow w-full"
          >
            <Image
              src={product.image}
              alt={product.title}
              width={400}
              height={400}
              className="w-full h-72 object-contain rounded-md mb-4"
            />
            <h2 className="text-2xl font-semibold mb-3">{product.title}</h2>
            <p className="text-gray-700 mb-3">{product.category}</p>
            <p className="text-gray-900 font-bold mb-2">
              Price: {product.price} BDT
            </p>
            <p className="text-black">Available: {product.pieces} Items</p>
          </div>
        ))}
      </div>
    </div>
  );
}
