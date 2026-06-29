"use client";

interface Props {
  member: any;
  attendance: any[];
}

export default function AttendanceHistory({
  member,
  attendance,
}: Props) {
  const memberAttendance = attendance.filter(
    (item) =>
      item.memberName?.toLowerCase() ===
      member.name?.toLowerCase()
  );

  return (
    <div
      style={{
        background: "#111",
        padding: "25px",
        borderRadius: "15px",
      }}
    >
      <h2 style={{ marginBottom: "15px" }}>
        📅 Attendance History
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          color: "white",
        }}
      >
        <thead>
          <tr style={{ borderBottom: "1px solid #333" }}>
            <th style={{ textAlign: "left", padding: "8px" }}>
              Date
            </th>
            <th style={{ textAlign: "left", padding: "8px" }}>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {memberAttendance.map((item) => (
            <tr key={item._id}>
              <td style={{ padding: "8px" }}>
                {item.date}
              </td>

              <td
                style={{
                  padding: "8px",
                  color: "#00e676",
                  fontWeight: "bold",
                }}
              >
                Present
              </td>
            </tr>
          ))}

          {memberAttendance.length === 0 && (
            <tr>
              <td
                colSpan={2}
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No attendance history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
