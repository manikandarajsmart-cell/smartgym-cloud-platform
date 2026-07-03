"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
    totalMembers: 12,
    activeTrainers: 3,
    monthlyRevenue: 25000,
    growthRate: "18%",
  });

  useEffect(() => {
    const auth = localStorage.getItem("smartgym-auth");

    if (!auth) {
      router.push("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("smartgym-auth");
    router.push("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        background: "#000",
        minHeight: "100vh",
        color: "white",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          padding: "40px",
          marginLeft: "250px",
          width: "100%",
        }}
      >

    <DashboardHeader />

<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "30px",
  }}
>
  <button
    onClick={handleLogout}
    style={{
      background: "#ff1744",
      color: "#fff",
      border: "none",
      padding: "16px 30px",
      borderRadius: "14px",
      cursor: "pointer",
      fontSize: "18px",
      fontWeight: "bold",
    }}
  >
    Logout
  </button>
</div>
     
    <DashboardHeader />

<div
  style={{
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "30px",
  }}
>

<button
  onClick={handleLogout}
  style={{
    background: "#ff1744",
    color: "white",
    border: "none",
    padding: "16px 30px",
    borderRadius: "14px",
    cursor: "pointer",
    fontSize: "18px",
    fontWeight: "bold",
  }}
>
    Logout
  </button>
</div>

<DashboardStats
  stats={{
    totalMembers: stats.totalMembers,
    thisMonthRevenue: stats.monthlyRevenue,
    totalRevenue: stats.monthlyRevenue,
    totalPayments: 0,
    topPayingMember: "-",
    activeTrainers: stats.activeTrainers,
    attendanceCount: 0,
    activeMembers: stats.totalMembers,
    paidMembers: 0,
    pendingMembers: 0,
    expiringSoon: 0,
    expiredMembers: 0,
  }}
/>

      </div>
    </div>
  );
}
