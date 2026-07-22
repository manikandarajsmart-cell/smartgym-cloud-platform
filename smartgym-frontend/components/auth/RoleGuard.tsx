"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type RoleGuardProps = {
  allowedRoles: string[];
  children: React.ReactNode;
};

export default function RoleGuard({
  allowedRoles,
  children,
}: RoleGuardProps) {
  const router = useRouter();

  const [authorized, setAuthorized] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("smartgym-auth");
    const role = localStorage.getItem("smartgym-role");

    if (!auth) {
      router.replace("/login");
      return;
    }

const normalizedRole = (role || "").toLowerCase();

const normalizedAllowedRoles = allowedRoles.map((r) =>
  r.toLowerCase()
);

if (!normalizedAllowedRoles.includes(normalizedRole)) {
  alert("Access denied");
  router.replace("/dashboard");
  return;
}

    setAuthorized(true);
  }, [allowedRoles, router]);

  if (!authorized) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#000",
          color: "#fff",
          fontSize: "20px",
        }}
      >
        Checking permissions...
      </div>
    );
  }

  return <>{children}</>;
}
