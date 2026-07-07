"use client";

import { useEffect, useState } from "react";

import Sidebar from "../../components/Sidebar";
import ClassCard from "./components/ClassCard";
import ClassForm from "./components/ClassForm";
import ClassTable from "./components/ClassTable";

export default function ClassesPage() {

const [classes, setClasses] = useState([]);
const [editingClass, setEditingClass] = useState<any>(null);

const loadClasses = () => {

fetch(`${process.env.NEXT_PUBLIC_API_URL}/classes`, {
  cache: "no-store",
})
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        setClasses(data.classes);
      }
    })
    .catch(console.error);
};

useEffect(() => {
  loadClasses();
}, []);

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

        <ClassCard totalClasses={classes.length} />

        <div style={{ marginTop: "30px" }}>

        <ClassForm
  editingClass={editingClass}
  onSuccess={() => {
    loadClasses();
    setEditingClass(null);
  }}
/>
        </div>

        <div style={{ marginTop: "30px" }}>

     <ClassTable
  classes={classes}
  onEdit={setEditingClass}
/>  
      </div>
      </main>
    </div>
  );
}
