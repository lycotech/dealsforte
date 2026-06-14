export const metadata = {
  title: "Affiliate Disclosure",
  description:
    "DealsForte's FTC-compliant affiliate disclosure explaining how we earn commissions from the links on our site.",
  alternates: { canonical: "/affiliate-disclosure" },
};

export default function AffiliateDisclosurePage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Affiliate Disclosure</h1>
          <p>Transparency about how DealsForte makes money.</p>
        </div>
      </section>

      <article className="page-content">
        <p className="muted">Last updated: June 2026</p>

        <h2>The short version</h2>
        <p>
          DealsForte is reader-supported. Many of the links on this site are
          affiliate links. If you click one and make a purchase, we may earn a
          commission — at no additional cost to you. This is standard practice for
          deals websites and is how we keep DealsForte free.
        </p>

        <h2>Amazon Associates</h2>
        <p>
          DealsForte is a participant in the Amazon Services LLC Associates
          Program, an affiliate advertising program designed to provide a means
          for sites to earn advertising fees by advertising and linking to
          Amazon.com. As an Amazon Associate, we earn from qualifying purchases.
        </p>

        <h2>Other affiliate partners</h2>
        <p>
          We also partner with other affiliate networks and retailers (such as
          Awin, CJ, and individual brand programs). When you use our links to
          shop with these partners, we may receive a referral commission.
        </p>

        <h2>Our editorial independence</h2>
        <p>
          Earning a commission never changes the price you pay, and it does not
          dictate which deals we feature. We highlight offers based on the value
          they provide to shoppers — not on which ones pay us the most.
        </p>

        <h2>Questions</h2>
        <p>
          If you&apos;d like to know more about our affiliate relationships, email{" "}
          <a href="mailto:partners@dealsforte.com">partners@dealsforte.com</a>.
        </p>
      </article>
    </>
  );
}
