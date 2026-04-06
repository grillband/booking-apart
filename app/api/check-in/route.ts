import { NextResponse } from "next/server";
import { completeOnlineCheckIn } from "@/lib/channelManager";
import { isValidReservationId, isValidName } from "@/lib/validators";

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type");
    if (!contentType?.includes("application/json")) {
      return NextResponse.json({ error: "Invalid content type." }, { status: 415 });
    }

    const body = (await request.json()) as {
      reservationId?: string;
      lastName?: string;
    };

    if (!isValidReservationId(body.reservationId)) {
      return NextResponse.json(
        { error: "Invalid reservation ID." },
        { status: 400 }
      );
    }
    if (!isValidName(body.lastName)) {
      return NextResponse.json(
        { error: "Invalid last name." },
        { status: 400 }
      );
    }

    const result = await completeOnlineCheckIn(
      body.reservationId,
      body.lastName
    );

    return NextResponse.json(result);
  } catch (error: any) {
    console.error("[CHECK_IN_ERROR]", error?.message);
    return NextResponse.json(
      { error: "Unable to complete online check-in. Please try again later." },
      { status: 500 }
    );
  }
}

