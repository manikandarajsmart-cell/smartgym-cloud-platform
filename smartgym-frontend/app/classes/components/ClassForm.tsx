export default function ClassForm() {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: 12,
        padding: 20,
        marginBottom: 20,
      }}
    >
      <h2>Add Class</h2>

      <input
        placeholder="Class Name"
        style={{
          width: "100%",
          padding: 10,
          marginTop: 10,
        }}
      />
    </div>
  );
}
