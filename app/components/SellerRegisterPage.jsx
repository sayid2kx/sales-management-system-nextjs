"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SellerRegisterForm({ role }) {
  const [formData, setFormData] = useState({
    shopname: "",
    fullname: "",
    email: "",
    username: "",
    phone: "",
    address: "",
    password: "",
    image: null,
    gender: "Male",
  });
  const [msg, setMsg] = useState("");

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "file" ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.shopname ||
      !formData.fullname ||
      !formData.username ||
      !formData.email ||
      !formData.phone ||
      !formData.address ||
      !formData.password
    ) {
      setMsg("All fields are necessary.");
      return;
    }

    try {
      const resUserExists = await fetch(`/api/${role}/userExists`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          username: formData.username,
        }),
      });

      const { user } = await resUserExists.json();

      if (user) {
        setMsg("User already exists.");
        return;
      }

      const formDataToSend = new FormData();
      for (const key in formData) {
        formDataToSend.append(key, formData[key]);
      }

      const res = await fetch(`/api/${role}/register`, {
        method: "POST",
        body: formDataToSend,
      });

      if (res.ok) {
        setFormData({
          shopname: "",
          fullname: "",
          email: "",
          username: "",
          phone: "",
          address: "",
          password: "",
          image: null,
          gender: "Male",
        });
        setMsg("");
        router.push(`/${role}/login`);
      } else {
        setMsg("User registration failed.");
      }
    } catch (error) {
      console.error("Error during registration: ", error);
      setMsg("An error occurred during registration.");
    }
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div className="min-h-screen bg-green-300 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {role === "seller" ? "Seller Registration" : "Customer Registration"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Shop Name
            </label>
            <input
              type="text"
              name="shopname"
              placeholder="Shop Name"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.shopname}
              onChange={handleChange}
            />
          </div>
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="fullname"
              placeholder="Full Name"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.fullname}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.username}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.email}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              placeholder="Address"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Password"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.password}
              onChange={handleChange}
            />
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Gender
            </label>
            <select
              name="gender"
              className="w-full pb-1 focus:border-green-500 focus:outline-none transition-colors"
              value={formData.gender}
              onChange={handleChange}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Others">Others</option>
            </select>
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Profile Image
            </label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full pb-1 border-2 border-gray-200 focus:border-green-500 focus:outline-none transition-colors"
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition mt-6 uppercase"
          >
            Register
          </button>
        </form>

        {msg && (
          <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md mt-4 text-center">
            {msg}
          </div>
        )}

        <p className="mt-6 text-sm text-gray-800 text-center">
          Already have an account?{" "}
          <Link
            href={`/${role}/login`}
            className="underline text-green-600 text-lg hover:text-green-800"
          >
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
