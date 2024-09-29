"use client";

import { useState, useEffect } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginForm({ userType }) {
  const [usernameOrEmail, setUsernameOrEmail] = useState("");
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await signIn("credentials", {
        usernameOrEmail,
        password,
        userType,
        redirect: false,
      });

      if (res.error) {
        setMsg("Invalid credentials. Please try again.");
        return;
      }

      router.replace(`/${userType}/dashboard`);
    } catch (error) {
      console.log("Error during login: ", error);
      setMsg("An error occurred during login.");
    }
  };

  useEffect(() => {
    if (msg) {
      const timer = setTimeout(() => setMsg(""), 1500);
      return () => clearTimeout(timer);
    }
  }, [msg]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-300 to-blue-400 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md relative">
        <h1 className="text-2xl font-bold text-gray-800 text-center mb-6">
          {userType === "seller" ? "Seller Login" : "Customer Login"}
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Username or Email
            </label>
            <input
              onChange={(e) => setUsernameOrEmail(e.target.value)}
              type="text"
              placeholder="Username or Email"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={usernameOrEmail}
            />
          </div>

          <div className="w-full">
            <label className="block text-xs font-medium text-gray-800 uppercase mb-1">
              Password
            </label>
            <input
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Password"
              className="w-full pb-1 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none transition-colors"
              value={password}
            />
          </div>

          <button
            type="submit"
            className="bg-green-500 text-white font-bold py-2 px-4 rounded-full w-full hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 transition mt-6 uppercase"
          >
            Login
          </button>

          {msg && (
            <div className="bg-red-500 text-white text-sm py-2 px-4 rounded-md mt-4 text-center">
              {msg}
            </div>
          )}

          <p className="mt-6 text-sm text-gray-800 text-center">
            Don't have an account?{" "}
            <Link
              href={`/${userType}/register`}
              className="underline text-green-600 text-lg hover:text-green-800"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
