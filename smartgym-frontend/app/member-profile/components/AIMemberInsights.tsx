export default function AIMemberInsights({
  member,
  attendance,
}: any) {
  const attendanceCount = attendance.filter(
    (a: any) =>
      a.memberName?.toLowerCase() === member.name?.toLowerCase()
  ).length;

  const healthScore = Math.min(100, 60 + attendanceCount * 2);

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
          marginBottom: "15px",
        }}
      >
        🤖 AI Member Insights
      </h2>

      <p>
        <strong>Health Score:</strong> {healthScore}/100
      </p>

      <p>
        <strong>Attendance Records:</strong> {attendanceCount}
      </p>

      <p>
        <strong>AI Suggestion:</strong>{" "}
        {healthScore > 85
          ? "Excellent consistency. Keep training!"
          : "Increase weekly attendance for better results."}
      </p>
    </div>
  );
}
