import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Demo App - Testnet Checkout",
  description: "Checkout storefront demonstrating gasless, passkey-signed payments.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50 text-gray-900 font-sans">
        <div className="bg-amber-400 text-amber-950 font-semibold text-center py-2 text-sm tracking-wide shadow-sm z-50 sticky top-0">
          ⚠️ TESTNET DEMO - NO REAL FUNDS ARE USED ⚠️
        </div>
        <header className="bg-white border-b border-gray-200 py-4 px-6 md:px-8">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <h1 className="text-xl font-bold tracking-tight">Demo Storefront</h1>
            <nav className="text-sm font-medium text-gray-600">
              <a href="/shop" className="hover:text-gray-900 transition-colors">Shop</a>
            </nav>
          </div>
        </header>
        <main className="flex-1 w-full max-w-5xl mx-auto p-6 md:p-8">
          {children}
        </main>
        <footer className="py-6 border-t border-gray-200 mt-auto text-center text-sm text-gray-500">
          Powered by @rayos/wallet-sdk
        </footer>
      </body>
    </html>
  );
}
