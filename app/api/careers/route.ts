import { NextResponse } from "next/server";
import { auth } from "@/app/lib/auth";
import { headers } from "next/headers";

const SERVER_URL = process.env.SERVER_URL || "http://localhost:5000";

export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const res = await fetch(`${SERVER_URL}/api/careers`, {
      headers: { "x-user-id": session.user.id },
      cache: "no-store",
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("GET /api/careers error: Express server returned non-JSON response:", text.substring(0, 200));
      return NextResponse.json({ error: "Backend server returned an invalid response" }, { status: 502 });
    }
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("GET /api/careers error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    const res = await fetch(`${SERVER_URL}/api/careers`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-user-id": session.user.id,
      },
      body: JSON.stringify(body),
    });

    const text = await res.text();
    let data;
    try {
      data = JSON.parse(text);
    } catch {
      console.error("POST /api/careers error: Express server returned non-JSON response:", text.substring(0, 200));
      return NextResponse.json({ error: "Backend server returned an invalid response" }, { status: 502 });
    }
    return NextResponse.json(data, { status: res.status });
  } catch (error) {
    console.error("POST /api/careers error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
