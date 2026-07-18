import StatCard from "@/app/components/ui/StatCard";

export default function QuickStats() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
        gap: "20px",
        marginTop: "25px",
      }}
    >
      <StatCard
        icon="📅"
        title="Attendance"
        value="92%"
      />

      <StatCard
        icon="🏋️"
        title="Workout"
        value="Today"
      />

      <StatCard
        icon="🥗"
        title="Calories"
        value="2200"
      />

      <StatCard
        icon="⚖️"
        title="Weight"
        value="72.4 kg"
      />
    </div>
  );
}
