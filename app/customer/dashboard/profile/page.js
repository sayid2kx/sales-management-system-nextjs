import CustomerNavabarComp from "@/app/components/CustomerNavbar";
import CustomerProfilePage from "@/app/components/CustomerProfile";
import FooterComp from "@/app/components/Footer";

export default function CustomerProfile() {
  return (
    <div className="bg-gradient-to-r from-green-400 via-teal-300 to-blue-400">
      <CustomerNavabarComp />
      <div className="min-h-screen mt-28">
        <h1 className="text-center text-4xl">Customer Profile</h1>
        <CustomerProfilePage />
      </div>
      <FooterComp />
    </div>
  );
}
