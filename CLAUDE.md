# DealsForte — Project Notes for Claude

## What this is
**dealsforte.com** is being rebuilt as a **Next.js** app (App Router, JavaScript). Same product as before — a deals/coupon aggregator monetized via affiliate links + display ads — just built with Next.js instead of plain HTML.

**No database for now.** Deals continue to live in a JSON file bundled with the app (`data/deals.json`), imported directly by server components. This avoids the old `fetch("data/deals.json")` CORS issue entirely — no need to serve over `http(s)://` during development.

Goal: launch before end of June 2026.

## Tech stack
- **Framework:** Next.js (App Router, latest stable), JavaScript (`.js` / `.jsx`, no TypeScript)
- **Styling:** Port the existing `css/style.css` into `app/globals.css` (or `styles/globals.css`) almost as-is — the visual design doesn't need to change, only the markup structure
- **Data:** Static JSON (`data/deals.json`), imported directly into server components — no API routes, no database
- **Hosting target:** Vercel (native Next.js support) — can also be exported/hosted elsewhere later if needed

## Target file structure
```
/app
  /layout.js              Root layout — topbar, header/nav, footer (shared across all pages)
  /page.js                Homepage — hero, category filters, deal grid, newsletter
  /globals.css            Ported from css/style.css
  /about/page.js          About page
  /contact/page.js        Contact page
  /privacy-policy/page.js Privacy policy
  /terms/page.js          Terms of use
  /affiliate-disclosure/page.js  FTC-required affiliate disclosure

/components
  /Header.js              Topbar + site-header + nav + search input + mobile nav toggle
  /Footer.js              site-footer (footer-grid + footer-bottom, year computed server-side)
  /Hero.js                Homepage hero + hero search form
  /DealsSection.js        "use client" — category bar + deal grid + search/filter state
  /DealCard.js            Single deal card (badge, price row, CTA)
  /Newsletter.js          "use client" — newsletter form (placeholder submit handler)

/data
  /deals.json             Deal listings — same shape as before

/public
  /icon.svg or favicon    Site icon (currently an inline emoji data URI — move to a real file)
```

## Migration notes (from current static site)
The current static site (`index.html`, `about.html`, `contact.html`, `privacy-policy.html`, `terms.html`, `affiliate-disclosure.html`, `css/style.css`, `js/main.js`, `data/deals.json`) is the source of truth for content and design. Port it page-by-page:

- **Shared chrome** (topbar, header with logo/nav/search/mobile toggle, footer with footer-grid/footer-bottom) moves into `app/layout.js` so it isn't repeated per page. Mark the active nav link based on the current route (e.g. via `usePathname()` in a small client wrapper, or pass an `active` prop from each page).
- **Footer year**: replace the inline `<script>document.getElementById('year')...</script>` with `{new Date().getFullYear()}` rendered server-side in `Footer.js`.
- **Legal/info pages** (`about`, `contact`, `privacy-policy`, `terms`, `affiliate-disclosure`) are simple server components — copy the `.page-hero` + `.page-content` markup (and `.contact-grid`/`.contact-card` for contact) directly into each `page.js`, swapping HTML attributes for JSX (`class` → `className`, self-closing tags, etc.).
- **Homepage** (`app/page.js`): hero section + `<DealsSection />` (client component) + ad slot + `<Newsletter />`.
- **`js/main.js` logic** splits into:
  - `DealsSection.js` (client component): holds `category` + `query` state, builds the category chip bar from `[...new Set(deals.map(d => d.category))]`, filters deals, renders `<DealCard>` per result, wires the hero search form and header search input.
  - `DealCard.js`: pure presentational component taking a `deal` prop — renders thumb/badge/icon, store/category, title, description, price row, CTA link (`rel="nofollow sponsored noopener"`).
  - `Newsletter.js` (client component): submit handler shows a thank-you message, same as today — still a placeholder pending real email integration.
  - Mobile nav toggle: small client component or `useState` in `Header.js` to toggle the `.open` class on `.main-nav`.
- **SEO meta tags**: replace each page's `<title>` / `<meta name="description">` with Next.js's metadata API — `export const metadata = { title: "...", description: "..." }` in each `page.js` (or `generateMetadata` if dynamic).

## Page template pattern
Every route renders inside `app/layout.js`, which provides:
- `.topbar` promo banner
- `.site-header` with logo, `.main-nav` (active link highlighted per-route), header search, mobile `.nav-toggle`
- `{children}` — page-specific content
- `.site-footer` with `.footer-grid` (4 cols) + `.footer-bottom` (copyright + affiliate note, year computed server-side)

Legal/info pages use the `.page-hero` (title + subtitle) and `.page-content` (max-width article body) classes from `globals.css`. Contact page additionally uses `.contact-grid` / `.contact-card`.

When adding a new page, create a new folder under `/app` with a `page.js`, copy the structure of an existing legal page, and set its `metadata`, hero text, and body content.

## Data model — data/deals.json
Array of deal objects (unchanged from the static site):
```json
{
  "id": 1,
  "title": "...",
  "category": "Electronics",
  "store": "Amazon",
  "description": "...",
  "price": 59.99,          // or null if no fixed price
  "oldPrice": 99.99,        // or null
  "discount": 40,           // percent, shown as badge if price/oldPrice are null
  "icon": "🎧",            // emoji used as card thumbnail
  "color": "#e8f1ff",       // thumb background color
  "link": "https://...",   // affiliate URL (see placeholders below)
  "featured": true,
  "expiring": false
}
```
Currently has 28 sample deals across 8 categories (Electronics, Home & Kitchen, Fashion, Travel, Health & Beauty, Software & Apps, Sports & Outdoors, Toys & Games). Editing this file is the main way to add/update/remove deals — no other code changes needed. The category bar is built dynamically from whatever categories appear in this file.

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
5. Final visual/branding consistency pass across all pages
6. Responsiveness verification (`next dev`)
7. Choose hosting (e.g. Vercel) + point dealsforte.com DNS to it
8. Sign up for Amazon Associates, Awin/CJ → replace affiliate placeholders
9. Apply for Google AdSense → replace `.ad-slot` placeholders
10. Hook up real newsletter service
11. Set up contact email addresses
