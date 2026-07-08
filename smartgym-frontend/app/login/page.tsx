"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (!response.ok || !data.success) {
      alert(data.message || "Invalid credentials");
      return;
    }

    localStorage.setItem("smartgym-auth", "true");
    localStorage.setItem("smartgym-user", JSON.stringify(data.user));
    localStorage.setItem("smartgym-role", data.user.role);

    router.push("/dashboard");
  } catch (error) {
    console.error(error);
    alert("Server Error");
  }
};

  return (
    <div
      style={{
        background: "#000",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "20px",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "420px",
          background: "#111",
          border: "1px solid #222",
          borderRadius: "20px",
          padding: "40px",
          color: "white",
          boxShadow: "0 0 30px rgba(0,255,100,0.1)",
        }}
      >
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
          }}
        >
          <div
            style={{
              fontSize: "70px",
              marginBottom: "10px",
            }}
          >
            🏋️
          </div>

          <h1
            style={{
              fontSize: "42px",
              fontWeight: "bold",
              marginBottom: "10px",
            }}
          >
            Smart Gym ERP
          </h1>

          <p
            style={{
              color: "#aaa",
              fontSize: "18px",
            }}
          >
            Admin Login
          </p>
        </div>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "20px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "white",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            padding: "18px",
            marginBottom: "25px",
            borderRadius: "12px",
            border: "1px solid #333",
            background: "#1a1a1a",
            color: "white",
            fontSize: "16px",
            outline: "none",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%",
            padding: "18px",
            background: "#00d84a",
            color: "white",
            border: "none",
            borderRadius: "12px",
            fontSize: "20px",
            fontWeight: "bold",
            cursor: "pointer",
          }}
        >
          Login
        </button>

<div
  style={{
    marginTop: "25px",
    textAlign: "center",
    color: "#888",
    fontSize: "14px",
  }}
>
  Already have account?{" "}
  <span
    style={{ color: "#00ff99", cursor: "pointer" }}
    onClick={() => router.push("/login")}
  >
    Login
  </span>
</div>      </div>
    </div>
  );
}
