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
      <h2>📊 Revenue Analytics</h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
          gap: "20px",
          marginTop: "20px",
        }}
      >
        <div>
          <h4>Total Revenue</h4>
          <p>₹{stats.totalRevenue.toLocaleString("en-IN")}</p>
        </div>

        <div
          style={{
            width: "100%",
            height: "300px",
            marginTop: "30px",
          }}
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="name" />
              <YAxis hide />
              <Tooltip
                contentStyle={{
                  background: "#111",
                  border: "1px solid #333",
                  borderRadius: "10px",
                }}
              />
              <Bar
                dataKey="amount"
                fill="#00e676"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h4>Total Payments</h4>
          <p>{stats.totalPayments}</p>
        </div>

        <div>
          <h4>Average Payment</h4>
          <p>
            ₹
            {stats.totalPayments > 0
              ? Math.round(
                  stats.totalRevenue / stats.totalPayments
                ).toLocaleString("en-IN")
              : 0}
          </p>
        </div>

        <div>
          <h4>Top Paying Member</h4>
          <p>{stats.topPayingMember}</p>
        </div>
      </div>
    </div>
  );
}
