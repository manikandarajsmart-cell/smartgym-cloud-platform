export default function AIMemberInsights({
  member,
  attendance,
  progress,
  payments,
}: any) {
  const memberAttendance = attendance.filter(
    (a: any) =>
      a.memberName?.toLowerCase() === member.name?.toLowerCase()
  );

  const attendanceCount = memberAttendance.length;

  const latestProgress = progress
    .filter((p: any) => p.memberId === member.memberId)
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() -
        new Date(a.createdAt).getTime()
    )[0];

  const payment = payments
    .filter((p: any) => p.memberId === member.memberId)
    .slice(-1)[0];

  const paymentStatus =
    payment?.status || member.paymentStatus || "Unknown";

  const weight = latestProgress?.weight ?? "-";
  const bmi = latestProgress?.bmi ?? "-";

  let healthScore = 70;

  if (attendanceCount >= 20) healthScore += 15;
  else if (attendanceCount >= 12) healthScore += 10;
  else if (attendanceCount >= 6) healthScore += 5;

  if (typeof bmi === "number") {
    if (bmi >= 18.5 && bmi <= 24.9) {
      healthScore += 10;
    }
  }

  if (paymentStatus === "Paid") {
    healthScore += 5;
  }

  healthScore = Math.min(100, healthScore);

  const attendanceStatus =
    attendanceCount >= 20
      ? "Excellent"
      : attendanceCount >= 12
      ? "Good"
      : attendanceCount >= 6
      ? "Average"
      : "Needs Improvement";

  const coachTips: string[] = [];

  if (attendanceCount < 8) {
    coachTips.push("Increase weekly attendance.");
  }

  if (typeof bmi === "number") {
    if (bmi > 25) {
      coachTips.push("Focus on fat-loss training and nutrition.");
    } else if (bmi < 18.5) {
      coachTips.push("Increase calorie and protein intake.");
    } else {
      coachTips.push("Maintain current training consistency.");
    }
  }

  coachTips.push("Track body measurements every month.");

  const daysToExpiry = Math.ceil(
    (new Date(member.expiryDate).getTime() - Date.now()) /
      (1000 * 60 * 60 * 24)
  );

  let riskLevel = "Low";
  let riskColor = "#00c853";
  const riskReasons: string[] = [];

  if (attendanceCount < 6) {
    riskReasons.push("Low attendance");
  }

  if (paymentStatus !== "Paid") {
    riskReasons.push("Payment pending");
  }

  if (daysToExpiry <= 7 && daysToExpiry >= 0) {
    riskReasons.push("Membership expiring soon");
  }

  if (daysToExpiry < 0) {
    riskReasons.push("Membership expired");
  }

  if (riskReasons.length >= 3) {
    riskLevel = "High";
    riskColor = "#ff1744";
  } else if (riskReasons.length >= 1) {
    riskLevel = "Medium";
    riskColor = "#ff9800";
  }

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "15px",
        padding: "25px",
        marginTop: "25px",
        marginBottom: "25px",
      }}
    >
      <h2
        style={{
          color: "#00e676",
          marginBottom: "20px",
        }}
      >
        🧠 SmartGym AI Insights
      </h2>

      <p>
        <strong>🏆 Health Score:</strong> {healthScore}/100
      </p>

      <p>
        <strong>📅 Attendance:</strong> {attendanceStatus} ({attendanceCount} visits)
      </p>

      <p>
        <strong>⚖️ Latest Weight:</strong> {weight} kg
      </p>

      <p>
        <strong>📏 BMI:</strong> {bmi}
      </p>

      <p>
        <strong>💳 Payment:</strong> {paymentStatus}
      </p>

      <p>
        <strong>📆 Membership:</strong> {member.status}
      </p>

      <div
        style={{
          marginTop: 20,
          padding: 15,
          borderRadius: 10,
          background: "#1a1a1a",
          border: `1px solid ${riskColor}`,
        }}
      >
        <h3 style={{ color: riskColor }}>
          🚨 Member Risk Analysis
        </h3>

        <p>
          <strong>Risk Level:</strong> {riskLevel}
        </p>

        {riskReasons.length === 0 ? (
          <p style={{ color: "#00e676" }}>
            Excellent! No major risks detected.
          </p>
        ) : (
          <ul>
            {riskReasons.map((reason: string, index: number) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        )}
      </div>

      <div style={{ marginTop: 20 }}>
        <strong>🤖 AI Coach</strong>

        <ul style={{ marginTop: 10 }}>
          {coachTips.map((tip: string, index: number) => (
            <li key={index}>{tip}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
