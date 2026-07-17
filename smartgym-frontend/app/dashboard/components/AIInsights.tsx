"use client";

import { useRouter } from "next/navigation";

interface AIInsightsProps {
  stats: {
    totalMembers: number;
    activeMembers: number;
    expiredMembers: number;
    expiringSoon: number;
    todayRevenue: number;
    todayMembers: number;
    totalPayments: number;
  };
}

export default function AIInsights({ stats }: AIInsightsProps) {
  const router = useRouter();

  const insights = [
    {
      icon: "👥",
      title: "Active Members",
      text: `${stats.activeMembers} active out of ${stats.totalMembers} total members.`,
    },
    {
      icon: "⚠️",
      title: "Expiring Soon",
      text: `${stats.expiringSoon} memberships expire soon.`,
    },
    {
      icon: "💰",
      title: "Today's Revenue",
      text: `₹${stats.todayRevenue.toLocaleString()}`,
    },
    {
      icon: "💳",
      title: "Payments",
      text: `${stats.totalPayments} payments recorded.`,
    },
  ];

  let healthScore = 100;

  healthScore -= stats.expiredMembers * 2;
  healthScore -= stats.expiringSoon * 3;

  if (stats.todayRevenue === 0) {
    healthScore -= 10;
  }

  healthScore = Math.max(0, Math.min(100, healthScore));

  let recommendation = "Everything looks healthy today.";

  if (stats.expiringSoon > 0) {
    recommendation = `Contact ${stats.expiringSoon} members whose memberships expire soon.`;
  }

  if (stats.expiredMembers > 5) {
    recommendation =
      "High number of expired memberships. Launch a renewal campaign.";
  }

  if (stats.todayRevenue === 0) {
    recommendation =
      "No revenue today. Follow up with pending renewals.";
  }

  return (
    <div
      style={{
        background: "#111",
        border: "1px solid #2c2c2c",
        borderRadius: 18,
        padding: 24,
        marginTop: 30,
        marginBottom: 30,
      }}
    >
      <h2
        style={{
          margin: 0,
          marginBottom: 20,
          color: "#00E5FF",
        }}
      >
        🧠 AI Insights
      </h2>

      <div
        style={{
          background: "#181818",
          padding: 20,
          borderRadius: 14,
          marginBottom: 20,
          border: "1px solid #333",
        }}
      >
        <div
          style={{
            fontSize: 18,
            color: "#00E5FF",
            fontWeight: "bold",
          }}
        >
          🏥 Gym Health Score
        </div>

        <div
          style={{
            fontSize: 40,
            fontWeight: "bold",
            color: "#00E676",
            margin: "10px 0",
          }}
        >
          {healthScore}/100
        </div>

        <div
          style={{
            color: "#ccc",
            lineHeight: 1.6,
          }}
        >
          {recommendation}
        </div>
      </div>

      {insights.map((item) => (
        <div
          key={item.title}
          style={{
            padding: "14px 0",
            borderBottom: "1px solid #222",
          }}
        >
          <div
            style={{
              fontWeight: 700,
              fontSize: 16,
            }}
          >
            {item.icon} {item.title}
          </div>

          <div
            style={{
              opacity: 0.85,
              marginTop: 4,
            }}
          >
            {item.text}
          </div>
        </div>
      ))}

      <div
        style={{
          marginTop: 24,
          padding: 18,
          borderRadius: 12,
          background: "#1A1A1A",
          color: "#90EE90",
          fontWeight: 600,
        }}
      >
        💡 AI Recommendation: Contact members with expiring memberships and
        offer a renewal discount this week.
      </div>

      <div
        style={{
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          marginTop: 20,
        }}
      >
        <button
          onClick={() => router.push("/members")}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#00E676",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          👥 View Members
        </button>

        <button
          onClick={() => router.push("/payments")}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#00BCD4",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          💰 View Payments
        </button>

        <button
          onClick={() => router.push("/member-list")}
          style={{
            padding: "10px 16px",
            borderRadius: 8,
            border: "none",
            cursor: "pointer",
            background: "#FFC107",
            color: "#000",
            fontWeight: "bold",
          }}
        >
          📋 Member List
        </button>
      </div>
    </div>
  );
}
