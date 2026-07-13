"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function ProgressPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [progress, setProgress] = useState<any[]>([]);
  const [search, setSearch] = useState("");

const [form, setForm] = useState({
  memberId: "",
  memberName: "",
  weight: "",
  bodyFat: "",
  bmi: "",
  chest: "",
  waist: "",
  arms: "",
  thighs: "",
  calves: "",
  shoulders: "",
  notes: "",
});

  useEffect(() => {
    loadMembers();
    loadProgress();
  }, []);

const loadMembers = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/members`);
  const data = await res.json();

  console.log("Members:", data);

  if (Array.isArray(data)) {
    setMembers(data);
  } else if (data.members) {
    setMembers(data.members);
  } else {
    setMembers([]);
  }
};

  const loadProgress = async () => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/progress`);
    const data = await res.json();

    if (data.success) {
      setProgress(data.progress);
    }
  };

  const saveProgress = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/progress`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      }
    );

    const data = await res.json();

    if (data.success) {
      alert("Progress Saved");

     setForm({
  memberId: "",
  memberName: "",
  weight: "",
  bodyFat: "",
  bmi: "",
  chest: "",
  waist: "",
  arms: "",
  thighs: "",
  calves: "",
  shoulders: "",
  notes: "",
});
      loadProgress();
    }
  };

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

      <div
        style={{
          flex: 1,
          marginLeft: "250px",
          padding: "40px",
        }}
      >
        <h1 style={{ fontSize: 38 }}>
          📈 Member Progress
        </h1>

        <div
          style={{
            display: "grid",
            gap: 15,
            marginTop: 30,
            maxWidth: 500,
          }}
        >

<select
  value={form.memberId}
  onChange={(e) => {
    const selected = members.find(
      (m) => m._id === e.target.value
    );

    if (selected) {
      setForm({
        ...form,
        memberId: selected._id,
        memberName: selected.name,
      });
    }
  }}
  style={{
    background: "#111",
    color: "#fff",
    padding: "12px",
    border: "1px solid #555",
    borderRadius: "8px",
  }}
>
  <option value="">Select Member</option>

  {members.map((m) => (
    <option
      key={m._id}
      value={m._id}
      style={{
        backgroundColor: "#ffffff",
        color: "#000000",
      }}
    >
      {m.name}
    </option>
  ))}
</select>

          <input
            placeholder="Weight"
            value={form.weight}
            onChange={(e) =>
              setForm({
                ...form,
                weight: e.target.value,
              })
            }
          />

          <input
            placeholder="Body Fat %"
            value={form.bodyFat}
            onChange={(e) =>
              setForm({
                ...form,
                bodyFat: e.target.value,
              })
            }
          />

          <input
            placeholder="BMI"
            value={form.bmi}
            onChange={(e) =>
              setForm({
                ...form,
                bmi: e.target.value,
              })
            }
          />

         <input
  placeholder="Chest (cm)"
  value={form.chest}
  onChange={(e) =>
    setForm({
      ...form,
      chest: e.target.value,
    })
  }
/>

<input
  placeholder="Waist (cm)"
  value={form.waist}
  onChange={(e) =>
    setForm({
      ...form,
      waist: e.target.value,
    })
  }
/>

<input
  placeholder="Arms (cm)"
  value={form.arms}
  onChange={(e) =>
    setForm({
      ...form,
      arms: e.target.value,
    })
  }
/>

<input
  placeholder="Thighs (cm)"
  value={form.thighs}
  onChange={(e) =>
    setForm({
      ...form,
      thighs: e.target.value,
    })
  }
/>

<input
  placeholder="Calves (cm)"
  value={form.calves}
  onChange={(e) =>
    setForm({
      ...form,
      calves: e.target.value,
    })
  }
/>

<input
  placeholder="Shoulders (cm)"
  value={form.shoulders}
  onChange={(e) =>
    setForm({
      ...form,
      shoulders: e.target.value,
    })
  }
/>

          <textarea
            placeholder="Notes"
            value={form.notes}
            onChange={(e) =>
              setForm({
                ...form,
                notes: e.target.value,
              })
            }
          />

          <button
            onClick={saveProgress}
            style={{
              background: "#00c853",
              color: "#fff",
              padding: 14,
              border: "none",
              borderRadius: 8,
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            Save Progress
          </button>
        </div>

        <input
  placeholder="🔍 Search Member..."
  value={search}
  onChange={(e) => setSearch(e.target.value)}
  style={{
    width: "350px",
    padding: "12px",
    marginTop: "30px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #444",
    background: "#111",
    color: "#fff",
  }}
/>

        <h2 style={{ marginTop: 60 }}>
          Progress Records
        </h2>

        <table
          style={{
            width: "100%",
            marginTop: 20,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>

        <th>Name</th>
<th>Weight</th>
<th>Body Fat</th>
<th>BMI</th>
<th>Chest</th>
<th>Waist</th>
<th>Arms</th> 
<th>Actions</th>
            </tr>
          </thead>

          <tbody>
  
          {progress
  .filter((p) =>
    p.memberName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((p) => (

              <tr key={p._id}>
             
          <td>{p.memberName}</td>
<td>{p.weight}</td>
<td>{p.bodyFat}%</td>
<td>{p.bmi}</td>
<td>{p.chest || "-"}</td>
<td>{p.waist || "-"}</td>
<td>{p.arms || "-"}</td>
<td>
  <button
    style={{
      background: "#2962ff",
      color: "#fff",
      border: "none",
      padding: "6px 12px",
      borderRadius: "6px",
      marginRight: "8px",
      cursor: "pointer",
    }}
  >
    Edit
  </button>

<button
  onClick={async () => {
    if (!confirm("Delete this progress record?")) return;

    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/progress/${p._id}`,
      {
        method: "DELETE",
      }
    );

    loadProgress();
  }}
  style={{
    background: "#d32f2f",
    color: "#fff",
    border: "none",
    padding: "6px 12px",
    borderRadius: "6px",
    cursor: "pointer",
  }}
>

    Delete
  </button>
</td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
