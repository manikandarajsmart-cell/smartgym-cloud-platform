type InputProps = {
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
};

export default function Input({
  placeholder,
  value,
  onChange,
  type = "text",
}: InputProps) {
  return (
    <input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      type={type}
      style={{
        width: "100%",
        padding: "12px",
        marginTop: "15px",
        background: "#222",
        border: "1px solid #333",
        borderRadius: "8px",
        color: "white",
      }}
    />
  );
}
