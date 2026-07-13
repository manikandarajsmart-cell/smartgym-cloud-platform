"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";
import Sidebar from "../../components/Sidebar";

type Member = {
  name: string;
  memberId: string;
  phone: string;
  status: string;
  expiryDate: string;
};

export default function ScanPage() {
  const [result, setResult] = useState("No Result");
  const [message, setMessage] = useState("");
  const [memberInfo, setMemberInfo] = useState<Member | null>(null);
  const [lastScanned, setLastScanned] = useState("");

  const markAttendance = async (memberId: string) => {
    try {
      const response = await fetch(
        "https://smartgym.cloud/api/attendance",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ memberId }),
        }
      );

      const data = await response.json();

      console.log("Attendance API Response:", data);

      if (data.member) {
        setMemberInfo(data.member);
      }

      if (data.alreadyMarked) {
        setMessage("⚠️ Attendance already marked today");
      } else if (data.success) {
        setMessage(`✅ Attendance Marked: ${memberId}`);
      } else {
        setMessage(data.message || "❌ Attendance Failed");
      }
    } catch (error) {
      console.error(error);
      setMessage("❌ Attendance Failed");
    }
  };

return (
  <>
    <Sidebar />

    <div

      style={{
        minHeight: "100vh",
        background: "#000",
        color: "#fff",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "30px",
      }}
    >
      <h1 style={{ fontSize: "50px", marginBottom: "20px" }}>
        📷 SmartGym QR Scanner
      </h1>

      <div
        style={{
          width: 320,
          border: "4px solid #00ff66",
          borderRadius: 20,
          overflow: "hidden",
        }}
      >
        <Scanner
          constraints={{
            facingMode: "environment",
          }}
          onScan={(codes) => {
            if (!codes?.length) return;

            const memberId = codes[0].rawValue;

            if (!memberId || memberId === lastScanned) return;

            setLastScanned(memberId);
            setResult(memberId);

            markAttendance(memberId);

            setTimeout(() => {
              setLastScanned("");
            }, 3000);
          }}
          onError={(err) => console.log(err)}
        />
      </div>

      <div
        style={{
          marginTop: 20,
          background: "#111",
          padding: 15,
          borderRadius: 12,
          fontSize: 22,
        }}
      >
        {result}
      </div>

      <div
        style={{
          marginTop: 15,
          color: "#00ff66",
          fontSize: 22,
          fontWeight: "bold",
        }}
      >
        {message}
      </div>

      {memberInfo && (
        <div
          style={{
            marginTop: 25,
            width: 340,
            background: "#111",
            borderRadius: 15,
            padding: 20,
            lineHeight: "2",
            boxShadow: "0 0 15px rgba(0,255,102,0.4)",
          }}
        >
          <h2
            style={{
              color: "#00ff66",
              marginBottom: 15,
              textAlign: "center",
            }}
          >
            Member Details
          </h2>

          <div><strong>👤 Name:</strong> {memberInfo.name}</div>
          <div><strong>🆔 Member ID:</strong> {memberInfo.memberId}</div>
          <div><strong>📞 Phone:</strong> {memberInfo.phone}</div>
          <div><strong>💪 Status:</strong> {memberInfo.status}</div>
          <div><strong>📅 Expiry:</strong> {memberInfo.expiryDate}</div>
        </div>
      )}

    </div>
  </>
  );
}
