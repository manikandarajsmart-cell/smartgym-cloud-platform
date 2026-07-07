type Stats = {
  totalMembers: number;
  thisMonthRevenue: number;
  totalRevenue: number;
  totalPayments: number;
  topPayingMember: string;
  activeTrainers: number;
  attendanceCount: number;
  activeMembers: number;
  paidMembers: number;
  pendingMembers: number;
  expiringSoon: number;
  expiredMembers: number;
};

export default function DashboardStats({
  stats,
}: {
  stats: Stats;
}) {

const cards = [
  {
    title: "👥 Total Members",
    value: stats.totalMembers,
    color: "#2962ff",
  },
  {
    title: "🏋 Active Trainers",
    value: stats.activeTrainers,
    color: "#00c853",
  },
  {
    title: "💰 Monthly Revenue",
    value: `₹${stats.thisMonthRevenue.toLocaleString("en-IN")}`,
    color: "#ff9100",
  },
  {
    title: "📈 Total Revenue",
    value: `₹${stats.totalRevenue.toLocaleString("en-IN")}`,
    color: "#9c27b0",
  },
  {
    title: "✅ Active Members",
    value: stats.activeMembers,
    color: "#00acc1",
  },
  {
    title: "📅 Today's Attendance",
    value: stats.attendanceCount,
    color: "#ff6d00",
  },
  {
    title: "⚠ Expiring Soon",
    value: stats.expiringSoon,
    color: "#ff1744",
  },
  {
    title: "💳 Total Payments",
    value: stats.totalPayments,
    color: "#7b1fa2",
  },
];

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit,minmax(250px,1fr))",
        gap: "25px",
      }}
    >
      {cards.map((card) => (
        <div
          key={card.title}
          style={{
            background: "#111",
            borderRadius: "18px",
            padding: "28px",
            border: `2px solid ${card.color}`,
          }}
        >
          <h3
            style={{
              color: "#aaa",
              marginBottom: "15px",
            }}
          >
            {card.title}
          </h3>

          <h1
            style={{
              color: card.color,
              fontSize: "48px",
              fontWeight: "bold",
            }}
          >
            {card.value}
          </h1>
        </div>
      ))}
    </div>
  );
}
