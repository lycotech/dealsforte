import "./globals.css";
import Script from "next/script";
import { SearchProvider } from "../components/SearchContext";
import Header from "../components/Header";
import Footer from "../components/Footer";

export const metadata = {
  metadataBase: new URL("https://dealsforte.com"),
  title: {
    default: "DealsForte — Daily Deals, Coupons & Discounts",
    template: "%s · DealsForte",
  },
  description:
    "DealsForte brings you hand-picked deals, coupons, and discounts across electronics, home, fashion, travel and more — updated daily.",
  applicationName: "DealsForte",
  keywords: [
    "deals",
    "daily deals",
    "coupons",
    "coupon codes",
    "promo codes",
    "discounts",
    "online shopping deals",
    "sales",
    "bargains",
    "cashback",
    "electronics deals",
    "fashion deals",
    "travel deals",
    "home and kitchen deals",
  ],
  authors: [{ name: "DealsForte" }],
  creator: "DealsForte",
  publisher: "DealsForte",
  category: "shopping",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "DealsForte — Daily Deals, Coupons & Discounts",
    description:
      "Hand-picked deals, coupons, and discounts updated daily. Never pay full price again.",
    url: "https://dealsforte.com",
    siteName: "DealsForte",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DealsForte — Daily Deals, Coupons & Discounts",
    description:
      "Hand-picked deals, coupons, and discounts updated daily. Never pay full price again.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Impact affiliate network — site verification */}
        <meta
          name="impact-site-verification"
          value="fb4435f4-34ad-4ae8-ab60-aabe82dac3d1"
        />
        {/* Google AdSense — literal tag in <head> for site verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2358171938555402"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        {/* Structured data (JSON-LD) — Organization + WebSite for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://dealsforte.com/#organization",
                  name: "DealsForte",
                  url: "https://dealsforte.com",
                  description:
                    "DealsForte is a deals and coupon aggregator surfacing hand-picked discounts across electronics, home, fashion, travel and more.",
                },
                {
                  "@type": "WebSite",
                  "@id": "https://dealsforte.com/#website",
                  url: "https://dealsforte.com",
                  name: "DealsForte",
                  publisher: { "@id": "https://dealsforte.com/#organization" },
                  potentialAction: {
                    "@type": "SearchAction",
                    target: {
                      "@type": "EntryPoint",
                      urlTemplate:
                        "https://dealsforte.com/?q={search_term_string}",
                    },
                    "query-input": "required name=search_term_string",
                  },
                },
              ],
            }),
          }}
        />

        {/* Google Analytics (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2X7YZJ6E84"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2X7YZJ6E84');
          `}
        </Script>
        <SearchProvider>
          <div className="topbar">
            🔥 <strong>Hot deals daily</strong> — affiliate links help keep
            DealsForte free.
          </div>
          <Header />
          <main className="site-main">{children}</main>
          <Footer />
        </SearchProvider>
      </body>
    </html>
  );
}
