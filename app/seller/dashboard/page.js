import Link from "next/link";
import SellerNavabarComp from "@/app/components/SellerNavbar";
import FooterComp from "@/app/components/Footer";

const sellerDashboard = () => {
  return (
    <div>
      <SellerNavabarComp />
      <div className="flex flex-col min-h-screen">
        <main className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-400 min-h-screen flex-grow flex justify-center items-center py-10">
          <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-3xl lg:max-w-[1000px] flex flex-col justify-center items-center space-y-8 lg:h-[500px]">
            <h2 className="text-4xl font-bold text-center">
              Add Product Items
            </h2>
            <Link
              href="/seller/dashboard/add-product"
              className="text-white text-lg text-center w-48 h-12 bg-green-600 border-2 border-gray-200 rounded-full flex items-center justify-center transition-transform transform hover:scale-105"
            >
              Add Products
            </Link>
          </div>
        </main>
        <FooterComp />
      </div>
    </div>
  );
};

export default sellerDashboard;
