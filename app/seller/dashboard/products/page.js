import SellerNavabarComp from "@/app/components/SellerNavbar";
import AllProductsShow from "@/app/components/AllProducts";
import FooterComp from "@/app/components/Footer";

export default function ProductShowpage() {
  return (
    <div>
      <SellerNavabarComp />
      <div className="min-h-screen bg-gradient-to-r from-green-400 via-teal-300 to-blue-400">
        <AllProductsShow />
      </div>
      <FooterComp />
    </div>
  );
}
