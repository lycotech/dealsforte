import "./globals.css";
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
  keywords: [
    "deals",
    "coupons",
    "discounts",
    "online shopping",
    "promo codes",
  ],
  openGraph: {
    title: "DealsForte — Daily Deals, Coupons & Discounts",
    description:
      "Hand-picked deals, coupons, and discounts updated daily. Never pay full price again.",
    url: "https://dealsforte.com",
    siteName: "DealsForte",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense — literal tag in <head> for site verification */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2358171938555402"
          crossOrigin="anonymous"
        />
      </head>
      <body>
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
