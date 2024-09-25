"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AddProductForm() {
  const [formData, setFormData] = useState({
    title: "",
    category: "Mobile",
    description: "",
    price: "",
    pieces: "",
    image: null,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: name === "image" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const formDataToSend = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        formDataToSend.append(key, value);
      });

      const response = await fetch("/api/admin/addproduct", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        router.push("/admin/dashboard");
      } else {
        const error = await response.json();
        setError(error.message);
      }
    } catch (err) {
      setError("An error occurred while adding the product.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-green-500 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Add Product
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Title
            </label>
            <input
              name="title"
              onChange={handleChange}
              type="text"
              placeholder="Product Title"
              required
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.title}
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              required
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
            >
              <option value="Mobile">Mobile</option>
              <option value="Desktop PC">Desktop PC</option>
              <option value="Laptop">Laptop</option>
            </select>
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Description
            </label>
            <textarea
              name="description"
              onChange={handleChange}
              placeholder="Product Description"
              required
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.description}
              rows="3"
            ></textarea>
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Price
            </label>
            <input
              name="price"
              onChange={handleChange}
              type="number"
              placeholder="Product Price"
              required
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.price}
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Pieces
            </label>
            <input
              name="pieces"
              onChange={handleChange}
              type="number"
              placeholder="Number of Pieces"
              required
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.pieces}
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Image
            </label>
            <input
              type="file"
              id="image"
              name="image"
              accept="image/*"
              onChange={handleChange}
              required
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition mt-6 uppercase"
            disabled={loading}
          >
            {loading ? "Adding..." : "Add Product"}
          </button>
          {error && (
            <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md mt-4 text-center">
              {error}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
