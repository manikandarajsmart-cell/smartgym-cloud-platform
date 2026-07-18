import { ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  onClick?: () => void;
};

export default function Button({
  children,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        background: "#00d84a",
        color: "white",
        border: "none",
        padding: "12px 22px",
        borderRadius: "10px",
        cursor: "pointer",
        fontWeight: "bold",
        fontSize: "16px",
        transition: "0.25s",
      }}
    >
      {children}
    </button>
  );
}
