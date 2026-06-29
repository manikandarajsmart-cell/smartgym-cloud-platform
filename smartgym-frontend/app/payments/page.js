"use client";

import { useEffect, useState } from "react";

export default function PaymentsPage() {
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const [payments, setPayments] = useState([]);

  const fetchPayments = async () => {
    try {
      const res = await fetch("https://smartgym.cloud/api/payments");
      const data = await res.json();
      setPayments(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  const addPayment = async () => {
    try {
      const res = await fetch("https://smartgym.cloud/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberName,
          amount,
          month,
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Payment Added");

        setMemberName("");
        setAmount("");
        setMonth("");

        fetchPayments();
      }
    } catch (error) {
      console.log(error);
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
      <h1 style={{ fontSize: "60px", marginBottom: "30px" }}>
        Payments
      </h1>

      <div
        style={{
          background: "#111",
          padding: "30px",
          borderRadius: "20px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Member Name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          style={{
            width: "300px",
            padding: "15px",
            marginRight: "10px",
            background: "#222",
            color: "white",
            border: "1px solid #444",
            borderRadius: "10px",
          }}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={{
            width: "300px",
            padding: "15px",
            marginRight: "10px",
            background: "#222",
            color: "white",
            border: "1px solid #444",
            borderRadius: "10px",
          }}
        />

        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={{
            width: "300px",
            padding: "15px",
            background: "#222",
            color: "white",
            border: "1px solid #444",
            borderRadius: "10px",
          }}
        />

        <br />
        <br />

        <button
          onClick={addPayment}
          style={{
            padding: "15px 30px",
            background: "green",
            color: "white",
            border: "none",
            borderRadius: "10px",
            fontSize: "18px",
            cursor: "pointer",
          }}
        >
          Add Payment
        </button>
      </div>

      <table
        style={{
          width: "100%",
          background: "#111",
          borderRadius: "20px",
          overflow: "hidden",
        }}
      >
        <thead>
          <tr>
            <th style={{ padding: "20px" }}>Member</th>
            <th>Amount</th>
            <th>Month</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments.map((payment, index) => (
            <tr key={index}>
              <td style={{ padding: "20px" }}>
                {payment.memberName}
              </td>

              <td>₹{payment.amount}</td>

              <td>{payment.month}</td>

              <td>
                <span
                  style={{
                    background: "green",
                    padding: "8px 15px",
                    borderRadius: "20px",
                  }}
                >
                  Paid
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
