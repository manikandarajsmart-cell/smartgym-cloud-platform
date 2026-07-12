"use client";

interface Props {
  member: any;
}

export default function TransformationGallery({ member }: Props) {
  return (
    <div
      style={{
        background: "#111",
        borderRadius: "15px",
        padding: "25px",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>
        📷 Transformation Gallery
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "25px",
        }}
      >
        <div
          style={{
            border: "2px dashed #333",
            borderRadius: "12px",
            padding: "25px",
            textAlign: "center",
          }}
        >
          <h3>Before</h3>

          <div
            style={{
              height: "250px",
              background: "#1a1a1a",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777",
              marginTop: "15px",
            }}
          >
            No Before Photo
          </div>
        </div>

        <div
          style={{
            border: "2px dashed #333",
            borderRadius: "12px",
            padding: "25px",
            textAlign: "center",
          }}
        >
          <h3>After</h3>

          <div
            style={{
              height: "250px",
              background: "#1a1a1a",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#777",
              marginTop: "15px",
            }}
          >
            No After Photo
          </div>
        </div>
      </div>

      <div
        style={{
          marginTop: "25px",
          display: "flex",
          gap: "12px",
        }}
      >
        <button
          style={{
            background: "#00e676",
            color: "#000",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Upload Before
        </button>

        <button
          style={{
            background: "#2196f3",
            color: "#fff",
            border: "none",
            padding: "12px 20px",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: "bold",
          }}
        >
          Upload After
        </button>
      </div>
    </div>
  );
}

