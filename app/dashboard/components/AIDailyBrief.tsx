interface AIDailyBriefProps {
  stats: {
    activeMembers: number;
    expiringSoon: number;
    todayRevenue: number;
  };
}

export default function AIDailyBrief({
  stats,
}: AIDailyBriefProps) {
  const recovery = stats.expiringSoon * 1500;

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #2a2a2a",
        borderRadius: 18,
        padding: 24,
        marginBottom: 24,
      }}
    >
      <h2
        style={{
          color: "#00E5FF",
          marginTop: 0,
        }}
      >
        🌅 AI Daily Brief
      </h2>

      <p>Welcome back!</p>

      <div>👥 Active Members: {stats.activeMembers}</div>
      <div>⚠️ Expiring Soon: {stats.expiringSoon}</div>
      <div>💰 Today's Revenue: ₹{stats.todayRevenue.toLocaleString()}</div>

      <hr
        style={{
          margin: "20px 0",
          borderColor: "#333",
        }}
      />

      <h3>🔥 Priority Tasks</h3>

      <ul>
        {stats.expiringSoon > 0 && (
          <li>Call {stats.expiringSoon} members today.</li>
        )}

        {stats.todayRevenue === 0 && (
          <li>Follow up on pending renewals.</li>
        )}

        <li>Promote premium membership plans.</li>
      </ul>

      <div
        style={{
          marginTop: 20,
          color: "#00E676",
          fontWeight: "bold",
          fontSize: 18,
        }}
      >
        Potential Recovery: ₹{recovery.toLocaleString()}
      </div>
    </div>
  );
}
