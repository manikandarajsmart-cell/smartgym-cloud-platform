"use client";

import { useEffect, useState } from "react";

export default function MemberListPage() {
  const [members, setMembers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [editName, setEditName] = useState("");
  const [editPlan, setEditPlan] = useState("");
  const [editFee, setEditFee] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    try {
      const response = await fetch(
        "https://api.smartgym.cloud/api/members"
      );

      const data = await response.json();
      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteMember = async (id: number) => {
    try {
      await fetch(`https://api.smartgym.cloud/api/members/${id}`, {
        method: "DELETE",
      });

      setMembers(
        members.filter((member) => member.id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const startEdit = (member: any) => {
    setEditingId(member.id);
    setEditName(member.name || "");
    setEditPlan(member.plan || "");
    setEditFee(member.fee || "");
  };

  const saveEdit = () => {
    setMembers(
      members.map((member) =>
        member.id === editingId
          ? {
              ...member,
              name: editName,
              plan: editPlan,
              fee: editFee,
            }
          : member
      )
    );

    setEditingId(null);
  };

  const pageStyle = {
    background: "#000",
    minHeight: "100vh",
    color: "white",
    padding: "40px",
    fontFamily: "sans-serif",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse" as const,
    marginTop: "40px",
    background: "#111",
    borderRadius: "20px",
    overflow: "hidden",
  };

  const thStyle = {
    padding: "25px",
    textAlign: "left" as const,
    fontSize: "20px",
  };

  const tdStyle = {
    padding: "25px",
    borderTop: "1px solid #222",
  };

  return (
    <div style={pageStyle}>
      <h1
        style={{
          fontSize: "70px",
          marginBottom: "30px",
        }}
      >
        👥 Members CRM
      </h1>

      <table style={tableStyle}>
        <thead>
          <tr>
            <th style={thStyle}>Name</th>
            <th style={thStyle}>Plan</th>
            <th style={thStyle}>Fee</th>
            <th style={thStyle}>Status</th>
            <th style={thStyle}>Action</th>
          </tr>
        </thead>

        <tbody>
          {members.map((member) => (
            <tr
              key={member.id}
              style={{
                borderTop: "1px solid #222",
              }}
            >
              <td style={tdStyle}>
                {editingId === member.id ? (
                  <input
                    value={editName}
                    onChange={(e) =>
                      setEditName(e.target.value)
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                    }}
                  />
                ) : (
                  member.name
                )}
              </td>

              <td style={tdStyle}>
                {editingId === member.id ? (
                  <input
                    value={editPlan}
                    onChange={(e) =>
                      setEditPlan(e.target.value)
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                    }}
                  />
                ) : (
                  member.plan
                )}
              </td>

              <td style={tdStyle}>
                {editingId === member.id ? (
                  <input
                    value={editFee}
                    onChange={(e) =>
                      setEditFee(e.target.value)
                    }
                    style={{
                      padding: "10px",
                      borderRadius: "10px",
                      border: "none",
                    }}
                  />
                ) : (
                  `₹${member.fee || 0}`
                )}
              </td>

              <td style={tdStyle}>
                <span
                  style={{
                    background: "#00d84a",
                    padding: "10px 20px",
                    borderRadius: "30px",
                  }}
                >
                  Active
                </span>
              </td>

              <td style={tdStyle}>
                {editingId === member.id ? (
                  <button
                    onClick={saveEdit}
                    style={{
                      background: "#00d84a",
                      color: "white",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Save
                  </button>
                ) : (
                  <button
                    onClick={() => startEdit(member)}
                    style={{
                      background: "#0066ff",
                      color: "white",
                      border: "none",
                      padding: "12px 20px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginRight: "10px",
                    }}
                  >
                    Edit
                  </button>
                )}

                <button
                  onClick={() => deleteMember(member.id)}
                  style={{
                    background: "#ff004c",
                    color: "white",
                    border: "none",
                    padding: "12px 20px",
                    borderRadius: "10px",
                    cursor: "pointer",
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
