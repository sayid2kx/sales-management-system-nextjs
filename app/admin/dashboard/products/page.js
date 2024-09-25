import AdminNavabarComp from "@/app/components/AdminNavbar";
import AllProductsShow from "@/app/components/AllProducts";
import FooterComp from "@/app/components/Footer";

export default function ProductShowpage() {
  return (
    <div>
      <AdminNavabarComp />
      <AllProductsShow />
      <FooterComp />
    </div>
  );
}
