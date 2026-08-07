"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Props = {
  editingBranch: any;
  onSuccess: () => void;
};

export default function BranchForm({
  editingBranch,
  onSuccess,
}: Props) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [country, setCountry] = useState("");
  const [phone, setPhone] = useState("");
  const [status, setStatus] = useState("active");

  useEffect(() => {
    if (editingBranch) {
      setName(editingBranch.name || "");
      setAddress(editingBranch.address || "");
      setCity(editingBranch.city || "");
      setState(editingBranch.state || "");
      setCountry(editingBranch.country || "");
      setPhone(editingBranch.phone || "");
      setStatus(editingBranch.status || "active");
    } else {
      setName("");
      setAddress("");
      setCity("");
      setState("");
      setCountry("");
      setPhone("");
      setStatus("active");
    }
  }, [editingBranch]);

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem("smartgym-token");

      const payload = {
        name,
        address,
        city,
        state,
        country,
        phone,
        status,
      };

      if (editingBranch) {
        await axios.put(
          `${process.env.NEXT_PUBLIC_API_URL}/branches/${editingBranch._id}`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("✅ Branch Updated");
      } else {
        await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/branches`,
          payload,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        alert("✅ Branch Created");
      }

      onSuccess();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save branch");
    }
  };

  return (
    <div className="bg-gray-900 p-6 rounded-xl">

      <h2 className="text-2xl font-bold mb-6">
        {editingBranch ? "Edit Branch" : "Add Branch"}
      </h2>

      <div className="grid grid-cols-2 gap-4">

        <input
          className="p-3 rounded bg-gray-800"
          placeholder="Branch Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="p-3 rounded bg-gray-800"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          className="p-3 rounded bg-gray-800"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />

        <input
          className="p-3 rounded bg-gray-800"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />

        <input
          className="p-3 rounded bg-gray-800"
          placeholder="State"
          value={state}
          onChange={(e) => setState(e.target.value)}
        />

        <input
          className="p-3 rounded bg-gray-800"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
        />

        <select
          className="p-3 rounded bg-gray-800"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>

      </div>

      <button
        onClick={handleSubmit}
        className="mt-6 px-6 py-3 bg-green-600 rounded hover:bg-green-700"
      >
        {editingBranch ? "Update Branch" : "Create Branch"}
      </button>

    </div>
  );
}
