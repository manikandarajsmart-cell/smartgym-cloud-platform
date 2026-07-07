"use client";

import { useEffect, useState } from "react";

type ClassItem = {
  _id?: string;
  className: string;
  trainer: string;
  schedule: string;
  duration: string;
  capacity: number;
};

type Props = {
  editingClass?: ClassItem | null;
  onSuccess?: () => void;
};

export default function ClassForm({
  editingClass,
  onSuccess,
}: Props) {

  const [className, setClassName] = useState("");
  const [trainer, setTrainer] = useState("");
  const [schedule, setSchedule] = useState("");
  const [duration, setDuration] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
  if (editingClass) {
    setClassName(editingClass.className);
    setTrainer(editingClass.trainer);
    setSchedule(editingClass.schedule);
    setDuration(editingClass.duration);
    setCapacity(String(editingClass.capacity));
  } else {
    setClassName("");
    setTrainer("");
    setSchedule("");
    setDuration("");
    setCapacity("");
  }
}, [editingClass]);

  const handleSubmit = async () => {
    try {

  const isEditing = !!editingClass;

const res = await fetch(
  isEditing
    ? `${process.env.NEXT_PUBLIC_API_URL}/classes/${editingClass?._id}`
    : `${process.env.NEXT_PUBLIC_API_URL}/classes`,
  {
    method: isEditing ? "PUT" : "POST",

          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            className,
            trainer,
            schedule,
            duration,
            capacity: Number(capacity),
          }),
        }
      );

      const data = await res.json();

  if (data.success) {

  alert(
  isEditing
    ? "Class Updated Successfully!"
    : "Class Added Successfully!"
);

  setClassName("");
  setTrainer("");
  setSchedule("");
  setDuration("");
  setCapacity("");

  if (onSuccess) {
    onSuccess();
  }

} else {
  alert("Failed to add class.");
}

    } catch (error) {
      console.error(error);
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        background: "#111",
        borderRadius: 12,
        padding: 20,
      }}
    >
   <h2>{editingClass ? "Edit Class" : "Add Class"}</h2>

      <input
        placeholder="Class Name"
        value={className}
        onChange={(e) => setClassName(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <input
        placeholder="Trainer"
        value={trainer}
        onChange={(e) => setTrainer(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <input
        placeholder="Schedule"
        value={schedule}
        onChange={(e) => setSchedule(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <input
        placeholder="Duration"
        value={duration}
        onChange={(e) => setDuration(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <input
        type="number"
        placeholder="Capacity"
        value={capacity}
        onChange={(e) => setCapacity(e.target.value)}
        style={{ width: "100%", padding: 10, marginTop: 10 }}
      />

      <button
        onClick={handleSubmit}
        style={{
          marginTop: 20,
          background: "#22c55e",
          color: "#fff",
          border: "none",
          padding: "12px 24px",
          borderRadius: 8,
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
         {editingClass ? "Update Class" : "Save Class"}

      </button>

    </div>
  );
}
