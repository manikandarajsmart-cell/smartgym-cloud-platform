type Payment = {
  memberName: string;
  month: string;
  amount: number;
  status: string;
};

type Props = {
  payments: Payment[];
};

export default function RecentPayments({ payments }: Props) {
  return (
    <div
      style={{
        marginTop: "40px",
        background: "#151515",
        borderRadius: "18px",
        padding: "25px",
        border: "1px solid #2a2a2a",
      }}
    >
      <h2
        style={{
          color: "#00ff66",
          marginBottom: "20px",
          fontSize: "28px",
        }}
      >
        💳 Recent Payments
      </h2>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
        }}
      >
        <thead>
          <tr>
            <th style={{ textAlign: "left", padding: "12px" }}>Member</th>
            <th style={{ textAlign: "left", padding: "12px" }}>Month</th>
            <th style={{ textAlign: "left", padding: "12px" }}>Amount</th>
            <th style={{ textAlign: "left", padding: "12px" }}>Status</th>
          </tr>
        </thead>

        <tbody>
          {payments
            .slice(-5)
            .reverse()
            .map((payment, index) => (
              <tr key={index}>
                <td style={{ padding: "14px" }}>{payment.memberName}</td>

                <td style={{ padding: "14px" }}>{payment.month}</td>

                <td
                  style={{
                    padding: "14px",
                    color: "#00e676",
                    fontWeight: "bold",
                  }}
                >
                  ₹{payment.amount}
                </td>

                <td
                  style={{
                    padding: "14px",
                    color:
                      payment.status === "Paid"
                        ? "#00e676"
                        : "#ff5252",
                    fontWeight: "bold",
                  }}
                >
                  {payment.status}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
