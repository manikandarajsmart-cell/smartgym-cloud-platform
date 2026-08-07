export default function BusinessIntelligence({
  members,
  payments,
  attendance,
}: any) {
  const activeMembers = members.filter(
    (m: any) => m.status === "Active"
  ).length;

  const retention =
    members.length > 0
      ? Math.round((activeMembers / members.length) * 100)
      : 0;

  const revenue = payments.reduce(
    (sum: number, p: any) => sum + Number(p.amount || 0),
    0
  );

  const atRisk = members.filter((m: any) => {
    const days = Number(m.daysLeft);
    return !isNaN(days) && days <= 7;
  }).length;

  const inactive = members.length - activeMembers;

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: 16,
        padding: 24,
        marginTop: 30,
      }}
    >
      <h2 style={{ color: "#00e676" }}>
        🧠 Business Intelligence
      </h2>

      <p><strong>Total Revenue:</strong> ₹{revenue}</p>
      <p><strong>Retention Rate:</strong> {retention}%</p>
      <p><strong>Members At Risk:</strong> {atRisk}</p>
      <p><strong>Inactive Members:</strong> {inactive}</p>

      <hr style={{ margin: "20px 0", borderColor: "#333" }} />

      <h3>🤖 AI Recommendations</h3>

      <ul>
        <li>Contact {atRisk} expiring members.</li>
        <li>Re-engage {inactive} inactive members.</li>
        <li>Maintain retention above 95%.</li>
      </ul>
    </div>
  );
}
