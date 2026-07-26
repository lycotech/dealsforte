import { deals } from "../lib/deals";
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
        <div className="ad-slot">
          <div
            className="affiliate-slot"
            dangerouslySetInnerHTML={{
              __html: `
                <div class="affiliate-banner">
                  <a rel="sponsored" href="https://arkmc.pxf.io/c/5022050/352555/5172" target="_top" id="352555">
                    <img src="//a.impactradius-go.com/display-ad/5172-352555" alt="Affiliate offer" width="720" height="90" />
                  </a>
                </div>
                <div class="affiliate-banner">
                  <a rel="sponsored" href="https://arkmc.pxf.io/c/5022050/352543/5172" target="_top" id="352543">
                    <img src="//a.impactradius-go.com/display-ad/5172-352543" alt="Affiliate offer" width="160" height="600" />
                  </a>
                </div>
                <img height="0" width="0" src="https://arkmc.pxf.io/i/5022050/352543/5172" style="position:absolute;visibility:hidden;" border="0" alt="" />
              `,
            }}
          />
        </div>
      </div>

      <Newsletter />
    </>
  );
}
