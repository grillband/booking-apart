"use client";

import { CheckInForm } from "@/components/CheckInForm";

export default function CheckInPage() {
  return (
    <div className="container-page py-8 sm:py-12 flex flex-col items-start">
      <div className="max-w-xl">
        <p className="text-xs font-semibold tracking-[0.25em] text-primary uppercase">
          Arrival
        </p>
        <h1 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-900">
          Complete your online check-in
        </h1>
        <p className="mt-2 text-sm sm:text-base text-slate-600">
          Skip the paperwork on arrival. Use your confirmation code to check in
          and receive your door access details securely.
        </p>
      </div>
      <CheckInForm />
    </div>
  );
}

