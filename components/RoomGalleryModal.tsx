import React, { useEffect, useState } from "react";
import type { Room } from "./RoomCard";

interface RoomGalleryModalProps {
  room?: Room;
  open: boolean;
  onClose: () => void;
}

export function RoomGalleryModal({ room, open, onClose }: RoomGalleryModalProps) {
  const images = room?.gallery && room.gallery.length > 0 ? room.gallery : room?.imageUrl ? [room.imageUrl] : [];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (!open) {
      setIndex(0);
      return;
    }
    setIndex(0);
  }, [open, room?.id]);

  if (!open || !room || images.length === 0) return null;

  function next() {
    setIndex((prev) => (prev + 1) % images.length);
  }

  function prev() {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  }

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/40 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl mx-4 rounded-3xl border border-slate-200 bg-white shadow-[0_20px_60px_rgba(0,0,0,0.2)]">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 inline-flex h-8 w-8 items-center justify-center rounded-full bg-slate-100 text-slate-600 text-sm hover:bg-slate-200 border border-slate-200"
        >
          ×
        </button>
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-brand-500">
                Apartment gallery
              </p>
              <h2 className="mt-1 text-base sm:text-lg font-semibold text-slate-900">
                {room.name}
              </h2>
            </div>
            <p className="text-xs text-slate-500">
              {index + 1} / {images.length}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-100 h-64 sm:h-80">
            <img
              src={images[index]}
              alt={room.name}
              className="h-full w-full object-cover transition-opacity duration-300"
            />
            {images.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={prev}
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 text-slate-700 h-8 w-8 flex items-center justify-center text-sm hover:bg-white border border-slate-200"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-white/80 text-slate-700 h-8 w-8 flex items-center justify-center text-sm hover:bg-white border border-slate-200"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={img + i}
                  type="button"
                  onClick={() => setIndex(i)}
                  className={`h-14 w-20 rounded-lg border ${
                    i === index
                      ? "border-brand-400 ring-2 ring-brand-400/60"
                      : "border-slate-200 opacity-70 hover:opacity-100"
                  } overflow-hidden flex-shrink-0`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

