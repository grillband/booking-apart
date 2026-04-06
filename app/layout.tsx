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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className="min-h-screen text-gray-900">
        <div className="mesh-bg" aria-hidden="true">
          <span className="mesh-blob-3" />
        </div>
        <div className="min-h-screen flex flex-col relative">
          <Header />
          <main className="flex-1">{children}</main>
          <footer className="glass border-t" style={{ borderColor: 'rgba(255,255,255,0.5)', background: 'rgba(255,255,255,0.45)', backdropFilter: 'blur(40px) saturate(180%)' }}>
            <div className="container-page py-12">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-3">
                  <p className="text-sm font-semibold text-gray-800">CozyStay</p>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    From urban apartments to serene villas, where hotel quality meets the comfort of home.
                  </p>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Explore</p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li><a href="#suites" className="hover:text-gray-800 transition-colors">Properties</a></li>
                    <li><a href="#experience" className="hover:text-gray-800 transition-colors">Experience</a></li>
                    <li><a href="#reviews" className="hover:text-gray-800 transition-colors">Reviews</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Support</p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li><a href="/check-in" className="hover:text-gray-800 transition-colors">Online check-in</a></li>
                    <li><a href="#" className="hover:text-gray-800 transition-colors">Help center</a></li>
                    <li><a href="#" className="hover:text-gray-800 transition-colors">Contact us</a></li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Contact</p>
                  <ul className="space-y-2 text-xs text-gray-400">
                    <li>hello@cozystay.example</li>
                    <li>+1 (555) 012-3456</li>
                  </ul>
                </div>
              </div>
              <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t pt-6 text-[11px] text-gray-400 sm:flex-row sm:items-center" style={{ borderColor: 'rgba(255,255,255,0.4)' }}>
                <p>&copy; {new Date().getFullYear()} CozyStay. All rights reserved.</p>
                <div className="flex flex-wrap gap-4">
                  <a href="#" className="hover:text-gray-600">Privacy</a>
                  <a href="#" className="hover:text-gray-600">Terms</a>
                  <a href="#top" className="hover:text-gray-600">Back to top</a>
                </div>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}

