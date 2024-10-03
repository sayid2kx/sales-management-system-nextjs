"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

const AllProductsShow = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState(null);
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    fetchProducts();

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

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
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
    return (
      <p className="text-base p-20 text-center md:text-4xl md:p-32 font-medium">
        No Products Found
      </p>
    );
  }

  return (
    <div className="p-10 bg-gradient-to-r from-green-400 via-teal-300 to-blue-400">
      <div className="mb-3 space-x-1 flex justify-center">
        <button
          onClick={() => handleSort("price")}
          className={`px-1 py-0.5 md:px-4 md:py-2 bg-blue-600 text-white text-xs md:text-sm rounded-full shadow-md hover:bg-blue-700 transition-transform transform hover:scale-105 ${
            sortBy === "price"
              ? "bg-blue-700 text-xs md:text-sm whitespace-nowrap"
              : ""
          }`}
        >
          Sort by Price{" "}
          {sortBy === "price" &&
            (sortOrder === "asc" ? "(Low to High)" : "(High to Low)")}
        </button>
        <button
          onClick={() => handleCategoryFilter("Mobile")}
          className={`px-1 py-0.5 md:px-3 md:py-1 rounded-full shadow-md transition-transform transform hover:scale-105 text-xs md:text-sm ${
            category === "Mobile" ? "bg-sky-600" : "bg-gray-500"
          } text-white`}
        >
          Mobiles
        </button>
        <button
          onClick={() => handleCategoryFilter("Desktop PC")}
          className={`px-1 py-0.5 md:px-3 md:py-1 rounded-full shadow-md transition-transform transform hover:scale-105 text-xs md:text-sm ${
            category === "Desktop PC" ? "bg-sky-600" : "bg-gray-500"
          } text-white`}
        >
          Desktop PC
        </button>
        <button
          onClick={() => handleCategoryFilter("Laptop")}
          className={`px-1 py-0.5 md:px-3 md:py-1 rounded-full shadow-md transition-transform transform hover:scale-105 text-xs md:text-sm ${
            category === "Laptop" ? "bg-sky-600" : "bg-gray-500"
          } text-white`}
        >
          Laptops
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300 overflow-hidden"
          >
            <Link
              href={`/seller/dashboard/products/${product._id}`}
              className="block"
            >
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
            <div className="p-6 bg-gray-100">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {product.title}
              </h2>
              <p className="text-lg text-gray-700 mb-4">
                {product.category} -{" "}
                <span className="font-semibold text-blue-600">
                  {product.price.toLocaleString()} BDT
                </span>
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm text-gray-800">
                {product.pieces > 0 ? (
                  <p className="text-xl">Stock: {product.pieces} Items</p>
                ) : (
                  <p className="text-xl text-red-500">Out of Stock</p>
                )}
              </div>
            </div>
          </div>
        ))}
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

export default AllProductsShow;
