export default function QuickStats() {
  const cardStyle = {
    background: "#161b22",
    borderRadius: "18px",
    padding: "20px",
    color: "white",
    flex: 1,
    minWidth: "180px",
    border: "1px solid #2d333b",
  };

  return (
    <div
      style={{
        display: "flex",
        gap: "20px",
        flexWrap: "wrap",
        marginTop: "25px",
      }}
    >
      <div style={cardStyle}>
        <h3>📅 Attendance</h3>
        <h1>92%</h1>
      </div>

      <div style={cardStyle}>
        <h3>🏋 Workout</h3>
        <h1>Today</h1>
      </div>

      <div style={cardStyle}>
        <h3>🥗 Calories</h3>
        <h1>2200</h1>
      </div>

      <div style={cardStyle}>
        <h3>⚖ Weight</h3>
        <h1>72.4 kg</h1>
      </div>
    </div>
  );
}
