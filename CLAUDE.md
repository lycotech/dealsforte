# DealsForte — Project Notes for Claude

## What this is
**dealsforte.com** is being rebuilt as a **Next.js** app (App Router, JavaScript). Same product as before — a deals/coupon aggregator monetized via affiliate links + display ads — just built with Next.js instead of plain HTML.

**No database for now.** Deals continue to live in a JSON file bundled with the app (`data/deals.json`), imported directly by server components. This avoids the old `fetch("data/deals.json")` CORS issue entirely — no need to serve over `http(s)://` during development.

**SEO priority:** primary target audience is US shoppers searching for coupon/discount codes. The single biggest gap in the current build is that deals only exist as cards on the homepage with no unique indexable URL per deal or per store — that's the main thing this rebuild needs to fix, alongside the Next.js migration itself.

Goal: launch before end of June 2026.

## Tech stack
- **Framework:** Next.js (App Router, latest stable), JavaScript (`.js` / `.jsx`, no TypeScript)
- **Styling:** Port the existing `css/style.css` into `app/globals.css` (or `styles/globals.css`) almost as-is — the visual design doesn't need to change, only the markup structure
- **Data:** Static JSON (`data/deals.json`), imported directly into server components — no API routes, no database
- **Rendering:** Static generation with ISR (`revalidate`) for all deal/store/category pages, so newly added or edited deals in `deals.json` go live on a schedule without a full redeploy
- **Hosting target:** Vercel (native Next.js support) — can also be exported/hosted elsewhere later if needed

## Target file structure
```
/app
  /layout.js                     Root layout — topbar, header/nav, footer (shared across all pages)
  /page.js                       Homepage — hero, category filters, deal grid, newsletter
  /globals.css                   Ported from css/style.css
  /sitemap.js                    Dynamically generated sitemap — includes all deal/store/category/guide URLs
  /robots.js (or public/robots.txt)  Crawl rules targeting US search engines

  /deal/[slug]/page.js            Individual deal detail page (NEW — key SEO page type)
  /store/[storeSlug]/page.js      Individual store/brand page (NEW — key SEO page type)
  /category/[categorySlug]/page.js  Indexable category page, separate from homepage client-side filter (NEW)

  /guides/page.js                 Guides/blog index (NEW)
  /guides/[slug]/page.js          Individual guide/article page (NEW)

  /about/page.js                  About page
  /contact/page.js                Contact page
  /privacy-policy/page.js         Privacy policy
  /terms/page.js                  Terms of use
  /affiliate-disclosure/page.js   FTC-required affiliate disclosure

/components
  /Header.js               Topbar + site-header + nav + search input + mobile nav toggle
  /Footer.js                Footer (footer-grid + footer-bottom, year computed server-side)
  /Hero.js                  Homepage hero + hero search form
  /DealsSection.js          "use client" — category bar + deal grid + search/filter state (homepage only)
  /DealCard.js               Single deal card (badge, price row, CTA, "Verified [date]" indicator)
  /DealSchema.js              Renders JSON-LD Product/Offer structured data for a deal page
  /BreadcrumbSchema.js         Renders JSON-LD breadcrumb structured data (Home > Category > Deal)
  /RelatedDeals.js            Shows 4–6 related deals on a deal/store page, by category or store
  /Newsletter.js              "use client" — newsletter form (placeholder submit handler)

/data
  /deals.json               Deal listings — same shape as before, plus new fields (see below)
  /stores.json               Store/brand metadata (NEW — name, slug, logo, short description)
  /guides.json  (or /content/guides/*.md)  Guide/article content (NEW)

/public
  /icon.svg or favicon      Site icon (currently an inline emoji data URI — move to a real file)
```

## Migration notes (from current static site)
The current static site (`index.html`, `about.html`, `contact.html`, `privacy-policy.html`, `terms.html`, `affiliate-disclosure.html`, `css/style.css`, `js/main.js`, `data/deals.json`) is the source of truth for content and design. Port it page-by-page:

- **Shared chrome** (topbar, header with logo/nav/search/mobile toggle, footer with footer-grid/footer-bottom) moves into `app/layout.js` so it isn't repeated per page. Mark the active nav link based on the current route (e.g. via `usePathname()` in a small client wrapper, or pass an `active` prop from each page).
- **Footer year**: replace the inline `<script>document.getElementById('year')...</script>` with `{new Date().getFullYear()}` rendered server-side in `Footer.js`.
- **Legal/info pages** (`about`, `contact`, `privacy-policy`, `terms`, `affiliate-disclosure`) are simple server components — copy the `.page-hero` + `.page-content` markup (and `.contact-grid`/`.contact-card` for contact) directly into each `page.js`, swapping HTML attributes for JSX (`class` → `className`, self-closing tags, etc.).
- **Homepage** (`app/page.js`): hero section + `<DealsSection />` (client component, homepage-only filtering) + ad slot + `<Newsletter />`. Homepage links each `<DealCard>` through to its own `/deal/[slug]` page rather than straight to the affiliate URL, so the deal page (with its schema markup and content) is what gets indexed and ranks — the affiliate redirect happens from there.
- **`js/main.js` logic** splits into:
  - `DealsSection.js` (client component): holds `category` + `query` state, builds the category chip bar from `[...new Set(deals.map(d => d.category))]`, filters deals, renders `<DealCard>` per result, wires the hero search form and header search input.
  - `DealCard.js`: pure presentational component taking a `deal` prop — renders thumb/badge/icon, store/category, title, description, price row, "Verified [date]" label, and links to `/deal/[slug]` (internal page) rather than directly to the affiliate `link`.
  - `Newsletter.js` (client component): submit handler shows a thank-you message, same as today — still a placeholder pending real email integration.
  - Mobile nav toggle: small client component or `useState` in `Header.js` to toggle the `.open` class on `.main-nav`.
- **SEO meta tags**: replace each page's `<title>` / `<meta name="description">` with Next.js's metadata API — `export const metadata = { title: "...", description: "..." }` for static pages, or `generateMetadata` for dynamic routes (`/deal/[slug]`, `/store/[storeSlug]`, `/category/[categorySlug]`, `/guides/[slug]`).

## New page types (SEO-critical additions)

### `/deal/[slug]` — individual deal page
This is the primary page type that should rank in Google for "[Product] discount code" / "[Product] coupon" searches. Each page includes:
- Full deal details (title, description, store, category, price vs. old price, discount %)
- "Verified [date]" trust indicator, matching the badge style already used for "Featured"/"Ending soon"
- CTA button that performs the affiliate redirect (`rel="nofollow sponsored noopener"`)
- `<DealSchema />` — JSON-LD `Product`/`Offer` structured data (price, `priceCurrency: "USD"`, availability, `priceValidUntil`)
- `<BreadcrumbSchema />` — Home > Category > Deal
- `<RelatedDeals />` — 4–6 other deals from the same category or store
- Statically generated via `generateStaticParams` from `deals.json`, revalidated on an interval (ISR) so edits to `deals.json` go live without a full rebuild

### `/store/[storeSlug]` — store/brand page
Ranks for "[Brand] coupon code" / "[Brand] promo code" searches (high commercial intent). Sourced from `data/stores.json`:
- Store logo, name, short description
- All active deals for that store, sorted by discount %
- Linked from every relevant `DealCard` and from the footer/nav for internal link equity

### `/category/[categorySlug]` — indexable category page
The homepage category filter is client-side only, which Google can't crawl or rank. Each category (Electronics, Home & Kitchen, Fashion, Travel, Health & Beauty, Software & Apps, Sports & Outdoors, Toys & Games) additionally gets its own server-rendered route with its own URL, title, and meta description, listing all deals in that category.

### `/guides` and `/guides/[slug]` — content/blog section
Needed for topical authority and internal linking into deal/category pages — Google favors sites with genuine editorial content around a coupon niche, not just raw deal listings. Launch with a small number of starter guides (e.g. a monthly deals roundup, a "how to stack coupons" explainer, a category buying guide) that link out to relevant `/deal/` and `/category/` pages.

### `app/sitemap.js`
Dynamically generated (not a static file) so it always reflects the current contents of `deals.json`, `stores.json`, and `guides.json` — includes homepage, all category pages, all deal pages, all store pages, and all guide pages.

## Page template pattern
Every route renders inside `app/layout.js`, which provides:
- `.topbar` promo banner
- `.site-header` with logo, `.main-nav` (active link highlighted per-route), header search, mobile `.nav-toggle`
- `{children}` — page-specific content
- `.site-footer` with `.footer-grid` (4 cols) + `.footer-bottom` (copyright + affiliate note, year computed server-side)

Legal/info pages use the `.page-hero` (title + subtitle) and `.page-content` (max-width article body) classes from `globals.css`. Contact page additionally uses `.contact-grid` / `.contact-card`. Deal, store, category, and guide pages should reuse the same visual language (card styles, badges, spacing, colors) already established on the homepage — no new design system, just new routes/templates.

When adding a new page, create a new folder under `/app` with a `page.js`, copy the structure of an existing similar page (legal page for static content, deal page for a new dynamic content type), and set its `metadata` (or `generateMetadata`), hero text, and body content.

## Data model

### `data/deals.json`
Array of deal objects (extends the original shape with a `slug`, `storeSlug`, and `verifiedDate`):
```json
{
  "id": 1,
  "slug": "wireless-noise-cancelling-headphones",
  "title": "...",
  "category": "Electronics",
  "store": "Amazon",
  "storeSlug": "amazon",
  "description": "...",
  "price": 59.99,          // or null if no fixed price
  "oldPrice": 99.99,        // or null
  "discount": 40,           // percent, shown as badge if price/oldPrice are null
  "icon": "🎧",            // emoji used as card thumbnail
  "color": "#e8f1ff",       // thumb background color
  "link": "https://...",   // affiliate URL (see placeholders below)
  "featured": true,
  "expiring": false,
  "verifiedDate": "2026-07-15"   // NEW — drives the "Verified [date]" trust badge
}
```
Currently has 28 sample deals across 8 categories (Electronics, Home & Kitchen, Fashion, Travel, Health & Beauty, Software & Apps, Sports & Outdoors, Toys & Games). Editing this file is the main way to add/update/remove deals — no other code changes needed. The category bar is built dynamically from whatever categories appear in this file, and category pages/store pages/sitemap all derive from it too.

### `data/stores.json` (NEW)
```json
{
  "name": "Amazon",
  "slug": "amazon",
  "logo": "/logos/amazon.svg",
  "description": "..."
}
```

### `data/guides.json` or `content/guides/*.md` (NEW)
Simple structure for now — title, slug, publish date, body content, and an array of related deal/category slugs to link to internally. Markdown files are fine if that's easier to hand-author than JSON.

## Monetization placeholders to replace before/after launch
- **Amazon Associates**: links use `?tag=dealsforte-20` — replace `dealsforte-20` with the real Associates tracking ID once approved.
- **Other affiliate networks (Awin/CJ etc.)**: links use `aff=dealsforte` / `affid=dealsforte` placeholders — replace with real affiliate IDs per network.
- **Google AdSense**: `.ad-slot` divs (dashed border, "Advertisement" label) are placeholders — replace with real AdSense `<script>`/`<ins>` ad units once approved.
- **Newsletter**: `Newsletter.js` submit handler just shows a thank-you message — needs real integration (Mailchimp/Beehiiv/ConvertKit) before relying on it.
- **Contact emails**: contact page uses placeholder addresses (`hello@`, `deals@`, `partners@dealsforte.com`) — set up real inboxes/aliases.

## Remaining launch checklist (not yet done)
1. Scaffold Next.js app (App Router, JS) and port `css/style.css` → `globals.css`
2. Port shared header/footer into `app/layout.js`
3. Port homepage hero + deals section + category filter + search + newsletter
4. Port legal/info pages (about, contact, privacy-policy, terms, affiliate-disclosure) with Next.js metadata
5. **Build `/deal/[slug]` pages** with JSON-LD Product/Offer schema and breadcrumb schema
6. **Build `/store/[storeSlug]` pages** from `data/stores.json`
7. **Build `/category/[categorySlug]` server-rendered pages** (in addition to the homepage client-side filter)
8. **Build `/guides` section** with 3 starter articles linking into deal/category pages
9. **Add `app/sitemap.js`** covering deals, stores, categories, and guides
10. Add "Verified [date]" trust badge to `DealCard` and deal pages
11. Final visual/branding consistency pass across all pages (new pages match existing card/badge style)
12. Responsiveness verification (`next dev`)
13. Choose hosting (e.g. Vercel) + point dealsforte.com DNS to it
14. Sign up for Amazon Associates, Awin/CJ → replace affiliate placeholders
15. Apply for Google AdSense → replace `.ad-slot` placeholders
16. Hook up real newsletter service
17. Set up contact email addresses