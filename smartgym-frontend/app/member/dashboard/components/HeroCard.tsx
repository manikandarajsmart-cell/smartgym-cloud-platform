export default function HeroCard() {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #00c853, #00e676)",
        color: "white",
        padding: "30px",
        borderRadius: "20px",
        marginBottom: "25px",
        boxShadow: "0 10px 30px rgba(0, 216, 74, 0.25)",
      }}
    >
      <h1
        style={{
          margin: 0,
          fontSize: "32px",
        }}
      >
        👋 Good Morning, Manikandan
      </h1>

      <p
        style={{
          marginTop: "10px",
          fontSize: "18px",
          opacity: 0.95,
        }}
      >
        Ready to crush today's workout? 💪
      </p>

      <div
        style={{
          display: "flex",
          gap: "40px",
          flexWrap: "wrap",
          marginTop: "25px",
        }}
      >
        <div>
          <h4 style={{ margin: 0 }}>🟢 Membership</h4>
          <p style={{ marginTop: "6px" }}>Active</p>
        </div>

        <div>
          <h4 style={{ margin: 0 }}>📅 Days Left</h4>
          <p style={{ marginTop: "6px" }}>28 Days</p>
        </div>

        <div>
          <h4 style={{ margin: 0 }}>🔥 Attendance</h4>
          <p style={{ marginTop: "6px" }}>92%</p>
        </div>

        <div>
          <h4 style={{ margin: 0 }}>🏋 Today's Workout</h4>
          <p style={{ marginTop: "6px" }}>Chest • Shoulders • Triceps</p>
        </div>
      </div>

      <button
        style={{
          marginTop: "25px",
          background: "white",
          color: "#00a63e",
          border: "none",
          padding: "14px 28px",
          borderRadius: "12px",
          fontWeight: "bold",
          fontSize: "16px",
          cursor: "pointer",
        }}
      >
        ▶ Start Today's Workout
      </button>
    </div>
  );
}

