"use client";

import { useState } from "react";
import axios from "axios";

export default function QRGeneratorPage() {
  const [memberName, setMemberName] = useState("");
  const [qrImage, setQrImage] = useState("");

  const generateQR = async () => {
    try {
      const res = await axios.post(
        "https://smartgym.cloud/api/generate-qr",
        {
          memberName,
        }
      );

      setQrImage(res.data.qrImage);

    } catch (error) {
      alert("QR Generation Failed");
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
      <h1 style={{ fontSize: "50px", marginBottom: "30px" }}>
        🔥 QR Generator
      </h1>

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
          marginRight: "15px",
        }}
      />

      <button
        onClick={generateQR}
        style={{
          padding: "15px 25px",
          background: "#00ff66",
          border: "none",
          borderRadius: "10px",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Generate QR
      </button>

      {qrImage && (
        <div style={{ marginTop: "40px" }}>
          <img
            src={qrImage}
            alt="QR Code"
            style={{
              background: "white",
              padding: "20px",
              borderRadius: "20px",
              width: "300px",
            }}
          />
        </div>
      )}
    </div>
  );
}
