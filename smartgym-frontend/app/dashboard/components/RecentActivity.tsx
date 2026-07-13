export default function RecentActivity() {
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
        🔥 Recent Activity
      </h2>

      <div style={{ lineHeight: "2.2", fontSize: "18px" }}>
        <div>🟢 Premium Test checked in today</div>
        <div>💳 Payment received from Premium Test</div>
        <div>👤 New member registered</div>
        <div>⚠️ 4 memberships expiring soon</div>
      </div>
    </div>
  );
}
