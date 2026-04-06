import { NextResponse } from "next/server";
import {
  createBookingInChannelManager,
  type CreateBookingPayload
} from "@/lib/channelManager";
import {
  isValidRoomId,
  isValidDate,
  isDateRangeValid,
  isValidGuests,
  isValidName,
  isValidEmail,
  isValidPhone,
} from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
    }

    const body = (await request.json()) as Partial<CreateBookingPayload>;

    if (!isValidRoomId(body.roomId)) {
      return NextResponse.json({ error: "Invalid room ID." }, { status: 400 });
    }
    if (!isValidDate(body.checkIn) || !isValidDate(body.checkOut)) {
      return NextResponse.json({ error: "Invalid date format." }, { status: 400 });
    }
    if (!isDateRangeValid(body.checkIn, body.checkOut)) {
      return NextResponse.json({ error: "Check-out must be after check-in." }, { status: 400 });
    }
    if (!isValidGuests(body.guests)) {
      return NextResponse.json({ error: "Invalid guest count." }, { status: 400 });
    }
    if (!isValidName(body.firstName) || !isValidName(body.lastName)) {
      return NextResponse.json({ error: "Invalid name." }, { status: 400 });
    }
    if (!isValidEmail(body.email)) {
      return NextResponse.json({ error: "Invalid email address." }, { status: 400 });
    }
    if (!isValidPhone(body.phone)) {
      return NextResponse.json({ error: "Invalid phone number." }, { status: 400 });
    }

    const booking = await createBookingInChannelManager(body as CreateBookingPayload);

    return NextResponse.json({
      confirmationCode: booking.confirmationCode,
      totalPrice: booking.totalPrice,
    });
  } catch (error: any) {
    console.error("[BOOKING_ERROR]", error?.message);
    return NextResponse.json(
      { error: "Unable to complete booking. Please try again later." },
      { status: 500 }
    );
  }
}

