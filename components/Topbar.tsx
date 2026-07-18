export default function Topbar() {
  return (
    <div
      style={{
        width: "100%",
        height: "80px",
        background: "#111827",
        borderBottom: "1px solid #1f2937",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "0 30px",
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {/* LEFT */}
      <div>
        <h2
          style={{
            color: "white",
            fontSize: "28px",
            fontWeight: "bold",
          }}
        >
          Smart Gym ERP 🚀
        </h2>

        <p
          style={{
            color: "#9ca3af",
            fontSize: "14px",
            marginTop: "4px",
          }}
        >
          Professional Gym Management System
        </p>
      </div>

      {/* RIGHT */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "20px",
        }}
      >
        {/* Notification */}
        <div
          style={{
            width: "45px",
            height: "45px",
            borderRadius: "12px",
            background: "#1f2937",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "white",
            fontSize: "20px",
            cursor: "pointer",
          }}
        >
          🔔
        </div>

        {/* Profile */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            background: "#1f2937",
            padding: "10px 16px",
            borderRadius: "14px",
          }}
        >
          <div
            style={{
              width: "42px",
              height: "42px",
              borderRadius: "50%",
              background: "#22c55e",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontWeight: "bold",
              color: "black",
              fontSize: "18px",
            }}
          >
            M
          </div>

          <div>
            <div
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "15px",
              }}
            >
              Manikandan
            </div>

            <div
              style={{
                color: "#9ca3af",
                fontSize: "13px",
              }}
            >
              Admin
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
