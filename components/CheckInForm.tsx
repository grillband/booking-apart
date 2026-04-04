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

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-6 bg-white rounded-2xl shadow-sm border border-slate-100 p-4 sm:p-6 max-w-lg w-full"
    >
      <h2 className="text-base sm:text-lg font-semibold text-slate-900">
        Online check-in
      </h2>
      <p className="mt-1 text-xs sm:text-sm text-slate-600">
        Use your booking confirmation code to check in before arrival.
      </p>
      <div className="mt-4 space-y-3 text-sm">
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Confirmation code
          </label>
          <input
            type="text"
            value={code}
            onChange={(e) => setCode(e.target.value.toUpperCase())}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-soft focus:border-primary tracking-[0.2em] uppercase"
            placeholder="e.g. CS7F92"
            required
          />
        </div>
        <div>
          <label className="block text-xs font-medium text-slate-700 mb-1">
            Last name
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-soft focus:border-primary"
            required
          />
        </div>
        {status && (
          <p className="text-xs sm:text-sm text-primary mt-1 whitespace-pre-line">
            {status}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full inline-flex justify-center items-center rounded-lg bg-primary px-4 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-emerald-800 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary transition-colors mt-1"
        >
          {isSubmitting ? "Checking in..." : "Check in now"}
        </button>
      </div>
    </form>
  );
}

