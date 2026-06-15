type StatCardProps = {
  title: string;
  value: string;
  icon: string;
};

export default function StatCard({
  title,
  value,
  icon,
}: StatCardProps) {
  return (
    <div
      style={{
        background: "#111",
        padding: "25px",
        borderRadius: "15px",
        border: "1px solid #222",
        width: "250px",
        color: "white",
      }}
    >
      <div
        style={{
          fontSize: "30px",
        }}
      >
        {icon}
      </div>

      <h3
        style={{
          marginTop: "15px",
          color: "#999",
        }}
      >
        {title}
      </h3>

      <h1
        style={{
          marginTop: "10px",
          fontSize: "35px",
        }}
      >
        {value}
      </h1>
    </div>
  );
}
