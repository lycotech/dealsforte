export const metadata = {
  title: "Privacy Policy",
  description:
    "How DealsForte collects, uses, and protects your information, including cookies and affiliate tracking.",
  alternates: { canonical: "/privacy-policy" },
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Privacy Policy</h1>
          <p>Your privacy matters. Here&apos;s how we handle your data.</p>
        </div>
      </section>

      <article className="page-content">
        <p className="muted">Last updated: June 2026</p>

        <h2>Introduction</h2>
        <p>
          This Privacy Policy explains how DealsForte (&ldquo;we&rdquo;,
          &ldquo;us&rdquo;) collects, uses, and shares information when you visit
          dealsforte.com. By using our site, you agree to the practices described
          here.
        </p>

        <h2>Information we collect</h2>
        <ul>
          <li>
            <strong>Usage data:</strong> pages visited, links clicked, browser
            type, and device information, collected automatically.
          </li>
          <li>
            <strong>Newsletter data:</strong> the email address you provide if
            you subscribe to our newsletter.
          </li>
          <li>
            <strong>Cookies:</strong> small files used for analytics, advertising,
            and affiliate tracking.
          </li>
        </ul>

        <h2>How we use information</h2>
        <ul>
          <li>To operate, maintain, and improve the website.</li>
          <li>To send newsletter emails if you opt in.</li>
          <li>To measure traffic and the performance of deals.</li>
          <li>To attribute affiliate referrals to partner retailers.</li>
        </ul>

        <h2>Advertising &amp; affiliate links</h2>
        <p>
          We display third-party advertising (such as Google AdSense) and use
          affiliate links. These partners may use cookies to serve relevant ads
          and track referrals. See our{" "}
          <a href="/affiliate-disclosure">affiliate disclosure</a> for more.
        </p>

        <h2>Your choices</h2>
        <p>
          You can disable cookies in your browser settings and unsubscribe from
          our newsletter at any time using the link in each email.
        </p>

        <h2>Contact</h2>
        <p>
          Questions about this policy? Email{" "}
          <a href="mailto:hello@dealsforte.com">hello@dealsforte.com</a>.
        </p>
      </article>
    </>
  );
}
