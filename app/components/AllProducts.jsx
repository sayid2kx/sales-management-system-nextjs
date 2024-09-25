"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AllProductsShow = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async (sort = null, order = "asc", cat = null) => {
    try {
      let url = "/api/products";
      const params = new URLSearchParams();
      if (sort) params.append("sortBy", sort);
      if (order) params.append("order", order);
      if (cat) params.append("category", cat);
      if (params.toString()) url += `?${params.toString()}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      } else {
        console.error("Error fetching products", res.status);
      }
    } catch (error) {
      console.error("Failed to fetch products:", error);
    }
  };

  const handleSort = (field) => {
    let newOrder = "asc";
    if (field === sortBy) {
      newOrder = sortOrder === "asc" ? "desc" : "asc";
    }
    setSortBy(field);
    setSortOrder(newOrder);
    fetchProducts(field, newOrder, category);
  };

  const handleCategoryFilter = (cat) => {
    setCategory(cat === category ? null : cat);
    fetchProducts(sortBy, sortOrder, cat === category ? null : cat);
  };

  if (products.length === 0) {
    return <p className="text-center text-xl mt-4">No products found</p>;
  }

  return (
    <div className="p-4 min-h-screen bg-green-600">
      <div className="mb-4 space-x-2">
        <button
          onClick={() => handleSort("price")}
          className="px-3 py-1 bg-blue-500 text-white rounded"
        >
          Sort by Price{" "}
          {sortBy === "price" &&
            (sortOrder === "asc" ? "(Low to High)" : "(High to Low)")}
        </button>
        <button
          onClick={() => handleCategoryFilter("Mobile")}
          className={`px-3 py-1 ${
            category === "Mobile" ? "bg-sky-600" : "bg-gray-400"
          } text-white rounded`}
        >
          Mobiles
        </button>
        <button
          onClick={() => handleCategoryFilter("Desktop PC")}
          className={`px-3 py-1 ${
            category === "Desktop PC" ? "bg-sky-600" : "bg-gray-400"
          } text-white rounded`}
        >
          Desktop PC
        </button>
        <button
          onClick={() => handleCategoryFilter("Laptop")}
          className={`px-3 py-1 ${
            category === "Laptop" ? "bg-sky-600" : "bg-gray-400"
          } text-white rounded`}
        >
          Laptops
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden"
          >
            <Link href={`/products/${product._id}`} className="block">
              <div className="relative h-60 md:h-72">
                {product.image ? (
                  <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-contain"
                  />
                ) : (
                  <div className="bg-gray-200 w-full h-full"></div>
                )}
              </div>
            </Link>
            <div className="p-6 bg-gray-200">
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                {product.title}
              </h2>
              <p className="text-lg text-gray-600 mb-4">
                {product.category} -{" "}
                <span className="font-semibold">
                  {product.price.toLocaleString()} BDT
                </span>
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-700">
                <p className="text-xl">Stock: {product.pieces} Items</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllProductsShow;
