import CustomerNavabarComp from "@/app/components/CustomerNavbar";
import FooterComp from "@/app/components/Footer";
import AllProductsShowToCustomer from "@/app/components/ProductShowToCustomer";

export default function CustomerDashboard() {
  return (
    <div>
      <CustomerNavabarComp />
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-300 to-blue-400">
        <AllProductsShowToCustomer />
      </div>
      <FooterComp />
    </div>
  );
}
