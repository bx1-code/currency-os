import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "CurrencyOS — Live Currency Converter & Gateway Fee Calculator",
  description: "Convert all world currencies with live market rates, view historical price charts, and calculate gateway fees.",
  keywords: ["currency converter", "live exchange rates", "paypal fee calculator", "stripe fee calculator"],
  authors: [{ name: "CurrencyOS Team" }],
  icons: {
    icon: "/icon.png",
    shortcut: "/icon.png",
    apple: "/icon.png",
  },
  openGraph: {
    title: "CurrencyOS - Smart Live Currency & Fee Calculator",
    description: "Real-time world exchange rates, interactive currency charts, and merchant fee calculators.",
    url: "https://currency-os.com",
    siteName: "CurrencyOS",
    type: "website",
  },
  verification: {
    google: "4w-KvABhhHAm9QlUf6GLIj2GXytX-bwWIbzrI1rCc0s",
  },
  other: {
    "google-adsense-account": "ca-pub-6277200436544718",
  },
};
  

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "CurrencyOS",
    "url": "https://currency-os.com",
    "applicationCategory": "FinanceApplication",
    "operatingSystem": "All",
    "description": "Real-time global currency converter and payment gateway fee calculator.",
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}