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
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/20 backdrop-blur-md"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="glass-strong relative w-full max-w-3xl mx-4">
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 z-10 inline-flex h-8 w-8 items-center justify-center rounded-full text-gray-500 text-sm transition-colors" style={{ background: 'rgba(255,255,255,0.5)', backdropFilter: 'blur(20px)' }}
        >
          ×
        </button>
        <div className="flex flex-col gap-4 p-4 sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <div>
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-gray-400">
                Property gallery
              </p>
              <h2 className="mt-1 text-base sm:text-lg font-semibold text-gray-800">
                {room.name}
              </h2>
            </div>
            <p className="text-xs text-gray-400">
              {index + 1} / {images.length}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-xl h-56 sm:h-80" style={{ background: 'rgba(255,255,255,0.3)' }}>
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
                  className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full text-white h-10 w-10 flex items-center justify-center text-base transition-colors" style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(20px)' }}
                >
                  ‹
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full text-white h-10 w-10 flex items-center justify-center text-base transition-colors" style={{ background: 'rgba(0,0,0,0.25)', backdropFilter: 'blur(20px)' }}
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
                      ? "border-accent ring-2 ring-accent/30"
                      : "opacity-60 hover:opacity-100"
                  } overflow-hidden flex-shrink-0 transition-opacity`}
                  style={{ borderColor: i === index ? undefined : 'rgba(255,255,255,0.5)' }}
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

