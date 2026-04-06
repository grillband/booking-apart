// Abstraction layer for Smart Order Booking API v3 integration.
// Set CHANNEL_MANAGER_API_KEY, CHANNEL_MANAGER_API_URL, and
// CHANNEL_MANAGER_PROPERTY_ID (hotelId) in your .env.local to connect.
// When these env vars are missing the app falls back to built-in mock data.

export interface ChannelRoom {
  id: string;
  name: string;
  description: string;
  maxGuests: number;
  pricePerNight: number;
  currency: string;
  imageUrl?: string;
  gallery?: string[];
  nextAvailableDate: string;
  availableNights: number;
  rateId?: string;
}

export interface CreateBookingPayload {
  roomId: string;
  rateId?: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  totalPrice?: number;
  currencyCode?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────
const API_KEY = () => process.env.CHANNEL_MANAGER_API_KEY ?? "";
const API_URL = () => process.env.CHANNEL_MANAGER_API_URL ?? "";
const HOTEL_ID = () => process.env.CHANNEL_MANAGER_PROPERTY_ID ?? "";

function isLive(): boolean {
  return !!(API_KEY() && API_URL() && HOTEL_ID());
}

async function cmFetch(path: string, init?: RequestInit): Promise<Response> {
  const url = `${API_URL()}${path}`;
  const res = await fetch(url, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY(),
      ...init?.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text().catch(() => "");
    throw new Error(
      `Channel manager API error ${res.status}: ${text || res.statusText}`
    );
  }
  return res;
}

// ─── Mock data (used when no API key is configured) ─────────────────────────
const MOCK_ROOMS: ChannelRoom[] = [
  {
    id: "studio-city",
    name: "Bright Studio – City View",
    description:
      "Elegant studio with kitchenette, balcony and skyline views. Perfect for business stays and city breaks.",
    maxGuests: 2,
    pricePerNight: 1_850_000,
    currency: "IDR",
    imageUrl:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    nextAvailableDate: "2026-03-18",
    availableNights: 5,
    rateId: "rate-studio-standard",
  },
  {
    id: "family-suite",
    name: "Family Suite – 2 Bedroom",
    description:
      "Spacious two-bedroom apartment with full kitchen, ideal for families and longer stays.",
    maxGuests: 4,
    pricePerNight: 2_750_000,
    currency: "IDR",
    imageUrl:
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200",
    ],
    nextAvailableDate: "2026-03-19",
    availableNights: 3,
    rateId: "rate-family-standard",
  },
];

// ─── Public API ─────────────────────────────────────────────────────────────

/**
 * Fetch rooms from CMS + products endpoints, merging room info with rate info.
 * CMS: GET /cms/api/v3/hotels/{hotelId}/rooms
 * CMS: GET /cms/api/v3/hotels/{hotelId}/products
 */
export async function fetchRoomsFromChannelManager(): Promise<ChannelRoom[]> {
  if (isLive()) {
    const hotelId = encodeURIComponent(HOTEL_ID());

    // Fetch rooms and products in parallel
    const [roomsRes, productsRes] = await Promise.all([
      cmFetch(`/cms/api/v3/hotels/${hotelId}/rooms?language=en_US`),
      cmFetch(`/cms/api/v3/hotels/${hotelId}/products?language=en_US`),
    ]);

    const roomsData = await roomsRes.json();
    const productsData = await productsRes.json();

    const rooms: any[] = roomsData?.data?.list ?? roomsData?.data ?? [];
    const products: any[] = productsData?.data?.list ?? [];

    // Build a map of roomId -> first rateId
    const rateMap = new Map<string, string>();
    for (const p of products) {
      if (p.roomId && !rateMap.has(p.roomId)) {
        rateMap.set(p.roomId, p.rateId);
      }
    }

    return rooms.map((r: any) => ({
      id: r.roomId,
      name: r.roomName ?? r.name ?? "Room",
      description: r.roomDescription ?? r.description ?? "",
      maxGuests: r.maxOccupancy ?? 2,
      pricePerNight: 0, // Will be populated via availability check
      currency: "IDR",
      imageUrl: r.images?.[0] ?? undefined,
      gallery: r.images ?? [],
      nextAvailableDate: new Date().toISOString().split("T")[0],
      availableNights: 0,
      rateId: rateMap.get(r.roomId) ?? "",
    }));
  }

  // Mock fallback
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_ROOMS;
}

/**
 * Check availability and pricing via Smart Order Booking API.
 * GET /booking/api/v3/avail/{hotelId}?checkIn=...&checkOut=...&adultCount=...&roomId=...
 */
export async function getRoomPricing(
  roomId: string,
  checkIn: string,
  checkOut: string,
  adultCount: number = 1
): Promise<{ pricePerNight: number; totalPrice: number; currency: string; rateId: string }> {
  if (isLive()) {
    const hotelId = encodeURIComponent(HOTEL_ID());
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      adultCount: String(adultCount),
      roomId,
    });
    const res = await cmFetch(`/booking/api/v3/avail/${hotelId}?${params}`);
    const data = await res.json();

    const roomRates: any[] = data?.data?.roomRates ?? [];
    // Find the rate matching the requested room
    const rate = roomRates.find((r: any) => r.roomId === roomId) ?? roomRates[0];

    if (!rate) {
      throw new Error("No availability found for the selected room and dates.");
    }

    return {
      pricePerNight: rate.averageDailyAmount ?? rate.totalAmount / (rate.nights || 1),
      totalPrice: rate.totalAmount,
      currency: rate.currencyCode ?? "IDR",
      rateId: rate.rateId,
    };
  }

  // Mock dynamic pricing
  const room = MOCK_ROOMS.find((r) => r.id === roomId);
  if (!room) throw new Error("Room not found");

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil(
    (checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24)
  );

  let basePrice = room.pricePerNight;
  const dayOfWeek = checkInDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) basePrice *= 1.2;
  const month = checkInDate.getMonth();
  if (month >= 5 && month <= 8) basePrice *= 1.15;
  const demandMultiplier = 0.9 + Math.random() * 0.2;
  basePrice *= demandMultiplier;

  const totalPrice = Math.round(basePrice * nights);
  await new Promise((resolve) => setTimeout(resolve, 150));

  return {
    pricePerNight: Math.round(basePrice),
    totalPrice,
    currency: room.currency,
    rateId: room.rateId ?? "",
  };
}

/**
 * Create a reservation via Smart Order Booking API.
 * POST /booking/api/v3/hotels/{hotelId}/reservations/book
 */
export async function createBookingInChannelManager(
  payload: CreateBookingPayload
): Promise<{ confirmationCode: string; totalPrice: number }> {
  if (isLive()) {
    const hotelId = HOTEL_ID();

    // If no rateId provided, look it up via availability
    let rateId = payload.rateId;
    let totalAmount = payload.totalPrice ?? 0;
    let currencyCode = payload.currencyCode ?? "IDR";

    if (!rateId || !totalAmount) {
      const pricing = await getRoomPricing(
        payload.roomId,
        payload.checkIn,
        payload.checkOut,
        payload.guests
      );
      rateId = rateId || pricing.rateId;
      totalAmount = totalAmount || pricing.totalPrice;
      currencyCode = pricing.currency;
    }

    const nights = Math.ceil(
      (new Date(payload.checkOut).getTime() - new Date(payload.checkIn).getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const body = {
      hotelId,
      checkIn: payload.checkIn,
      checkOut: payload.checkOut,
      adultCount: payload.guests,
      childCount: 0,
      roomCount: 1,
      roomId: payload.roomId,
      rateId,
      customer: {
        firstName: payload.firstName,
        lastName: payload.lastName,
        phone: payload.phone ?? "",
        email: payload.email,
      },
      paymentType: "Prepay",
      totalAmount,
      currencyCode,
    };

    const res = await cmFetch(
      `/booking/api/v3/hotels/${encodeURIComponent(hotelId)}/reservations/book`,
      { method: "POST", body: JSON.stringify(body) }
    );
    const data = await res.json();

    if (data.code !== "1") {
      throw new Error(data.msg || data.errorDetail || "Reservation failed");
    }

    const reservation = data.data;
    return {
      confirmationCode: reservation?.reservationId ?? data.tid,
      totalPrice: reservation?.totalAmount ?? totalAmount,
    };
  }

  // Mock fallback
  const pricing = await getRoomPricing(
    payload.roomId,
    payload.checkIn,
    payload.checkOut
  );

  if (
    payload.totalPrice !== undefined &&
    payload.totalPrice !== pricing.totalPrice
  ) {
    throw new Error("Price mismatch - please refresh and try again");
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  return {
    confirmationCode:
      "CS" + Math.random().toString(36).slice(2, 7).toUpperCase(),
    totalPrice: pricing.totalPrice,
  };
}

/**
 * Online check-in: look up reservation by reservationId, verify lastName.
 * GET /booking/api/v3/hotels/{hotelId}/reservations/{resId}
 */
export async function completeOnlineCheckIn(
  reservationId: string,
  lastName: string
): Promise<{
  guestName: string;
  roomName: string;
  checkIn: string;
  checkOut: string;
  status: string;
  doorCode?: string;
}> {
  if (isLive()) {
    const hotelId = encodeURIComponent(HOTEL_ID());
    const resId = encodeURIComponent(reservationId);

    const res = await cmFetch(
      `/booking/api/v3/hotels/${hotelId}/reservations/${resId}`
    );
    const data = await res.json();

    if (data.code !== "1") {
      throw new Error(data.msg || "Reservation not found.");
    }

    const reservation = data.data;
    if (!reservation) {
      throw new Error("Reservation not found.");
    }

    // Verify last name matches
    const customerLastName = (reservation.customer?.lastName ?? "").toLowerCase().trim();
    if (customerLastName !== lastName.toLowerCase().trim()) {
      throw new Error("Last name does not match the reservation.");
    }

    if (reservation.status === "Cancelled") {
      throw new Error("This reservation has been cancelled.");
    }

    // Get room name from roomStays
    const roomName =
      reservation.roomStays?.[0]?.roomId ?? "Your room";

    return {
      guestName: `${reservation.customer.firstName} ${reservation.customer.lastName}`,
      roomName,
      checkIn: reservation.checkIn,
      checkOut: reservation.checkOut,
      status: reservation.status,
    };
  }

  // Mock fallback
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (!reservationId || !lastName) {
    throw new Error("Invalid reservation details.");
  }

  return {
    guestName: `${lastName.trim()} Family`,
    roomName: "Bright Studio – City View",
    checkIn: "2026-04-10",
    checkOut: "2026-04-15",
    status: "Confirmed",
    doorCode: "4729",
  };
}

