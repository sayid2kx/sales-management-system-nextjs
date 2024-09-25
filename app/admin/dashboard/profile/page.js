import AdminNavabarComp from "@/app/components/AdminNavbar";
import AdminProfilePage from "@/app/components/AdminProfile";
import FooterComp from "@/app/components/Footer";

export default function ProfilePage() {
  return (
    <div className="bg-green-300">
      <AdminNavabarComp />
      <div className="min-h-screen mt-28">
        <h1 className="text-center text-4xl">Owner Profile</h1>
        <AdminProfilePage />
      </div>
      <FooterComp />
    </div>
  );
}
