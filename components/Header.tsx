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
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/90 backdrop-blur-lg">
        <div className="container-page flex items-center justify-between py-4">
          <a href="/" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-accent">
              <span className="text-lg font-bold text-[#0a0a0a]">C</span>
            </div>
            <span className="text-base font-semibold text-white tracking-tight">CozyStay</span>
          </a>

          <nav className="hidden md:flex items-center gap-8 text-sm text-white/50">
            <a href="#suites" className="hover:text-white transition-colors">Properties</a>
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
            <a href="/check-in" className="hover:text-white transition-colors">Check-in</a>
          </nav>

          <a
            href="#booking"
            className="hidden md:inline-flex items-center rounded-xl bg-accent px-5 py-2.5 text-sm font-semibold text-[#0a0a0a] transition hover:bg-accent-light"
          >
            Book now
          </a>
        </div>
      </header>

      {/* Location modal */}
      {showLocationModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowLocationModal(false)}
        >
          <div
            className="relative w-full max-w-4xl mx-4 rounded-2xl border border-white/[0.08] bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowLocationModal(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold text-white mb-4">Our Location</h2>
            <div className="aspect-video w-full rounded-xl overflow-hidden">
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

      {/* Facilities modal */}
      {showFacilitiesModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowFacilitiesModal(false)}
        >
          <div
            className="relative w-full max-w-lg mx-4 rounded-2xl border border-white/[0.08] bg-surface p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setShowFacilitiesModal(false)}
              className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors"
            >
              ×
            </button>
            <h2 className="text-lg font-semibold text-white mb-2">Facilities included</h2>
            <p className="mb-5 text-sm text-white/40">
              Every property includes modern essentials and thoughtful extras for a comfortable stay.
            </p>
            <ul className="space-y-3">
              {facilities.map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm text-white/60">
                  <span className="mt-1.5 inline-flex h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
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
