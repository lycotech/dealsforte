"use client";

import { useState } from "react";

export default function Newsletter() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    // Placeholder — wire up Mailchimp/Beehiiv/ConvertKit before launch.
    if (email.trim()) setSubmitted(true);
  }

  return (
    <section className="container">
      <div className="newsletter">
        <h2>Never miss a deal</h2>
        <p>
          Join thousands of smart shoppers. Get the best hand-picked deals
          delivered to your inbox — no spam, unsubscribe anytime.
        </p>

        {submitted ? (
          <div className="newsletter-thanks">
            🎉 Thanks for subscribing! Check your inbox to confirm.
          </div>
        ) : (
          <form className="newsletter-form" onSubmit={handleSubmit}>
            <input
              type="email"
              required
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-label="Email address"
            />
            <button type="submit" className="btn btn-accent">
              Subscribe
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
