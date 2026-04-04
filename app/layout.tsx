import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "CozyStay Apartments",
  description: "Modern apartment booking with real-time availability."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-slate-950 text-slate-50">
        <div className="min-h-screen flex flex-col relative">
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-0 bg-gradient-to-b from-black via-brand-900 to-brand-900 opacity-90"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none fixed inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_top,_#b08f5e33,_transparent_60%)]"
          />

          <Header />
          <main className="relative flex-1">
            <div className="pt-4 pb-10">{children}</div>
          </main>
          <footer className="relative border-t border-white/10 bg-black/70">
            <div className="container-page py-8">
              <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
                <div className="space-y-2 text-xs sm:text-sm text-brand-100/90">
                  <p className="font-semibold text-brand-50">CozyStay Apartments</p>
                  <p>Modern serviced apartments with hotel-grade support.</p>
                  <p className="text-[11px] text-brand-300">
                    All reservations synchronised securely via your channel manager.
                  </p>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-brand-100/90">
                  <p className="font-semibold text-brand-50">Reservations & support</p>
                  <p>Email: hello@cozystay.example</p>
                  <p>Phone: +1 (555) 012-3456</p>
                </div>
              </div>
              <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-4 text-[11px] text-brand-300 sm:flex-row sm:items-center">
                <p>
                  © {new Date().getFullYear()} CozyStay Apartments. All rights reserved.
                </p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="hover:text-brand-100">
                    Privacy
                  </a>
                  <a href="#" className="hover:text-brand-100">
                    Terms
                  </a>
                  <a href="#top" className="hover:text-brand-100">
                    Back to top
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

