"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import FooterComp from "@/app/components/Footer";
import SellerNavabarComp from "@/app/components/SellerNavbar";

const ProductDetails = ({ params }) => {
  const [product, setProduct] = useState(null);
  const router = useRouter();
  const { id } = params;

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const res = await fetch(`/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data);
        } else {
          console.error("Error fetching product details", res.status);
        }
      } catch (error) {
        console.error("Failed to fetch product details:", error);
      }
    };

    if (id) {
      fetchProductDetails();
    }
  }, [id]);

  if (!product) {
    return <p className="text-center text-2xl mt-64 font-medium">Loading...</p>;
  }

  return (
    <div>
      <SellerNavabarComp />
      <div className="p-8 sm:p-16 min-h-screen bg-green-300">
        <div className="max-w-7xl mx-auto bg-white border rounded-lg shadow-lg p-8 space-y-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="relative w-full lg:w-1/2 h-96">
              {product.image ? (
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-contain rounded-lg"
                />
              ) : (
                <div className="bg-gray-200 w-full h-full rounded-lg"></div>
              )}
            </div>
            <div className="flex-1 space-y-4">
              <h1 className="text-3xl lg:text-5xl font-extrabold text-gray-800">
                {product.title}
              </h1>
              <p className="text-2xl lg:text-3xl font-semibold text-green-600">
                {product.price.toLocaleString()} BDT
              </p>
              <p className="text-base lg:text-lg text-gray-600">
                {product.description}
              </p>
              <p className="text-lg lg:text-xl font-medium text-gray-700">
                Category: {product.category}
              </p>
              {product.pieces > 0 ? (
                <p className="text-lg font-semibold text-green-500">
                  In Stock: {product.pieces}
                </p>
              ) : (
                <p className="text-lg font-semibold text-red-500">
                  Out of Stock
                </p>
              )}
            </div>
          </div>

          <div className="bg-gray-200 p-6 rounded-lg shadow-sm space-y-4">
            <h2 className="text-2xl font-bold text-gray-800">
              Seller Information
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">Shop Name</span>
                <span className="text-lg font-medium text-gray-900">
                  {product.seller?.shopname}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">Seller Name</span>
                <span className="text-lg font-medium text-gray-900">
                  {product.seller?.name}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">Email</span>
                <span className="text-lg font-medium text-gray-900">
                  {product.seller?.email}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">Phone</span>
                <span className="text-lg font-medium text-gray-900">
                  {product.seller?.phone}
                </span>
              </div>
              <div className="flex flex-col space-y-1">
                <span className="text-gray-600 font-semibold">Address</span>
                <span className="text-lg font-medium text-gray-900">
                  {product.seller?.address}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <FooterComp />
    </div>
  );
};

export default ProductDetails;
