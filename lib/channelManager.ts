// Abstraction layer for integrating with SmartOrder (or any) channel manager.
// Replace mock implementations with real HTTP calls to SmartOrder's API.

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
}

export interface CreateBookingPayload {
  roomId: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  name: string;
  email: string;
  totalPrice?: number;
}

const MOCK_ROOMS: ChannelRoom[] = [
  {
    id: "studio-city",
    name: "Bright Studio – City View",
    description:
      "Elegant studio with kitchenette, balcony and skyline views. Perfect for business stays and city breaks.",
    maxGuests: 2,
    pricePerNight: 120,
    currency: "USD",
    imageUrl:
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1571450/pexels-photo-1571450.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/1454806/pexels-photo-1454806.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    nextAvailableDate: "2026-03-18",
    availableNights: 5
  },
  {
    id: "family-suite",
    name: "Family Suite – 2 Bedroom",
    description:
      "Spacious two-bedroom apartment with full kitchen, ideal for families and longer stays.",
    maxGuests: 4,
    pricePerNight: 180,
    currency: "USD",
    imageUrl:
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
    gallery: [
      "https://images.pexels.com/photos/164595/pexels-photo-164595.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/276671/pexels-photo-276671.jpeg?auto=compress&cs=tinysrgb&w=1200",
      "https://images.pexels.com/photos/271639/pexels-photo-271639.jpeg?auto=compress&cs=tinysrgb&w=1200"
    ],
    nextAvailableDate: "2026-03-19",
    availableNights: 3
  }
];

export async function fetchRoomsFromChannelManager(): Promise<ChannelRoom[]> {
  // TODO: Replace this with SmartOrder API integration.
  // Example outline:
  // const apiKey = process.env.SMARTORDER_API_KEY;
  // const propertyId = process.env.SMARTORDER_PROPERTY_ID;
  // const res = await fetch(`https://api.smartorder.example/properties/${propertyId}/rooms`, {
  //   headers: { Authorization: `Bearer ${apiKey}` }
  // });
  // if (!res.ok) throw new Error("Failed to fetch rooms from channel manager");
  // return res.json();
  await new Promise((resolve) => setTimeout(resolve, 200));
  return MOCK_ROOMS;
}

export async function getRoomPricing(roomId: string, checkIn: string, checkOut: string): Promise<{ pricePerNight: number; totalPrice: number; currency: string }> {
  // TODO: Replace with SmartOrder pricing API call.
  // Example:
  // const res = await fetch(`https://api.smartorder.example/rooms/${roomId}/pricing?checkIn=${checkIn}&checkOut=${checkOut}`);
  // if (!res.ok) throw new Error("Failed to fetch pricing");
  // return res.json();

  // Simulate dynamic pricing based on dates
  const room = MOCK_ROOMS.find(r => r.id === roomId);
  if (!room) throw new Error("Room not found");

  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  const nights = Math.ceil((checkOutDate.getTime() - checkInDate.getTime()) / (1000 * 60 * 60 * 24));

  // Dynamic pricing logic: weekends are 20% more expensive, peak season (summer) 15% more
  let basePrice = room.pricePerNight;
  const dayOfWeek = checkInDate.getDay();
  if (dayOfWeek === 0 || dayOfWeek === 6) { // Weekend
    basePrice *= 1.2;
  }
  const month = checkInDate.getMonth();
  if (month >= 5 && month <= 8) { // Summer months
    basePrice *= 1.15;
  }

  // Add some randomness for demand-based pricing
  const demandMultiplier = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
  basePrice *= demandMultiplier;

  const totalPrice = Math.round(basePrice * nights);

  await new Promise((resolve) => setTimeout(resolve, 150)); // Simulate API delay

  return {
    pricePerNight: Math.round(basePrice),
    totalPrice,
    currency: room.currency
  };
}

export async function createBookingInChannelManager(
  payload: CreateBookingPayload
): Promise<{ confirmationCode: string; totalPrice: number }> {
  // TODO: Replace with SmartOrder booking API call.
  // Example:
  // const res = await fetch("https://api.smartorder.example/bookings", { ... });
  // if (!res.ok) throw new Error("Failed to create booking");
  // const data = await res.json();
  // return { confirmationCode: data.code, totalPrice: data.totalPrice };

  // Get dynamic pricing from channel manager
  const pricing = await getRoomPricing(payload.roomId, payload.checkIn, payload.checkOut);

  // If totalPrice is provided, validate it matches
  if (payload.totalPrice !== undefined && payload.totalPrice !== pricing.totalPrice) {
    throw new Error("Price mismatch - please refresh and try again");
  }

  await new Promise((resolve) => setTimeout(resolve, 300));
  return { confirmationCode: "CS" + Math.random().toString(36).slice(2, 7).toUpperCase(), totalPrice: pricing.totalPrice };
}

export async function completeOnlineCheckIn(
  confirmationCode: string,
  lastName: string
): Promise<{
  guestName: string;
  roomName: string;
  doorCode?: string;
}> {
  // TODO: Replace with SmartOrder check-in endpoint (if available) or PMS.
  await new Promise((resolve) => setTimeout(resolve, 250));

  if (!confirmationCode || !lastName) {
    throw new Error("Invalid confirmation details.");
  }

  return {
    guestName: `${lastName.trim()} Family`,
    roomName: "Bright Studio – City View",
    doorCode: "4729"
  };
}

