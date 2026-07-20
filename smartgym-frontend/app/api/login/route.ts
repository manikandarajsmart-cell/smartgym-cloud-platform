import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const backendResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      }
    );

    const data = await backendResponse.json();

    console.log("BACKEND LOGIN RESPONSE:", JSON.stringify(data, null, 2));

    if (!backendResponse.ok || !data.success) {
      return NextResponse.json(
        {
          success: false,
          message: data.message || "Invalid credentials",
        },
        { status: backendResponse.status }
      );
    }

    // Return backend user exactly as received
    return NextResponse.json({
      success: true,
      user: data.user,
    });
  } catch (error: any) {
    console.error("LOGIN API ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Server Error",
      },
      { status: 500 }
    );
  }
}
