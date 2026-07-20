"use client";

import { useState } from "react";
import { storage } from "../../lib/firebase";
import {
  ref,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

export default function MembersPage() {

const [name, setName] = useState("");
const [phone, setPhone] = useState("");
const [plan, setPlan] = useState("");
const [fee, setFee] = useState("");
const [photo, setPhoto] = useState("");
const [paymentStatus, setPaymentStatus] = useState("Paid");
const [uploading, setUploading] = useState(false);

const handlePhotoUpload = async (
  e: React.ChangeEvent<HTMLInputElement>
) => {
  const file = e.target.files?.[0];

  if (!file) return;

  try {
    setUploading(true);

    const storageRef = ref(
      storage,
      `members/${Date.now()}-${file.name}`
    );

    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    setPhoto(downloadURL);

    alert("✅ Photo Uploaded");

  } catch (error: any) {
  console.log("FIREBASE ERROR:", error);
  alert("❌ Upload Failed: " + error.message);
}
 finally {
    setUploading(false);
  }
};

  const handleAddMember = async () => {
    try {
  const gymId = localStorage.getItem("gymId");
      const response = await fetch(
        "https://smartgym.cloud/api/members",

      {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },

  body: JSON.stringify({
  gymId,
  name,
  phone,
  plan,
  fee,
  photo,
  paymentStatus,
}),

}
);
        const data = await response.json();

      if (response.ok) {
        alert("Member Added");

setName("");
setPhone("");
setPlan("");
setFee("");
setPhoto("");

      } else {
        alert(data.message || "Failed");
      }
    } catch (error) {
      console.log(error);
      alert("Server Error");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#000",
        padding: "40px",
        color: "#fff",
      }}
    >
      <h1 style={{ fontSize: "40px", marginBottom: "30px" }}>
        Add Member
      </h1>

      <input
        type="text"
        placeholder="Member Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          marginBottom: "20px",
          background: "#111",
          border: "1px solid #333",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "18px",
        }}
      />

      <br />

<input
  type="text"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    marginBottom: "20px",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "18px",
  }}
/>

<br />

  <input
  type="file"
  accept="image/*"
  onChange={handlePhotoUpload}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    marginBottom: "20px",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "18px",
  }}
/>

{uploading && (
  <p style={{ color: "#00e676" }}>
    Uploading photo...
  </p>
)}

{photo && (
  <img
    src={photo}
    alt="Preview"
    style={{
      width: "120px",
      height: "120px",
      borderRadius: "50%",
      objectFit: "cover",
      marginBottom: "20px",
      border: "3px solid #00e676",
    }}
  />
)}

<select
  value={paymentStatus}
  onChange={(e) => setPaymentStatus(e.target.value)}
  style={{
    width: "100%",
    maxWidth: "500px",
    padding: "20px",
    marginBottom: "20px",
    background: "#111",
    border: "1px solid #333",
    borderRadius: "10px",
    color: "#fff",
    fontSize: "18px",
  }}
>
  <option value="Paid">🟢 Paid</option>
  <option value="Pending">🔴 Pending</option>
</select>

<br />
<br /> 
      <input
        type="text"
        placeholder="Plan"
        value={plan}
        onChange={(e) => setPlan(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          marginBottom: "20px",
          background: "#111",
          border: "1px solid #333",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "18px",
        }}
      />

      <br />

      <input
        type="number"
        placeholder="Fee"
        value={fee}
        onChange={(e) => setFee(e.target.value)}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "20px",
          marginBottom: "20px",
          background: "#111",
          border: "1px solid #333",
          borderRadius: "10px",
          color: "#fff",
          fontSize: "18px",
        }}
      />

      <br />

      <button
        onClick={handleAddMember}
        style={{
          background: "green",
          color: "#fff",
          padding: "20px 40px",
          border: "none",
          borderRadius: "10px",
          fontSize: "20px",
          cursor: "pointer",
        }}
      >
        Add Member
      </button>
    </div>
  );
}
