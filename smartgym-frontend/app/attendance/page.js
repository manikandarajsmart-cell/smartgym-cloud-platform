"use client";

import { useState } from "react";

export default function AttendancePage() {
  const [memberName, setMemberName] = useState("");

  const handleAttendance = async () => {
    if (!memberName) {
      alert("Enter Member Name");
      return;
    }

    try {
      const res = await fetch("https://smartgym.cloud/api/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberName,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Attendance Added");
        setMemberName("");
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          marginBottom: "50px",
        }}
      >
        📸 QR Attendance
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Enter Member Name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          style={{
            padding: "20px",
            width: "300px",
            borderRadius: "10px",
            border: "1px solid gray",
            background: "#111",
            color: "white",
            fontSize: "20px",
          }}
        />

        <button
          onClick={handleAttendance}
          style={{
            padding: "20px 40px",
            background: "#00ff66",
            color: "black",
            border: "none",
            borderRadius: "10px",
            fontSize: "22px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Check In
        </button>
      </div>
    </div>
  );
}
