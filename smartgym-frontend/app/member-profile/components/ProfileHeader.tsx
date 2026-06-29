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
            gridTemplateColumns: "200px 1fr",
            gap: "30px",
            alignItems: "center",
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

            <p><b>Phone:</b> {member.phone || "-"}</p>
            <p><b>Email:</b> {member.email || "-"}</p>
            <p><b>Membership:</b> {member.plan}</p>
            <p><b>Fee:</b> ₹{member.fee}</p>
            <p><b>Expiry:</b> {member.expiryDate}</p>
          </div>
        </div>
      </div>
    </>
  );
}
