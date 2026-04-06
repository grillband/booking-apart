import React, { useState } from "react";

export function CheckInForm() {
  const [reservationId, setReservationId] = useState("");
  const [lastName, setLastName] = useState("");
  const [status, setStatus] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus(null);
    try {
      const res = await fetch("/api/check-in", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reservationId, lastName })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to complete online check-in.");
      }
      const lines = [
        `Welcome ${data.guestName}!`,
        `Room: ${data.roomName}`,
        `Check-in: ${data.checkIn}  ·  Check-out: ${data.checkOut}`,
        `Status: ${data.status}`,
        `Door code: ${data.doorCode || "will be sent by email"}`,
      ];
      setStatus(lines.join("\n"));
      setReservationId("");
      setLastName("");
    } catch (error: any) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = "glass-input";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 glass rounded-2xl p-5 sm:p-7 max-w-lg w-full"
    >
      <h2 className="text-base sm:text-lg font-semibold text-gray-800">
        Online check-in
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-gray-500">
        Use your reservation ID to check in before arrival.
      </p>
      <div className="mt-5 space-y-4 text-sm">
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Reservation ID
          </label>
          <input
            type="text"
            value={reservationId}
            onChange={(e) => setReservationId(e.target.value)}
            className={inputClass}
            placeholder="e.g. RES-12345"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-gray-500 mb-1.5">
            Last name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className={inputClass}
            required
          />
        </div>
        {status && (
          <p className="text-xs sm:text-sm text-accent mt-1 whitespace-pre-line">
            {status}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full glass-btn px-4 py-3 text-sm mt-1"
        >
          {isSubmitting ? "Checking in…" : "Check in now"}
        </button>
      </div>
    </form>
  );
}

