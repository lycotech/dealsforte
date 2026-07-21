import Link from "next/link";
import { notFound } from "next/navigation";
import { deals, getDealBySlug, getRelatedDeals, getCategorySlug } from "../../../lib/deals";

export const dynamicParams = false;
export const revalidate = 21600;

export async function generateStaticParams() {
  return deals.map((deal) => ({ slug: deal.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    return { title: "Deal not found" };
  }

  return {
    title: `${deal.title} | DealsForte`,
    description: `${deal.description} Save ${deal.discount}% with ${deal.store}.`,
    alternates: { canonical: `/deal/${deal.slug}` },
    openGraph: {
      title: `${deal.title} | DealsForte`,
      description: `${deal.description} Save ${deal.discount}% at ${deal.store}.`,
      url: `https://dealsforte.com/deal/${deal.slug}`,
      type: "article",
    },
  };
}

export default async function DealPage({ params }) {
  const { slug } = await params;
  const deal = getDealBySlug(slug);

  if (!deal) {
    notFound();
  }

  const relatedDeals = getRelatedDeals(deal, 4);
  const priceValue = deal.price ?? deal.oldPrice ?? 0;
  const originalPrice = deal.oldPrice ?? deal.price ?? 0;
  const savings = deal.oldPrice && deal.price ? deal.oldPrice - deal.price : 0;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { position: 1, name: "Home", item: "https://dealsforte.com/" },
      {
        position: 2,
        name: deal.category,
        item: `https://dealsforte.com/category/${getCategorySlug(deal.category)}`,
      },
      {
        position: 3,
        name: deal.title,
        item: `https://dealsforte.com/deal/${deal.slug}`,
      },
    ],
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.title,
    description: deal.description,
    category: deal.category,
    brand: {
      "@type": "Brand",
      name: deal.store,
    },
    offers: {
      "@type": "Offer",
      url: deal.link,
      priceCurrency: "USD",
      price: priceValue,
      availability: "https://schema.org/InStock",
      priceValidUntil: "2026-12-31",
      seller: {
        "@type": "Organization",
        name: deal.store,
      },
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Deal spotlight</p>
          <h1>{deal.title}</h1>
          <p>{deal.description}</p>
        </div>
      </section>

      <div className="container deal-detail-layout">
        <article className="detail-card">
          <div className="detail-badges">
            {deal.featured ? <span className="deal-flag">Featured</span> : null}
            {deal.expiring ? <span className="deal-badge expiring">Ending soon</span> : null}
            <span className="deal-badge verified">✓ Verified {deal.lastVerified}</span>
          </div>

          <div className="product-hero">
            <div className="product-icon" style={{ background: deal.color }}>
              <span role="img" aria-hidden="true">
                {deal.icon}
              </span>
            </div>
            <div>
              <p className="deal-meta">
                <span className="store">{deal.store}</span>
                <span>·</span>
                <span>{deal.category}</span>
              </p>
              <h2>{deal.title}</h2>
              <p className="detail-intro">{deal.description}</p>
            </div>
          </div>

          <div className="price-comparison">
            <div>
              <span className="muted">Original price</span>
              <strong>${originalPrice.toFixed(2)}</strong>
            </div>
            <div>
              <span className="muted">Deal price</span>
              <strong>${priceValue.toFixed(2)}</strong>
            </div>
            <div>
              <span className="muted">You save</span>
              <strong>${savings.toFixed(2)}</strong>
            </div>
          </div>

          <div className="detail-actions">
            <a className="btn btn-primary" href={deal.link} target="_blank" rel="nofollow sponsored noopener">
              Get Deal
            </a>
            <Link className="btn btn-secondary" href={`/category/${getCategorySlug(deal.category)}`}>
              View all {deal.category} deals
            </Link>
          </div>

          <div className="detail-meta-grid">
            <div>
              <h3>Store</h3>
              <p>{deal.store}</p>
            </div>
            <div>
              <h3>Last verified</h3>
              <p>{deal.lastVerified}</p>
            </div>
            <div>
              <h3>Status</h3>
              <p>{deal.expiring ? "Ending soon" : "Active"}</p>
            </div>
          </div>
        </article>

        <aside className="detail-sidebar">
          <div className="side-card">
            <h3>Related deals</h3>
            <div className="related-list">
              {relatedDeals.map((item) => (
                <Link key={item.id} href={`/deal/${item.slug}`} className="related-item">
                  <strong>{item.title}</strong>
                  <span>
                    Save {item.discount}% at {item.store}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </>
  );
}
