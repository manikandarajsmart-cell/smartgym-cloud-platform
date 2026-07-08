"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function Sidebar() {
  const [role, setRole] = useState("admin");

  useEffect(() => {
    const savedRole = localStorage.getItem("smartgym-role");
    if (savedRole) {
      setRole(savedRole);
    }
  }, []);

  return (

    <aside
      style={{
        width: "250px",
        minWidth: "250px",
        height: "100vh",
        background: "#000",
        color: "#fff",
        padding: "30px",
        position: "fixed",
        left: 0,
        top: 0,
        overflowY: "auto",
        borderRight: "1px solid #222",
      }}
    >
      <h1
        style={{
          color: "#00ff88",
          fontSize: "36px",
          fontWeight: "bold",
          marginBottom: "40px",
        }}
      >
        Smart Gym
      </h1>

  <nav
  style={{
    display: "flex",
    flexDirection: "column",
    gap: "18px",
    fontSize: "22px",
  }}
>
  <Link href="/dashboard">Dashboard</Link>

  {(role === "admin" || role === "reception") && (
    <>
      <Link href="/members">Add Member</Link>
      <Link href="/member-list">Members List</Link>
      <Link href="/payments">Payments</Link>
      <Link href="/scan">QR Scanner</Link>
    </>
  )}

  {(role === "admin" || role === "trainer" || role === "reception") && (
    <>
      <Link href="/attendance">Attendance</Link>
      <Link href="/attendance-records">Attendance Records</Link>
    </>
  )}

  {(role === "admin" || role === "trainer") && (
    <>
      <Link href="/workout-plans">Workout Plans</Link>
      <Link href="/diet-plans">Diet Plans</Link>
    </>
  )}

  {role === "admin" && (
    <>
      <Link href="/trainers">Trainers</Link>
      <Link href="/classes">Classes</Link>
      <Link href="/needs-attention">Needs Attention</Link>
      <Link href="/qr-generator">QR Generator</Link>
    </>
  )}
</nav>

    </aside>
  );
}
