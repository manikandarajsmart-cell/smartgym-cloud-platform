"use client";

import { useEffect, useState } from "react";

type DashboardStats = {
  totalGyms: number;
  totalMembers: number;
  totalRevenue: number;
};

type Gym = {
  _id: string;
  name: string;
  email: string;
  phone: string;
  subscriptionPlan: string;
  status: string;
};
export default function AdminPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
const [gyms, setGyms] = useState<Gym[]>([]);  
const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadDashboard() {
      try {

        const token = localStorage.getItem("smartgym-token");

        console.log("JWT Token:", token);
        console.log("API URL:", process.env.NEXT_PUBLIC_API_URL);

        if (!token) {
          setError("No login token found. Please login again.");
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/admin/dashboard`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        console.log("HTTP Status:", response.status);

        const data = await response.json();

        console.log("API Response:", data);

        if (!response.ok) {
          setError(data.message || "Request failed");
          setLoading(false);
          return;
        }

        if (!data.success) {
          setError(data.message || "Unable to load dashboard");
          setLoading(false);
          return;
        }

        setStats(data.data);
const gymsResponse = await fetch(
  `${process.env.NEXT_PUBLIC_API_URL}/admin/gyms`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  }
);

const gymsData = await gymsResponse.json();

if (gymsData.success) {
  setGyms(gymsData.data);
}
      } catch (err) {
        console.error(err);
        setError("Unable to connect to server.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboard();
  }, []);

  if (loading) {
    return (
      <div className="p-8 text-white text-xl">
        Loading Super Admin Dashboard...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-8 text-red-500 text-xl">
        Error: {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-white p-8">
      <h1 className="text-4xl font-bold mb-8">
        Super Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        <div className="bg-slate-800 rounded-xl p-6 shadow">
          <h2 className="text-lg text-gray-300">
            Total Gyms
          </h2>

          <p className="text-5xl font-bold mt-3">
            {stats?.totalGyms}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 shadow">
          <h2 className="text-lg text-gray-300">
            Total Members
          </h2>

          <p className="text-5xl font-bold mt-3">
            {stats?.totalMembers}
          </p>
        </div>

        <div className="bg-slate-800 rounded-xl p-6 shadow">
          <h2 className="text-lg text-gray-300">
            Total Revenue
          </h2>

          <p className="text-5xl font-bold mt-3">
            ₹{stats?.totalRevenue}
          </p>
        </div>

      </div>
<div className="mt-10">
  <h2 className="text-2xl font-bold mb-4">
    Gym List
  </h2>

  <div className="bg-slate-800 rounded-xl overflow-hidden">
    <table className="w-full">
      <thead className="bg-slate-700">
        <tr>
          <th className="p-3 text-left">Gym</th>
          <th className="p-3 text-left">Email</th>
          <th className="p-3 text-left">Phone</th>
          <th className="p-3 text-left">Plan</th>
          <th className="p-3 text-left">Status</th>
        </tr>
      </thead>

      <tbody>
        {gyms.map((gym) => (
          <tr key={gym._id} className="border-t border-slate-700">
            <td className="p-3">{gym.name}</td>
            <td className="p-3">{gym.email}</td>
            <td className="p-3">{gym.phone}</td>
            <td className="p-3">{gym.subscriptionPlan}</td>
            <td className="p-3">{gym.status}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div> 
   </div>
  );
}
