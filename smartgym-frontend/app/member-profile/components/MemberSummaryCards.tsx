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
      
        gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",    
        gap: "20px",       
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
   
    <Card
  title="⏳ Days Left"
  value={member.daysLeft || 0}
  color={
    Number(member.daysLeft) <= 7
      ? "#ff5252"
      : Number(member.daysLeft) <= 30
      ? "#ff9800"
      : "#00e676"
  }
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
    background: "#161616",
    padding: "34px",
    borderRadius: "22px",
    textAlign: "center",
    border: `1px solid ${color}`,
    boxShadow: "0 8px 24px rgba(0,0,0,0.25)",
    transition: "all .25s ease",

    minHeight: "170px",
display: "flex",
flexDirection: "column",
justifyContent: "center",

  }}
>

   <h3
  style={{
    color: "#aaa",
    fontSize: "18px",
    marginBottom: "18px",
    fontWeight: 500,
  }}
>
  {title}
</h3>

   <h2
  style={{
    color,
    fontSize: "46px",
    fontWeight: "bold",
    margin: 0,
  }}
>

        {value}
      </h2>
    </div>
  );
}
