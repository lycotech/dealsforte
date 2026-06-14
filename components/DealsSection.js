"use client";

import { useMemo, useState } from "react";
import DealCard from "./DealCard";
import { useSearch } from "./SearchContext";

export default function DealsSection({ deals }) {
  const { query } = useSearch();
  const [category, setCategory] = useState("All");

  const categories = useMemo(
    () => ["All", ...new Set(deals.map((d) => d.category))],
    [deals]
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return deals.filter((d) => {
      const matchesCategory = category === "All" || d.category === category;
      const matchesQuery =
        !q ||
        d.title.toLowerCase().includes(q) ||
        d.description.toLowerCase().includes(q) ||
        d.store.toLowerCase().includes(q) ||
        d.category.toLowerCase().includes(q);
      return matchesCategory && matchesQuery;
    });
  }, [deals, category, query]);

  return (
    <section className="section" id="deals">
      <div className="container">
        <div className="section-head">
          <div>
            <h2>Today&apos;s top deals</h2>
            <p>
              {filtered.length} deal{filtered.length === 1 ? "" : "s"}
              {category !== "All" ? ` in ${category}` : ""}
              {query.trim() ? ` matching “${query.trim()}”` : ""}
            </p>
          </div>
        </div>

        <div className="category-bar" role="tablist" aria-label="Deal categories">
          {categories.map((cat) => (
            <button
              key={cat}
              className={`chip${category === cat ? " active" : ""}`}
              onClick={() => setCategory(cat)}
              role="tab"
              aria-selected={category === cat}
            >
              {cat}
            </button>
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
