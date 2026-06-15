type AuthCardProps = {
  children: React.ReactNode;
};

export default function AuthCard({
  children,
}: AuthCardProps) {
  return (
    <div
      style={{
        width: "400px",
        padding: "30px",
        border: "1px solid #333",
        borderRadius: "15px",
        background: "#111",
      }}
    >
      {children}
    </div>
  );
}
