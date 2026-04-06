import React, { useMemo, useState } from "react";
import type { Room } from "./RoomCard";

interface BookingPanelProps {
  rooms: Room[];
  selectedRoomId?: string;
  onSelectRoom: (roomId: string) => void;
  onOpenGallery: (roomId: string) => void;
  userCurrency?: string;
}

export function BookingPanel({
  rooms,
  selectedRoomId,
  onSelectRoom,
  onOpenGallery,
  userCurrency = "IDR"
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
          currency: userCurrency,
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
  }, [selectedRoom, checkIn, checkOut, userCurrency]);

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

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition";

  return (
    <div className="card-dark rounded-2xl p-5 sm:p-7">
      <form onSubmit={handleSubmit} className="space-y-4 text-sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">
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
                const clamped = value < minCheckIn ? minCheckIn : value;
                setCheckIn(clamped);
                if (checkOut && checkOut <= clamped) {
                  setCheckOut(addDays(clamped, 1));
                }
              }}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">
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
                const clamped = value < minCheckOut ? minCheckOut : value;
                setCheckOut(clamped);
              }}
              className={inputClass}
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">
              Guests
            </label>
            <input
              type="number"
              min={1}
              max={selectedRoom?.maxGuests ?? 8}
              value={guests}
              onChange={(e) => setGuests(Number(e.target.value))}
              className={inputClass}
              required
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-white/50 mb-1.5">
              Property
            </label>
            <select
              value={selectedRoomId ?? ""}
              onChange={(e) => onSelectRoom(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Select a property
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
              className="mt-1.5 inline-flex items-center gap-1 text-xs text-accent hover:text-accent-light disabled:text-white/20 disabled:cursor-not-allowed transition-colors"
            >
              View photos
            </button>
          </div>
        </div>

        <div>
          <label className="block text-xs font-medium text-white/50 mb-1.5">
            Full name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-white/50 mb-1.5">
            Email
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={inputClass}
            required
          />
        </div>

        {message && (
          <p className="text-xs sm:text-sm text-accent mt-1">{message}</p>
        )}

        {pricing && (
          <div className="rounded-xl border border-white/[0.06] bg-white/[0.03] p-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-white/40">
                {pricingLoading ? "Calculating…" : "Channel manager pricing"}
              </span>
              <span className="font-semibold text-white">
                Total: {pricing.currency}{" "}
                {pricing.totalPrice.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
              </span>
            </div>
            {!pricingLoading && (
              <div className="text-xs text-white/30 mt-1">
                {pricing.currency}{" "}
                {pricing.pricePerNight.toLocaleString(undefined, {
                  maximumFractionDigits: 0,
                })}
                /night ×{" "}
                {Math.ceil(
                  (new Date(checkOut).getTime() -
                    new Date(checkIn).getTime()) /
                    (1000 * 60 * 60 * 24)
                )}{" "}
                nights
              </div>
            )}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting || !pricing || pricingLoading}
          className="w-full inline-flex justify-center items-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-[#0a0a0a] hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-1"
        >
          {isSubmitting
            ? "Processing…"
            : pricingLoading
            ? "Getting price…"
            : "Confirm booking"}
        </button>
      </form>
    </div>
  );
}

