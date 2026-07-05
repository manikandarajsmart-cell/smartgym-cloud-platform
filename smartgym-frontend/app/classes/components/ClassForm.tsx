"use client";

import { useState } from "react";

type Props = {
  onSuccess?: () => void;
};

export default function ClassForm({ onSuccess }: Props) {

  const [className, setClassName] = useState("");
  const [trainer, setTrainer] = useState("");
  const [schedule, setSchedule] = useState("");
  const [duration, setDuration] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/classes`,
        {
          method: "POST",
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
  alert("Class Added Successfully!");

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
      <h2>Add Class</h2>

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
        Save Class
      </button>
    </div>
  );
}
