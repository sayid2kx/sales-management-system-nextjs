import { connectToMongoDB } from "@/lib/database";
import Admin from "@/app/models/admin";

export async function GET(req, { params }) {
  const { email } = params;

  await connectToMongoDB();

  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return new Response(JSON.stringify({ message: "Admin not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(admin), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
