import Link from "next/link";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="logo">
            <span className="logo-mark">🏷️</span>
            <span>
              Deals<span className="logo-accent">Forte</span>
            </span>
          </Link>
          <p>
            Hand-picked deals, coupons, and discounts from your favorite stores —
            updated daily so you never pay full price.
          </p>
        </div>

        <div className="footer-col">
          <h4>Explore</h4>
          <ul>
            <li>
              <Link href="/">All Deals</Link>
            </li>
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/contact">Contact</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Legal</h4>
          <ul>
            <li>
              <Link href="/privacy-policy">Privacy Policy</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Use</Link>
            </li>
            <li>
              <Link href="/affiliate-disclosure">Affiliate Disclosure</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Stay in touch</h4>
          <ul>
            <li>
              <a href="mailto:hello@dealsforte.com">hello@dealsforte.com</a>
            </li>
            <li>
              <a href="mailto:partners@dealsforte.com">partners@dealsforte.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© {year} DealsForte. All rights reserved.</span>
        <span>
          As an Amazon Associate and affiliate partner, we earn from qualifying
          purchases.
        </span>
      </div>
    </footer>
  );
}
