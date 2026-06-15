"use client";

import { useState } from "react";

export default function MembersPage() {
  const [name, setName] = useState("");
  const [plan, setPlan] = useState("");
  const [fee, setFee] = useState("");

  const addMember = async () => {
    if (!name || !plan || !fee) {
      alert("Fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://api.smartgym.cloud/api/members",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
  name: name,
  plan: plan,
  fee: fee,
}),
        }
      );

      if (response.ok) {
        alert("Member Added");

        setName("");
        setPlan("");
        setFee("");
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
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "50px",
          fontWeight: "bold",
          marginBottom: "40px",
        }}
      >
        ➕ Add New Member
      </h1>

      <div
        style={{
          maxWidth: "700px",
          background: "#111",
          padding: "30px",
          borderRadius: "20px",
          border: "1px solid #222",
        }}
      >
        <input
          placeholder="Member Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Membership Plan"
          value={plan}
          onChange={(e) => setPlan(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Monthly Fee"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={addMember}
          style={{
            width: "100%",
            padding: "18px",
            borderRadius: "14px",
            border: "none",
            background: "#00d84a",
            color: "white",
            fontSize: "22px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Add Member
        </button>
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "18px",
  marginBottom: "20px",
  borderRadius: "12px",
  border: "1px solid #333",
  background: "#000",
  color: "white",
  fontSize: "18px",
};
