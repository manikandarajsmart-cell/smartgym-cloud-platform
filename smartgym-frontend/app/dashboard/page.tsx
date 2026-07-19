"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

import DashboardHeader from "./components/DashboardHeader";
import DashboardStats from "./components/DashboardStats";
import RevenueAnalytics from "./components/RevenueAnalytics";
import RecentPayments from "./components/RecentPayments";
import TodaySummary from "./components/TodaySummary";
import RecentActivity from "./components/RecentActivity";
import AIInsights from "./components/AIInsights";
import AskSmartGymAI from "./components/AskSmartGymAI";

export default function DashboardPage() {
  const router = useRouter();

const [stats, setStats] = useState({
  totalMembers: 0,
  activeMembers: 0,
  expiredMembers: 0,
  totalRevenue: 0,
  todayAttendance: 0,
});

const [members, setMembers] = useState<any[]>([]);
const [payments, setPayments] = useState<any[]>([]);
const [attendance, setAttendance] = useState<any[]>([]);
const [revenueForecast, setRevenueForecast] = useState({
  expectedRevenue: 0,
  expectedRenewals: 0,
  revenueAtRisk: 0,
  suggestion: "",
});

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

const today = new Date().toLocaleDateString();

const attendanceCount = attendance.filter(
  (item) => item.date === today
).length;

const todayRevenue = payments
  .filter((payment) => payment.date === today)
  .reduce((sum, payment) => sum + Number(payment.amount || 0), 0);

const todayMembers = members.filter(
  (member) => member.joinDate === today
).length;

const activeMembershipRate =
  members.length > 0
    ? Math.round((activeMembers / members.length) * 100)
    : 0;

const collectionRate =
  members.length > 0
    ? Math.round((totalPayments / members.length) * 100)
    : 0;

const averageRevenuePerMember =
  members.length > 0
    ? Math.round(totalRevenue / members.length)
    : 0;

const attendanceRate =
  activeMembers > 0
    ? Math.round((attendanceCount / activeMembers) * 100)
    : 0;

const monthMap: Record<string, number> = {};

payments.forEach((payment: any) => {
  const paymentDate = new Date(payment.date);

  if (isNaN(paymentDate.getTime())) return;

  const month = paymentDate.toLocaleString("en-IN", {
    month: "short",
  });

  monthMap[month] =
    (monthMap[month] || 0) +
    Number(payment.amount || 0);
});

const monthOrder = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const chartData = monthOrder.map((month) => ({
  name: month,
  amount: monthMap[month] || 0,
}));

const recentActivity = [
  ...attendance
    .slice(-3)
    .reverse()
    .map((item: any) => ({
      icon: "🟢",
      text: `${item.memberName} checked in`,
    })),

  ...payments
    .slice(-3)
    .reverse()
    .map((payment: any) => ({
      icon: "💳",
      text: `${payment.memberName} paid ₹${payment.amount}`,
    })),

  ...members
    .slice(-3)
    .reverse()
    .map((member: any) => ({
      icon: "👤",
      text: `${member.name} joined SmartGym`,
    })),
].slice(0, 8);

const memberTotals: Record<string, number> = {};

payments.forEach((payment: any) => {
  const name = payment.memberName || "Unknown";

  memberTotals[name] =
    (memberTotals[name] || 0) + Number(payment.amount || 0);
});

const topPayingMember =
  Object.entries(memberTotals).sort(
    (a, b) => b[1] - a[1]
  )[0]?.[0] || "-";


   useEffect(() => {
  const auth = localStorage.getItem("smartgym-auth");

  if (!auth) {
    router.push("/login");
    return;
  }

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setStats(data.stats);
    }
  })
  .catch(console.error);

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
fetch(`${process.env.NEXT_PUBLIC_API_URL}/ai/revenue-forecast`)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setRevenueForecast(data.forecast);
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
    totalMembers: stats.totalMembers,
    activeMembers: stats.activeMembers,
    expiredMembers: stats.expiredMembers,
    expiringSoon,
    totalRevenue: stats.totalRevenue,
    totalPayments,
    attendanceCount: stats.todayAttendance,
    todayRevenue,
    todayMembers,

    thisMonthRevenue: stats.totalRevenue,
    topPayingMember,
    activeTrainers: 3,
    paidMembers: stats.activeMembers,
    pendingMembers: stats.expiredMembers,
  }}
/>

<AIInsights
  stats={{
    totalMembers: stats.totalMembers,
    activeMembers: stats.activeMembers,
    expiredMembers: stats.expiredMembers,
    expiringSoon,
    todayRevenue,
    todayMembers,
    totalPayments,
  }}
/>

<AskSmartGymAI />

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
  totalRevenue,
  totalPayments,
  topPayingMember,

  activeMembershipRate,
  collectionRate,
  averageRevenuePerMember,
  attendanceRate,

  activeMembers,
  expiredMembers,
  expiringSoon,
}}

  chartData={chartData}
/>

<div
  style={{
    marginTop: "40px",
    background: "#111",
    border: "1px solid #222",
    borderRadius: "20px",
    padding: "30px",
  }}
>
<div
  style={{
    background: "#111",
    border: "1px solid #333",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "24px",
  }}
>
  <h2
    style={{
      fontSize: "24px",
      marginBottom: "16px",
      color: "#facc15",
    }}
  >
    🔔 AI Notification Center
  </h2>

  <div style={{ lineHeight: "2" }}>
    <div>⚠️ MANI membership expires today</div>
    <div>💰 10 members have pending payments</div>
    <div>👥 0 members checked in today</div>
  </div>
</div>

  <h2
    style={{
      marginBottom: "20px",
      fontSize: "28px",
      fontWeight: "bold",
    }}
  >
    🤖 SmartGym AI Insights
  </h2>

  <div
    style={{
      display: "grid",
      gap: "16px",
      fontSize: "18px",
      lineHeight: "1.7",
    }}
  >

    <div>
  📈 Expected Renewal Revenue:
  <strong> ₹{revenueForecast.expectedRevenue.toLocaleString("en-IN")}</strong>
</div>

    <div>👥 Active Members: <strong>{activeMembers}</strong></div>

    <div>
  👥 Expected Renewals:
  <strong> {revenueForecast.expectedRenewals}</strong>
</div>

<div>
  💰 Revenue At Risk:
  <strong> ₹{revenueForecast.revenueAtRisk.toLocaleString("en-IN")}</strong>
</div>

<div>
  🤖 AI Suggestion:
  <strong> {revenueForecast.suggestion}</strong>
</div>

    <div>💳 Total Payments Received: <strong>{totalPayments}</strong></div>

    <div>📅 Today's Attendance: <strong>{attendanceCount}</strong></div>

    <div style={{ color: "#00e676", fontWeight: "bold" }}>
      💡 Recommendation: Follow up with members whose memberships expire this week.
    </div>
  </div>
</div>

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

<RecentPayments payments={payments} />

<TodaySummary
  attendanceCount={attendanceCount}
  todayRevenue={todayRevenue}
  todayMembers={todayMembers}
  expiringSoon={expiringSoon}
/>

<RecentActivity activities={recentActivity} />

      </div>
    </div>
  );
}
