type ClassItem = {
  _id?: string;
  className: string;
  trainer: string;
  schedule: string;
  duration: string;
  capacity: number;
};

type Props = {
  classes: ClassItem[];
};

export default function ClassTable({ classes }: Props) {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 12,
        padding: 20,
      }}
    >
      <h2>Classes List</h2>

      {classes.length === 0 ? (
        <p>No classes available.</p>
      ) : (
        <table
          style={{
            width: "100%",
            marginTop: 20,
            borderCollapse: "collapse",
          }}
        >
          <thead>
            <tr>
              <th align="left">Class</th>
              <th align="left">Trainer</th>
              <th align="left">Schedule</th>
              <th align="left">Duration</th>
              <th align="left">Capacity</th>
            </tr>
          </thead>

          <tbody>
            {classes.map((item) => (
              <tr key={item._id}>
                <td>{item.className}</td>
                <td>{item.trainer}</td>
                <td>{item.schedule}</td>
                <td>{item.duration}</td>
                <td>{item.capacity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
