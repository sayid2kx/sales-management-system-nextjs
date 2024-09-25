import AddProductForm from "@/app/components/AddProduct";
import AdminNavabarComp from "@/app/components/AdminNavbar";
import FooterComp from "@/app/components/Footer";

export default function AddProductPage() {
  return (
    <div>
      <AdminNavabarComp />
      <AddProductForm />
      <FooterComp />
    </div>
  );
}
