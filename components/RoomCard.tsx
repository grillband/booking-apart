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
    <article className="bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-slate-200 overflow-hidden flex flex-col hover:border-brand-400 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all">
      {room.imageUrl ? (
        <div
          className="h-40 sm:h-48 bg-cover bg-center"
          style={{ backgroundImage: `url(${room.imageUrl})` }}
        />
      ) : (
        <div className="h-40 sm:h-48 bg-gradient-to-tr from-brand-300 via-brand-200 to-brand-100" />
      )}
      <div className="p-4 flex flex-col flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-slate-900 text-base sm:text-lg">
            {room.name}
          </h3>
          <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-1 text-[11px] font-medium text-slate-700 border border-slate-200">
            Up to {room.maxGuests} guests
          </span>
        </div>
        <p className="mt-2 text-sm text-slate-600 line-clamp-3">
          {room.description}
        </p>
        <div className="mt-4 flex items-center justify-between text-sm">
          <div>
            <p className="font-semibold text-slate-900 text-sm sm:text-base">
              {room.currency} {room.pricePerNight.toFixed(0)}
              <span className="text-xs text-slate-500 ml-1">/ night</span>
            </p>
            <p className="text-[11px] text-slate-500 mt-1">
              Next available:{" "}
              <span className="font-medium text-slate-700">
                {room.nextAvailableDate}
              </span>
            </p>
          </div>
          <p className="text-[11px] text-slate-500">
            {room.availableNights > 0
              ? `${room.availableNights} nights open`
              : "Fully booked"}
          </p>
        </div>
        <button
          onClick={() => onSelect(room.id)}
          className="mt-5 inline-flex justify-center items-center rounded-lg bg-brand-500 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-400 transition-colors"
        >
          Book this apartment
        </button>
      </div>
    </article>
  );
}

