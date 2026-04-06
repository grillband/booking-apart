"use client";

import { CheckInForm } from "@/components/CheckInForm";

export default function CheckInPage() {
  return (
    <div className="container-page py-12 sm:py-20 flex flex-col items-start">
      <div className="max-w-xl">
        <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent mb-2">
          Arrival
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-white">
          Complete your online check-in
        </h1>
        <p className="mt-2 text-sm sm:text-base text-white/40">
          Skip the paperwork on arrival. Use your confirmation code to check in
          and receive your door access details securely.
        </p>
      </div>
      <CheckInForm />
    </div>
  );
}

