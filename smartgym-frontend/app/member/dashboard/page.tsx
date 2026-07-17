import HeroCard from "./components/HeroCard";
import QuickStats from "./components/QuickStats";
import WorkoutCard from "./components/WorkoutCard";
import DietCard from "./components/DietCard";

export default function MemberDashboard() {
  return (
    <div
      style={{
        background: "#0d1117",
        minHeight: "100vh",
        padding: "30px",
      }}
    >
      <HeroCard />
<QuickStats />
<WorkoutCard />
<DietCard />

    </div>
  );
}
