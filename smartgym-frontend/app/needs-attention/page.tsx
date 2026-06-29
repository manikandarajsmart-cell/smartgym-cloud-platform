"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function NeedsAttentionPage() {
  const [members, setMembers] = useState<any[]>([]);

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/members`
      );

      const data = await response.json();

  const filtered = data.filter(
  (member: any) =>
    member.status === "Expired" ||
    member.status === "Expiring Soon" ||
    member.paymentStatus === "Pending"
);
  
      setMembers(filtered);
    } catch (error) {
      console.log(error);
    }
  };

  const openWhatsapp = (member: any) => {
    const phone = member.phone || "";

    const message = encodeURIComponent(
      `Hi ${member.name}, your Smart Gym membership is ${member.status}. Please renew your membership.`
    );

    window.open(
      `https://wa.me/${phone}?text=${message}`,
      "_blank"
    );
  };
const renewMember = async (memberId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/members/${memberId}/renew`,
      {
        method: "PUT",
      }
    );

    const data = await response.json();

    if (data.success) {
      alert("Member renewed successfully");
      fetchMembers();
    } else {
      alert(data.message || "Renewal failed");
    }
  } catch (error) {
    console.log(error);
    alert("Server error");
  }
};

  return (
    <div
      style={{
        display: "flex",
        background: "#000",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          marginLeft: "260px",
          padding: "30px",
          width: "100%",
          color: "white",
        }}
      >
        <h1
          style={{
            fontSize: "48px",
            marginBottom: "25px",
          }}
        >
          🚨 Needs Attention
        </h1>

       <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
    gap: "20px",
    marginBottom: "25px",
  }}
>
  <div
    style={{
      background: "#111",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h3>🚨 Total Follow-Ups</h3>
    <h1>{members.length}</h1>
  </div>

  <div
    style={{
      background: "#111",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h3>🔴 Expired</h3>
    <h1>
      {
        members.filter(
          (m) => m.status === "Expired"
        ).length
      }
    </h1>
  </div>

  <div
    style={{
      background: "#111",
      padding: "20px",
      borderRadius: "12px",
    }}
  >
    <h3>🟠 Expiring Soon</h3>
    <h1>
      {
        members.filter(
          (m) => m.status === "Expiring Soon"
        ).length
      }
    </h1>
  </div>
   <div
  style={{
    background: "#111",
    padding: "20px",
    borderRadius: "12px",
  }}
>
  <h3>💰 Pending Payments</h3>
  <h1>
    {
      members.filter(
        (m) => m.paymentStatus === "Pending"
      ).length
    }
  </h1>
</div>
</div>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#111",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "15px" }}>Name</th>
              <th style={{ padding: "15px" }}>Phone</th>
              <th style={{ padding: "15px" }}>Plan</th>
              <th style={{ padding: "15px" }}>Expiry Date</th>
             <th style={{ padding: "15px" }}>Days Left</th>
              <th style={{ padding: "15px" }}>Status</th>
              <th style={{ padding: "15px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {members.map((member) => (
              <tr key={member._id}>
                <td style={{ padding: "15px" }}>{member.name}</td>

                <td style={{ padding: "15px" }}>
                  {member.phone || "-"}
                </td>

                <td style={{ padding: "15px" }}>
                  {member.plan}
                </td>

                <td style={{ padding: "15px" }}>
                  {member.expiryDate || "-"}
                </td>
                
                <td style={{ padding: "15px" }}>
  {member.daysLeft ?? "-"}
</td>

                <td
                  style={{
                    padding: "15px",
                    color:
                      member.status === "Expired"
                        ? "#ff1744"
                        : "#ff9800",
                    fontWeight: "bold",
                  }}
                >
                  {member.status}
                </td>

                <td style={{ padding: "15px" }}>
                  <button
            onClick={() => renewMember(member._id)}   
                     style={{
                      background: "#00c853",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Renew
                  </button>

                  <button
                    onClick={() => openWhatsapp(member)}
                    style={{
                      background: "#25D366",
                      color: "white",
                      border: "none",
                      padding: "8px 14px",
                      borderRadius: "8px",
                      cursor: "pointer",
                    }}
                  >
                    WhatsApp
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
