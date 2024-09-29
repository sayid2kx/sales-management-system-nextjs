import Link from "next/link";
import FooterComp from "./Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#ddddd4] shadow-lg">
        <nav className="container mx-auto p-6 flex justify-between items-center">
          <div className="text-3xl font-bold text-black hover:text-blue-600 transition">
            Salesi
          </div>
          <ul className="flex space-x-8">
            <li>
              <Link
                href="/seller/login"
                className="text-black hover:text-blue-600 text-lg font-semibold transition"
              >
                Seller
              </Link>
            </li>
            <li>
              <Link
                href="/customer/login"
                className="text-black hover:text-blue-600 text-lg font-semibold transition"
              >
                Customer
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className="bg-gradient-to-r from-green-400 to-blue-500 min-h-screen">
        <main className="flex-1 mx-auto p-8">
          <section className="text-center my-24">
            <h1 className="text-5xl md:text-7xl font-extrabold text-white drop-shadow-md mb-6">
              Manage Your Sales Seamlessly
            </h1>
            <p className="text-2xl md:text-3xl text-gray-100 mb-10">
              Your one-stop solution for tracking sales, products, and customer
              satisfaction.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
              <div className="bg-white p-10 h-80 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Seller Features
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  Add and manage products, track availability, and oversee
                  customer orders with ease using our seller dashboard.
                </p>
                <Link
                  href="/seller/login"
                  className="bg-blue-600 text-white py-3 px-6 rounded-lg shadow-md hover:bg-blue-700 transition"
                >
                  Explore Seller Dashboard
                </Link>
              </div>

              <div className="bg-white p-10 h-80 rounded-lg shadow-lg hover:shadow-xl transition transform hover:-translate-y-1">
                <h2 className="text-3xl font-bold text-gray-800 mb-6">
                  Customer Features
                </h2>
                <p className="text-gray-700 text-lg mb-6">
                  Browse products, track your orders, and shop with ease using
                  our intuitive customer portal.
                </p>
                <Link
                  href="/customer/login"
                  className="bg-gray-800 text-white py-3 px-6 rounded-lg shadow-md hover:bg-gray-700 transition"
                >
                  Access Customer Portal
                </Link>
              </div>
            </div>
          </section>
        </main>
      </div>
      <FooterComp />
    </div>
  );
}
