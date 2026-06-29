"use client";

interface Props {
  member: any;
  workouts: any[];
}

export default function WorkoutHistory({
  member,
  workouts,
}: Props) {
  const memberWorkouts = workouts.filter(
    (workout) =>
      workout.memberName?.toLowerCase() ===
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
        🏋 Workout Plans
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
            <th style={{ textAlign: "left", padding: "8px" }}>Day</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Exercise</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Sets</th>
            <th style={{ textAlign: "left", padding: "8px" }}>Reps</th>
          </tr>
        </thead>

        <tbody>
          {memberWorkouts.map((workout) => (
            <tr key={workout._id}>
              <td style={{ padding: "8px" }}>{workout.day}</td>
              <td style={{ padding: "8px" }}>{workout.exercise}</td>
              <td style={{ padding: "8px" }}>{workout.sets}</td>
              <td style={{ padding: "8px" }}>{workout.reps}</td>
            </tr>
          ))}

          {memberWorkouts.length === 0 && (
            <tr>
              <td
                colSpan={4}
                style={{
                  textAlign: "center",
                  padding: "20px",
                }}
              >
                No workout plans found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
