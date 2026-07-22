"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RoleGuard from "@/components/auth/RoleGuard";

export default function MemberListPage() {
const router = useRouter();

const [members, setMembers] = useState<any[]>([]);

const [editingMember, setEditingMember] = useState<any>(null);
const [search, setSearch] = useState("");
const [statusFilter, setStatusFilter] = useState("All");
const [paymentFilter, setPaymentFilter] = useState("All");
const [selectedMember, setSelectedMember] = useState<any>(null);
const [payments, setPayments] = useState<any[]>([]);
const [attendance, setAttendance] = useState<any[]>([]);

const viewMember = (member: any) => {
  localStorage.setItem(
    "selectedMember",
    JSON.stringify(member)
  );

  router.push("/member-profile");
};

   useEffect(() => {
  fetchMembers();
  fetchPayments();
  fetchAttendance();
}, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/members`
      );

      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPayments = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/payments`
    );

    const data = await response.json();

    if (data.success) {
      setPayments(data.payments);
    }
  } catch (error) {
    console.log(error);
  }
};

const fetchAttendance = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/attendance`
    );

    const data = await response.json();

    if (data.success) {
      setAttendance(data.attendance);
    }
  } catch (error) {
    console.log(error);
  }
};

const exportMembersCSV = () => {
  const headers = [
    "Name",
    "Phone",
    "Plan",
    "Fee",
    "Join Date",
    "Expiry Date",
    "Status",
  ];

  const rows = members.map((m) => [
    m.name || "",
    m.phone || "",
    m.plan || "",
    m.fee || "",
    m.joinDate || "",
    m.expiryDate || "",
    m.status || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "smartgym-members.csv";
  link.click();

  URL.revokeObjectURL(url);
};

const renewMember = async (id: string) => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/members/${id}/renew`,
      {
        method: "PUT",
      }
    );

    alert("✅ Membership Renewed");

    fetchMembers();
  } catch (error) {
    console.log(error);
    alert("❌ Renewal Failed");
  }
};

const updateMember = async () => {
  try {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/members/${editingMember._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(editingMember),
      }
    );

    alert("✅ Member Updated");

    setEditingMember(null);
    fetchMembers();
  } catch (error) {
    console.log(error);
    alert("❌ Update Failed");
  }
};

const getMemberStatus = (expiryDate: string) => {
  if (!expiryDate) return "Active";

  const today = new Date();
  const expiry = new Date(expiryDate);

  const diffDays = Math.ceil(
    (expiry.getTime() - today.getTime()) /
      (1000 * 60 * 60 * 24)
  );

  if (diffDays < 0) return "Expired";
  if (diffDays <= 7) return "Expiring Soon";

  return "Active";
};

  const deleteMember = async (id: string) => {
    if (!window.confirm("Delete this member?")) return;

    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/members/${id}`,
        {
          method: "DELETE",
        }
      );

      fetchMembers();
    } catch (error) {
      console.log(error);
    }
  };

  const expiredCount = members.filter(
  (m) => getMemberStatus(m.expiryDate) === "Expired"
).length;

const expiringSoonCount = members.filter(
  (m) => getMemberStatus(m.expiryDate) === "Expiring Soon"
).length;

const activeCount = members.filter(
  (m) => getMemberStatus(m.expiryDate) === "Active"
).length;

return (
  <RoleGuard allowedRoles={["Admin", "Reception"]}>
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: "40px",
      }}
    >
      <h1 style={{ fontSize: "50px", marginBottom: "30px" }}>
        👥 Members CRM
     </h1>

{selectedMember && (
  <div
    style={{
      position: "fixed",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      background: "rgba(0,0,0,0.8)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: 9999,
    }}
  >
    <div
      style={{
        background: "#111",
        padding: "30px",
        borderRadius: "15px",
        minWidth: "400px",
        color: "white",
      }}
    >
      <h2>👤 Member Details</h2>
      {selectedMember.photo && (
  <img
    src={selectedMember.photo}
    alt="Member"
    style={{
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      display: "block",
      margin: "0 auto 20px auto",
      border: "3px solid #00e676",
    }}
  />
)}

      <p><b>Name:</b> {selectedMember.name || "-"}</p>
      <p><b>Phone:</b> {selectedMember.phone || "-"}</p>
      <p>
  <b>Payment:</b>{" "}
  {selectedMember.paymentStatus === "Paid"
    ? "🟢 Paid"
    : "🔴 Pending"}
</p>
      <p><b>Plan:</b> {selectedMember.plan || "-"}</p>
      <p><b>Fee:</b> ₹{selectedMember.fee || 0}</p>
      <p><b>Join Date:</b> {selectedMember.joinDate || "-"}</p>
      <p><b>Expiry Date:</b> {selectedMember.expiryDate || "-"}</p>
      <p>
        <b>Status:</b>{" "}
        {getMemberStatus(selectedMember.expiryDate)}
      </p>
     
           <hr style={{ margin: "15px 0", borderColor: "#333" }} />

      <h3>💰 Payment History</h3>

      {payments
        .filter(
          (payment) =>
            payment.memberName === selectedMember.name
        )
        .slice(0, 5)
        .map((payment) => (
          <p key={payment._id}>
            ₹{payment.amount} - {payment.month}
          </p>
        ))}

      {payments.filter(
        (payment) =>
          payment.memberName === selectedMember.name
      ).length === 0 && (
        <p>No payment history found</p>
      )}
     
      <hr style={{ margin: "15px 0", borderColor: "#333" }} />

<h3>📅 Attendance History</h3>
<p>
  DEBUG:
  {selectedMember.name} |
  {attendance.length}
</p>

{attendance
  .filter(
    (record) =>
      record.memberName === selectedMember.name
  )
  .slice(0, 10)
  .map((record) => (
    <p key={record._id}>
      ✅ {record.date}
    </p>
  ))}

{attendance.filter(
  (record) =>
    record.memberName === selectedMember.name
).length === 0 && (
  <p>No attendance history found</p>
)}

<p>
  <b>Total Attendance:</b>{" "}
  {
    attendance.filter(
      (record) =>
        record.memberName === selectedMember.name
    ).length
  }
</p>
   <div
  style={{
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "10px",
    marginTop: "20px",
    marginBottom: "20px",
  }}
>
    <button
  onClick={() =>
    window.open(
      `/workout-plans?member=${encodeURIComponent(selectedMember.name)}`,
      "_blank"
    )
  }
  style={quickButtonStyle}
>
  🏋️ Workout Plans
</button>

  <button
    onClick={() =>
      window.open("/diet-plans", "_blank")
    }
    style={quickButtonStyle}
  >
    🥗 Diet Plans
  </button>

  <button
    onClick={() =>
      window.open("/payments", "_blank")
    }
    style={quickButtonStyle}
  >
    💳 Payments
  </button>

  <button
    onClick={() =>
      window.open("/attendance", "_blank")
    }
    style={quickButtonStyle}
  >
    📅 Attendance
  </button>
</div>

      <button
        onClick={() => setSelectedMember(null)}
        style={{
          marginTop: "20px",
          background: "#ff1744",
          color: "white",
          border: "none",
          padding: "10px 20px",
          borderRadius: "8px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  </div>
)}

{editingMember && (
  <div
    style={{
      background: "#222",
      padding: "20px",
      marginBottom: "20px",
      borderRadius: "10px",
    }}
  >
    <h2>Edit Member</h2>

    <input
      value={editingMember.name || ""}
      onChange={(e) =>
        setEditingMember({
          ...editingMember,
          name: e.target.value,
        })
      }
      placeholder="Name"
      style={{ marginRight: "10px", padding: "8px" }}
    />

    <input
      value={editingMember.plan || ""}
      onChange={(e) =>
        setEditingMember({
          ...editingMember,
          plan: e.target.value,
        })
      }
      placeholder="Plan"
      style={{ marginRight: "10px", padding: "8px" }}
    />

    <input
      value={editingMember.fee || ""}
      onChange={(e) =>
        setEditingMember({
          ...editingMember,
          fee: e.target.value,
        })
      }
      placeholder="Fee"
      style={{ marginRight: "10px", padding: "8px" }}
    />
<input
  type="date"
  value={editingMember.expiryDate || ""}
  onChange={(e) =>
    setEditingMember({
      ...editingMember,
      expiryDate: e.target.value,
    })
  }
  style={{ marginRight: "10px", padding: "8px" }}
/>
    <button
      onClick={updateMember}
      style={{
        background: "#00c853",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "8px",
        marginRight: "10px",
      }}
    >
      Save
    </button>

    <button
      onClick={() => setEditingMember(null)}
      style={{
        background: "#ff1744",
        color: "white",
        border: "none",
        padding: "8px 12px",
        borderRadius: "8px",
      }}
    >
      Cancel
    </button>
  </div>
)}

  <div
  style={{
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>

<button
  onClick={exportMembersCSV}
  style={{
    background: "#00c853",
    color: "#fff",
    border: "none",
    padding: "12px 18px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    marginBottom: "20px",
  }}
>
  📊 Export Excel
</button>

<input
  type="text"
  placeholder="🔍 Search Name or Phone"
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "350px",
    padding: "12px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #333",
    background: "#111",
    color: "white",
    fontSize: "16px",
  }}
/>

  <div
    style={{
      background: "#111",
      padding: "15px 20px",
      borderRadius: "10px",
      color: "#00e676",
      fontWeight: "bold",
    }}
  >
    🟢 Active: {activeCount}
  </div>

  <div
    style={{
      background: "#111",
      padding: "15px 20px",
      borderRadius: "10px",
      color: "orange",
      fontWeight: "bold",
    }}
  >
    🟠 Expiring Soon: {expiringSoonCount}
  </div>

  <div
    style={{
      background: "#111",
      padding: "15px 20px",
      borderRadius: "10px",
      color: "red",
      fontWeight: "bold",
    }}
  >
    🔴 Expired: {expiredCount}
  </div>
</div>
   <button
  onClick={() => {
    const expiringMembers = members.filter(
      (m) => getMemberStatus(m.expiryDate) === "Expiring Soon"
    );

    expiringMembers.forEach((member) => {
      if (!member.phone) return;

      const message = encodeURIComponent(
        `Hi ${member.name},

Your Smart Gym membership will expire soon.

Please renew your membership.

Thank you,
Smart Gym`
      );

      window.open(
        `https://wa.me/${member.phone}?text=${message}`,
        "_blank"
      );
    });
  }}
  style={{
    background: "#25D366",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  📲 Send WhatsApp to Expiring Members
</button>

    <button
  onClick={exportMembersCSV}
  style={{
    background: "#2196f3",
    color: "white",
    border: "none",
    padding: "12px 20px",
    borderRadius: "8px",
    marginBottom: "20px",
    marginRight: "10px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  📥 Export Members CSV

</button>
   
  <div
  style={{
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap",
  }}
>

<div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
  <button
    onClick={() => setStatusFilter("All")}
    style={{ padding: "10px 15px", background: "#2196f3", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
  >
    All
  </button>

  <button
    onClick={() => setStatusFilter("Active")}
    style={{ padding: "10px 15px", background: "#00c853", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
  >
    Active
  </button>

  <button
    onClick={() => setStatusFilter("Expiring Soon")}
    style={{ padding: "10px 15px", background: "#ff9800", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
  >
    Expiring Soon
  </button>

  <button
    onClick={() => setStatusFilter("Expired")}
    style={{ padding: "10px 15px", background: "#f44336", color: "white", border: "none", borderRadius: "8px", cursor: "pointer" }}
  >
    Expired
  </button>
</div>

</div>
    <div style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
  <button
    onClick={() => setPaymentFilter("All")}
    style={{
      padding: "10px 15px",
      background: "#2196f3",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    All Payments
  </button>

  <button
    onClick={() => setPaymentFilter("Paid")}
    style={{
      padding: "10px 15px",
      background: "#00c853",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    🟢 Paid
  </button>

  <button
    onClick={() => setPaymentFilter("Pending")}
    style={{
      padding: "10px 15px",
      background: "#f44336",
      color: "white",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    🔴 Pending
  </button>
</div>

    <table
        style={{
          width: "100%",
          background: "#111",
        }}
      >
        <thead>
          <tr>

<th>Member ID</th>
<th>Name</th>
<th>Phone</th>
<th>Payment</th>
<th>Plan</th>
<th>Fee</th>

            <th>Join Date</th>
            <th>Expiry Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
{members

.filter((member) => {
  const matchesSearch =
    member.name?.toLowerCase().includes(search.toLowerCase()) ||
    member.phone?.toString().includes(search);

  const memberStatus = getMemberStatus(member.expiryDate);

const matchesStatus =
  statusFilter === "All" ||
  memberStatus === statusFilter;

const matchesPayment =
  paymentFilter === "All" ||
  member.paymentStatus === paymentFilter;

return (
  matchesSearch &&
  matchesStatus &&
  matchesPayment
);

})
  .map((member) => (
            <tr key={member._id}>

<td
  style={{
    fontWeight: "bold",
    color: "#00e5ff",
  }}
>
  {member.memberId || "-"}
</td>

<td>{member.name}</td>

<td>{member.phone || "-"}</td>

<td>
  {member.paymentStatus === "Paid"
    ? "🟢 Paid"
    : "🔴 Pending"}
</td>

<td>{member.plan}</td>
<td>₹{member.fee}</td>

              <td>{member.joinDate || "-"}</td>
              <td>{member.expiryDate || "-"}</td>
<td
  style={{
    color:
      getMemberStatus(member.expiryDate) === "Expired"
        ? "red"
        : getMemberStatus(member.expiryDate) === "Expiring Soon"
        ? "orange"
        : "#00e676",
    fontWeight: "bold",
  }}
>
  {getMemberStatus(member.expiryDate)}
</td>
            <td>

    <button
  onClick={() => viewMember(member)}
  style={{
    marginRight: "10px",
    background: "#673ab7",
    color: "white",
    border: "none",
    padding: "8px 12px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  View
</button>
  <button
    onClick={() => renewMember(member._id)}
    style={{
      marginRight: "10px",
      background: "#00c853",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Renew
  </button>

  <button
onClick={() =>
  setEditingMember({
    ...member,
    expiryDate: member.expiryDate
      ? new Date(member.expiryDate).toISOString().split("T")[0]
      : "",
  })
}
    style={{
      marginRight: "10px",
      background: "#2196f3",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Edit
  </button>

  <button
    onClick={() => deleteMember(member._id)}
    style={{
      background: "#ff1744",
      color: "white",
      border: "none",
      padding: "8px 12px",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    Delete
  </button>
<button
  onClick={() => {
    const message = encodeURIComponent(
      `Hi ${member.name},

Your Smart Gym membership is due for renewal.

Please contact us to renew your membership.

- Smart Gym`
    );

    if (!member.phone) {
  alert("Phone number not available");
  return;
}

window.open(
  `https://wa.me/${member.phone}?text=${message}`,
  "_blank"
);

  }}
  style={{
    marginLeft: "10px",
    background: "#25D366",
    color: "white",
    border: "none",
    padding: "8px 12px",
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
  </RoleGuard>
);
}

   const quickButtonStyle = {
  background: "#00c853",
  color: "white",
  border: "none",
  padding: "12px",
  borderRadius: "8px",
  cursor: "pointer",
  fontWeight: "bold",
};
   
