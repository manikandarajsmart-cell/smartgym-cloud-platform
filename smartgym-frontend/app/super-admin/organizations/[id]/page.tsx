"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function OrganizationDetailsPage() {
  const { id } = useParams();

  const [organization, setOrganization] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem("smartgym-token");

    fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/organizations/${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
      .then((r) => r.json())
      .then((data) => {
        if (data.success) {
          setOrganization(data.organization);
        }
      })
      .catch(console.error);
  }, [id]);

  if (!organization) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">

      <h1 className="text-4xl font-bold mb-8">
        {organization.name}
      </h1>

      <div className="grid md:grid-cols-2 gap-6">

<div className="bg-zinc-900 rounded-xl p-6">

  <h2 className="text-xl font-bold mb-6">
    🏢 Organization Information
  </h2>

  <div className="space-y-3">

    <p>
      <b>Name:</b> {organization.name}
    </p>

    <p>
      <b>Email:</b> {organization.email}
    </p>

    <p>
      <b>Status:</b>{" "}
      <span
        className={
          organization.status === "active"
            ? "text-green-400"
            : "text-red-400"
        }
      >
        {organization.status}
      </span>
    </p>

    <p>
      <b>City:</b> {organization.city || "-"}
    </p>

    <p>
      <b>State:</b> {organization.state || "-"}
    </p>

    <p>
      <b>Country:</b> {organization.country || "-"}
    </p>

    <p>
      <b>Phone:</b> {organization.phone || "-"}
    </p>

    <p>
      <b>Created:</b>{" "}
      {new Date(
        organization.createdAt
      ).toLocaleDateString()}
    </p>

  </div>

</div>

<div className="bg-zinc-900 rounded-xl p-6">

  <h2 className="text-xl font-bold mb-6">
    👤 Organization Owner
  </h2>

  <div className="space-y-3">

    <p>
      <b>Name:</b>{" "}
      {organization.ownerUserId?.name || "-"}
    </p>

    <p>
      <b>Email:</b>{" "}
      {organization.ownerUserId?.email || "-"}
    </p>

    <p>
      <b>Role:</b> ORG_OWNER
    </p>

    <p>
      <b>Organization ID:</b>
    </p>

    <div className="bg-black p-3 rounded text-sm break-all">
      {organization._id}
    </div>

  </div>

</div>

      </div>

    </div>
  );
}
