
"use client";

import { useState } from "react";
import axios from "axios";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const url = isLogin
        ? "https://api.smartgym.cloud/api/auth/login"
        : "https://api.smartgym.cloud/api/auth/register";

      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await axios.post(url, payload);

      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        window.location.href = "/dashboard";
      }

      setMessage(
        isLogin
          ? "✅ Login Successful"
          : "✅ Registration Successful"
      );

    } catch (err: any) {
      setMessage(
        "❌ " + (err.response?.data?.message || "Error")
      );
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
        color: "white",
      }}
    >
      <div
        style={{
          width: "400px",
          padding: "30px",
          border: "1px solid #333",
          borderRadius: "15px",
          background: "#111",
        }}
      >
        <h1>🏋️ Smart Gym Cloud</h1>

        {!isLogin && (
          <input
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={inputStyle}
          />
        )}

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />

        <input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />

        <button
          onClick={handleSubmit}
          style={buttonStyle}
        >
          {isLogin ? "Login" : "Register"}
        </button>

        <p style={{ marginTop: "15px" }}>
          {isLogin
            ? "Don't have account?"
            : "Already have account?"}

          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: "#00ff99",
              cursor: "pointer",
              marginLeft: "5px",
            }}
          >
            {isLogin ? "Register" : "Login"}
          </span>
        </p>

        {message && (
          <p style={{ marginTop: "15px" }}>
            {message}
          </p>
        )}
      </div>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "15px",
  background: "#222",
  border: "1px solid #333",
  borderRadius: "8px",
  color: "white",
};

const buttonStyle = {
  width: "100%",
  padding: "12px",
  marginTop: "20px",
  background: "#00cc66",
  border: "none",
  borderRadius: "8px",
  color: "white",
  fontWeight: "bold",
  cursor: "pointer",
};
