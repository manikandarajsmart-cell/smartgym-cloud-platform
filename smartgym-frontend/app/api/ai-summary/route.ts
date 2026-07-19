import { NextResponse } from "next/server";
import { getDashboardStats } from "@/services/dashboard";

export async function GET() {
  try {
    const data = await getDashboardStats();

    return NextResponse.json(data);
  } catch (error) {
    console.error("AI Summary API Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to load AI summary",
      },
      { status: 500 }
    );
  }
}
