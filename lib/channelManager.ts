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

export async function createBookingInChannelManager(
  payload: CreateBookingPayload
): Promise<{ confirmationCode: string }> {
  // TODO: Replace with SmartOrder booking API call.
  // Example:
  // const res = await fetch("https://api.smartorder.example/bookings", { ... });
  // if (!res.ok) throw new Error("Failed to create booking");
  // const data = await res.json();
  // return { confirmationCode: data.code };
  await new Promise((resolve) => setTimeout(resolve, 300));
  return { confirmationCode: "CS" + Math.random().toString(36).slice(2, 7).toUpperCase() };
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

