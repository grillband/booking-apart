import { NextRequest, NextResponse } from "next/server";
import { getRoomPricing } from "@/lib/channelManager";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");

    if (!roomId || !checkIn || !checkOut) {
      return NextResponse.json(
        { error: "Missing required parameters: roomId, checkIn, checkOut" },
        { status: 400 }
      );
    }

    const pricing = await getRoomPricing(roomId, checkIn, checkOut);
    return NextResponse.json(pricing);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to fetch pricing." },
      { status: 500 }
    );
  }
}