"use client";

interface StatusBadgeProps {
  status: string;
}

export default function StatusBadge({
  status,
}: StatusBadgeProps) {
  const color =
    status === "Active"
      ? "#00c853"
      : status === "Expired"
      ? "#e53935"
      : status === "Pending"
      ? "#ff9800"
      : "#2962ff";

  return (
    <span
      style={{
        display: "inline-block",
        padding: "6px 12px",
        borderRadius: "999px",
        background: color,
        color: "#fff",
        fontWeight: 700,
        fontSize: "13px",
      }}
    >
      {status}
    </span>
  );
}
