import Card from "./Card";

type Props = {
  title: string;
  value: string;
  icon: string;
};

export default function StatCard({
  title,
  value,
  icon,
}: Props) {
  return (
    <Card>
      <div
        style={{
          color: "white",
        }}
      >
        <div
          style={{
            fontSize: "18px",
            marginBottom: "10px",
          }}
        >
          {icon} {title}
        </div>

        <div
          style={{
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          {value}
        </div>
      </div>
    </Card>
  );
}
