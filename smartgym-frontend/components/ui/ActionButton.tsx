"use client";

import React from "react";

type Variant = "primary" | "success" | "warning" | "danger" | "secondary";

interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: Variant;
  width?: string;
}

const colors = {
  primary: "#2962ff",
  success: "#00c853",
  warning: "#ff9800",
  danger: "#e53935",
  secondary: "#424242",
};

export default function ActionButton({
  children,
  onClick,
  variant = "primary",
  width,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: colors[variant],
        color: "#fff",
        border: "none",
        borderRadius: "10px",
        padding: "12px 20px",
        cursor: "pointer",
        fontWeight: 700,
        fontSize: "15px",
        transition: "0.25s",
        width: width || "auto",
        boxShadow: "0 6px 15px rgba(0,0,0,0.25)",
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.opacity = "0.9";
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.opacity = "1";
      }}
    >
      {children}
    </button>
  );
}
