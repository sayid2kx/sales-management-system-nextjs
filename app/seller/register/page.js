import SellerRegisterForm from "@/app/components/SellerRegisterPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import FooterComp from "@/app/components/Footer";
import Link from "next/link";

export default async function sellerRegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/seller/dashboard");
  return (
    <div>
      <header className="bg-[#ddddd4] shadow-md">
        <nav className="container mx-auto p-6 flex justify-center items-center">
          <Link
            href="/"
            className="text-4xl font-bold text-black hover:text-sky-400"
          >
            Salesi
          </Link>
        </nav>
      </header>
      <SellerRegisterForm role="seller" />
      <FooterComp />
    </div>
  );
}
