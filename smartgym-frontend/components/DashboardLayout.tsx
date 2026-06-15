"use client";

import Sidebar from "./Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-black text-white flex">

      {/* SIDEBAR */}
      <div className="fixed left-0 top-0 h-screen w-[260px] bg-black border-r border-gray-800 z-50">
        <Sidebar />
      </div>

      {/* MAIN CONTENT */}
      <main className="ml-[260px] w-full p-10 overflow-x-hidden">
        {children}
      </main>

    </div>
  );
}
