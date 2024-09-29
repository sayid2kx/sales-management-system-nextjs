"use client";
import FooterComp from "@/app/components/Footer";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SalesInfoLayout({
  children,
  availableProduct,
  customerList,
}) {
  const pathname = usePathname();
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollToTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (pathname === "/seller/dashboard/sales-info/details") {
    return <>{children}</>;
  }

  return (
    <div className="relative">
      <div className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-400 min-h-screen">
        {children}
        <div>{availableProduct}</div>
        <div>{customerList}</div>
      </div>
      <FooterComp />

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
}
