type ButtonProps = {
  text: string;
  onClick?: () => void;
};

export default function Button({
  text,
  onClick,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "20px",
        background: "#00cc66",
        border: "none",
        borderRadius: "8px",
        color: "white",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      {text}
    </button>
  );
}
