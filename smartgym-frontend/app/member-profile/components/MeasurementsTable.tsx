"use client";

interface Props {
  progress: any[];
}

export default function MeasurementsTable({ progress }: Props) {
  return (
    <div
      style={{
        background: "#111",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <h3 style={{ marginBottom: "20px" }}>
        📏 Body Measurements
      </h3>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th align="left">Date</th>
            <th align="left">Weight</th>
            <th align="left">Chest</th>
            <th align="left">Waist</th>
            <th align="left">Arms</th>
          </tr>
        </thead>

        <tbody>
          {progress.length === 0 ? (
            <tr>
              <td
                colSpan={5}
                style={{
                  textAlign: "center",
                  padding: "40px",
                  opacity: 0.6,
                }}
              >
                No measurements recorded.
              </td>
            </tr>
          ) : (
            progress.map((item: any, index: number) => (
              <tr key={index}>
                <td>{item.date}</td>
                <td>{item.weight} kg</td>
                <td>{item.chest}</td>
                <td>{item.waist}</td>
                <td>{item.arms}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
