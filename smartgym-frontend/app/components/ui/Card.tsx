import { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
};

export default function Card({ children }: CardProps) {
  return (
    <div
      style={{
        background: "#161b22",
        border: "1px solid #2d333b",
        borderRadius: "18px",
        padding: "25px",
        boxShadow: "0 6px 20px rgba(0,0,0,0.25)",
        minHeight: "280px",
      }}
    >
      {children}
    </div>
  );
}
