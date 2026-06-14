"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSearch } from "./SearchContext";

const NAV_LINKS = [
  { href: "/", label: "Deals" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
  { href: "/affiliate-disclosure", label: "Disclosure" },
];

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const { query, setQuery } = useSearch();
  const [open, setOpen] = useState(false);

  function handleSearch(e) {
    e.preventDefault();
    if (pathname !== "/") router.push("/");
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo" onClick={() => setOpen(false)}>
          <span className="logo-mark">🏷️</span>
          <span>
            Deals<span className="logo-accent">Forte</span>
          </span>
        </Link>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          ☰
        </button>

        <nav className={`main-nav${open ? " open" : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={pathname === link.href ? "active" : ""}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <form className="header-search" onSubmit={handleSearch} role="search">
          <input
            type="search"
            placeholder="Search deals…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search deals"
          />
        </form>
      </div>
    </header>
  );
}
