"use client";

import { useEffect, useState } from "react";

interface Gym {
  _id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: string;
}

export default function GymsPage() {
  const [gyms, setGyms] = useState<Gym[]>([]);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  const fetchGyms = () => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setGyms(data.gyms);
        }
      });
  };

  useEffect(() => {
    fetchGyms();
  }, []);

  const handleCreateGym = async () => {
    if (!name.trim()) {
      alert("Gym Name is required");
      return;
    }

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/gyms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        address,
      }),
    });

    const data = await res.json();

    if (data.success) {
      setName("");
      setEmail("");
      setPhone("");
      setAddress("");

      fetchGyms();

      alert("Gym created successfully!");
    } else {
      alert("Failed to create gym");
    }
  };

  return (
    <div style={{ padding: 30 }}>
      <h1>🏢 SmartGym Cloud</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 10,
          marginTop: 20,
          marginBottom: 30,
        }}
      >
        <input
          placeholder="Gym Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        <input
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>

      <button
        onClick={handleCreateGym}
        style={{
          padding: "10px 20px",
          marginBottom: 30,
          cursor: "pointer",
        }}
      >
        Create Gym
      </button>

      <h2>Registered Gyms</h2>

      {gyms.map((gym) => (
        <div
          key={gym._id}
          style={{
            border: "1px solid #666",
            borderRadius: 8,
            padding: 20,
            marginBottom: 15,
          }}
        >
          <h3>{gym.name}</h3>

          <p>Email: {gym.email}</p>
          <p>Phone: {gym.phone}</p>
          <p>Address: {gym.address}</p>
          <p>Status: {gym.status}</p>
        </div>
      ))}
    </div>
  );
}
