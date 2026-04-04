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

  const minCheckIn = today;
  const minCheckOut = checkIn ? addDays(checkIn, 1) : addDays(today, 1);

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
          email,
          name
        })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to complete booking.");
      }
      setMessage(
        `Booking confirmed. Your confirmation code is ${data.confirmationCode}.`
      );
      setCheckIn("");
      setCheckOut("");
      setGuests(1);
      setEmail("");
      setName("");
    } catch (error: any) {
      setMessage(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section className="bg-slate-900/80 backdrop-blur rounded-2xl shadow-[0_18px_40px_rgba(0,0,0,0.6)] border border-white/10 p-4 sm:p-6">
      <h2 className="text-base sm:text-lg font-semibold text-slate-50">
        Book your stay
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-slate-300">
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
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
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
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
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
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
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
              className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
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
              className="mt-1 inline-flex items-center gap-1 text-[11px] text-brand-200 hover:text-brand-100 disabled:text-slate-600 disabled:cursor-not-allowed"
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
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
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
            className="w-full rounded-lg border border-white/10 bg-slate-900/60 px-3 py-2 text-sm text-slate-50 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary"
            required
          />
        </div>
        {message && (
          <p className="text-xs sm:text-sm text-emerald-300 mt-1">{message}</p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-md shadow-emerald-500/40 hover:bg-emerald-500 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-slate-950 transition-colors mt-2"
        >
          {isSubmitting ? "Processing..." : "Confirm booking"}
        </button>
      </form>
    </section>
  );
}

