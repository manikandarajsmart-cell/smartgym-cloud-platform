"use client";

import { useEffect, useState } from "react";

export default function AttendanceRecordsPage() {
  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const exportCSV = () => {
  const headers = ["Member Name", "Date", "Time"];

  const rows = records.map((item) => [
    item.memberName || "",
    item.date || "",
    item.time || "",
  ]);

  const csvContent = [
    headers.join(","),
    ...rows.map((row) => row.join(",")),
  ].join("\n");

  const blob = new Blob([csvContent], {
    type: "text/csv;charset=utf-8;",
  });

  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "attendance-records.csv";
  link.click();
};

  const fetchAttendance = async () => {
    try {
      const res = await fetch("https://smartgym.cloud/api/attendance");
      const data = await res.json();

      setRecords(data.attendance || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAttendance();
  }, []);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "black",
        color: "white",
        padding: "40px",
      }}
    >
      <h1
        style={{
          fontSize: "60px",
          fontWeight: "bold",
          marginBottom: "40px",
        }}
      >
        📸 Attendance Records
      </h1>

      <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
  }}
>
  <div
    style={{
      background: "#111",
      padding: "20px",
      borderRadius: "12px",
      border: "1px solid #222",
      fontSize: "24px",
      fontWeight: "bold",
    }}
  >
    📸 Total Attendance: {records.length}
  </div>
    <button
  onClick={exportCSV}
  style={{
    padding: "15px 25px",
    background: "#2196f3",
    color: "white",
    border: "none",
    borderRadius: "10px",
    fontWeight: "bold",
    cursor: "pointer",
    marginLeft: "20px",
  }}
>
  📥 Export CSV
</button>

  <input
    type="text"
    placeholder="Search Member..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    style={{
      padding: "12px",
      width: "300px",
      borderRadius: "10px",
      border: "1px solid #333",
      background: "#111",
      color: "white",
    }}
  />
</div>

      <div
        style={{
          background: "#111",
          borderRadius: "20px",
          overflow: "hidden",
          border: "1px solid #222",
        }}
      >
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr
              style={{
                background: "#151515",
              }}
            >
              <th style={thStyle}>Member Name</th>
              <th style={thStyle}>Date</th>
              <th style={thStyle}>Time</th>
            </tr>
          </thead>

          <tbody>
          {records
  .filter((item) =>
    item.memberName
      ?.toLowerCase()
      .includes(search.toLowerCase())
  )
  .map((item, index) => (

              <tr
                key={index}
                style={{
                  borderTop: "1px solid #222",
                }}
              >
                <td style={tdStyle}>{item.memberName}</td>
                <td style={tdStyle}>{item.date}</td>
                <td style={tdStyle}>{item.time}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {records.length === 0 && (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "gray",
            }}
          >
            No Attendance Records
          </div>
        )}
      </div>
    </div>
  );
}

const thStyle = {
  padding: "20px",
  textAlign: "left",
  fontSize: "22px",
};

const tdStyle = {
  padding: "20px",
  fontSize: "20px",
};
