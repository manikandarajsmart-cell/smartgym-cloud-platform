"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../../components/Sidebar";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([]);

  const [name, setName] = useState("");
  const [specialization, setSpecialization] = useState("");
  const [salary, setSalary] = useState("");
  const [experience, setExperience] = useState("");

  useEffect(() => {
    fetchTrainers();
  }, []);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get(
        "https://api.smartgym.cloud/api/trainers"
      );

      setTrainers(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTrainer = async () => {
    try {
      await axios.post(
        "https://api.smartgym.cloud/api/trainers",
        {
          name,
          specialization,
          salary,
          experience,
        }
      );

      alert("💪 Trainer Added Successfully");

      setName("");
      setSpecialization("");
      setSalary("");
      setExperience("");

      fetchTrainers();
    } catch (error) {
      console.log(error);
      alert("❌ Failed to add trainer");
    }
  };

  return (
    <div className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-4xl font-bold mb-10">
          💪 Trainers Management
        </h1>

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
            onClick={addTrainer}
            className="bg-green-500 hover:bg-green-600 transition-all p-4 rounded-lg font-bold w-full mt-6"
          >
            Add Trainer
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trainers.map((trainer) => (
            <div
              key={trainer.id}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6"
            >
              <h2 className="text-2xl font-bold mb-4">
                {trainer.name}
              </h2>

              <p className="text-gray-400 mb-2">
                Specialization: {trainer.specialization}
              </p>

              <p className="text-gray-400 mb-2">
                Experience: {trainer.experience}
              </p>

              <p className="text-green-400 font-bold text-xl mt-4">
                ₹{trainer.salary}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
