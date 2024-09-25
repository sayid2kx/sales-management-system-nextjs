import Link from "next/link";
import AdminNavabarComp from "@/app/components/AdminNavbar";
import FooterComp from "@/app/components/Footer";

const AdminDashboard = () => {
  return (
    <div>
      <AdminNavabarComp />
      <main className="bg-green-600 flex justify-center items-center min-h-screen py-10">
        <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-4xl lg:max-w-[1000px] lg:h-[500px] flex flex-col justify-center items-center">
          <h2 className="text-4xl font-bold mb-4">Add Product Items</h2>
          <Link
            href="/admin/dashboard/add-product"
            className="text-white text-lg text-center w-44 h-12 bg-green-600 border-2 border-gray-200 rounded-full"
          >
            Add Products
          </Link>
        </div>
      </main>
      <FooterComp />
    </div>
  );
};

export default AdminDashboard;
