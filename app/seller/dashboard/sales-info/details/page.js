import FooterComp from "@/app/components/Footer";
import SellerNavabarComp from "@/app/components/SellerNavbar";
import SellsHistoryPage from "@/app/components/SellsHistory";

export default function SellerSellsHistoryPage() {
  return (
    <div>
      <SellerNavabarComp />
      <div className="min-h-screen">
        <SellsHistoryPage />
      </div>
      <FooterComp />
    </div>
  );
}
