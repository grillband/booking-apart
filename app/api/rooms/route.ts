import { NextResponse } from "next/server";
import { fetchRoomsFromChannelManager } from "@/lib/channelManager";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const rooms = await fetchRoomsFromChannelManager();
    return NextResponse.json({ rooms });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Failed to load rooms." },
      { status: 500 }
    );
  }
}

