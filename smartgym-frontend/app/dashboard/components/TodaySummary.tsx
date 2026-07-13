"use client";

interface Props {
  attendanceCount: number;
  todayRevenue: number;
  todayMembers: number;
  expiringSoon: number;
}

export default function TodaySummary({
  attendanceCount,
  todayRevenue,
  todayMembers,
  expiringSoon,
}: Props) {
  return (
    <div
      style={{
        marginTop: "40px",
        background: "#151515",
        borderRadius: "18px",
        padding: "25px",
        border: "1px solid #2a2a2a",
      }}
    >
      <h2
        style={{
          color: "#00ff66",
          marginBottom: "20px",
          fontSize: "28px",
        }}
      >
        📊 Today's Summary
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4,1fr)",
          gap: "20px",
        }}
      >
        <div style={{ background:"#111",padding:"20px",borderRadius:"12px" }}>
          <h3>👥 New Members</h3>
          <h1>{todayMembers}</h1>
        </div>

        <div style={{ background:"#111",padding:"20px",borderRadius:"12px" }}>
          <h3>📷 Attendance</h3>
          <h1>{attendanceCount}</h1>
        </div>

        <div style={{ background:"#111",padding:"20px",borderRadius:"12px" }}>
          <h3>💰 Revenue</h3>
          <h1>₹{todayRevenue}</h1>
        </div>

        <div style={{ background:"#111",padding:"20px",borderRadius:"12px" }}>
          <h3>⚠️ Expiring</h3>
          <h1>{expiringSoon}</h1>
        </div>
      </div>
    </div>
  );
}
