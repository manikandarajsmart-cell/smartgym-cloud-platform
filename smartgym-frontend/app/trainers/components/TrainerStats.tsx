type Props = {
  totalTrainers: number;
};

export default function TrainerStats({
  totalTrainers,
}: Props) {
  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 mb-8">
      <h2 className="text-2xl font-bold">
        👨‍🏫 Trainers Overview
      </h2>

      <p className="text-5xl font-bold text-green-400 mt-4">
        {totalTrainers}
      </p>

      <p className="text-gray-400 mt-2">
        Total Active Trainers
      </p>
    </div>
  );
}
