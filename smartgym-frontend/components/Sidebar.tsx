"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-64 h-screen bg-black border-r border-gray-800 p-5 fixed">
      <h1 className="text-2xl font-bold mb-10 text-green-400">
        Smart Gym
      </h1>

      <div className="flex flex-col gap-4">
        <Link
          href="/dashboard"
          className="text-white hover:text-green-400"
        >
          Dashboard
        </Link>

        <Link
          href="/members"
          className="text-white hover:text-green-400"
        >
          Add Member
        </Link>

        <Link
          href="/member-list"
          className="text-white hover:text-green-400"
        >
          Members List
        </Link>

        <Link
          href="/trainers"
          className="text-white hover:text-green-400"
        >
          Trainers
        </Link>

        <Link
          href="/payments"
          className="text-white hover:text-green-400"
        >
          Payments
        </Link>
      </div>
    </div>
  );
}
