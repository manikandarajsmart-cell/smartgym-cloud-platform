"use client";

import ActionButton from "@/components/ui/ActionButton";
import StatusBadge from "@/components/ui/StatusBadge";
import { useRouter } from "next/navigation";

interface ProfileHeaderProps {
  member: any;
  status: string;
}

export default function ProfileHeader({
  member,
  status,
}: ProfileHeaderProps) {
  const router = useRouter();

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "30px",
          flexWrap: "wrap",
          gap: "15px",
        }}
      >
        <ActionButton
          variant="success"
          onClick={() => router.push("/member-list")}
        >
          ← Back to Members List
        </ActionButton>

        <StatusBadge status={status} />
      </div>

      <div
        style={{
          background: "#111",
          borderRadius: "15px",
          padding: "30px",
          marginBottom: "30px",
        }}
      >
        <div
          style={{
            display: "grid",

            gridTemplateColumns: "220px minmax(0, 1fr)",
          gap: "40px",
alignItems: "start",
paddingBottom: "10px",  
        
          }}
        >
          <div
            style={{
              width: "180px",
              height: "180px",
              borderRadius: "50%",
              background: "#333",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              fontSize: "70px",
            }}
          >
            👤
          </div>

          <div>
            <h2 style={{ fontSize: "34px", marginBottom: "10px" }}>
              {member.name}
            </h2>

            <div
  style={{
    display: "grid",
    gridTemplateColumns: "repeat(2, minmax(220px, 1fr))",
    gap: "16px 30px",
    marginTop: "20px",
  }}
>
  <div>
    <div style={{ color: "#888", fontSize: "13px" }}>Phone</div>
    <div>{member.phone || "-"}</div>
  </div>

  <div>
    <div style={{ color: "#888", fontSize: "13px" }}>Email</div>
    <div>{member.email || "-"}</div>
  </div>

  <div>
    <div style={{ color: "#888", fontSize: "13px" }}>Membership</div>
    <div>{member.plan}</div>
  </div>

  <div>
    <div style={{ color: "#888", fontSize: "13px" }}>Fee</div>
    <div>₹{member.fee}</div>
  </div>

  <div>
    <div style={{ color: "#888", fontSize: "13px" }}>Expiry Date</div>
    <div>{member.expiryDate}</div>
  </div>
</div>            
       
    </div>
        </div>
      </div>
    </>
  );
}
