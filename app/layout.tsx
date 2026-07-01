import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { Toaster } from "react-hot-toast";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    default: "Dinga Car Rentals – Kenya's Premium Car Hire",
    template: "%s | Dinga Car Rentals",
  },
  description:
    "Rent premium, economy, SUV, electric and luxury cars across Kenya. Instant booking, competitive Ksh rates, and 24/7 support. Nairobi, Mombasa, Kisumu and more.",
  keywords: ["car rental Kenya", "hire car Nairobi", "Dinga", "rent a car Mombasa", "SUV hire Kenya"],
  openGraph: {
    title: "Dinga Car Rentals – Kenya's Premium Car Hire",
    description: "Book your perfect car online in minutes. 90+ vehicles. 8 locations. Ksh rates.",
    type: "website",
    locale: "en_KE",
  },
  robots: { index: true, follow: true },
  metadataBase: new URL("https://dingacarrentals.co.ke"),
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className="relative bg-white antialiased">
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: { background: "#2B2C35", color: "#fff", borderRadius: "12px" },
            }}
          />
        </body>
      </html>
    </ClerkProvider>
  );
}
