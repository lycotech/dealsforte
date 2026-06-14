export const metadata = {
  title: "About",
  description:
    "Learn about DealsForte — our mission to help shoppers find the best deals, coupons, and discounts every day.",
};

export default function AboutPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>About DealsForte</h1>
          <p>
            We&apos;re on a mission to make sure you never pay full price again.
          </p>
        </div>
      </section>

      <article className="page-content">
        <h2>Who we are</h2>
        <p>
          DealsForte is a deals and coupon aggregator built by a small team of
          bargain hunters. Every day we sift through thousands of offers across
          the web so you don&apos;t have to — surfacing only the discounts worth
          your time across electronics, home &amp; kitchen, fashion, travel,
          health &amp; beauty, software, sports, and more.
        </p>

        <h2>How it works</h2>
        <p>
          We hand-pick deals from trusted retailers and affiliate networks. When
          you click &ldquo;Get Deal&rdquo; and make a purchase, we may earn a
          small commission at no extra cost to you. That commission is what keeps
          DealsForte free to use — read our{" "}
          <a href="/affiliate-disclosure">affiliate disclosure</a> for the full
          details.
        </p>

        <h2>Our promise</h2>
        <ul>
          <li>We only feature deals we believe offer genuine value.</li>
          <li>Prices and availability change fast — we update listings daily.</li>
          <li>
            We&apos;re transparent about affiliate relationships, always.
          </li>
        </ul>

        <h2>Get in touch</h2>
        <p>
          Have a deal to suggest or a partnership in mind? Visit our{" "}
          <a href="/contact">contact page</a> — we&apos;d love to hear from you.
        </p>
      </article>
    </>
  );
}
