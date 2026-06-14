import deals from "../data/deals.json";
import Hero from "../components/Hero";
import DealsSection from "../components/DealsSection";
import Newsletter from "../components/Newsletter";

export const metadata = {
  title: "Daily Deals, Coupons & Discounts",
  description:
    "Browse today's hand-picked deals, coupons, and discounts across electronics, home & kitchen, fashion, travel, health & beauty and more — updated daily on DealsForte.",
  keywords: [
    "today's deals",
    "best deals online",
    "coupon codes",
    "discount codes",
    "online shopping deals",
    "electronics deals",
    "fashion deals",
    "travel deals",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    title: "DealsForte — Daily Deals, Coupons & Discounts",
    description:
      "Today's hand-picked deals, coupons, and discounts across every category — updated daily.",
    url: "https://dealsforte.com",
    type: "website",
  },
};

export default function HomePage() {
  const categoryCount = new Set(deals.map((d) => d.category)).size;

  return (
    <>
      <Hero dealCount={deals.length} categoryCount={categoryCount} />

      <DealsSection deals={deals} />

      <div className="container">
        <div className="ad-slot">Advertisement</div>
      </div>

      <Newsletter />
    </>
  );
}
