import SellerNavabarComp from "@/app/components/SellerNavbar";
import AllProductsShow from "@/app/components/AllProducts";
import FooterComp from "@/app/components/Footer";

export default function ProductShowpage() {
  return (
    <div>
      <SellerNavabarComp />
      <AllProductsShow />
      <FooterComp />
    </div>
  );
}
