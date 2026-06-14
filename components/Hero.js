"use client";

import { useSearch } from "./SearchContext";

export default function Hero({ dealCount, categoryCount }) {
  const { query, setQuery } = useSearch();

  return (
    <section className="hero">
      <div className="container">
        <h1>
          Smart shoppers <span>save more</span> at DealsForte
        </h1>
        <p>
          Discover today&apos;s best deals, coupons, and discounts — hand-picked
          across electronics, home, fashion, travel and more.
        </p>

        <form
          className="hero-search"
          role="search"
          onSubmit={(e) => e.preventDefault()}
        >
          <input
            type="search"
            placeholder="Search for a product, store, or category…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search deals"
          />
          <button type="submit" className="btn btn-accent">
            Search
          </button>
        </form>

        <div className="hero-stats">
          <div className="hero-stat">
            <strong>{dealCount}+</strong>
            <span>Live deals</span>
          </div>
          <div className="hero-stat">
            <strong>{categoryCount}</strong>
            <span>Categories</span>
          </div>
          <div className="hero-stat">
            <strong>Daily</strong>
            <span>Fresh updates</span>
          </div>
        </div>
      </div>
    </section>
  );
}
