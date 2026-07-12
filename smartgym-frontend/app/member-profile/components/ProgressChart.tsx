"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
} from "recharts";

interface Progress {
  date: string;
  weight?: number;
  bmi?: number;
  bodyFat?: number;
}

interface Props {
  progress: Progress[];
}

export default function ProgressChart({ progress }: Props) {
  if (!progress || progress.length === 0) {
    return (
      <div
        style={{
          background: "#111",
          borderRadius: "15px",
          padding: "25px",
          marginTop: "30px",
        }}
      >
        <h3 style={{ color: "white", marginBottom: "20px" }}>
          📈 Progress Analytics
        </h3>

        <div
          style={{
            color: "#888",
            textAlign: "center",
            padding: "60px 0",
          }}
        >
          No progress data available.
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        background: "#111",
        borderRadius: "15px",
        padding: "25px",
        marginTop: "30px",
      }}
    >
      <h3
        style={{
          color: "white",
          marginBottom: "25px",
          fontSize: "22px",
        }}
      >
        📈 Progress Analytics
      </h3>

      <div style={{ width: "100%", height: 400 }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={progress}>
            <CartesianGrid stroke="#333" />

            <XAxis dataKey="date" stroke="#aaa" />

            <YAxis stroke="#aaa" />

            <Tooltip />

            <Legend />

            <Line
              type="monotone"
              dataKey="weight"
              stroke="#00e676"
              strokeWidth={3}
              name="Weight (kg)"
            />

            <Line
              type="monotone"
              dataKey="bmi"
              stroke="#29b6f6"
              strokeWidth={3}
              name="BMI"
            />

            <Line
              type="monotone"
              dataKey="bodyFat"
              stroke="#ff9800"
              strokeWidth={3}
              name="Body Fat %"
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
