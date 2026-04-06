"use client";

import { useEffect, useState } from "react";
import { RoomCard, type Room } from "@/components/RoomCard";
import { BookingPanel } from "@/components/BookingPanel";
import { RoomGalleryModal } from "@/components/RoomGalleryModal";

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryRoomId, setGalleryRoomId] = useState<string | null>(null);

  useEffect(() => {
    async function loadRooms() {
      try {
        const res = await fetch("/api/rooms");
        if (!res.ok) throw new Error("Failed to load rooms");
        const data = await res.json();
        const fetchedRooms = data.rooms ?? [];
        setRooms(fetchedRooms);
        if (fetchedRooms.length > 0) {
          setSelectedRoomId(fetchedRooms[0].id);
        }
      } catch (err: any) {
        setError(err.message || "Something went wrong.");
      } finally {
        setLoading(false);
      }
    }
    loadRooms();
  }, []);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  const galleryRoom = galleryRoomId ? rooms.find((r) => r.id === galleryRoomId) : undefined;

  return (
    <div id="top" className="container-page space-y-12 sm:space-y-16">
      {/* Hero */}
      <section className="relative pt-8 sm:pt-12">
        <div className="flex flex-col gap-10 md:flex-row md:py-4">
          <div className="flex-1 space-y-8 md:space-y-10">
            <p className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-medium text-slate-600 backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
              Now accepting reservations via your channel manager
            </p>
            <div className="space-y-4">
              <h1 className="text-balance text-4xl font-semibold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
                A private apartment
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-brand-500 via-brand-700 to-brand-600">
                  with hotel-grade support.
                </span>
              </h1>
              <p className="max-w-xl text-pretty text-sm sm:text-base text-slate-600">
                CozyStay offers a curated pair of serviced apartments designed for business trips,
                weekend escapes and longer stays. Real‑time availability, instant confirmation and
                online check‑in, all synchronised with your channel manager.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <a
                href="#booking"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-soft transition hover:bg-brand-400"
              >
                Reserve your stay
                <span aria-hidden="true">→</span>
              </a>
              <a
                href="#suites"
                className="inline-flex items-center gap-2 rounded-full border border-slate-300 bg-white px-5 py-2.5 text-xs sm:text-sm font-medium text-slate-700 transition hover:bg-slate-50"
              >
                View apartment types
              </a>
            </div>

            <dl className="grid grid-cols-3 gap-4 max-w-md text-xs sm:text-sm text-slate-600">
              <div>
                <dt className="font-semibold text-slate-800">Average rating</dt>
                <dd className="mt-1 flex items-center gap-1.5">
                  <span className="text-base font-semibold text-slate-900">4.8</span>
                  <span className="text-[10px] uppercase tracking-[0.18em] text-slate-500">
                    /5.0
                  </span>
                </dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-800">Check‑in</dt>
                <dd className="mt-1 text-sm">From 3:00 PM</dd>
              </div>
              <div>
                <dt className="font-semibold text-slate-800">Self check‑in</dt>
                <dd className="mt-1 text-sm">Smart lock access</dd>
              </div>
            </dl>

            {loading && <p className="text-sm text-slate-500">Loading rooms…</p>}
            {error && (
              <p className="text-sm text-red-500">
                {error} Please try again later.
              </p>
            )}
          </div>

          {/* Hero media + booking card */}
          <div className="flex-1 md:max-w-md lg:max-w-lg md:pl-4 lg:pl-8">
            <div className="relative overflow-hidden rounded-3xl border border-slate-200 bg-gradient-to-b from-slate-50 via-white to-slate-100 p-4 shadow-soft sm:p-5">
              <div
                aria-hidden="true"
                className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-[radial-gradient(circle_at_center,_#d9d2c6aa,_transparent_70%)]"
              />
              <div className="relative space-y-4">
                <div className="overflow-hidden rounded-2xl border border-slate-200 bg-[url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1200')] bg-cover bg-center">
                  <div className="bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-5 md:p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium uppercase tracking-[0.24em] text-brand-100">
                          CozyStay Collection
                        </p>
                        <p className="mt-1 text-lg font-semibold text-white">
                          {selectedRoom?.name ?? "Select an apartment"}
                        </p>
                      </div>
                      {selectedRoom && (
                        <div className="rounded-xl bg-black/40 px-3 py-2 text-right text-xs text-white/80">
                          from
                          <p className="text-base font-semibold text-white">
                            {selectedRoom.currency} {selectedRoom.pricePerNight.toFixed(0)}
                          </p>
                          <p className="text-[10px] uppercase tracking-[0.18em]">
                            per night
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                <div id="booking" className="relative">
                  <BookingPanel
                    rooms={rooms}
                    selectedRoomId={selectedRoomId}
                    onSelectRoom={setSelectedRoomId}
                    onOpenGallery={(roomId) => setGalleryRoomId(roomId)}
                  />
                </div>
              </div>
            </div>
            <p className="mt-3 text-[11px] text-slate-500">
              Availability, rates and minimum-stay rules are synchronised with your
              channel manager so you never get double bookings.
            </p>
          </div>
        </div>
      </section>

      {/* Signature suites / apartment types */}
      <section
        id="suites"
        className="border-y border-slate-200 bg-slate-50 rounded-3xl md:rounded-[2rem] overflow-hidden"
      >
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 md:py-14 lg:px-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-slate-900">
                Signature apartments
              </h2>
              <p className="mt-2 max-w-xl text-sm sm:text-base text-slate-600">
                Each apartment is thoughtfully furnished with hotel‑grade bedding, a
                fully equipped kitchen and fast Wi‑Fi. Choose the layout that matches
                the way you travel.
              </p>
            </div>
            <p className="text-xs sm:text-sm text-slate-500">
              Instant confirmation when you book online.
            </p>
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            {rooms.map((room) => (
              <div
                key={room.id}
                onClick={() => {
                  setSelectedRoomId(room.id);
                  setGalleryRoomId(room.id);
                }}
                className="cursor-pointer"
              >
                <RoomCard room={room} onSelect={setSelectedRoomId} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Amenities summary (kept from previous version) */}
      <section className="grid gap-8 lg:grid-cols-3 bg-slate-50 border border-slate-200 rounded-2xl p-5 sm:p-8">
        <div className="space-y-2">
          <h2 className="text-sm font-semibold text-slate-800">
            About CozyStay Apartments
          </h2>
          <p className="text-sm text-slate-600">
            Located in the heart of the city, CozyStay is designed for business travellers,
            digital nomads and families who want the comfort of an apartment with the
            service standards of a boutique hotel.
          </p>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-800">
            What&apos;s included
          </h3>
          <ul className="text-sm text-slate-600 space-y-1">
            <li>• High‑speed Wi‑Fi and dedicated workspace</li>
            <li>• Fully equipped kitchen or kitchenette</li>
            <li>• Weekly housekeeping and fresh linen</li>
            <li>• Self check‑in with smart lock access</li>
          </ul>
        </div>
        <div className="space-y-2">
          <h3 className="text-sm font-semibold text-slate-800">
            Stay with confidence
          </h3>
          <p className="text-sm text-slate-600">
            Your booking is managed through a professional channel manager used by major
            travel sites. Availability is always up to date and your details are handled
            securely end‑to‑end.
          </p>
        </div>
      </section>

      <RoomGalleryModal
        room={galleryRoom}
        open={!!galleryRoomId}
        onClose={() => setGalleryRoomId(null)}
      />
    </div>
  );
}

