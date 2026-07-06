"use client";

import { useEffect, useState } from "react";
import axios from "axios";

import Sidebar from "../../components/Sidebar";
import TrainerForm from "./components/TrainerForm";
import TrainerTable from "./components/TrainerTable";
import TrainerStats from "./components/TrainerStats";

export default function TrainersPage() {
  const [trainers, setTrainers] = useState<any[]>([]);

  const fetchTrainers = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/trainers`
      );

      setTrainers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  return (
    <div className="bg-black text-white min-h-screen flex">
      <Sidebar />

      <div className="ml-64 p-10 w-full">
        <h1 className="text-4xl font-bold mb-10">
          💪 Trainers Management
        </h1>

        <TrainerStats totalTrainers={trainers.length} />

        <TrainerForm onSuccess={fetchTrainers} />

        <TrainerTable
          trainers={trainers}
          onRefresh={fetchTrainers}
        />
      </div>
    </div>
  );
}
