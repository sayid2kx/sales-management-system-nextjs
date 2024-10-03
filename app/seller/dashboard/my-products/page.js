import FooterComp from "@/app/components/Footer";
import SellerNavabarComp from "@/app/components/SellerNavbar";
import SellerProducts from "@/app/components/SellerProducts";

export default function SellerProdductShowingPage() {
  return (
    <div>
      <SellerNavabarComp />
      <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500">
        <SellerProducts />
      </div>
      <FooterComp />
    </div>
  );
}
