export const metadata = {
  title: "Terms of Use",
  description:
    "The terms and conditions governing your use of the DealsForte website.",
};

export default function TermsPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Terms of Use</h1>
          <p>The rules of the road for using DealsForte.</p>
        </div>
      </section>

      <article className="page-content">
        <p className="muted">Last updated: June 2026</p>

        <h2>Acceptance of terms</h2>
        <p>
          By accessing or using dealsforte.com, you agree to be bound by these
          Terms of Use. If you do not agree, please do not use the site.
        </p>

        <h2>Use of the site</h2>
        <p>
          DealsForte provides information about deals, coupons, and discounts for
          your personal, non-commercial use. You agree not to misuse the site,
          attempt to disrupt it, or scrape its content without permission.
        </p>

        <h2>Accuracy of information</h2>
        <p>
          Prices, availability, and offer terms change frequently and are
          controlled by the retailers, not by us. While we work to keep listings
          current, we cannot guarantee that every deal is accurate or still
          available. Always confirm details on the retailer&apos;s website before
          purchasing.
        </p>

        <h2>Third-party links</h2>
        <p>
          Our site contains affiliate and other links to third-party websites. We
          are not responsible for the content, products, or practices of those
          sites. Purchases you make are solely between you and the retailer.
        </p>

        <h2>Limitation of liability</h2>
        <p>
          DealsForte is provided &ldquo;as is&rdquo; without warranties of any
          kind. We are not liable for any loss or damage arising from your use of
          the site or reliance on its content.
        </p>

        <h2>Changes</h2>
        <p>
          We may update these terms from time to time. Continued use of the site
          after changes means you accept the revised terms.
        </p>

        <h2>Contact</h2>
        <p>
          Questions? Email{" "}
          <a href="mailto:hello@dealsforte.com">hello@dealsforte.com</a>.
        </p>
      </article>
    </>
  );
}
