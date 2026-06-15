"use client";

import { useState } from "react";
import api from "../services/api";

import Button from "../components/Button";
import Input from "../components/Input";
import AuthCard from "../components/AuthCard";

export default function Home() {
  const [isLogin, setIsLogin] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const url = isLogin
  ? "/login"
  : "/register";

      const payload = isLogin
        ? { email, password }
        : { name, email, password };

      const res = await api.post(url, payload);

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
      <AuthCard>

        <h1>🔥 Smart Gym Cloud</h1>

        {!isLogin && (
          <Input
            placeholder="Name"
            value={name}
            onChange={(e: any) => setName(e.target.value)}
          />
        )}

        <Input
          placeholder="Email"
          value={email}
          onChange={(e: any) => setEmail(e.target.value)}
        />

        <Input
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e: any) => setPassword(e.target.value)}
        />

        <Button
          text={isLogin ? "Login" : "Register"}
          onClick={handleSubmit}
        />

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

      </AuthCard>
    </div>
  );
}
