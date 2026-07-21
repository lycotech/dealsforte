import Link from "next/link";
import { getAllStoreNames, getStoreMetadata } from "../../lib/deals";

export const metadata = {
  title: "Store Directory | DealsForte",
  description: "Browse trusted retailers and brands featured on DealsForte for the latest coupons and live offers.",
  alternates: { canonical: "/stores" },
};

export default function StoresPage() {
  const storeNames = getAllStoreNames();

  return (
    <>
      <section className="page-hero">
        <div className="container">
          <p className="section-eyebrow">Retailer directory</p>
          <h1>Stores and brands</h1>
          <p>Browse the best-known retailers and brands on DealsForte for current savings, promo codes, and daily deals.</p>
        </div>
      </section>

      <div className="container section">
        <div className="store-grid">
          {storeNames.map((storeName) => {
            const meta = getStoreMetadata(storeName);
            const slug = storeName.toLowerCase().replace(/[^a-z0-9]+/g, "-");

            return (
              <Link key={storeName} href={`/store/${slug}`} className="store-card">
                <div className="store-card-icon">{meta.logo}</div>
                <h3>{storeName}</h3>
                <p>{meta.description}</p>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
}
