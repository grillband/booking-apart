import React, { useMemo, useState } from "react";
import type { Room } from "./RoomCard";

interface BookingPanelProps {
  rooms: Room[];
  selectedRoomId?: string;
  onSelectRoom: (roomId: string) => void;
  onOpenGallery: (roomId: string) => void;
}

export function BookingPanel({
  rooms,
  selectedRoomId,
  onSelectRoom,
  onOpenGallery
}: BookingPanelProps) {
  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  const today = useMemo(
    () => new Date().toISOString().split("T")[0],
    []
  );

  function addDays(base: string, days: number) {
    const d = new Date(base);
    d.setDate(d.getDate() + days);
    return d.toISOString().split("T")[0];
  }

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [pricing, setPricing] = useState<{ pricePerNight: number; totalPrice: number; currency: string } | null>(null);
  const [pricingLoading, setPricingLoading] = useState(false);

  const minCheckIn = today;
  const minCheckOut = checkIn ? addDays(checkIn, 1) : addDays(today, 1);

  // Fetch dynamic pricing from API
  React.useEffect(() => {
    async function fetchPricing() {
      if (!selectedRoom || !checkIn || !checkOut) {
        setPricing(null);
        return;
      }

      setPricingLoading(true);
      try {
        const params = new URLSearchParams({
          roomId: selectedRoom.id,
          checkIn,
          checkOut,
        });
        const res = await fetch(`/api/pricing?${params}`);
        if (!res.ok) throw new Error("Failed to fetch pricing");
        const data = await res.json();
        setPricing(data);
      } catch (error) {
        console.error("Pricing fetch error:", error);
        setPricing(null);
      } finally {
        setPricingLoading(false);
      }
    }

    fetchPricing();
  }, [selectedRoom, checkIn, checkOut]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedRoom) {
      setMessage("Please select a room to book.");
      return;
    }

    setIsSubmitting(true);
    setMessage(null);
    try {
      const res = await fetch("/api/book", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: selectedRoom.id,
          checkIn,
          checkOut,
          guests,
          name,
          email,
          totalPrice: pricing?.totalPrice,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Unable to complete booking.");

      setMessage(
        `Booking confirmed for ${pricing?.currency} ${data.totalPrice}. Your confirmation code is ${data.confirmationCode}.`
      );
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
      setEmail("");
      setName("");
      setPricing(null);
    } catch (error: any) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200 p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-slate-900">
        Book your stay
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-slate-500">
        Secure online booking with instant confirmation from our channel manager.
      </p>
      <form onSubmit={handleSubmit} className="mt-4 space-y-3 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Check-in
            </label>
            <input
              type="date"
              value={checkIn}
              min={minCheckIn}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  setCheckIn("");
                  return;
                }
                const clamped =
                  value < minCheckIn ? minCheckIn : value;
                setCheckIn(clamped);
                if (checkOut && checkOut <= clamped) {
                  setCheckOut(addDays(clamped, 1));
                }
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-400"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Check-out
            </label>
            <input
              type="date"
              value={checkOut}
              min={minCheckOut}
              onChange={(e) => {
                const value = e.target.value;
                if (!value) {
                  setCheckOut("");
                  return;
                }
                const clamped =
                  value < minCheckOut ? minCheckOut : value;
                setCheckOut(clamped);
              }}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-400"
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Guests
            </label>
            <input
              type="number"
              min={1}
              max={selectedRoom?.maxGuests ?? 8}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-400"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-700 mb-1">
              Apartment
            </label>
            <select
              value={selectedRoomId ?? ""}
              onChange={(e) => onSelectRoom(e.target.value)}
              className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-400"
            >
              <option value="" disabled>
                Select an apartment
              </option>
              {rooms.map((room) => (
                <option key={room.id} value={room.id}>
                  {room.name}
                </option>
              ))}
            </select>
            <button
              type="button"
              disabled={!selectedRoomId}
              onClick={() => selectedRoomId && onOpenGallery(selectedRoomId)}
              className="mt-1 inline-flex items-center gap-1 text-[11px] text-brand-500 hover:text-brand-600 disabled:text-slate-400 disabled:cursor-not-allowed"
            >
              <span>View photos</span>
            </button>
          </div>
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-400"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-400/40 focus:border-brand-400"
            required
          />
        </div>
        {message && (
          <p className="text-xs sm:text-sm text-emerald-600 mt-1">{message}</p>
        )}
        {pricing && (
          <div className="bg-slate-50 rounded-lg p-3 border border-slate-200">
            <div className="flex justify-between items-center text-sm">
              <span className="text-slate-600">
                {pricingLoading ? "Calculating..." : `Dynamic pricing from channel manager`}
              </span>
              <span className="font-semibold text-slate-900">
                Total: {pricing.currency} {pricing.totalPrice.toFixed(0)}
              </span>
            </div>
            {!pricingLoading && (
              <div className="text-xs text-slate-500 mt-1">
                {pricing.currency} {pricing.pricePerNight.toFixed(0)}/night × {Math.ceil((new Date(checkOut).getTime() - new Date(checkIn).getTime()) / (1000 * 60 * 60 * 24))} nights
              </div>
            )}
          </div>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !pricing || pricingLoading}
          className="w-full inline-flex justify-center items-center rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-400 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400 transition-colors mt-2"
        >
          {isSubmitting ? "Processing..." : pricingLoading ? "Getting price..." : "Confirm booking"}
        </button>
      </form>
    </section>
  );
}

