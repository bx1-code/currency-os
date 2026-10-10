import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import { GoogleAnalytics } from '@next/third-parties/google';

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
        <Script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6277200436544718"
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Partnerize Conversion Tracking Tag */}
        <Script
          id="partnerize-tag"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                var pztt = 3;
                var pztp = {"p":"pzt","mi":0,"ma":99,"e":[]};
                var tid = '03c90c11-eadb-4ff7-b067-fd1520422eec';

                var pzth = function (i) {
                    var enc = new TextEncoder();
                    var bin = enc.encode(i);
                    return window.crypto.subtle.digest('SHA-1', bin).then(function (b) {
                        var u = new Uint8Array(b);
                        var a = [];
                        for (var j = 0; j < u.length; j++) {
                            var hex = u[j].toString(16);
                            if (hex.length < 2) hex = '0' + hex;
                            a.push(hex);
                        }
                        return a.join('');
                    });
                };

                var pzth2d = function (h) {
                    return h.slice(0, 6) + 'p.' + h + '.com';
                };

                var pztd = function () {
                    var i;
                    do {
                        i = Math.floor(Math.random() * ((pztp.ma + 1) - pztp.mi)) + pztp.mi;
                    } while (pztp.e && pztp.e.indexOf(i) !== -1);
                    return pzth(pztp.p + i).then(pzth2d);
                };

                var pzti = function () {
                    if (pztt <= 0) return;
                    var s = document.createElement('script');
                    s.onerror = function () {
                        pztt--;
                        pzti();
                    };
                    s.onload = function () {
                        l = true;
                        pzthc();
                    };
                    var d;
                    pztd().then(function (domain) {
                        d = domain;
                        s.src = 'https://' + d + '/tag/' + tid;
                        document.body.appendChild(s);
                    }).catch(function () {
                        e.push({ error: 'Load failed from ' + d, parameter: '' });
                        pzthc();
                    });
                };

                var l = false;
                var e = [];

                window.pztr = window.pztr || function (t, f, m, p) {
                    var b = (window.pztb = window.pztb || {});
                    var x = (b[t] = b[t] || { fe: {} });
                    (x.fe[f] = x.fe[f] || []).push({ error: m, parameter: p });
                };
                window.pztb = window.pztb || {};
                window.pztb[tid] = window.pztb[tid] || { fe: {} };

                var pzthc = function () {
                    var features_errors = window.pztb[tid].fe;
                    window.pztb[tid].fe = {};
                    var loaded = l;
                    var errors = e;
                    l = false;
                    e = [];

                    if (Object.keys(features_errors).length === 0) {
                        features_errors = { x: [] };
                    }

                    fetch('https://api.performancehorizon.com/v3/pzthc/' + tid, {
                        method: 'POST',
                        headers: { 'content-type': 'application/json' },
                        body: JSON.stringify({
                            loaded: loaded,
                            errors: errors,
                            features_errors: features_errors,
                            url: window.location.href
                        })
                    }).catch(function () {});
                };

                if (document.readyState === 'complete' || document.readyState === 'interactive') {
                  pzti();
                } else {
                  document.addEventListener('DOMContentLoaded', pzti);
                }
              })();
            `,
          }}
        />
      </head>
      <body className={inter.className}>
        {children}
        <GoogleAnalytics gaId="G-91E223EEXK" />
      </body>
    </html>
  );
}