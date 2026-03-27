import { NextResponse } from "next/server";
import { getTotalTherapySessions, getTotalOrders } from "@/lib/db";

export async function GET() {
  try {
    const sessions = getTotalTherapySessions();
    const orders = getTotalOrders();
    return NextResponse.json({ sessions, orders });
  } catch (err) {
    console.error("Impact API error:", err);
    return NextResponse.json({ sessions: 0, orders: 0 });
  }
}
