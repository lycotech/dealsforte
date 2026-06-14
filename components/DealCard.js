export default function DealCard({ deal }) {
  const hasPrice = deal.price != null && deal.oldPrice != null;

  return (
    <article className="deal-card">
      <div className="deal-thumb" style={{ background: deal.color }}>
        {deal.discount ? (
          <span className={`deal-badge${deal.expiring ? " expiring" : ""}`}>
            {deal.expiring ? "Ending soon" : `-${deal.discount}%`}
          </span>
        ) : null}
        {deal.featured ? <span className="deal-flag">Featured</span> : null}
        <span role="img" aria-hidden="true">
          {deal.icon}
        </span>
      </div>

      <div className="deal-body">
        <div className="deal-meta">
          <span className="store">{deal.store}</span>
          <span>·</span>
          <span>{deal.category}</span>
        </div>

        <h3 className="deal-title">{deal.title}</h3>
        <p className="deal-desc">{deal.description}</p>

        <div className="deal-price-row">
          {hasPrice ? (
            <>
              <span className="deal-price">${deal.price.toFixed(2)}</span>
              <span className="deal-oldprice">${deal.oldPrice.toFixed(2)}</span>
              {deal.discount ? (
                <span className="deal-save">Save {deal.discount}%</span>
              ) : null}
            </>
          ) : (
            <span className="deal-discount-only">
              {deal.discount ? `${deal.discount}% off` : "See deal"}
            </span>
          )}
        </div>

        <a
          className="btn btn-primary btn-block"
          href={deal.link}
          target="_blank"
          rel="nofollow sponsored noopener"
        >
          Get Deal
        </a>
      </div>
    </article>
  );
}
