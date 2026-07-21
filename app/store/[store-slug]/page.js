import Link from "next/link";
import { notFound } from "next/navigation";
import { deals, getAllStoreSlugs, getStoreDeals, getStoreMetadata, getCategorySlug } from "../../../lib/deals";

export const dynamicParams = false;
export const revalidate = 21600;

export async function generateStaticParams() {
  return getAllStoreSlugs().map((storeSlug) => ({ "store-slug": storeSlug }));
}

export async function generateMetadata({ params }) {
  const { "store-slug": storeSlug } = await params;
  const storeName = deals.find((deal) => deal.storeSlug === storeSlug)?.store;

  if (!storeName) {
    return { title: "Store not found" };
  }

  const meta = getStoreMetadata(storeName);

  return {
    title: `${storeName} deals | DealsForte`,
    description: `${meta.description} Browse active deals and coupon offers from ${storeName}.`,
    alternates: { canonical: `/store/${storeSlug}` },
    openGraph: {
      title: `${storeName} deals | DealsForte`,
      description: `${meta.description} Browse active deals and coupon offers from ${storeName}.`,
      url: `https://dealsforte.com/store/${storeSlug}`,
      type: "website",
    },
  };
}

export default async function StorePage({ params }) {
  const { "store-slug": storeSlug } = await params;
  const storeDeals = getStoreDeals(storeSlug);

  if (!storeDeals.length) {
    notFound();
  }

  const storeName = storeDeals[0].store;
  const meta = getStoreMetadata(storeName);

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { position: 1, name: "Home", item: "https://dealsforte.com/" },
      { position: 2, name: "Stores", item: "https://dealsforte.com/stores" },
      { position: 3, name: storeName, item: `https://dealsforte.com/store/${storeSlug}` },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Store page</p>
          <h1>{storeName} deals</h1>
          <p>{meta.description}</p>
        </div>
      </section>

      <div className="container section">
        <div className="store-hero-card">
          <div className="store-hero-icon">{meta.logo}</div>
          <div>
            <h2>{storeName}</h2>
            <p>{meta.description}</p>
            <div className="detail-actions">
              <Link className="btn btn-primary" href="/stores">
                Browse all stores
              </Link>
            </div>
          </div>
        </div>

        <div className="section-head">
          <div>
            <h2>Active deals</h2>
            <p>Sorted by discount percentage so you can spot the strongest savings first.</p>
          </div>
        </div>

        <div className="deal-grid">
          {storeDeals.map((deal) => (
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
                <div className="deal-footer-row">
                  <span className="deal-badge verified">✓ Verified {deal.lastVerified}</span>
                  <Link href={`/deal/${deal.slug}`} className="btn btn-secondary btn-block">
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
