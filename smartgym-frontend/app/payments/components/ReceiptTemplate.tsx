"use client";

type ReceiptProps = {
  memberName: string;
  amount: number | string;
  month: string;
  status: string;
  date?: string;
};

export default function ReceiptTemplate({
  memberName,
  amount,
  month,
  status,
  date,
}: ReceiptProps) {
  const receiptNo = `SG-${new Date()
    .toISOString()
    .slice(0, 10)
    .replace(/-/g, "")}-0001`;

  return (
    <div
      style={{
        maxWidth: "700px",
        margin: "30px auto",
        background: "#fff",
        color: "#000",
        padding: "40px",
        borderRadius: "16px",
        fontFamily: "Arial, sans-serif",
        boxShadow: "0 0 20px rgba(0,0,0,.15)",
      }}
    >
      <div style={{ textAlign: "center", marginBottom: "30px" }}>
        <img
          src="/logo.png"
          alt="Smart Gym"
          style={{ width: "140px", marginBottom: "15px" }}
        />

        <h1 style={{ margin: 0, color: "#00b050" }}>
          SMART GYM
        </h1>

        <h2 style={{ marginTop: "10px" }}>
          PAYMENT RECEIPT
        </h2>
      </div>

      <hr />

      <table
        style={{
          width: "100%",
          marginTop: "25px",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          <tr>
            <td><strong>Receipt No</strong></td>
            <td>{receiptNo}</td>
          </tr>

          <tr>
            <td><strong>Member</strong></td>
            <td>{memberName}</td>
          </tr>

          <tr>
            <td><strong>Month</strong></td>
            <td>{month}</td>
          </tr>

          <tr>
            <td><strong>Amount</strong></td>
            <td>₹{amount}</td>
          </tr>

          <tr>
            <td><strong>Status</strong></td>
            <td style={{ color: "green", fontWeight: "bold" }}>
              {status}
            </td>
          </tr>

          <tr>
            <td><strong>Date</strong></td>
            <td>
              {date || new Date().toLocaleDateString()}
            </td>
          </tr>
        </tbody>
      </table>

      <hr style={{ marginTop: "30px" }} />

      <div
        style={{
          textAlign: "center",
          marginTop: "25px",
          color: "#666",
        }}
      >
        <h3>Thank You!</h3>

        <p>
          Thank you for choosing Smart Gym.
        </p>

        <p>
          We appreciate your membership.
        </p>
      </div>
    </div>
  );
}
