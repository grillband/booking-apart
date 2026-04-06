import React, { useState } from "react";

export function CheckInForm() {
  const [code, setCode] = useState("");
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
        body: JSON.stringify({ confirmationCode: code, lastName })
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Unable to complete online check-in.");
      }
      setStatus(
        `Welcome ${data.guestName}. Your room ${
          data.roomName
        } is ready. Door code: ${data.doorCode || "will be sent by email"}.`
      );
      setCode("");
      setLastName("");
    } catch (error: any) {
      setStatus(error.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-white/[0.08] bg-white/[0.04] px-3 py-2.5 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-accent/40 focus:border-accent/60 transition";

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 card-dark rounded-2xl p-5 sm:p-7 max-w-lg w-full"
    >
      <h2 className="text-base sm:text-lg font-semibold text-white">
        Online check-in
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-white/40">
        Use your booking confirmation code to check in before arrival.
      </p>
      <div className="mt-5 space-y-4 text-sm">
        <div>
          <label className="block text-xs font-medium text-white/50 mb-1.5">
            Confirmation code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className={`${inputClass} tracking-[0.2em] uppercase`}
            placeholder="e.g. CS7F92"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-white/50 mb-1.5">
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
          className="w-full inline-flex justify-center items-center rounded-xl bg-accent px-4 py-3 text-sm font-semibold text-[#0a0a0a] hover:bg-accent-light disabled:opacity-40 disabled:cursor-not-allowed transition-colors mt-1"
        >
          {isSubmitting ? "Checking in…" : "Check in now"}
        </button>
      </div>
    </form>
  );
}

