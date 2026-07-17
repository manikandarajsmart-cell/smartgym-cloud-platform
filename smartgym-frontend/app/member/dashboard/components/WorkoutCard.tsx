export default function WorkoutCard() {
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
      <h2>🏋 Today's Workout</h2>

      <p style={{ marginTop: "15px" }}>
        Chest • Shoulders • Triceps
      </p>

      <p>Duration : 60 Minutes</p>

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
        ▶ Start Workout
      </button>
    </div>
  );
}
