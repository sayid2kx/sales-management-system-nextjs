import Link from "next/link";
import FooterComp from "./Footer";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-[#ddddd4] shadow-md">
        <nav className="container mx-auto p-6 flex justify-between items-center">
          <div className="text-2xl font-bold text-black hover:text-sky-600">
            Salesi
          </div>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/admin/login"
                className="text-black hover:text-sky-600 text-xl font-medium"
              >
                Admin
              </Link>
            </li>
            <li>
              <Link
                href="/customer/login"
                className="text-black hover:text-sky-600 text-xl font-medium"
              >
                Customer
              </Link>
            </li>
          </ul>
        </nav>
      </header>

      <div className=" bg-green-400 min-h-screen">
        <main className="flex-1 mx-auto p-6">
          <section className="text-center my-20">
            <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
              Welcome to Sales Management System
            </h1>
            <p className="text-xl md:text-2xl text-gray-800 mb-8">
              The ultimate platform to manage your sales, track product
              availability, and keep your customers happy.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-8 h-72 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Admin Features
                </h2>
                <p className="text-gray-800 text-lg mb-4">
                  Admins can add products, manage sales, track product
                  availability, and oversee customer orders. Streamline your
                  operations and improve efficiency with our powerful admin
                  dashboard.
                </p>
                <Link
                  href="/admin/login"
                  className="bg-blue-600 text-white py-2 px-4 rounded-lg shadow hover:bg-blue-700 transition"
                >
                  Admin Page
                </Link>
              </div>

              <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">
                  Customer Features
                </h2>
                <p className="text-gray-800 text-lg mb-4">
                  Customers can browse available products, make purchases, and
                  track their order history. Stay informed and shop with ease
                  using our user-friendly portal.
                </p>
                <Link
                  href="/customer/login"
                  className="bg-gray-800 text-white py-2 px-4 rounded-lg shadow hover:bg-gray-700 transition"
                >
                  Customer Page
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
