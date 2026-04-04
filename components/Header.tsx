"use client";

import { useState } from "react";

export function Header() {
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showFacilitiesModal, setShowFacilitiesModal] = useState(false);

  const facilities = [
    "High-speed Wi‑Fi and dedicated workspace",
    "Fully equipped kitchen or kitchenette",
    "Self check-in with smart lock access",
    "Premium linens, toiletries and housekeeping",
    "Fast local and international streaming-ready TV",
    "Complimentary coffee, tea and welcome snacks"
  ];

  return (
    <>
      <header className="relative border-b border-white/10 backdrop-blur">
        <div className="container-page flex items-center justify-between py-4 md:py-5">
          <a href="/" className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-brand-400 to-brand-700 shadow-soft">
              <span className="text-xl font-semibold tracking-tight text-brand-50">
                C
              </span>
            </div>
            <div className="flex flex-col leading-tight">
              <span className="text-[11px] font-medium tracking-[0.22em] text-brand-200 uppercase">
                CozyStay
              </span>
              <span className="text-base font-semibold text-white">
                Apartments
              </span>
            </div>
          </a>

          <nav className="hidden md:flex items-center gap-10 text-sm font-medium text-brand-100">
            <a href="/" className="hover:text-white transition-colors">
              Suites
            </a>
            <button
              onClick={() => setShowFacilitiesModal(true)}
              className="hover:text-white transition-colors"
            >
              Facilities
            </button>
            <button
              onClick={() => setShowLocationModal(true)}
              className="hover:text-white transition-colors"
            >
              Location
            </button>
            <a href="#booking" className="hover:text-white transition-colors">
              Book
            </a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <span className="text-sm text-brand-100/90">Self check-in</span>
            <a
              href="#booking"
              className="rounded-full bg-brand-400 px-5 py-2.5 text-sm font-semibold text-brand-900 shadow-soft transition hover:bg-brand-300"
            >
              Book your stay
            </a>
          </div>
        </div>
      </header>

      {showLocationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowLocationModal(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-slate-100 text-sm hover:bg-black/80 border border-white/20"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-white mb-4">Our Location</h2>
            <div className="aspect-video w-full">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.241264875!2d-73.98731668482413!3d40.75889597932681!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1523122800000!5m2!1sen!2sus"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>
        </div>
      )}

      {showFacilitiesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setShowFacilitiesModal(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 rounded-3xl border border-white/10 bg-slate-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.85)] p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFacilitiesModal(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-slate-100 text-sm hover:bg-black/80 border border-white/20"
            >
              ×
            </button>
            <h2 className="text-xl font-semibold text-white mb-4">Facilities included</h2>
            <p className="mb-4 text-sm text-brand-100/90">
              Every apartment includes modern essentials and thoughtful extras for a comfortable stay.
            </p>
            <ul className="space-y-3 text-sm text-brand-100/90">
              {facilities.map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-brand-400" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
