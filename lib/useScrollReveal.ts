"use client";

import { useCallback } from "react";

export function useScrollReveal() {
  const observe = useCallback((node: HTMLDivElement | null) => {
    if (!node) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add("visible");
          io.unobserve(node);
        }
      },
      { threshold: 0.12 }
    );
    io.observe(node);
  }, []);
  return observe;
}
