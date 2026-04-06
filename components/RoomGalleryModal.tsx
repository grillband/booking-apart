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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="relative w-full max-w-3xl mx-4 rounded-2xl border border-white/[0.08] bg-surface">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/[0.06] text-white/60 text-sm hover:bg-white/10 hover:text-white transition-colors"
        >
          ×
        </button>
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-white/30">
                Property gallery
              </p>
              <h2 className="mt-1 text-base sm:text-lg font-semibold text-white">
                {room.name}
              </h2>
            </div>
            <p className="text-xs text-white/40">
              {index + 1} / {images.length}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl bg-surface-light h-64 sm:h-80">
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
                  className="absolute left-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-lg text-white h-8 w-8 flex items-center justify-center text-sm hover:bg-black/60 transition-colors"
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full bg-black/40 backdrop-blur-lg text-white h-8 w-8 flex items-center justify-center text-sm hover:bg-black/60 transition-colors"
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
                      ? "border-accent ring-2 ring-accent/40"
                      : "border-white/[0.06] opacity-60 hover:opacity-100"
                  } overflow-hidden flex-shrink-0 transition-opacity`}
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

