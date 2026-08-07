export default function AIDashboard({
  aiData,
  members,
  payments,
  attendance,
}: any) {

  const today = new Date();

  const healthScore = aiData?.healthScore ?? "-";
const riskScore = aiData?.riskScore ?? "-";
const engagementScore = aiData?.engagementScore ?? "-";
const revenueForecast = aiData?.revenueForecast ?? {};
const businessAdvice = aiData?.businessAdvice ?? [];

  const membersAtRisk = members.filter(
    (m: any) =>
      m.status !== "Active" ||
      (m.daysLeft !== undefined && Number(m.daysLeft) <= 7)
  ).length;

  const renewalsThisWeek = members.filter((m: any) => {
    const days = Number(m.daysLeft);
    return days >= 0 && days <= 7;
  }).length;

  const todayRevenue = payments
    .filter((p: any) => {
      if (!p.paymentDate) return false;
      return (
        new Date(p.paymentDate).toDateString() ===
        today.toDateString()
      );
    })
    .reduce(
      (sum: number, p: any) => sum + Number(p.amount || 0),
      0
    );

  const inactiveMembers = members.filter(
    (m: any) => m.status !== "Active"
  ).length;

  const forecast = Math.round(
    payments.reduce(
      (sum: number, p: any) => sum + Number(p.amount || 0),
      0
    ) * 1.1
  );

  return (
    <div
      style={{
        background: "#111",
        borderRadius: 16,
        padding: 24,
        marginBottom: 30,
        border: "1px solid #222",
      }}
    >
      <h2 style={{ color: "#00e676", marginBottom: 20 }}>
        🧠 SmartGym AI Dashboard
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: 20,
        }}
      >
        <div>
          <h3>🔴 Members At Risk</h3>

         <h1>{riskScore || membersAtRisk}</h1>
        </div>

        <div>
          <h3>🟡 Renewals This Week</h3>
          <h1>{renewalsThisWeek}</h1>
        </div>

        <div>
          <h3>💰 Today's Revenue</h3>
          <h1>₹{todayRevenue}</h1>
        </div>

        <div>
          <h3>📈 Revenue Forecast</h3>

         <h1>₹{revenueForecast.expectedRevenue || forecast}</h1>
        </div>
      </div>

      <div
        style={{
          marginTop: 25,
          background: "#181818",
          padding: 18,
          borderRadius: 10,
        }}
      >
        <h3>🤖 AI Suggestions</h3>

       <ul>
  {businessAdvice.length > 0 ? (
    businessAdvice.map((tip: string, index: number) => (
      <li key={index}>{tip}</li>
    ))
  ) : (
    <>
      <li>Contact {renewalsThisWeek} members before renewal.</li>
      <li>{inactiveMembers} members need follow-up.</li>
      <li>Forecast revenue: ₹{forecast}.</li>
    </>
  )}
</ul>

      </div>
    </div>
  );
}
