import { connectToMongoDB } from "@/lib/database";
import Customer from "@/app/models/customer";

export async function GET(req, { params }) {
  const { email } = params;

  await connectToMongoDB();

  try {
    const customer = await Customer.findOne({ email });
    if (!customer) {
      return new Response(JSON.stringify({ message: "Customer not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(customer), {
      status: 200,
    });
  } catch (error) {
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
    });
  }
}
