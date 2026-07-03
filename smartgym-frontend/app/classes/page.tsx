"use client";

import Sidebar from "../../components/Sidebar";
import ClassCard from "./components/ClassCard";
import ClassForm from "./components/ClassForm";
import ClassTable from "./components/ClassTable";

export default function ClassesPage() {
  return (
    <div
      style={{
        display: "flex",
        background: "#000",
        color: "#fff",
        minHeight: "100vh",
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          marginLeft: "250px",
          padding: "40px",
        }}
      >
        <h1
          style={{
            fontSize: "40px",
            marginBottom: "10px",
          }}
        >
          📚 Classes Management
        </h1>

        <p
          style={{
            color: "#aaa",
            marginBottom: "30px",
          }}
        >
          Manage Gym, Yoga, Zumba, CrossFit and all fitness classes.
        </p>

        <ClassCard />

        <div style={{ marginTop: "30px" }}>
          <ClassForm />
        </div>

        <div style={{ marginTop: "30px" }}>
          <ClassTable />
        </div>
      </main>
    </div>
  );
}
