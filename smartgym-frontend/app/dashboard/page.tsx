"use client";

export default function Dashboard() {
  const logout = () => {
    localStorage.removeItem("token");
    window.location.href = "/";
  };

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        color: "white",
        padding: "20px",
        fontFamily: "Arial",
      }}
    >
      <h1 style={{ marginBottom: "30px" }}>
        🏋️ Smart Gym Dashboard
      </h1>

      {/* Stats Cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
        }}
      >
        <div style={cardStyle}>
          <h2>👥 Members</h2>
          <p style={numberStyle}>120</p>
        </div>

        <div style={cardStyle}>
          <h2>💰 Revenue</h2>
          <p style={numberStyle}>₹48,000</p>
        </div>

        <div style={cardStyle}>
          <h2>🔥 Active Plans</h2>
          <p style={numberStyle}>86</p>
        </div>

        <div style={cardStyle}>
          <h2>📅 Attendance</h2>
          <p style={numberStyle}>92%</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div
        style={{
          marginTop: "40px",
          padding: "20px",
          border: "1px solid #333",
          borderRadius: "12px",
          background: "#111",
        }}
      >
        <h2>⚡ Quick Actions</h2>

        <div
          style={{
            display: "flex",
            gap: "15px",
            marginTop: "20px",
            flexWrap: "wrap",
          }}
        >
          <button style={buttonStyle}>➕ Add Member</button>
          <button style={buttonStyle}>📋 View Plans</button>
          <button style={buttonStyle}>💳 Payments</button>
          <button style={buttonStyle}>🤖 AI Trainer</button>
        </div>
      </div>

      {/* Logout */}
      <button
        onClick={logout}
        style={{
          marginTop: "40px",
          background: "red",
          border: "none",
          padding: "12px 20px",
          borderRadius: "10px",
          color: "white",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Logout
      </button>
    </div>
  );
}

const cardStyle = {
  background: "#111",
  padding: "25px",
  borderRadius: "15px",
  border: "1px solid #333",
};

const numberStyle = {
  fontSize: "32px",
  fontWeight: "bold",
  marginTop: "10px",
  color: "#00ff99",
};

const buttonStyle = {
  background: "#00cc66",
  border: "none",
  padding: "12px 20px",
  borderRadius: "10px",
  color: "white",
  cursor: "pointer",
  fontWeight: "bold",
};
