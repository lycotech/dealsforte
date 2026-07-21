"use client";

import Link from "next/link";
import { useMemo } from "react";
import DealCard from "./DealCard";
import { useSearch } from "./SearchContext";
import { getCategorySlug } from "../lib/deals";

export default function DealsSection({ deals }) {
  const { query } = useSearch();

  const categories = useMemo(
    () => ["All", ...new Set(deals.map((d) => d.category))],
    [deals]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return deals.filter((d) => {
      const matchesQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.store.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      return matchesQuery;
    });
  }, [deals, query]);

  return (
    <section className="section" id="deals">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Today&apos;s top deals</h2>
            <p>
              {filtered.length} deal{filtered.length === 1 ? "" : "s"}
              {query.trim() ? ` matching “${query.trim()}”` : ""}
            </p>
          </div>
        </div>

        <div className="category-bar" role="tablist" aria-label="Deal categories">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={cat === "All" ? "/" : `/category/${getCategorySlug(cat)}`}
              className="chip"
              role="tab"
            >
              {cat}
            </Link>
          ))}
        </div>

        {filtered.length > 0 ? (
          <div className="deal-grid">
            {filtered.map((deal) => (
              <DealCard key={deal.id} deal={deal} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>No deals match your search. Try a different term or category.</p>
          </div>
        )}
      </div>
    </section>
  );
}
