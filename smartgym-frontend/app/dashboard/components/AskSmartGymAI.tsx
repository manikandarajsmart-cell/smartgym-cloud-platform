"use client";

import { useEffect, useState } from "react";
import { Bot, Sparkles, Send, MessageCircle } from "lucide-react";

export default function AskSmartGymAI() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState(
    "👋 Hi! I'm SmartGym AI. Ask me about your gym business."
  );
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState<any>(null);
  const [renewalData, setRenewalData] = useState<any>(null);
  const [notifications, setNotifications] = useState<any[]>([]);

useEffect(() => {
  const loadStats = async () => {
    try {
      const res = await fetch("/api/ai-summary");
      const data = await res.json();
      
      setStats(data.stats ?? null);
    const renewalRes = await fetch("/api/ai/renewal-center");
const renewal = await renewalRes.json();

setRenewalData(renewal);
const notificationRes = await fetch("/api/ai/notifications");
const notificationData = await notificationRes.json();

setNotifications(notificationData.notifications ?? []);

    } catch (err) {
      console.error("Failed to load AI summary:", err);
    }
  };

  loadStats();
}, []);

  const suggestedQuestions = [
    "How many members expire this week?",
    "What is today's revenue?",
    "Show members needing attention",
    "Summarize my gym",
  ];

  const askAI = async (text: string) => {
    const q = text.trim();
    if (!q) return;

    setLoading(true);
    setQuestion(q);

    // Temporary demo responses.
    // Later we'll connect this to a backend API and live data.
    setTimeout(() => {
      let response =
        "I'm ready to help. Soon I'll answer using your live SmartGym data.";

    const lower = q.toLowerCase();

if (
  renewalData &&
  (lower.includes("expire") || lower.includes("renew"))
) {
  if (renewalData.expiringSoon.length === 0) {
    response = "✅ No members are expiring in the next 7 days.";
  } else {
    response =
      `⚠️ ${renewalData.expiringSoon.length} member(s) expire soon:\n\n` +
      renewalData.expiringSoon
        .map((m: any) => `• ${m.name} — ${m.expiryDate}`)
        .join("\n");
  }
} else if (stats) {
  if (lower.includes("revenue")) {
    response = `💰 Total revenue: ₹${stats.totalRevenue ?? 0}`;
  } else if (lower.includes("active")) {
    response = `👥 Active members: ${stats.activeMembers ?? 0}`;
  } else if (lower.includes("expired")) {
    response = `❌ Expired members: ${stats.expiredMembers ?? 0}`;
  } else if (lower.includes("attendance")) {
    response = `📅 Today's attendance: ${stats.todayAttendance ?? 0}`;
  } else if (
    lower.includes("summary") ||
    lower.includes("gym")
  ) {
    response = `📊 Gym Summary

• Total Members: ${stats.totalMembers ?? 0}
• Active Members: ${stats.activeMembers ?? 0}
• Expired Members: ${stats.expiredMembers ?? 0}
• Total Revenue: ₹${stats.totalRevenue ?? 0}
• Today's Attendance: ${stats.todayAttendance ?? 0}`;
  }
}
 
      setAnswer(response);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="rounded-2xl border bg-white shadow-sm p-6">
      <div className="flex items-center gap-3 mb-6">
        <div className="rounded-full bg-blue-100 p-3">
          <Bot className="h-6 w-6 text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold flex items-center gap-2">
            Ask SmartGym AI
            <Sparkles className="h-5 w-5 text-yellow-500" />
          </h2>

          <p className="text-sm text-gray-500">
            Your intelligent fitness business assistant
          </p>
          {notifications.length > 0 && (
  <div className="mt-4 rounded-lg border border-yellow-300 bg-yellow-50 p-3">
    <h3 className="font-semibold text-yellow-800 mb-2">
      🔔 AI Notifications
    </h3>

    <ul className="space-y-1 text-sm text-gray-700">
      {notifications.map((item, index) => (
        <li key={index}>• {item.message}</li>
      ))}
    </ul>
  </div>
)}

        </div>
      </div>

      <div className="rounded-xl bg-gray-50 p-4 min-h-[110px]">
        {loading ? (
          <p className="text-blue-600 animate-pulse">
            🤖 Thinking...
          </p>
        ) : (
          <p className="text-gray-700 whitespace-pre-wrap">
            {answer}
          </p>
        )}
      </div>

      <div className="mt-5">
        <label className="text-sm font-medium">
          Ask a question
        </label>

        <div className="flex gap-2 mt-2">
          <input
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            placeholder="Ask SmartGym AI..."
            className="flex-1 rounded-lg border px-4 py-2 text-black bg-white placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={() => askAI(question)}
            className="rounded-lg bg-blue-600 text-white px-4 py-2 hover:bg-blue-700 flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            Ask
          </button>
        </div>
      </div>

      <div className="mt-6">
        <p className="font-medium flex items-center gap-2 mb-3">
          <MessageCircle className="h-4 w-4" />
          Suggested Questions
        </p>

        <div className="flex flex-wrap gap-2">
          {suggestedQuestions.map((item) => (
            <button
              key={item}
              onClick={() => askAI(item)}
              className="rounded-full border px-3 py-2 text-sm hover:bg-blue-50"
            >
              {item}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
