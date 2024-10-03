import CustomerNavabarComp from "@/app/components/CustomerNavbar";
import CustomerOrders from "@/app/components/CustomerOrder";
import FooterComp from "@/app/components/Footer";

export default function CustomerOrderPage() {
  return (
    <div>
      <CustomerNavabarComp />
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-300 to-blue-400">
        <CustomerOrders />
      </div>
      <FooterComp />
    </div>
  );
}
