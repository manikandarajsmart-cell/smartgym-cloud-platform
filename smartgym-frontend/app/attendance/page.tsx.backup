"use client";

import { useEffect, useState } from "react";
import axios from "axios";

export default function AttendancePage() {
  const [memberName, setMemberName] = useState("");
  const [attendance, setAttendance] = useState([]);

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(
        "https://smartgym.cloud/api/attendance"
      );

      setAttendance(res.data.attendance);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckIn = async () => {
    if (!memberName) return;

    try {
      await axios.post(
        "https://smartgym.cloud/api/attendance",
        {
          memberName,
        }
      );

      setMemberName("");
      fetchAttendance();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "48px",
          marginBottom: "30px",
        }}
      >
        📸 QR Attendance
      </h1>

      <div
        style={{
          display: "flex",
          gap: "10px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Enter Member Name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          style={{
            padding: "15px",
            width: "300px",
            borderRadius: "10px",
            border: "none",
            fontSize: "18px",
          }}
        />

        <button
          onClick={handleCheckIn}
          style={{
            padding: "15px 25px",
            borderRadius: "10px",
            border: "none",
            background: "#00ff66",
            color: "black",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Check In
        </button>
      </div>

      <div>
        {attendance.map((item: any, index: number) => (
          <div
            key={index}
            style={{
              background: "#111",
              padding: "20px",
              marginBottom: "15px",
              borderRadius: "10px",
            }}
          >
            <h2>{item.memberName}</h2>

            <p>{item.date}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
