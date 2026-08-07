"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function WorkoutPlansPage() {
  const [plans, setPlans] = useState<any[]>([]);

  const [age, setAge] = useState(25);
const [gender, setGender] = useState("Male");
const [goal, setGoal] = useState("Muscle Gain");
const [experience, setExperience] = useState("Beginner");
const [daysPerWeek, setDaysPerWeek] = useState(5);

const [aiWorkout, setAiWorkout] = useState<any>(null);
const [loadingAI, setLoadingAI] = useState(false);

  const [memberName, setMemberName] = useState("");
  const [day, setDay] = useState("Monday");
  const [exercise, setExercise] = useState("");
  const [sets, setSets] = useState("");
  const [reps, setReps] = useState("");
  const [notes, setNotes] = useState("");
  const [editingId, setEditingId] = useState("");

  const fetchPlans = async () => {
  try {
    const token = localStorage.getItem("smartgym-token");

    const res = await axios.get(
      "https://smartgym.cloud/api/workout-plans",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
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

const generateAIWorkout = async () => {
  try {
    setLoadingAI(true);

    const token = localStorage.getItem("smartgym-token");
    const res = await axios.post(
      "https://smartgym.cloud/api/ai-coach/workout",
      {
        age,
        gender,
        goal,
        experience,
        daysPerWeek,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setAiWorkout(res.data.workoutPlan);

    alert("✅ AI Workout Generated!");

} catch (err: any) {
  console.log(err);

  if (err.response) {
    console.log("Status:", err.response.status);
    console.log("Data:", err.response.data);

    alert(
      `Status: ${err.response.status}\n\n${JSON.stringify(
        err.response.data,
        null,
        2
      )}`
    );
  } else {
    alert(err.message);
  }
}

 finally {
    setLoadingAI(false);
  }
};

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

    const token = localStorage.getItem("smartgym-token");

await axios.put(
  `https://smartgym.cloud/api/workout-plans/${editingId}`,
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
);

      alert("✅ Workout Plan Updated");
    } else {

    const token = localStorage.getItem("smartgym-token");

await axios.post(
  "https://smartgym.cloud/api/workout-plans",
  data,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
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

  const token = localStorage.getItem("smartgym-token");

await axios.delete(
  `https://smartgym.cloud/api/workout-plans/${id}`,
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }
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
    background: "#1b1b1b",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "30px",
  }}
>
  <h2>🧠 AI Workout Generator</h2>

  <input
    type="number"
    value={age}
    onChange={(e) => setAge(Number(e.target.value))}
    placeholder="Age"
    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
  />

  <input
    value={goal}
    onChange={(e) => setGoal(e.target.value)}
    placeholder="Goal"
    style={{ width: "100%", padding: "10px", marginBottom: "10px" }}
  />

  <button
    onClick={generateAIWorkout}
    style={{
      background: "#1976d2",
      color: "white",
      padding: "12px 20px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
    }}
  >
    {loadingAI ? "Generating..." : "✨ Generate AI Workout"}
  </button>

{loadingAI && (
  <p style={{ marginTop: "15px" }}>⏳ Generating AI workout...</p>
)}

{aiWorkout && (
  <div
    style={{
      marginTop: "20px",
      background: "#222",
      padding: "20px",
      borderRadius: "10px",
    }}
  >
    <h3>✅ AI Workout Plan</h3>

    {aiWorkout.weeklyPlan.map((day: any) => (
      <div key={day.day} style={{ marginBottom: "20px" }}>
        <h4>{day.day}</h4>

        {day.exercises.map((ex: any, index: number) => (
          <p key={index}>
            • {ex.name} — {ex.sets} sets × {ex.reps} reps
          </p>
        ))}
      </div>
    ))}

    <h4>🏃 Cardio</h4>
    <p>{aiWorkout.cardio}</p>

    <h4>💡 Tips</h4>
    <ul>
      {aiWorkout.tips.map((tip: string, index: number) => (
        <li key={index}>{tip}</li>
      ))}
    </ul>
  </div>
)}

</div>

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
