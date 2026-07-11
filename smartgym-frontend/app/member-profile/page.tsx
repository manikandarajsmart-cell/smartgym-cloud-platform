"use client";

import { useEffect, useState } from "react";
import StatusBadge from "@/components/ui/StatusBadge";
import { useRouter } from "next/navigation";
import Sidebar from "../../components/Sidebar";
import ActionButton from "@/components/ui/ActionButton";

import ProfileHeader from "./components/ProfileHeader";
import MemberSummaryCards from "./components/MemberSummaryCards";
import PaymentHistory from "./components/PaymentHistory";
import AttendanceHistory from "./components/AttendanceHistory";
import WorkoutHistory from "./components/WorkoutHistory";
import DietHistory from "./components/DietHistory";
import ProgressHistory from "./components/ProgressHistory";

export default function MemberProfilePage() {
  const router = useRouter();
  const [member, setMember] = useState<any>(null);
  const [payments, setPayments] = useState<any[]>([]);
  const [attendance, setAttendance] = useState<any[]>([]);
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [dietPlans, setDietPlans] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);

useEffect(() => {
  const stored = localStorage.getItem("selectedMember");

  if (stored) {
    setMember(JSON.parse(stored));
  }

  fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments`)
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setPayments(data.payments);
      }
    })
      .catch((err) => console.log(err));
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/attendance`)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setAttendance(data.attendance);
    }
  })
  .catch((err) => console.log(err)); 
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/workout-plans`)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setWorkouts(data.plans);
    }
  })
  .catch((err) => console.log(err));
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/diet-plans`)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setDietPlans(data.plans);
    }
  })
  .catch((err) => console.log(err));
  fetch(`${process.env.NEXT_PUBLIC_API_URL}/progress`)
  .then((res) => res.json())
  .then((data) => {
    if (data.success) {
      setProgress(data.progress);
    }
  })
  .catch((err) => console.log(err));

}, []);

  if (!member) {
    return (
      <div
        style={{
          background: "#000",
          color: "white",
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "22px",
        }}
      >
        Loading Member...
      </div>
    );
  }

  const status =
    new Date(member.expiryDate) < new Date()
      ? "Expired"
      : "Active";

  return (
    <div
      style={{
        display: "flex",
        background: "#000",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "250px",
          padding: "40px",
        }}
      >

       <ActionButton
  variant="success"
  onClick={() => router.push("/member-list")}
>
  ← Back to Members List
</ActionButton>

        <h1
          style={{
            fontSize: "42px",
            marginBottom: "30px",
          }}
        >
          👤 Member Profile
        </h1>

        <div
          style={{
            background: "#111",
            borderRadius: "15px",
            padding: "30px",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "200px 1fr",
              gap: "30px",
            }}
          >

       <div
  style={{
    width: "180px",
    height: "180px",
    borderRadius: "50%",
    background: "linear-gradient(135deg,#2962ff,#00c853)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontSize: "56px",
    fontWeight: "bold",
    color: "#fff",
    position: "relative",
    boxShadow: "0 10px 30px rgba(0,0,0,.35)",
  }}
>
  {member.name
    ? member.name
        .split(" ")
        .map((n: string) => n[0])
        .join("")
        .substring(0, 2)
        .toUpperCase()
    : "👤"}

  <div
    style={{
      position: "absolute",
      bottom: "-10px",
      padding: "6px 14px",
      borderRadius: "20px",
      background:
        status === "Active" ? "#00c853" : "#ff1744",
      color: "#fff",
      fontSize: "14px",
      fontWeight: "bold",
      border: "2px solid #111",
    }}
  >
    {status}
  </div>
</div>

            <div>
              <h2 style={{ fontSize: "34px" }}>
                {member.name}
              </h2>
  <div
  style={{
    color: "#999",
    fontSize: "18px",
    marginTop: "8px",
    marginBottom: "20px",
  }}
>

Member ID: <b>{member.memberId || "-"}</b> • Joined{" "}
<b>{member.joinDate || "-"}</b>

</div>

            <div
  style={{
    display: "flex",
    gap: "12px",
    flexWrap: "wrap",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
  <button
    onClick={() => router.push("/members")}
    style={{
      background: "#2962ff",
      color: "#fff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ✏️ Edit Member
  </button>

  <button
    onClick={() => router.push("/payments")}
    style={{
      background: "#00c853",
      color: "#fff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    💳 Add Payment
  </button>

   <button
  onClick={() => router.push("/attendance")}
  style={{
    background: "#ff9100",
    color: "#fff",
    border: "none",
    padding: "10px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  📸 Attendance
</button>

  <button
    onClick={() =>
      window.open(
        `https://wa.me/91${member.phone || ""}`,
        "_blank"
      )
    }
    style={{
      background: "#25D366",
      color: "#fff",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    💬 WhatsApp
  </button>
</div>   
              <hr
                style={{
                  margin: "20px 0",
                  borderColor: "#333",
                }}
              />

              <p><b>Phone:</b> {member.phone || "-"}</p>

              <p><b>Email:</b> {member.email || "-"}</p>

              <p><b>Age:</b> {member.age || "-"}</p>

              <p><b>Gender:</b> {member.gender || "-"}</p>

              <p><b>Address:</b> {member.address || "-"}</p>

              <p><b>Membership Plan:</b> {member.plan}</p>

              <p><b>Fee:</b> ₹{member.fee}</p>

              <p><b>Join Date:</b> {member.joinDate}</p>

              <p><b>Expiry Date:</b> {member.expiryDate}</p>

              <p>
                <b>Status:</b>{" "}
              
               <StatusBadge status={status} />

              </p>
            </div>

          </div>
        </div>

<MemberSummaryCards
  member={member}
  payments={payments}
  attendance={attendance}
  workouts={workouts}
  dietPlans={dietPlans}
  status={status}
/>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2,1fr)",
            gap: "20px",
            marginTop: "30px",
          }}
        >
          <div
            style={{
              background: "#111",
              padding: "25px",
              borderRadius: "15px",
            }}
          >

          <h2 style={{ marginBottom: "15px" }}>💳 Payment History</h2>

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    color: "white",
  }}
>
  <thead>
    <tr style={{ borderBottom: "1px solid #333" }}>
      <th style={{ textAlign: "left", padding: "8px" }}>Date / Month</th>
      <th style={{ textAlign: "left", padding: "8px" }}>Amount</th>
      <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
    </tr>
  </thead>

  <tbody>
    {payments
      .filter(
        (payment) =>
          payment.memberName?.toLowerCase() ===
          member.name?.toLowerCase()
      )
      .map((payment) => (
        <tr key={payment._id}>
          <td style={{ padding: "8px" }}>
            {payment.date || payment.month || "-"}
          </td>

          <td style={{ padding: "8px" }}>
            ₹{payment.amount}
          </td>

          <td
            style={{
              padding: "8px",
              color:
                payment.status === "Paid"
                  ? "#00e676"
                  : "#ff5252",
            }}
          >
            {payment.status || "Paid"}
          </td>
        </tr>
      ))}

    {payments.filter(
      (payment) =>
        payment.memberName?.toLowerCase() ===
        member.name?.toLowerCase()
    ).length === 0 && (
      <tr>
        <td
          colSpan={3}
          style={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          No payment history found.
        </td>
      </tr>
    )}
  </tbody>
</table>

          </div>






          <div
            style={{
              background: "#111",
              padding: "25px",
              borderRadius: "15px",
            }}
          >

         <h2 style={{ marginBottom: "15px" }}>📅 Attendance History</h2>

<table
  style={{
    width: "100%",
    borderCollapse: "collapse",
    color: "white",
  }}
>
  <thead>
    <tr style={{ borderBottom: "1px solid #333" }}>
      <th style={{ textAlign: "left", padding: "8px" }}>Date</th>
      <th style={{ textAlign: "left", padding: "8px" }}>Status</th>
    </tr>
  </thead>

  <tbody>
    {attendance
      .filter(
        (item) =>
          item.memberName?.toLowerCase() ===
          member.name?.toLowerCase()
      )
      .map((item) => (
        <tr key={item._id}>
          <td style={{ padding: "8px" }}>
            {item.date}
          </td>

          <td
            style={{
              padding: "8px",
              color: "#00e676",
              fontWeight: "bold",
            }}
          >
            Present
          </td>
        </tr>
      ))}

    {attendance.filter(
      (item) =>
        item.memberName?.toLowerCase() ===
        member.name?.toLowerCase()
    ).length === 0 && (
      <tr>
        <td
          colSpan={2}
          style={{
            textAlign: "center",
            padding: "20px",
          }}
        >
          No attendance history found.
        </td>
      </tr>
    )}
  </tbody>
</table>

          </div>

          <div
            style={{
              background: "#111",
              padding: "25px",
              borderRadius: "15px",
            }}
          >

   <WorkoutHistory
  member={member}
  workouts={workouts}
/>

          </div>

          <div
            style={{
              background: "#111",
              padding: "25px",
              borderRadius: "15px",
            }}
          >

<DietHistory
  member={member}
  dietPlans={dietPlans}
/>
<ProgressHistory
  member={member}
  progress={progress}
/>

          </div>
        </div>
      </div>
    </div>
  );
}
