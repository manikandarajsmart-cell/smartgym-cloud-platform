"use client";

import { useEffect, useState } from "react";
import axios from "axios";

type Trainer = {
  _id?: string;
  name: string;
  specialization: string;
  salary: string;
  experience: string;
};

type Props = {
  editingTrainer?: Trainer | null;
  onSuccess?: () => void;
};

  export default function TrainerForm({
  editingTrainer,
  onSuccess,
}: Props) {

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

useEffect(() => {
  if (editingTrainer) {
    setName(editingTrainer.name);
    setSpecialization(editingTrainer.specialization);
    setSalary(editingTrainer.salary);
    setExperience(editingTrainer.experience);
  }
}, [editingTrainer]);

const saveTrainer = async () => {
  try {
    const isEditing = !!editingTrainer;

    await axios({
      method: isEditing ? "put" : "post",
      url: isEditing
        ? `${process.env.NEXT_PUBLIC_API_URL}/trainers/${editingTrainer?._id}`
        : `${process.env.NEXT_PUBLIC_API_URL}/trainers`,
      data: {
        name,
        specialization,
        salary,
        experience,
      },
    });

    alert(
      isEditing
        ? "💪 Trainer Updated Successfully"
        : "💪 Trainer Added Successfully"
    );

    setName("");
    setSpecialization("");
    setSalary("");
    setExperience("");

    onSuccess?.();
  } catch (error) {
    console.error(error);
    alert("❌ Failed to save trainer");
  }
};

  return (
    <div className="bg-zinc-900 p-8 rounded-2xl border border-zinc-800 max-w-2xl mb-10">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <input
          type="text"
          placeholder="Trainer Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="bg-black border border-zinc-700 p-4 rounded-lg outline-none"
        />

        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          className="bg-black border border-zinc-700 p-4 rounded-lg outline-none"
        />

        <input
          type="number"
          placeholder="Salary"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="bg-black border border-zinc-700 p-4 rounded-lg outline-none"
        />

        <input
          type="text"
          placeholder="Experience"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="bg-black border border-zinc-700 p-4 rounded-lg outline-none"
        />
      </div>

      <button
        onClick={saveTrainer}
        className="bg-green-500 hover:bg-green-600 transition-all p-4 rounded-lg font-bold w-full mt-6"
      >
       {editingTrainer ? "Update Trainer" : "Add Trainer"}
      </button>
    </div>
  );
}
