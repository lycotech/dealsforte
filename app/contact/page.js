export const metadata = {
  title: "Contact",
  description:
    "Get in touch with the DealsForte team — for deal suggestions, partnerships, or general questions.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <section className="page-hero">
        <div className="container">
          <h1>Contact us</h1>
          <p>
            Questions, deal tips, or partnership ideas? Reach out — we read every
            message.
          </p>
        </div>
      </section>

      <article className="page-content">
        <div className="contact-grid">
          <div className="contact-card">
            <div className="icon">💬</div>
            <h3>General</h3>
            <p className="muted">For questions and feedback</p>
            <a href="mailto:hello@dealsforte.com">hello@dealsforte.com</a>
          </div>

          <div className="contact-card">
            <div className="icon">🏷️</div>
            <h3>Deal tips</h3>
            <p className="muted">Found a great deal? Tell us</p>
            <a href="mailto:deals@dealsforte.com">deals@dealsforte.com</a>
          </div>

          <div className="contact-card">
            <div className="icon">🤝</div>
            <h3>Partnerships</h3>
            <p className="muted">Brands &amp; affiliate networks</p>
            <a href="mailto:partners@dealsforte.com">partners@dealsforte.com</a>
          </div>
        </div>

        <h2>Send us a message</h2>
        <p>
          The quickest way to reach us is by email at one of the addresses above.
          We aim to reply within two business days. Please include as much detail
          as possible so we can help you faster.
        </p>
        <p className="muted">
          Note: DealsForte is a deals aggregator. For questions about an order,
          shipping, or returns, please contact the retailer where you completed
          your purchase.
        </p>
      </article>
    </>
  );
}
