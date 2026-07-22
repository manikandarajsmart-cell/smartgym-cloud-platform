"use client";

import { useEffect, useState } from "react";
import Sidebar from "../../components/Sidebar";
import RoleGuard from "@/components/auth/RoleGuard";

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState("");
  const [search, setSearch] = useState("");

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [role, setRole] = useState("Trainer");

  useEffect(() => {
    fetchUsers();
  }, []);

const fetchUsers = async () => {
  try {
    const res = await fetch("/api/users");
    const data = await res.json();

    console.log("Users API:", data);

    setUsers(data);
  } catch (err) {
    console.error(err);
  }
};

const filteredUsers = users.filter((user: any) =>
  user.name.toLowerCase().includes(search.toLowerCase()) ||
  user.email.toLowerCase().includes(search.toLowerCase())
);

const totalUsers = users.length;

const totalAdmins = users.filter(
  (u: any) => u.role === "Admin" || u.role === "Super Admin"
).length;

const totalTrainers = users.filter(
  (u: any) => u.role === "Trainer"
).length;

const totalReception = users.filter(
  (u: any) => u.role === "Reception"
).length;

const deleteUser = async (id: string) => {
  if (!confirm("Delete this user?")) return;

  try {
    const res = await fetch("/api/users", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    });

    const data = await res.json();

    if (data.success) {
      alert("User deleted successfully!");
      fetchUsers();
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};
const updateUser = async () => {
  try {
    const res = await fetch("/api/users", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id: editingId,
        name,
        email,
        password,
        role,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("User updated successfully!");

    setEditingId("");
    setShowModal(false);

    setName("");
    setEmail("");
    setPassword("");
    setRole("Trainer");

    fetchUsers();
  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};

const editUser = (user: any) => {
  setEditingId(user._id);

  setName(user.name);
  setEmail(user.email);
  setRole(user.role);
  setPassword("");

  setShowModal(true);
};

const createUser = async () => {
  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        role,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    alert("User created successfully!");

    setShowModal(false);

    setName("");
    setEmail("");
    setPassword("");
    setRole("Trainer");

    fetchUsers();

  } catch (err) {
    console.error(err);
    alert("Server Error");
  }
};

return (
  <RoleGuard allowedRoles={["Admin"]}>
    <>

      <Sidebar />

      <main className="ml-64 p-8 bg-black min-h-screen text-white">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold">
            👥 User Management
          </h1>

      <button
  onClick={() => setShowModal(true)}
  className="bg-green-600 hover:bg-green-700 px-5 py-3 rounded-xl font-semibold"
>
            + Add User
          </button>
        </div>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">

  <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
    <p className="text-gray-400 text-sm">👥 Total Users</p>
    <h2 className="text-3xl font-bold mt-2">{totalUsers}</h2>
  </div>

  <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
    <p className="text-gray-400 text-sm">👑 Admins</p>
    <h2 className="text-3xl font-bold mt-2 text-blue-400">
      {totalAdmins}
    </h2>
  </div>

  <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
    <p className="text-gray-400 text-sm">🏋 Trainers</p>
    <h2 className="text-3xl font-bold mt-2 text-green-400">
      {totalTrainers}
    </h2>
  </div>

  <div className="bg-zinc-900 rounded-xl p-5 border border-zinc-800">
    <p className="text-gray-400 text-sm">🧑‍💼 Reception</p>
    <h2 className="text-3xl font-bold mt-2 text-orange-400">
      {totalReception}
    </h2>
  </div>

</div>

<div className="mb-6">
  <input
    type="text"
    placeholder="🔍 Search by name or email..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full p-3 rounded-xl bg-zinc-900 border border-zinc-700 text-white"
  />
</div>

        <div className="bg-zinc-900 rounded-xl overflow-hidden">
          <table className="w-full">

        <thead className="bg-zinc-800">
  <tr>
    <th className="text-left p-4">Name</th>
    <th className="text-left p-4">Email</th>
    <th className="text-left p-4">Role</th>
    <th className="text-left p-4">Status</th>
    <th className="text-left p-4">Actions</th>
  </tr>
</thead>
 
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan={5}  className="p-4 text-center">
                    No Users Found
                  </td>
                </tr>
              ) : (

              filteredUsers.map((user: any) => (

                  <tr
                    key={user._id}
                    className="border-b border-zinc-800"
                  >
                    <td className="p-4">{user.name}</td>
                    <td className="p-4">{user.email}</td>
                    <td className="p-4">{user.role}</td>


      <td className="p-4">
  {user.active ? "🟢 Active" : "🔴 Inactive"}
</td>

<td className="p-4">
  <button
    className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2"
  >

<button
  onClick={() => editUser(user)}
  className="bg-blue-600 hover:bg-blue-700 px-3 py-1 rounded mr-2"
>
  Edit
</button>
  </button>

  <button
    onClick={() => deleteUser(user._id)}
    className="bg-red-600 hover:bg-red-700 px-3 py-1 rounded"
  >
    Delete
  </button>
</td>
</tr>
   
                ))
              )}
            </tbody>
          </table>
        </div>

         </main>

      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-zinc-900 rounded-xl p-8 w-full max-w-md">

            <h2 className="text-2xl font-bold mb-6">
              Add New User
            </h2>

            <input
              className="w-full p-3 rounded bg-zinc-800 mb-4"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className="w-full p-3 rounded bg-zinc-800 mb-4"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full p-3 rounded bg-zinc-800 mb-4"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <select
              className="w-full p-3 rounded bg-zinc-800 mb-6"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option>Trainer</option>
              <option>Reception</option>
              <option>Admin</option>
              <option>Super Admin</option>
            </select>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-5 py-2 bg-gray-600 rounded"
              >
                Cancel
              </button>

<button
  onClick={editingId ? updateUser : createUser}
  className="px-5 py-2 bg-green-600 rounded"
>
  {editingId ? "Update User" : "Create User"}
</button>

            </div>

          </div>
        </div>
      )}

    </>
  </RoleGuard>
  );
}
