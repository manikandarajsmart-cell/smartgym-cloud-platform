"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import RevenueAnalytics from "./components/RevenueAnalytics";

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
    totalMembers: 12,
    activeTrainers: 3,
    monthlyRevenue: 25000,
    growthRate: "18%",
  });

const [members, setMembers] = useState<any[]>([]);
const [payments, setPayments] = useState<any[]>([]);
const [attendance, setAttendance] = useState<any[]>([]);

const totalRevenue = payments.reduce(
  (sum, payment) => sum + Number(payment.amount || 0),
  0
);

const activeMembers = members.filter(
  (member) => member.status === "Active"
).length;

const expiredMembers = members.filter(
  (member) => member.status === "Expired"
).length;

const expiringSoon = members.filter((member) => {
  const daysLeft = Number(member.daysLeft);
  return daysLeft >= 0 && daysLeft <= 7;
}).length;

const totalPayments = payments.length;

const attendanceCount = attendance.length;

  const monthMap: Record<string, number> = {};

payments.forEach((payment) => {
  const month = payment.month || "Unknown";

  monthMap[month] =
    (monthMap[month] || 0) +
    Number(payment.amount || 0);
});

const chartData = Object.entries(monthMap).map(
  ([name, amount]) => ({
    name,
    amount,
  })
);

   useEffect(() => {
  const auth = localStorage.getItem("smartgym-auth");

  if (!auth) {
    router.push("/login");
    return;
  }

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`)
    .then((res) => res.json())
    .then((data) => {
      setMembers(data);
    })
    .catch(console.error);

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setPayments(data.payments);
      }
    })
    .catch(console.error);

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setAttendance(data.attendance);
      }
    })
    .catch(console.error);

}, [router]);

const quickButtonStyle = {
  background: "#181818",
  color: "#fff",
  border: "1px solid #333",
  borderRadius: "14px",
  padding: "18px",
  cursor: "pointer",
  fontSize: "17px",
  fontWeight: "bold",
  transition: "0.2s",
} as const;

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

<DashboardStats
  stats={{
    totalMembers: members.length,
    activeMembers,
    expiredMembers,
    expiringSoon,
    totalRevenue,
    totalPayments,
    attendanceCount,

    // Required by DashboardStats.tsx
    thisMonthRevenue: totalRevenue,
    topPayingMember: "-",
    activeTrainers: 3,
    paidMembers: activeMembers,
    pendingMembers: expiredMembers,
  }}
/>

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
     
<RevenueAnalytics
  stats={{
    totalRevenue: totalRevenue,
    totalPayments: totalPayments,
    topPayingMember: "-",
  }}
  chartData={chartData}
/>
<div
  style={{
    marginTop: "40px",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
    }}
  >
    ⚡ Quick Actions
  </h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
    }}
  >
    <button
      onClick={() => router.push("/members")}
      style={quickButtonStyle}
    >
      ➕ Add Member
    </button>

    <button
      onClick={() => router.push("/payments")}
      style={quickButtonStyle}
    >
      💳 Payments
    </button>

    <button
      onClick={() => router.push("/attendance")}
      style={quickButtonStyle}
    >
      📅 Attendance
    </button>

    <button
      onClick={() => router.push("/scan")}
      style={quickButtonStyle}
    >
      📷 Scan QR
    </button>

    <button
      onClick={() => router.push("/member-list")}
      style={quickButtonStyle}
    >
      👥 Member List
    </button>

    <button
      onClick={() => router.push("/needs-attention")}
      style={quickButtonStyle}
    >
      🚨 Needs Attention
    </button>
  </div>
</div>

<div
  style={{
    marginTop: "50px",
    background: "#151515",
    borderRadius: "18px",
    padding: "25px",
  }}
>
  <h2
    style={{
      marginBottom: "20px",
      fontSize: "26px",
      fontWeight: "bold",
    }}
  >
    💳 Recent Payments
  </h2>

  <table
    style={{
      width: "100%",
      borderCollapse: "collapse",
    }}
  >
    <thead>
      <tr>
        <th style={{ textAlign: "left", padding: "12px" }}>Member</th>
        <th style={{ textAlign: "left", padding: "12px" }}>Month</th>
        <th style={{ textAlign: "left", padding: "12px" }}>Amount</th>
        <th style={{ textAlign: "left", padding: "12px" }}>Status</th>
      </tr>
    </thead>

    <tbody>
      {payments
        .slice(-5)
        .reverse()
        .map((payment: any, index: number) => (
          <tr key={index}>
            <td style={{ padding: "14px" }}>{payment.memberName}</td>

            <td style={{ padding: "14px" }}>
              {payment.month}
            </td>

            <td
              style={{
                padding: "14px",
                color: "#00e676",
                fontWeight: "bold",
              }}
            >
              ₹{payment.amount}
            </td>

            <td
              style={{
                padding: "14px",
                color:
                  payment.status === "Paid"
                    ? "#00e676"
                    : "#ff5252",
                fontWeight: "bold",
              }}
            >
              {payment.status}
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
