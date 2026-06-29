"use client";

interface Props {
  member: any;
  payments: any[];
}

export default function PaymentHistory({
  member,
  payments,
}: Props) {
  const memberPayments = payments.filter(
    (payment) =>
      payment.memberName?.toLowerCase() ===
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
        💳 Payment History
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
              Date / Month
            </th>
            <th style={{ textAlign: "left", padding: "8px" }}>
              Amount
            </th>
            <th style={{ textAlign: "left", padding: "8px" }}>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {memberPayments.map((payment) => (
            <tr key={payment._id}>
              <td style={{ padding: "8px" }}>
                {payment.date || payment.month || "-"}
              </td>

              <td style={{ padding: "8px" }}>
                ₹{payment.amount}
              </td>

              <td
                style={{
                  padding: "8px",
                  color:
                    payment.status === "Paid"
                      ? "#00e676"
                      : "#ff5252",
                }}
              >
                {payment.status || "Paid"}
              </td>
            </tr>
          ))}

          {memberPayments.length === 0 && (
            <tr>
              <td
                colSpan={3}
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
