"use client";

import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function PaymentsPage() {
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  
  const [payments, setPayments] = useState<any[]>([]);
  const [members, setMembers] = useState<any[]>([]);
  const [editingId, setEditingId] = useState("");
  const [editAmount, setEditAmount] = useState("");
  const totalRevenue = payments.reduce(
  (sum, p) => sum + Number(p.amount || 0),
  0
);

const totalPayments = payments.length;

const paidMembers = new Set(
  payments.map((p) => p.memberName)
).size;

  // FETCH PAYMENTS
  const fetchPayments = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments`
      );

      const data = await response.json();

      if (data.success) {
        setPayments(data.payments);
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  // ADD PAYMENT
  const addPayment = async () => {
    if (!memberName || !amount || !month) {
      alert("Fill all fields");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/payments`,
        {
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
        }
      );

      const data = await response.json();

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
      alert("Server Error");
    }
  };

  const fetchMembers = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/members`
    );

    const data = await response.json();

    setMembers(data);
  } catch (error) {
    console.log(error);
  }
};
   useEffect(() => {
  fetchPayments();
  fetchMembers();
}, []);

  // DELETE PAYMENT
  const deletePayment = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete?");

    if (!confirmDelete) {
      return;
    }

    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/${id}`, {
        method: "DELETE",
      });

      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  };

  // START EDIT
  const startEdit = (payment: any) => {
    setEditingId(payment._id);
    setEditAmount(payment.amount);
  };

  // SAVE EDIT
  const saveEdit = async (id: string) => {
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/payments/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: editAmount,
        }),
      });

      setEditingId("");
      fetchPayments();
    } catch (error) {
      console.log(error);
    }
  };

  const printReceipt = (payment: any) => {
  const receipt = `
Smart Gym
-----------------------------
Payment Receipt

Member : ${payment.memberName}

Amount : ₹${payment.amount}

Month  : ${payment.month}

Status : ${payment.status}

Date   : ${new Date().toLocaleDateString()}

-----------------------------
Thank You!
`;

  const w = window.open("", "_blank");

  if (!w) return;

  w.document.write(`
<html>
<head>
<title>Receipt</title>
</head>

<body style="font-family:Arial;padding:40px;text-align:center;background:#f5f5f5">

<div style="
background:white;
max-width:700px;
margin:auto;
padding:40px;
border-radius:15px;
box-shadow:0 0 15px rgba(0,0,0,.15);
">

<img
src="${window.location.origin}/logo.png"
style="width:200px;margin-bottom:20px"
/>

<h2 style="margin:0;color:#00b050;">
SMART GYM
</h2>

<h3 style="margin-top:10px;">
PAYMENT RECEIPT
</h3>

<hr>

<div style="font-size:20px;line-height:2;text-align:center">

<div><b>Member:</b> ${payment.memberName}</div>

<div><b>Month:</b> ${payment.month}</div>

<div style="margin:25px 0;">
  <div style="font-size:16px;color:#666;">
    TOTAL PAID
  </div>

  <div style="
      font-size:36px;
      color:#00b050;
      font-weight:bold;
  ">
    ₹${payment.amount}
  </div>
</div>

<div>
<b>Status:</b>
<span style="color:green;font-weight:bold">
${payment.status}
</span>
</div>

<div style="margin-top:15px;">
<b>Date:</b>
${new Date().toLocaleDateString()}
</div>

<hr style="margin:30px 0">

<div style="color:#666;">
Thank you for choosing Smart Gym
</div>

</div>

<script>
const img = document.querySelector("img");

function doPrint() {
  setTimeout(() => {
    window.print();
    window.onafterprint = () => window.close();
  }, 500);
}

if (img) {
  if (img.complete) {
    doPrint();
  } else {
    img.onload = doPrint;
    img.onerror = doPrint;
  }
} else {
  doPrint();
}
</script>

</div>
</body>
</html>
`);

  w.document.close();
};

const exportPaymentsToExcel = () => {
  const data = payments.map((payment: any) => ({
    Member: payment.memberName,
    Amount: payment.amount,
    Month: payment.month,
    Status: payment.status,
    Date: new Date().toLocaleDateString(),
  }));

  const worksheet = XLSX.utils.json_to_sheet(data);
  const workbook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workbook, worksheet, "Payments");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  const file = new Blob([excelBuffer], {
    type:
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });

  saveAs(
    file,
    `SmartGym_Payments_${new Date().toISOString().split("T")[0]}.xlsx`
  );
};

return (
  <RoleGuard allowedRoles={["Admin", "Reception"]}>
    <div>
      <Sidebar />

      <main className="ml-64 p-6 bg-black min-h-screen text-white">
      
  <div className="flex justify-between items-center mb-6">
  <h1 className="text-3xl font-bold">
    Payments
  </h1>

  <button
    onClick={exportPaymentsToExcel}
    className="bg-blue-600 hover:bg-blue-700 px-5 py-3 rounded-xl font-semibold"
  >
    📤 Export Excel
  </button>
</div>

        {/* ADD PAYMENT FORM */}
        <div className="bg-zinc-900 p-6 rounded-xl mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
            <select
  value={memberName}
  onChange={(e) => setMemberName(e.target.value)}
  className="p-3 rounded bg-zinc-800 border border-zinc-700"
>
  <option value="">Select Member</option>

  {members.map((member: any) => (
    <option
      key={member._id}
      value={member.name}
    >
      {member.name}
    </option>
  ))}
</select>

            <input
              type="number"
              placeholder="Amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="p-3 rounded bg-zinc-800 border border-zinc-700"
            />

            <input
              type="text"
              placeholder="Month"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
              className="p-3 rounded bg-zinc-800 border border-zinc-700"
            />
          </div>

          <button
            onClick={addPayment}
            className="mt-4 bg-green-600 px-5 py-2 rounded-xl"
          >
            Add Payment
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
  <div className="bg-zinc-900 p-6 rounded-xl">
    <h3 className="text-gray-400">💰 Total Revenue</h3>
    <h1 className="text-3xl font-bold">
      ₹{totalRevenue}
    </h1>
  </div>

  <div className="bg-zinc-900 p-6 rounded-xl">
    <h3 className="text-gray-400">🧾 Total Payments</h3>
    <h1 className="text-3xl font-bold">
      {totalPayments}
    </h1>
  </div>

  <div className="bg-zinc-900 p-6 rounded-xl">
    <h3 className="text-gray-400">👤 Paying Members</h3>
    <h1 className="text-3xl font-bold">
      {paidMembers}
    </h1>
  </div>
</div>
 
        {/* PAYMENT TABLE */}
        <div className="overflow-auto bg-zinc-900 rounded-xl">
          <table className="w-full">
            <thead className="bg-zinc-800">
              <tr>
                <th className="p-4 text-left">Member</th>
                <th className="p-4 text-left">Amount</th>
                <th className="p-4 text-left">Month</th>
                <th className="p-4 text-left">Status</th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-b border-zinc-800"
                >
                  <td className="p-4">{payment.memberName}</td>

                  <td className="p-4">
                    {editingId === payment._id ? (
                      <input
                        type="number"
                        value={editAmount}
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="bg-zinc-800 p-2 rounded"
                      />
                    ) : (
                      `₹${payment.amount}`
                    )}
                  </td>

                  <td className="p-4">{payment.month}</td>

                  <td className="p-4">
                    <span
                      className={`px-4 py-2 rounded-xl text-white ${
                        payment.status === "Paid"
                          ? "bg-green-500"
                          : "bg-red-500"
                      }`}
                    >
                      {payment.status}

                      <button
                        onClick={() => deletePayment(payment._id)}
                        className="bg-red-600 px-4 py-2 rounded-xl ml-3"
                      >
                        Delete
                      </button>


              {editingId === payment._id ? (
  <button
    onClick={() => saveEdit(payment._id)}
    className="bg-blue-600 px-4 py-2 rounded-xl ml-3"
  >
    Save
  </button>
) : (
  <>
    <button
      onClick={() => startEdit(payment)}
      className="bg-yellow-500 text-black px-4 py-2 rounded-xl ml-3"
    >
      Edit
    </button>
   <button
  onClick={() => printReceipt(payment)}
  className="bg-green-600 px-4 py-2 rounded-xl ml-3"
>
  Receipt
</button>
  </>
)}
         
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
</div> 
</RoleGuard>
);
}
