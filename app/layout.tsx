import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";

export const metadata: Metadata = {
  title: "CozyStay – Redefining Your Stay",
  description: "From urban apartments to serene villas, where hotel quality meets the comfort of home."
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#0a0a0a] text-white">
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="border-t border-white/[0.06] bg-[#0a0a0a]">
            <div className="container-page py-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-white">CozyStay</p>
                  <p className="text-xs text-white/50 leading-relaxed">
                    From urban apartments to serene villas, where hotel quality meets the comfort of home.
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Explore</p>
                  <ul className="space-y-2 text-xs text-white/40">
                    <li><a href="#suites" className="hover:text-white transition-colors">Properties</a></li>
                    <li><a href="#experience" className="hover:text-white transition-colors">Experience</a></li>
                    <li><a href="#reviews" className="hover:text-white transition-colors">Reviews</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Support</p>
                  <ul className="space-y-2 text-xs text-white/40">
                    <li><a href="/check-in" className="hover:text-white transition-colors">Online check-in</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Help center</a></li>
                    <li><a href="#" className="hover:text-white transition-colors">Contact us</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-white/70 uppercase tracking-wider">Contact</p>
                  <ul className="space-y-2 text-xs text-white/40">
                    <li>hello@cozystay.example</li>
                    <li>+1 (555) 012-3456</li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-white/[0.06] pt-6 text-[11px] text-white/30 sm:flex-row sm:items-center">
                <p>© {new Date().getFullYear()} CozyStay. All rights reserved.</p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="hover:text-white/60">Privacy</a>
                  <a href="#" className="hover:text-white/60">Terms</a>
                  <a href="#top" className="hover:text-white/60">Back to top</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

