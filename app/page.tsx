"use client";

import { useEffect, useMemo, useState } from "react";
import { RoomCard, type Room } from "@/components/RoomCard";
import { BookingPanel } from "@/components/BookingPanel";
import { RoomGalleryModal } from "@/components/RoomGalleryModal";
import { getCurrencyFromLocale } from "@/lib/currency";

const TABS = [
  {
    label: "An inviting escape",
    title: "Your home away from home",
    description:
      "Step into a space designed for comfort and relaxation. Every apartment features premium furnishings, soft lighting and curated interiors that feel warm from the moment you arrive.",
    image:
      "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    label: "Prime neighbourhoods",
    title: "Stay where it matters",
    description:
      "Our properties are located in the most sought-after neighbourhoods — close to dining, transport, shops and cultural attractions. Walk out the door and the city is at your feet.",
    image:
      "https://images.pexels.com/photos/3935320/pexels-photo-3935320.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    label: "Service excellence",
    title: "Hotel-grade hospitality",
    description:
      "From weekly housekeeping to 24/7 support, we bring the best of hotel service to your apartment stay. Premium linens, toiletries and a welcome package await every guest.",
    image:
      "https://images.pexels.com/photos/6585598/pexels-photo-6585598.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
  {
    label: "Tech-enhanced stays",
    title: "Smart, seamless and secure",
    description:
      "Self check-in with smart locks, high-speed Wi-Fi, streaming-ready TV and a digital concierge. Everything is designed so you spend less time figuring things out and more time enjoying your stay.",
    image:
      "https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=800",
  },
];

const TESTIMONIALS = [
  {
    name: "Sarah M.",
    location: "United Kingdom",
    text: "Absolutely stunning apartment with everything we needed. The self check-in was seamless and the location was perfect for exploring the city.",
    rating: 5,
  },
  {
    name: "James T.",
    location: "Australia",
    text: "Felt like a five-star hotel but with the privacy and space of our own apartment. The kitchen was a game-changer for our longer stay.",
    rating: 5,
  },
  {
    name: "Yuki K.",
    location: "Japan",
    text: "Beautiful interiors and incredibly responsive support team. Will definitely book again on our next trip.",
    rating: 5,
  },
];

export default function HomePage() {
  const [rooms, setRooms] = useState<Room[]>([]);
  const [selectedRoomId, setSelectedRoomId] = useState<string | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [galleryRoomId, setGalleryRoomId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState(0);

  const userCurrency = useMemo(() => {
    if (typeof navigator === "undefined") return "IDR";
    const locale = navigator.language || "en-US";
    return getCurrencyFromLocale(locale);
  }, []);

  useEffect(() => {
    async function loadRooms() {
      try {
        const res = await fetch(`/api/rooms?currency=${userCurrency}`);
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
  }, [userCurrency]);

  const selectedRoom = rooms.find((r) => r.id === selectedRoomId);
  const galleryRoom = galleryRoomId
    ? rooms.find((r) => r.id === galleryRoomId)
    : undefined;

  return (
    <>
      {/* ─── Hero ─── */}
      <section className="relative isolate overflow-hidden">
        {/* Background image */}
        <div
          className="absolute inset-0 -z-10 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          }}
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#0a0a0a]/70 via-[#0a0a0a]/50 to-[#0a0a0a]" />

        <div className="container-page flex flex-col items-center justify-center text-center py-32 sm:py-44 lg:py-52">
          <p className="text-xs font-medium uppercase tracking-[0.3em] text-accent mb-4">
            CozyStay Collection
          </p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Redefining your stay
          </h1>
          <p className="mt-5 max-w-xl text-sm sm:text-base text-white/50 leading-relaxed">
            From urban apartments to serene villas, where hotel quality meets the
            comfort of home.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#booking"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-7 py-3 text-sm font-semibold text-[#0a0a0a] transition hover:bg-accent-light"
            >
              Reserve your stay
              <span aria-hidden="true">→</span>
            </a>
            <a
              href="#suites"
              className="inline-flex items-center gap-2 rounded-xl border border-white/[0.12] px-6 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
            >
              View properties
            </a>
          </div>

          {/* Stats row */}
          <dl className="mt-16 flex flex-wrap items-center justify-center gap-x-12 gap-y-6 text-sm text-white/40">
            <div className="text-center">
              <dd className="text-2xl font-semibold text-white">4.8</dd>
              <dt className="mt-1 text-xs uppercase tracking-wider">Guest rating</dt>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/[0.08]" />
            <div className="text-center">
              <dd className="text-2xl font-semibold text-white">2</dd>
              <dt className="mt-1 text-xs uppercase tracking-wider">Properties</dt>
            </div>
            <div className="hidden sm:block h-8 w-px bg-white/[0.08]" />
            <div className="text-center">
              <dd className="text-2xl font-semibold text-white">24/7</dd>
              <dt className="mt-1 text-xs uppercase tracking-wider">Support</dt>
            </div>
          </dl>
        </div>
      </section>

      {/* ─── Property cards ─── */}
      <section id="suites" className="section-gap">
        <div className="container-page">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between mb-8">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent mb-2">
                Our properties
              </p>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
                Signature apartments
              </h2>
              <p className="mt-2 max-w-xl text-sm text-white/40">
                Each apartment is thoughtfully furnished with hotel-grade bedding, a
                fully equipped kitchen and fast Wi-Fi.
              </p>
            </div>
            <p className="text-xs text-white/30">
              Instant confirmation · Synced with channel manager
            </p>
          </div>

          {loading && (
            <p className="text-sm text-white/40">Loading properties…</p>
          )}
          {error && (
            <p className="text-sm text-red-400">{error} Please try again later.</p>
          )}

          <div className="grid gap-6 md:grid-cols-2">
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

      {/* ─── Booking panel ─── */}
      <section id="booking" className="section-gap">
        <div className="container-page max-w-2xl">
          <div className="text-center mb-8">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent mb-2">
              Reservation
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Book your stay
            </h2>
            <p className="mt-2 text-sm text-white/40">
              Secure booking with instant confirmation from our channel manager.
            </p>
          </div>
          <BookingPanel
            rooms={rooms}
            selectedRoomId={selectedRoomId}
            onSelectRoom={setSelectedRoomId}
            onOpenGallery={(roomId) => setGalleryRoomId(roomId)}
            userCurrency={userCurrency}
          />
        </div>
      </section>

      {/* ─── Experience the exceptional (tabbed section) ─── */}
      <section className="section-gap">
        <div className="container-page">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent mb-2">
              Why CozyStay
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              Experience the exceptional
            </h2>
          </div>

          {/* Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {TABS.map((tab, i) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(i)}
                className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                  activeTab === i
                    ? "bg-accent text-[#0a0a0a]"
                    : "border border-white/[0.08] text-white/50 hover:text-white hover:bg-white/[0.04]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Active tab content */}
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={TABS[activeTab].image}
                alt={TABS[activeTab].label}
                className="w-full h-64 sm:h-80 object-cover"
              />
            </div>
            <div className="space-y-4">
              <h3 className="text-xl font-semibold text-white">
                {TABS[activeTab].title}
              </h3>
              <p className="text-sm leading-relaxed text-white/50">
                {TABS[activeTab].description}
              </p>
              <a
                href="#booking"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:text-accent-light transition-colors"
              >
                Book now <span aria-hidden="true">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── Testimonials ─── */}
      <section className="section-gap">
        <div className="container-page">
          <div className="text-center mb-10">
            <p className="text-xs font-medium uppercase tracking-[0.25em] text-accent mb-2">
              Testimonials
            </p>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white">
              What our guests say
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="card-dark rounded-2xl p-6 flex flex-col"
              >
                <div className="flex gap-1 text-accent mb-4">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <svg
                      key={i}
                      className="h-4 w-4 fill-current"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-sm text-white/60 leading-relaxed flex-1">
                  &ldquo;{t.text}&rdquo;
                </p>
                <div className="mt-5 pt-4 border-t border-white/[0.06]">
                  <p className="text-sm font-medium text-white">{t.name}</p>
                  <p className="text-xs text-white/30">{t.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── About / amenities ─── */}
      <section className="section-gap">
        <div className="container-page">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="card-dark rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-semibold text-white">
                About CozyStay
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Located in the heart of the city, CozyStay is designed for business
                travellers, digital nomads and families who want the comfort of an
                apartment with the service standards of a boutique hotel.
              </p>
            </div>
            <div className="card-dark rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-semibold text-white">
                What&apos;s included
              </h3>
              <ul className="text-sm text-white/40 space-y-1.5">
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                  High-speed Wi-Fi and dedicated workspace
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                  Fully equipped kitchen or kitchenette
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                  Weekly housekeeping and fresh linen
                </li>
                <li className="flex items-center gap-2">
                  <span className="h-1 w-1 rounded-full bg-accent flex-shrink-0" />
                  Self check-in with smart lock access
                </li>
              </ul>
            </div>
            <div className="card-dark rounded-2xl p-6 space-y-3">
              <h3 className="text-sm font-semibold text-white">
                Stay with confidence
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                Your booking is managed through a professional channel manager used
                by major travel sites. Availability is always up to date and your
                details are handled securely end-to-end.
              </p>
            </div>
          </div>
        </div>
      </section>

      <RoomGalleryModal
        room={galleryRoom}
        open={!!galleryRoomId}
        onClose={() => setGalleryRoomId(null)}
      />
    </>
  );
}

