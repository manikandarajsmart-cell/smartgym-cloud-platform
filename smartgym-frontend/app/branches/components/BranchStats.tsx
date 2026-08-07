type Props = {
  totalBranches: number;
};

export default function BranchStats({
  totalBranches,
}: Props) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

      <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
        <h2 className="text-gray-400 text-sm">
          Total Branches
        </h2>

        <p className="text-4xl font-bold mt-2">
          {totalBranches}
        </p>
      </div>

      <div className="bg-green-900 rounded-xl p-6 border border-green-700">
        <h2 className="text-green-200 text-sm">
          Active Branches
        </h2>

        <p className="text-4xl font-bold mt-2">
          {totalBranches}
        </p>
      </div>

      <div className="bg-red-900 rounded-xl p-6 border border-red-700">
        <h2 className="text-red-200 text-sm">
          Inactive Branches
        </h2>

        <p className="text-4xl font-bold mt-2">
          0
        </p>
      </div>

    </div>
  );
}
