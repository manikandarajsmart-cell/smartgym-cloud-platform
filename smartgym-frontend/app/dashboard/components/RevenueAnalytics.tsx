"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

type Props = {
  stats: any;
  chartData: any[];
};

function Card({
  title,
  value,
  color = "#fff",
}: {
  title: string;
  value: string | number;
  color?: string;
}) {

return (
  <div
    style={{
      background: "#181818",
      padding: "20px",
      borderRadius: "16px",
      border: "1px solid #2a2a2a",
    }}
  >
    <h4
      style={{
        color: "#aaa",
        marginBottom: "10px",
      }}
    >
      {title}
    </h4>

    <p
      style={{
        fontSize: "28px",
        fontWeight: "bold",
        margin: 0,
        color,
      }}
    >
      {value}
    </p>
  </div>
);
}

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
  <Card
    title="💰 Total Revenue"
    value={`₹${stats.totalRevenue.toLocaleString("en-IN")}`}
    color="#00e676"
  />

  <Card
    title="💳 Total Payments"
    value={stats.totalPayments}
  />

  <Card
    title="📈 Average Payment"
    value={`₹${
      stats.totalPayments > 0
        ? Math.round(
            stats.totalRevenue / stats.totalPayments
          ).toLocaleString("en-IN")
        : 0
    }`}
  />

  <Card
    title="🏆 Top Paying Member"
    value={stats.topPayingMember}
  />

  <Card
    title="🟢 Active Membership"
    value={`${stats.activeMembershipRate}%`}
    color="#4caf50"
  />

  <Card
    title="💵 Collection Rate"
    value={`${stats.collectionRate}%`}
    color="#29b6f6"
  />

  <Card
    title="👤 Avg Revenue / Member"
    value={`₹${stats.averageRevenuePerMember}`}
    color="#ffb300"
  />

  <Card
    title="📅 Attendance Rate"
    value={`${stats.attendanceRate}%`}
    color="#ab47bc"
  />
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
    height: 350,
    minHeight: 350,
    minWidth: 0,
  }}
>

      <ResponsiveContainer width="100%" height={350}>       

          <BarChart
  data={chartData}
  margin={{
    top: 20,
    right: 30,
    left: 10,
    bottom: 5,
  }}
>
  <XAxis
    dataKey="name"
    stroke="#888"
    tick={{ fill: "#ccc", fontSize: 12 }}
    axisLine={{ stroke: "#333" }}
    tickLine={false}
  />

  <YAxis
    stroke="#888"
    tick={{ fill: "#ccc", fontSize: 12 }}
    axisLine={{ stroke: "#333" }}
    tickLine={false}
    tickFormatter={(value) => `₹${value}`}
  />

  <Tooltip
    formatter={(value: any) => [
      `₹${Number(value).toLocaleString("en-IN")}`,
      "Revenue",
    ]}
    contentStyle={{
      background: "#1a1a1a",
      border: "1px solid #333",
      borderRadius: "12px",
      color: "#fff",
    }}
    labelStyle={{
      color: "#00e676",
      fontWeight: "bold",
    }}
  />

<Bar
  dataKey="amount"
  fill="#00e676"
  radius={[12, 12, 0, 0]}
  maxBarSize={80}
  animationDuration={1200}
/>

</BarChart>

          </ResponsiveContainer>
        </div>
      </div>
     <div
  style={{
    marginTop: "30px",
    background: "#181818",
    padding: "20px",
    borderRadius: "16px",
    border: "1px solid #2a2a2a",
  }}
>
  <h3 style={{ marginBottom: "20px" }}>
    👥 Membership Status
  </h3>

     <div
  style={{
    width: "100%",
    height: 320,
    minHeight: 320,
    minWidth: 0,
  }}
>

   <ResponsiveContainer width="100%" height={320}>
      <PieChart>
        <Pie
          data={[
            {
              name: "Active",
              value: stats.activeMembers,
            },
            {
              name: "Expiring",
              value: stats.expiringSoon,
            },
            {
              name: "Expired",
              value: stats.expiredMembers,
            },
          ]}
          dataKey="value"
          nameKey="name"
          outerRadius={110}
          label
        >
          <Cell fill="#00e676" />
          <Cell fill="#ffb300" />
          <Cell fill="#ff5252" />
        </Pie>

        <Tooltip />

        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>
</div>
    </div>
  );
}
