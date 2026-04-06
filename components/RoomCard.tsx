import React from "react";

export interface Room {
  id: string;
  name: string;
  description: string;
  maxGuests: number;
  pricePerNight: number;
  currency: string;
  imageUrl?: string;
  gallery?: string[];
  nextAvailableDate: string;
  availableNights: number;
}

interface RoomCardProps {
  room: Room;
  onSelect: (roomId: string) => void;
}

export function RoomCard({ room, onSelect }: RoomCardProps) {
  return (
    <article className="card-dark rounded-2xl overflow-hidden flex flex-col hover:border-accent/30 hover:-translate-y-1 transition-all duration-300 group">
      {room.imageUrl ? (
        <div
          className="h-48 sm:h-56 bg-cover bg-center relative"
          style={{ backgroundImage: `url(${room.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#161616] via-transparent to-transparent" />
        </div>
      ) : (
        <div className="h-48 sm:h-56 bg-gradient-to-tr from-surface via-surface-light to-surface-lighter" />
      )}
      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-white text-base sm:text-lg">
            {room.name}
          </h3>
          <span className="inline-flex items-center rounded-lg bg-white/[0.06] px-2.5 py-1 text-[11px] font-medium text-white/50 border border-white/[0.06]">
            Up to {room.maxGuests} guests
          </span>
        </div>
        <p className="mt-2 text-sm text-white/40 line-clamp-3">
          {room.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold text-white text-sm sm:text-base">
              {room.currency}{" "}
              {room.pricePerNight.toLocaleString(undefined, {
                maximumFractionDigits: 0,
              })}
              <span className="text-xs text-white/30 ml-1">/ night</span>
            </p>
            <p className="text-[11px] text-white/30 mt-1">
              Next available:{" "}
              <span className="font-medium text-white/60">
                {room.nextAvailableDate}
              </span>
            </p>
          </div>
          <p className="text-[11px] text-white/30">
            {room.availableNights > 0
              ? `${room.availableNights} nights open`
              : "Fully booked"}
          </p>
        </div>
        <button
          onClick={() => onSelect(room.id)}
          className="mt-5 inline-flex justify-center items-center rounded-xl bg-accent px-4 py-2.5 text-sm font-semibold text-[#0a0a0a] hover:bg-accent-light transition-colors"
        >
          Book this property
        </button>
      </div>
    </article>
  );
}

