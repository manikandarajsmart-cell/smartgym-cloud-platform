"use client";

import Link from "next/link";

export default function Sidebar() {
  return (
    <div className="w-full h-full bg-black text-white p-6">
      <h1 className="text-2xl font-bold text-green-400 mb-8">
        Smart Gym
      </h1>

      <nav className="flex flex-col gap-4">

        <Link href="/dashboard" className="hover:text-green-400">
          Dashboard
        </Link>

        <Link href="/members" className="hover:text-green-400">
          Add Member
        </Link>

        <Link href="/member-list" className="hover:text-green-400">
          Members List
        </Link>

        <Link href="/attendance" className="hover:text-green-400">
          Attendance
        </Link>

        <Link href="/attendance-records" className="hover:text-green-400">
          Attendance Records
        </Link>

        <Link href="/payments" className="hover:text-green-400">
          Payments
        </Link>

        <Link href="/trainers" className="hover:text-green-400">
          Trainers
        </Link>

        <Link href="/diet-plans" className="hover:text-green-400">
          Diet Plans
        </Link>

        <Link href="/workout-plans" className="hover:text-green-400">
          Workout Plans
        </Link>

        <Link href="/needs-attention" className="hover:text-green-400">
          Needs Attention
        </Link>

        <Link href="/qr-generator" className="hover:text-green-400">
          QR Generator
        </Link>

        <Link href="/scan" className="hover:text-green-400">
          QR Scanner
        </Link>

      </nav>
    </div>
  );
}
