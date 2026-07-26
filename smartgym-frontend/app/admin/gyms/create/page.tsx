"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreateGymPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    subscriptionPlan: "Free",
    maxMembers: 100,
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.name === "maxMembers"
          ? Number(e.target.value)
          : e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);

    try {
      const token = localStorage.getItem("smartgym-token");

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/admin/gyms`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(form),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Failed to create gym");
        return;
      }

      alert("Gym created successfully!");

      router.push("/admin");
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-6">
        Create New Gym
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          name="name"
          placeholder="Gym Name"
          value={form.name}
          onChange={handleChange}
          required
          className="w-full border rounded p-3"
        />

        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          name="phone"
          placeholder="Phone"
          value={form.phone}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <select
          name="subscriptionPlan"
          value={form.subscriptionPlan}
          onChange={handleChange}
          className="w-full border rounded p-3"
        >
          <option value="Free">Free</option>
          <option value="Starter">Starter</option>
          <option value="Pro">Pro</option>
          <option value="Enterprise">Enterprise</option>
        </select>

        <input
          type="number"
          name="maxMembers"
          value={form.maxMembers}
          onChange={handleChange}
          className="w-full border rounded p-3"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white rounded p-3 hover:bg-blue-700"
        >
          {loading ? "Creating..." : "Create Gym"}
        </button>

      </form>
    </div>
  );
}
