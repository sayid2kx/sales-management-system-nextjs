"use client";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";

const AdminProfilePage = () => {
  const { data: session, status } = useSession();
  const [admin, setAdmin] = useState(null);

  useEffect(() => {
    if (session?.user) {
      const fetchAdminData = async () => {
        try {
          const encodedEmail = encodeURIComponent(session.user.email);
          const res = await fetch(`/api/admin/profile/${encodedEmail}`);
          if (res.ok) {
            const data = await res.json();
            setAdmin(data);
          } else {
            console.error("Error fetching admin data", res.status);
          }
        } catch (error) {
          console.error("Failed to fetch admin data:", error);
        }
      };

      fetchAdminData();
    }
  }, [session]);

  if (status === "loading") {
    return <p className="text-center mt-4 text-lg text-gray-600">Loading...</p>;
  }

  if (!admin) {
    return (
      <p className="text-center mt-4 text-lg text-gray-600">
        No admin data found
      </p>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-8 bg-gradient-to-r from-blue-50 to-white border-4 border-cyan-300 rounded-lg shadow-xl mt-8 mb-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start">
        {admin.image && (
          <Image
            src={admin.image}
            alt={`${admin.fullname}'s profile picture`}
            width={180}
            height={180}
            className="rounded-full mb-4 sm:mb-0 sm:mr-8 border-4 border-blue-600 shadow-lg"
          />
        )}
        <div className="text-center sm:text-left">
          <h2 className="text-3xl font-semibold mb-3 text-gray-800">
            {admin.fullname}
          </h2>
          <p className="text-gray-600 text-lg">{admin.email}</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
        <div className="space-y-3">
          <p className="text-gray-700 text-lg">
            <strong className="font-semibold">Username:</strong>{" "}
            {admin.username}
          </p>
          <p className="text-gray-700 text-lg">
            <strong className="font-semibold">Phone:</strong> {admin.phone}
          </p>
          <p className="text-gray-700 text-lg">
            <strong className="font-semibold">Address:</strong> {admin.address}
          </p>
          <p className="text-gray-700 text-lg">
            <strong className="font-semibold">Gender:</strong> {admin.gender}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminProfilePage;
