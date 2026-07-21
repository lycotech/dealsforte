import Link from "next/link";
import { notFound } from "next/navigation";
import { deals, getCategoryTitle, getCategorySlug, getDealsForCategory } from "../../../lib/deals";

export const dynamicParams = false;
export const revalidate = 21600;

export async function generateStaticParams() {
  return Array.from(new Set(deals.map((deal) => getCategorySlug(deal.category)))).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const category = getCategoryTitle(slug);

  if (category === "Deals") {
    return { title: "Deals" };
  }

  return {
    title: `${category} deals | DealsForte`,
    description: `Browse active ${category.toLowerCase()} deals, coupon codes, and daily discounts on DealsForte.`,
    alternates: { canonical: `/category/${slug}` },
    openGraph: {
      title: `${category} deals | DealsForte`,
      description: `Find ${category.toLowerCase()} deals, coupon codes, and limited-time offers on DealsForte.`,
      url: `https://dealsforte.com/category/${slug}`,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }) {
  const { slug } = await params;
  const category = getCategoryTitle(slug);

  if (category === "Deals") {
    notFound();
  }

  const categoryDeals = getDealsForCategory(category);

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Category page</p>
          <h1>{category} deals</h1>
          <p>Explore current {category.toLowerCase()} savings, promo codes, and limited-time offers hand-picked for shoppers.</p>
        </div>
      </section>

      <div className="container section">
        <div className="section-head">
          <div>
            <h2>{category}</h2>
            <p>{categoryDeals.length} active deal{categoryDeals.length === 1 ? "" : "s"} in this category.</p>
          </div>
        </div>

        <div className="deal-grid">
          {categoryDeals.map((deal) => (
            <article key={deal.id} className="deal-card">
              <div className="deal-thumb" style={{ background: deal.color }}>
                {deal.discount ? <span className="deal-badge">-{deal.discount}%</span> : null}
                {deal.featured ? <span className="deal-flag">Featured</span> : null}
                <span role="img" aria-hidden="true">
                  {deal.icon}
                </span>
              </div>
              <div className="deal-body">
                <div className="deal-meta">
                  <span className="store">{deal.store}</span>
                  <span>·</span>
                  <span>{deal.category}</span>
                </div>
                <h3 className="deal-title">{deal.title}</h3>
                <p className="deal-desc">{deal.description}</p>
                <div className="deal-price-row">
                  {deal.price != null && deal.oldPrice != null ? (
                    <>
                      <span className="deal-price">${deal.price.toFixed(2)}</span>
                      <span className="deal-oldprice">${deal.oldPrice.toFixed(2)}</span>
                    </>
                  ) : (
                    <span className="deal-discount-only">{deal.discount}% off</span>
                  )}
                </div>
                <div className="detail-actions">
                  <Link className="btn btn-primary btn-block" href={`/deal/${deal.slug}`}>
                    View deal
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </>
  );
}
