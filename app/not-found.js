import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container section">
      <div className="empty-state">
        <h2>We couldn&apos;t find that page.</h2>
        <p>Try browsing the homepage or one of the category pages instead.</p>
        <Link className="btn btn-primary" href="/">
          Back to deals
        </Link>
      </div>
    </div>
  );
}
