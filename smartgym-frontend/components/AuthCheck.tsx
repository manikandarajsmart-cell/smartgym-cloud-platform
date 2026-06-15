"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AuthCheck({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("smartgym-auth");

    if (!auth) {
      router.push("/login");
    }
  }, []);

  return <>{children}</>;
}
