"use client";

import { useEffect, useState } from "react";

export default function MembersListPage() {
  const [members, setMembers] = useState([]);

  // FETCH MEMBERS
  const fetchMembers = async () => {
    try {
      const res = await fetch("https://smartgym.cloud/api/members");
      const data = await res.json();
      setMembers(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // DELETE MEMBER
  const deleteMember = async (id) => {
    const confirmDelete = confirm("Delete this member?");

    if (!confirmDelete) return;

    try {
      const res = await fetch(
        `https://smartgym.cloud/api/members/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Member Deleted");
        fetchMembers();
      } else {
        alert("Delete Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  // EDIT MEMBER
  const editMember = async (member) => {
    const newName = prompt("Enter new name", member.name);
    const newPlan = prompt("Enter new plan", member.plan);
    const newFee = prompt("Enter new fee", member.fee);

    if (!newName || !newPlan || !newFee) return;

    try {
      const res = await fetch(
        `https://smartgym.cloud/api/members/${member._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: newName,
            plan: newPlan,
            fee: newFee,
          }),
        }
      );

      const data = await res.json();

      if (data.success) {
        alert("Member Updated");
        fetchMembers();
      } else {
        alert("Update Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

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
          fontSize: "70px",
          marginBottom: "50px",
          fontWeight: "bold",
        }}
      >
        Members List
      </h1>

      {members.length === 0 ? (
        <p style={{ fontSize: "30px" }}>No Members Found</p>
      ) : (
        members.map((member) => (
          <div
            key={member._id}
            style={{
              background: "#111",
              border: "1px solid #333",
              borderRadius: "20px",
              padding: "20px",
              marginBottom: "20px",
              maxWidth: "500px",
            }}
          >
            <h2>{member.name}</h2>

            <p>Plan: {member.plan}</p>

            <p>Fee: ₹{member.fee}</p>

            <div
              style={{
                display: "flex",
                gap: "10px",
                marginTop: "20px",
              }}
            >
              <button
                onClick={() => editMember(member)}
                style={{
                  background: "orange",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Edit
              </button>

              <button
                onClick={() => deleteMember(member._id)}
                style={{
                  background: "red",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}
