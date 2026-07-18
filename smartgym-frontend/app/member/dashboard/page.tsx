"use client";

import { useEffect, useState } from "react";

import HeroCard from "./components/HeroCard";
import QuickStats from "./components/QuickStats";
import WorkoutCard from "./components/WorkoutCard";
import DietCard from "./components/DietCard";
import ProgressCard from "./components/ProgressCard";

export default function MemberDashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("http://YOUR_BACKEND_IP:5000/dashboard/stats")
      .then((res) => res.json())
      .then((data) => {
        console.log("Dashboard Stats:", data);
        setStats(data.stats);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <div
      style={{
        background: "#0d1117",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <HeroCard />

      <QuickStats />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
          marginTop: "25px",
        }}
      >
        <WorkoutCard />
        <DietCard />
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))",
          gap: "25px",
          marginTop: "25px",
        }}
      >
        <ProgressCard />
      </div>
    </div>
  );
}
