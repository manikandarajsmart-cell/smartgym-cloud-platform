"use client";

interface Props {
  member: any;
  payments: any[];
  attendance: any[];
  workouts: any[];
  dietPlans: any[];
  status: string;
}

export default function MemberSummaryCards({
  member,
  payments,
  attendance,
  workouts,
  dietPlans,
  status,
}: Props) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
        gap: "15px",
        marginTop: "25px",
        marginBottom: "30px",
      }}
    >
      <Card
        title="💰 Payments"
        value={`₹${payments
          .filter(
            (p) =>
              p.memberName?.toLowerCase() ===
              member.name?.toLowerCase()
          )
          .reduce((sum, p) => sum + Number(p.amount || 0), 0)}`}
      />

      <Card
        title="📅 Attendance"
        value={
          attendance.filter(
            (a) =>
              a.memberName?.toLowerCase() ===
              member.name?.toLowerCase()
          ).length
        }
      />

      <Card
        title="🏋 Workouts"
        value={
          workouts.filter(
            (w) =>
              w.memberName?.toLowerCase() ===
              member.name?.toLowerCase()
          ).length
        }
      />

      <Card
        title="🥗 Diet"
        value={
          dietPlans.filter(
            (d) =>
              d.memberName?.toLowerCase() ===
              member.name?.toLowerCase()
          ).length > 0
            ? "Active"
            : "None"
        }
      />

      <Card
        title="⭐ Status"
        value={status}
        color={status === "Active" ? "#00e676" : "#ff5252"}
      />
    </div>
  );
}

function Card({
  title,
  value,
  color = "white",
}: {
  title: string;
  value: any;
  color?: string;
}) {
  return (
    <div
      style={{
        background: "#111",
        padding: "20px",
        borderRadius: "12px",
        textAlign: "center",
      }}
    >
      <h3>{title}</h3>

      <h2
        style={{
          color,
          marginTop: "10px",
        }}
      >
        {value}
      </h2>
    </div>
  );
}
