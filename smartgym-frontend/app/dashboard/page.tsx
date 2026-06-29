"use client";

import { useEffect, useState } from "react";
import DashboardStats from "./components/DashboardStats";
import DashboardHeader from "./components/DashboardHeader";
import StatCard from "@/components/ui/StatCard";
import Sidebar from "../../components/Sidebar";
import SectionTitle from "@/components/ui/SectionTitle";
import { useRouter } from "next/navigation";
import axios from "axios";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

export default function DashboardPage() {
  const router = useRouter();

  const [stats, setStats] = useState({
  totalMembers: 0,
  activeMembers: 0,
  expiringSoon: 0,
  expiredMembers: 0,
    paidMembers: 0,
  pendingMembers: 0,
  activeTrainers: 0,
  totalRevenue: 0,
  attendanceCount: 0,
  latestMember: "No Records",
  latestTime: "-",
  thisMonthRevenue: 0,
  revenueGrowth: 0,
  topPayingMember: "No Records",
  totalPayments: 0,

  latestPaymentMember: "No Records",
  latestPaymentAmount: 0,
  newestMember: "No Records",
});

   const chartData = [
  {
    name: "Revenue",
    amount: Math.round(stats.totalRevenue / 1000),
  },
  {
    name: "Payments",
    amount: stats.totalPayments,
  },
  {
    name: "Members",
    amount: stats.totalMembers,
  },
];

  useEffect(() => {
    const auth = localStorage.getItem("smartgym-auth");

    if (!auth) {
      router.push("/login");
      return;
    }

    loadDashboard();
  }, []);

  const loadDashboard = async () => {
    try {
      const [
        membersRes,
        trainersRes,
        paymentsRes,
        attendanceRes,
      ] = await Promise.all([
        axios.get("https://smartgym.cloud/api/members"),
        axios.get("https://smartgym.cloud/api/trainers"),
        axios.get("https://smartgym.cloud/api/payments"),
        axios.get("https://smartgym.cloud/api/attendance"),
      ]);

      const members = membersRes.data || [];
const today = new Date();

const activeMembers = members.filter((m: any) => {
  if (!m.expiryDate) return true;
  return new Date(m.expiryDate) > today;
}).length;

const paidMembers = members.filter(
  (m: any) => m.paymentStatus === "Paid"
).length;

const pendingMembers = members.filter(
  (m: any) => m.paymentStatus === "Pending"
).length;

const expiringSoon = members.filter((m: any) => {
  if (!m.expiryDate) return false;

  const diffDays = Math.ceil(
    (new Date(m.expiryDate).getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  return diffDays >= 0 && diffDays <= 7;
}).length;

const expiredMembers = members.filter((m: any) => {
  if (!m.expiryDate) return false;
  return new Date(m.expiryDate) < today;
}).length;

      const trainers = trainersRes.data || [];

      const payments =
        paymentsRes.data.payments || [];

      const attendance =
        attendanceRes.data.attendance || [];

      const revenue = payments.reduce(
        (sum: number, p: any) =>
          sum + Number(p.amount || 0),
        0
      );
      
const thisMonthRevenue = revenue;

const totalPayments = payments.length;

const revenueGrowth =
  totalPayments > 0
    ? Math.round((revenue / totalPayments) / 100)
    : 0;

const topPayingMember =
  payments.length > 0
    ? payments.reduce((max: any, p: any) =>
        Number(p.amount || 0) >
        Number(max.amount || 0)
          ? p
          : max
      ).memberName
    : "No Records";

     const latestPayment =
  payments.length > 0
    ? payments[0]
    : null;

const newestMember =
  members.length > 0
    ? members[0]
    : null;

      const latest =
        attendance.length > 0
          ? attendance[0]
          : null;

setStats({
  totalMembers: members.length,
  activeMembers,
  expiringSoon,
  expiredMembers,

  paidMembers,
pendingMembers,

  activeTrainers: trainers.length,
  totalRevenue: revenue,
  attendanceCount: attendance.length,
  latestMember: latest?.memberName || "No Records",

latestTime: latest?.time || "-",
thisMonthRevenue,
revenueGrowth,
topPayingMember,
totalPayments,

latestPaymentMember:
  latestPayment?.memberName || "No Records",

latestPaymentAmount:
  latestPayment?.amount || 0,

newestMember:
  newestMember?.name || "No Records",

});

    } catch (error) {
      console.log(error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("smartgym-auth");
    router.push("/login");
  };

  const cardStyle = {
    background: "#111",
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid #222",
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
        }}
      >

    <DashboardHeader />

   <DashboardStats stats={stats} />

<div
  style={{
    display: "grid",
    gridTemplateColumns:
      "repeat(auto-fit,minmax(250px,1fr))",
    gap: "20px",
  }}
>

   <StatCard
  title="Total Members"
  value={stats.totalMembers}
/>

<StatCard
  title="This Month Revenue"
  value={`₹${stats.thisMonthRevenue}`}
/>

<StatCard
  title="Average Payment"
  value={`₹${
    stats.totalPayments > 0
      ? Math.round(
          stats.totalRevenue / stats.totalPayments
        ).toLocaleString("en-IN")
      : 0
  }`}
/>

<StatCard
  title="Top Paying Member"
  value={stats.topPayingMember}
/>

          <div style={cardStyle}>
            <h3>Active Trainers</h3>
            <h1>{stats.activeTrainers}</h1>
          </div>

          <div style={cardStyle}>
            <h3>Total Revenue</h3>

            <h1>₹{stats.totalRevenue.toLocaleString("en-IN")}</h1>

          </div>

<div style={cardStyle}>
  <h3>Attendance Records</h3>
  <h1>{stats.attendanceCount}</h1>
</div>

<div style={cardStyle}>
  <h3>💳 Total Payments</h3>
  <h1>{stats.totalPayments}</h1>
</div>

<div style={cardStyle}>
  <h3>🟢 Active Members</h3>
 <h1>{stats.activeMembers}</h1>
</div>

<div style={cardStyle}>
  <h3>💰 Paid Members</h3>
  <h1>{stats.paidMembers}</h1>
</div>

<div style={cardStyle}>
  <h3>🔴 Pending Members</h3>
  <h1>{stats.pendingMembers}</h1>
</div>

<div style={cardStyle}>
  <h3>🟠 Expiring Soon</h3>
  <h1>{stats.expiringSoon}</h1>
</div>

<div style={cardStyle}>
  <h3>🔴 Expired Members</h3>
  <h1>{stats.expiredMembers}</h1>
</div>

<div
  style={{
    ...cardStyle,
    cursor: "pointer",
  }}
  onClick={() => router.push("/needs-attention")}
>
  <h3>🚨 Needs Attention</h3>
  <h1>{stats.expiringSoon + stats.expiredMembers}</h1>
</div>

</div>
        <div
          style={{
            marginTop: "30px",
            background: "#111",
            padding: "30px",
            borderRadius: "20px",
            border: "1px solid #222",
          }}
        >

           <div
  style={{
    marginTop: "30px",
    background: "#111",
    padding: "30px",
    borderRadius: "20px",
    border: "1px solid #222",
  }}
>
  <h2>📊 Revenue Analytics</h2>

  <div
    style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
      gap: "20px",
      marginTop: "20px",
    }}
  >
    <div>
      <h4>Total Revenue</h4>
      <p>₹{stats.totalRevenue}</p>
    </div>

   <div
  style={{
    width: "100%",
    height: "300px",
    marginTop: "30px",
  }}
>
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <XAxis dataKey="name" />
      <YAxis hide />

      <Tooltip
  contentStyle={{
    background: "#111",
    border: "1px solid #333",
    borderRadius: "10px",
  }}
/>
      <Bar
  dataKey="amount"
  fill="#00e676"
  radius={[8, 8, 0, 0]}
/>
    </BarChart>
  </ResponsiveContainer>
</div>
    <div>
      <h4>Total Payments</h4>
     
      <p>₹{stats.totalRevenue.toLocaleString("en-IN")}</p>

    </div>

    <div>
      <h4>Average Payment</h4>
      <p>
        ₹
        {stats.totalPayments > 0
      
       ? Math.round(
    stats.totalRevenue / stats.totalPayments
  ).toLocaleString("en-IN")
      
    : 0}
      </p>
    </div>

    <div>
      <h4>Top Paying Member</h4>
      <p>{stats.topPayingMember}</p>
    </div>
  </div>
</div>

          <div
  style={{
    marginTop: "30px",
    background: "#111",
    padding: "25px",
    borderRadius: "20px",
    border: "1px solid #222",
  }}
>
  <h2>⚡ Recent Activity</h2>

  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "15px",
      marginTop: "20px",
    }}
  >

    <div>
  🟢 Latest Payment: {stats.latestPaymentMember}
</div>

<div>
  💰 Amount Received: ₹{stats.latestPaymentAmount}
</div>

<div>
  📸 Attendance Marked: {stats.latestMember}
</div>

<div>
  ➕ New Member: {stats.newestMember}
</div>

  </div>
</div>
 
        </div>
      </div>
    </div>
  );
}
