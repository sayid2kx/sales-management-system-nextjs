import CustomerNavabarComp from "@/app/components/CustomerNavbar";
import FooterComp from "@/app/components/Footer";
import AllProductsShowToCustomer from "@/app/components/ProductShowToCustomer";

export default function CustomerDashboard() {
  return (
    <div>
      <CustomerNavabarComp />
      <AllProductsShowToCustomer />
      <FooterComp />
    </div>
  );
}
