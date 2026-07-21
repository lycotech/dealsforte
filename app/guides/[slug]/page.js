import Link from "next/link";
import { notFound } from "next/navigation";
import { getCategorySlug } from "../../../lib/deals";

const guideContent = {
  "best-software-apps-deals-this-month": {
    title: "Best Software & Apps Deals This Month",
    intro:
      "Software subscriptions, antivirus bundles, and storage plans are some of the easiest ways to save this month because they usually have big percentage discounts compared with regular retail prices.",
    body: [
      "The best software deals often combine several tools into one bundle, which makes them feel more valuable than a single app subscription.",
      "If you are shopping for security, backup, or editing tools, compare the first-year rate with the regular renewal cost before you buy.",
      "We also recommend bookmarking categories like Software & Apps on DealsForte so new promo codes land in your inbox quickly.",
    ],
    links: [
      { href: `/category/${getCategorySlug("Software & Apps")}`, label: "Software & Apps deals" },
      { href: "/deal/antivirus-vpn-bundle-1-year", label: "Antivirus & VPN bundle" },
    ],
  },
  "how-to-stack-coupons-for-maximum-savings": {
    title: "How to Stack Coupons for Maximum Savings",
    intro:
      "Coupon stacking works best when you combine a site-wide sale, a promo code, and a cashback offer instead of relying on just one discount source.",
    body: [
      "Start by checking the current deal page for a discount code and then compare that with the sale price on the product page.",
      "If the store allows it, pair a coupon with a store offer to reduce the total cost even further.",
      "For the biggest impact, focus on categories like Electronics, Home & Kitchen, and Fashion where discounts are most common.",
    ],
    links: [
      { href: `/category/${getCategorySlug("Electronics")}`, label: "Electronics deals" },
      { href: `/category/${getCategorySlug("Fashion")}`, label: "Fashion deals" },
    ],
  },
  "fashion-deals-guide-what-to-buy-on-sale-vs-full-price": {
    title: "Fashion Deals Guide: What to Buy on Sale vs Full Price",
    intro:
      "Some fashion items are worth waiting for until they go on sale, while others are better bought at full price because the quality difference matters more than the discount.",
    body: [
      "Classic staples like sneakers, outerwear, and basic bags tend to stay useful long after the discount period ends.",
      "If you want a seasonal trend or novelty item, buying it on sale is usually the smartest move.",
      "Check our current fashion pages for the best promo codes and limited-time savings before the season changes.",
    ],
    links: [
      { href: `/category/${getCategorySlug("Fashion")}`, label: "Fashion deals" },
      { href: "/deal/mens-leather-sneakers", label: "Men's leather sneakers" },
    ],
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const guide = guideContent[slug];

  if (!guide) {
    return { title: "Guide not found" };
  }

  return {
    title: `${guide.title} | DealsForte`,
    description: guide.intro,
    alternates: { canonical: `/guides/${slug}` },
  };
}

export default async function GuidePage({ params }) {
  const { slug } = await params;
  const guide = guideContent[slug];

  if (!guide) {
    notFound();
  }

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Guide</p>
          <h1>{guide.title}</h1>
          <p>{guide.intro}</p>
        </div>
      </section>

      <div className="container section page-content">
        {guide.body.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}

        <div className="guide-links">
          <h2>Related reads</h2>
          <ul>
            {guide.links.map((link) => (
              <li key={link.href}>
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
