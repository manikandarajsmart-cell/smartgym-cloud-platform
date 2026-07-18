import Card from "@/app/components/ui/Card";
import Button from "@/app/components/ui/Button";

export default function WorkoutCard() {
  return (
    <Card>
      <h2
        style={{
          color: "white",
          fontSize: "24px",
          marginBottom: "20px",
        }}
      >
        🏋️ Today's Workout
      </h2>

      <p
        style={{
          color: "#d1d5db",
          marginBottom: "12px",
          fontSize: "17px",
        }}
      >
        Chest • Shoulders • Triceps
      </p>

      <p
        style={{
          color: "#9ca3af",
          marginBottom: "25px",
        }}
      >
        Duration : 60 Minutes
      </p>


    <Button>
  ▶ Start Workout
</Button>
 
    </Card>
  );
}
