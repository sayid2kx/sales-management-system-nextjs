import CustomerNavabarComp from "@/app/components/CustomerNavbar";
import CustomerOrders from "@/app/components/CustomerOrder";
import FooterComp from "@/app/components/Footer";

export default function CustomerOrderPage() {
  return (
    <div>
      <CustomerNavabarComp />
      <div className="min-h-screen">
        <CustomerOrders />
      </div>
      <FooterComp />
    </div>
  );
}
