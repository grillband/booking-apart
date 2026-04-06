import { NextRequest, NextResponse } from "next/server";
import { fetchRoomsFromChannelManager } from "@/lib/channelManager";
import { convertFromIDR } from "@/lib/currency";
import { isValidCurrency } from "@/lib/validators";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const rooms = await fetchRoomsFromChannelManager();
    const targetCurrency = new URL(request.url).searchParams.get("currency");

    if (targetCurrency && !isValidCurrency(targetCurrency)) {
      return NextResponse.json({ error: "Unsupported currency." }, { status: 400 });
    }

    if (targetCurrency && targetCurrency !== "IDR") {
      const converted = await Promise.all(
        rooms.map(async (room) => ({
          ...room,
          pricePerNight:
            Math.round(
              (await convertFromIDR(room.pricePerNight, targetCurrency)) * 100
            ) / 100,
          currency: targetCurrency,
        }))
      );
      return NextResponse.json({ rooms: converted });
    }

    return NextResponse.json({ rooms });
  } catch (error: any) {
    console.error("[ROOMS_ERROR]", error?.message);
    return NextResponse.json(
      { error: "Failed to load rooms. Please try again later." },
      { status: 500 }
    );
  }
}

