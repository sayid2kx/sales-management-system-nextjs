import LoginForm from "@/app/components/LoginFormPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import Link from "next/link";
import FooterComp from "@/app/components/Footer";

export default async function SellerLoginPage() {
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
      <LoginForm userType="seller" />
      <FooterComp />
    </div>
  );
}
