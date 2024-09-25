import LoginForm from "@/app/components/LoginFormPage";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import FooterComp from "@/app/components/Footer";

export default async function AdminLoginPage() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/admin/dashboard");
  return (
    <div>
      <header className="bg-[#ddddd4] shadow-md">
        <nav className="container mx-auto p-6">
          <div className="text-4xl font-bold text-center text-black">
            Salesi
          </div>
        </nav>
      </header>
      <LoginForm userType="admin" />
      <FooterComp />
    </div>
  );
}
