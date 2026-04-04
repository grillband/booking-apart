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
    <article className="bg-slate-900/70 backdrop-blur rounded-2xl shadow-[0_18px_45px_rgba(0,0,0,0.45)] border border-white/5 overflow-hidden flex flex-col hover:border-primary/60 hover:-translate-y-1 hover:shadow-[0_25px_60px_rgba(0,0,0,0.7)] transition-all">
      {room.imageUrl ? (
        <div
          className="h-40 sm:h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${room.imageUrl})` }}
        />
      ) : (
        <div className="h-40 sm:h-48 bg-gradient-to-tr from-primary/80 via-emerald-500/60 to-amber-400/70" />
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-50 text-base sm:text-lg">
            {room.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-slate-900/80 px-2 py-1 text-[11px] font-medium text-slate-100 border border-white/10">
            Up to {room.maxGuests} guests
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-300/90 line-clamp-3">
          {room.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold text-slate-50 text-sm sm:text-base">
              {room.currency} {room.pricePerNight.toFixed(0)}
              <span className="text-xs text-slate-400 ml-1">/ night</span>
            </p>
            <p className="text-[11px] text-slate-400 mt-1">
              Next available:{" "}
              <span className="font-medium text-slate-100">
                {room.nextAvailableDate}
              </span>
            </p>
          </div>
          <p className="text-[11px] text-slate-400">
            {room.availableNights > 0
              ? `${room.availableNights} nights open`
              : "Fully booked"}
          </p>
        </div>
        <button
          onClick={() => onSelect(room.id)}
          className="mt-5 inline-flex justify-center items-center rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-emerald-500/40 hover:bg-emerald-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary focus-visible:ring-offset-slate-950 transition-colors"
        >
          Book this apartment
        </button>
      </div>
    </article>
  );
}

