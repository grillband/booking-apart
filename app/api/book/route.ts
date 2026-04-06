import { NextResponse } from "next/server";
import {
  createBookingInChannelManager,
  type CreateBookingPayload
} from "@/lib/channelManager";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Partial<CreateBookingPayload>;
    if (
      !body.roomId ||
      !body.checkIn ||
      !body.checkOut ||
      !body.guests ||
      !body.firstName ||
      !body.lastName ||
      !body.email
    ) {
      return NextResponse.json(
        { error: "Missing booking details." },
        { status: 400 }
      );
    }

    const booking = await createBookingInChannelManager(body as CreateBookingPayload);

    return NextResponse.json({
      confirmationCode: booking.confirmationCode,
      totalPrice: booking.totalPrice,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unable to complete booking." },
      { status: 500 }
    );
  }
}

