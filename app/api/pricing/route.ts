import { NextRequest, NextResponse } from "next/server";
import { getRoomPricing } from "@/lib/channelManager";
import { convertFromIDR, formatPrice } from "@/lib/currency";
import { isValidRoomId, isValidDate, isDateRangeValid, isValidCurrency } from "@/lib/validators";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const roomId = searchParams.get("roomId");
    const checkIn = searchParams.get("checkIn");
    const checkOut = searchParams.get("checkOut");
    const targetCurrency = searchParams.get("currency");

    if (!isValidRoomId(roomId)) {
      return NextResponse.json({ error: "Invalid room ID." }, { status: 400 });
    }
    if (!isValidDate(checkIn) || !isValidDate(checkOut)) {
      return NextResponse.json({ error: "Invalid date format." }, { status: 400 });
    }
    if (!isDateRangeValid(checkIn, checkOut)) {
      return NextResponse.json({ error: "Check-out must be after check-in." }, { status: 400 });
    }
    if (targetCurrency && !isValidCurrency(targetCurrency)) {
      return NextResponse.json({ error: "Unsupported currency." }, { status: 400 });
    }

    const pricing = await getRoomPricing(roomId, checkIn, checkOut);

    // Convert if a target currency is provided and differs from base
    if (targetCurrency && targetCurrency !== pricing.currency) {
      const convertedPerNight = await convertFromIDR(pricing.pricePerNight, targetCurrency);
      const convertedTotal = await convertFromIDR(pricing.totalPrice, targetCurrency);
      return NextResponse.json({
        pricePerNight: Math.round(convertedPerNight * 100) / 100,
        totalPrice: Math.round(convertedTotal * 100) / 100,
        currency: targetCurrency,
        originalCurrency: pricing.currency,
        originalTotalPrice: pricing.totalPrice,
      });
    }

    return NextResponse.json(pricing);
  } catch (error: any) {
    console.error("[PRICING_ERROR]", error?.message);
    return NextResponse.json(
      { error: "Failed to fetch pricing. Please try again later." },
      { status: 500 }
    );
  }
}