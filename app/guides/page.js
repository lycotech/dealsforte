import Link from "next/link";

const guides = [
  {
    slug: "best-software-apps-deals-this-month",
    title: "Best Software & Apps Deals This Month",
    summary:
      "A quick roundup of the best software, antivirus, and cloud storage savings worth grabbing before they disappear.",
  },
  {
    slug: "how-to-stack-coupons-for-maximum-savings",
    title: "How to Stack Coupons for Maximum Savings",
    summary:
      "Learn the simple ways to combine promo codes, store offers, and affiliate savings to lower your total.",
  },
  {
    slug: "fashion-deals-guide-what-to-buy-on-sale-vs-full-price",
    title: "Fashion Deals Guide: What to Buy on Sale vs Full Price",
    summary:
      "Know which wardrobe staples are worth buying on sale and which items are often better at full price.",
  },
];

export const metadata = {
  title: "Guides & Deal Tips | DealsForte",
  description: "Helpful guides for shoppers who want the best coupon codes, savings tips, and daily deals.",
  alternates: { canonical: "/guides" },
};

export default function GuidesPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Guides</p>
          <h1>Money-saving guides for smart shoppers</h1>
          <p>From software bundles to coupon stacking and fashion bargains, these articles help you shop with confidence.</p>
        </div>
      </section>

      <div className="container section">
        <div className="guide-grid">
          {guides.map((guide) => (
            <article key={guide.slug} className="guide-card">
              <h3>{guide.title}</h3>
              <p>{guide.summary}</p>
              <Link href={`/guides/${guide.slug}`} className="btn btn-secondary">
                Read guide
              </Link>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
