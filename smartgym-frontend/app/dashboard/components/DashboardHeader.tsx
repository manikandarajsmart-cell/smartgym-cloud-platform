"use client";

import { useRouter } from "next/navigation";

export default function DashboardHeader() {
  const router = useRouter();

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "☀️ Good Morning"
      : hour < 17
      ? "🌤️ Good Afternoon"
      : "🌙 Good Evening";

  const today = new Date().toLocaleDateString("en-IN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const actionButton = (
    color: string,
    label: string,
    route: string
  ) => (
    <button
      onClick={() => router.push(route)}
      style={{
        background: color,
        color: "#fff",
        border: "none",
        padding: "14px 22px",
        borderRadius: "14px",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: "15px",
        transition: "all .2s ease",
        boxShadow: "0 8px 20px rgba(0,0,0,.25)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translateY(-2px)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translateY(0)";
      }}
    >
      {label}
    </button>
  );

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "24px",
        marginBottom: "40px",
      }}
    >
      <div>
        <div
          style={{
            fontSize: "16px",
            color: "#9ca3af",
            marginBottom: "8px",
          }}
        >
          {greeting}
        </div>

        <h1
          style={{
            fontSize: "38px",
            fontWeight: 800,
            margin: 0,
          }}
        >
          Smart Gym Dashboard
        </h1>

        <div
          style={{
            marginTop: "10px",
            color: "#bdbdbd",
            fontSize: "16px",
          }}
        >
          {today}
        </div>

        <div
          style={{
            marginTop: "6px",
            color: "#00e676",
            fontWeight: 600,
          }}
        >
          🚀 Welcome back! Let's grow the gym today.
        </div>
      </div>

      <div
        style={{
          display: "flex",
          gap: "14px",
          flexWrap: "wrap",
        }}
      >
        {actionButton("#00c853", "➕ Add Member", "/members")}
        {actionButton("#2962ff", "💳 Add Payment", "/payments")}
        {actionButton("#ff9100", "📸 Attendance", "/attendance")}
        {actionButton("#aa00ff", "👥 Members List", "/member-list")}
      </div>
    </div>
  );
}
