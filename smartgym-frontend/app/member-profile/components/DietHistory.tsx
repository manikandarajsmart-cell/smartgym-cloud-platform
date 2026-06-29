"use client";

interface Props {
  member: any;
  dietPlans: any[];
}

export default function DietHistory({
  member,
  dietPlans,
}: Props) {
  const memberDietPlans = dietPlans.filter(
    (plan) =>
      plan.memberName?.toLowerCase() ===
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
        🥗 Diet Plans
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
              Meal
            </th>
            <th style={{ textAlign: "left", padding: "8px" }}>
              Food
            </th>
            <th style={{ textAlign: "left", padding: "8px" }}>
              Quantity
            </th>
          </tr>
        </thead>

        <tbody>
          {memberDietPlans.map((plan) => (
            <tr key={plan._id}>
              <td style={{ padding: "8px" }}>
                {plan.meal}
              </td>

              <td style={{ padding: "8px" }}>
                {plan.food}
              </td>

              <td style={{ padding: "8px" }}>
                {plan.quantity}
              </td>
            </tr>
          ))}

          {memberDietPlans.length === 0 && (
            <tr>
              <td
                colSpan={3}
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No diet plans found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
