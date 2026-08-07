export default function NeedsAttention({
  members,
  payments,
  attendance,
  progress,
}: any) {
  const today = new Date();

  const attentionMembers = members
    .map((member: any) => {
      const issues: string[] = [];

      const daysLeft = Number(member.daysLeft);

      if (!isNaN(daysLeft) && daysLeft >= 0 && daysLeft <= 7) {
        issues.push("🔴 Membership expires within 7 days");
      }

      const latestPayment = payments
        .filter((p: any) => p.memberId === member.memberId)
        .slice(-1)[0];

      if (
        latestPayment &&
        latestPayment.status &&
        latestPayment.status !== "Paid"
      ) {
        issues.push("💳 Payment Pending");
      }

      const latestAttendance = attendance
        .filter((a: any) => a.memberName === member.name)
        .slice(-1)[0];

      if (latestAttendance?.date) {
        const diff =
          (today.getTime() -
            new Date(latestAttendance.date).getTime()) /
          (1000 * 60 * 60 * 24);

        if (diff > 7) {
          issues.push("📅 No attendance for 7+ days");
        }
      }

      const latestProgress = progress
        .filter((p: any) => p.memberId === member.memberId)
        .slice(-1)[0];

      if (latestProgress?.createdAt) {
        const diff =
          (today.getTime() -
            new Date(latestProgress.createdAt).getTime()) /
          (1000 * 60 * 60 * 24);

        if (diff > 30) {
          issues.push("📉 No progress update for 30+ days");
        }
      }

      return {
        member,
        issues,
      };
    })
    .filter((item: any) => item.issues.length > 0);

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #222",
        borderRadius: "16px",
        padding: "24px",
        marginTop: "30px",
      }}
    >
      <h2
        style={{
          color: "#ff9800",
          marginBottom: "20px",
        }}
      >
        🚨 Needs Attention Center
      </h2>

      {attentionMembers.length === 0 ? (
        <p style={{ color: "#00e676" }}>
          🎉 Great! No members currently need attention.
        </p>
      ) : (
        attentionMembers.map((item: any) => (
          <div
            key={item.member._id}
            style={{
              background: "#1b1b1b",
              borderRadius: "12px",
              padding: "16px",
              marginBottom: "15px",
            }}
          >
            <h3>{item.member.name}</h3>

            <ul>
              {item.issues.map(
                (issue: string, index: number) => (
                  <li key={index}>{issue}</li>
                )
              )}
            </ul>
          </div>
        ))
      )}
    </div>
  );
}
