"use client";

interface Props {
  member: any;
  progress: any[];
}

export default function ProgressHistory({
  member,
  progress,
}: Props) {
  const records = progress.filter(
    (p) => p.memberName === member.name
  );

  return (
    <div
      style={{
        background: "#111",
        padding: "25px",
        borderRadius: "12px",
        marginTop: "30px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        📈 Progress History
      </h2>

      {records.length === 0 ? (
        <p>No progress records found.</p>
      ) : (
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th style={{ padding: "10px", textAlign: "left" }}>Date</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Weight</th>
              <th style={{ padding: "10px", textAlign: "left" }}>BMI</th>
              <th style={{ padding: "10px", textAlign: "left" }}>Body Fat</th>
            </tr>
          </thead>

          <tbody>
            {records.map((r) => (
              <tr key={r._id}>
                <td style={{ padding: "10px" }}>
                  {new Date(r.createdAt).toLocaleDateString()}
                </td>
                <td style={{ padding: "10px" }}>
                  {r.weight} kg
                </td>
                <td style={{ padding: "10px" }}>
                  {r.bmi}
                </td>
                <td style={{ padding: "10px" }}>
                  {r.bodyFat}%
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
