"use client";

import axios from "axios";

type Trainer = {
  _id: string;
  name: string;
  specialization: string;
  salary: string;
  experience: string;
};

type Props = {
  trainers: Trainer[];
  onRefresh?: () => void;
};

export default function TrainerTable({
  trainers,
  onRefresh,
}: Props) {
  const handleDelete = async (id: string) => {
    const ok = confirm("Delete this trainer?");

    if (!ok) return;

    try {
      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/trainers/${id}`
      );

      alert("🗑 Trainer Deleted");

      if (onRefresh) {
        onRefresh();
      }
    } catch (error) {
      console.error(error);
      alert("❌ Delete Failed");
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {trainers.map((trainer) => (
        <div
          key={trainer._id}
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

          <div className="flex gap-3 mt-5">
            <button
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-lg font-bold"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(trainer._id)}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg font-bold"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
