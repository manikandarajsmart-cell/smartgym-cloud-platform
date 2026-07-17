export default function DietCard() {
  return (
    <div
      style={{
        background: "#161b22",
        color: "white",
        padding: "25px",
        borderRadius: "18px",
        marginTop: "25px",
        border: "1px solid #2d333b",
      }}
    >
      <h2>🥗 Today's Diet</h2>

      <div style={{ marginTop: "20px", lineHeight: "2" }}>
        <p>🍳 Breakfast : Oats + Eggs</p>
        <p>🍛 Lunch : Rice + Chicken</p>
        <p>🥜 Snacks : Almonds + Banana</p>
        <p>🍗 Dinner : Grilled Chicken + Salad</p>
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
        }}
      >
        View Full Diet
      </button>
    </div>
  );
}
