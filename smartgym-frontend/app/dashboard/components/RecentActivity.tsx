type Activity = {
  icon: string;
  text: string;
};

type Props = {
  activities: Activity[];
};

export default function RecentActivity({
  activities,
}: Props) {
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
        🔥 Recent Activity
      </h2>

      <div style={{ lineHeight: "2.2", fontSize: "18px" }}>
        {activities.length === 0 ? (
          <div style={{ color: "#888" }}>
            No recent activity available.
          </div>
        ) : (
          activities.map((activity, index) => (
            <div key={index}>
              {activity.icon} {activity.text}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
