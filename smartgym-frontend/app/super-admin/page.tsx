"use client";


import { useEffect, useState } from "react";
import Link from "next/link";

export default function SuperAdminDashboard() {
  const [stats, setStats] = useState<any>(null);
  const [organizations, setOrganizations] = useState<any[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("smartgym-token");

    // Dashboard Stats
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/super-admin`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setStats(data.stats);
        }
      })
      .catch(console.error);

    // Organizations
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/organizations`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setOrganizations(data.organizations);
        }
      })
      .catch(console.error);

  }, []);

  if (!stats) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        🌍 SmartGym Cloud Control Center
      </h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

        <div className="bg-zinc-900 rounded-xl p-6">
          <h3>Organizations</h3>
          <h1 className="text-3xl">{stats.organizations}</h1>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h3>Branches</h3>
          <h1 className="text-3xl">{stats.branches}</h1>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h3>Users</h3>
          <h1 className="text-3xl">{stats.users}</h1>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h3>Members</h3>
          <h1 className="text-3xl">{stats.members}</h1>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h3>Revenue</h3>
          <h1 className="text-3xl">
            ₹{stats.revenue}
          </h1>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h3>Active Plans</h3>
          <h1 className="text-3xl">
            {stats.activeSubscriptions}
          </h1>
        </div>

        <div className="bg-zinc-900 rounded-xl p-6">
          <h3>Trial Orgs</h3>
          <h1 className="text-3xl">
            {stats.trialOrganizations}
          </h1>
        </div>

      </div>

      {/* Organizations Table */}

      <div className="mt-10">

        <h2 className="text-2xl font-bold mb-4">
          Organizations
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full border border-zinc-700">

            <thead>

              <tr className="bg-zinc-800">

   <th className="p-3 text-left">Organization</th>
<th className="p-3 text-left">Email</th>
<th className="p-3 text-left">City</th>
<th className="p-3 text-left">Country</th>
<th className="p-3 text-left">Status</th>
<th className="p-3 text-center">Actions</th>

              </tr>

            </thead>

            <tbody>

{organizations.map((org: any) => (

  <tr
    key={org._id}
    className="border-t border-zinc-700 hover:bg-zinc-900"
  >

    <td className="p-3">
      <Link
        href={`/super-admin/organizations/${org._id}`}
        className="text-blue-400 hover:underline"
      >
        {org.name}
      </Link>
    </td>

<td className="p-3">{org.email}</td>

<td className="p-3">
  {org.city || "-"}
</td>

<td className="p-3">
  {org.country || "-"}
</td>

<td className="p-3">
  <span
    className={`px-3 py-1 rounded-full text-sm ${
      org.status === "active"
        ? "bg-green-700 text-white"
        : "bg-red-700 text-white"
    }`}
  >
    {org.status}
  </span>
</td>

<td className="p-3 text-center">
  <Link
    href={`/super-admin/organizations/${org._id}`}
    className="bg-blue-600 hover:bg-blue-700 px-3 py-2 rounded-lg"
  >
    View
  </Link>
</td>

  </tr>

))}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}
