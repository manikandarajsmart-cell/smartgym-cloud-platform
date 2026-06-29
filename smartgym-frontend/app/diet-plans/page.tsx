"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function DietPlansPage() {
  
  const [memberName, setMemberName] = useState("");
  const [breakfast, setBreakfast] = useState("");
  const [lunch, setLunch] = useState("");
  const [snacks, setSnacks] = useState("");
  const [dinner, setDinner] = useState("");
  const [calories, setCalories] = useState("");
  const [protein, setProtein] = useState("");
  const [carbs, setCarbs] = useState("");
  const [fat, setFat] = useState("");
  const [water, setWater] = useState("");
  const [plans, setPlans] = useState<any[]>([]);
  const [editingId, setEditingId] = useState("");

const fetchPlans = async () => {
  try {
    const res = await axios.get(
      "https://smartgym.cloud/api/diet-plans"
    );

   if (res.data.success) {
  const allPlans = res.data.plans;

  const selectedMember =
  typeof window !== "undefined"
    ? new URLSearchParams(window.location.search).get("member")
    : "";

if (selectedMember) {

    setPlans(
      allPlans.filter(
        (plan: any) =>
   plan.memberName.toLowerCase() === selectedMember.toLowerCase()
      )
    );
  } else {
    setPlans(allPlans);
  }
}

  } catch (error) {
    console.log(error);
  }
};

    useEffect(() => {
  let selectedMember = "";

  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    selectedMember = params.get("member") || "";

    if (selectedMember) {
      setMemberName(selectedMember);
    }
  }

  fetchPlans();
}, []);

const handleSave = async () => {
  if (!memberName || !breakfast) {
    alert("Please enter Member Name and Breakfast");
    return;
  }

  try {
    const data = {
      memberName,
      breakfast,
      lunch,
      snacks,
      dinner,
      calories,
      protein,
      carbs,
      fat,
      water,
    };

    if (editingId) {
      await axios.put(
        `https://smartgym.cloud/api/diet-plans/${editingId}`,
        data
      );

      alert("✅ Diet Plan Updated");
    } else {
      await axios.post(
        "https://smartgym.cloud/api/diet-plans",
        data
      );

      alert("✅ Diet Plan Saved");
    }

    setEditingId("");

    setMemberName("");
    setBreakfast("");
    setLunch("");
    setSnacks("");
    setDinner("");
    setCalories("");
    setProtein("");
    setCarbs("");
    setFat("");
    setWater("");

    fetchPlans();
  } catch (error) {
    console.log(error);
    alert("❌ Failed");
  }
};

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
            marginBottom: "30px",
          }}
        >
          🥗 Diet Plans
        </h1>

        <div
          style={{
            background: "#111",
            padding: "25px",
            borderRadius: "15px",
          }}
        >
          <input
            placeholder="Member Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Breakfast"
            value={breakfast}
            onChange={(e) => setBreakfast(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Lunch"
            value={lunch}
            onChange={(e) => setLunch(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Snacks"
            value={snacks}
            onChange={(e) => setSnacks(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Dinner"
            value={dinner}
            onChange={(e) => setDinner(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Daily Calories"
            value={calories}
            onChange={(e) => setCalories(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Protein (g)"
            value={protein}
            onChange={(e) => setProtein(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Carbs (g)"
            value={carbs}
            onChange={(e) => setCarbs(e.target.value)}
            style={inputStyle}
          />

          <input
            placeholder="Fat (g)"
            value={fat}
            onChange={(e) => setFat(e.target.value)}
            style={inputStyle}
          />

         <input
  placeholder="Water Intake (Litres)"
  value={water}
  onChange={(e) => setWater(e.target.value)}
  style={inputStyle}
/>

<button
  onClick={handleSave}
  style={{
    background: "#00c853",
    color: "white",
    border: "none",
    padding: "14px 25px",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
  }}
>
  Save Diet Plan
</button>

</div>

        <h2 style={{ marginTop: "30px" }}>Saved Diet Plans</h2>

        {plans.map((plan) => (
          <div
            key={plan._id}
            style={{
              background: "#111",
              padding: "20px",
              borderRadius: "12px",
              marginTop: "15px",
            }}
          >
            <h3>{plan.memberName}</h3>

            <p><b>Breakfast:</b> {plan.breakfast}</p>
            <p><b>Lunch:</b> {plan.lunch}</p>
            <p><b>Snacks:</b> {plan.snacks}</p>
            <p><b>Dinner:</b> {plan.dinner}</p>

            <p>
              <b>Calories:</b> {plan.calories} kcal
            </p>

            <p>
              <b>Protein:</b> {plan.protein} g
            </p>

            <p>
              <b>Carbs:</b> {plan.carbs} g
            </p>

            <p>
              <b>Fat:</b> {plan.fat} g
            </p>

            <p>
              <b>Water:</b> {plan.water}
            </p>
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
    setBreakfast(plan.breakfast || "");
    setLunch(plan.lunch || "");
    setSnacks(plan.snacks || "");
    setDinner(plan.dinner || "");
    setCalories(String(plan.calories || ""));
    setProtein(String(plan.protein || ""));
    setCarbs(String(plan.carbs || ""));
    setFat(String(plan.fat || ""));
    setWater(plan.water || "");

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }}
  style={{
    background: "#ff9800",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  ✏️ Edit
</button>

<button
  onClick={async () => {
    if (!confirm("Delete this diet plan?")) return;

    try {
      await axios.delete(
        `https://smartgym.cloud/api/diet-plans/${plan._id}`
      );

      alert("✅ Diet Plan Deleted");

      fetchPlans();
    } catch (error) {
      console.log(error);
      alert("❌ Delete Failed");
    }
  }}
  style={{
    background: "#f44336",
    color: "white",
    border: "none",
    padding: "10px 16px",
    borderRadius: "8px",
    cursor: "pointer",
  }}
>
  🗑 Delete
</button>
</div>
          </div>
        ))}

      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginBottom: "15px",
  borderRadius: "8px",
};
