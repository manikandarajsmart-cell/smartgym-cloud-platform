import React, { useEffect, useState } from "react";

const Payments = () => {
  const [payments, setPayments] = useState([]);
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");

  const API = "https://smartgym.cloud/api/payments";

  // FETCH PAYMENTS
  const fetchPayments = async () => {
    try {
      const res = await fetch(API);
      const data = await res.json();

      if (Array.isArray(data)) {
        setPayments(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ADD PAYMENT
  const addPayment = async () => {
    if (!memberName || !amount || !month) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberName,
          amount,
          month,
          status: "Paid",
        }),
      });

      const data = await res.json();

      if (data.success) {
        alert("Payment Added");

        setMemberName("");
        setAmount("");
        setMonth("");

        fetchPayments();
      } else {
        alert("Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  // DELETE PAYMENT
  const deletePayment = async (id) => {
    try {
      await fetch(`${API}/${id}`, {
        method: "DELETE",
      });

      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  };

  // TOTAL REVENUE
  const totalRevenue = payments.reduce(
    (total, item) => total + Number(item.amount || 0),
    0
  );

  return (
    <div
      style={{
        padding: "30px",
        background: "#000",
        color: "white",
        minHeight: "100vh",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Payments CRM</h1>

      {/* Revenue Card */}
      <div
        style={{
          background: "#00aa33",
          padding: "20px",
          borderRadius: "15px",
          width: "300px",
          marginBottom: "30px",
        }}
      >
        <h2>Total Revenue</h2>
        <h1>₹{totalRevenue}</h1>
      </div>

      {/* Add Payment Form */}
      <div
        style={{
          background: "#111",
          padding: "20px",
          borderRadius: "15px",
          marginBottom: "30px",
        }}
      >
        <input
          type="text"
          placeholder="Member Name"
          value={memberName}
          onChange={(e) => setMemberName(e.target.value)}
          style={inputStyle}
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          style={inputStyle}
        />

        <input
          type="text"
          placeholder="Month"
          value={month}
          onChange={(e) => setMonth(e.target.value)}
          style={inputStyle}
        />

        <button onClick={addPayment} style={buttonStyle}>
          Add Payment
        </button>
      </div>

      {/* Payment History */}
      <h2 style={{ marginBottom: "15px" }}>Payment History</h2>

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            background: "#111",
          }}
        >
          <thead>
            <tr>
              <th style={tableCell}>Member</th>
              <th style={tableCell}>Amount</th>
              <th style={tableCell}>Month</th>
              <th style={tableCell}>Status</th>
              <th style={tableCell}>Date</th>
              <th style={tableCell}>Action</th>
            </tr>
          </thead>

          <tbody>
            {payments.length > 0 ? (
              payments.map((item) => (
                <tr key={item._id}>
                  <td style={tableCell}>{item.memberName}</td>
                  <td style={tableCell}>₹{item.amount}</td>
                  <td style={tableCell}>{item.month}</td>
                  <td style={tableCell}>{item.status}</td>

                  <td style={tableCell}>
                    {item.date
                      ? new Date(item.date).toLocaleDateString()
                      : "N/A"}
                  </td>

                  <td style={tableCell}>
                    <button
                      onClick={() => deletePayment(item._id)}
                      style={{
                        background: "red",
                        color: "white",
                        border: "none",
                        padding: "8px 15px",
                        borderRadius: "8px",
                        cursor: "pointer",
                      }}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td style={tableCell} colSpan="6">
                  No Payments Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const inputStyle = {
  width: "100%",
  padding: "15px",
  marginBottom: "15px",
  borderRadius: "10px",
  border: "1px solid #333",
  background: "#000",
  color: "white",
  fontSize: "16px",
  boxSizing: "border-box",
};

const buttonStyle = {
  width: "100%",
  padding: "15px",
  background: "#00aa33",
  color: "white",
  border: "none",
  borderRadius: "10px",
  fontSize: "18px",
  cursor: "pointer",
};

const tableCell = {
  border: "1px solid #333",
  padding: "15px",
  textAlign: "center",
};

export default Payments;
