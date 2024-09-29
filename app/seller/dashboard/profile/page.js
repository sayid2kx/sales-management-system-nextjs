import SellerNavabarComp from "@/app/components/SellerNavbar";
import SellerProfilePage from "@/app/components/SellerProfile";
import FooterComp from "@/app/components/Footer";

export default function ProfilePage() {
  return (
    <div className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-400">
      <SellerNavabarComp />
      <div className="min-h-screen mt-28">
        <h1 className="text-center text-4xl">Seller Profile</h1>
        <SellerProfilePage />
      </div>
      <FooterComp />
    </div>
  );
}
