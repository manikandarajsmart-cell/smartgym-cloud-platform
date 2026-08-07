"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import BranchForm from "./components/BranchForm";
import BranchTable from "./components/BranchTable";
import BranchStats from "./components/BranchStats";
import RoleGuard from "@/components/auth/RoleGuard";

export default function BranchesPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [editingBranch, setEditingBranch] = useState<any>(null);

  const fetchBranches = async () => {
    try {
      const token = localStorage.getItem("smartgym-token");

      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/branches`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = res.data.branches || [];

      setBranches(data);
    } catch (error) {
      console.error("Failed to fetch branches:", error);
    }
  };

  useEffect(() => {
    fetchBranches();
  }, []);

  return (
    <RoleGuard
      allowedRoles={[
        "SUPER_ADMIN",
        "ORG_OWNER",
        "ORG_ADMIN",
      ]}
    >
      <div className="bg-black text-white min-h-screen flex">
        <Sidebar />

        <div className="ml-64 p-10 w-full">

          <h1 className="text-4xl font-bold mb-10">
            🏢 Branch Management
          </h1>

          <BranchStats
            totalBranches={branches.length}
          />

          <BranchForm
            editingBranch={editingBranch}
            onSuccess={() => {
              fetchBranches();
              setEditingBranch(null);
            }}
          />

          <BranchTable
            branches={branches}
            onRefresh={fetchBranches}
            onEdit={setEditingBranch}
          />

        </div>
      </div>
    </RoleGuard>
  );
}
