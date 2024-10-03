"use client";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LogoutButton from "./LogoutButton";

export default function SellerNavabarComp() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="bg-[#ddddd4] border-b border-gray-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          <div className="flex-1 flex justify-center md:justify-start">
            <Link
              href="/seller/dashboard"
              className="text-4xl font-bold text-black hover:text-sky-400"
            >
              Selsi
            </Link>
          </div>

          <div className="hidden md:flex space-x-5 items-center">
            <Link
              href="/seller/dashboard/products"
              className="text-black text-lg hover:text-sky-400"
            >
              All Products
            </Link>
            <Link
              href="/seller/dashboard/my-products"
              className="text-black text-lg hover:text-sky-400"
            >
              My Products
            </Link>
            <Link
              href="/seller/dashboard/sales-info"
              className="text-black text-lg hover:text-sky-400"
            >
              Sales Info
            </Link>
            <Link
              href="/seller/dashboard/profile"
              className="text-black text-lg hover:text-sky-400"
            >
              Profile
            </Link>
            <LogoutButton />
          </div>

          <div className="flex md:hidden items-center">
            <button onClick={toggleMenu} className="focus:outline-none">
              {isOpen ? (
                <Image
                  src="/images/close-menu-dark.svg"
                  alt="Close Menu"
                  width={30}
                  height={30}
                />
              ) : (
                <Image
                  src="/images/hamburger-menu-dark.svg"
                  alt="Open Menu"
                  width={30}
                  height={30}
                />
              )}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="flex flex-col items-center px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/seller/dashboard/products"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-400 hover:text-white"
            >
              All Products
            </Link>
            <Link
              href="/seller/dashboard/my-products"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-400 hover:text-white"
            >
              My Products
            </Link>
            <Link
              href="/seller/dashboard/sales-info"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-400 hover:text-white"
            >
              Sales Info
            </Link>
            <Link
              href="/seller/dashboard/profile"
              className="block w-full text-center px-3 py-2 rounded-md text-base font-medium text-black hover:bg-gray-400 hover:text-white"
            >
              Profile
            </Link>
            <div className="block text-center px-3 py-2 rounded-md text-base font-medium text-black hover:text-white">
              <LogoutButton />
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
