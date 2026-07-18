import Card from "@/app/components/ui/Card";

export default function ProgressCard() {
  return (
    <Card>
      <h2
        style={{
          color: "white",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        📈 Progress
      </h2>

      <div
        style={{
          color: "#d1d5db",
          lineHeight: "2",
          fontSize: "16px",
        }}
      >
        <p>⚖️ Weight : 72.4 kg</p>
        <p>🔥 Body Fat : 18%</p>
        <p>💪 Muscle Mass : 36 kg</p>
        <p>📅 Last Updated : Today</p>
      </div>

      <button
        style={{
          marginTop: "20px",
          background: "#00d84a",
          color: "white",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          cursor: "pointer",
          fontWeight: "bold",
          fontSize: "16px",
        }}
      >
        View Progress
      </button>
    </Card>
  );
}
