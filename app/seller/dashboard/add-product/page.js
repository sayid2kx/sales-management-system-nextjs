import AddProductForm from "@/app/components/AddProduct";
import SellerNavabarComp from "@/app/components/SellerNavbar";
import FooterComp from "@/app/components/Footer";

export default function AddProductPage() {
  return (
    <div>
      <SellerNavabarComp />
      <AddProductForm />
      <FooterComp />
    </div>
  );
}
