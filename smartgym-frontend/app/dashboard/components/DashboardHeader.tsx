"use client";

import { useRouter } from "next/navigation";
import SectionTitle from "@/components/ui/SectionTitle";

export default function DashboardHeader() {
  const router = useRouter();

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: "20px",
        marginBottom: "40px",
      }}
    >
      <SectionTitle
        title="Smart Gym Dashboard"
        subtitle="Welcome back! Here's what's happening today."
      />

      <div
        style={{
          display: "flex",
          gap: "12px",
          flexWrap: "wrap",
        }}
      >
        <button
          onClick={() => router.push("/members")}
          style={{
            background: "#00c853",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          ➕ Add Member
        </button>

        <button
          onClick={() => router.push("/payments")}
          style={{
            background: "#2962ff",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          💳 Add Payment
        </button>

        <button
          onClick={() => router.push("/attendance")}
          style={{
            background: "#ff9100",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          📸 Attendance
        </button>

        <button
          onClick={() => router.push("/member-list")}
          style={{
            background: "#aa00ff",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          👥 Members List
        </button>
      </div>
    </div>
  );
}
