"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";

export default function PaymentsPage() {
  const [memberName, setMemberName] = useState("");
  const [amount, setAmount] = useState("");
  const [month, setMonth] = useState("");
  const [payments, setPayments] = useState<any[]>([]);
  const [revenue, setRevenue] = useState(0);

  // FETCH PAYMENTS
  const fetchPayments = async () => {
    try {
      const response = await fetch(
        "https://api.smartgym.cloud/api/payments"
      );

      const data = await response.json();

      if (data.success) {
        setPayments(data.payments);

        let total = 0;

        data.payments.forEach((item: any) => {
          total += Number(item.amount);
        });

        setRevenue(total);
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
      alert("Fill all fields");
      return;
    }

    try {
      const response = await fetch(
        "https://api.smartgym.cloud/api/payments",
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

  return (
    <>
      <Sidebar />

      <main className="min-h-screen bg-black text-white pl-[290px] p-10">

        {/* TITLE */}
        <h1 className="text-5xl font-bold mb-10">
          Payments CRM
        </h1>

        {/* REVENUE */}
        <div className="bg-green-600 p-6 rounded-3xl mb-10 w-[320px]">
          <h2 className="text-2xl font-bold">
            Total Revenue
          </h2>

          <p className="text-4xl font-bold mt-3">
            ₹{revenue}
          </p>
        </div>

        {/* FORM */}
        <div className="bg-[#111] p-8 rounded-3xl mb-10 max-w-2xl">

          <input
            type="text"
            placeholder="Member Name"
            value={memberName}
            onChange={(e) => setMemberName(e.target.value)}
            className="w-full p-5 mb-5 rounded-2xl bg-black border border-gray-800"
          />

          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-5 mb-5 rounded-2xl bg-black border border-gray-800"
          />

          <input
            type="text"
            placeholder="Month"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
            className="w-full p-5 mb-5 rounded-2xl bg-black border border-gray-800"
          />

          <button
            onClick={addPayment}
            className="w-full bg-green-600 hover:bg-green-700 p-5 rounded-2xl text-xl font-bold"
          >
            Add Payment
          </button>

        </div>

        {/* TABLE */}
        <div className="bg-[#111] rounded-3xl overflow-hidden">

          <table className="w-full">

            <thead>
              <tr className="border-b border-gray-800">

                <th className="p-6 text-left">
                  Member
                </th>

                <th className="p-6 text-left">
                  Amount
                </th>

                <th className="p-6 text-left">
                  Month
                </th>

                <th className="p-6 text-left">
                  Status
                </th>

              </tr>
            </thead>

            <tbody>

              {payments.map((payment, index) => (
                <tr
                  key={index}
                  className="border-b border-gray-900"
                >

                  <td className="p-6">
                    {payment.memberName}
                  </td>

                  <td className="p-6">
                    ₹{payment.amount}
                  </td>

                  <td className="p-6">
                    {payment.month}
                  </td>

                  <td className="p-6">
                    <span className="bg-green-500 px-4 py-2 rounded-xl">
                      {payment.status}
                    </span>
                  </td>

                </tr>
              ))}

            </tbody>

          </table>

        </div>

      </main>
    </>
  );
}
