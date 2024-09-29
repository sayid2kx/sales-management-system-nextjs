"use client";
import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const AllProductsShowToCustomer = () => {
  const [products, setProducts] = useState([]);
  const [sortBy, setSortBy] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [category, setCategory] = useState(null);
  const [quantities, setQuantities] = useState({});
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

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

  const handleQuantityChange = (productId, value, maxQuantity) => {
    const quantity = Math.min(Math.max(1, value), maxQuantity);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const handleBuyNow = async (product) => {
    if (!session || !session.user?.email) {
      alert("Please log in to make a purchase.");
      return;
    }

    const quantity = quantities[product._id] || 1;
    try {
      const response = await fetch("/api/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId: product._id,
          quantity: quantity,
          customerEmail: session.user.email,
        }),
      });

      if (response.ok) {
        const { product: updatedProduct, order } = await response.json();
        setProducts((prevProducts) =>
          prevProducts.map((p) =>
            p._id === updatedProduct._id ? updatedProduct : p
          )
        );
        router.push(`/customer/dashboard/order-confirmation/${order._id}`);
      } else {
        const errorData = await response.json();
        if (errorData.message) {
          alert(`Order failed: ${errorData.message}`);
        } else {
          alert("Failed to place order. Please try again.");
        }
      }
    } catch (error) {
      console.error("Error:", error);
      if (error instanceof Error) {
        alert(`An error occurred: ${error.message}`);
      } else {
        alert("An unexpected error occurred. Please try again.");
      }
    }
  };

  if (products.length === 0) {
    return (
      <p className="text-center text-4xl mt-64 font-medium min-h-screen">
        No products found
      </p>
    );
  }

  return (
    <div className="p-16 min-h-screen bg-gradient-to-r from-green-400 via-teal-300 to-blue-400">
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
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col" // Add flex and flex-col
          >
            <Link href={`/customer/dashboard/${product._id}`} className="block">
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
            <div className="p-6 bg-gray-200 flex-grow">
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
                {product.pieces > 0 && (
                  <div className="grid grid-cols-1">
                    <p className="text-xl">Stock: {product.pieces} Items</p>
                    <div className="flex items-center mt-2">
                      <label
                        htmlFor={`quantity-${product._id}`}
                        className="text-xl mr-2"
                      >
                        Quantities:
                      </label>
                      <input
                        id={`quantity-${product._id}`}
                        type="number"
                        value={quantities[product._id] || 1}
                        min={1}
                        max={product.pieces}
                        onChange={(e) =>
                          handleQuantityChange(
                            product._id,
                            parseInt(e.target.value),
                            product.pieces
                          )
                        }
                        className="border rounded px-2 py-1 w-40"
                      />
                    </div>
                  </div>
                )}
                {product.pieces === 0 && (
                  <div className="flex justify-center mt-4 col-span-2 bg-gray-200 py-4">
                    <p className="text-center text-2xl w-60 h-10 text-red-600 border border-red-600 bg-red-100 rounded mx-auto px-4">
                      Stock Out
                    </p>
                  </div>
                )}
              </div>
              {product.pieces > 0 ? (
                <div className="flex justify-center mt-10">
                  <button
                    className="w-full h-12 px-3 py-1 bg-blue-500 text-white rounded"
                    onClick={() => handleBuyNow(product)}
                    disabled={!session}
                  >
                    {session ? "Buy Now" : "Log in to Buy"}
                  </button>
                </div>
              ) : null}
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
            width={30}
            height={30}
            className="rounded-full bg-white p-2 shadow-lg hover:bg-gray-200 transition"
          />
        </div>
      )}
    </div>
  );
};

export default AllProductsShowToCustomer;
