"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";

type Props = {
  stats: any;
  chartData: any[];
};

export default function RevenueAnalytics({
  stats,
  chartData,
}: Props) {
  return (
    <div
      style={{
        marginTop: "30px",
        background: "#111",
        padding: "30px",
        borderRadius: "20px",
        border: "1px solid #222",
      }}
    >
      <h2
        style={{
          marginBottom: "25px",
          fontSize: "28px",
          fontWeight: "bold",
        }}
      >
        📊 Revenue Analytics
      </h2>

      {/* KPI Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginBottom: "35px",
        }}
      >
        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h4 style={{ color: "#aaa", marginBottom: "10px" }}>
            💰 Total Revenue
          </h4>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "#00e676",
              margin: 0,
            }}
          >
            ₹{stats.totalRevenue.toLocaleString("en-IN")}
          </p>
        </div>

        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h4 style={{ color: "#aaa", marginBottom: "10px" }}>
            💳 Total Payments
          </h4>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {stats.totalPayments}
          </p>
        </div>

        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h4 style={{ color: "#aaa", marginBottom: "10px" }}>
            📈 Average Payment
          </h4>
          <p
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            ₹
            {stats.totalPayments > 0
              ? Math.round(
                  stats.totalRevenue / stats.totalPayments
                ).toLocaleString("en-IN")
              : 0}
          </p>
        </div>

        <div
          style={{
            background: "#181818",
            padding: "20px",
            borderRadius: "16px",
            border: "1px solid #2a2a2a",
          }}
        >
          <h4 style={{ color: "#aaa", marginBottom: "10px" }}>
            🏆 Top Paying Member
          </h4>
          <p
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            {stats.topPayingMember}
          </p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div
        style={{
          background: "#181818",
          padding: "20px",
          borderRadius: "16px",
          border: "1px solid #2a2a2a",
        }}
      >
        <h3
          style={{
            marginBottom: "20px",
          }}
        >
          Monthly Revenue
        </h3>

        <div
          style={{
            width: "100%",
            height: "350px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis
                dataKey="name"
                stroke="#999"
              />

              <YAxis
                stroke="#999"
              />

              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "1px solid #333",
                  borderRadius: "10px",
                  color: "#fff",
                }}
              />

              <Bar
                dataKey="amount"
                fill="#00e676"
                radius={[10, 10, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
