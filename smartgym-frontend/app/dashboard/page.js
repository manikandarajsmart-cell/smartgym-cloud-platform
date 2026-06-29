"use client";

import { useEffect, useState } from "react";

export default function DashboardPage() {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const res = await fetch("https://smartgym.cloud/api/members");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const totalMembers = members.length;

  const totalRevenue = members.reduce((acc, member) => {
    return acc + Number(member.fee || 0);
  }, 0);

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
          marginBottom: "40px",
        }}
      >
        SmartGym Dashboard
      </h1>

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        <div
          style={{
            background: "#111",
            padding: "30px",
            borderRadius: "20px",
            width: "300px",
            border: "1px solid #333",
          }}
        >
          <h2>Total Members</h2>

          <h1
            style={{
              fontSize: "50px",
              color: "lime",
            }}
          >
            {totalMembers}
          </h1>
        </div>

        <div
          style={{
            background: "#111",
            padding: "30px",
            borderRadius: "20px",
            width: "300px",
            border: "1px solid #333",
          }}
        >
          <h2>Total Revenue</h2>

          <h1
            style={{
              fontSize: "40px",
              color: "orange",
            }}
          >
            ₹{totalRevenue}
          </h1>
        </div>

        <div
          style={{
            background: "#111",
            padding: "30px",
            borderRadius: "20px",
            width: "300px",
            border: "1px solid #333",
          }}
        >
          <h2>System Status</h2>

          <h1
            style={{
              fontSize: "35px",
              color: "cyan",
            }}
          >
            LIVE
          </h1>
        </div>
      </div>
    </div>
  );
}
