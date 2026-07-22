"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function WorkoutPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);

  const [memberName, setMemberName] = useState("");
  const [day, setDay] = useState("Monday");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState("");

  const fetchPlans = async () => {
    try {
      const res = await axios.get(
        "https://smartgym.cloud/api/workout-plans"
      );

      if (res.data.success) {
        setPlans(res.data.plans);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
  fetchPlans();

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const member = params.get("member");

    if (member) {
      setMemberName(member);
    }
  }
}, []);

   const handleSave = async () => {
  if (!memberName || !exercise) {
    alert("Please fill Member Name and Exercise");
    return;
  }

  try {
    const data = {
      memberName,
      day,
      exercise,
      sets,
      reps,
      notes,
    };

    if (editingId) {
      await axios.put(
        `https://smartgym.cloud/api/workout-plans/${editingId}`,
        data
      );

      alert("✅ Workout Plan Updated");
    } else {
      await axios.post(
        "https://smartgym.cloud/api/workout-plans",
        data
      );

      alert("✅ Workout Plan Saved");
    }

    setEditingId("");

    setMemberName("");
    setDay("Monday");
    setExercise("");
    setSets("");
    setReps("");
    setNotes("");

    fetchPlans();
  } catch (error) {
    console.log(error);
    alert("❌ Failed");
  }
};

    const handleDelete = async (id: string) => {
  const confirmDelete = confirm("Delete this workout plan?");

  if (!confirmDelete) return;

  try {
    await axios.delete(
      `https://smartgym.cloud/api/workout-plans/${id}`
    );

    alert("Workout Plan Deleted");

    fetchPlans();
  } catch (error) {
    console.log(error);
    alert("Failed to delete workout plan");
  }
};

return (
  <RoleGuard allowedRoles={["Admin", "Trainer"]}> 
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
        <h1 style={{ fontSize: "42px", marginBottom: "30px" }}>
          🏋️ Workout Plans
        </h1>

        <div
          style={{
            background: "#111",
            padding: "25px",
            borderRadius: "15px",
            marginBottom: "30px",
          }}
        >
          <input
            placeholder="Member Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          />

          <select
            value={day}
            onChange={(e) => setDay(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          >
            <option>Monday</option>
            <option>Tuesday</option>
            <option>Wednesday</option>
            <option>Thursday</option>
            <option>Friday</option>
            <option>Saturday</option>
            <option>Sunday</option>
          </select>

          <input
            placeholder="Exercise"
            value={exercise}
            onChange={(e) => setExercise(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          />

          <input
            placeholder="Sets"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          />

          <input
            placeholder="Reps"
            value={reps}
            onChange={(e) => setReps(e.target.value)}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "15px",
              borderRadius: "8px",
            }}
          />

          <textarea
            placeholder="Notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            style={{
              width: "100%",
              padding: "12px",
              marginBottom: "20px",
              borderRadius: "8px",
            }}
          />

          <button
            onClick={handleSave}
            style={{
              background: "#00c853",
              color: "white",
              border: "none",
              padding: "12px 25px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Save Workout Plan
          </button>
        </div>

        <h2>Saved Workout Plans</h2>

        {plans
  .filter(
    (plan) =>
      !memberName ||
      plan.memberName.toLowerCase() ===
        memberName.toLowerCase()
  )
  .map((plan) => (

          <div
            key={plan._id}
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "12px",
              marginBottom: "15px",
            }}
          >
            <h3>{plan.memberName}</h3>

            <p><b>Day:</b> {plan.day}</p>
            <p><b>Exercise:</b> {plan.exercise}</p>
            <p><b>Sets:</b> {plan.sets}</p>
            <p><b>Reps:</b> {plan.reps}</p>
            <p><b>Notes:</b> {plan.notes}</p>

    <div
  style={{
    marginTop: "15px",
    display: "flex",
    gap: "10px",
  }}
>
  <button
    onClick={() => {
      setEditingId(plan._id);

      setMemberName(plan.memberName || "");
      setDay(plan.day || "Monday");
      setExercise(plan.exercise || "");
      setSets(String(plan.sets || ""));
      setReps(String(plan.reps || ""));
      setNotes(plan.notes || "");

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }}
    style={{
      background: "#ff9800",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    ✏️ Edit
  </button>

  <button
    onClick={() => handleDelete(plan._id)}
    style={{
      background: "#ff1744",
      color: "white",
      border: "none",
      padding: "10px 18px",
      borderRadius: "8px",
      cursor: "pointer",
      fontWeight: "bold",
    }}
  >
    🗑 Delete
  </button>
</div>  
          </div>
        ))}
      </div>
    </div>
  </RoleGuard>
);
}
