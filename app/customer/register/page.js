import RegisterForm from "@/app/components/RegisterFormPage";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import Link from "next/link";
import FooterComp from "@/app/components/Footer";

export default async function CustomerRegisterPage() {
  const session = await getServerSession(authOptions);

  if (session) redirect("/customer/dashboard");
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
      <RegisterForm role="customer" />
      <FooterComp />
    </div>
  );
}
