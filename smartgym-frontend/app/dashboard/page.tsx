"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import { useRouter } from "next/navigation";

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
        {/* TOP BAR */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "40px",
            flexWrap: "wrap",
            gap: "20px",
          }}
        >
          <h1
            style={{
              fontSize: "60px",
              fontWeight: "bold",
            }}
          >
            🚀 Smart Gym Dashboard
          </h1>

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

        {/* STATS GRID */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "25px",
          }}
        >
          {/* CARD 1 */}
          <div
            style={{
              background: "#111",
              padding: "35px",
              borderRadius: "20px",
              border: "1px solid #222",
            }}
          >
            <h3
              style={{
                color: "#aaa",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Total Members
            </h3>

            <h1
              style={{
                fontSize: "65px",
                fontWeight: "bold",
              }}
            >
              {stats.totalMembers}
            </h1>
          </div>

          {/* CARD 2 */}
          <div
            style={{
              background: "#111",
              padding: "35px",
              borderRadius: "20px",
              border: "1px solid #222",
            }}
          >
            <h3
              style={{
                color: "#aaa",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Active Trainers
            </h3>

            <h1
              style={{
                fontSize: "65px",
                fontWeight: "bold",
              }}
            >
              {stats.activeTrainers}
            </h1>
          </div>

          {/* CARD 3 */}
          <div
            style={{
              background: "#111",
              padding: "35px",
              borderRadius: "20px",
              border: "1px solid #222",
            }}
          >
            <h3
              style={{
                color: "#aaa",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Monthly Revenue
            </h3>

            <h1
              style={{
                fontSize: "65px",
                fontWeight: "bold",
              }}
            >
              ₹{stats.monthlyRevenue}
            </h1>
          </div>

          {/* CARD 4 */}
          <div
            style={{
              background: "#111",
              padding: "35px",
              borderRadius: "20px",
              border: "1px solid #222",
            }}
          >
            <h3
              style={{
                color: "#aaa",
                marginBottom: "20px",
                fontSize: "20px",
              }}
            >
              Growth Rate
            </h3>

            <h1
              style={{
                fontSize: "65px",
                fontWeight: "bold",
                color: "#00ff88",
              }}
            >
              {stats.growthRate}
            </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
