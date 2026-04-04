import { NextResponse } from "next/server";
import { completeOnlineCheckIn } from "@/lib/channelManager";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      confirmationCode?: string;
      lastName?: string;
    };

    if (!body.confirmationCode || !body.lastName) {
      return NextResponse.json(
        { error: "Confirmation code and last name are required." },
        { status: 400 }
      );
    }

    const result = await completeOnlineCheckIn(
      body.confirmationCode,
      body.lastName
    );

    return NextResponse.json(result);
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Unable to complete online check-in." },
      { status: 500 }
    );
  }
}

