"use client";

import axios from "axios";

type Props = {
  branches: any[];
  onRefresh: () => void;
  onEdit: (branch: any) => void;
};

export default function BranchTable({
  branches,
  onRefresh,
  onEdit,
}: Props) {

  const deleteBranch = async (id: string) => {

    if (!confirm("Delete this branch?")) return;

    try {

      const token = localStorage.getItem("smartgym-token");

      await axios.delete(
        `${process.env.NEXT_PUBLIC_API_URL}/branches/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("✅ Branch Deleted");

      onRefresh();

    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete branch");
    }
  };

  return (
    <div className="bg-gray-900 rounded-xl p-6 mt-8 overflow-x-auto">

      <table className="w-full">

        <thead>

          <tr className="border-b border-gray-700">

            <th className="text-left py-3">Branch</th>

            <th className="text-left py-3">City</th>

            <th className="text-left py-3">Phone</th>

            <th className="text-left py-3">Status</th>

            <th className="text-left py-3">
              Actions
            </th>

          </tr>

        </thead>

        <tbody>

          {branches.length === 0 ? (

            <tr>

              <td
                colSpan={5}
                className="py-10 text-center text-gray-400"
              >
                No Branches Found
              </td>

            </tr>

          ) : (

            branches.map((branch) => (

              <tr
                key={branch._id}
                className="border-b border-gray-800"
              >

                <td className="py-4">
                  {branch.name}
                </td>

                <td>
                  {branch.city || "-"}
                </td>

                <td>
                  {branch.phone || "-"}
                </td>

                <td>

                  <span
                    className={
                      branch.status === "active"
                        ? "text-green-400"
                        : "text-red-400"
                    }
                  >
                    {branch.status}
                  </span>

                </td>

                <td>

                  <button
                    onClick={() => onEdit(branch)}
                    className="text-yellow-400 mr-4"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() =>
                      deleteBranch(branch._id)
                    }
                    className="text-red-400"
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))

          )}

        </tbody>

      </table>

    </div>
  );
}
