type Props = {
  totalClasses: number;
};

export default function ClassCard({ totalClasses }: Props) {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <h2>📚 Classes Overview</h2>

      <p
        style={{
          fontSize: 24,
          fontWeight: "bold",
          color: "#22c55e",
          marginTop: 10,
        }}
      >
        {totalClasses}
      </p>

      <p>Total Classes</p>
    </div>
  );
}
