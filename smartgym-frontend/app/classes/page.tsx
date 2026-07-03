"use client";

import Sidebar from "../../components/Sidebar";

export default function ClassesPage() {
  return (
    <div
      style={{
        display: "flex",
        background: "#000",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <div
        style={{
          flex: 1,
          marginLeft: "250px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "42px",
            marginBottom: "20px",
          }}
        >
          📚 Classes
        </h1>

        <p>
          Manage Gym, Yoga, Zumba, CrossFit and all fitness classes from one place.
        </p>
    
    <div
  style={{
    marginTop: "40px",
    background: "#111",
    border: "1px solid #222",
    borderRadius: "20px",
    padding: "40px",
    textAlign: "center",
  }}
>
  <h2>🚧 Classes Module</h2>

  <p
    style={{
      color: "#888",
      marginTop: "15px",
    }}
  >
    Coming Soon...
  </p>
</div>

      </div>
    </div>
  );
}
