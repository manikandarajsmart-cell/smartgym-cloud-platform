"use client";

import { useState } from "react";
import { Scanner } from "@yudiel/react-qr-scanner";

export default function ScanPage() {
  const [result, setResult] = useState("No Result");

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "20px",
        padding: "20px",
      }}
    >
      <h1 style={{ fontSize: "60px" }}>📷 Live QR Scanner</h1>

      <div
        style={{
          width: "320px",
          height: "320px",
          overflow: "hidden",
          borderRadius: "20px",
          border: "4px solid lime",
        }}
      >
        <Scanner
          constraints={{
            facingMode: "environment",
          }}
          onScan={(result) => {
            if (result?.[0]?.rawValue) {
              setResult(result[0].rawValue);
            }
          }}
          onError={(error) => {
            console.log(error);
          }}
        />
      </div>

      <div
        style={{
          background: "#111",
          padding: "20px",
          borderRadius: "15px",
          fontSize: "24px",
        }}
      >
        {result}
      </div>
    </div>
  );
}
